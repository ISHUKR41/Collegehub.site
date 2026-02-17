/**
 * AuthCallbackContent.tsx - Client component for processing OAuth callback.
 *
 * Reads the access token from the URL search params and stores it
 * in memory, then redirects the user to their dashboard.
 *
 * Shows a loading spinner during the process for a polished UX.
 */

'use client';

import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { setAccessToken } from '@/lib/api-client';

export default function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasProcessed = useRef(false);

  useEffect(() => {
    /* Prevent double-processing in React 18 StrictMode */
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (error || !token) {
      router.replace('/login?error=google_auth_failed');
      return;
    }

    /* Store the access token in memory (same as local login) */
    setAccessToken(token);

    /* Redirect to dashboard */
    router.replace('/dashboard');
  }, [searchParams, router]);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#6366f1]/[0.08] blur-[120px]" />

      <div className="relative z-10 text-center">
        {/* Animated spinner */}
        <div className="w-12 h-12 mx-auto mb-6 border-2 border-white/10 border-t-[#6366f1] rounded-full animate-spin" />
        <h1 className="text-xl font-semibold text-white mb-2">
          Signing you in...
        </h1>
        <p className="text-sm text-[#94a3b8]">
          Processing your Google authentication.
        </p>
      </div>
    </section>
  );
}
