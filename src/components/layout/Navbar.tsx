/**
 * Navbar.tsx — Main navigation bar
 * 
 * Sticky glassmorphism navbar with:
 * - Logo with gradient text
 * - Desktop navigation links with active state
 * - Mobile hamburger menu with slide-in drawer
 * - "Get Started" CTA button
 * - Background blur on scroll
 * 
 * Why: First thing users see. Must feel premium and be responsive.
 * 
 * To extend: Add dropdown menus, auth state (login/logout), or search bar.
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, GraduationCap, ArrowRight } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    /* Detect scroll to add background blur to navbar */
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    /* Close mobile menu when route changes */
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    /* Prevent body scroll when mobile menu is open */
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-[500] transition-all duration-300 ${scrolled
                    ? 'glass-strong shadow-lg'
                    : 'bg-transparent'
                }`}
        >
            <nav className="container-custom" aria-label="Main navigation">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 group"
                        aria-label="CollegeHub Home"
                    >
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center shadow-lg group-hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-shadow duration-300">
                            <GraduationCap className="w-5 h-5 text-white" strokeWidth={2.5} />
                        </div>
                        <span className="text-xl font-bold text-gradient">
                            CollegeHub
                        </span>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {NAV_LINKS.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                            ? 'text-white bg-white/10'
                                            : 'text-[#94a3b8] hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* CTA Button + Mobile Menu Toggle */}
                    <div className="flex items-center gap-3">
                        <Link
                            href="/coding"
                            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white text-sm font-semibold hover:shadow-[0_0_24px_rgba(99,102,241,0.4)] transition-all duration-200 hover:-translate-y-0.5"
                        >
                            <span>Get Started</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>

                        {/* Hamburger toggle for mobile */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 rounded-lg text-[#94a3b8] hover:text-white hover:bg-white/5 transition-colors"
                            aria-label={isOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={isOpen}
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation Drawer */}
            {isOpen && (
                <>
                    {/* Backdrop overlay */}
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden z-40"
                        onClick={() => setIsOpen(false)}
                        aria-hidden="true"
                    />

                    {/* Slide-in menu */}
                    <div className="fixed top-0 right-0 h-full w-72 bg-[#0a0a12] border-l border-white/5 md:hidden z-50 animate-slide-right">
                        <div className="flex flex-col gap-2 p-6 pt-20">
                            {NAV_LINKS.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${isActive
                                                ? 'text-white bg-white/10 border border-white/5'
                                                : 'text-[#94a3b8] hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}

                            {/* Mobile CTA */}
                            <Link
                                href="/coding"
                                className="mt-4 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white text-sm font-semibold"
                            >
                                <span>Get Started</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </header>
    );
}
