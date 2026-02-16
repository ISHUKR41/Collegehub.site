/**
 * contactService.js - Contact and newsletter business logic.
 *
 * Why service layer:
 * - Keeps controller handlers thin and reusable.
 * - Centralizes dedupe/reactivation behavior for subscribers.
 * - Allows future move to notification/messaging microservice.
 */

const ContactMessage = require('../models/ContactMessage');
const NewsletterSubscriber = require('../models/NewsletterSubscriber');
const AppError = require('../utils/AppError');
const { HTTP } = require('../constants');

const formatContactMessage = (doc) => ({
    id: doc._id.toString(),
    name: doc.name,
    email: doc.email,
    subject: doc.subject,
    message: doc.message,
    source: doc.source,
    status: doc.status,
    createdAt: doc.createdAt,
});

const submitContactMessage = async (payload, requestMeta = {}) => {
    const message = await ContactMessage.create({
        ...payload,
        submittedFromIp: requestMeta.ip || null,
        userAgent: requestMeta.userAgent || null,
    });

    return formatContactMessage(message);
};

const subscribeNewsletter = async (payload, requestMeta = {}) => {
    const existing = await NewsletterSubscriber.findOne({ email: payload.email });

    if (!existing) {
        const subscriber = await NewsletterSubscriber.create({
            ...payload,
            subscribedFromIp: requestMeta.ip || null,
            userAgent: requestMeta.userAgent || null,
        });

        return {
            alreadySubscribed: false,
            subscriber: {
                id: subscriber._id.toString(),
                email: subscriber.email,
                isActive: subscriber.isActive,
                source: subscriber.source,
                createdAt: subscriber.createdAt,
            },
        };
    }

    let alreadySubscribed = true;

    if (!existing.isActive) {
        existing.isActive = true;
        existing.unsubscribedAt = null;
        existing.source = payload.source || existing.source;
        existing.subscribedFromIp = requestMeta.ip || existing.subscribedFromIp;
        existing.userAgent = requestMeta.userAgent || existing.userAgent;
        await existing.save();
        alreadySubscribed = false;
    }

    return {
        alreadySubscribed,
        subscriber: {
            id: existing._id.toString(),
            email: existing.email,
            isActive: existing.isActive,
            source: existing.source,
            createdAt: existing.createdAt,
        },
    };
};

const unsubscribeNewsletter = async (email) => {
    const subscriber = await NewsletterSubscriber.findOne({ email });
    if (!subscriber || !subscriber.isActive) {
        throw new AppError(HTTP.NOT_FOUND, 'Active subscription not found for this email.');
    }

    subscriber.isActive = false;
    subscriber.unsubscribedAt = new Date();
    await subscriber.save();
};

const listContactMessages = async ({ page = 1, limit = 20, status }) => {
    const safePage = Math.max(Number(page) || 1, 1);
    const safeLimit = Math.min(Math.max(Number(limit) || 20, 1), 100);

    const query = {};
    if (status) {
        query.status = status;
    }

    const [items, total] = await Promise.all([
        ContactMessage.find(query)
            .sort({ createdAt: -1 })
            .skip((safePage - 1) * safeLimit)
            .limit(safeLimit)
            .lean(),
        ContactMessage.countDocuments(query),
    ]);

    return {
        items: items.map((item) => formatContactMessage(item)),
        pagination: {
            page: safePage,
            limit: safeLimit,
            total,
            totalPages: Math.max(Math.ceil(total / safeLimit), 1),
        },
    };
};

module.exports = {
    submitContactMessage,
    subscribeNewsletter,
    unsubscribeNewsletter,
    listContactMessages,
};
