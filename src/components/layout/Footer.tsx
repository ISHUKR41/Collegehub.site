/**
 * Footer.tsx — Site footer with newsletter and links
 * 
 * Multi-column footer with:
 * - Newsletter signup form
 * - Platform, Company, Legal, Resources link columns
 * - Social media links
 * - Copyright notice
 * 
 * Why: Professional footer builds trust and provides easy navigation.
 * The newsletter form helps capture leads for marketing.
 * 
 * To extend: Connect newsletter form to an API endpoint.
 * Add more link columns as the platform grows.
 */

'use client';

import Link from 'next/link';
import { GraduationCap, Mail, ArrowRight, Github, Linkedin, Instagram, Youtube, Twitter } from 'lucide-react';
import { SITE_CONFIG, FOOTER_LINKS } from '@/lib/constants';

export default function Footer() {
    return (
        <footer className="relative border-t border-white/5" role="contentinfo">
            {/* Subtle gradient glow at the top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-[#6366f1]/30 to-transparent" />

            <div className="container-custom section-padding">
                {/* Top section: Logo + Newsletter */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Brand description */}
                    <div className="max-w-md">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center">
                                <GraduationCap className="w-5 h-5 text-white" strokeWidth={2.5} />
                            </div>
                            <span className="text-xl font-bold text-gradient">CollegeHub</span>
                        </Link>
                        <p className="text-[#94a3b8] text-sm leading-relaxed mb-6">
                            {SITE_CONFIG.description}
                        </p>
                        {/* Social links */}
                        <div className="flex items-center gap-3">
                            {[
                                { Icon: Twitter, href: SITE_CONFIG.social.twitter, label: 'Twitter' },
                                { Icon: Github, href: SITE_CONFIG.social.github, label: 'GitHub' },
                                { Icon: Linkedin, href: SITE_CONFIG.social.linkedin, label: 'LinkedIn' },
                                { Icon: Instagram, href: SITE_CONFIG.social.instagram, label: 'Instagram' },
                                { Icon: Youtube, href: SITE_CONFIG.social.youtube, label: 'YouTube' },
                            ].map(({ Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-[#64748b] hover:text-white hover:bg-white/10 hover:border-[#6366f1]/30 transition-all duration-200"
                                    aria-label={label}
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Newsletter signup */}
                    <div className="lg:ml-auto max-w-md w-full">
                        <h3 className="text-lg font-semibold text-white mb-2">Stay Updated</h3>
                        <p className="text-[#94a3b8] text-sm mb-4">
                            Get notified about new courses, features, and study tips.
                        </p>
                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="flex gap-2"
                            aria-label="Newsletter signup"
                        >
                            <div className="flex-1 relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-[#64748b] focus:outline-none focus:border-[#6366f1] transition-colors"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white text-sm font-semibold hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-200 flex items-center gap-1"
                            >
                                <span>Subscribe</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Divider */}
                <div className="divider-gradient mb-12" />

                {/* Link columns */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    {/* Platform */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Platform</h4>
                        <ul className="space-y-3">
                            {FOOTER_LINKS.platform.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm text-[#94a3b8] hover:text-white transition-colors duration-200">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Company</h4>
                        <ul className="space-y-3">
                            {FOOTER_LINKS.company.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm text-[#94a3b8] hover:text-white transition-colors duration-200">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Resources</h4>
                        <ul className="space-y-3">
                            {FOOTER_LINKS.resources.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm text-[#94a3b8] hover:text-white transition-colors duration-200">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Legal</h4>
                        <ul className="space-y-3">
                            {FOOTER_LINKS.legal.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm text-[#94a3b8] hover:text-white transition-colors duration-200">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="divider-gradient mb-6" />
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748b]">
                    <p>&copy; {new Date().getFullYear()} CollegeHub. All rights reserved.</p>
                    <p>
                        Built with ❤️ for students across India
                    </p>
                </div>
            </div>
        </footer>
    );
}
