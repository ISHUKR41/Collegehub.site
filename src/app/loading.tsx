/**
 * loading.tsx — Root-level loading skeleton.
 *
 * Why this file exists:
 * - Next.js App Router shows this component while route segments are loading.
 * - Provides a premium skeleton placeholder instead of a blank screen.
 * - Uses CSS pulse animation (GPU-accelerated) for smooth visual feedback.
 *
 * To extend: Add more skeleton shapes for specific page layouts.
 */

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20" aria-busy="true" aria-label="Loading content">
      {/* Pulsing logo placeholder */}
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6366f1]/30 to-[#8b5cf6]/30 animate-pulse mb-8" />

      {/* Title skeleton */}
      <div className="w-64 h-6 rounded-lg bg-white/5 animate-pulse mb-4" />

      {/* Subtitle skeleton */}
      <div className="w-48 h-4 rounded-lg bg-white/5 animate-pulse mb-12" />

      {/* Content skeleton grid */}
      <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-48 rounded-2xl bg-white/[0.03] border border-white/5 animate-pulse"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
