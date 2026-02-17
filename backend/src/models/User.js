/**
 * User.js - User identity and authentication schema.
 *
 * Security design:
 * - Password is hashed with bcrypt before save.
 * - Refresh token is stored as SHA-256 hash only.
 * - Login attempts and lockUntil protect against brute-force attacks.
 *
 * Auth providers:
 * - 'local' — email + password (default)
 * - 'google' — Google OAuth, password not required
 *
 * To extend: Add more OAuth providers (GitHub, Facebook) following the same pattern.
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { AUTH, ROLES } = require('../constants');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            minlength: [2, 'Name must be at least 2 characters'],
            maxlength: [100, 'Name cannot exceed 100 characters'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            index: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
        },
        password: {
            type: String,
            required: [
                function () {
                    return this.authProvider === 'local';
                },
                'Password is required for email registration',
            ],
            minlength: [8, 'Password must be at least 8 characters'],
            select: false,
        },
        /* Google OAuth unique identifier */
        googleId: {
            type: String,
            unique: true,
            sparse: true,
            index: true,
        },
        /* Which provider the user signed up with */
        authProvider: {
            type: String,
            enum: ['local', 'google'],
            default: 'local',
        },
        /* Profile picture URL (populated from Google profile) */
        avatar: {
            type: String,
            default: null,
        },
        role: {
            type: String,
            enum: Object.values(ROLES),
            default: ROLES.STUDENT,
            index: true,
        },
        refreshTokenHash: {
            type: String,
            select: false,
        },
        loginAttempts: {
            type: Number,
            default: 0,
        },
        lockUntil: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre('save', async function onSave(next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(AUTH.BCRYPT_SALT_ROUNDS);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.isLocked = function isLocked() {
    return this.lockUntil && this.lockUntil > Date.now();
};

userSchema.methods.incrementLoginAttempts = async function incrementLoginAttempts() {
    if (this.lockUntil && this.lockUntil < Date.now()) {
        this.loginAttempts = 1;
        this.lockUntil = undefined;
        return this.save({ validateBeforeSave: false });
    }

    this.loginAttempts += 1;
    if (this.loginAttempts >= AUTH.MAX_LOGIN_ATTEMPTS) {
        this.lockUntil = new Date(Date.now() + AUTH.LOCK_DURATION_MS);
    }

    return this.save({ validateBeforeSave: false });
};

userSchema.methods.resetLoginAttempts = async function resetLoginAttempts() {
    this.loginAttempts = 0;
    this.lockUntil = undefined;
    return this.save({ validateBeforeSave: false });
};

module.exports = mongoose.model('User', userSchema);
