/**
 * contactValidator.js - Zod schemas for contact/newsletter APIs.
 */

const { z } = require('zod');

const sourceEnum = z.enum(['website', 'dashboard', 'mobile', 'landing', 'unknown']);

const submitContactSchema = z.object({
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
        subject: z
            .string({ required_error: 'Subject is required' })
            .min(3, 'Subject must be at least 3 characters')
            .max(160, 'Subject cannot exceed 160 characters')
            .trim(),
        message: z
            .string({ required_error: 'Message is required' })
            .min(10, 'Message must be at least 10 characters')
            .max(5000, 'Message cannot exceed 5000 characters')
            .trim(),
        source: sourceEnum.optional().default('website'),
    }),
});

const subscribeNewsletterSchema = z.object({
    body: z.object({
        email: z
            .string({ required_error: 'Email is required' })
            .email('Please provide a valid email address')
            .trim()
            .toLowerCase(),
        source: sourceEnum.optional().default('website'),
    }),
});

const unsubscribeNewsletterSchema = z.object({
    body: z.object({
        email: z
            .string({ required_error: 'Email is required' })
            .email('Please provide a valid email address')
            .trim()
            .toLowerCase(),
    }),
});

const listContactMessagesQuerySchema = z.object({
    query: z.object({
        page: z.coerce.number().int().min(1).optional().default(1),
        limit: z.coerce.number().int().min(1).max(100).optional().default(20),
        status: z.enum(['new', 'in_progress', 'resolved', 'spam']).optional(),
    }),
});

module.exports = {
    submitContactSchema,
    subscribeNewsletterSchema,
    unsubscribeNewsletterSchema,
    listContactMessagesQuerySchema,
};

