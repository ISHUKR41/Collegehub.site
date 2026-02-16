/**
 * Test.js — Test Schema (Mongoose)
 *
 * Defines the test/quiz model for assessments within courses.
 * Tests are linked to specific courses and optionally to subjects/chapters.
 *
 * Each question has:
 * - Question text
 * - Multiple choice options (A, B, C, D)
 * - Correct answer index
 * - Topic tag (for weakness analysis)
 * - Difficulty level
 *
 * Why separate collection: Keeps test data independent from course content.
 * Tests can be updated, versioned, and randomized without touching courses.
 *
 * To extend: Add open-ended questions, code submission questions,
 * time limits, or adaptive difficulty based on user performance.
 */

const mongoose = require('mongoose');

/* Individual question schema */
const questionSchema = new mongoose.Schema(
    {
        questionText: {
            type: String,
            required: [true, 'Question text is required'],
            trim: true,
        },

        /* Four options — always exactly 4 for consistency */
        options: {
            type: [String],
            validate: {
                validator: (arr) => arr.length === 4,
                message: 'Each question must have exactly 4 options.',
            },
            required: true,
        },

        /* Index of the correct option (0-3) */
        correctAnswer: {
            type: Number,
            required: [true, 'Correct answer index is required'],
            min: 0,
            max: 3,
        },

        /* Topic tag for weakness analysis — maps to weaknessAnalysis keys */
        topicTag: {
            type: String,
            required: [true, 'Topic tag is required for analytics'],
            trim: true,
            lowercase: true,
        },

        difficulty: {
            type: String,
            enum: ['easy', 'medium', 'hard'],
            default: 'medium',
        },

        /* Optional explanation shown after answering */
        explanation: {
            type: String,
            default: '',
        },
    },
    { _id: true }
);

/* Main Test schema */
const testSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Test title is required'],
            trim: true,
        },

        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            required: true,
            index: true,
        },

        /* Optional: link to specific subject (for school courses) */
        subjectId: {
            type: mongoose.Schema.Types.ObjectId,
            default: null,
        },

        /* Optional: link to specific chapter */
        chapterId: {
            type: mongoose.Schema.Types.ObjectId,
            default: null,
        },

        questions: {
            type: [questionSchema],
            validate: {
                validator: (arr) => arr.length >= 1,
                message: 'Test must have at least 1 question.',
            },
        },

        /* Time limit in minutes (0 = no limit) */
        timeLimit: {
            type: Number,
            default: 0,
            min: 0,
        },

        /* Whether test is currently active */
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

/* Indexes for efficient querying */
testSchema.index({ courseId: 1, subjectId: 1 });
testSchema.index({ isActive: 1 });

module.exports = mongoose.model('Test', testSchema);
