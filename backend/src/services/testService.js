/**
 * testService.js - Assessment management and submission evaluation logic.
 *
 * Responsibilities:
 * - Admin test creation.
 * - Secure test fetch for attempt mode (without correct answers).
 * - Answer evaluation + weakness analytics update in UserProgress.
 */

const Course = require('../models/Course');
const Test = require('../models/Test');
const UserProgress = require('../models/UserProgress');
const AppError = require('../utils/AppError');
const { HTTP, ROLES } = require('../constants');
const {
    evaluateTestAttempt,
    mergeWeaknessFromHistory,
    buildSuggestionEngineOutput,
} = require('../analytics/analyticsEngine');
const { invalidateDashboardCache } = require('./progressService');

const ensureCourseExists = async (courseId) => {
    const course = await Course.findById(courseId).lean();
    if (!course) {
        throw new AppError(HTTP.NOT_FOUND, 'Course not found.');
    }
    return course;
};

const collectCourseIds = (courseDoc) => {
    const subjectIds = new Set();
    const chapterIds = new Set();

    (courseDoc.subjects || []).forEach((subject) => {
        subjectIds.add(subject._id.toString());
        (subject.chapters || []).forEach((chapter) => {
            chapterIds.add(chapter._id.toString());
        });
    });

    (courseDoc.modules || []).forEach((moduleItem) => {
        subjectIds.add(moduleItem._id.toString());
        (moduleItem.topics || []).forEach((topic) => {
            chapterIds.add(topic._id.toString());
        });
    });

    return { subjectIds, chapterIds };
};

const createTest = async (payload) => {
    const course = await ensureCourseExists(payload.courseId);
    const { subjectIds, chapterIds } = collectCourseIds(course);

    if (payload.subjectId && !subjectIds.has(payload.subjectId)) {
        throw new AppError(HTTP.BAD_REQUEST, 'Provided subjectId/moduleId is not part of the course.');
    }

    if (payload.chapterId && !chapterIds.has(payload.chapterId)) {
        throw new AppError(HTTP.BAD_REQUEST, 'Provided chapterId/topicId is not part of the course.');
    }

    const test = await Test.create(payload);

    return {
        id: test._id.toString(),
        title: test.title,
        courseId: test.courseId.toString(),
        subjectId: test.subjectId?.toString() || null,
        chapterId: test.chapterId?.toString() || null,
        questionCount: test.questions.length,
        timeLimit: test.timeLimit,
        isActive: test.isActive,
        createdAt: test.createdAt,
    };
};

const listTestsForCourse = async ({
    courseId,
    subjectId,
    chapterId,
    onlyActive = true,
    requester,
}) => {
    await ensureCourseExists(courseId);

    /*
     * Students can only list tests for courses they are enrolled in.
     * Admins can manage/list all tests.
     */
    const isAdmin = requester.role === ROLES.ADMIN;

    if (!isAdmin) {
        const enrollment = await UserProgress.findOne({ userId: requester._id, courseId }).lean();
        if (!enrollment) {
            throw new AppError(HTTP.FORBIDDEN, 'Enroll in this course before viewing tests.');
        }
    }

    const query = { courseId };
    if (subjectId) query.subjectId = subjectId;
    if (chapterId) query.chapterId = chapterId;
    if (!isAdmin || onlyActive) {
        query.isActive = true;
    }

    const tests = await Test.find(query)
        .select('title courseId subjectId chapterId timeLimit isActive createdAt updatedAt questions')
        .sort({ createdAt: -1 })
        .lean();

    return tests.map((test) => ({
        id: test._id.toString(),
        title: test.title,
        courseId: test.courseId.toString(),
        subjectId: test.subjectId?.toString() || null,
        chapterId: test.chapterId?.toString() || null,
        questionCount: test.questions.length,
        timeLimit: test.timeLimit,
        isActive: test.isActive,
        createdAt: test.createdAt,
        updatedAt: test.updatedAt,
    }));
};

const getTestForAttempt = async (userId, testId) => {
    const test = await Test.findById(testId).lean();
    if (!test || !test.isActive) {
        throw new AppError(HTTP.NOT_FOUND, 'Test not found.');
    }

    const enrollment = await UserProgress.findOne({
        userId,
        courseId: test.courseId,
    }).lean();

    if (!enrollment) {
        throw new AppError(HTTP.FORBIDDEN, 'Enroll in this course before attempting tests.');
    }

    return {
        id: test._id.toString(),
        title: test.title,
        courseId: test.courseId.toString(),
        subjectId: test.subjectId?.toString() || null,
        chapterId: test.chapterId?.toString() || null,
        timeLimit: test.timeLimit,
        questions: test.questions.map((question) => ({
            id: question._id.toString(),
            questionText: question.questionText,
            options: question.options,
            topicTag: question.topicTag,
            difficulty: question.difficulty,
        })),
    };
};

const submitTest = async (userId, { testId, answers }) => {
    const test = await Test.findById(testId);
    if (!test || !test.isActive) {
        throw new AppError(HTTP.NOT_FOUND, 'Test not found.');
    }

    if (answers.length !== test.questions.length) {
        throw new AppError(
            HTTP.BAD_REQUEST,
            `Answer count mismatch. Expected ${test.questions.length} answers.`
        );
    }

    const progress = await UserProgress.findOne({
        userId,
        courseId: test.courseId,
    });

    if (!progress) {
        throw new AppError(HTTP.FORBIDDEN, 'Enroll in this course before submitting tests.');
    }

    const testResult = evaluateTestAttempt(test.questions, answers);

    progress.testHistory.push({
        testId: test._id,
        subjectId: test.subjectId || null,
        chapterId: test.chapterId || null,
        score: testResult.score,
        totalQuestions: testResult.totalQuestions,
        correctAnswers: testResult.correctAnswers,
        topicScores: testResult.topicScores,
    });

    const weaknessAnalysis = mergeWeaknessFromHistory(progress.testHistory);
    progress.weaknessAnalysis = weaknessAnalysis;
    await progress.save();

    await invalidateDashboardCache(userId.toString());

    const suggestions = buildSuggestionEngineOutput(weaknessAnalysis);

    return {
        testId: test._id.toString(),
        courseId: test.courseId.toString(),
        score: testResult.score,
        totalQuestions: testResult.totalQuestions,
        correctAnswers: testResult.correctAnswers,
        topicScores: testResult.topicScores,
        weaknessAnalysis,
        weaknessBuckets: suggestions.weaknessBuckets,
        suggestions: suggestions.suggestions,
    };
};

module.exports = {
    createTest,
    listTestsForCourse,
    getTestForAttempt,
    submitTest,
};
