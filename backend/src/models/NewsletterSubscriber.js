/**
 * NewsletterSubscriber.js - Marketing/newsletter subscription records.
 *
 * Why this model exists:
 * - Captures real newsletter signups from website forms.
 * - Prevents duplicate subscriptions via unique email index.
 * - Supports unsubscribe workflows with active/inactive state.
 *
 * To extend:
 * - Add double opt-in verification status.
 * - Add segmentation tags and campaign consent metadata.
 */

const mongoose = require('mongoose');

const newsletterSubscriberSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
            index: true,
        },
        source: {
            type: String,
            enum: ['website', 'dashboard', 'mobile', 'landing', 'unknown'],
            default: 'website',
        },
        isActive: {
            type: Boolean,
            default: true,
            index: true,
        },
        subscribedFromIp: {
            type: String,
            default: null,
        },
        userAgent: {
            type: String,
            default: null,
        },
        unsubscribedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

newsletterSubscriberSchema.index({ createdAt: -1 });

module.exports = mongoose.model('NewsletterSubscriber', newsletterSubscriberSchema);
