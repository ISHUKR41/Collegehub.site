/**
 * authValidator.js — Zod Validation Schemas for Auth Endpoints
 *
 * Validates request bodies BEFORE they reach controllers.
 * Catches malformed input early with clear error messages.
 *
 * Why Zod: TypeScript-first, composable, excellent error messages,
 * and much lighter than Joi. Perfect for modern Node.js APIs.
 *
 * Usage in routes:
 *   router.post('/register', validate(registerSchema), register);
 *
 * To extend: Add password strength rules, username validation.
 */

const { z } = require('zod');

/* Register — requires name, email, and strong password */
const registerSchema = z.object({
    body: z.object({
        name: z
            .string({ required_error: 'Name is required' })
            .min(2, 'Name must be at least 2 characters')
            .max(100, 'Name cannot exceed 100 characters')
            .trim(),

        email: z
            .string({ required_error: 'Email is required' })
            .email('Please provide a valid email address')
            .toLowerCase()
            .trim(),

        password: z
            .string({ required_error: 'Password is required' })
            .min(8, 'Password must be at least 8 characters')
            .max(128, 'Password cannot exceed 128 characters')
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                'Password must contain at least one uppercase letter, one lowercase letter, and one number'
            ),
    }),
});

/* Login — only email and password */
const loginSchema = z.object({
    body: z.object({
        email: z
            .string({ required_error: 'Email is required' })
            .email('Please provide a valid email address')
            .toLowerCase()
            .trim(),

        password: z
            .string({ required_error: 'Password is required' })
            .min(1, 'Password is required'),
    }),
});

/**
 * validate — Middleware factory that validates req against a Zod schema.
 * Parses req.body, req.query, and req.params as needed.
 */
const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    } catch (error) {
        /* Pass Zod error to centralized error handler */
        error.name = 'ZodError';
        next(error);
    }
};

module.exports = { registerSchema, loginSchema, validate };
