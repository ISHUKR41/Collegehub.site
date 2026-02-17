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

/**
 * googleCallback - Handles the redirect back from Google OAuth.
 *
 * Passport has already validated the Google profile and created/found
 * the user via googleAuthService. We just need to set cookies and redirect
 * the user to the frontend with an access token.
 */
const googleCallback = asyncHandler(async (req, res) => {
    const result = req.user;

    if (!result || !result.accessToken) {
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
        return res.redirect(`${frontendUrl}/login?error=google_auth_failed`);
    }

    setRefreshCookie(res, result.refreshToken);

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const callbackPath = `/auth/callback?token=${encodeURIComponent(result.accessToken)}`;

    return res.redirect(`${frontendUrl}${callbackPath}`);
});

module.exports = {
    register,
    login,
    refresh,
    logout,
    getMe,
    googleCallback,
};
