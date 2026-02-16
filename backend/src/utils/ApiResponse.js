/**
 * ApiResponse.js — Standardized API Response Format
 *
 * Ensures every API response follows a consistent structure:
 * {
 *   success: true/false,
 *   message: "Human-readable message",
 *   data: { ... } or null,
 *   error: { ... } or null
 * }
 *
 * Why: Frontend developers can always expect the same shape.
 * Makes error handling, loading states, and toast messages predictable.
 *
 * To extend: Add pagination metadata, request ID, or timestamps.
 */

class ApiResponse {
    /**
     * Send a success response.
     * @param {object} res - Express response object
     * @param {number} statusCode - HTTP status code (200, 201, etc.)
     * @param {string} message - Human-readable success message
     * @param {object|null} data - Response payload
     */
    static success(res, statusCode, message, data = null) {
        return res.status(statusCode).json({
            success: true,
            message,
            data,
        });
    }

    /**
     * Send an error response.
     * @param {object} res - Express response object
     * @param {number} statusCode - HTTP status code (400, 401, 500, etc.)
     * @param {string} message - Human-readable error message
     * @param {object|null} errors - Validation errors or additional details
     */
    static error(res, statusCode, message, errors = null) {
        const response = {
            success: false,
            message,
        };

        /* Only include errors field if there are actual error details */
        if (errors) {
            response.errors = errors;
        }

        return res.status(statusCode).json(response);
    }
}

module.exports = ApiResponse;
