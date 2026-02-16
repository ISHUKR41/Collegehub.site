/**
 * UserProgress.js - User-scoped enrollment and learning state.
 *
 * This collection is the core engine for:
 * - Resume from last watched lesson
 * - Sequential lock system
 * - Completion tracking
 * - Subject/chapter/module progress maps
 * - Test history and topic weakness analysis
 *
 * One document per (userId, courseId) guarantees data isolation.
 */

const mongoose = require('mongoose');

const testHistorySchema = new mongoose.Schema(
    {
        testId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Test',
            required: true,
        },
        subjectId: {
            type: mongoose.Schema.Types.ObjectId,
            default: null,
        },
        chapterId: {
            type: mongoose.Schema.Types.ObjectId,
            default: null,
        },
        score: {
            type: Number,
            required: true,
            min: 0,
            max: 100,
        },
        totalQuestions: {
            type: Number,
            required: true,
            min: 0,
        },
        correctAnswers: {
            type: Number,
            required: true,
            min: 0,
        },
        topicScores: {
            type: Map,
            of: Number,
            default: {},
        },
        attemptedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { _id: true }
);

const userProgressSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            required: true,
            index: true,
        },

        /* Current context pointers for analytics and resume compatibility. */
        subjectId: {
            type: mongoose.Schema.Types.ObjectId,
            default: null,
        },
        chapterId: {
            type: mongoose.Schema.Types.ObjectId,
            default: null,
        },

        /* Resume engine pointers. */
        lastWatchedLesson: {
            type: Number,
            default: 0,
        },
        lastWatchedSubjectId: {
            type: mongoose.Schema.Types.ObjectId,
            default: null,
        },
        lastWatchedChapterId: {
            type: mongoose.Schema.Types.ObjectId,
            default: null,
        },

        /* Lock engine pointer. Users can only open <= lockedUntilLesson. */
        lockedUntilLesson: {
            type: Number,
            default: 0,
        },

        completedLessons: {
            type: [Number],
            default: [],
        },

        subjectProgressMap: {
            type: Map,
            of: Number,
            default: {},
        },
        chapterProgressMap: {
            type: Map,
            of: Number,
            default: {},
        },

        testHistory: [testHistorySchema],

        weaknessAnalysis: {
            type: Map,
            of: Number,
            default: {},
        },

        overallProgress: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
        },
    },
    {
        timestamps: true,
    }
);

userProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

module.exports = mongoose.model('UserProgress', userProgressSchema);