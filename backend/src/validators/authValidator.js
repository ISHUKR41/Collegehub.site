/**
 * authValidator.js - Zod schemas for authentication routes.
 *
 * Why these validations exist:
 * - Enforces strong password policy at the API boundary.
 * - Normalizes emails before service/database checks.
 * - Protects admin role creation behind invite code field validation.
 */

const { z } = require('zod');
const { ROLES } = require('../constants');

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
            .trim()
            .toLowerCase(),
        password: z
            .string({ required_error: 'Password is required' })
            .min(8, 'Password must be at least 8 characters')
            .max(128, 'Password cannot exceed 128 characters')
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                'Password must contain at least one uppercase letter, one lowercase letter, and one number'
            ),
        role: z.enum([ROLES.STUDENT, ROLES.ADMIN]).optional().default(ROLES.STUDENT),
        adminInviteCode: z.string().optional(),
    }),
});

const loginSchema = z.object({
    body: z.object({
        email: z
            .string({ required_error: 'Email is required' })
            .email('Please provide a valid email address')
            .trim()
            .toLowerCase(),
        password: z
            .string({ required_error: 'Password is required' })
            .min(1, 'Password is required'),
    }),
});

const refreshSchema = z.object({
    body: z.object({}).optional(),
});

module.exports = {
    registerSchema,
    loginSchema,
    refreshSchema,
};