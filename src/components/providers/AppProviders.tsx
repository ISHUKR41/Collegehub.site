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

interface AppProvidersProps {
  children: ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  useEffect(() => {
    /*
     * Attempt silent session recovery from secure refresh cookie.
     * Failure is expected for logged-out visitors and should stay silent.
     */
    void bootstrapAccessToken();
  }, []);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
