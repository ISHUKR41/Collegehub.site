/**
 * codeValidator.js - Request validation for in-browser code execution API.
 */

const { z } = require('zod');

const SUPPORTED_LANGUAGES = ['c', 'cpp', 'java', 'python'];

const executeCodeSchema = z.object({
    body: z.object({
        language: z.enum(SUPPORTED_LANGUAGES),
        code: z
            .string()
            .min(1, 'Code is required.')
            .max(60000, 'Code is too large. Keep it under 60,000 characters.'),
        input: z
            .string()
            .max(20000, 'Input is too large. Keep it under 20,000 characters.')
            .optional()
            .default(''),
    }),
});

module.exports = {
    SUPPORTED_LANGUAGES,
    executeCodeSchema,
};

