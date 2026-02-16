/**
 * healthController.js - Health and readiness endpoints.
 *
 * These endpoints are used by Render load balancer and monitoring systems.
 */

const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const { HTTP } = require('../constants');
const mongoose = require('mongoose');
const { getRedis } = require('../config/redis');

const resolveMongoState = () => {
    const stateMap = {
        0: 'disconnected',
        1: 'connected',
        2: 'connecting',
        3: 'disconnecting',
    };
    return stateMap[mongoose.connection.readyState] || 'unknown';
};

const resolveRedisState = () => {
    const redis = getRedis();
    if (!redis) return 'disabled';
    return redis.status || 'unknown';
};

const health = asyncHandler(async (req, res) => {
    return ApiResponse.success(res, HTTP.OK, 'Service is healthy.', {
        uptimeSeconds: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString(),
        infrastructure: {
            mongodb: resolveMongoState(),
            redis: resolveRedisState(),
        },
    });
});

module.exports = {
    health,
};
