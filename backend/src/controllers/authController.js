/**
 * authController.js - HTTP controller for auth endpoints.
 *
 * Controllers remain thin:
 * - Receive validated request
 * - Delegate business logic to service
 * - Return standardized API response
 */

const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const authService = require('../services/authService');
const { setRefreshCookie, clearRefreshCookie } = require('../utils/tokenUtils');
const { AUTH, HTTP } = require('../constants');

const register = asyncHandler(async (req, res) => {
    const result = await authService.register(req.body);
    setRefreshCookie(res, result.refreshToken);

    return ApiResponse.success(res, HTTP.CREATED, 'User registered successfully.', {
        user: result.user,
        accessToken: result.accessToken,
    });
});

const login = asyncHandler(async (req, res) => {
    const result = await authService.login(req.body);
    setRefreshCookie(res, result.refreshToken);

    return ApiResponse.success(res, HTTP.OK, 'Login successful.', {
        user: result.user,
        accessToken: result.accessToken,
        resume: result.resume,
    });
});

const refresh = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies?.[AUTH.COOKIE_NAME];
    const result = await authService.refresh({ refreshToken });
    setRefreshCookie(res, result.refreshToken);

    return ApiResponse.success(res, HTTP.OK, 'Token refreshed successfully.', {
        accessToken: result.accessToken,
    });
});

const logout = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies?.[AUTH.COOKIE_NAME];
    await authService.logout({ refreshToken });
    clearRefreshCookie(res);

    return ApiResponse.success(res, HTTP.OK, 'Logout successful.');
});

const getMe = asyncHandler(async (req, res) => {
    const user = await authService.getCurrentUserProfile(req.user._id);
    return ApiResponse.success(res, HTTP.OK, 'User profile fetched successfully.', { user });
});

module.exports = {
    register,
    login,
    refresh,
    logout,
    getMe,
};
