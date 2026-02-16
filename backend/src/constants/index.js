/**
 * constants/index.js — Application-wide constants
 *
 * All enums, status codes, and configuration values live here.
 * Keeps magic strings and numbers out of business logic.
 *
 * Why centralized: Prevents typos, makes refactoring easy,
 * ensures consistency across controllers/services.
 *
 * To extend: Add payment statuses, notification types, etc.
 */

/* ===================================================================
   USER ROLES
   =================================================================== */
const ROLES = Object.freeze({
    STUDENT: 'student',
    ADMIN: 'admin',
});

/* ===================================================================
   COURSE CATEGORIES
   =================================================================== */
const CATEGORIES = Object.freeze({
    SCHOOL: 'school',
    CODING: 'coding',
});

/* Sub-categories within each main category */
const SUB_CATEGORIES = Object.freeze({
    /* School */
    CLASS9: 'class9',
    CLASS10: 'class10',
    /* Coding */
    CPP: 'cpp',
    JAVA: 'java',
    PYTHON: 'python',
    WEBDEV: 'webdev',
});

/* Valid sub-categories mapped to their parent category */
const CATEGORY_SUB_MAP = Object.freeze({
    [CATEGORIES.SCHOOL]: [SUB_CATEGORIES.CLASS9, SUB_CATEGORIES.CLASS10],
    [CATEGORIES.CODING]: [SUB_CATEGORIES.CPP, SUB_CATEGORIES.JAVA, SUB_CATEGORIES.PYTHON, SUB_CATEGORIES.WEBDEV],
});

/* ===================================================================
   HTTP STATUS CODES — named constants for readability
   =================================================================== */
const HTTP = Object.freeze({
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_ERROR: 500,
});

/* ===================================================================
   RATE LIMITING CONFIG
   =================================================================== */
const RATE_LIMIT = Object.freeze({
    /* General API — 100 requests per 15 minutes */
    GENERAL: { windowMs: 15 * 60 * 1000, max: 100 },
    /* Auth endpoints — stricter to prevent brute force */
    AUTH: { windowMs: 15 * 60 * 1000, max: 20 },
    /* Login specifically — very strict */
    LOGIN: { windowMs: 15 * 60 * 1000, max: 10 },
});

/* ===================================================================
   CACHE TTL (Time To Live) — in seconds
   =================================================================== */
const CACHE_TTL = Object.freeze({
    COURSE_LIST: 300,       /* 5 minutes */
    COURSE_DETAIL: 600,     /* 10 minutes */
    DASHBOARD: 120,         /* 2 minutes */
});

/* Cache key prefixes for organized namespacing */
const CACHE_KEYS = Object.freeze({
    COURSES: 'courses',
    COURSE_DETAIL: 'course',
    DASHBOARD: 'dashboard',
});

/* ===================================================================
   AUTH CONFIG
   =================================================================== */
const AUTH = Object.freeze({
    BCRYPT_SALT_ROUNDS: 12,
    MAX_LOGIN_ATTEMPTS: 5,
    LOCK_DURATION_MS: 30 * 60 * 1000, /* 30 minutes */
    COOKIE_NAME: 'refreshToken',
});

/* ===================================================================
   WEAKNESS THRESHOLDS — for analytics engine
   =================================================================== */
const WEAKNESS = Object.freeze({
    RED_THRESHOLD: 50,    /* Below 50% = weak (red) */
    YELLOW_THRESHOLD: 70, /* 50-70% = needs improvement (yellow) */
    /* Above 70% = strong (green) */
});

module.exports = {
    ROLES,
    CATEGORIES,
    SUB_CATEGORIES,
    CATEGORY_SUB_MAP,
    HTTP,
    RATE_LIMIT,
    CACHE_TTL,
    CACHE_KEYS,
    AUTH,
    WEAKNESS,
};
