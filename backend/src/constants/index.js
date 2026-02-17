/**
 * constants/index.js - Application-wide constants and enums.
 *
 * Keeps magic values centralized for consistency, refactoring safety,
 * and easier environment tuning.
 */

const ROLES = Object.freeze({
    STUDENT: 'student',
    ADMIN: 'admin',
});

const CATEGORIES = Object.freeze({
    SCHOOL: 'school',
    CODING: 'coding',
});

const SUB_CATEGORIES = Object.freeze({
    CLASS9: 'class9',
    CLASS10: 'class10',
    CPP: 'cpp',
    JAVA: 'java',
    PYTHON: 'python',
    WEBDEV: 'webdev',
});

const CATEGORY_SUB_MAP = Object.freeze({
    [CATEGORIES.SCHOOL]: [SUB_CATEGORIES.CLASS9, SUB_CATEGORIES.CLASS10],
    [CATEGORIES.CODING]: [
        SUB_CATEGORIES.CPP,
        SUB_CATEGORIES.JAVA,
        SUB_CATEGORIES.PYTHON,
        SUB_CATEGORIES.WEBDEV,
    ],
});

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
    SERVICE_UNAVAILABLE: 503,
});

const RATE_LIMIT = Object.freeze({
    GENERAL: { windowMs: 15 * 60 * 1000, max: 100 },
    AUTH: { windowMs: 15 * 60 * 1000, max: 20 },
    LOGIN: { windowMs: 15 * 60 * 1000, max: 5 },
    CONTACT: { windowMs: 15 * 60 * 1000, max: 8 },
    NEWSLETTER: { windowMs: 60 * 60 * 1000, max: 20 },
});

const CACHE_TTL = Object.freeze({
    COURSE_LIST: 300,
    COURSE_DETAIL: 600,
    DASHBOARD: 120,
});

const CACHE_KEYS = Object.freeze({
    COURSES: 'courses',
    COURSE_DETAIL: 'course',
    DASHBOARD: 'dashboard',
});

const AUTH = Object.freeze({
    BCRYPT_SALT_ROUNDS: 12,
    MAX_LOGIN_ATTEMPTS: 5,
    LOCK_DURATION_MS: 30 * 60 * 1000,
    COOKIE_NAME: 'refreshToken',
});

const WEAKNESS = Object.freeze({
    RED_THRESHOLD: 50,
    YELLOW_THRESHOLD: 70,
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
