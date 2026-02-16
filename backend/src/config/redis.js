/**
 * redis.js — Redis Client Configuration
 *
 * Creates a Redis client using ioredis for caching course data and
 * reducing database load on frequently accessed queries.
 *
 * IMPORTANT: The app works WITHOUT Redis. If REDIS_URL is not set or
 * connection fails, caching is silently skipped. This prevents Redis
 * from being a single point of failure.
 *
 * Why ioredis: Better reconnection handling, Cluster support, and
 * Promise-based API compared to the default redis package.
 *
 * To extend: Add Redis Cluster config, Sentinel for HA, or pub/sub for real-time.
 */

const Redis = require('ioredis');
const logger = require('./logger');

let redisClient = null;

/**
 * initRedis — Creates Redis connection if REDIS_URL is configured.
 * Returns null if Redis is unavailable (app continues without caching).
 */
const initRedis = () => {
    if (!process.env.REDIS_URL) {
        logger.info('REDIS_URL not set — caching disabled. App will work without Redis.');
        return null;
    }

    try {
        redisClient = new Redis(process.env.REDIS_URL, {
            maxRetriesPerRequest: 3,
            retryStrategy(times) {
                /* Exponential backoff: 200ms, 400ms, 800ms... max 10s */
                const delay = Math.min(times * 200, 10000);
                return delay;
            },
            lazyConnect: true,
        });

        redisClient.on('connect', () => {
            logger.info('Redis connected successfully.');
        });

        redisClient.on('error', (err) => {
            logger.error(`Redis error: ${err.message}`);
        });

        redisClient.on('close', () => {
            logger.warn('Redis connection closed.');
        });

        /* Attempt connection — don't block server startup */
        redisClient.connect().catch((err) => {
            logger.warn(`Redis connection failed: ${err.message}. Caching disabled.`);
            redisClient = null;
        });

        return redisClient;
    } catch (error) {
        logger.warn(`Redis initialization failed: ${error.message}. Caching disabled.`);
        return null;
    }
};

/**
 * getRedis — Returns the Redis client instance (or null if not available).
 * Always check for null before using: if (redis) { ... }
 */
const getRedis = () => redisClient;

module.exports = { initRedis, getRedis };
