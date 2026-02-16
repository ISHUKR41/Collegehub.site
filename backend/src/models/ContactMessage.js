/**
 * ContactMessage.js - Contact form submissions from website visitors.
 *
 * Why this model exists:
 * - Replaces placeholder contact handling with persistent storage.
 * - Enables support-team workflows (unread/in-progress/resolved states).
 * - Keeps an auditable history of user inquiries.
 *
 * To extend:
 * - Add assignment fields (assignedTo, priority).
 * - Add reply tracking and SLA timestamps.
 */

const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            minlength: [2, 'Name must be at least 2 characters'],
            maxlength: [100, 'Name cannot exceed 100 characters'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
            index: true,
        },
        subject: {
            type: String,
            required: [true, 'Subject is required'],
            trim: true,
            minlength: [3, 'Subject must be at least 3 characters'],
            maxlength: [160, 'Subject cannot exceed 160 characters'],
        },
        message: {
            type: String,
            required: [true, 'Message is required'],
            trim: true,
            minlength: [10, 'Message must be at least 10 characters'],
            maxlength: [5000, 'Message cannot exceed 5000 characters'],
        },
        source: {
            type: String,
            enum: ['website', 'dashboard', 'mobile', 'landing', 'unknown'],
            default: 'website',
            index: true,
        },
        status: {
            type: String,
            enum: ['new', 'in_progress', 'resolved', 'spam'],
            default: 'new',
            index: true,
        },
        submittedFromIp: {
            type: String,
            default: null,
        },
        userAgent: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

contactMessageSchema.index({ createdAt: -1 });

module.exports = mongoose.model('ContactMessage', contactMessageSchema);
