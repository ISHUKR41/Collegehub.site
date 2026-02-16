/**
 * contactController.js - HTTP handlers for contact/newsletter endpoints.
 *
 * Controllers only orchestrate request/response:
 * - Input already validated by Zod middleware.
 * - Business logic delegated to contactService.
 */

const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const contactService = require('../services/contactService');
const { HTTP } = require('../constants');

const resolveRequestMeta = (req) => ({
    ip: req.ip,
    userAgent: req.headers['user-agent'] || null,
});

const submitContactMessage = asyncHandler(async (req, res) => {
    const message = await contactService.submitContactMessage(req.body, resolveRequestMeta(req));
    return ApiResponse.success(res, HTTP.CREATED, 'Message submitted successfully.', { message });
});

const subscribeNewsletter = asyncHandler(async (req, res) => {
    const result = await contactService.subscribeNewsletter(req.body, resolveRequestMeta(req));
    const statusCode = result.alreadySubscribed ? HTTP.OK : HTTP.CREATED;
    const message = result.alreadySubscribed
        ? 'This email is already subscribed.'
        : 'Newsletter subscription successful.';

    return ApiResponse.success(res, statusCode, message, {
        subscriber: result.subscriber,
    });
});

const unsubscribeNewsletter = asyncHandler(async (req, res) => {
    await contactService.unsubscribeNewsletter(req.body.email);
    return ApiResponse.success(res, HTTP.OK, 'Newsletter unsubscribed successfully.');
});

const listContactMessages = asyncHandler(async (req, res) => {
    const payload = await contactService.listContactMessages(req.query);
    return ApiResponse.success(res, HTTP.OK, 'Contact messages fetched successfully.', payload);
});

module.exports = {
    submitContactMessage,
    subscribeNewsletter,
    unsubscribeNewsletter,
    listContactMessages,
};

