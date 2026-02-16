/**
 * cacheUtils.js — Redis Cache Helpers
 *
 * Provides simple get/set/invalidate functions for Redis caching.
 * All functions are safe — they silently skip if Redis is not available.
 *
 * Usage:
 *   const cached = await cacheGet('courses:all');
 *   if (cached) return cached;
 *   const data = await db.find();
 *   await cacheSet('courses:all', data, 300);
 *
 * Why helpers: Encapsulates Redis interaction, handles null Redis client,
 * and standardizes key/TTL patterns across the codebase.
 *
 * To extend: Add cache tags for group invalidation, or cache warming.
 */

const { getRedis } = require('../config/redis');
const logger = require('../config/logger');

/**
 * Get a cached value by key.
 * Returns parsed JSON data or null if not cached / Redis unavailable.
 */
const cacheGet = async (key) => {
    const redis = getRedis();
    if (!redis) return null;

    try {
        const cached = await redis.get(key);
        return cached ? JSON.parse(cached) : null;
    } catch (error) {
        logger.warn(`Cache GET failed for key "${key}": ${error.message}`);
        return null;
    }
};

/**
 * Set a cached value with TTL (time to live in seconds).
 * Silently fails if Redis is not available.
 */
const cacheSet = async (key, data, ttlSeconds) => {
    const redis = getRedis();
    if (!redis) return;

    try {
        await redis.setex(key, ttlSeconds, JSON.stringify(data));
    } catch (error) {
        logger.warn(`Cache SET failed for key "${key}": ${error.message}`);
    }
};

/**
 * Delete a specific cache key.
 * Used when data is updated/deleted to prevent stale reads.
 */
const cacheDel = async (key) => {
    const redis = getRedis();
    if (!redis) return;

    try {
        await redis.del(key);
    } catch (error) {
        logger.warn(`Cache DEL failed for key "${key}": ${error.message}`);
    }
};

/**
 * Invalidate all keys matching a pattern.
 * Example: invalidatePattern('courses:*') clears all course caches.
 *
 * Uses SCAN instead of KEYS to avoid blocking Redis on large datasets.
 */
const cacheInvalidatePattern = async (pattern) => {
    const redis = getRedis();
    if (!redis) return;

    try {
        let cursor = '0';
        do {
            const [nextCursor, keys] = await redis.scan(cursor, 'MATCH', pattern, 'COUNT', 100);
            cursor = nextCursor;
            if (keys.length > 0) {
                await redis.del(...keys);
            }
        } while (cursor !== '0');
    } catch (error) {
        logger.warn(`Cache pattern invalidation failed for "${pattern}": ${error.message}`);
    }
};

module.exports = {
    cacheGet,
    cacheSet,
    cacheDel,
    cacheInvalidatePattern,
};
