/**
 * Course.js — Course Schema (Mongoose)
 *
 * Defines the Course model for the CollegeHub learning platform.
 * Supports two course types:
 *
 * 1. SCHOOL courses — have subjects → chapters → lessons
 *    Example: Class 9 Maths → Chapter: Number Systems → Lesson: Rational Numbers
 *
 * 2. CODING courses — have modules → topics → lessons
 *    Example: C++ → Module: OOP → Lesson: Classes & Objects
 *
 * Why embedded structure: Course content rarely changes, and embedding
 * gives us single-query reads (no JOINs). Perfect for read-heavy LMS.
 *
 * Indexes: category, subCategory, (category + subCategory) compound
 *
 * To extend: Add pricing, thumbnail URL, instructor ref, difficulty level,
 * estimated duration, enrollment count.
 */

const mongoose = require('mongoose');
const { CATEGORIES, SUB_CATEGORIES } = require('../constants');

/* ===================================================================
   SUB-SCHEMAS — Building blocks for the course structure
   =================================================================== */

/* Individual lesson within a chapter/topic */
const lessonSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Lesson title is required'],
            trim: true,
        },
        description: {
            type: String,
            default: '',
        },
        contentType: {
            type: String,
            enum: ['video', 'text', 'quiz', 'practice'],
            default: 'text',
        },
        contentUrl: {
            type: String,
            default: '',
        },
        duration: {
            type: Number, /* Duration in minutes */
            default: 0,
        },
        order: {
            type: Number,
            required: true,
        },
    },
    { _id: true }
);

/* Chapter within a school subject */
const chapterSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Chapter title is required'],
            trim: true,
        },
        description: {
            type: String,
            default: '',
        },
        lessons: [lessonSchema],
        order: {
            type: Number,
            required: true,
        },
    },
    { _id: true }
);

/* Subject within a school course (e.g., Maths, Science) */
const subjectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Subject name is required'],
            trim: true,
        },
        icon: {
            type: String,
            default: 'BookOpen',
        },
        color: {
            type: String,
            default: '#6366f1',
        },
        chapters: [chapterSchema],
        order: {
            type: Number,
            required: true,
        },
    },
    { _id: true }
);

/* Topic within a coding module */
const topicSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Topic title is required'],
            trim: true,
        },
        difficulty: {
            type: String,
            enum: ['beginner', 'intermediate', 'advanced'],
            default: 'beginner',
        },
        lessons: [lessonSchema],
        order: {
            type: Number,
            required: true,
        },
    },
    { _id: true }
);

/* Module within a coding course (e.g., OOP, Data Structures) */
const moduleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Module title is required'],
            trim: true,
        },
        description: {
            type: String,
            default: '',
        },
        topics: [topicSchema],
        order: {
            type: Number,
            required: true,
        },
    },
    { _id: true }
);

/* ===================================================================
   MAIN COURSE SCHEMA
   =================================================================== */
const courseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Course title is required'],
            trim: true,
            maxlength: [200, 'Title cannot exceed 200 characters'],
        },

        description: {
            type: String,
            default: '',
            maxlength: [2000, 'Description cannot exceed 2000 characters'],
        },

        category: {
            type: String,
            required: [true, 'Category is required'],
            enum: Object.values(CATEGORIES),
        },

        subCategory: {
            type: String,
            required: [true, 'Sub-category is required'],
            enum: Object.values(SUB_CATEGORIES),
        },

        /* School courses use subjects (with chapters inside) */
        subjects: [subjectSchema],

        /* Coding courses use modules (with topics inside) */
        modules: [moduleSchema],

        /* Total number of lessons (pre-calculated for performance) */
        totalLessons: {
            type: Number,
            default: 0,
        },

        /* Admin who created this course */
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        /* Whether the course is visible to students */
        isPublished: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

/* ===================================================================
   INDEXES — Optimize filtering and listing queries
   =================================================================== */
courseSchema.index({ category: 1 });
courseSchema.index({ subCategory: 1 });
courseSchema.index({ category: 1, subCategory: 1 });
courseSchema.index({ isPublished: 1 });

/* ===================================================================
   PRE-SAVE HOOK — Calculate totalLessons automatically
   =================================================================== */
courseSchema.pre('save', function (next) {
    let count = 0;

    if (this.category === CATEGORIES.SCHOOL) {
        /* Count lessons across all subjects → chapters → lessons */
        this.subjects.forEach((subject) => {
            subject.chapters.forEach((chapter) => {
                count += chapter.lessons.length;
            });
        });
    } else if (this.category === CATEGORIES.CODING) {
        /* Count lessons across all modules → topics → lessons */
        this.modules.forEach((mod) => {
            mod.topics.forEach((topic) => {
                count += topic.lessons.length;
            });
        });
    }

    this.totalLessons = count;
    next();
});

module.exports = mongoose.model('Course', courseSchema);
