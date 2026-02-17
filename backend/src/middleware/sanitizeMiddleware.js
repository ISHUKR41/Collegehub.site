const AppError = require('../utils/AppError');
const { HTTP } = require('../constants');

const MAX_JSON_DEPTH = 10;
const MAX_STRING_LENGTH = 10000;

const countDepth = (obj, depth = 0) => {
    if (depth > MAX_JSON_DEPTH) {
        return depth;
    }

    if (typeof obj !== 'object' || obj === null) {
        return depth;
    }

    const depths = Object.values(obj).map((value) => countDepth(value, depth + 1));
    return Math.max(depth, ...depths);
};

const checkStringLengths = (obj) => {
    if (typeof obj === 'string' && obj.length > MAX_STRING_LENGTH) {
        return false;
    }

    if (typeof obj === 'object' && obj !== null) {
        for (const value of Object.values(obj)) {
            if (!checkStringLengths(value)) {
                return false;
            }
        }
    }

    return true;
};

const sanitizeInput = (req, res, next) => {
    try {
        if (req.body && typeof req.body === 'object') {
            const depth = countDepth(req.body);
            if (depth > MAX_JSON_DEPTH) {
                throw new AppError(
                    HTTP.BAD_REQUEST,
                    'Request payload is too deeply nested. Maximum allowed depth is 10.'
                );
            }

            if (!checkStringLengths(req.body)) {
                throw new AppError(
                    HTTP.BAD_REQUEST,
                    `Request contains strings exceeding maximum length of ${MAX_STRING_LENGTH} characters.`
                );
            }
        }

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { sanitizeInput };
