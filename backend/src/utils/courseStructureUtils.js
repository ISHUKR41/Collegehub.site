/**
 * courseStructureUtils.js - Helper utilities to flatten and analyze course trees.
 *
 * Why this utility:
 * - Lock/resume logic works on lesson indexes, while courses are nested.
 * - We need a stable, deterministic "index -> lesson metadata" map.
 * - Services reuse this function to avoid duplicate traversal logic.
 */

const { CATEGORIES } = require('../constants');

const sortByOrder = (items = []) => [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

const normalizeId = (value) => {
    if (!value) return null;
    return value.toString();
};

const flattenCourseLessons = (courseDoc) => {
    const flatLessons = [];

    if (!courseDoc) {
        return flatLessons;
    }

    if (courseDoc.category === CATEGORIES.SCHOOL) {
        sortByOrder(courseDoc.subjects).forEach((subject) => {
            sortByOrder(subject.chapters).forEach((chapter) => {
                sortByOrder(chapter.lessons).forEach((lesson) => {
                    flatLessons.push({
                        index: flatLessons.length,
                        lessonId: normalizeId(lesson._id),
                        title: lesson.title,
                        subjectId: normalizeId(subject._id),
                        chapterId: normalizeId(chapter._id),
                        parentLabel: `${subject.name} -> ${chapter.title}`,
                    });
                });
            });
        });
        return flatLessons;
    }

    sortByOrder(courseDoc.modules).forEach((moduleItem) => {
        sortByOrder(moduleItem.topics).forEach((topic) => {
            sortByOrder(topic.lessons).forEach((lesson) => {
                flatLessons.push({
                    index: flatLessons.length,
                    lessonId: normalizeId(lesson._id),
                    title: lesson.title,
                    /*
                     * For coding courses, "subject" map stores module-level progress
                     * and "chapter" map stores topic-level progress.
                     */
                    subjectId: normalizeId(moduleItem._id),
                    chapterId: normalizeId(topic._id),
                    parentLabel: `${moduleItem.title} -> ${topic.title}`,
                });
            });
        });
    });

    return flatLessons;
};

const buildProgressMaps = (flatLessons, completedLessonIndexes) => {
    const completedSet = new Set(completedLessonIndexes);
    const subjectAccumulator = new Map();
    const chapterAccumulator = new Map();

    flatLessons.forEach((lesson) => {
        if (lesson.subjectId) {
            if (!subjectAccumulator.has(lesson.subjectId)) {
                subjectAccumulator.set(lesson.subjectId, { total: 0, completed: 0 });
            }
            const subjectBucket = subjectAccumulator.get(lesson.subjectId);
            subjectBucket.total += 1;
            if (completedSet.has(lesson.index)) subjectBucket.completed += 1;
        }

        if (lesson.chapterId) {
            if (!chapterAccumulator.has(lesson.chapterId)) {
                chapterAccumulator.set(lesson.chapterId, { total: 0, completed: 0 });
            }
            const chapterBucket = chapterAccumulator.get(lesson.chapterId);
            chapterBucket.total += 1;
            if (completedSet.has(lesson.index)) chapterBucket.completed += 1;
        }
    });

    const subjectProgressMap = {};
    const chapterProgressMap = {};

    subjectAccumulator.forEach((value, key) => {
        subjectProgressMap[key] = value.total === 0 ? 0 : Number(((value.completed / value.total) * 100).toFixed(2));
    });

    chapterAccumulator.forEach((value, key) => {
        chapterProgressMap[key] = value.total === 0 ? 0 : Number(((value.completed / value.total) * 100).toFixed(2));
    });

    const overallProgress =
        flatLessons.length === 0
            ? 0
            : Number(((completedSet.size / flatLessons.length) * 100).toFixed(2));

    return {
        subjectProgressMap,
        chapterProgressMap,
        overallProgress,
    };
};

module.exports = {
    flattenCourseLessons,
    buildProgressMaps,
};

