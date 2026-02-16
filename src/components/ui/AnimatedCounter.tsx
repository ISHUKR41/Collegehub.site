/**
 * AnimatedCounter.tsx — Animated number counter
 * 
 * Counts up from 0 to a target value when the element scrolls into view.
 * Uses requestAnimationFrame for smooth counting animation.
 * 
 * Why: Stats sections look boring with static numbers.
 * Animated counters draw attention and feel dynamic.
 * 
 * To extend: Add formatting options (currency, decimal places).
 */

'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
    /** Target value to count up to */
    target: number;
    /** Text to show after the number (e.g. '+', '%') */
    suffix?: string;
    /** Animation duration in milliseconds */
    duration?: number;
}

export default function AnimatedCounter({
    target,
    suffix = '',
    duration = 2000,
}: AnimatedCounterProps) {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        /* Use Intersection Observer to trigger animation when visible */
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    animateCount();
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(element);
        return () => observer.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasAnimated]);

    /* Smooth counting animation using easing function */
    const animateCount = () => {
        const startTime = performance.now();

        const tick = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            /* Ease-out cubic for natural deceleration */
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(easedProgress * target);

            setCount(currentValue);

            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                setCount(target);
            }
        };

        requestAnimationFrame(tick);
    };

    return (
        <span ref={ref} className="tabular-nums">
            {count.toLocaleString()}{suffix}
        </span>
    );
}
