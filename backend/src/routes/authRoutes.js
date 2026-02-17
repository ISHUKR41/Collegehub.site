/**
 * authRoutes.js - Routes for register/login/refresh/logout/profile and Google OAuth.
 *
 * Google OAuth routes:
 * - GET /google       — Redirects to Google consent screen
 * - GET /google/callback — Handles the redirect from Google
 *
 * To extend: Add more OAuth provider routes (e.g., /github, /github/callback).
 */

const express = require('express');
const passport = require('passport');
const validate = require('../middleware/validateMiddleware');
const { protect } = require('../middleware/authMiddleware');
const { loginRateLimiter } = require('../middleware/rateLimiters');
const authController = require('../controllers/authController');
const { registerSchema, loginSchema, refreshSchema } = require('../validators/authValidator');

const router = express.Router();

/* === Local (email/password) auth === */
router.post('/register', validate(registerSchema), authController.register);
router.post('/login', loginRateLimiter, validate(loginSchema), authController.login);
router.post('/refresh', validate(refreshSchema), authController.refresh);
router.post('/logout', authController.logout);
router.get('/me', protect, authController.getMe);

/* === Google OAuth === */
router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        session: false,
    })
);

router.get(
    '/google/callback',
    passport.authenticate('google', {
        session: false,
        failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/login?error=google_auth_failed`,
    }),
    authController.googleCallback
);

module.exports = router;

