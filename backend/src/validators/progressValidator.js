/**
 * progressValidator.js - Zod schemas for enrollment/progress routes.
 *
 * Why these schemas matter:
 * - Maintains strict lock/resume payload quality.
 * - Ensures lesson indexes are non-negative integers.
 * - Ensures all course identifiers are valid Mongo ObjectIds.
 */

const { z } = require('zod');
const { objectIdSchema } = require('./commonValidators');

const enrollSchema = z.object({
    body: z.object({
        courseId: objectIdSchema,
    }),
});

const courseProgressParamSchema = z.object({
    params: z.object({
        courseId: objectIdSchema,
    }),
});

const completeLessonSchema = z.object({
    params: z.object({
        courseId: objectIdSchema,
    }),
    body: z.object({
        lessonIndex: z.coerce
            .number({ required_error: 'Lesson index is required' })
            .int('Lesson index must be an integer')
            .min(0, 'Lesson index cannot be negative'),
    }),
});

const updateLastWatchedSchema = z.object({
    params: z.object({
        courseId: objectIdSchema,
    }),
    body: z.object({
        lessonIndex: z.coerce
            .number({ required_error: 'Lesson index is required' })
            .int('Lesson index must be an integer')
            .min(0, 'Lesson index cannot be negative'),
        subjectId: objectIdSchema.optional().nullable(),
        chapterId: objectIdSchema.optional().nullable(),
    }),
});

const lessonAccessQuerySchema = z.object({
    params: z.object({
        courseId: objectIdSchema,
    }),
    query: z.object({
        lessonIndex: z.coerce.number().int().min(0),
    }),
});

const lessonContentParamSchema = z.object({
    params: z.object({
        courseId: objectIdSchema,
        lessonIndex: z.coerce.number().int().min(0),
    }),
});

module.exports = {
    enrollSchema,
    courseProgressParamSchema,
    completeLessonSchema,
    updateLastWatchedSchema,
    lessonAccessQuerySchema,
    lessonContentParamSchema,
};
