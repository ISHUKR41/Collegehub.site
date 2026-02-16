/**
 * AppError.js - Operational error class with explicit HTTP status codes.
 *
 * Controllers/services throw this for expected failures (validation, auth,
 * not found, forbidden). Central error middleware then returns a clean API
 * response without leaking internals.
 *
 * To extend: add machine-readable error codes for frontend i18n mapping.
 */

class AppError extends Error {
    constructor(statusCode, message, errors = null) {
        super(message);
        this.name = 'AppError';
        this.statusCode = statusCode;
        this.errors = errors;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;

