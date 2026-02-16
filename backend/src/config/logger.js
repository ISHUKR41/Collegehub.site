/**
 * logger.js — Winston Logger Configuration
 *
 * Production-grade logging with:
 * - File transport for errors (logs/error.log)
 * - File transport for all logs (logs/combined.log)
 * - Console transport in development only (colorized)
 *
 * Why Winston: Industry standard for Node.js. Supports multiple transports,
 * log levels, formatting, and rotation. Essential for debugging in production
 * where console.log is not visible.
 *
 * To extend: Add log rotation (winston-daily-rotate-file), send to
 * external services (Sentry, Datadog, CloudWatch).
 */

const winston = require('winston');
const path = require('path');
const fs = require('fs');

/* Log directory */
const LOG_DIR = path.join(__dirname, '..', 'logs');

/* Ensure logs directory exists before Winston file transports initialize. */
if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
}

/* Custom format: timestamp + level + message */
const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.printf(({ timestamp, level, message, stack }) => {
        return stack
            ? `${timestamp} [${level.toUpperCase()}]: ${message}\n${stack}`
            : `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
);

/* Create logger instance */
const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: logFormat,
    defaultMeta: { service: 'collegehub-api' },
    transports: [
        /* Error-only file — makes it easy to find critical issues */
        new winston.transports.File({
            filename: path.join(LOG_DIR, 'error.log'),
            level: 'error',
            maxsize: 5 * 1024 * 1024, /* 5 MB */
            maxFiles: 5,
        }),

        /* All logs combined — for full audit trail */
        new winston.transports.File({
            filename: path.join(LOG_DIR, 'combined.log'),
            maxsize: 10 * 1024 * 1024, /* 10 MB */
            maxFiles: 5,
        }),
    ],
});

/* Console output only in development — no console.log in production */
if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        })
    );
}

module.exports = logger;
