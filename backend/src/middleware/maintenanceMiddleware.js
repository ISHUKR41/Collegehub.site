const ApiResponse = require('../utils/ApiResponse');
const { HTTP } = require('../constants');

const MAINTENANCE_MODE = process.env.MAINTENANCE_MODE === 'true';
const MAINTENANCE_MESSAGE = process.env.MAINTENANCE_MESSAGE || 'The platform is currently under maintenance. Please check back soon.';

const WHITELISTED_PATHS = [
    '/api/health',
    '/api/health/ready',
    '/api/health/live',
];

const maintenanceMode = (req, res, next) => {
    if (!MAINTENANCE_MODE) {
        return next();
    }

    const isWhitelisted = WHITELISTED_PATHS.some(path => req.path.startsWith(path));
    
    if (isWhitelisted) {
        return next();
    }

    return res.status(HTTP.SERVICE_UNAVAILABLE).json({
        success: false,
        message: MAINTENANCE_MESSAGE,
        maintenanceMode: true,
        estimatedReturnTime: process.env.MAINTENANCE_END_TIME || null,
    });
};

module.exports = { maintenanceMode };
