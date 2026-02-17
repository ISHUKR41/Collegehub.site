/**
 * FAQ.tsx — Frequently asked questions accordion
 * 
 * Expandable FAQ section with smooth animation.
 * Uses useState to track which question is open.
 * Only one question can be open at a time (accordion pattern).
 * 
 * Why: Reduces customer support queries. Answers common questions
 * before visitors need to contact us.
 * 
 * To extend: Fetch FAQs from CMS or backend. Add search/filter.
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import { FAQ_ITEMS } from '@/lib/constants';

export default function FAQ() {
    /* Track which FAQ item is currently open (-1 = none) */
    const [openIndex, setOpenIndex] = useState<number>(-1);

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <section className="section-padding relative" id="faq" aria-label="Frequently asked questions">
            <div className="container-custom">
                <RevealOnScroll>
                    <SectionHeading
                        label="FAQ"
                        title="Frequently Asked Questions"
                        subtitle="Got questions? We've got answers. If you still need help, reach out through our contact page."
                    />
                </RevealOnScroll>

                <div className="max-w-3xl mx-auto space-y-3">
                    {FAQ_ITEMS.map((item, index) => (
                        <motion.div
                            key={index}
                            className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                            {/* Question (always visible) */}
                            <button
                                onClick={() => toggleItem(index)}
                                className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
                                aria-expanded={openIndex === index}
                            >
                                <span className="text-sm font-semibold text-white pr-4">
                                    {item.question}
                                </span>
                                <ChevronDown
                                    className={`w-5 h-5 text-[#64748b] flex-shrink-0 transition-transform duration-200 ${openIndex === index ? 'rotate-180 text-[#a5b4fc]' : ''
                                        }`}
                                />
                            </button>

                            {/* Answer (expandable) */}
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="px-5 pb-5 text-sm text-[#94a3b8] leading-relaxed border-t border-white/5 pt-4">
                                            {item.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
