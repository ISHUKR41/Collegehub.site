/**
 * roleMiddleware.js — Role-Based Access Control
 *
 * Factory function that returns middleware to restrict routes
 * to specific roles (e.g., admin-only endpoints).
 *
 * Usage:
 *   router.post('/courses', protect, requireRole('admin'), createCourse);
 *
 * Why factory pattern: Flexible — works with any role or combination
 * of roles without writing separate middleware for each.
 *
 * To extend: Add permission-based checks (RBAC with granular permissions).
 */

const ApiResponse = require('../utils/ApiResponse');
const { HTTP } = require('../constants');

/**
 * requireRole — Creates middleware that checks if user has required role.
 * @param  {...string} roles - One or more allowed roles
 * @returns {Function} Express middleware
 *
 * Example: requireRole('admin') or requireRole('admin', 'teacher')
 */
const requireRole = (...roles) => {
    return (req, res, next) => {
        /* protect middleware must run first to set req.user */
        if (!req.user) {
            return ApiResponse.error(res, HTTP.UNAUTHORIZED, 'Authentication required.');
        }

        if (!roles.includes(req.user.role)) {
            return ApiResponse.error(
                res,
                HTTP.FORBIDDEN,
                `Access denied. Required role: ${roles.join(' or ')}.`
            );
        }

        next();
    };
};

module.exports = { requireRole };
