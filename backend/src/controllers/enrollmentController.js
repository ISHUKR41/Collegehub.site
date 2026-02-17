/**
 * enrollmentController.js - HTTP controller for enrollment/progress endpoints.
 */

const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const progressService = require('../services/progressService');
const { HTTP } = require('../constants');

const enroll = asyncHandler(async (req, res) => {
    const result = await progressService.enrollInCourse(req.user._id, req.body.courseId);
    const statusCode = result.alreadyEnrolled ? HTTP.OK : HTTP.CREATED;
    return ApiResponse.success(
        res,
        statusCode,
        result.alreadyEnrolled ? 'Already enrolled in this course.' : 'Enrollment successful.',
        { progress: result.progress }
    );
});

const getMyEnrollments = asyncHandler(async (req, res) => {
    const enrollments = await progressService.getEnrolledCourses(req.user._id);
    return ApiResponse.success(res, HTTP.OK, 'Enrolled courses fetched successfully.', { enrollments });
});

const getCourseProgress = asyncHandler(async (req, res) => {
    const progress = await progressService.getCourseProgress(req.user._id, req.params.courseId);
    return ApiResponse.success(res, HTTP.OK, 'Course progress fetched successfully.', { progress });
});

const completeLesson = asyncHandler(async (req, res) => {
    const progress = await progressService.completeLesson(
        req.user._id,
        req.params.courseId,
        req.body.lessonIndex
    );
    return ApiResponse.success(res, HTTP.OK, 'Lesson marked as completed.', { progress });
});

const updateLastWatched = asyncHandler(async (req, res) => {
    const progress = await progressService.updateLastWatched(
        req.user._id,
        req.params.courseId,
        req.body.lessonIndex
    );
    return ApiResponse.success(res, HTTP.OK, 'Last watched lesson updated.', { progress });
});

const getResume = asyncHandler(async (req, res) => {
    const resume = await progressService.getResumeFeed(req.user._id);
    return ApiResponse.success(res, HTTP.OK, 'Resume data fetched successfully.', { resume });
});

const getLessonAccess = asyncHandler(async (req, res) => {
    const payload = await progressService.getLessonAccessPayload(
        req.user._id,
        req.params.courseId,
        Number(req.query.lessonIndex)
    );
    return ApiResponse.success(res, HTTP.OK, 'Lesson access validated.', payload);
});

const getLessonContent = asyncHandler(async (req, res) => {
    const lesson = await progressService.getLessonContent(
        req.user._id,
        req.params.courseId,
        Number(req.params.lessonIndex)
    );
    return ApiResponse.success(res, HTTP.OK, 'Lesson content fetched successfully.', { lesson });
});

module.exports = {
    enroll,
    getMyEnrollments,
    getCourseProgress,
    completeLesson,
    updateLastWatched,
    getResume,
    getLessonAccess,
    getLessonContent,
};
