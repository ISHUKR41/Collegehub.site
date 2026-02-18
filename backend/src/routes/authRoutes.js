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
const { isGoogleOAuthConfigured } = require('../config/passport');

const router = express.Router();

const redirectToGoogleAuthError = (req, res) => {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const nextPath =
        typeof req.query?.next === 'string'
            ? encodeURIComponent(req.query.next)
            : '';
    const nextQuery = nextPath ? `&next=${nextPath}` : '';
    return res.redirect(
        `${frontendUrl}/login?error=google_not_configured${nextQuery}`
    );
};

const ensureGoogleOAuthEnabled = (req, res, next) => {
    if (!isGoogleOAuthConfigured()) {
        return redirectToGoogleAuthError(req, res);
    }

    return next();
};

/* === Local (email/password) auth === */
router.post('/register', validate(registerSchema), authController.register);
router.post('/login', loginRateLimiter, validate(loginSchema), authController.login);
router.post('/refresh', validate(refreshSchema), authController.refresh);
router.post('/logout', authController.logout);
router.get('/me', protect, authController.getMe);

/* === Google OAuth === */
router.get(
    '/google',
    ensureGoogleOAuthEnabled,
    (req, res, next) =>
        passport.authenticate('google', {
            scope: ['profile', 'email'],
            session: false,
        })(req, res, next)
);

router.get(
    '/google/callback',
    ensureGoogleOAuthEnabled,
    (req, res, next) =>
        passport.authenticate('google', {
            session: false,
            failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/login?error=google_auth_failed`,
        })(req, res, next),
    authController.googleCallback
);

module.exports = router;
