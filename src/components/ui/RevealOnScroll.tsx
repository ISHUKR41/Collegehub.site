/**
 * RevealOnScroll.tsx — Reusable scroll-reveal animation wrapper.
 *
 * Why this component exists:
 * - Provides consistent scroll-triggered entrance animations across all pages.
 * - Uses Framer Motion's `whileInView` for optimal performance — only animates
 *   when the element enters the viewport.
 * - GPU-accelerated (transform + opacity only) to avoid layout thrashing.
 *
 * Usage:
 *   <RevealOnScroll>
 *     <YourComponent />
 *   </RevealOnScroll>
 *
 * To extend:
 * - Add more `direction` variants (e.g. 'left', 'right', 'scale').
 * - Adjust `amount` for earlier/later trigger points.
 */

'use client';

import { type ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';

/* Direction determines which axis the element slides in from */
type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface RevealOnScrollProps {
  children: ReactNode;
  /** Animation entry direction. Defaults to 'up'. */
  direction?: Direction;
  /** Delay in seconds before the animation starts. Defaults to 0. */
  delay?: number;
  /** Duration of the animation in seconds. Defaults to 0.6. */
  duration?: number;
  /** Extra CSS classes to apply to the wrapper. */
  className?: string;
  /** How much of the element must be visible to trigger (0-1). Defaults to 0.15. */
  amount?: number;
  /** Whether to animate only once or every time element enters viewport. */
  once?: boolean;
}

/* Build the initial offset based on direction */
const getOffset = (direction: Direction): { x: number; y: number } => {
  switch (direction) {
    case 'up':
      return { x: 0, y: 40 };
    case 'down':
      return { x: 0, y: -40 };
    case 'left':
      return { x: 40, y: 0 };
    case 'right':
      return { x: -40, y: 0 };
    case 'none':
      return { x: 0, y: 0 };
  }
};

export default function RevealOnScroll({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className = '',
  amount = 0.15,
  once = true,
}: RevealOnScrollProps) {
  const offset = getOffset(direction);

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
