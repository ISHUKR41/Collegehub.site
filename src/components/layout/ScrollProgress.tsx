/**
 * ScrollProgress.tsx — Scroll progress indicator bar
 * 
 * Displays a thin gradient bar at the very top of the viewport that fills
 * as the user scrolls down the page. Uses GPU-accelerated transforms for
 * buttery-smooth performance.
 * 
 * Why: Gives users a visual cue of how far they've scrolled through long pages.
 * 
 * To extend: Change the gradient colors or height. You could also add
 * a percentage tooltip on hover.
 */

'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgress() {
    /* Track scroll percentage (0 to 100) */
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            /* Calculate how far down the page the user has scrolled */
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            setProgress(scrollPercent);
        };

        /* Listen for scroll events with passive flag for performance */
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            className="fixed top-0 left-0 h-[3px] z-[1000]"
            style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)',
                transition: 'width 50ms linear',
                /* GPU acceleration for smooth rendering */
                willChange: 'width',
            }}
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Page scroll progress"
        />
    );
}
