const ApiResponse = require('../utils/ApiResponse');
const { getSystemHealth } = require('../utils/healthCheck');

const health = async (req, res) => {
    const healthData = await getSystemHealth();
    const statusCode = healthData.status === 'healthy' ? 200 : 503;
    
    return res.status(statusCode).json({
        success: healthData.status === 'healthy',
        data: healthData,
    });
};

const ready = (req, res) => {
    return ApiResponse.success(res, {
        status: 'ready',
        message: 'Backend is ready to accept requests.',
        timestamp: new Date().toISOString(),
    });
};

const live = (req, res) => {
    return ApiResponse.success(res, {
        status: 'alive',
        uptime: `${Math.floor(process.uptime())}s`,
        timestamp: new Date().toISOString(),
    });
};

module.exports = { health, ready, live };
