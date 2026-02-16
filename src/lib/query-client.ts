/**
 * query-client.ts - Shared React Query client instance.
 *
 * Why this file exists:
 * - Centralizes fetch caching/retry policy.
 * - Avoids recreating QueryClient across components.
 * - Keeps data-fetch behavior consistent app-wide.
 */

import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,
      gcTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
    mutations: {
      retry: 0,
    },
  },
});

