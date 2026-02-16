/**
 * dashboardService.js - Student analytics/dashboard aggregation logic.
 *
 * Output contract is chart-ready so frontend can directly render:
 * - Progress bars
 * - Subject/module analytics
 * - Weak topic indicators and suggestions
 */

const UserProgress = require('../models/UserProgress');
const { cacheGet, cacheSet } = require('../utils/cacheUtils');
const { CACHE_KEYS, CACHE_TTL } = require('../constants');
const {
    normalizeMapInput,
    buildSuggestionEngineOutput,
} = require('../analytics/analyticsEngine');

const toFixedNumber = (value, fractionDigits = 2) => Number(value.toFixed(fractionDigits));

const clampLessonPointer = (value, totalLessons, floor = 0) => {
    if (totalLessons <= 0) return floor;
    const max = totalLessons - 1;
    return Math.min(Math.max(Number(value ?? floor), floor), max);
};

const mapCourseProgressCard = (record) => {
    const course = record.courseId || {};
    const totalLessons = course.totalLessons || 0;
    const lockedUntilLesson = clampLessonPointer(record.lockedUntilLesson, totalLessons, -1);
    const lastWatchedLesson = clampLessonPointer(record.lastWatchedLesson, totalLessons, 0);

    return {
        courseId: course._id?.toString() || null,
        title: course.title || 'Unknown Course',
        category: course.category || null,
        subCategory: course.subCategory || null,
        totalLessons,
        completedLessons: record.completedLessons.length,
        overallProgress: record.overallProgress,
        lockedUntilLesson,
        lastWatchedLesson,
        updatedAt: record.updatedAt,
    };
};

const mapSubjectPerformance = (record) => {
    const course = record.courseId || {};
    const subjectMap = normalizeMapInput(record.subjectProgressMap);
    const rows = [];

    (course.subjects || []).forEach((subject) => {
        const key = subject._id.toString();
        rows.push({
            courseId: course._id.toString(),
            courseTitle: course.title,
            subjectId: key,
            subjectName: subject.name,
            progress: Number(subjectMap[key] || 0),
        });
    });

    (course.modules || []).forEach((moduleItem) => {
        const key = moduleItem._id.toString();
        rows.push({
            courseId: course._id.toString(),
            courseTitle: course.title,
            subjectId: key,
            subjectName: moduleItem.title,
            progress: Number(subjectMap[key] || 0),
        });
    });

    return rows;
};

const aggregateWeakTopics = (progressRecords) => {
    const accumulator = new Map();

    progressRecords.forEach((record) => {
        const weaknessMap = normalizeMapInput(record.weaknessAnalysis);
        Object.entries(weaknessMap).forEach(([topic, score]) => {
            if (!accumulator.has(topic)) {
                accumulator.set(topic, { total: 0, count: 0 });
            }
            const bucket = accumulator.get(topic);
            bucket.total += Number(score);
            bucket.count += 1;
        });
    });

    const aggregated = {};
    accumulator.forEach((value, key) => {
        aggregated[key] = value.count === 0 ? 0 : toFixedNumber(value.total / value.count, 2);
    });

    return aggregated;
};

const getDashboardOverview = async (userId) => {
    const cacheKey = `${CACHE_KEYS.DASHBOARD}:${userId}:overview`;
    const cached = await cacheGet(cacheKey);
    if (cached) return cached;

    const progressRecords = await UserProgress.find({ userId })
        .sort({ updatedAt: -1 })
        .populate('courseId', 'title category subCategory totalLessons subjects modules')
        .lean();

    const courseCards = progressRecords.map(mapCourseProgressCard);
    const subjectPerformance = progressRecords.flatMap(mapSubjectPerformance);

    const averageProgress =
        courseCards.length === 0
            ? 0
            : toFixedNumber(
                  courseCards.reduce((sum, item) => sum + Number(item.overallProgress || 0), 0) /
                      courseCards.length,
                  2
              );

    const aggregatedWeakness = aggregateWeakTopics(progressRecords);
    const suggestionPayload = buildSuggestionEngineOutput(aggregatedWeakness);

    const latestResume = courseCards.length > 0
        ? {
              courseId: courseCards[0].courseId,
              courseTitle: courseCards[0].title,
              lastWatchedLesson: courseCards[0].lastWatchedLesson,
              lockedUntilLesson: courseCards[0].lockedUntilLesson,
              updatedAt: courseCards[0].updatedAt,
          }
        : null;

    const payload = {
        summary: {
            enrolledCourses: courseCards.length,
            averageProgress,
            totalCompletedLessons: courseCards.reduce((sum, item) => sum + item.completedLessons, 0),
        },
        resume: latestResume,
        charts: {
            progressByCourse: courseCards.map((card) => ({
                label: card.title,
                value: card.overallProgress,
            })),
            subjectPerformance: subjectPerformance.map((row) => ({
                label: `${row.courseTitle} - ${row.subjectName}`,
                value: row.progress,
            })),
        },
        weakTopicIndicators: suggestionPayload.weaknessBuckets,
        suggestions: suggestionPayload.suggestions,
        enrolledCourseProgress: courseCards,
    };

    await cacheSet(cacheKey, payload, CACHE_TTL.DASHBOARD);

    return payload;
};

module.exports = {
    getDashboardOverview,
};
