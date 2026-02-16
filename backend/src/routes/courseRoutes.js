/**
 * courseRoutes.js - Public and admin routes for course catalog.
 */

const express = require('express');
const validate = require('../middleware/validateMiddleware');
const { protect } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');
const courseController = require('../controllers/courseController');
const {
    createCourseSchema,
    updateCourseSchema,
    listCourseQuerySchema,
    courseIdParamSchema,
} = require('../validators/courseValidator');
const { ROLES } = require('../constants');

const router = express.Router();

router.get(
    '/admin/all',
    protect,
    requireRole(ROLES.ADMIN),
    validate(listCourseQuerySchema),
    courseController.listAdminCourses
);
router.get(
    '/admin/:courseId',
    protect,
    requireRole(ROLES.ADMIN),
    validate(courseIdParamSchema),
    courseController.getAdminCourseById
);
router.post(
    '/admin',
    protect,
    requireRole(ROLES.ADMIN),
    validate(createCourseSchema),
    courseController.createCourse
);
router.patch(
    '/admin/:courseId',
    protect,
    requireRole(ROLES.ADMIN),
    validate(updateCourseSchema),
    courseController.updateCourse
);
router.delete(
    '/admin/:courseId',
    protect,
    requireRole(ROLES.ADMIN),
    validate(courseIdParamSchema),
    courseController.deleteCourse
);

router.get('/', validate(listCourseQuerySchema), courseController.listPublicCourses);
router.get('/:courseId', validate(courseIdParamSchema), courseController.getPublicCourseById);

module.exports = router;
