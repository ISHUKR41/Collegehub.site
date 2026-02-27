/**
 * Navbar.tsx — Ultra-premium coder-aesthetic navigation bar.
 *
 * Features:
 * - IDE/Terminal-inspired layout with JetBrains Mono font
 * - Animated gradient accent line & hover effects
 * - Glassmorphism + subtle green glow on scroll
 * - Animated hamburger → X mobile toggle
 * - Right-slide mobile drawer with terminal chrome
 * - Auth-aware login/logout
 * - All animations CSS-driven for zero-lag performance
 */

'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, LogOut, Terminal, Code2, Home,
  GraduationCap, LayoutDashboard, BookOpen, MessageSquare, Info,
} from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';
import { AUTH_STATE_EVENT, getAccessToken } from '@/lib/api-client';
import { logout as logoutSession } from '@/services/auth-service';

/* ─── Icon mapping ─── */
const NAV_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  '/': Home,
  '/school': BookOpen,
  '/coding': Code2,
  '/dashboard': LayoutDashboard,
  '/about': Info,
  '/contact': MessageSquare,
};

/* ─── Mono font shorthand ─── */
const MONO = 'font-[family-name:var(--font-jetbrains)]';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const syncAuthState = useCallback(() => {
    setIsAuthenticated(Boolean(getAccessToken()));
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    syncAuthState();
    const handler = () => syncAuthState();
    window.addEventListener(AUTH_STATE_EVENT, handler);
    return () => window.removeEventListener(AUTH_STATE_EVENT, handler);
  }, [syncAuthState]);

  useEffect(() => { syncAuthState(); }, [pathname, syncAuthState]);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await logoutSession();
      setIsAuthenticated(false);
      setIsOpen(false);
      router.push('/login');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[500] transition-all duration-500 ${
        scrolled
          ? 'bg-[#0a0a12]/95 backdrop-blur-2xl shadow-[0_4px_60px_rgba(34,197,94,0.08)] border-b border-[#22c55e]/12'
          : 'bg-[#0a0a12]/70 backdrop-blur-xl'
      }`}
    >
      {/* ─── Animated top accent gradient line ─── */}
      <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden">
        <motion.div
          className="h-full w-full"
          style={{
            background: 'linear-gradient(90deg, transparent 5%, #22c55e 25%, #6366f1 50%, #22c55e 75%, transparent 95%)',
            backgroundSize: '200% 100%',
          }}
          animate={{ backgroundPosition: ['0% 50%', '200% 50%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <nav className="container-custom" aria-label="Main navigation">
        <div className="flex items-center justify-between h-[4.5rem] lg:h-[5.25rem]">

          {/* ════════ Logo ════════ */}
          <Link href="/" className="flex items-center gap-3.5 group select-none" aria-label="CollegeHub Home">
            {/* Icon badge */}
            <div className="relative w-11 h-11 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
              {/* Gradient border */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#22c55e] via-[#6366f1] to-[#22c55e] p-[1.5px]">
                <div className="w-full h-full rounded-xl bg-[#0a0a12] flex items-center justify-center">
                  <Terminal className="w-5 h-5 lg:w-[22px] lg:h-[22px] text-[#22c55e]" strokeWidth={2.5} />
                </div>
              </div>
              {/* Glow */}
              <div
                className="absolute inset-0 rounded-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500"
                style={{ boxShadow: '0 0 28px rgba(34,197,94,0.3)' }}
              />
            </div>

            {/* Brand text */}
            <div className="flex items-center gap-1">
              <span className={`text-[#22c55e]/40 ${MONO} text-base lg:text-lg group-hover:text-[#22c55e]/60 transition-colors duration-300`}>{`{`}</span>
              <span className={`text-[1.2rem] lg:text-[1.35rem] font-bold ${MONO} tracking-tight`}>
                <span className="text-[#22c55e]">College</span>
                <span className="text-white">Hub</span>
              </span>
              <span className={`text-[#22c55e]/40 ${MONO} text-base lg:text-lg group-hover:text-[#22c55e]/60 transition-colors duration-300`}>{`}`}</span>
            </div>
          </Link>

          {/* ════════ Desktop Nav Links ════════ */}
          <div className="hidden md:flex items-center gap-1 lg:gap-1.5">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              const IconComp = NAV_ICONS[link.href];
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 lg:px-5 xl:px-6 py-2.5 lg:py-3 rounded-xl text-[13px] lg:text-[14px] font-semibold ${MONO} tracking-[0.03em] transition-all duration-250 flex items-center gap-2 lg:gap-2.5 group/link ${
                    isActive
                      ? 'text-[#22c55e]'
                      : 'text-[#64748b] hover:text-[#94a3b8]'
                  }`}
                >
                  {IconComp && (
                    <IconComp
                      className={`w-[15px] h-[15px] lg:w-4 lg:h-4 transition-all duration-250 ${
                        isActive ? 'text-[#22c55e]' : 'text-[#475569] group-hover/link:text-[#64748b]'
                      }`}
                    />
                  )}
                  {link.label}

                  {/* Active indicator — animated underline */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute -bottom-0.5 left-4 right-4 h-[2.5px] rounded-full"
                      style={{
                        background: 'linear-gradient(90deg, #22c55e, #22c55e80)',
                        boxShadow: '0 0 14px rgba(34,197,94,0.5)',
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    />
                  )}

                  {/* Hover glow background */}
                  {!isActive && (
                    <span className="absolute inset-0 rounded-xl bg-white/[0.03] opacity-0 group-hover/link:opacity-100 transition-opacity duration-250" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ════════ Right side actions ════════ */}
          <div className="flex items-center gap-3 lg:gap-4">
            {/* Terminal cursor blink */}
            <motion.span
              className="hidden lg:inline-block w-[3px] h-5 bg-[#22c55e]/70 rounded-[1px]"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />

            {isAuthenticated ? (
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className={`hidden sm:inline-flex items-center gap-2.5 px-5 lg:px-6 py-2.5 lg:py-3 rounded-xl border border-[#ef4444]/20 bg-[#ef4444]/5 text-[#ef4444] text-[13px] lg:text-[14px] font-semibold ${MONO} tracking-[0.03em] hover:bg-[#ef4444]/10 hover:border-[#ef4444]/30 hover:shadow-[0_0_20px_rgba(239,68,68,0.1)] transition-all duration-300 disabled:opacity-50`}
              >
                <span>{isLoggingOut ? 'exit()...' : 'logout()'}</span>
                <LogOut className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
              </button>
            ) : (
              <Link
                href="/register"
                className={`hidden sm:inline-flex items-center gap-2.5 px-5 lg:px-6 py-2.5 lg:py-3 rounded-xl bg-[#22c55e]/10 border border-[#22c55e]/25 text-[#22c55e] text-[13px] lg:text-[14px] font-semibold ${MONO} tracking-[0.03em] hover:bg-[#22c55e]/20 hover:border-[#22c55e]/40 hover:shadow-[0_0_28px_rgba(34,197,94,0.18)] transition-all duration-300`}
              >
                <Code2 className="w-4 h-4 lg:w-[18px] lg:h-[18px]" />
                <span>start()</span>
                <ArrowRight className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
              </Link>
            )}

            {/* ──── Mobile hamburger ──── */}
            <button
              onClick={() => setIsOpen((v) => !v)}
              className="md:hidden p-3 rounded-xl text-[#64748b] hover:text-[#22c55e] hover:bg-[#22c55e]/5 transition-all duration-200 active:scale-95"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              <div className="w-6 h-5 flex flex-col justify-between relative">
                <motion.span
                  className="w-full h-[2px] bg-current rounded-full origin-left"
                  animate={isOpen ? { rotate: 45, x: 2 } : { rotate: 0, x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="w-4 h-[2px] bg-current rounded-full"
                  animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="w-full h-[2px] bg-current rounded-full origin-left"
                  animate={isOpen ? { rotate: -45, x: 2 } : { rotate: 0, x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* ════════ Mobile Drawer ════════ */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm md:hidden z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed top-0 right-0 h-full w-[320px] max-w-[85vw] bg-[#0a0a12] border-l border-[#22c55e]/12 md:hidden z-50 overflow-y-auto"
            >
              {/* Terminal chrome header */}
              <div className="px-6 pt-6 pb-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
                  <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
                  <div className="w-3 h-3 rounded-full bg-[#22c55e]" />
                  <span className={`ml-auto text-[10px] ${MONO} text-[#334155]`}>menu.sh</span>
                </div>
                <p className={`text-[11px] ${MONO} text-[#475569] tracking-wide`}>
                  ~/collegehub/nav
                </p>
              </div>

              {/* Navigation links */}
              <div className="flex flex-col gap-1.5 p-5 pt-6">
                <p className={`text-[10px] ${MONO} text-[#334155] uppercase tracking-[0.15em] mb-2.5 px-3`}>
                  {'// navigation'}
                </p>
                {NAV_LINKS.map((link, i) => {
                  const isActive = pathname === link.href;
                  const IconComp = NAV_ICONS[link.href];
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3.5 px-4 py-4 rounded-xl text-[15px] font-semibold ${MONO} tracking-[0.02em] transition-all duration-200 ${
                          isActive
                            ? 'text-[#22c55e] bg-[#22c55e]/8 border border-[#22c55e]/15'
                            : 'text-[#94a3b8] hover:text-white hover:bg-white/[0.04] active:scale-[0.98]'
                        }`}
                      >
                        {IconComp && (
                          <IconComp
                            className={`w-[18px] h-[18px] ${isActive ? 'text-[#22c55e]' : 'text-[#475569]'}`}
                          />
                        )}
                        <span>{link.label}</span>
                        {isActive && (
                          <span className={`ml-auto text-[9px] text-[#22c55e]/60 ${MONO}`}>
                            ← active
                          </span>
                        )}
                      </Link>
                    </motion.div>
                  );
                })}

                <div className="h-px bg-white/[0.06] my-5" />

                <p className={`text-[10px] ${MONO} text-[#334155] uppercase tracking-[0.15em] mb-2.5 px-3`}>
                  {'// actions'}
                </p>

                {!isAuthenticated ? (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-center gap-2.5 px-5 py-4 rounded-xl border border-white/10 bg-white/[0.03] text-white text-[15px] font-semibold ${MONO} tracking-[0.02em] active:scale-[0.98] transition-all duration-200`}
                    >
                      <Terminal className="w-4 h-4 text-[#64748b]" />
                      <span>login()</span>
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-center gap-2.5 px-5 py-4 rounded-xl bg-[#22c55e]/10 border border-[#22c55e]/25 text-[#22c55e] text-[15px] font-semibold ${MONO} tracking-[0.02em] mt-2 active:scale-[0.98] transition-all duration-200`}
                    >
                      <Code2 className="w-4 h-4" />
                      <span>createAccount()</span>
                    </Link>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className={`flex items-center justify-center gap-2.5 px-5 py-4 rounded-xl border border-[#ef4444]/20 bg-[#ef4444]/5 text-[#ef4444] text-[15px] font-semibold ${MONO} tracking-[0.02em] disabled:opacity-50 active:scale-[0.98] transition-all duration-200`}
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{isLoggingOut ? 'exit()...' : 'logout()'}</span>
                  </button>
                )}
              </div>

              {/* Bottom terminal decoration */}
              <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-white/[0.06]">
                <p className={`text-[11px] ${MONO} text-[#334155] flex items-center gap-1.5`}>
                  <span className="text-[#22c55e]">$</span>
                  <span>CollegeHub v2.0</span>
                  <motion.span
                    className="inline-block w-2 h-3.5 bg-[#22c55e]/60 ml-1"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
