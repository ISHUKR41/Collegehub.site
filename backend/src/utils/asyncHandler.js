/**
 * asyncHandler.js — Async Error Wrapper
 *
 * Wraps async route handlers so thrown errors are automatically
 * passed to Express error middleware. Eliminates try/catch blocks
 * in every controller.
 *
 * Usage:
 *   router.get('/users', asyncHandler(async (req, res) => { ... }));
 *
 * Why: DRY principle. Without this, every async handler needs its own
 * try/catch, which is repetitive and error-prone.
 *
 * To extend: Add request timing or automatic logging.
 */

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
