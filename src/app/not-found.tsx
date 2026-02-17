/**
 * not-found.tsx — Custom 404 page.
 *
 * Why this file exists:
 * - Provides a branded 404 experience instead of the default Next.js page.
 * - Guides users back to navigation with CTA buttons.
 *
 * To extend: Add search suggestions or popular links.
 */

import Link from 'next/link';
import { Home, Search, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist on CollegeHub.',
};

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="text-center max-w-lg">
        {/* Large 404 number with gradient */}
        <h1 className="text-[120px] sm:text-[160px] font-black leading-none text-gradient mb-2 select-none">
          404
        </h1>

        {/* Search icon */}
        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
          <Search className="w-6 h-6 text-[#a5b4fc]" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-[#94a3b8] text-sm leading-relaxed mb-8 max-w-sm mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white text-sm font-semibold hover:shadow-[0_0_24px_rgba(99,102,241,0.4)] transition-all duration-200 hover:-translate-y-0.5"
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </Link>

          <Link
            href="/school"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-semibold hover:bg-white/10 transition-all duration-200"
          >
            <span>Explore School</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/coding"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-semibold hover:bg-white/10 transition-all duration-200"
          >
            <span>Start Coding</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
