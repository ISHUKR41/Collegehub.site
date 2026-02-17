/**
 * SchoolPageContent.tsx — Client-side school section content
 *
 * Separated from page.tsx so we can use 'use client' for interactivity
 * while keeping the metadata export in a server component.
 *
 * Sections:
 * 1. Hero banner
 * 2. Class tabs (9 & 10)
 * 3. Subject cards grid
 * 4. Live course catalog (API-driven)
 * 5. Exam pattern info
 * 6. Study tips
 * 7. CTA
 *
 * To extend: Add more class options, extra study-material sections,
 * or past-paper download links in new sections below the CTA.
 */

'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import {
    GraduationCap, BookOpen, Calculator, Atom, BookText, Globe, Languages,
    Monitor, ArrowRight, Target, Clock, CheckCircle, Lightbulb, Calendar,
    TrendingUp, FileText, Award
} from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import { SCHOOL_SUBJECTS } from '@/lib/constants';
import { fetchPublicCourses } from '@/services/course-service';

/* Map icon names to Lucide components */
const ICON_MAP: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
    Calculator, Atom, BookText, Globe, Languages, Monitor,
};

/* Exam pattern data */
const EXAM_PATTERN = [
    { type: 'MCQ Questions', marks: '20 Marks', icon: Target, description: 'Multiple choice based on key concepts' },
    { type: 'Short Answer', marks: '30 Marks', icon: FileText, description: 'Concept application in 2-3 lines' },
    { type: 'Long Answer', marks: '30 Marks', icon: BookOpen, description: 'Detailed answers with diagrams' },
    { type: 'Case Study', marks: '20 Marks', icon: Lightbulb, description: 'Real-world problem solving' },
];

/* Study tips data */
const STUDY_TIPS = [
    { icon: Clock, title: 'Consistent Schedule', tip: 'Study 2-3 hours daily at fixed times. Consistency beats intensity.' },
    { icon: Target, title: 'Active Recall', tip: 'Test yourself after each chapter instead of passive re-reading.' },
    { icon: Calendar, title: 'Spaced Repetition', tip: 'Review topics at increasing intervals: 1 day, 3 days, 7 days, 30 days.' },
    { icon: CheckCircle, title: 'Practice Papers', tip: 'Solve previous year papers to understand exam pattern and time management.' },
    { icon: TrendingUp, title: 'Track Progress', tip: 'Use CollegeHub analytics to identify weak areas and focus on them.' },
    { icon: Award, title: 'Reward Yourself', tip: 'Set milestones and reward yourself after achieving them.' },
];

export default function SchoolPageContent() {
    /* Track which class tab is active */
    const [activeClass, setActiveClass] = useState<'class9' | 'class10'>('class9');
    const subjects = SCHOOL_SUBJECTS[activeClass];
    const { data: schoolCourses = [], isLoading: isCoursesLoading } = useQuery({
        queryKey: ['courses', 'school', 'catalog'],
        queryFn: () => fetchPublicCourses({ category: 'school' }),
    });

    const classCourses = useMemo(
        () => schoolCourses.filter((course) => course.subCategory === activeClass),
        [activeClass, schoolCourses]
    );
    const primaryClassCourseId = classCourses[0]?.id || null;

    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-mesh" />
                <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-[#6366f1]/[0.06] blur-[120px]" />

                <div className="container-custom relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                            <GraduationCap className="w-4 h-4 text-[#a5b4fc]" />
                            <span className="text-sm text-[#a5b4fc] font-medium">CBSE Curriculum</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                            <span className="text-gradient">School Section</span>
                        </h1>
                        <p className="text-lg text-[#94a3b8] max-w-2xl mx-auto">
                            Complete Class 9 &amp; 10 CBSE study material. Chapter-wise lessons,
                            practice tests, and AI-powered performance analytics.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Class Tabs + Subjects */}
            <section className="section-padding" id="subjects">
                <div className="container-custom">
                    <RevealOnScroll>
                        <SectionHeading
                            label="Subjects"
                            title="Choose Your Class"
                            subtitle="Select your class to see all available subjects with their chapter breakdowns."
                        />
                    </RevealOnScroll>

                    {/* Class tabs */}
                    <div className="flex items-center justify-center gap-4 mb-10">
                        {(['class9', 'class10'] as const).map((cls) => (
                            <button
                                key={cls}
                                onClick={() => setActiveClass(cls)}
                                className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${activeClass === cls
                                        ? 'bg-[#6366f1]/10 border border-[#6366f1]/30 text-[#a5b4fc] shadow-[0_0_15px_rgba(99,102,241,0.15)]'
                                        : 'bg-white/5 border border-white/5 text-[#64748b] hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                {cls === 'class9' ? 'Class 9' : 'Class 10'}
                            </button>
                        ))}
                    </div>

                    {/* Subject cards grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {subjects.map((subject, index) => {
                            const Icon = ICON_MAP[subject.icon];
                            return (
                                <GlassCard key={subject.name} delay={index * 0.06}>
                                    <div className="flex items-start gap-4">
                                        <div
                                            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                                            style={{ backgroundColor: `${subject.color}15` }}
                                        >
                                            {Icon && <Icon className="w-6 h-6" style={{ color: subject.color }} />}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-white mb-1">{subject.name}</h3>
                                            <p className="text-sm text-[#64748b] mb-3">{subject.chapters} Chapters</p>
                                            <div className="flex items-center gap-4 text-xs text-[#94a3b8]">
                                                <span className="flex items-center gap-1">
                                                    <BookOpen className="w-3 h-3" /> Lessons
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Target className="w-3 h-3" /> Tests
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <TrendingUp className="w-3 h-3" /> Analytics
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <Link
                                        href={primaryClassCourseId
                                            ? `/courses/${primaryClassCourseId}`
                                            : `/courses/${activeClass}-${subject.name.toLowerCase().replace(/\s+/g, '-')}`
                                        }
                                        className="mt-4 inline-flex items-center gap-1 text-xs text-[#a5b4fc] hover:text-white transition-colors group"
                                    >
                                        Start Learning
                                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </GlassCard>
                            );
                        })}
                    </div>

                    <div className="mt-12">
                        <RevealOnScroll>
                            <SectionHeading
                                label="Live Courses"
                                title={`Published ${activeClass === 'class9' ? 'Class 9' : 'Class 10'} Course Catalog`}
                                subtitle="These cards are fetched from the backend API and map directly to real course detail pages."
                            />
                        </RevealOnScroll>

                        {isCoursesLoading && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {Array.from({ length: 2 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="h-40 rounded-2xl bg-white/[0.04] border border-white/[0.06] animate-pulse"
                                    />
                                ))}
                            </div>
                        )}

                        {!isCoursesLoading && classCourses.length === 0 && (
                            <GlassCard className="!p-6" hover={false}>
                                <p className="text-sm text-[#94a3b8]">
                                    No published courses found for this class yet. Create and publish
                                    courses from the admin panel to show them here.
                                </p>
                            </GlassCard>
                        )}

                        {!isCoursesLoading && classCourses.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {classCourses.map((course, index) => (
                                    <GlassCard key={course.id} delay={index * 0.06}>
                                        <div className="flex items-start justify-between gap-4 mb-3">
                                            <h3 className="text-lg font-semibold text-white">{course.title}</h3>
                                            <span className="text-[11px] px-2 py-1 rounded-full bg-[#6366f1]/15 text-[#a5b4fc] uppercase tracking-wide">
                                                Live
                                            </span>
                                        </div>
                                        <p className="text-sm text-[#94a3b8] line-clamp-2 mb-4">
                                            {course.description || 'Structured school curriculum with chapter-level lessons and tests.'}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-[#64748b]">
                                                {course.totalLessons} lessons
                                            </span>
                                            <Link
                                                href={`/courses/${course.id}`}
                                                className="inline-flex items-center gap-2 text-sm text-[#a5b4fc] hover:text-white transition-colors"
                                            >
                                                View Course
                                                <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </GlassCard>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Exam Pattern Section */}
            <section className="section-padding" id="exam-pattern">
                <div className="container-custom">
                    <RevealOnScroll>
                        <SectionHeading
                            label="Exam Pattern"
                            title="CBSE Board Exam Format"
                            subtitle="Understand the marking scheme and question types to prepare strategically."
                        />
                    </RevealOnScroll>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {EXAM_PATTERN.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <GlassCard key={item.type} delay={index * 0.08}>
                                    <Icon className="w-8 h-8 text-[#a5b4fc] mb-4" />
                                    <h3 className="text-base font-semibold text-white mb-1">{item.type}</h3>
                                    <p className="text-xl font-bold text-gradient mb-2">{item.marks}</p>
                                    <p className="text-xs text-[#94a3b8]">{item.description}</p>
                                </GlassCard>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Study Tips Section */}
            <section className="section-padding" id="tips">
                <div className="container-custom">
                    <RevealOnScroll>
                        <SectionHeading
                            label="Study Tips"
                            title="Study Smarter, Not Harder"
                            subtitle="Science-backed techniques to maximize your learning efficiency."
                        />
                    </RevealOnScroll>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {STUDY_TIPS.map((tip, index) => {
                            const Icon = tip.icon;
                            return (
                                <GlassCard key={tip.title} delay={index * 0.06}>
                                    <div className="w-10 h-10 rounded-xl bg-[#22c55e]/10 flex items-center justify-center mb-4">
                                        <Icon className="w-5 h-5 text-[#22c55e]" />
                                    </div>
                                    <h3 className="text-base font-semibold text-white mb-2">{tip.title}</h3>
                                    <p className="text-sm text-[#94a3b8]">{tip.tip}</p>
                                </GlassCard>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding">
                <div className="container-custom text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Ready to ace your exams?
                        </h2>
                        <p className="text-[#94a3b8] mb-8 max-w-lg mx-auto">
                            Start learning today with structured lessons, chapter tests, and personalized analytics.
                        </p>
                        <Link
                            href="/coding"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-semibold hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all duration-200 hover:-translate-y-1"
                        >
                            <span>Start Learning Now</span>
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
