/**
 * StatsSection.tsx — Animated statistics counters
 * 
 * Shows key metrics (students, courses, languages, satisfaction)
 * with animated counting when scrolled into view.
 * 
 * Why: Social proof. Big numbers build trust with new visitors.
 * 
 * To extend: Fetch real stats from backend API.
 */

'use client';

import { motion } from 'framer-motion';
import { Users, BookOpen, Code2, Trophy } from 'lucide-react';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { STATS } from '@/lib/constants';

/* Map each stat to its icon */
const STAT_ICONS = [Users, BookOpen, Code2, Trophy];

export default function StatsSection() {
    return (
        <section className="section-padding relative" aria-label="Platform statistics">
            <div className="container-custom">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {STATS.map((stat, index) => {
                        const Icon = STAT_ICONS[index];
                        return (
                            <motion.div
                                key={stat.label}
                                className="text-center p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-200"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                            >
                                {/* Icon */}
                                <div className="w-12 h-12 rounded-xl bg-[#6366f1]/10 flex items-center justify-center mx-auto mb-4">
                                    <Icon className="w-6 h-6 text-[#a5b4fc]" />
                                </div>

                                {/* Count */}
                                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                                    <AnimatedCounter
                                        target={stat.value}
                                        suffix={stat.suffix}
                                        duration={2000}
                                    />
                                </div>

                                {/* Label */}
                                <p className="text-sm text-[#94a3b8] font-medium">{stat.label}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
