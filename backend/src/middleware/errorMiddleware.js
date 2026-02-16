/**
 * errorMiddleware.js — Centralized Error Handler
 *
 * Catches all errors thrown in the app and returns standardized
 * JSON error responses. This is the LAST middleware in the chain.
 *
 * Features:
 * - Handles Mongoose validation errors
 * - Handles Mongoose duplicate key errors
 * - Handles Mongoose cast errors (invalid ObjectId)
 * - Handles Zod validation errors
 * - Hides stack traces in production
 * - Logs all errors via Winston
 *
 * Why centralized: One place to format all errors. Controllers never
 * need to worry about error response formatting.
 *
 * To extend: Add Sentry integration, Slack notifications for critical errors.
 */

const logger = require('../config/logger');
const { HTTP } = require('../constants');

/* eslint-disable no-unused-vars */
const errorHandler = (err, req, res, next) => {
    /* Default error values */
    let statusCode = err.statusCode || HTTP.INTERNAL_ERROR;
    let message = err.message || 'Internal server error';
    let errors = null;

    /* ---------------------------------------------------------------
       Mongoose Validation Error
       Occurs when required fields are missing or fail schema validation.
       --------------------------------------------------------------- */
    if (err.name === 'ValidationError') {
        statusCode = HTTP.BAD_REQUEST;
        message = 'Validation failed';
        errors = Object.values(err.errors).map((e) => ({
            field: e.path,
            message: e.message,
        }));
    }

    /* ---------------------------------------------------------------
       Mongoose Duplicate Key Error (code 11000)
       Occurs when a unique index constraint is violated (e.g., email).
       --------------------------------------------------------------- */
    if (err.code === 11000) {
        statusCode = HTTP.CONFLICT;
        const field = Object.keys(err.keyValue)[0];
        message = `Duplicate value for field: ${field}. This ${field} is already registered.`;
    }

    /* ---------------------------------------------------------------
       Mongoose Cast Error
       Occurs when an invalid ObjectId is passed in URL params.
       --------------------------------------------------------------- */
    if (err.name === 'CastError') {
        statusCode = HTTP.BAD_REQUEST;
        message = `Invalid ${err.path}: ${err.value}`;
    }

    /* ---------------------------------------------------------------
       Zod Validation Error
       Occurs when request body/params fail Zod schema validation.
       --------------------------------------------------------------- */
    if (err.name === 'ZodError') {
        statusCode = HTTP.BAD_REQUEST;
        message = 'Validation failed';
        errors = err.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
        }));
    }

    /* Log the error */
    logger.error(`${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

    /* In development, include stack trace for debugging */
    if (process.env.NODE_ENV !== 'production' && err.stack) {
        logger.debug(err.stack);
    }

    /* Send response */
    const response = {
        success: false,
        message,
    };

    if (errors) {
        response.errors = errors;
    }

    /* Never expose stack in production */
    if (process.env.NODE_ENV !== 'production') {
        response.stack = err.stack;
    }

    res.status(statusCode).json(response);
};

module.exports = { errorHandler };
