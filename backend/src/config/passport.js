/**
 * passport.js - Passport.js strategy configuration.
 *
 * Currently configures Google OAuth 2.0 strategy.
 * Passport is used only for the OAuth handshake — after that,
 * we issue our own JWT tokens (same as local auth).
 *
 * To extend: Add more strategies (GitHub, Facebook) here.
 */

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { findOrCreateGoogleUser } = require('../services/googleAuthService');
const logger = require('./logger');

const hasPlaceholderValue = (value = '') => {
    const normalized = String(value).trim().toLowerCase();
    return (
        !normalized ||
        normalized.includes('<your_') ||
        normalized.includes('your-google-client-id') ||
        normalized.includes('your-google-client-secret')
    );
};

const isGoogleOAuthConfigured = () => {
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    return !hasPlaceholderValue(clientID) && !hasPlaceholderValue(clientSecret);
};

/**
 * Initialize Passport with Google Strategy.
 *
 * We deliberately don't use passport sessions (no serializeUser/deserializeUser)
 * because we manage sessions via JWT access + refresh tokens.
 */
const initializePassport = () => {
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const callbackURL =
        process.env.GOOGLE_CALLBACK_URL ||
        'http://localhost:5000/api/auth/google/callback';

    if (!isGoogleOAuthConfigured()) {
        logger.warn(
            'Google OAuth credentials not configured. Google login will be unavailable. ' +
            'Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env to enable.'
        );
        return;
    }

    passport.use(
        new GoogleStrategy(
            {
                clientID,
                clientSecret,
                callbackURL,
                scope: ['profile', 'email'],
            },
            async (_accessToken, _refreshToken, profile, done) => {
                try {
                    const result = await findOrCreateGoogleUser(profile);
                    return done(null, result);
                } catch (error) {
                    logger.error('Google OAuth Strategy Error:', error);
                    return done(error, null);
                }
            }
        )
    );

    logger.info('Google OAuth strategy initialized successfully.');
};

module.exports = {
    initializePassport,
    isGoogleOAuthConfigured,
};
