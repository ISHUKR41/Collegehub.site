/**
 * use-contact-mutations.ts - Mutations for contact and newsletter forms.
 */

import { useMutation } from '@tanstack/react-query';
import {
  submitContactMessage,
  subscribeNewsletter,
} from '@/services/contact-service';

export const useSubmitContactMutation = () =>
  useMutation({
    mutationFn: submitContactMessage,
  });

export const useNewsletterSubscriptionMutation = () =>
  useMutation({
    mutationFn: subscribeNewsletter,
  });

