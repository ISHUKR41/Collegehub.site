/**
 * enrollmentRoutes.js - Enrollment, progress, resume, and lock endpoints.
 */

const express = require('express');
const validate = require('../middleware/validateMiddleware');
const { protect } = require('../middleware/authMiddleware');
const { checkLessonLock } = require('../middleware/lockMiddleware');
const enrollmentController = require('../controllers/enrollmentController');
const {
    enrollSchema,
    courseProgressParamSchema,
    completeLessonSchema,
    updateLastWatchedSchema,
    lessonAccessQuerySchema,
    lessonContentParamSchema,
} = require('../validators/progressValidator');

const router = express.Router();

router.use(protect);

router.post('/', validate(enrollSchema), enrollmentController.enroll);
router.get('/', enrollmentController.getMyEnrollments);
router.get('/resume', enrollmentController.getResume);
router.get(
    '/:courseId/lesson-access',
    validate(lessonAccessQuerySchema),
    checkLessonLock,
    enrollmentController.getLessonAccess
);
router.get(
    '/:courseId/lessons/:lessonIndex',
    validate(lessonContentParamSchema),
    checkLessonLock,
    enrollmentController.getLessonContent
);
router.get('/:courseId', validate(courseProgressParamSchema), enrollmentController.getCourseProgress);
router.patch('/:courseId/complete', validate(completeLessonSchema), enrollmentController.completeLesson);
router.patch(
    '/:courseId/last-watched',
    validate(updateLastWatchedSchema),
    enrollmentController.updateLastWatched
);

module.exports = router;
