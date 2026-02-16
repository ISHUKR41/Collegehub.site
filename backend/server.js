/**
 * server.js - Application bootstrap and lifecycle management.
 *
 * Responsibilities:
 * - Load environment variables.
 * - Connect infrastructure (MongoDB, Redis).
 * - Start HTTP server.
 * - Handle graceful shutdown and process-level exceptions.
 */

require('dotenv').config();

const app = require('./app');
const connectDB = require('./src/config/db');
const { initRedis, getRedis } = require('./src/config/redis');
const logger = require('./src/config/logger');

const REQUIRED_ENV_VARS = ['MONGODB_URI', 'JWT_ACCESS_SECRET', 'JWT_REFRESH_SECRET', 'CORS_ORIGIN'];

const assertRequiredEnv = () => {
    const missing = REQUIRED_ENV_VARS.filter((name) => !process.env[name]);
    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
};

let httpServer = null;

const closeInfrastructure = async () => {
    const mongoose = require('mongoose');
    const redis = getRedis();

    try {
        if (redis) {
            await redis.quit();
            logger.info('Redis disconnected gracefully.');
        }
    } catch (error) {
        logger.warn(`Redis shutdown warning: ${error.message}`);
    }

    try {
        await mongoose.connection.close(false);
        logger.info('MongoDB connection closed gracefully.');
    } catch (error) {
        logger.warn(`MongoDB shutdown warning: ${error.message}`);
    }
};

const gracefulShutdown = async (signal, exitCode = 0) => {
    logger.info(`Received ${signal}. Starting graceful shutdown...`);

    if (httpServer) {
        await new Promise((resolve) => httpServer.close(resolve));
        logger.info('HTTP server closed.');
    }

    await closeInfrastructure();
    process.exit(exitCode);
};

const start = async () => {
    assertRequiredEnv();
    await connectDB();
    initRedis();

    const port = Number(process.env.PORT || 5000);
    httpServer = app.listen(port, () => {
        logger.info(`CollegeHub backend running on port ${port} in ${process.env.NODE_ENV} mode.`);
    });
};

process.on('SIGINT', () => gracefulShutdown('SIGINT', 0));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM', 0));

process.on('uncaughtException', async (error) => {
    logger.error(`Uncaught exception: ${error.message}`);
    logger.error(error.stack || '');
    await gracefulShutdown('uncaughtException', 1);
});

process.on('unhandledRejection', async (error) => {
    logger.error(`Unhandled rejection: ${error.message}`);
    logger.error(error.stack || '');
    await gracefulShutdown('unhandledRejection', 1);
});

start().catch((error) => {
    logger.error(`Startup failed: ${error.message}`);
    logger.error(error.stack || '');
    process.exit(1);
});
