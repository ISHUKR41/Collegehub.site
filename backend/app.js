/**
 * app.js - Express application composition.
 *
 * This file wires middleware, security hardening, and route modules.
 * Server bootstrapping (DB/Redis/listen) is handled in server.js.
 */

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const morgan = require('morgan');

const logger = require('./src/config/logger');
const apiRoutes = require('./src/routes');
const { apiRateLimiter } = require('./src/middleware/rateLimiters');
const { notFound } = require('./src/middleware/notFoundMiddleware');
const { errorHandler } = require('./src/middleware/errorMiddleware');

const app = express();

app.disable('x-powered-by');
app.set('trust proxy', 1);

const allowedOrigins = (process.env.CORS_ORIGIN || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use(
    helmet({
        crossOriginResourcePolicy: { policy: 'cross-origin' },
    })
);

app.use(
    cors({
        origin(origin, callback) {
            /*
             * Allow requests with no Origin (CLI/mobile apps/Postman) and
             * explicitly allow configured frontend origins.
             */
            if (!origin || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
            return callback(new Error('CORS policy violation: origin not allowed.'));
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    })
);

const bodyLimit = process.env.BODY_LIMIT || '10kb';
app.use(express.json({ limit: bodyLimit }));
app.use(express.urlencoded({ extended: true, limit: bodyLimit }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());
app.use(compression());

if (process.env.NODE_ENV !== 'production') {
    app.use(
        morgan('dev', {
            stream: {
                write: (message) => logger.info(message.trim()),
            },
        })
    );
}

app.use('/api', apiRateLimiter, apiRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;

