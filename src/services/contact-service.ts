/**
 * contact-service.ts - Contact and newsletter API wrappers.
 */

import { publicApiClient } from '@/lib/api-client';
import {
  ApiEnvelope,
  ContactMessagePayload,
  NewsletterSubscriptionPayload,
} from '@/types/api';

interface ContactMessageResponse {
  message: {
    id: string;
    createdAt: string;
  };
}

interface NewsletterResponse {
  subscriber: {
    id: string;
    email: string;
    isActive: boolean;
    source: string;
    createdAt: string;
  };
}

export const submitContactMessage = async (
  payload: ContactMessagePayload
): Promise<ContactMessageResponse['message']> => {
  const response = await publicApiClient.post<ApiEnvelope<ContactMessageResponse>>(
    '/contact/messages',
    payload
  );
  return response.data.data.message;
};

export const subscribeNewsletter = async (
  payload: NewsletterSubscriptionPayload
): Promise<NewsletterResponse['subscriber']> => {
  const response = await publicApiClient.post<ApiEnvelope<NewsletterResponse>>(
    '/contact/newsletter/subscribe',
    payload
  );
  return response.data.data.subscriber;
};

