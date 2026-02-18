/**
 * codeController.js - HTTP controller for online code execution endpoint.
 */

const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const codeExecutionService = require('../services/codeExecutionService');
const { HTTP } = require('../constants');

const executeCode = asyncHandler(async (req, res) => {
    const result = await codeExecutionService.executeCode(req.body);

    return ApiResponse.success(res, HTTP.OK, 'Code execution completed.', { result });
});

module.exports = {
    executeCode,
};

