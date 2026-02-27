/**
 * ScrollProgress.tsx — Scroll progress indicator bar + percentage display
 *
 * Shows TWO visual cues for the user:
 * 1. A thin gradient bar at the very top of the screen that fills as you scroll
 * 2. A small floating percentage badge in the bottom-right corner
 *
 * Both use GPU-accelerated rendering for zero-lag performance.
 *
 * Why: On long pages (like Day 1 with 10+ sections), users need to know
 * how far they've read. The percentage badge makes this crystal clear.
 *
 * Performance: Uses requestAnimationFrame for smooth updates without jank.
 * The bar uses CSS transform (scaleX) instead of width changes for GPU compositing.
 */

'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

export default function ScrollProgress() {
  /* ─── Track scroll percentage (0 to 100) ─── */
  const [progress, setProgress] = useState(0);
  /* ─── Show/hide the percentage badge (only visible after slight scroll) ─── */
  const [visible, setVisible] = useState(false);
  /* ─── Reference to the animation frame for cleanup ─── */
  const rafRef = useRef<number | null>(null);

  /**
   * handleScroll — Calculates the current scroll percentage.
   * Uses requestAnimationFrame to batch DOM reads for performance.
   */
  const handleScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      /* scrollY = how many pixels user has scrolled from top */
      const scrollTop = window.scrollY;
      /* docHeight = total scrollable height (page height minus viewport) */
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      /* Calculate percentage: 0% at top, 100% at bottom */
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollPercent);
      /* Only show the percentage badge after scrolling past 30px */
      setVisible(scrollTop > 30);
    });
  }, []);

  useEffect(() => {
    /* Listen for scroll events — passive: true means browser can optimize */
    window.addEventListener('scroll', handleScroll, { passive: true });
    /* Initial calculation in case page loads mid-scroll */
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);

  /* ─── Round the percentage for display ─── */
  const displayPercent = Math.round(progress);

  return (
    <>
      {/* ─── Progress Bar — thin gradient line at the top of the page ─── */}
      <div
        className="fixed top-0 left-0 right-0 h-[3px] z-[1000] origin-left"
        style={{
          /* Use scaleX transform instead of width for GPU compositing */
          transform: `scaleX(${progress / 100})`,
          background: 'linear-gradient(90deg, #22c55e, #6366f1, #a78bfa)',
          transition: 'transform 80ms linear',
          willChange: 'transform',
        }}
        role="progressbar"
        aria-valuenow={displayPercent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      />

      {/* ─── Percentage Badge — floating in bottom-right corner ─── */}
      <div
        className="fixed bottom-6 right-6 z-[999] font-[family-name:var(--font-jetbrains)]"
        style={{
          /* Smoothly appear/disappear */
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.9)',
          transition: 'opacity 300ms ease, transform 300ms ease',
          pointerEvents: 'none',
        }}
      >
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-bold tracking-wider"
          style={{
            background: 'rgba(10, 10, 18, 0.9)',
            border: '1px solid rgba(34, 197, 94, 0.2)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 15px rgba(34, 197, 94, 0.1)',
            backdropFilter: 'blur(12px)',
            color: '#22c55e',
          }}
        >
          {/* Small circular progress ring */}
          <svg width="16" height="16" viewBox="0 0 16 16" className="shrink-0">
            {/* Background ring */}
            <circle
              cx="8" cy="8" r="6"
              fill="none"
              stroke="rgba(34, 197, 94, 0.15)"
              strokeWidth="2"
            />
            {/* Filled progress ring */}
            <circle
              cx="8" cy="8" r="6"
              fill="none"
              stroke="#22c55e"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={`${(progress / 100) * 37.7} 37.7`}
              transform="rotate(-90 8 8)"
              style={{ transition: 'stroke-dasharray 80ms linear' }}
            />
          </svg>
          <span>{displayPercent}%</span>
        </div>
      </div>
    </>
  );
}
