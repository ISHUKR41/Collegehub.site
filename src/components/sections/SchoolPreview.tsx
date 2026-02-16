/**
 * SchoolPreview.tsx — School section preview on landing page
 * 
 * Shows a preview of Class 9 & 10 with subject cards.
 * Each card has an icon, subject name, and chapter count.
 * Links to the full School page.
 * 
 * Why: Visitors need to see what's available before clicking through.
 * Showing real subjects builds credibility.
 * 
 * To extend: Fetch subjects dynamically from the backend API.
 */

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Calculator, Atom, BookText, Globe, Languages, Monitor } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

/* Map icon names to components */
const ICON_MAP: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
    Calculator, Atom, BookText, Globe, Languages, Monitor,
};

const SUBJECTS = [
    { name: 'Mathematics', icon: 'Calculator', chapters: 15, color: '#6366f1' },
    { name: 'Science', icon: 'Atom', chapters: 15, color: '#22c55e' },
    { name: 'English', icon: 'BookText', chapters: 12, color: '#f59e0b' },
    { name: 'Social Science', icon: 'Globe', chapters: 20, color: '#ef4444' },
    { name: 'Hindi', icon: 'Languages', chapters: 14, color: '#ec4899' },
    { name: 'Computer Science', icon: 'Monitor', chapters: 8, color: '#06b6d4' },
];

export default function SchoolPreview() {
    return (
        <section className="section-padding relative" id="school-preview" aria-label="School section preview">
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#6366f1]/[0.04] blur-[120px]" />

            <div className="container-custom relative z-10">
                <SectionHeading
                    label="School Section"
                    title="Class 9 & 10 CBSE"
                    subtitle="Complete subject-wise study material with chapter tests, performance analytics, and personalized study suggestions."
                />

                {/* Class tabs */}
                <div className="flex items-center justify-center gap-4 mb-10">
                    <div className="px-6 py-2.5 rounded-xl bg-[#6366f1]/10 border border-[#6366f1]/20 text-[#a5b4fc] text-sm font-semibold">
                        Class 9
                    </div>
                    <div className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/5 text-[#64748b] text-sm font-medium">
                        Class 10
                    </div>
                </div>

                {/* Subject cards grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-10">
                    {SUBJECTS.map((subject, index) => {
                        const Icon = ICON_MAP[subject.icon];
                        return (
                            <motion.div
                                key={subject.name}
                                className="group p-5 md:p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/10 transition-all duration-200 cursor-pointer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.06 }}
                            >
                                {/* Icon */}
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                                    style={{ backgroundColor: `${subject.color}15` }}
                                >
                                    {Icon && <Icon className="w-5 h-5" style={{ color: subject.color }} />}
                                </div>

                                {/* Subject name */}
                                <h3 className="text-base font-semibold text-white mb-1 group-hover:text-[#a5b4fc] transition-colors">
                                    {subject.name}
                                </h3>

                                {/* Chapter count */}
                                <p className="text-xs text-[#64748b]">{subject.chapters} Chapters</p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Link
                        href="/school"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-white text-sm font-medium hover:bg-white/5 hover:border-[#6366f1]/30 transition-all duration-200 group"
                    >
                        View All School Courses
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
