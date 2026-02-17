/**
 * errorMiddleware.js - Centralized API error handler.
 *
 * Handles:
 * - AppError (expected operational errors)
 * - Mongoose validation/cast/duplicate errors
 * - Zod validation errors
 * - JSON parse errors from malformed request bodies
 */

const logger = require('../config/logger');
const { HTTP } = require('../constants');

/* eslint-disable no-unused-vars */
const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || HTTP.INTERNAL_ERROR;
    let message = err.message || 'Internal server error';
    let errors = err.errors || null;

    if (err.name === 'ValidationError') {
        statusCode = HTTP.BAD_REQUEST;
        message = 'Validation failed';
        errors = Object.values(err.errors).map((issue) => ({
            field: issue.path,
            message: issue.message,
        }));
    }

    if (err.code === 11000) {
        statusCode = HTTP.CONFLICT;
        const field = Object.keys(err.keyValue)[0];
        message = `${field} already exists.`;
    }

    if (err.name === 'CastError') {
        statusCode = HTTP.BAD_REQUEST;
        message = `Invalid ${err.path}: ${err.value}`;
    }

    if (err.name === 'ZodError') {
        statusCode = HTTP.BAD_REQUEST;
        message = 'Validation failed';
        const zodIssues = Array.isArray(err.issues)
            ? err.issues
            : Array.isArray(err.errors)
                ? err.errors
                : [];

        errors = zodIssues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message,
        }));
    }

    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        statusCode = HTTP.BAD_REQUEST;
        message = 'Malformed JSON payload.';
    }

    if (message && message.includes('CORS policy violation')) {
        statusCode = HTTP.FORBIDDEN;
    }

    logger.error({
        message,
        statusCode,
        requestId: req.requestId,
        method: req.method,
        path: req.originalUrl,
        stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
    });

    const payload = {
        success: false,
        message,
        requestId: req.requestId,
    };

    if (errors) payload.errors = errors;
    if (process.env.NODE_ENV !== 'production') payload.stack = err.stack;

    return res.status(statusCode).json(payload);
};

module.exports = { errorHandler };
