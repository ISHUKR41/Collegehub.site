/**
 * CourseDetailContent.tsx — Client-side course detail content
 * 
 * Renders:
 * 1. Course hero banner
 * 2. Curriculum accordion
 * 3. Key features grid
 * 4. Instructor card
 * 5. Student reviews
 * 6. Enrollment CTA
 * 
 * Why separate client component:
 * Dynamic route page.tsx is a server component for metadata.
 * This client component handles all interactivity (accordion, etc).
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    ArrowRight, BookOpen, ChevronDown, Clock, Users, Star,
    CheckCircle, PlayCircle, Award, Target, BarChart3, Lock,
    GraduationCap, ArrowLeft
} from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import SectionHeading from '@/components/ui/SectionHeading';

/* Sample curriculum data — in production, fetch from backend */
const CURRICULUM = [
    {
        chapter: 'Getting Started',
        lessons: ['Introduction & Setup', 'Your First Program', 'Understanding the Basics', 'Practice Exercises'],
    },
    {
        chapter: 'Core Concepts',
        lessons: ['Variables & Data Types', 'Operators & Expressions', 'Control Flow (if-else)', 'Loops (for, while)'],
    },
    {
        chapter: 'Functions & Modularity',
        lessons: ['Defining Functions', 'Parameters & Return Values', 'Scope & Lifetime', 'Recursion Basics'],
    },
    {
        chapter: 'Data Structures',
        lessons: ['Arrays & Lists', 'Strings & Operations', 'Dictionaries/Maps', 'Sets & Tuples'],
    },
    {
        chapter: 'Object-Oriented Programming',
        lessons: ['Classes & Objects', 'Inheritance', 'Polymorphism', 'Encapsulation & Abstraction'],
    },
    {
        chapter: 'Advanced Topics',
        lessons: ['File Handling', 'Error Handling', 'Libraries & Packages', 'Final Project'],
    },
];

const REVIEWS = [
    { name: 'Arun M.', rating: 5, text: 'Excellent course! The step-by-step approach made complex topics easy.', date: '2 weeks ago' },
    { name: 'Priya K.', rating: 5, text: 'Best structured course I have found. The tests really help in understanding.', date: '1 month ago' },
    { name: 'Rohit S.', rating: 4, text: 'Very comprehensive. Would love more practice problems in advanced sections.', date: '1 month ago' },
];

interface CourseDetailContentProps {
    courseId: string;
}

export default function CourseDetailContent({ courseId }: CourseDetailContentProps) {
    const [openChapter, setOpenChapter] = useState<number>(0);
    const courseName = courseId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-mesh" />
                <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-[#6366f1]/[0.06] blur-[120px]" />

                <div className="container-custom relative z-10">
                    {/* Breadcrumb */}
                    <Link
                        href="/coding"
                        className="inline-flex items-center gap-2 text-sm text-[#64748b] hover:text-white transition-colors mb-6"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Courses
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                            {courseName}
                        </h1>
                        <p className="text-lg text-[#94a3b8] max-w-2xl mb-6">
                            Complete structured course from basics to advanced concepts.
                            Includes practice problems, chapter tests, and performance analytics.
                        </p>

                        {/* Course meta */}
                        <div className="flex flex-wrap items-center gap-6 text-sm text-[#94a3b8]">
                            <span className="flex items-center gap-2">
                                <BookOpen className="w-4 h-4 text-[#a5b4fc]" />
                                {CURRICULUM.length} Chapters
                            </span>
                            <span className="flex items-center gap-2">
                                <PlayCircle className="w-4 h-4 text-[#a5b4fc]" />
                                {CURRICULUM.reduce((acc, ch) => acc + ch.lessons.length, 0)} Lessons
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-[#a5b4fc]" />
                                6-8 weeks
                            </span>
                            <span className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-[#a5b4fc]" />
                                2,500+ Enrolled
                            </span>
                            <span className="flex items-center gap-2">
                                <Star className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
                                4.8/5 Rating
                            </span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Main Content Grid */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left column — Curriculum */}
                        <div className="lg:col-span-2">
                            <SectionHeading
                                title="Course Curriculum"
                                subtitle="Expand each chapter to see the lessons included."
                                align="left"
                            />

                            <div className="space-y-3">
                                {CURRICULUM.map((chapter, index) => (
                                    <motion.div
                                        key={index}
                                        className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden"
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        {/* Chapter header */}
                                        <button
                                            onClick={() => setOpenChapter(openChapter === index ? -1 : index)}
                                            className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="w-8 h-8 rounded-lg bg-[#6366f1]/10 flex items-center justify-center text-xs font-bold text-[#a5b4fc]">
                                                    {index + 1}
                                                </span>
                                                <div>
                                                    <p className="text-sm font-semibold text-white">{chapter.chapter}</p>
                                                    <p className="text-xs text-[#64748b]">{chapter.lessons.length} lessons</p>
                                                </div>
                                            </div>
                                            <ChevronDown
                                                className={`w-5 h-5 text-[#64748b] transition-transform duration-200 ${openChapter === index ? 'rotate-180 text-[#a5b4fc]' : ''
                                                    }`}
                                            />
                                        </button>

                                        {/* Expandable lesson list */}
                                        <AnimatePresence>
                                            {openChapter === index && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <div className="px-5 pb-5 border-t border-white/5">
                                                        <ul className="space-y-2 pt-4">
                                                            {chapter.lessons.map((lesson, li) => (
                                                                <li key={li} className="flex items-center gap-3 text-sm text-[#94a3b8]">
                                                                    {li === 0 ? (
                                                                        <CheckCircle className="w-4 h-4 text-[#22c55e] flex-shrink-0" />
                                                                    ) : (
                                                                        <Lock className="w-4 h-4 text-[#64748b] flex-shrink-0" />
                                                                    )}
                                                                    {lesson}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Right column — Sidebar */}
                        <div className="lg:col-span-1">
                            {/* Enrollment card */}
                            <div className="sticky top-24 space-y-6">
                                <GlassCard hover={false} className="!p-6">
                                    <h3 className="text-lg font-bold text-white mb-4">Start Learning</h3>
                                    <div className="space-y-3 mb-6">
                                        {[
                                            { icon: CheckCircle, text: 'Full curriculum access' },
                                            { icon: Target, text: 'Chapter tests included' },
                                            { icon: BarChart3, text: 'Performance analytics' },
                                            { icon: Lock, text: 'Progressive unlock system' },
                                            { icon: Award, text: 'Certificate on completion' },
                                        ].map((item) => {
                                            const Icon = item.icon;
                                            return (
                                                <div key={item.text} className="flex items-center gap-3 text-sm text-[#94a3b8]">
                                                    <Icon className="w-4 h-4 text-[#22c55e]" />
                                                    {item.text}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <button className="w-full py-3 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-semibold text-sm hover:shadow-[0_0_24px_rgba(99,102,241,0.4)] transition-all duration-200 flex items-center justify-center gap-2">
                                        <span>Enroll Now</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                    <p className="text-xs text-[#64748b] text-center mt-3">Free access • No credit card needed</p>
                                </GlassCard>

                                {/* Instructor card */}
                                <GlassCard hover={false} className="!p-6">
                                    <h3 className="text-sm font-semibold text-white mb-4">Instructor</h3>
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white font-bold">
                                            IK
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-white">Ishu Kumar</p>
                                            <p className="text-xs text-[#64748b]">Full-Stack Developer</p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-[#94a3b8] mt-3">
                                        Passionate about teaching coding to students with clear, structured content.
                                    </p>
                                </GlassCard>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Reviews Section */}
            <section className="section-padding">
                <div className="container-custom">
                    <SectionHeading
                        title="Student Reviews"
                        subtitle="What students who completed this course have to say."
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {REVIEWS.map((review, index) => (
                            <GlassCard key={index} delay={index * 0.08}>
                                <div className="flex items-center gap-1 mb-3">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${i < review.rating ? 'fill-[#f59e0b] text-[#f59e0b]' : 'text-[#64748b]'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <p className="text-sm text-[#94a3b8] mb-4">&ldquo;{review.text}&rdquo;</p>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-semibold text-white">{review.name}</p>
                                    <p className="text-xs text-[#64748b]">{review.date}</p>
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
