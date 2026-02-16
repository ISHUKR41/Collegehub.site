/**
 * contactRoutes.js - Public contact/newsletter endpoints.
 */

const express = require('express');
const validate = require('../middleware/validateMiddleware');
const { protect } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');
const {
    contactRateLimiter,
    newsletterRateLimiter,
} = require('../middleware/rateLimiters');
const contactController = require('../controllers/contactController');
const {
    submitContactSchema,
    subscribeNewsletterSchema,
    unsubscribeNewsletterSchema,
    listContactMessagesQuerySchema,
} = require('../validators/contactValidator');
const { ROLES } = require('../constants');

const router = express.Router();

router.post(
    '/messages',
    contactRateLimiter,
    validate(submitContactSchema),
    contactController.submitContactMessage
);

router.get(
    '/messages',
    protect,
    requireRole(ROLES.ADMIN),
    validate(listContactMessagesQuerySchema),
    contactController.listContactMessages
);

router.post(
    '/newsletter/subscribe',
    newsletterRateLimiter,
    validate(subscribeNewsletterSchema),
    contactController.subscribeNewsletter
);

router.post(
    '/newsletter/unsubscribe',
    newsletterRateLimiter,
    validate(unsubscribeNewsletterSchema),
    contactController.unsubscribeNewsletter
);

module.exports = router;

