/**
 * CodingPageContent.tsx — Client-side coding section content
 *
 * Sections:
 * 1. Hero banner for coding
 * 2. Language cards (C++, Java, Python, Web Dev)
 * 3. Live catalog (API-driven)
 * 4. Skill levels breakdown
 * 5. Language comparison table
 * 6. Code preview terminal
 * 7. Learning roadmap
 * 8. CTA
 *
 * To extend: Add interview-prep section, coding challenges, or
 * certificate-track cards below the roadmap.
 */

'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import {
    Code2, Coffee, Terminal, Globe, ArrowRight, Zap,
    Layers, Rocket
} from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import { CODING_LANGUAGES } from '@/lib/constants';
import { fetchPublicCourses } from '@/services/course-service';

/* Icon mapping */
const ICON_MAP: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
    Code2, Coffee, Terminal, Globe,
};

/* Skill level data */
const SKILL_LEVELS = [
    {
        level: 'Beginner',
        icon: Zap,
        color: '#22c55e',
        description: 'Start from zero. Learn syntax, basic concepts, and write your first programs.',
        duration: '4-6 weeks',
    },
    {
        level: 'Intermediate',
        icon: Layers,
        color: '#f59e0b',
        description: 'Dive into OOP, data structures, file handling, and problem solving.',
        duration: '6-8 weeks',
    },
    {
        level: 'Advanced',
        icon: Rocket,
        color: '#ef4444',
        description: 'Master frameworks, design patterns, competitive coding, and real projects.',
        duration: '8-12 weeks',
    },
];

/* Comparison table data */
const COMPARISON = [
    { feature: 'Difficulty', c: 'Medium', cpp: 'Medium-Hard', java: 'Medium', python: 'Easy', webdev: 'Easy-Medium' },
    { feature: 'Job Demand', c: 'High', cpp: 'High', java: 'Very High', python: 'Very High', webdev: 'Very High' },
    { feature: 'Use Cases', c: 'Systems, Embedded', cpp: 'Systems, Games', java: 'Enterprise, Android', python: 'AI/ML, Scripting', webdev: 'Websites, Apps' },
    { feature: 'Learning Curve', c: 'Moderate', cpp: 'Steep', java: 'Moderate', python: 'Gentle', webdev: 'Moderate' },
    { feature: 'Modules', c: '40', cpp: '12', java: '14', python: '10', webdev: '16' },
];

/* Roadmap steps */
const ROADMAP = [
    { step: 1, title: 'Pick a Language', description: 'Choose based on your interest — systems, web, data, or enterprise.' },
    { step: 2, title: 'Master Basics', description: 'Variables, loops, functions, conditionals. Build small programs.' },
    { step: 3, title: 'Learn OOP', description: 'Classes, objects, inheritance, polymorphism. Think in objects.' },
    { step: 4, title: 'Data Structures', description: 'Arrays, linked lists, trees, graphs. Solve problems efficiently.' },
    { step: 5, title: 'Build Projects', description: 'Apply everything in real projects. Build your portfolio.' },
    { step: 6, title: 'Specialize', description: 'Choose a domain: web dev, AI/ML, competitive coding, or systems.' },
];

export default function CodingPageContent() {
    const { data: codingCourses = [], isLoading: isCoursesLoading } = useQuery({
        queryKey: ['courses', 'coding', 'catalog'],
        queryFn: () => fetchPublicCourses({ category: 'coding' }),
    });

    const courseBySubCategory = useMemo(() => {
        return codingCourses.reduce<Record<string, (typeof codingCourses)[number]>>((acc, course) => {
            acc[course.subCategory] = course;
            return acc;
        }, {});
    }, [codingCourses]);

    const resolveCourseHref = (slug: string) => {
        if (slug === 'c') return '/coding/c-language';
        const key = slug === 'webdev' ? 'webdev' : slug;
        const liveCourse = courseBySubCategory[key];
        return liveCourse ? `/courses/${liveCourse.id}` : `/courses/${slug}`;
    };

    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-mesh" />
                <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#22c55e]/[0.05] blur-[120px]" />

                <div className="container-custom relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                            <Code2 className="w-4 h-4 text-[#22c55e]" />
                            <span className="text-sm text-[#22c55e] font-medium">Programming Courses</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                            <span className="text-gradient">Learn to Code</span>
                        </h1>
                        <p className="text-lg text-[#94a3b8] max-w-2xl mx-auto">
                            Structured courses in C, C++, Java, Python, and Web Development.
                            From first line of code to building real-world projects.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Language Cards */}
            <section className="section-padding" id="languages">
                <div className="container-custom">
                    <RevealOnScroll>
                        <SectionHeading
                            label="Languages"
                            title="Choose Your Language"
                            subtitle="Each course includes structured lessons, practice problems, tests, and performance analytics."
                        />
                    </RevealOnScroll>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {CODING_LANGUAGES.map((lang, index) => {
                            const Icon = ICON_MAP[lang.icon];
                            const liveCourse = courseBySubCategory[lang.slug];
                            return (
                                <GlassCard key={lang.slug} delay={index * 0.08} className="!p-8">
                                    <div className="flex items-start gap-4 mb-5">
                                        <div
                                            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                                            style={{ backgroundColor: `${lang.color}15` }}
                                        >
                                            {Icon && <Icon className="w-7 h-7" style={{ color: lang.color }} />}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-1">{lang.name}</h3>
                                            <p className="text-xs text-[#64748b]">{lang.level} • {lang.modules} Modules</p>
                                        </div>
                                    </div>

                                    <p className="text-sm text-[#94a3b8] mb-5 leading-relaxed">{lang.description}</p>

                                    {/* Topic tags */}
                                    <div className="flex flex-wrap gap-2 mb-5">
                                        {lang.topics.map((topic) => (
                                            <span
                                                key={topic}
                                                className="px-3 py-1 rounded-lg text-xs bg-white/5 border border-white/5 text-[#94a3b8]"
                                            >
                                                {topic}
                                            </span>
                                        ))}
                                    </div>

                                    <Link
                                        href={resolveCourseHref(lang.slug)}
                                        className="inline-flex items-center gap-2 text-sm font-medium text-[#a5b4fc] hover:text-white transition-colors group"
                                    >
                                        {liveCourse ? 'Open Live Course' : 'Start Learning'}
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </GlassCard>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Live Catalog */}
            <section className="section-padding pt-0">
                <div className="container-custom">
                    <RevealOnScroll>
                        <SectionHeading
                            label="Live Catalog"
                            title="Published Coding Tracks"
                            subtitle="These courses are fetched from backend and linked to real dynamic course detail routes."
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

                    {!isCoursesLoading && codingCourses.length === 0 && (
                        <GlassCard className="!p-6" hover={false}>
                            <p className="text-sm text-[#94a3b8]">
                                No published coding course found yet. Publish courses from admin panel
                                to make them visible on this page.
                            </p>
                        </GlassCard>
                    )}

                    {!isCoursesLoading && codingCourses.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {codingCourses.map((course, index) => (
                                <GlassCard key={course.id} delay={index * 0.06}>
                                    <div className="flex items-start justify-between gap-4 mb-3">
                                        <h3 className="text-lg font-semibold text-white">{course.title}</h3>
                                        <span className="text-[11px] px-2 py-1 rounded-full bg-[#22c55e]/15 text-[#22c55e] uppercase tracking-wide">
                                            Published
                                        </span>
                                    </div>
                                    <p className="text-sm text-[#94a3b8] line-clamp-2 mb-4">
                                        {course.description || 'Coding path with lessons, practice, test evaluation, and weakness analytics.'}
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
            </section>

            {/* Skill Levels */}
            <section className="section-padding" id="skill-levels">
                <div className="container-custom">
                    <RevealOnScroll>
                        <SectionHeading
                            label="Skill Levels"
                            title="From Beginner to Expert"
                            subtitle="Every course is structured in three progressive stages."
                        />
                    </RevealOnScroll>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {SKILL_LEVELS.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <GlassCard key={item.level} delay={index * 0.1}>
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                                        style={{ backgroundColor: `${item.color}15` }}
                                    >
                                        <Icon className="w-6 h-6" style={{ color: item.color }} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">{item.level}</h3>
                                    <p className="text-sm text-[#94a3b8] mb-3">{item.description}</p>
                                    <span className="text-xs text-[#64748b]">Duration: {item.duration}</span>
                                </GlassCard>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="section-padding" id="comparison">
                <div className="container-custom">
                    <RevealOnScroll>
                        <SectionHeading
                            label="Compare"
                            title="Language Comparison"
                            subtitle="Choose the right language based on your goals."
                        />
                    </RevealOnScroll>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[600px] text-left">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="py-4 px-4 text-sm font-semibold text-white">Feature</th>
                                    <th className="py-4 px-4 text-sm font-semibold text-[#A8B9CC]">C</th>
                                    <th className="py-4 px-4 text-sm font-semibold text-[#00599C]">C++</th>
                                    <th className="py-4 px-4 text-sm font-semibold text-[#ED8B00]">Java</th>
                                    <th className="py-4 px-4 text-sm font-semibold text-[#3776AB]">Python</th>
                                    <th className="py-4 px-4 text-sm font-semibold text-[#E44D26]">Web Dev</th>
                                </tr>
                            </thead>
                            <tbody>
                                {COMPARISON.map((row, index) => (
                                    <motion.tr
                                        key={row.feature}
                                        className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <td className="py-4 px-4 text-sm font-medium text-white">{row.feature}</td>
                                        <td className="py-4 px-4 text-sm text-[#94a3b8]">{row.c}</td>
                                        <td className="py-4 px-4 text-sm text-[#94a3b8]">{row.cpp}</td>
                                        <td className="py-4 px-4 text-sm text-[#94a3b8]">{row.java}</td>
                                        <td className="py-4 px-4 text-sm text-[#94a3b8]">{row.python}</td>
                                        <td className="py-4 px-4 text-sm text-[#94a3b8]">{row.webdev}</td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Code Preview */}
            <section className="section-padding">
                <div className="container-custom">
                    <RevealOnScroll>
                        <SectionHeading
                            label="Preview"
                            title="See What You'll Build"
                            subtitle="Here's a taste of what your code will look like after the first few lessons."
                        />
                    </RevealOnScroll>

                    <div className="max-w-2xl mx-auto">
                        <div className="code-block">
                            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/5">
                                <div className="w-3 h-3 rounded-full bg-[#ef4444]/60" />
                                <div className="w-3 h-3 rounded-full bg-[#f59e0b]/60" />
                                <div className="w-3 h-3 rounded-full bg-[#22c55e]/60" />
                                <span className="ml-2 text-xs text-[#64748b]">fibonacci.py</span>
                            </div>
                            <div className="space-y-1">
                                <p><span className="code-keyword">def</span> <span className="code-function">fibonacci</span>(n):</p>
                                <p>    <span className="code-comment">&quot;&quot;&quot;Generate Fibonacci sequence up to n terms&quot;&quot;&quot;</span></p>
                                <p>    sequence = []</p>
                                <p>    a, b = <span className="code-number">0</span>, <span className="code-number">1</span></p>
                                <p>    <span className="code-keyword">for</span> _ <span className="code-keyword">in</span> <span className="code-function">range</span>(n):</p>
                                <p>        sequence.<span className="code-function">append</span>(a)</p>
                                <p>        a, b = b, a + b</p>
                                <p>    <span className="code-keyword">return</span> sequence</p>
                                <p>&nbsp;</p>
                                <p><span className="code-comment"># Print first 10 Fibonacci numbers</span></p>
                                <p><span className="code-function">print</span>(<span className="code-function">fibonacci</span>(<span className="code-number">10</span>))</p>
                            </div>
                            <div className="mt-4 pt-4 border-t border-white/5">
                                <p className="text-xs text-[#64748b] mb-2">Output:</p>
                                <p className="text-[#22c55e] text-sm">[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Learning Roadmap */}
            <section className="section-padding" id="roadmap">
                <div className="container-custom">
                    <RevealOnScroll>
                        <SectionHeading
                            label="Roadmap"
                            title="Your Coding Journey"
                            subtitle="A proven 6-step path from complete beginner to confident developer."
                        />
                    </RevealOnScroll>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {ROADMAP.map((item, index) => (
                            <GlassCard key={item.step} delay={index * 0.08}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white font-bold text-sm">
                                        {item.step}
                                    </div>
                                    <h3 className="text-base font-semibold text-white">{item.title}</h3>
                                </div>
                                <p className="text-sm text-[#94a3b8]">{item.description}</p>
                            </GlassCard>
                        ))}
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
                            Start Your Coding Journey Today
                        </h2>
                        <p className="text-[#94a3b8] mb-8 max-w-lg mx-auto">
                            Choose your language, follow the roadmap, and build real skills. No prerequisites needed.
                        </p>
                        <div className="flex items-center justify-center gap-4 flex-wrap">
                            {CODING_LANGUAGES.map((lang) => (
                                <Link
                                    key={lang.slug}
                                    href={resolveCourseHref(lang.slug)}
                                    className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 hover:border-[#6366f1]/30 transition-all duration-200"
                                >
                                    Learn {lang.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
