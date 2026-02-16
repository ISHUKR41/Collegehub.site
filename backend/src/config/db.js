/**
 * db.js — MongoDB Atlas Connection
 *
 * Connects to MongoDB using Mongoose. Uses the MONGODB_URI from .env.
 * Includes retry logic and connection event listeners for production reliability.
 *
 * Why Mongoose: Provides schema validation, middleware hooks, and indexing —
 * essential for data integrity in a production LMS.
 *
 * To extend: Add replica set config, read preferences, or connection pooling tweaks.
 */

const mongoose = require('mongoose');
const logger = require('./logger');

/**
 * connectDB — Establishes MongoDB connection with retry logic.
 * Retries up to 5 times with 5-second intervals on failure.
 */
const connectDB = async () => {
    const MAX_RETRIES = 5;
    const RETRY_DELAY_MS = 5000;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            const conn = await mongoose.connect(process.env.MONGODB_URI, {
                /* Mongoose 8 uses sensible defaults — no need for deprecated options */
            });

            logger.info(`MongoDB connected: ${conn.connection.host}`);
            return conn;
        } catch (error) {
            logger.error(`MongoDB connection attempt ${attempt}/${MAX_RETRIES} failed: ${error.message}`);

            if (attempt === MAX_RETRIES) {
                logger.error('All MongoDB connection attempts exhausted. Exiting.');
                process.exit(1);
            }

            /* Wait before retrying */
            await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
        }
    }
};

/* Connection event listeners for monitoring */
mongoose.connection.on('disconnected', () => {
    logger.warn('MongoDB disconnected. Attempting reconnection...');
});

mongoose.connection.on('error', (err) => {
    logger.error(`MongoDB connection error: ${err.message}`);
});

module.exports = connectDB;
