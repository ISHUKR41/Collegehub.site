/**
 * dashboardController.js - HTTP controller for dashboard analytics endpoint.
 */

const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const dashboardService = require('../services/dashboardService');
const { HTTP } = require('../constants');

const getDashboard = asyncHandler(async (req, res) => {
    const dashboard = await dashboardService.getDashboardOverview(req.user._id.toString());
    return ApiResponse.success(res, HTTP.OK, 'Dashboard analytics fetched successfully.', { dashboard });
});

module.exports = {
    getDashboard,
};

