/**
 * testValidator.js - Zod schemas for assessment routes.
 *
 * Why these schemas:
 * - Prevents invalid question sets from entering database.
 * - Ensures answer arrays are bounded and aligned with expected format.
 * - Keeps analytics engine assumptions valid.
 */

const { z } = require('zod');
const { objectIdSchema } = require('./commonValidators');

const questionSchema = z.object({
    questionText: z.string().min(1, 'Question text is required').max(1000).trim(),
    options: z
        .array(z.string().min(1).max(400))
        .length(4, 'Each question must include exactly four options.'),
    correctAnswer: z.coerce.number().int().min(0).max(3),
    topicTag: z.string().min(1, 'Topic tag is required').max(100).trim().toLowerCase(),
    difficulty: z.enum(['easy', 'medium', 'hard']).optional().default('medium'),
    explanation: z.string().max(1000).optional().default(''),
});

const createTestSchema = z.object({
    body: z.object({
        title: z.string().min(1, 'Test title is required').max(200).trim(),
        courseId: objectIdSchema,
        subjectId: objectIdSchema.optional().nullable(),
        chapterId: objectIdSchema.optional().nullable(),
        timeLimit: z.coerce.number().int().min(0).optional().default(0),
        isActive: z.boolean().optional().default(true),
        questions: z.array(questionSchema).min(1, 'Test must contain at least one question.'),
    }),
});

const testIdParamSchema = z.object({
    params: z.object({
        testId: objectIdSchema,
    }),
});

const courseTestQuerySchema = z.object({
    query: z.object({
        courseId: objectIdSchema,
        subjectId: objectIdSchema.optional(),
        chapterId: objectIdSchema.optional(),
        onlyActive: z.coerce.boolean().optional().default(true),
    }),
});

const submitTestSchema = z.object({
    body: z.object({
        testId: objectIdSchema,
        answers: z.array(z.coerce.number().int().min(0).max(3)).min(1),
    }),
});

module.exports = {
    createTestSchema,
    testIdParamSchema,
    courseTestQuerySchema,
    submitTestSchema,
};

