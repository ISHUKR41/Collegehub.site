/**
 * AboutPageContent.tsx — Client-side About page content
 * 
 * Sections:
 * 1. Hero banner
 * 2. Mission & Vision cards
 * 3. Company timeline
 * 4. Team members grid
 * 5. Achievements stats
 */

'use client';

import { motion } from 'framer-motion';
import { Target, Eye, Heart, Rocket, Users, BookOpen, Award, Zap } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { TEAM_MEMBERS } from '@/lib/constants';

/* Timeline milestones */
const TIMELINE = [
    { year: '2024', title: 'The Idea', description: 'Identified the gap in structured online education for Indian students.' },
    { year: '2024', title: 'Platform Built', description: 'Designed and developed the full-stack learning platform from scratch.' },
    { year: '2025', title: 'Beta Launch', description: 'Launched with Class 9-10 CBSE and 4 coding languages. First 500 students.' },
    { year: '2025', title: 'Analytics Engine', description: 'Added topic-wise weakness detection and personalized study suggestions.' },
    { year: '2025', title: 'Growing Fast', description: 'Scaling to 10,000+ students, adding more languages and live class features.' },
];

/* Achievement stats */
const ACHIEVEMENTS = [
    { value: 10000, suffix: '+', label: 'Students Enrolled', icon: Users },
    { value: 50, suffix: '+', label: 'Courses Available', icon: BookOpen },
    { value: 95, suffix: '%', label: 'Student Satisfaction', icon: Award },
    { value: 24, suffix: '/7', label: 'Platform Access', icon: Zap },
];

export default function AboutPageContent() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-mesh" />
                <div className="absolute top-1/4 right-1/3 w-[400px] h-[400px] rounded-full bg-[#8b5cf6]/[0.06] blur-[120px]" />

                <div className="container-custom relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                            <Heart className="w-4 h-4 text-[#ec4899]" />
                            <span className="text-sm text-[#ec4899] font-medium">Our Story</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                            <span className="text-gradient">About CollegeHub</span>
                        </h1>
                        <p className="text-lg text-[#94a3b8] max-w-2xl mx-auto">
                            We&apos;re on a mission to make quality education accessible to every
                            student in India — from school to professional development.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <GlassCard className="!p-8" delay={0}>
                            <div className="w-12 h-12 rounded-xl bg-[#6366f1]/10 flex items-center justify-center mb-5">
                                <Target className="w-6 h-6 text-[#a5b4fc]" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-3">Our Mission</h2>
                            <p className="text-[#94a3b8] leading-relaxed">
                                To democratize education by providing structured, analytics-driven
                                learning paths that help students master school subjects and coding
                                skills. We believe every student deserves access to the same quality
                                of education, regardless of their location or background.
                            </p>
                        </GlassCard>

                        <GlassCard className="!p-8" delay={0.1}>
                            <div className="w-12 h-12 rounded-xl bg-[#22c55e]/10 flex items-center justify-center mb-5">
                                <Eye className="w-6 h-6 text-[#22c55e]" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-3">Our Vision</h2>
                            <p className="text-[#94a3b8] leading-relaxed">
                                To become India&apos;s most trusted learning intelligence platform —
                                where students don&apos;t just learn, but understand their strengths
                                and weaknesses through data-driven analytics. We envision a future
                                where learning is personalized, progressive, and measurable.
                            </p>
                        </GlassCard>
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="section-padding">
                <div className="container-custom">
                    <SectionHeading
                        label="Journey"
                        title="Our Timeline"
                        subtitle="From an idea to a growing platform — here's how CollegeHub evolved."
                    />

                    <div className="max-w-3xl mx-auto relative">
                        {/* Vertical line */}
                        <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-white/10" />

                        <div className="space-y-8">
                            {TIMELINE.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className={`relative flex items-start gap-6 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                        }`}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    {/* Dot on timeline */}
                                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#6366f1] border-2 border-[#0a0a12] z-10 mt-2" />

                                    {/* Content */}
                                    <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                                        <span className="text-xs font-bold text-[#a5b4fc] tracking-wider">{item.year}</span>
                                        <h3 className="text-base font-semibold text-white mt-1 mb-2">{item.title}</h3>
                                        <p className="text-sm text-[#94a3b8]">{item.description}</p>
                                    </div>

                                    {/* Spacer */}
                                    <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="section-padding">
                <div className="container-custom">
                    <SectionHeading
                        label="Team"
                        title="Meet the People Behind CollegeHub"
                        subtitle="A passionate team dedicated to transforming education."
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {TEAM_MEMBERS.map((member, index) => (
                            <GlassCard key={member.name} delay={index * 0.08} className="text-center !p-6">
                                {/* Avatar */}
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white text-lg font-bold mx-auto mb-4">
                                    {member.avatar}
                                </div>
                                <h3 className="text-base font-semibold text-white mb-1">{member.name}</h3>
                                <p className="text-xs text-[#a5b4fc] font-medium mb-3">{member.role}</p>
                                <p className="text-xs text-[#94a3b8]">{member.bio}</p>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* Achievements */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {ACHIEVEMENTS.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={item.label}
                                    className="text-center p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05]"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Icon className="w-8 h-8 text-[#a5b4fc] mx-auto mb-3" />
                                    <div className="text-3xl font-bold text-white mb-1">
                                        <AnimatedCounter target={item.value} suffix={item.suffix} />
                                    </div>
                                    <p className="text-sm text-[#94a3b8]">{item.label}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}
