/**
 * SectionHeading.tsx — Reusable animated section heading
 * 
 * Used at the top of every section across all pages.
 * Features gradient text, subtitle, and Framer Motion reveal animation.
 * 
 * Why: Consistency across sections. One component to rule all headings.
 * 
 * To extend: Add alignment variants (left-aligned, right-aligned).
 */

'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
    /** Main heading text (supports gradient by default) */
    title: string;
    /** Optional subtitle below the heading */
    subtitle?: string;
    /** Optional small label above the heading */
    label?: string;
    /** Center or left align (default: center) */
    align?: 'center' | 'left';
}

export default function SectionHeading({
    title,
    subtitle,
    label,
    align = 'center',
}: SectionHeadingProps) {
    return (
        <motion.div
            className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
        >
            {/* Label — small colored text above heading */}
            {label && (
                <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#a5b4fc] mb-3">
                    {label}
                </span>
            )}

            {/* Main heading with gradient */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient leading-tight mb-4">
                {title}
            </h2>

            {/* Subtitle */}
            {subtitle && (
                <p className={`text-[#94a3b8] text-base md:text-lg leading-relaxed ${align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-2xl'
                    }`}>
                    {subtitle}
                </p>
            )}
        </motion.div>
    );
}
