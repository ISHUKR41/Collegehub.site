/**
 * commonValidators.js - Reusable Zod validators shared across modules.
 *
 * Why this file:
 * - Avoids repeating the same ObjectId regex in every validator.
 * - Keeps route schemas concise and consistent.
 */

const { z } = require('zod');

const objectIdSchema = z
    .string({ required_error: 'Mongo ObjectId is required' })
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid Mongo ObjectId format');

module.exports = {
    objectIdSchema,
};

