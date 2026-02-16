/**
 * testRoutes.js - Routes for assessments and submissions.
 */

const express = require('express');
const validate = require('../middleware/validateMiddleware');
const { protect } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');
const testController = require('../controllers/testController');
const {
    createTestSchema,
    testIdParamSchema,
    courseTestQuerySchema,
    submitTestSchema,
} = require('../validators/testValidator');
const { ROLES } = require('../constants');

const router = express.Router();

router.get('/course', protect, validate(courseTestQuerySchema), testController.listTestsForCourse);
router.get('/:testId', protect, validate(testIdParamSchema), testController.getTestForAttempt);
router.post('/submit', protect, validate(submitTestSchema), testController.submitTest);

router.post(
    '/admin',
    protect,
    requireRole(ROLES.ADMIN),
    validate(createTestSchema),
    testController.createTest
);

module.exports = router;

