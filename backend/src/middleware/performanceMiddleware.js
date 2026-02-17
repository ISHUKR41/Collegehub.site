const logger = require('../config/logger');

const performanceMiddleware = (req, res, next) => {
    const startTime = Date.now();
    const originalSend = res.send;

    res.send = function (data) {
        const responseTime = Date.now() - startTime;
        
        res.setHeader('X-Response-Time', `${responseTime}ms`);
        
        if (responseTime > 1000) {
            logger.warn({
                message: 'Slow request detected',
                requestId: req.requestId,
                method: req.method,
                path: req.path,
                responseTime: `${responseTime}ms`,
                statusCode: res.statusCode,
            });
        }

        if (process.env.NODE_ENV === 'development') {
            logger.debug({
                requestId: req.requestId,
                method: req.method,
                path: req.path,
                responseTime: `${responseTime}ms`,
                statusCode: res.statusCode,
            });
        }

        return originalSend.call(this, data);
    };

    next();
};

module.exports = { performanceMiddleware };
