/**
 * googleAuthService.js - Google OAuth business logic.
 *
 * Handles the find-or-create flow for Google-authenticated users.
 * If a user with the same email exists (registered via local auth),
 * we link the Google account to avoid duplicate accounts.
 *
 * To extend: Add similar services for GitHub, Facebook, etc.
 */

const User = require('../models/User');
const UserProgress = require('../models/UserProgress');
const Course = require('../models/Course');
const { flattenCourseLessons } = require('../utils/courseStructureUtils');
const {
    generateAccessToken,
    generateRefreshToken,
    hashToken,
} = require('../utils/tokenUtils');
const { ROLES } = require('../constants');

/**
 * Format a user document for the API response.
 * Keeps only safe, public-facing fields.
 */
const formatUser = (userDoc) => ({
    id: userDoc._id.toString(),
    name: userDoc.name,
    email: userDoc.email,
    role: userDoc.role,
    avatar: userDoc.avatar || null,
    authProvider: userDoc.authProvider,
    createdAt: userDoc.createdAt,
});

/**
 * Get the latest resume point for a user (same logic as authService).
 * Returns null if the user has no progress records.
 */
const getLatestResume = async (userId) => {
    const latestProgress = await UserProgress.findOne({ userId })
        .sort({ updatedAt: -1 })
        .select(
            'courseId lastWatchedLesson lockedUntilLesson lastWatchedSubjectId lastWatchedChapterId updatedAt'
        )
        .lean();

    if (!latestProgress) return null;

    const course = await Course.findById(latestProgress.courseId)
        .select('title category subCategory subjects modules')
        .lean();

    if (!course) return null;

    const flatLessons = flattenCourseLessons(course);
    if (flatLessons.length === 0) {
        return {
            courseId: latestProgress.courseId.toString(),
            courseTitle: course.title,
            category: course.category,
            subCategory: course.subCategory,
            lastWatchedLesson: 0,
            lockedUntilLesson: -1,
            updatedAt: latestProgress.updatedAt,
        };
    }

    const maxLessonIndex = flatLessons.length - 1;
    const normalizedLockedUntil = Math.min(
        Math.max(Number(latestProgress.lockedUntilLesson ?? 0), 0),
        maxLessonIndex
    );
    const normalizedLastWatched = Math.min(
        Math.max(Number(latestProgress.lastWatchedLesson ?? 0), 0),
        normalizedLockedUntil
    );

    return {
        courseId: latestProgress.courseId.toString(),
        courseTitle: course.title,
        category: course.category,
        subCategory: course.subCategory,
        lastWatchedLesson: normalizedLastWatched,
        lockedUntilLesson: normalizedLockedUntil,
        updatedAt: latestProgress.updatedAt,
    };
};

/**
 * Find or create a user from a Google OAuth profile.
 *
 * Flow:
 * 1. Check if user exists by googleId → return existing user
 * 2. Check if user exists by email → link Google account to existing user
 * 3. Otherwise → create new user with Google provider
 *
 * Returns: { user, accessToken, refreshToken, resume }
 */
const findOrCreateGoogleUser = async (profile) => {
    const { id: googleId, emails, displayName, photos } = profile;
    const email = emails?.[0]?.value;
    const avatar = photos?.[0]?.value || null;
    const name = displayName || email?.split('@')[0] || 'Google User';

    if (!email) {
        throw new Error('Google profile does not contain an email address.');
    }

    /* Step 1: Look up by Google ID */
    let user = await User.findOne({ googleId });

    if (!user) {
        /* Step 2: Look up by email (user may have registered with email/password before) */
        user = await User.findOne({ email });

        if (user) {
            /* Link Google account to the existing local account */
            user.googleId = googleId;
            if (!user.avatar && avatar) {
                user.avatar = avatar;
            }
            /* Keep authProvider as 'local' if they originally registered with email */
            await user.save({ validateBeforeSave: false });
        } else {
            /* Step 3: Create brand new user with Google provider */
            user = await User.create({
                name,
                email,
                googleId,
                avatar,
                authProvider: 'google',
                role: ROLES.STUDENT,
            });
        }
    } else {
        /* Update avatar if it changed on Google's side */
        if (avatar && user.avatar !== avatar) {
            user.avatar = avatar;
            await user.save({ validateBeforeSave: false });
        }
    }

    /* Issue JWT tokens (same mechanism as local auth) */
    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id);
    user.refreshTokenHash = hashToken(refreshToken);
    user.loginAttempts = 0;
    user.lockUntil = undefined;
    await user.save({ validateBeforeSave: false });

    /* Fetch resume point for redirect after login */
    const resume = await getLatestResume(user._id);

    return {
        user: formatUser(user),
        accessToken,
        refreshToken,
        resume,
    };
};

module.exports = {
    findOrCreateGoogleUser,
};
