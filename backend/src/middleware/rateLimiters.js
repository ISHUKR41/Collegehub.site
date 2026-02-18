/**
 * rateLimiters.js - Centralized API rate-limit definitions.
 *
 * Why centralized:
 * - Same response format across endpoints.
 * - Easy to tune limits per endpoint class from constants.
 * - Prevents duplication in route files.
 */

const rateLimit = require('express-rate-limit');
const ApiResponse = require('../utils/ApiResponse');
const { HTTP, RATE_LIMIT } = require('../constants');

const buildLimiter = ({ windowMs, max, message }) =>
    rateLimit({
        windowMs,
        max,
        standardHeaders: true,
        legacyHeaders: false,
        handler: (req, res) => ApiResponse.error(res, HTTP.TOO_MANY_REQUESTS, message),
    });

const apiRateLimiter = buildLimiter({
    ...RATE_LIMIT.GENERAL,
    message: 'Too many requests. Please try again shortly.',
});

const authRateLimiter = buildLimiter({
    ...RATE_LIMIT.AUTH,
    message: 'Too many authentication attempts. Please try again later.',
});

const loginRateLimiter = buildLimiter({
    ...RATE_LIMIT.LOGIN,
    message: 'Too many login attempts. Please wait before retrying.',
});

const codeExecutionRateLimiter = buildLimiter({
    ...RATE_LIMIT.CODE_EXECUTION,
    message: 'Code execution rate limit reached. Please wait a moment and retry.',
});

const contactRateLimiter = buildLimiter({
    ...RATE_LIMIT.CONTACT,
    message: 'Too many contact requests. Please try again later.',
});

const newsletterRateLimiter = buildLimiter({
    ...RATE_LIMIT.NEWSLETTER,
    message: 'Too many newsletter requests. Please try again later.',
});

module.exports = {
    apiRateLimiter,
    authRateLimiter,
    loginRateLimiter,
    codeExecutionRateLimiter,
    contactRateLimiter,
    newsletterRateLimiter,
};
