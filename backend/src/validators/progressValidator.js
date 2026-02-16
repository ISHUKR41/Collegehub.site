/**
 * progressValidator.js — Zod Validation for Progress & Test Endpoints
 *
 * Validates lesson completion, resume updates, and test submissions.
 *
 * To extend: Add validation for batch lesson completion,
 * or custom time-tracking payloads.
 */

const { z } = require('zod');

/* Mark a lesson as completed */
const completeLessonSchema = z.object({
    body: z.object({
        lessonIndex: z
            .number({ required_error: 'Lesson index is required' })
            .int('Lesson index must be an integer')
            .min(0, 'Lesson index cannot be negative'),
    }),
    params: z.object({
        courseId: z.string().min(1, 'Course ID is required'),
    }),
});

/* Update last watched position */
const updateLastWatchedSchema = z.object({
    body: z.object({
        lessonIndex: z
            .number({ required_error: 'Lesson index is required' })
            .int()
            .min(0),
        subjectId: z.string().optional().nullable(),
        chapterId: z.string().optional().nullable(),
    }),
    params: z.object({
        courseId: z.string().min(1, 'Course ID is required'),
    }),
});

/* Submit test answers */
const submitTestSchema = z.object({
    body: z.object({
        testId: z.string({ required_error: 'Test ID is required' }).min(1),
        answers: z
            .array(
                z.number().int().min(0).max(3) /* Option index 0-3 */
            )
            .min(1, 'At least one answer is required'),
    }),
});

module.exports = {
    completeLessonSchema,
    updateLastWatchedSchema,
    submitTestSchema,
};
