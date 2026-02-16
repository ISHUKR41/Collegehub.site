/**
 * Newsletter.tsx — Email signup section
 * 
 * Call-to-action section with gradient background for newsletter signup.
 * Has a large heading, description, and email input with submit button.
 * 
 * Why: Lead generation. Captures email addresses for marketing
 * and keeps users engaged with platform updates.
 * 
 * To extend: Connect to backend newsletter API or Mailchimp.
 */

'use client';

import { motion } from 'framer-motion';
import { Mail, ArrowRight, Bell } from 'lucide-react';

export default function Newsletter() {
    return (
        <section className="section-padding relative" aria-label="Newsletter signup">
            <div className="container-custom">
                <motion.div
                    className="relative rounded-3xl p-8 md:p-12 lg:p-16 overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/20 via-[#8b5cf6]/10 to-transparent" />
                    <div className="absolute inset-0 border border-[#6366f1]/20 rounded-3xl" />

                    {/* Decorative glow */}
                    <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[#6366f1]/10 blur-[80px]" />
                    <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-[#8b5cf6]/10 blur-[80px]" />

                    <div className="relative z-10 text-center max-w-2xl mx-auto">
                        {/* Icon */}
                        <div className="w-14 h-14 rounded-2xl bg-[#6366f1]/10 border border-[#6366f1]/20 flex items-center justify-center mx-auto mb-6">
                            <Bell className="w-7 h-7 text-[#a5b4fc]" />
                        </div>

                        {/* Heading */}
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                            Ready to Start Learning?
                        </h2>
                        <p className="text-[#94a3b8] text-base mb-8 leading-relaxed">
                            Join thousands of students who are already mastering their subjects
                            and coding skills. Get notified about new courses and features.
                        </p>

                        {/* Email form */}
                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                        >
                            <div className="flex-1 relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-[#64748b] focus:outline-none focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1]/50 transition-all"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-semibold text-sm hover:shadow-[0_0_24px_rgba(99,102,241,0.4)] transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                <span>Get Started</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>

                        <p className="text-xs text-[#64748b] mt-4">
                            No spam ever. Unsubscribe anytime.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
