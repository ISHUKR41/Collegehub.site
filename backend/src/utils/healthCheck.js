const mongoose = require('mongoose');
const { getRedis } = require('../config/redis');
const logger = require('../config/logger');

const checkMongoDB = async () => {
    try {
        const state = mongoose.connection.readyState;
        const states = {
            0: 'disconnected',
            1: 'connected',
            2: 'connecting',
            3: 'disconnecting',
        };

        const isHealthy = state === 1;
        const status = states[state] || 'unknown';

        return {
            healthy: isHealthy,
            status,
            responseTime: null,
        };
    } catch (error) {
        logger.error('MongoDB health check failed:', error);
        return {
            healthy: false,
            status: 'error',
            error: error.message,
        };
    }
};

const checkRedis = async () => {
    try {
        const redis = getRedis();

        if (!redis) {
            return {
                healthy: true,
                status: 'not configured',
                message: 'Redis is optional and not configured',
            };
        }

        const start = Date.now();
        await redis.ping();
        const responseTime = Date.now() - start;

        return {
            healthy: true,
            status: 'connected',
            responseTime: `${responseTime}ms`,
        };
    } catch (error) {
        logger.error('Redis health check failed:', error);
        return {
            healthy: false,
            status: 'error',
            error: error.message,
        };
    }
};

const getSystemHealth = async () => {
    const [mongodb, redis] = await Promise.all([
        checkMongoDB(),
        checkRedis(),
    ]);

    const uptime = process.uptime();
    const memory = process.memoryUsage();

    return {
        status: mongodb.healthy && redis.healthy ? 'healthy' : 'degraded',
        timestamp: new Date().toISOString(),
        uptime: `${Math.floor(uptime)}s`,
        version: process.env.npm_package_version || '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        services: {
            mongodb,
            redis,
        },
        system: {
            memory: {
                used: `${Math.round(memory.heapUsed / 1024 / 1024)}MB`,
                total: `${Math.round(memory.heapTotal / 1024 / 1024)}MB`,
                external: `${Math.round(memory.external / 1024 / 1024)}MB`,
            },
            node: process.version,
        },
    };
};

module.exports = {
    checkMongoDB,
    checkRedis,
    getSystemHealth,
};
