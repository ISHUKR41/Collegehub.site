/**
 * testController.js - HTTP controller for test management and submission APIs.
 */

const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const testService = require('../services/testService');
const { HTTP } = require('../constants');

const createTest = asyncHandler(async (req, res) => {
    const test = await testService.createTest(req.body);
    return ApiResponse.success(res, HTTP.CREATED, 'Test created successfully.', { test });
});

const listTestsForCourse = asyncHandler(async (req, res) => {
    const tests = await testService.listTestsForCourse({
        ...req.query,
        requester: req.user,
    });
    return ApiResponse.success(res, HTTP.OK, 'Tests fetched successfully.', { tests });
});

const getTestForAttempt = asyncHandler(async (req, res) => {
    const test = await testService.getTestForAttempt(req.user._id, req.params.testId);
    return ApiResponse.success(res, HTTP.OK, 'Test fetched successfully.', { test });
});

const submitTest = asyncHandler(async (req, res) => {
    const result = await testService.submitTest(req.user._id, req.body);
    return ApiResponse.success(res, HTTP.OK, 'Test submitted successfully.', { result });
});

module.exports = {
    createTest,
    listTestsForCourse,
    getTestForAttempt,
    submitTest,
};
