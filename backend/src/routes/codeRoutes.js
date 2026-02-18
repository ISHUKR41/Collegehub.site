/**
 * codeRoutes.js - Routes for in-browser code execution.
 */

const express = require('express');
const validate = require('../middleware/validateMiddleware');
const { codeExecutionRateLimiter } = require('../middleware/rateLimiters');
const codeController = require('../controllers/codeController');
const { executeCodeSchema } = require('../validators/codeValidator');

const router = express.Router();

router.post('/execute', codeExecutionRateLimiter, validate(executeCodeSchema), codeController.executeCode);

module.exports = router;

