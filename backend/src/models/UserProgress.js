/**
 * UserProgress.js — User Progress Schema (Mongoose)
 *
 * THE HEART OF THE SYSTEM. Tracks every student's learning journey:
 * - Which lesson they last watched (resume system)
 * - Which lesson they've unlocked up to (lock system)
 * - Which lessons they've completed
 * - Subject/chapter-wise progress percentages
 * - Test history with scores
 * - Topic weakness analysis
 *
 * Each user has ISOLATED progress data per course (1 document per enrollment).
 * This separation ensures:
 * - No bloated user documents
 * - Fast queries per course
 * - Easy horizontal scaling
 * - Clean data isolation
 *
 * Composite index on (userId + courseId) for fast lookups.
 *
 * To extend: Add time-spent tracking, streak counts, achievement badges.
 */

const mongoose = require('mongoose');

/* Test history entry — stores each test attempt */
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
        },
        correctAnswers: {
            type: Number,
            required: true,
        },
        topicScores: {
            /* Map of topicTag → percentage score */
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

/* Main UserProgress schema */
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

        /* =============================================================
           RESUME SYSTEM
           Stores the exact lesson where user left off.
           On next login, frontend redirects to this lesson.
           ============================================================= */
        lastWatchedLesson: {
            type: Number,
            default: 0, /* Lesson index (0-based) */
        },

        /* Additional context for resume — which subject/chapter */
        lastWatchedSubjectId: {
            type: mongoose.Schema.Types.ObjectId,
            default: null,
        },
        lastWatchedChapterId: {
            type: mongoose.Schema.Types.ObjectId,
            default: null,
        },

        /* =============================================================
           LOCK SYSTEM
           Students can only access lessons up to this index.
           Completing a lesson increments this value.
           ============================================================= */
        lockedUntilLesson: {
            type: Number,
            default: 0, /* User can access lessons 0..lockedUntilLesson */
        },

        /* =============================================================
           COMPLETION TRACKING
           Array of completed lesson indices for quick lookup.
           ============================================================= */
        completedLessons: {
            type: [Number],
            default: [],
        },

        /* =============================================================
           PROGRESS MAPS — Percentage progress per subject/chapter
           Stored as Maps for flexible key-value pairs.
           Example: { "subjectObjectId": 75 } means 75% complete
           ============================================================= */
        subjectProgressMap: {
            type: Map,
            of: Number, /* Percentage 0-100 */
            default: {},
        },

        chapterProgressMap: {
            type: Map,
            of: Number, /* Percentage 0-100 */
            default: {},
        },

        /* =============================================================
           TEST HISTORY — All test attempts with scores
           ============================================================= */
        testHistory: [testHistorySchema],

        /* =============================================================
           WEAKNESS ANALYSIS — Topic-level performance tracking
           Maps topic tags to accuracy percentages.
           Updated after every test submission.
           Example: { "algebra": 45, "geometry": 82, "trigonometry": 33 }
           ============================================================= */
        weaknessAnalysis: {
            type: Map,
            of: Number, /* Percentage 0-100 */
            default: {},
        },

        /* Overall course completion percentage */
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

/* ===================================================================
   COMPOSITE INDEX — The most frequently used query pattern
   "Get progress for user X in course Y"
   =================================================================== */
userProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

module.exports = mongoose.model('UserProgress', userProgressSchema);
