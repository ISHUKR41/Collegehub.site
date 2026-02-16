/**
 * Hero.tsx — Landing page hero section
 * 
 * The first thing visitors see. Features:
 * - Animated gradient mesh background
 * - Particle canvas overlay
 * - Main headline with staggered text reveal
 * - Subheadline
 * - Two CTA buttons (School & Coding)
 * - Floating decorative elements
 * 
 * Why: First impressions matter. This section must WOW the visitor
 * within 3 seconds. Uses gradient animation and particles for premium feel.
 * 
 * To extend: Add a video background option or typing animation.
 */

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, BookOpen, Code2, Sparkles } from 'lucide-react';
import ParticleBackground from '@/components/ui/ParticleBackground';

export default function Hero() {
    return (
        <section
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            aria-label="Hero section"
        >
            {/* Background layers */}
            <div className="absolute inset-0">
                {/* Gradient mesh background */}
                <div className="absolute inset-0 bg-mesh" />

                {/* Animated gradient orbs */}
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#6366f1]/[0.07] blur-[120px] animate-gradient" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#8b5cf6]/[0.05] blur-[100px] animate-gradient" style={{ animationDelay: '2s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#22c55e]/[0.03] blur-[140px]" />

                {/* Particle canvas */}
                <ParticleBackground />

                {/* Grid pattern overlay */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px',
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 container-custom text-center px-4">
                {/* Badge */}
                <motion.div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Sparkles className="w-4 h-4 text-[#a5b4fc]" />
                    <span className="text-sm text-[#a5b4fc] font-medium">
                        India&apos;s Smart Learning Platform
                    </span>
                </motion.div>

                {/* Main headline */}
                <motion.h1
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <span className="text-white">Master </span>
                    <span className="text-gradient">School Subjects</span>
                    <br />
                    <span className="text-white">& </span>
                    <span className="text-gradient">Coding Skills</span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    className="text-lg md:text-xl text-[#94a3b8] max-w-2xl mx-auto mb-10 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    Structured learning paths for Class 9–10 CBSE and programming languages.
                    Track your progress, identify weak areas, and learn at your own pace.
                </motion.p>

                {/* CTA buttons */}
                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <Link
                        href="/school"
                        className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-semibold text-base hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all duration-300 hover:-translate-y-1"
                    >
                        <BookOpen className="w-5 h-5" />
                        <span>Explore School</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                        href="/coding"
                        className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-semibold text-base hover:bg-white/10 hover:border-[#6366f1]/30 transition-all duration-300 hover:-translate-y-1"
                    >
                        <Code2 className="w-5 h-5 text-[#a5b4fc]" />
                        <span>Start Coding</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

                {/* Trust indicators */}
                <motion.div
                    className="mt-16 flex items-center justify-center gap-8 flex-wrap"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    {[
                        { icon: '🎓', text: '10,000+ Students' },
                        { icon: '📚', text: '50+ Courses' },
                        { icon: '⭐', text: '4.9/5 Rating' },
                    ].map((item) => (
                        <div key={item.text} className="flex items-center gap-2 text-sm text-[#64748b]">
                            <span className="text-base">{item.icon}</span>
                            <span>{item.text}</span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a12] to-transparent" />
        </section>
    );
}
