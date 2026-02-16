/**
 * User.js — User Schema (Mongoose)
 *
 * Defines the User model for authentication and profile management.
 *
 * Fields:
 * - name: Display name
 * - email: Unique, indexed for fast lookups during login
 * - password: Bcrypt hashed (never stored as plain text)
 * - role: student or admin (default: student)
 * - refreshTokenHash: SHA-256 hash of current refresh token
 * - loginAttempts: Counter for brute force protection
 * - lockUntil: Timestamp until which the account is locked
 *
 * Security:
 * - Password is hashed in pre-save hook (automatic)
 * - refreshTokenHash is stored instead of raw token
 * - Account locks after 5 failed login attempts
 *
 * Indexes: email (unique), role
 *
 * To extend: Add avatar URL, phone, address, subscription tier.
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
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
        },

        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [8, 'Password must be at least 8 characters'],
            select: false, /* Never returned in queries by default */
        },

        role: {
            type: String,
            enum: Object.values(ROLES),
            default: ROLES.STUDENT,
        },

        /* Hashed refresh token — for secure token rotation */
        refreshTokenHash: {
            type: String,
            select: false, /* Never returned in queries */
        },

        /* Brute force protection */
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
        timestamps: true, /* Adds createdAt and updatedAt automatically */
    }
);

/* ===================================================================
   INDEXES — Optimizes query performance
   =================================================================== */
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ role: 1 });

/* ===================================================================
   PRE-SAVE HOOK — Hash password before saving to DB
   Only runs when password is modified (not on every save).
   =================================================================== */
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(AUTH.BCRYPT_SALT_ROUNDS);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

/* ===================================================================
   INSTANCE METHODS
   =================================================================== */

/**
 * Compare a plain-text password against the stored hash.
 * Used during login.
 */
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

/**
 * Check if the account is currently locked (brute force protection).
 */
userSchema.methods.isLocked = function () {
    return this.lockUntil && this.lockUntil > Date.now();
};

/**
 * Increment login attempts. Lock account after MAX_LOGIN_ATTEMPTS.
 */
userSchema.methods.incrementLoginAttempts = async function () {
    /* If lock has expired, reset attempts */
    if (this.lockUntil && this.lockUntil < Date.now()) {
        return this.updateOne({
            $set: { loginAttempts: 1 },
            $unset: { lockUntil: 1 },
        });
    }

    const updates = { $inc: { loginAttempts: 1 } };

    /* Lock the account if max attempts reached */
    if (this.loginAttempts + 1 >= AUTH.MAX_LOGIN_ATTEMPTS) {
        updates.$set = { lockUntil: Date.now() + AUTH.LOCK_DURATION_MS };
    }

    return this.updateOne(updates);
};

/**
 * Reset login attempts after successful login.
 */
userSchema.methods.resetLoginAttempts = async function () {
    return this.updateOne({
        $set: { loginAttempts: 0 },
        $unset: { lockUntil: 1 },
    });
};

module.exports = mongoose.model('User', userSchema);
