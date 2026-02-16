/**
 * courseValidator.js — Zod Validation for Course Endpoints
 *
 * Validates course creation and update payloads.
 * Ensures category/subCategory combinations are valid.
 *
 * To extend: Add validation for individual lesson fields,
 * or custom refinements for category-specific structures.
 */

const { z } = require('zod');
const { CATEGORIES, SUB_CATEGORIES } = require('../constants');

/* Lesson sub-schema */
const lessonSchema = z.object({
    title: z.string().min(1, 'Lesson title is required').trim(),
    description: z.string().optional().default(''),
    contentType: z.enum(['video', 'text', 'quiz', 'practice']).optional().default('text'),
    contentUrl: z.string().optional().default(''),
    duration: z.number().min(0).optional().default(0),
    order: z.number().int().min(0),
});

/* Chapter sub-schema (for school courses) */
const chapterSchema = z.object({
    title: z.string().min(1, 'Chapter title is required').trim(),
    description: z.string().optional().default(''),
    lessons: z.array(lessonSchema).optional().default([]),
    order: z.number().int().min(0),
});

/* Subject sub-schema (for school courses) */
const subjectSchema = z.object({
    name: z.string().min(1, 'Subject name is required').trim(),
    icon: z.string().optional().default('BookOpen'),
    color: z.string().optional().default('#6366f1'),
    chapters: z.array(chapterSchema).optional().default([]),
    order: z.number().int().min(0),
});

/* Topic sub-schema (for coding courses) */
const topicSchema = z.object({
    title: z.string().min(1, 'Topic title is required').trim(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional().default('beginner'),
    lessons: z.array(lessonSchema).optional().default([]),
    order: z.number().int().min(0),
});

/* Module sub-schema (for coding courses) */
const moduleSchema = z.object({
    title: z.string().min(1, 'Module title is required').trim(),
    description: z.string().optional().default(''),
    topics: z.array(topicSchema).optional().default([]),
    order: z.number().int().min(0),
});

/* Create course — full schema */
const createCourseSchema = z.object({
    body: z.object({
        title: z
            .string({ required_error: 'Course title is required' })
            .min(1)
            .max(200)
            .trim(),

        description: z.string().max(2000).optional().default(''),

        category: z.enum(Object.values(CATEGORIES), {
            errorMap: () => ({ message: `Category must be one of: ${Object.values(CATEGORIES).join(', ')}` }),
        }),

        subCategory: z.enum(Object.values(SUB_CATEGORIES), {
            errorMap: () => ({ message: `Sub-category must be one of: ${Object.values(SUB_CATEGORIES).join(', ')}` }),
        }),

        subjects: z.array(subjectSchema).optional().default([]),
        modules: z.array(moduleSchema).optional().default([]),
        isPublished: z.boolean().optional().default(false),
    }),
});

/* Update course — all fields optional */
const updateCourseSchema = z.object({
    body: z.object({
        title: z.string().min(1).max(200).trim().optional(),
        description: z.string().max(2000).optional(),
        category: z.enum(Object.values(CATEGORIES)).optional(),
        subCategory: z.enum(Object.values(SUB_CATEGORIES)).optional(),
        subjects: z.array(subjectSchema).optional(),
        modules: z.array(moduleSchema).optional(),
        isPublished: z.boolean().optional(),
    }),
});

module.exports = { createCourseSchema, updateCourseSchema };
