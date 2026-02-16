/**
 * tokenUtils.js - JWT token helpers and secure refresh-cookie handling.
 *
 * This module centralizes:
 * - Access token generation
 * - Refresh token generation
 * - Refresh token hashing before DB storage
 * - HTTP-only cookie set/clear for refresh token rotation
 */

const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { AUTH } = require('../constants');

const toBoolean = (value, fallback = false) => {
    if (typeof value === 'undefined') return fallback;
    return String(value).toLowerCase() === 'true';
};

const normalizeSameSite = (value, fallback) => {
    const normalized = String(value || fallback).toLowerCase();
    if (['lax', 'strict', 'none'].includes(normalized)) {
        return normalized;
    }
    return fallback;
};

const parseDurationToMs = (durationValue, fallbackMs) => {
    if (!durationValue) return fallbackMs;

    if (typeof durationValue === 'number' && Number.isFinite(durationValue)) {
        return durationValue;
    }

    const raw = String(durationValue).trim().toLowerCase();
    const match = raw.match(/^(\d+)(ms|s|m|h|d)$/);
    if (!match) return fallbackMs;

    const amount = Number(match[1]);
    const unit = match[2];

    const multipliers = {
        ms: 1,
        s: 1000,
        m: 60 * 1000,
        h: 60 * 60 * 1000,
        d: 24 * 60 * 60 * 1000,
    };

    return amount * multipliers[unit];
};

const buildRefreshCookieOptions = () => {
    const isProduction = process.env.NODE_ENV === 'production';
    const sameSite = normalizeSameSite(
        process.env.REFRESH_COOKIE_SAME_SITE,
        isProduction ? 'none' : 'lax'
    );
    const secure = toBoolean(process.env.REFRESH_COOKIE_SECURE, isProduction || sameSite === 'none');

    const cookieOptions = {
        httpOnly: true,
        secure: sameSite === 'none' ? true : secure,
        sameSite,
        path: process.env.REFRESH_COOKIE_PATH || '/api/auth',
    };

    if (process.env.REFRESH_COOKIE_DOMAIN) {
        cookieOptions.domain = process.env.REFRESH_COOKIE_DOMAIN;
    }

    return cookieOptions;
};

const generateAccessToken = (userId, role) => {
    return jwt.sign(
        { userId, role },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m' }
    );
};

const generateRefreshToken = (userId) => {
    return jwt.sign(
        { userId },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
    );
};

const hashToken = (token) => {
    return crypto.createHash('sha256').update(token).digest('hex');
};

const setRefreshCookie = (res, token) => {
    const cookieOptions = buildRefreshCookieOptions();
    const refreshTokenMaxAge = parseDurationToMs(
        process.env.JWT_REFRESH_EXPIRES_IN,
        7 * 24 * 60 * 60 * 1000
    );

    res.cookie(AUTH.COOKIE_NAME, token, {
        ...cookieOptions,
        maxAge: refreshTokenMaxAge,
    });
};

const clearRefreshCookie = (res) => {
    res.clearCookie(AUTH.COOKIE_NAME, buildRefreshCookieOptions());
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    hashToken,
    setRefreshCookie,
    clearRefreshCookie,
};
