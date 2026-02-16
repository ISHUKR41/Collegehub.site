/**
 * authService.js - Authentication and session business logic.
 *
 * Why service layer:
 * - Keeps security-critical auth logic out of controllers.
 * - Makes token rotation and account lock rules reusable/testable.
 * - Supports future split into dedicated auth microservice.
 */

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Course = require('../models/Course');
const UserProgress = require('../models/UserProgress');
const AppError = require('../utils/AppError');
const { flattenCourseLessons } = require('../utils/courseStructureUtils');
const {
    generateAccessToken,
    generateRefreshToken,
    hashToken,
} = require('../utils/tokenUtils');
const { HTTP, ROLES } = require('../constants');

const formatUser = (userDoc) => ({
    id: userDoc._id.toString(),
    name: userDoc.name,
    email: userDoc.email,
    role: userDoc.role,
    createdAt: userDoc.createdAt,
});

const validateAdminRegistration = (requestedRole, adminInviteCode) => {
    if (requestedRole !== ROLES.ADMIN) return;

    const configuredInvite = process.env.ADMIN_INVITE_CODE;
    if (!configuredInvite) {
        throw new AppError(
            HTTP.FORBIDDEN,
            'Admin registration is disabled. Set ADMIN_INVITE_CODE to enable it.'
        );
    }

    if (adminInviteCode !== configuredInvite) {
        throw new AppError(HTTP.FORBIDDEN, 'Invalid admin invite code.');
    }
};

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
    const lessonMeta = flatLessons[normalizedLastWatched];

    const pendingUpdate = {};
    if (normalizedLockedUntil !== latestProgress.lockedUntilLesson) {
        pendingUpdate.lockedUntilLesson = normalizedLockedUntil;
    }
    if (normalizedLastWatched !== latestProgress.lastWatchedLesson) {
        pendingUpdate.lastWatchedLesson = normalizedLastWatched;
    }
    if (
        lessonMeta?.subjectId &&
        latestProgress.lastWatchedSubjectId?.toString() !== lessonMeta.subjectId
    ) {
        pendingUpdate.lastWatchedSubjectId = lessonMeta.subjectId;
    }
    if (
        lessonMeta?.chapterId &&
        latestProgress.lastWatchedChapterId?.toString() !== lessonMeta.chapterId
    ) {
        pendingUpdate.lastWatchedChapterId = lessonMeta.chapterId;
    }

    if (Object.keys(pendingUpdate).length > 0) {
        await UserProgress.updateOne({ _id: latestProgress._id }, { $set: pendingUpdate });
    }

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

const register = async ({ name, email, password, role, adminInviteCode }) => {
    const existing = await User.findOne({ email }).lean();
    if (existing) {
        throw new AppError(HTTP.CONFLICT, 'Email is already registered.');
    }

    const selectedRole = role || ROLES.STUDENT;
    validateAdminRegistration(selectedRole, adminInviteCode);

    const user = await User.create({
        name,
        email,
        password,
        role: selectedRole,
    });

    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id);
    user.refreshTokenHash = hashToken(refreshToken);
    await user.save();

    return {
        user: formatUser(user),
        accessToken,
        refreshToken,
    };
};

const login = async ({ email, password }) => {
    const user = await User.findOne({ email }).select(
        '+password +refreshTokenHash +loginAttempts +lockUntil'
    );

    if (!user) {
        throw new AppError(HTTP.UNAUTHORIZED, 'Invalid email or password.');
    }

    if (user.isLocked()) {
        throw new AppError(
            HTTP.FORBIDDEN,
            `Account is temporarily locked. Try again after ${new Date(user.lockUntil).toISOString()}.`
        );
    }

    const validPassword = await user.comparePassword(password);
    if (!validPassword) {
        await user.incrementLoginAttempts();
        throw new AppError(HTTP.UNAUTHORIZED, 'Invalid email or password.');
    }

    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id);
    user.loginAttempts = 0;
    user.lockUntil = undefined;
    user.refreshTokenHash = hashToken(refreshToken);
    await user.save({ validateBeforeSave: false });

    return {
        user: formatUser(user),
        accessToken,
        refreshToken,
        resume: await getLatestResume(user._id),
    };
};

const refresh = async ({ refreshToken }) => {
    if (!refreshToken) {
        throw new AppError(HTTP.UNAUTHORIZED, 'Refresh token is required.');
    }

    let decoded;
    try {
        decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
        throw new AppError(HTTP.UNAUTHORIZED, 'Invalid or expired refresh token.');
    }

    const user = await User.findById(decoded.userId).select('+refreshTokenHash');
    if (!user || !user.refreshTokenHash) {
        throw new AppError(HTTP.UNAUTHORIZED, 'Session not found. Please login again.');
    }

    const incomingTokenHash = hashToken(refreshToken);
    if (incomingTokenHash !== user.refreshTokenHash) {
        throw new AppError(HTTP.UNAUTHORIZED, 'Refresh token mismatch. Please login again.');
    }

    const newAccessToken = generateAccessToken(user._id, user.role);
    const newRefreshToken = generateRefreshToken(user._id);

    user.refreshTokenHash = hashToken(newRefreshToken);
    await user.save();

    return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
    };
};

const logout = async ({ refreshToken }) => {
    if (!refreshToken) return;

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, {
            ignoreExpiration: true,
        });
        await User.findByIdAndUpdate(decoded.userId, { $unset: { refreshTokenHash: 1 } });
    } catch (error) {
        /*
         * Logout must be idempotent. Invalid/expired token should not leak details
         * or fail logout UX.
         */
    }
};

const getCurrentUserProfile = async (userId) => {
    const user = await User.findById(userId).lean();
    if (!user) {
        throw new AppError(HTTP.NOT_FOUND, 'User not found.');
    }
    return formatUser(user);
};

module.exports = {
    register,
    login,
    refresh,
    logout,
    getCurrentUserProfile,
};
