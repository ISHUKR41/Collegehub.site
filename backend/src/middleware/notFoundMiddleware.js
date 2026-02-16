/**
 * notFoundMiddleware.js - Handles unknown routes.
 *
 * Why explicit 404 middleware:
 * - Provides consistent JSON response format.
 * - Prevents default HTML 404 response from Express.
 * - Makes frontend error handling predictable.
 */

const ApiResponse = require('../utils/ApiResponse');
const { HTTP } = require('../constants');

const notFound = (req, res) => {
    return ApiResponse.error(res, HTTP.NOT_FOUND, `Route not found: ${req.method} ${req.originalUrl}`);
};

module.exports = { notFound };

