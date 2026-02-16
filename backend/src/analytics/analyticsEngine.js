/**
 * analyticsEngine.js - Deterministic analytics utilities.
 *
 * Why separate analytics module:
 * - Keeps math/aggregation logic outside services/controllers.
 * - Easier to unit test and evolve to microservice later.
 * - Reused by test submission and dashboard aggregation.
 */

const { WEAKNESS } = require('../constants');

const toFixedNumber = (value, fractionDigits = 2) => Number(value.toFixed(fractionDigits));

const normalizeMapInput = (input) => {
    if (!input) return {};
    if (input instanceof Map) return Object.fromEntries(input.entries());
    return { ...input };
};

const evaluateTestAttempt = (questions, answers) => {
    let correctAnswers = 0;
    const topicAccumulator = new Map();

    questions.forEach((question, index) => {
        const topic = String(question.topicTag || 'general').toLowerCase();
        const selected = answers[index];
        const isCorrect = selected === question.correctAnswer;

        if (!topicAccumulator.has(topic)) {
            topicAccumulator.set(topic, { total: 0, correct: 0 });
        }

        const bucket = topicAccumulator.get(topic);
        bucket.total += 1;
        if (isCorrect) {
            bucket.correct += 1;
            correctAnswers += 1;
        }
    });

    const totalQuestions = questions.length;
    const score = totalQuestions === 0 ? 0 : toFixedNumber((correctAnswers / totalQuestions) * 100, 2);

    const topicScores = {};
    topicAccumulator.forEach((bucket, topic) => {
        topicScores[topic] = bucket.total === 0 ? 0 : toFixedNumber((bucket.correct / bucket.total) * 100, 2);
    });

    return {
        score,
        totalQuestions,
        correctAnswers,
        topicScores,
    };
};

const mergeWeaknessFromHistory = (testHistory) => {
    const topicAccumulator = new Map();

    testHistory.forEach((attempt) => {
        const topicScores = normalizeMapInput(attempt.topicScores);

        Object.entries(topicScores).forEach(([topic, score]) => {
            if (!topicAccumulator.has(topic)) {
                topicAccumulator.set(topic, { total: 0, count: 0 });
            }

            const bucket = topicAccumulator.get(topic);
            bucket.total += Number(score);
            bucket.count += 1;
        });
    });

    const weaknessAnalysis = {};
    topicAccumulator.forEach((bucket, topic) => {
        weaknessAnalysis[topic] = bucket.count === 0 ? 0 : toFixedNumber(bucket.total / bucket.count, 2);
    });

    return weaknessAnalysis;
};

const classifyWeaknessTopics = (weaknessAnalysis) => {
    const normalized = normalizeMapInput(weaknessAnalysis);

    const red = [];
    const yellow = [];
    const green = [];

    Object.entries(normalized).forEach(([topic, accuracy]) => {
        const entry = { topic, accuracy: Number(accuracy) };
        if (accuracy < WEAKNESS.RED_THRESHOLD) {
            red.push(entry);
            return;
        }

        if (accuracy < WEAKNESS.YELLOW_THRESHOLD) {
            yellow.push(entry);
            return;
        }

        green.push(entry);
    });

    const sorter = (a, b) => a.accuracy - b.accuracy;
    red.sort(sorter);
    yellow.sort(sorter);
    green.sort(sorter);

    return { red, yellow, green };
};

const buildSuggestionEngineOutput = (weaknessAnalysis) => {
    const buckets = classifyWeaknessTopics(weaknessAnalysis);
    const suggestions = [];

    buckets.red.slice(0, 5).forEach((topic) => {
        suggestions.push({
            topic: topic.topic,
            priority: 'high',
            reason: `Accuracy is ${topic.accuracy}%. Immediate revision and extra practice recommended.`,
        });
    });

    buckets.yellow.slice(0, 5).forEach((topic) => {
        suggestions.push({
            topic: topic.topic,
            priority: 'medium',
            reason: `Accuracy is ${topic.accuracy}%. Continue guided practice to push above ${WEAKNESS.YELLOW_THRESHOLD}%.`,
        });
    });

    return {
        weaknessBuckets: buckets,
        suggestions,
    };
};

module.exports = {
    evaluateTestAttempt,
    mergeWeaknessFromHistory,
    classifyWeaknessTopics,
    buildSuggestionEngineOutput,
    normalizeMapInput,
};

