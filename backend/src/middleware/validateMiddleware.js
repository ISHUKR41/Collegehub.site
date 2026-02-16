/**
 * validateMiddleware.js - Generic Zod validation middleware factory.
 *
 * Why this middleware exists:
 * - Keeps validation concern out of controllers.
 * - Guarantees sanitized, typed payloads enter business logic.
 * - Reuses one implementation across all routes.
 *
 * To extend: support custom per-route error formatter if frontend contract
 * changes in the future.
 */

const validate = (schema) => (req, res, next) => {
    try {
        const parsed = schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });

        /*
         * Zod may coerce/transform values (for example string -> number).
         * We write parsed values back so services always receive clean input.
         */
        if (parsed.body) req.body = parsed.body;
        if (parsed.query) req.query = parsed.query;
        if (parsed.params) req.params = parsed.params;

        next();
    } catch (error) {
        error.name = 'ZodError';
        next(error);
    }
};

module.exports = validate;

