/**
 * error.tsx — Root-level error boundary.
 *
 * Why this file exists:
 * - Catches unhandled runtime errors in any child route segment.
 * - Shows a user-friendly error screen with retry instead of a crash.
 * - Logs the error to the console for debugging.
 *
 * To extend:
 * - Send errors to Sentry or another monitoring service.
 * - Add different UI based on error types.
 */

'use client';

import { useEffect } from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    /* Log error for debugging — replace with Sentry in production */
    console.error('[CollegeHub Error Boundary]', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="glass p-8 sm:p-12 max-w-lg w-full text-center">
        {/* Error icon */}
        <div className="w-16 h-16 rounded-2xl bg-[#ef4444]/10 border border-[#ef4444]/20 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-[#ef4444]" />
        </div>

        {/* Error heading */}
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Something went wrong
        </h2>

        {/* Error description */}
        <p className="text-[#94a3b8] text-sm leading-relaxed mb-8">
          An unexpected error occurred. This has been noted and we&apos;re working on it.
          You can try again or go back to the home page.
        </p>

        {/* Error digest for debugging — only shown if available */}
        {error.digest && (
          <p className="text-xs text-[#64748b] font-mono mb-6">
            Error ID: {error.digest}
          </p>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white text-sm font-semibold hover:shadow-[0_0_24px_rgba(99,102,241,0.4)] transition-all duration-200 hover:-translate-y-0.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-semibold hover:bg-white/10 transition-all duration-200"
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
