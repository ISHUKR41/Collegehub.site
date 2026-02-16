/**
 * GlassCard.tsx — Reusable glassmorphism card
 * 
 * A card with:
 * - Semi-transparent background
 * - Backdrop blur
 * - Subtle border
 * - Hover glow effect with lift
 * - Framer Motion entrance animation
 * 
 * Why: Used everywhere — feature grids, course cards, testimonials.
 * Centralizing the glass effect keeps design consistent.
 * 
 * To extend: Add variants (compact, large, highlighted).
 */

'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
    children: ReactNode;
    /** Additional CSS classes */
    className?: string;
    /** Stagger delay for list animations */
    delay?: number;
    /** Whether to add hover effect */
    hover?: boolean;
}

export default function GlassCard({
    children,
    className = '',
    delay = 0,
    hover = true,
}: GlassCardProps) {
    return (
        <motion.div
            className={`
        rounded-2xl p-6 md:p-8
        bg-white/[0.03] backdrop-blur-md
        border border-white/[0.06]
        transition-all duration-200
        ${hover ? 'hover:bg-white/[0.06] hover:border-white/[0.12] hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] hover:-translate-y-1' : ''}
        ${className}
      `}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.4, delay }}
        >
            {children}
        </motion.div>
    );
}
