/**
 * courseController.js - HTTP controller for course APIs.
 */

const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const courseService = require('../services/courseService');
const { HTTP } = require('../constants');

const listPublicCourses = asyncHandler(async (req, res) => {
    const courses = await courseService.listCourses({
        ...req.query,
        includeUnpublished: false,
    });
    return ApiResponse.success(res, HTTP.OK, 'Courses fetched successfully.', { courses });
});

const listAdminCourses = asyncHandler(async (req, res) => {
    const courses = await courseService.listCourses({
        ...req.query,
        includeUnpublished: true,
    });
    return ApiResponse.success(res, HTTP.OK, 'Admin courses fetched successfully.', { courses });
});

const getPublicCourseById = asyncHandler(async (req, res) => {
    const course = await courseService.getCourseById({
        courseId: req.params.courseId,
        includeUnpublished: false,
    });
    return ApiResponse.success(res, HTTP.OK, 'Course fetched successfully.', { course });
});

const getAdminCourseById = asyncHandler(async (req, res) => {
    const course = await courseService.getCourseById({
        courseId: req.params.courseId,
        includeUnpublished: true,
    });
    return ApiResponse.success(res, HTTP.OK, 'Course fetched successfully.', { course });
});

const createCourse = asyncHandler(async (req, res) => {
    const course = await courseService.createCourse(req.user._id, req.body);
    return ApiResponse.success(res, HTTP.CREATED, 'Course created successfully.', { course });
});

const updateCourse = asyncHandler(async (req, res) => {
    const course = await courseService.updateCourse(req.params.courseId, req.body);
    return ApiResponse.success(res, HTTP.OK, 'Course updated successfully.', { course });
});

const deleteCourse = asyncHandler(async (req, res) => {
    await courseService.deleteCourse(req.params.courseId);
    return ApiResponse.success(res, HTTP.OK, 'Course deleted successfully.');
});

module.exports = {
    listPublicCourses,
    listAdminCourses,
    getPublicCourseById,
    getAdminCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
};

