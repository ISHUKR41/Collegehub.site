/**
 * CodingPreview.tsx — Coding section preview on landing page
 * 
 * Shows available programming languages with:
 * - Language cards with icons and descriptions
 * - A code snippet preview (dark terminal-style)
 * - Link to full coding page
 * 
 * Why: Coding learners want to see what languages are offered and
 * get a taste of the learning experience before signing up.
 * 
 * To extend: Add real code examples, or fetch from backend.
 */

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Code2, Coffee, Terminal, Globe } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

const LANGUAGES = [
    {
        name: 'C++',
        icon: Code2,
        color: '#00599C',
        description: 'Systems programming, OOP, STL, competitive coding',
        modules: 12,
    },
    {
        name: 'Java',
        icon: Coffee,
        color: '#ED8B00',
        description: 'Enterprise apps, collections, multithreading, Spring',
        modules: 14,
    },
    {
        name: 'Python',
        icon: Terminal,
        color: '#3776AB',
        description: 'Scripting, data science, ML, web scraping, APIs',
        modules: 10,
    },
    {
        name: 'Web Dev',
        icon: Globe,
        color: '#E44D26',
        description: 'HTML, CSS, JS, React, Node.js, full-stack projects',
        modules: 16,
    },
];

export default function CodingPreview() {
    return (
        <section className="section-padding relative" id="coding-preview" aria-label="Coding section preview">
            {/* Background glow */}
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#22c55e]/[0.04] blur-[120px]" />

            <div className="container-custom relative z-10">
                <SectionHeading
                    label="Coding Section"
                    title="Learn Programming"
                    subtitle="Structured coding courses from beginner to advanced. Practice problems, tests, and topic weakness analysis included."
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Language cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {LANGUAGES.map((lang, index) => {
                            const Icon = lang.icon;
                            return (
                                <motion.div
                                    key={lang.name}
                                    className="group p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/10 transition-all duration-200 cursor-pointer"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.08 }}
                                >
                                    <div className="flex items-start gap-3">
                                        <div
                                            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                            style={{ backgroundColor: `${lang.color}15` }}
                                        >
                                            <Icon className="w-5 h-5" style={{ color: lang.color }} />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-semibold text-white mb-1 group-hover:text-[#a5b4fc] transition-colors">
                                                {lang.name}
                                            </h3>
                                            <p className="text-xs text-[#94a3b8] mb-2 leading-relaxed">
                                                {lang.description}
                                            </p>
                                            <span className="text-xs text-[#64748b]">{lang.modules} Modules</span>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Code snippet preview */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="code-block">
                            {/* Terminal header */}
                            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/5">
                                <div className="w-3 h-3 rounded-full bg-[#ef4444]/60" />
                                <div className="w-3 h-3 rounded-full bg-[#f59e0b]/60" />
                                <div className="w-3 h-3 rounded-full bg-[#22c55e]/60" />
                                <span className="ml-2 text-xs text-[#64748b]">hello.cpp</span>
                            </div>

                            {/* Code lines */}
                            <div className="space-y-1">
                                <p><span className="code-keyword">#include</span> <span className="code-string">&lt;iostream&gt;</span></p>
                                <p><span className="code-keyword">using namespace</span> std;</p>
                                <p>&nbsp;</p>
                                <p><span className="code-type">int</span> <span className="code-function">main</span>() {'{'}</p>
                                <p>    <span className="code-comment">CollegeHub journey starts here</span></p>
                                <p>    cout &lt;&lt; <span className="code-string">&quot;Hello, CollegeHub!&quot;</span> &lt;&lt; endl;</p>
                                <p>    cout &lt;&lt; <span className="code-string">&quot;Let&apos;s learn C++ together.&quot;</span> &lt;&lt; endl;</p>
                                <p>&nbsp;</p>
                                <p>    <span className="code-keyword">return</span> <span className="code-number">0</span>;</p>
                                <p>{'}'}</p>
                            </div>

                            {/* Output section */}
                            <div className="mt-4 pt-4 border-t border-white/5">
                                <p className="text-xs text-[#64748b] mb-2">Output:</p>
                                <p className="text-[#22c55e] text-sm">Hello, CollegeHub!</p>
                                <p className="text-[#22c55e] text-sm">Let&apos;s learn C++ together.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* CTA */}
                <div className="text-center mt-10">
                    <Link
                        href="/coding"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-white text-sm font-medium hover:bg-white/5 hover:border-[#6366f1]/30 transition-all duration-200 group"
                    >
                        Explore All Languages
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
