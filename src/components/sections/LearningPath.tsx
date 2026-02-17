/**
 * LearningPath.tsx — Visual learning journey timeline
 * 
 * Shows the step-by-step journey a student takes on CollegeHub:
 * 1. Choose your path (School or Coding)
 * 2. Start learning structured lessons
 * 3. Take tests and get scored
 * 4. Track progress and improve
 * 
 * Why: Helps visitors understand the platform flow at a glance.
 * The timeline visualization makes it intuitive.
 * 
 * To extend: Add more steps, make them clickable, or animate the path line.
 */

'use client';

import { motion } from 'framer-motion';
import { Compass, PlayCircle, ClipboardCheck, TrendingUp } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

const STEPS = [
    {
        icon: Compass,
        title: 'Choose Your Path',
        description: 'Pick from School (Class 9 & 10) or Coding (C++, Java, Python, Web Dev). Each path has a structured curriculum.',
        color: '#6366f1',
    },
    {
        icon: PlayCircle,
        title: 'Learn Step by Step',
        description: 'Follow chapter-wise lessons that unlock progressively. Build a solid foundation before advancing.',
        color: '#22c55e',
    },
    {
        icon: ClipboardCheck,
        title: 'Test Your Knowledge',
        description: 'Take chapter tests and practice problems. Get topic-wise scores to measure your understanding.',
        color: '#f59e0b',
    },
    {
        icon: TrendingUp,
        title: 'Track & Improve',
        description: 'View your analytics dashboard. Identify weak areas, get suggestions, and watch your progress grow.',
        color: '#ec4899',
    },
];

export default function LearningPath() {
    return (
        <section className="section-padding relative" id="learning-path" aria-label="Learning path">
            <div className="container-custom">
                <RevealOnScroll>
                    <SectionHeading
                        label="How It Works"
                        title="Your Learning Journey"
                        subtitle="From enrollment to mastery — here's how CollegeHub guides you every step of the way."
                    />
                </RevealOnScroll>

                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical timeline line (desktop only) */}
                    <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#6366f1]/30 via-[#22c55e]/30 to-[#ec4899]/30" />

                    <div className="space-y-12 md:space-y-0">
                        {STEPS.map((step, index) => {
                            const Icon = step.icon;
                            const isEven = index % 2 === 0;

                            return (
                                <motion.div
                                    key={step.title}
                                    className={`relative md:flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                                        }`}
                                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: '-50px' }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    {/* Content card */}
                                    <div className={`md:w-[calc(50%-2rem)] ${isEven ? 'md:pr-8' : 'md:pl-8'}`}>
                                        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-all duration-200">
                                            <div
                                                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                                                style={{ backgroundColor: `${step.color}15` }}
                                            >
                                                <Icon className="w-5 h-5" style={{ color: step.color }} />
                                            </div>
                                            <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                                            <p className="text-sm text-[#94a3b8] leading-relaxed">{step.description}</p>
                                        </div>
                                    </div>

                                    {/* Timeline dot (desktop) */}
                                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border-2 items-center justify-center bg-[#0a0a12]" style={{ borderColor: step.color }}>
                                        <span className="text-sm font-bold" style={{ color: step.color }}>
                                            {index + 1}
                                        </span>
                                    </div>

                                    {/* Spacer for opposite side */}
                                    <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
