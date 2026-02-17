/**
 * progressService.js - Enrollment, resume, and lock-flow business logic.
 *
 * Why this service is central:
 * - Implements the controlled learning flow (no forward skipping).
 * - Maintains per-user isolated learning state.
 * - Powers resume-at-last-lesson and dashboard progress bars.
 */

const Course = require('../models/Course');
const UserProgress = require('../models/UserProgress');
const AppError = require('../utils/AppError');
const { flattenCourseLessons, buildProgressMaps } = require('../utils/courseStructureUtils');
const { cacheInvalidatePattern } = require('../utils/cacheUtils');
const { CACHE_KEYS, CATEGORIES, HTTP } = require('../constants');

const serializeProgress = (progressDoc, courseDoc, flatLessons) => ({
    id: progressDoc._id.toString(),
    userId: progressDoc.userId.toString(),
    courseId: progressDoc.courseId.toString(),
    courseTitle: courseDoc?.title,
    category: courseDoc?.category,
    subCategory: courseDoc?.subCategory,
    subjectId: progressDoc.subjectId ? progressDoc.subjectId.toString() : null,
    chapterId: progressDoc.chapterId ? progressDoc.chapterId.toString() : null,
    lastWatchedLesson: progressDoc.lastWatchedLesson,
    lockedUntilLesson: progressDoc.lockedUntilLesson,
    totalLessons: flatLessons.length,
    completedLessons: [...progressDoc.completedLessons].sort((a, b) => a - b),
    overallProgress: progressDoc.overallProgress,
    subjectProgressMap:
        progressDoc.subjectProgressMap instanceof Map
            ? Object.fromEntries(progressDoc.subjectProgressMap.entries())
            : progressDoc.subjectProgressMap,
    chapterProgressMap:
        progressDoc.chapterProgressMap instanceof Map
            ? Object.fromEntries(progressDoc.chapterProgressMap.entries())
            : progressDoc.chapterProgressMap,
    weaknessAnalysis:
        progressDoc.weaknessAnalysis instanceof Map
            ? Object.fromEntries(progressDoc.weaknessAnalysis.entries())
            : progressDoc.weaknessAnalysis,
    updatedAt: progressDoc.updatedAt,
});

const getPublishedCourseOrThrow = async (courseId) => {
    const course = await Course.findById(courseId).lean();
    if (!course || !course.isPublished) {
        throw new AppError(HTTP.NOT_FOUND, 'Course not found or not published.');
    }
    return course;
};

const getCourseByIdOrThrow = async (courseId) => {
    const course = await Course.findById(courseId).lean();
    if (!course) {
        throw new AppError(HTTP.NOT_FOUND, 'Course not found.');
    }
    return course;
};

const getProgressOrThrow = async (userId, courseId) => {
    const progress = await UserProgress.findOne({ userId, courseId });
    if (!progress) {
        throw new AppError(HTTP.NOT_FOUND, 'Enrollment not found. Please enroll first.');
    }
    return progress;
};

const assertValidLessonIndex = (flatLessons, lessonIndex) => {
    if (flatLessons.length === 0) {
        throw new AppError(HTTP.BAD_REQUEST, 'This course has no lessons yet.');
    }

    if (lessonIndex < 0 || lessonIndex >= flatLessons.length) {
        throw new AppError(
            HTTP.BAD_REQUEST,
            `Invalid lesson index. Expected range 0 to ${flatLessons.length - 1}.`
        );
    }
};

const sortByOrder = (items = []) => [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

const getLessonContentByIndex = (courseDoc, lessonIndex) => {
    const safeIndex = Number(lessonIndex);
    let cursor = 0;

    if (courseDoc.category === CATEGORIES.SCHOOL) {
        for (const subject of sortByOrder(courseDoc.subjects || [])) {
            for (const chapter of sortByOrder(subject.chapters || [])) {
                for (const lesson of sortByOrder(chapter.lessons || [])) {
                    if (cursor === safeIndex) {
                        return {
                            lessonIndex: safeIndex,
                            lessonId: lesson._id?.toString() || null,
                            title: lesson.title,
                            description: lesson.description || '',
                            contentType: lesson.contentType,
                            contentUrl: lesson.contentUrl || '',
                            duration: lesson.duration || 0,
                            subject: {
                                id: subject._id?.toString() || null,
                                name: subject.name,
                            },
                            chapter: {
                                id: chapter._id?.toString() || null,
                                title: chapter.title,
                            },
                        };
                    }
                    cursor += 1;
                }
            }
        }
        return null;
    }

    for (const moduleItem of sortByOrder(courseDoc.modules || [])) {
        for (const topic of sortByOrder(moduleItem.topics || [])) {
            for (const lesson of sortByOrder(topic.lessons || [])) {
                if (cursor === safeIndex) {
                    return {
                        lessonIndex: safeIndex,
                        lessonId: lesson._id?.toString() || null,
                        title: lesson.title,
                        description: lesson.description || '',
                        contentType: lesson.contentType,
                        contentUrl: lesson.contentUrl || '',
                        duration: lesson.duration || 0,
                        subject: {
                            id: moduleItem._id?.toString() || null,
                            name: moduleItem.title,
                        },
                        chapter: {
                            id: topic._id?.toString() || null,
                            title: topic.title,
                        },
                    };
                }
                cursor += 1;
            }
        }
    }

    return null;
};

const normalizeProgressPointers = (progressDoc, flatLessons) => {
    if (flatLessons.length === 0) {
        const needsReset =
            progressDoc.lockedUntilLesson !== -1 ||
            progressDoc.lastWatchedLesson !== 0 ||
            progressDoc.subjectId !== null ||
            progressDoc.chapterId !== null ||
            progressDoc.lastWatchedSubjectId !== null ||
            progressDoc.lastWatchedChapterId !== null;

        if (needsReset) {
            progressDoc.lockedUntilLesson = -1;
            progressDoc.lastWatchedLesson = 0;
            progressDoc.subjectId = null;
            progressDoc.chapterId = null;
            progressDoc.lastWatchedSubjectId = null;
            progressDoc.lastWatchedChapterId = null;
        }

        return needsReset;
    }

    const maxLessonIndex = flatLessons.length - 1;
    const normalizedLockedUntil = Math.min(
        Math.max(Number(progressDoc.lockedUntilLesson ?? 0), 0),
        maxLessonIndex
    );
    const normalizedLastWatched = Math.min(
        Math.max(Number(progressDoc.lastWatchedLesson ?? 0), 0),
        normalizedLockedUntil
    );
    const lessonMeta = flatLessons[normalizedLastWatched];

    let changed = false;

    if (progressDoc.lockedUntilLesson !== normalizedLockedUntil) {
        progressDoc.lockedUntilLesson = normalizedLockedUntil;
        changed = true;
    }

    if (progressDoc.lastWatchedLesson !== normalizedLastWatched) {
        progressDoc.lastWatchedLesson = normalizedLastWatched;
        changed = true;
    }

    const normalizedSubjectId = lessonMeta?.subjectId || null;
    const normalizedChapterId = lessonMeta?.chapterId || null;

    if ((progressDoc.subjectId?.toString() || null) !== normalizedSubjectId) {
        progressDoc.subjectId = normalizedSubjectId;
        changed = true;
    }

    if ((progressDoc.chapterId?.toString() || null) !== normalizedChapterId) {
        progressDoc.chapterId = normalizedChapterId;
        changed = true;
    }

    if ((progressDoc.lastWatchedSubjectId?.toString() || null) !== normalizedSubjectId) {
        progressDoc.lastWatchedSubjectId = normalizedSubjectId;
        changed = true;
    }

    if ((progressDoc.lastWatchedChapterId?.toString() || null) !== normalizedChapterId) {
        progressDoc.lastWatchedChapterId = normalizedChapterId;
        changed = true;
    }

    return changed;
};

const invalidateDashboardCache = async (userId) => {
    await cacheInvalidatePattern(`${CACHE_KEYS.DASHBOARD}:${userId}:*`);
};

const enrollInCourse = async (userId, courseId) => {
    const course = await getPublishedCourseOrThrow(courseId);

    const existingProgress = await UserProgress.findOne({ userId, courseId });
    if (existingProgress) {
        const flatLessons = flattenCourseLessons(course);
        return {
            alreadyEnrolled: true,
            progress: serializeProgress(existingProgress, course, flatLessons),
        };
    }

    const flatLessons = flattenCourseLessons(course);
    const progressMaps = buildProgressMaps(flatLessons, []);
    const firstLesson = flatLessons[0] || null;

    const progress = await UserProgress.create({
        userId,
        courseId,
        lastWatchedLesson: 0,
        subjectId: firstLesson?.subjectId || null,
        chapterId: firstLesson?.chapterId || null,
        lastWatchedSubjectId: firstLesson?.subjectId || null,
        lastWatchedChapterId: firstLesson?.chapterId || null,
        lockedUntilLesson: flatLessons.length > 0 ? 0 : -1,
        completedLessons: [],
        subjectProgressMap: progressMaps.subjectProgressMap,
        chapterProgressMap: progressMaps.chapterProgressMap,
        overallProgress: 0,
    });

    await invalidateDashboardCache(userId);

    return {
        alreadyEnrolled: false,
        progress: serializeProgress(progress, course, flatLessons),
    };
};

const completeLesson = async (userId, courseId, lessonIndex) => {
    const [course, progress] = await Promise.all([
        getCourseByIdOrThrow(courseId),
        getProgressOrThrow(userId, courseId),
    ]);

    const flatLessons = flattenCourseLessons(course);
    assertValidLessonIndex(flatLessons, lessonIndex);

    if (lessonIndex > progress.lockedUntilLesson) {
        throw new AppError(
            HTTP.FORBIDDEN,
            `Lesson locked. Complete lesson ${progress.lockedUntilLesson} first.`
        );
    }

    const completedSet = new Set(progress.completedLessons);
    completedSet.add(lessonIndex);
    progress.completedLessons = [...completedSet];

    if (
        lessonIndex === progress.lockedUntilLesson &&
        progress.lockedUntilLesson < flatLessons.length - 1
    ) {
        progress.lockedUntilLesson += 1;
    }

    const lessonMeta = flatLessons[lessonIndex];
    progress.lastWatchedLesson = lessonIndex;
    progress.subjectId = lessonMeta.subjectId;
    progress.chapterId = lessonMeta.chapterId;
    progress.lastWatchedSubjectId = lessonMeta.subjectId;
    progress.lastWatchedChapterId = lessonMeta.chapterId;

    const progressMaps = buildProgressMaps(flatLessons, progress.completedLessons);
    progress.subjectProgressMap = progressMaps.subjectProgressMap;
    progress.chapterProgressMap = progressMaps.chapterProgressMap;
    progress.overallProgress = progressMaps.overallProgress;

    await progress.save();
    await invalidateDashboardCache(userId);

    return serializeProgress(progress, course, flatLessons);
};

const updateLastWatched = async (userId, courseId, lessonIndex) => {
    const [course, progress] = await Promise.all([
        getCourseByIdOrThrow(courseId),
        getProgressOrThrow(userId, courseId),
    ]);

    const flatLessons = flattenCourseLessons(course);
    assertValidLessonIndex(flatLessons, lessonIndex);

    if (lessonIndex > progress.lockedUntilLesson) {
        throw new AppError(
            HTTP.FORBIDDEN,
            `Lesson locked. You can resume up to lesson ${progress.lockedUntilLesson}.`
        );
    }

    const lessonMeta = flatLessons[lessonIndex];
    progress.lastWatchedLesson = lessonIndex;
    progress.subjectId = lessonMeta.subjectId;
    progress.chapterId = lessonMeta.chapterId;
    progress.lastWatchedSubjectId = lessonMeta.subjectId;
    progress.lastWatchedChapterId = lessonMeta.chapterId;
    await progress.save();

    await invalidateDashboardCache(userId);

    return serializeProgress(progress, course, flatLessons);
};

const getCourseProgress = async (userId, courseId) => {
    const [course, progress] = await Promise.all([
        getCourseByIdOrThrow(courseId),
        getProgressOrThrow(userId, courseId),
    ]);
    const flatLessons = flattenCourseLessons(course);
    const changed = normalizeProgressPointers(progress, flatLessons);
    if (changed) {
        await progress.save();
    }
    return serializeProgress(progress, course, flatLessons);
};

const getEnrolledCourses = async (userId) => {
    const progressRecords = await UserProgress.find({ userId })
        .sort({ updatedAt: -1 })
        .populate('courseId', 'title category subCategory totalLessons isPublished')
        .lean();

    return progressRecords.map((record) => ({
        id: record._id.toString(),
        courseId: record.courseId?._id?.toString(),
        courseTitle: record.courseId?.title || null,
        category: record.courseId?.category || null,
        subCategory: record.courseId?.subCategory || null,
        totalLessons: record.courseId?.totalLessons || 0,
        isPublished: record.courseId?.isPublished || false,
        lastWatchedLesson: record.lastWatchedLesson,
        lockedUntilLesson: record.lockedUntilLesson,
        overallProgress: record.overallProgress,
        completedCount: record.completedLessons.length,
        updatedAt: record.updatedAt,
    }));
};

const getResumeFeed = async (userId) => {
    const latest = await UserProgress.findOne({ userId })
        .sort({ updatedAt: -1 })
        .populate('courseId', 'title category subCategory subjects modules');

    if (!latest) return null;

    const courseDoc = latest.courseId;
    if (!courseDoc) return null;

    const flatLessons = flattenCourseLessons(courseDoc);
    const changed = normalizeProgressPointers(latest, flatLessons);
    if (changed) {
        await latest.save();
    }

    return {
        courseId: courseDoc._id?.toString() || null,
        courseTitle: courseDoc.title || null,
        category: courseDoc.category || null,
        subCategory: courseDoc.subCategory || null,
        lastWatchedLesson: latest.lastWatchedLesson,
        lockedUntilLesson: latest.lockedUntilLesson,
        updatedAt: latest.updatedAt,
    };
};

const getLessonAccessPayload = async (userId, courseId, lessonIndex) => {
    const [course, progress] = await Promise.all([
        getCourseByIdOrThrow(courseId),
        getProgressOrThrow(userId, courseId),
    ]);
    const flatLessons = flattenCourseLessons(course);
    assertValidLessonIndex(flatLessons, lessonIndex);
    const changed = normalizeProgressPointers(progress, flatLessons);
    if (changed) {
        await progress.save();
    }

    return {
        allowed: lessonIndex <= progress.lockedUntilLesson,
        requestedLesson: lessonIndex,
        lockedUntilLesson: progress.lockedUntilLesson,
    };
};

const getLessonContent = async (userId, courseId, lessonIndex) => {
    const [course, progress] = await Promise.all([
        getCourseByIdOrThrow(courseId),
        getProgressOrThrow(userId, courseId),
    ]);

    const flatLessons = flattenCourseLessons(course);
    assertValidLessonIndex(flatLessons, lessonIndex);
    const changed = normalizeProgressPointers(progress, flatLessons);
    if (changed) {
        await progress.save();
    }

    if (lessonIndex > progress.lockedUntilLesson) {
        throw new AppError(
            HTTP.FORBIDDEN,
            `Lesson Locked. Complete lesson ${progress.lockedUntilLesson + 1} first.`
        );
    }

    const lesson = getLessonContentByIndex(course, lessonIndex);
    if (!lesson) {
        throw new AppError(HTTP.NOT_FOUND, 'Lesson not found.');
    }

    return {
        ...lesson,
        lockedUntilLesson: progress.lockedUntilLesson,
        lastWatchedLesson: progress.lastWatchedLesson,
        completed: progress.completedLessons.includes(lessonIndex),
    };
};

module.exports = {
    enrollInCourse,
    completeLesson,
    updateLastWatched,
    getCourseProgress,
    getEnrolledCourses,
    getResumeFeed,
    getLessonAccessPayload,
    getLessonContent,
    invalidateDashboardCache,
};
