/**
 * AppProviders.tsx - Application-level client providers.
 *
 * Why this file exists:
 * - Wraps all pages with React Query context.
 * - Provides a single place to add future providers (theme/auth).
 */

'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { queryClient } from '@/lib/query-client';

interface AppProvidersProps {
  children: ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

