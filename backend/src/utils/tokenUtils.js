/**
 * tokenUtils.js — JWT Token Utilities
 *
 * Handles all token operations:
 * - Generate access token (short-lived, 15 min)
 * - Generate refresh token (long-lived, 7 days)
 * - Hash refresh token for secure DB storage
 * - Set refresh token as httpOnly cookie
 *
 * Why separate file: Token logic is critical security code. Isolating it
 * makes it easy to audit, test, and swap implementations if needed.
 *
 * Security decisions:
 * - Access tokens are short-lived to minimize damage if leaked
 * - Refresh tokens are hashed before DB storage (if DB leaks, tokens unusable)
 * - httpOnly cookies prevent XSS from accessing tokens
 * - Secure flag ensures cookies only sent over HTTPS in production
 *
 * To extend: Add token blacklisting, IP binding, or device fingerprinting.
 */

const jwt = require('jsonwebtoken');
const crypto = require('crypto');

/**
 * Generate a short-lived access token.
 * Contains only userId and role — minimal claims for security.
 */
const generateAccessToken = (userId, role) => {
    return jwt.sign(
        { userId, role },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m' }
    );
};

/**
 * Generate a long-lived refresh token.
 * Contains only userId — used solely for token rotation.
 */
const generateRefreshToken = (userId) => {
    return jwt.sign(
        { userId },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
    );
};

/**
 * Hash a refresh token using SHA-256.
 * We never store raw refresh tokens in the database.
 * If the database is compromised, attackers cannot reconstruct valid tokens.
 */
const hashToken = (token) => {
    return crypto.createHash('sha256').update(token).digest('hex');
};

/**
 * Set refresh token as an httpOnly cookie on the response.
 * The cookie is:
 * - httpOnly: JS cannot read it (XSS protection)
 * - secure: only sent over HTTPS in production
 * - sameSite strict: CSRF protection
 * - 7 days expiry
 */
const setRefreshCookie = (res, token) => {
    const isProduction = process.env.NODE_ENV === 'production';

    res.cookie('refreshToken', token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'strict' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, /* 7 days in ms */
        path: '/api/auth', /* Only sent to auth endpoints */
    });
};

/**
 * Clear the refresh token cookie (used during logout).
 */
const clearRefreshCookie = (res) => {
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
        path: '/api/auth',
    });
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    hashToken,
    setRefreshCookie,
    clearRefreshCookie,
};
