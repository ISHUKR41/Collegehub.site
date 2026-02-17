/**
 * StaggerContainer.tsx — Orchestrated stagger animation wrapper
 *
 * Wraps a list of child elements and staggers their entrance animation
 * using Framer Motion's `staggerChildren`. This replaces the manual
 * `delay={index * N}` pattern across card grids and lists.
 *
 * Usage:
 *   <StaggerContainer>
 *     <GlassCard>…</GlassCard>
 *     <GlassCard>…</GlassCard>
 *   </StaggerContainer>
 *
 * Each direct child will fade-in and slide-up with a staggered delay.
 * GPU-accelerated — only transforms opacity and translateY.
 */

'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

/* ── Props ── */
interface StaggerContainerProps {
  /** Content to stagger — typically a list of cards */
  children: ReactNode;
  /** Delay between each child (seconds). Default: 0.08 */
  staggerDelay?: number;
  /** Overall container animation duration (seconds). Default: 0.4 */
  duration?: number;
  /** Extra Tailwind / CSS classes for the wrapper div */
  className?: string;
  /** Fraction of the container visible before animation fires. Default: 0.1 */
  amount?: number;
  /** Fire animation only once? Default: true */
  once?: boolean;
}

/* Variants for parent — controls stagger timing */
const containerVariants: Variants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: {
      staggerChildren: stagger,
    },
  }),
};

/* Variants for each child — subtle fade + slide-up */
const childVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (duration: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export default function StaggerContainer({
  children,
  staggerDelay = 0.08,
  duration = 0.4,
  className = '',
  amount = 0.1,
  once = true,
}: StaggerContainerProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      custom={staggerDelay}
      className={className}
    >
      {/* Wrap each child so it inherits stagger timing */}
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div key={index} variants={childVariants} custom={duration}>
              {child}
            </motion.div>
          ))
        : (
          <motion.div variants={childVariants} custom={duration}>
            {children}
          </motion.div>
        )}
    </motion.div>
  );
}
