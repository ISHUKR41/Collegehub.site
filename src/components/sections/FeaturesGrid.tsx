/**
 * FeaturesGrid.tsx — "Why Choose Us" feature grid
 * 
 * Displays 6 key platform features in a responsive grid.
 * Each feature has an icon, title, and description inside a glass card.
 * Cards stagger-animate on scroll for visual appeal.
 * 
 * Why: Communicates value proposition clearly. Visitors need to
 * understand WHY they should use CollegeHub within seconds.
 * 
 * To extend: Add more features, or make them link to detailed pages.
 */

'use client';

import { BookOpen, Brain, Lock, BarChart3, RotateCcw, Shield } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import { FEATURES } from '@/lib/constants';

/* Map icon name strings to actual Lucide components */
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
    BookOpen,
    Brain,
    Lock,
    BarChart3,
    RotateCcw,
    Shield,
};

export default function FeaturesGrid() {
    return (
        <section className="section-padding relative" id="features" aria-label="Platform features">
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#6366f1]/[0.03] blur-[150px]" />

            <div className="container-custom relative z-10">
                <SectionHeading
                    label="Why Choose Us"
                    title="Built for Serious Learners"
                    subtitle="Every feature is designed to help you learn faster, track progress better, and never lose momentum."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {FEATURES.map((feature, index) => {
                        const Icon = ICON_MAP[feature.icon];
                        return (
                            <GlassCard key={feature.title} delay={index * 0.08}>
                                {/* Icon container */}
                                <div className="w-12 h-12 rounded-xl bg-[#6366f1]/10 border border-[#6366f1]/20 flex items-center justify-center mb-5">
                                    {Icon && <Icon className="w-6 h-6 text-[#a5b4fc]" />}
                                </div>

                                {/* Feature title */}
                                <h3 className="text-lg font-semibold text-white mb-3">
                                    {feature.title}
                                </h3>

                                {/* Feature description */}
                                <p className="text-sm text-[#94a3b8] leading-relaxed">
                                    {feature.description}
                                </p>
                            </GlassCard>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
