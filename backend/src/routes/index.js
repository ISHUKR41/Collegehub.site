/**
 * routes/index.js - Central API route registry.
 *
 * Keeps `app.js` clean and allows feature-route modules
 * to evolve independently.
 */

const express = require('express');
const authRoutes = require('./authRoutes');
const courseRoutes = require('./courseRoutes');
const enrollmentRoutes = require('./enrollmentRoutes');
const testRoutes = require('./testRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const healthRoutes = require('./healthRoutes');
const contactRoutes = require('./contactRoutes');
const codeRoutes = require('./codeRoutes');
const { authRateLimiter } = require('../middleware/rateLimiters');

const router = express.Router();

router.use('/health', healthRoutes);
router.use('/auth', authRateLimiter, authRoutes);
router.use('/courses', courseRoutes);
router.use('/enrollments', enrollmentRoutes);
router.use('/tests', testRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/contact', contactRoutes);
router.use('/code', codeRoutes);

module.exports = router;
