/**
 * AppProviders.tsx - Application-level client providers.
 *
 * Why this file exists:
 * - Wraps all pages with React Query context.
 * - Provides a single place to add future providers (theme/auth).
 */

'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useEffect } from 'react';
import { bootstrapAccessToken } from '@/lib/api-client';
import { queryClient } from '@/lib/query-client';
import { ToastProvider } from '@/components/ui/toast';
import { ErrorBoundary } from '@/components/providers/ErrorBoundary';

interface AppProvidersProps {
  children: ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  useEffect(() => {
    void bootstrapAccessToken();
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          {children}
        </ToastProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
