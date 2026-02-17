/**
 * Testimonials.tsx — Student reviews carousel
 * 
 * Shows testimonials from students with:
 * - Avatar initials
 * - Star ratings
 * - Review text
 * - Auto-scrolling horizontal layout
 * 
 * Why: Social proof. Real student reviews build trust
 * and help visitors make a decision.
 * 
 * To extend: Fetch testimonials from the backend. Add video testimonials.
 */

'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import { TESTIMONIALS } from '@/lib/constants';

export default function Testimonials() {
    return (
        <section className="section-padding relative" id="testimonials" aria-label="Student testimonials">
            <div className="container-custom">
                <RevealOnScroll>
                    <SectionHeading
                        label="Testimonials"
                        title="What Students Say"
                        subtitle="Real feedback from real students who've transformed their learning with CollegeHub."
                    />
                </RevealOnScroll>

                {/* Testimonial cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {TESTIMONIALS.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.name}
                            className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/10 transition-all duration-200"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.08 }}
                        >
                            {/* Star rating */}
                            <div className="flex items-center gap-1 mb-4">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < testimonial.rating
                                                ? 'fill-[#f59e0b] text-[#f59e0b]'
                                                : 'text-[#64748b]'
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Review text */}
                            <p className="text-sm text-[#94a3b8] leading-relaxed mb-5">
                                &ldquo;{testimonial.content}&rdquo;
                            </p>

                            {/* Author info */}
                            <div className="flex items-center gap-3">
                                {/* Avatar with initials */}
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white text-xs font-bold">
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                                    <p className="text-xs text-[#64748b]">{testimonial.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
