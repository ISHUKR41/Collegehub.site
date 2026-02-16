/**
 * authMiddleware.js — JWT Authentication Middleware
 *
 * Extracts JWT from the Authorization header, verifies it,
 * and attaches the decoded user info to req.user.
 *
 * Format expected: "Bearer <access_token>"
 *
 * Why middleware: Keeps auth logic in one place. Route files just
 * add `protect` to any route that needs authentication.
 *
 * To extend: Add API key support, OAuth token verification.
 */

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ApiResponse = require('../utils/ApiResponse');
const { HTTP } = require('../constants');

/**
 * protect — Verifies access token and loads user from DB.
 * Rejects if token is missing, expired, or user no longer exists.
 */
const protect = async (req, res, next) => {
    try {
        /* 1. Extract token from Authorization header */
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return ApiResponse.error(res, HTTP.UNAUTHORIZED, 'Access denied. No token provided.');
        }

        const token = authHeader.split(' ')[1];

        /* 2. Verify token */
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                return ApiResponse.error(res, HTTP.UNAUTHORIZED, 'Token expired. Please refresh your session.');
            }
            return ApiResponse.error(res, HTTP.UNAUTHORIZED, 'Invalid token.');
        }

        /* 3. Confirm user still exists (handles deleted accounts) */
        const user = await User.findById(decoded.userId).select('-password -refreshTokenHash');

        if (!user) {
            return ApiResponse.error(res, HTTP.UNAUTHORIZED, 'User no longer exists.');
        }

        /* 4. Attach user to request for downstream use */
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { protect };
