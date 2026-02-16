/**
 * ContactPageContent.tsx — Client-side contact page
 * 
 * Features:
 * 1. Hero
 * 2. Contact form with validation
 * 3. Office/contact info cards
 * 4. FAQ section
 * 
 * Form uses basic HTML5 validation. In production,
 * connect to the backend API for form submission.
 */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Send, Mail, MapPin, Clock, Phone,
    MessageSquare, HelpCircle, ChevronDown
} from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';

/* Contact info items */
const CONTACT_INFO = [
    {
        icon: Mail,
        title: 'Email',
        value: 'hello@collegehub.site',
        description: 'We reply within 24 hours',
    },
    {
        icon: MapPin,
        title: 'Location',
        value: 'India',
        description: 'Operating remotely across India',
    },
    {
        icon: Clock,
        title: 'Working Hours',
        value: 'Mon - Sat, 9 AM - 6 PM',
        description: 'Indian Standard Time (IST)',
    },
    {
        icon: Phone,
        title: 'Phone',
        value: '+91 XXXX-XXXX-XX',
        description: 'Available during working hours',
    },
];

/* FAQ items for contact page */
const CONTACT_FAQ = [
    { q: 'How long does it take to get a response?', a: 'We typically respond within 24 hours on business days.' },
    { q: 'Can I request a specific course or language?', a: 'Yes! We welcome course suggestions. Let us know via the form above.' },
    { q: 'I found a bug. How do I report it?', a: 'Use the contact form with "Bug Report" as the subject. Include as much detail as possible.' },
    { q: 'Do you offer bulk/school partnerships?', a: 'Yes, we are open to partnerships with schools and coaching centers. Contact us for details.' },
];

export default function ContactPageContent() {
    const [submitted, setSubmitted] = useState(false);
    const [faqOpen, setFaqOpen] = useState<number>(-1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In production: POST to /api/contact
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-mesh" />
                <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-[#6366f1]/[0.05] blur-[120px]" />

                <div className="container-custom relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                            <MessageSquare className="w-4 h-4 text-[#a5b4fc]" />
                            <span className="text-sm text-[#a5b4fc] font-medium">Get in Touch</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                            <span className="text-gradient">Contact Us</span>
                        </h1>
                        <p className="text-lg text-[#94a3b8] max-w-2xl mx-auto">
                            Have a question, suggestion, or want to partner with us?
                            We&apos;d love to hear from you.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Form + Contact Info */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-2xl font-bold text-white mb-6">Send us a message</h2>
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Name */}
                                <div>
                                    <label htmlFor="name" className="text-sm font-medium text-[#94a3b8] mb-2 block">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="Your name"
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-[#64748b] focus:outline-none focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1]/50 transition-all"
                                        required
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="text-sm font-medium text-[#94a3b8] mb-2 block">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="your@email.com"
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-[#64748b] focus:outline-none focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1]/50 transition-all"
                                        required
                                    />
                                </div>

                                {/* Subject */}
                                <div>
                                    <label htmlFor="subject" className="text-sm font-medium text-[#94a3b8] mb-2 block">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        placeholder="What's this about?"
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-[#64748b] focus:outline-none focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1]/50 transition-all"
                                        required
                                    />
                                </div>

                                {/* Message */}
                                <div>
                                    <label htmlFor="message" className="text-sm font-medium text-[#94a3b8] mb-2 block">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={5}
                                        placeholder="Tell us more..."
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-[#64748b] focus:outline-none focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1]/50 transition-all resize-none"
                                        required
                                    />
                                </div>

                                {/* Submit button */}
                                <button
                                    type="submit"
                                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-semibold text-sm hover:shadow-[0_0_24px_rgba(99,102,241,0.4)] transition-all duration-200 flex items-center justify-center gap-2"
                                >
                                    {submitted ? (
                                        <span>Message Sent! ✓</span>
                                    ) : (
                                        <>
                                            <span>Send Message</span>
                                            <Send className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>

                        {/* Contact Info Cards */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
                            {CONTACT_INFO.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <GlassCard key={item.title} delay={index * 0.08} className="!p-5">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-[#6366f1]/10 flex items-center justify-center flex-shrink-0">
                                                <Icon className="w-5 h-5 text-[#a5b4fc]" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                                                <p className="text-sm text-[#a5b4fc]">{item.value}</p>
                                                <p className="text-xs text-[#64748b] mt-1">{item.description}</p>
                                            </div>
                                        </div>
                                    </GlassCard>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="section-padding">
                <div className="container-custom">
                    <SectionHeading
                        label="Help"
                        title="Common Questions"
                        subtitle="Quick answers to common queries about contacting us."
                    />

                    <div className="max-w-3xl mx-auto space-y-3">
                        {CONTACT_FAQ.map((item, index) => (
                            <div
                                key={index}
                                className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden"
                            >
                                <button
                                    onClick={() => setFaqOpen(faqOpen === index ? -1 : index)}
                                    className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
                                >
                                    <span className="flex items-center gap-3 text-sm font-semibold text-white pr-4">
                                        <HelpCircle className="w-4 h-4 text-[#a5b4fc] flex-shrink-0" />
                                        {item.q}
                                    </span>
                                    <ChevronDown className={`w-5 h-5 text-[#64748b] transition-transform duration-200 ${faqOpen === index ? 'rotate-180' : ''}`} />
                                </button>
                                {faqOpen === index && (
                                    <div className="px-5 pb-5 text-sm text-[#94a3b8] border-t border-white/5 pt-4 ml-7">
                                        {item.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
