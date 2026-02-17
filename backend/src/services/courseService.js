/**
 * courseService.js - Course catalog business logic.
 *
 * Responsibilities:
 * - Admin CRUD for school/coding courses.
 * - Public listing/detail with Redis caching.
 * - Structural integrity checks (category vs subCategory vs content tree).
 */

const Course = require('../models/Course');
const AppError = require('../utils/AppError');
const { cacheGet, cacheSet, cacheInvalidatePattern } = require('../utils/cacheUtils');
const { CATEGORY_SUB_MAP, CATEGORIES, CACHE_KEYS, CACHE_TTL, HTTP } = require('../constants');

const assertCategoryMapping = (category, subCategory) => {
    const validSubCategories = CATEGORY_SUB_MAP[category] || [];
    if (!validSubCategories.includes(subCategory)) {
        throw new AppError(
            HTTP.BAD_REQUEST,
            `Sub-category "${subCategory}" does not belong to category "${category}".`
        );
    }
};

const assertContentShape = ({ category, subjects, modules }) => {
    if (category === CATEGORIES.SCHOOL) {
        if (!Array.isArray(subjects) || subjects.length === 0) {
            throw new AppError(HTTP.BAD_REQUEST, 'School courses must include at least one subject.');
        }

        if (Array.isArray(modules) && modules.length > 0) {
            throw new AppError(HTTP.BAD_REQUEST, 'School courses cannot include coding modules.');
        }
    }

    if (category === CATEGORIES.CODING) {
        if (!Array.isArray(modules) || modules.length === 0) {
            throw new AppError(HTTP.BAD_REQUEST, 'Coding courses must include at least one module.');
        }

        if (Array.isArray(subjects) && subjects.length > 0) {
            throw new AppError(HTTP.BAD_REQUEST, 'Coding courses cannot include school subjects.');
        }
    }
};

const normalizeListItem = (courseDoc) => ({
    id: courseDoc._id.toString(),
    title: courseDoc.title,
    description: courseDoc.description,
    category: courseDoc.category,
    subCategory: courseDoc.subCategory,
    totalLessons: courseDoc.totalLessons,
    isPublished: courseDoc.isPublished,
    createdAt: courseDoc.createdAt,
    updatedAt: courseDoc.updatedAt,
});

const sanitizeLessonForPublic = (lesson, lessonIndex) => ({
    _id: lesson._id,
    title: lesson.title,
    contentType: lesson.contentType,
    duration: lesson.duration,
    order: lesson.order ?? lessonIndex,
});

const sanitizeSchoolSubjectsForPublic = (subjects = []) =>
    subjects.map((subject, subjectIndex) => ({
        _id: subject._id,
        name: subject.name,
        icon: subject.icon,
        color: subject.color,
        order: subject.order ?? subjectIndex,
        chapters: (subject.chapters || []).map((chapter, chapterIndex) => ({
            _id: chapter._id,
            title: chapter.title,
            order: chapter.order ?? chapterIndex,
            lessons: (chapter.lessons || []).map(sanitizeLessonForPublic),
        })),
    }));

const sanitizeCodingModulesForPublic = (modules = []) =>
    modules.map((moduleItem, moduleIndex) => ({
        _id: moduleItem._id,
        title: moduleItem.title,
        order: moduleItem.order ?? moduleIndex,
        topics: (moduleItem.topics || []).map((topic, topicIndex) => ({
            _id: topic._id,
            title: topic.title,
            difficulty: topic.difficulty,
            order: topic.order ?? topicIndex,
            lessons: (topic.lessons || []).map(sanitizeLessonForPublic),
        })),
    }));

const listCourses = async ({ category, subCategory, search, includeUnpublished = false }) => {
    if (category && subCategory) {
        assertCategoryMapping(category, subCategory);
    }

    const query = {};
    if (category) query.category = category;
    if (subCategory) query.subCategory = subCategory;
    if (search) {
        query.title = { $regex: search, $options: 'i' };
    }
    if (!includeUnpublished) {
        query.isPublished = true;
    }

    const cacheKey = `${CACHE_KEYS.COURSES}:list:${category || 'all'}:${subCategory || 'all'}:${search || ''}`;
    if (!includeUnpublished) {
        const cached = await cacheGet(cacheKey);
        if (cached) return cached;
    }

    const courses = await Course.find(query)
        .select('title description category subCategory totalLessons isPublished createdAt updatedAt')
        .sort({ createdAt: -1 })
        .lean();

    const payload = courses.map(normalizeListItem);

    if (!includeUnpublished) {
        await cacheSet(cacheKey, payload, CACHE_TTL.COURSE_LIST);
    }

    return payload;
};

const getCourseById = async ({ courseId, includeUnpublished = false }) => {
    const cacheKey = `${CACHE_KEYS.COURSE_DETAIL}:${courseId}`;
    if (!includeUnpublished) {
        const cached = await cacheGet(cacheKey);
        if (cached) return cached;
    }

    const courseQuery = Course.findById(courseId);

    /*
     * Public payload should not leak admin email addresses.
     * Admin payload keeps full creator details for management screens.
     */
    if (includeUnpublished) {
        courseQuery.populate('createdBy', 'name email role');
    } else {
        courseQuery.populate('createdBy', 'name role');
    }

    const course = await courseQuery.lean();

    if (!course) {
        throw new AppError(HTTP.NOT_FOUND, 'Course not found.');
    }

    if (!includeUnpublished && !course.isPublished) {
        throw new AppError(HTTP.NOT_FOUND, 'Course not found.');
    }

    const payload = {
        id: course._id.toString(),
        title: course.title,
        description: course.description,
        category: course.category,
        subCategory: course.subCategory,
        subjects: includeUnpublished
            ? course.subjects || []
            : sanitizeSchoolSubjectsForPublic(course.subjects),
        modules: includeUnpublished
            ? course.modules || []
            : sanitizeCodingModulesForPublic(course.modules),
        totalLessons: course.totalLessons,
        isPublished: course.isPublished,
        createdBy: course.createdBy || null,
        createdAt: course.createdAt,
        updatedAt: course.updatedAt,
    };

    if (!includeUnpublished && course.isPublished) {
        await cacheSet(cacheKey, payload, CACHE_TTL.COURSE_DETAIL);
    }

    return payload;
};

const createCourse = async (adminUserId, payload) => {
    assertCategoryMapping(payload.category, payload.subCategory);
    assertContentShape(payload);

    const course = await Course.create({
        ...payload,
        createdBy: adminUserId,
    });

    await cacheInvalidatePattern(`${CACHE_KEYS.COURSES}:*`);
    await cacheInvalidatePattern(`${CACHE_KEYS.COURSE_DETAIL}:*`);

    return getCourseById({ courseId: course._id.toString(), includeUnpublished: true });
};

const updateCourse = async (courseId, payload) => {
    const course = await Course.findById(courseId);
    if (!course) {
        throw new AppError(HTTP.NOT_FOUND, 'Course not found.');
    }

    const merged = {
        category: payload.category ?? course.category,
        subCategory: payload.subCategory ?? course.subCategory,
        subjects: payload.subjects ?? course.subjects,
        modules: payload.modules ?? course.modules,
    };

    assertCategoryMapping(merged.category, merged.subCategory);
    assertContentShape(merged);

    Object.assign(course, payload);
    await course.save();

    await cacheInvalidatePattern(`${CACHE_KEYS.COURSES}:*`);
    await cacheInvalidatePattern(`${CACHE_KEYS.COURSE_DETAIL}:*`);

    return getCourseById({ courseId: course._id.toString(), includeUnpublished: true });
};

const deleteCourse = async (courseId) => {
    const course = await Course.findByIdAndDelete(courseId).lean();
    if (!course) {
        throw new AppError(HTTP.NOT_FOUND, 'Course not found.');
    }

    await cacheInvalidatePattern(`${CACHE_KEYS.COURSES}:*`);
    await cacheInvalidatePattern(`${CACHE_KEYS.COURSE_DETAIL}:*`);
};

module.exports = {
    listCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
};
