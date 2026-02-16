/**
 * lockMiddleware.js — Lesson Lock Enforcement
 *
 * Prevents students from accessing lessons they haven't unlocked yet.
 * The lock system is a core differentiator of CollegeHub: students must
 * complete lessons in order. No skipping ahead.
 *
 * Logic:
 *   if (requestedLessonIndex > lockedUntilLesson) → 403 Forbidden
 *
 * The lock state lives in the UserProgress collection (source of truth).
 * Frontend can show locked UI, but this middleware is the real gatekeeper.
 * Even if someone manipulates the frontend, they cannot bypass this.
 *
 * Why middleware: Separates lock logic from progress service. Can be
 * applied to any route that serves lesson content.
 *
 * To extend: Add chapter-level locking, or time-based unlocking.
 */

const UserProgress = require('../models/UserProgress');
const ApiResponse = require('../utils/ApiResponse');
const { HTTP } = require('../constants');

/**
 * checkLessonLock — Middleware to enforce sequential lesson access.
 *
 * Expects:
 *   req.user.id     — from authMiddleware
 *   req.params.courseId — from route
 *   req.body.lessonIndex or req.query.lessonIndex — the lesson being requested
 */
const checkLessonLock = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { courseId } = req.params;
        const lessonIndex = parseInt(req.body.lessonIndex || req.query.lessonIndex, 10);

        /* If no lesson index provided, skip lock check (listing, not accessing) */
        if (isNaN(lessonIndex)) {
            return next();
        }

        /* Fetch user's progress for this course */
        const progress = await UserProgress.findOne({ userId, courseId }).lean();

        /* No progress record = user not enrolled or first lesson */
        if (!progress) {
            /* Allow access only to lesson 0 (first lesson) */
            if (lessonIndex === 0) {
                return next();
            }
            return ApiResponse.error(
                res,
                HTTP.FORBIDDEN,
                'Lesson locked. Complete previous lessons first.'
            );
        }

        /* Core lock logic: can only access lessons up to lockedUntilLesson */
        if (lessonIndex > progress.lockedUntilLesson) {
            return ApiResponse.error(
                res,
                HTTP.FORBIDDEN,
                `Lesson ${lessonIndex} is locked. Complete lesson ${progress.lockedUntilLesson} first.`
            );
        }

        /* Lesson is accessible — proceed */
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { checkLessonLock };
