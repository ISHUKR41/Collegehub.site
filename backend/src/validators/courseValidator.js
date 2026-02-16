/**
 * courseValidator.js - Zod schemas for course APIs.
 *
 * Why these validations exist:
 * - Blocks invalid category/sub-category combinations.
 * - Enforces school and coding structure boundaries.
 * - Keeps malformed nested course payloads out of services.
 */

const { z } = require('zod');
const { CATEGORIES, SUB_CATEGORIES, CATEGORY_SUB_MAP } = require('../constants');
const { objectIdSchema } = require('./commonValidators');

const lessonSchema = z.object({
    title: z.string().min(1, 'Lesson title is required').trim(),
    description: z.string().max(1000).optional().default(''),
    contentType: z.enum(['video', 'text', 'quiz', 'practice']).optional().default('text'),
    contentUrl: z.string().url('Invalid lesson content URL').optional().or(z.literal('')).default(''),
    duration: z.coerce.number().min(0).optional().default(0),
    order: z.coerce.number().int().min(0),
});

const chapterSchema = z.object({
    title: z.string().min(1, 'Chapter title is required').trim(),
    description: z.string().max(1000).optional().default(''),
    lessons: z.array(lessonSchema).optional().default([]),
    order: z.coerce.number().int().min(0),
});

const subjectSchema = z.object({
    name: z.string().min(1, 'Subject name is required').trim(),
    icon: z.string().optional().default('BookOpen'),
    color: z.string().optional().default('#6366f1'),
    chapters: z.array(chapterSchema).optional().default([]),
    order: z.coerce.number().int().min(0),
});

const topicSchema = z.object({
    title: z.string().min(1, 'Topic title is required').trim(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional().default('beginner'),
    lessons: z.array(lessonSchema).optional().default([]),
    order: z.coerce.number().int().min(0),
});

const moduleSchema = z.object({
    title: z.string().min(1, 'Module title is required').trim(),
    description: z.string().max(1000).optional().default(''),
    topics: z.array(topicSchema).optional().default([]),
    order: z.coerce.number().int().min(0),
});

const createCourseBodySchema = z
    .object({
        title: z.string({ required_error: 'Course title is required' }).min(1).max(200).trim(),
        description: z.string().max(2000).optional().default(''),
        category: z.enum(Object.values(CATEGORIES)),
        subCategory: z.enum(Object.values(SUB_CATEGORIES)),
        subjects: z.array(subjectSchema).optional().default([]),
        modules: z.array(moduleSchema).optional().default([]),
        isPublished: z.boolean().optional().default(false),
    })
    .superRefine((value, ctx) => {
        const validSubCategories = CATEGORY_SUB_MAP[value.category] || [];

        if (!validSubCategories.includes(value.subCategory)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['subCategory'],
                message: `Sub-category "${value.subCategory}" does not belong to category "${value.category}"`,
            });
        }

        if (value.category === CATEGORIES.SCHOOL) {
            if (value.subjects.length === 0) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['subjects'],
                    message: 'School courses must include at least one subject.',
                });
            }

            if (value.modules.length > 0) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['modules'],
                    message: 'School courses cannot include coding modules.',
                });
            }
        }

        if (value.category === CATEGORIES.CODING) {
            if (value.modules.length === 0) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['modules'],
                    message: 'Coding courses must include at least one module.',
                });
            }

            if (value.subjects.length > 0) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['subjects'],
                    message: 'Coding courses cannot include school subjects.',
                });
            }
        }
    });

const updateCourseBodySchema = z
    .object({
        title: z.string().min(1).max(200).trim().optional(),
        description: z.string().max(2000).optional(),
        category: z.enum(Object.values(CATEGORIES)).optional(),
        subCategory: z.enum(Object.values(SUB_CATEGORIES)).optional(),
        subjects: z.array(subjectSchema).optional(),
        modules: z.array(moduleSchema).optional(),
        isPublished: z.boolean().optional(),
    })
    .refine((value) => Object.keys(value).length > 0, {
        message: 'Provide at least one field to update.',
    });

const courseIdParamSchema = z.object({
    params: z.object({
        courseId: objectIdSchema,
    }),
});

const createCourseSchema = z.object({
    body: createCourseBodySchema,
});

const updateCourseSchema = z.object({
    params: z.object({
        courseId: objectIdSchema,
    }),
    body: updateCourseBodySchema,
});

const listCourseQuerySchema = z.object({
    query: z.object({
        category: z.enum(Object.values(CATEGORIES)).optional(),
        subCategory: z.enum(Object.values(SUB_CATEGORIES)).optional(),
        search: z.string().trim().optional(),
        includeUnpublished: z.coerce.boolean().optional(),
    }),
});

module.exports = {
    createCourseSchema,
    updateCourseSchema,
    listCourseQuerySchema,
    courseIdParamSchema,
};