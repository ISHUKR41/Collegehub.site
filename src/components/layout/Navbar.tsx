/**
 * Navbar.tsx — Coder-aesthetic navigation with terminal-inspired design.
 *
 * Features:
 * - Terminal/IDE-inspired look with monospace fonts
 * - Animated code bracket decorations
 * - Glassmorphism with green terminal glow
 * - Smooth animated mobile drawer
 * - Auth-aware actions (login/logout)
 */

'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, LogOut, Terminal, Code2, Braces, Home,
  GraduationCap, LayoutDashboard, BookOpen, MessageSquare, Info,
} from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';
import { AUTH_STATE_EVENT, getAccessToken } from '@/lib/api-client';
import { logout as logoutSession } from '@/services/auth-service';

/* ─── Icon mapping for nav links ─── */
const NAV_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  '/': Home,
  '/school': BookOpen,
  '/coding': Code2,
  '/dashboard': LayoutDashboard,
  '/about': Info,
  '/contact': MessageSquare,
};

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
          ? 'bg-[#0a0a12]/90 backdrop-blur-2xl shadow-[0_1px_40px_rgba(34,197,94,0.06)] border-b border-[#22c55e]/10'
          : 'bg-transparent'
      }`}
    >
      {/* Animated top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] overflow-hidden">
        <motion.div
          className="h-full w-full"
          style={{
            background: 'linear-gradient(90deg, transparent, #22c55e, #6366f1, #22c55e, transparent)',
            backgroundSize: '200% 100%',
          }}
          animate={{ backgroundPosition: ['0% 50%', '200% 50%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <nav className="container-custom" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 md:h-[4.5rem]">

          {/* ─── Logo ─── */}
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="CollegeHub Home">
            <motion.div
              whileHover={{ rotateY: 180 }}
              transition={{ duration: 0.6 }}
              style={{ perspective: 600 }}
              className="relative w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden"
            >
              {/* Animated gradient border */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#22c55e] via-[#6366f1] to-[#22c55e] p-[1px]">
                <div className="w-full h-full rounded-xl bg-[#0a0a12] flex items-center justify-center">
                  <Terminal className="w-5 h-5 text-[#22c55e]" strokeWidth={2.5} />
                </div>
              </div>
              {/* Glow pulse */ }
              <motion.div
                className="absolute inset-0 rounded-xl"
                style={{ boxShadow: '0 0 20px rgba(34,197,94,0.3)' }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <div className="flex items-center gap-0">
              <Braces className="w-4 h-4 text-[#22c55e]/60 group-hover:text-[#22c55e] transition-colors duration-300" />
              <span className="text-lg font-bold font-[family-name:var(--font-jetbrains)] tracking-tight">
                <span className="text-[#22c55e]">College</span>
                <span className="text-white">Hub</span>
              </span>
              <span className="text-[#22c55e]/60 group-hover:text-[#22c55e] transition-colors duration-300 font-[family-name:var(--font-jetbrains)] text-sm">()</span>
            </div>
          </Link>

          {/* ─── Desktop Nav Links ─── */}
          <div className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              const IconComp = NAV_ICONS[link.href];
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 lg:px-4 py-2 rounded-lg text-[13px] font-semibold font-[family-name:var(--font-jetbrains)] transition-all duration-200 flex items-center gap-1.5 group/link ${
                    isActive
                      ? 'text-[#22c55e]'
                      : 'text-[#64748b] hover:text-[#94a3b8]'
                  }`}
                >
                  {IconComp && (
                    <IconComp
                      className={`w-3.5 h-3.5 transition-all duration-200 ${
                        isActive ? 'text-[#22c55e]' : 'text-[#475569] group-hover/link:text-[#64748b]'
                      }`}
                    />
                  )}
                  {link.label}
                  {/* Active indicator — animated underline */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute -bottom-0.5 left-3 right-3 h-[2px] rounded-full"
                      style={{
                        background: 'linear-gradient(90deg, #22c55e, #22c55e80)',
                        boxShadow: '0 0 8px rgba(34,197,94,0.4)',
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  {/* Hover background */}
                  {!isActive && (
                    <span className="absolute inset-0 rounded-lg bg-white/[0.03] opacity-0 group-hover/link:opacity-100 transition-opacity duration-200" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ─── Right side actions ─── */}
          <div className="flex items-center gap-2">
            {/* Terminal cursor blink */}
            <motion.span
              className="hidden lg:inline-block w-2 h-5 bg-[#22c55e]/80 rounded-[1px]"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />

            {isAuthenticated ? (
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#ef4444]/20 bg-[#ef4444]/5 text-[#ef4444] text-[13px] font-semibold font-[family-name:var(--font-jetbrains)] hover:bg-[#ef4444]/10 hover:border-[#ef4444]/30 transition-all duration-200 disabled:opacity-50"
              >
                <span>{isLoggingOut ? 'exit()...' : 'logout()'}</span>
                <LogOut className="w-3.5 h-3.5" />
              </button>
            ) : (
              <Link
                href="/register"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#22c55e]/10 border border-[#22c55e]/25 text-[#22c55e] text-[13px] font-semibold font-[family-name:var(--font-jetbrains)] hover:bg-[#22c55e]/20 hover:border-[#22c55e]/40 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)] transition-all duration-300"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>start()</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}

            {/* Mobile hamburger — animated terminal icon */}
            <button
              onClick={() => setIsOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg text-[#64748b] hover:text-[#22c55e] hover:bg-[#22c55e]/5 transition-all duration-200"
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

      {/* ─── Mobile Drawer ─── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm md:hidden z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[280px] bg-[#0a0a12] border-l border-[#22c55e]/10 md:hidden z-50 overflow-y-auto"
            >
              {/* Terminal header decoration */}
              <div className="px-5 pt-5 pb-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
                </div>
                <p className="text-[10px] font-[family-name:var(--font-jetbrains)] text-[#475569]">
                  ~/collegehub/nav
                </p>
              </div>

              {/* Nav links */}
              <div className="flex flex-col gap-1 p-4 pt-5">
                <p className="text-[10px] font-[family-name:var(--font-jetbrains)] text-[#334155] uppercase tracking-wider mb-2 px-3">
                  // navigation
                </p>
                {NAV_LINKS.map((link, i) => {
                  const isActive = pathname === link.href;
                  const IconComp = NAV_ICONS[link.href];
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-semibold font-[family-name:var(--font-jetbrains)] transition-all duration-200 ${
                          isActive
                            ? 'text-[#22c55e] bg-[#22c55e]/8 border border-[#22c55e]/15'
                            : 'text-[#94a3b8] hover:text-white hover:bg-white/[0.04]'
                        }`}
                      >
                        {IconComp && (
                          <IconComp
                            className={`w-4 h-4 ${isActive ? 'text-[#22c55e]' : 'text-[#475569]'}`}
                          />
                        )}
                        <span>{link.label}</span>
                        {isActive && (
                          <span className="ml-auto text-[9px] text-[#22c55e]/60 font-[family-name:var(--font-jetbrains)]">
                            ← active
                          </span>
                        )}
                      </Link>
                    </motion.div>
                  );
                })}

                <div className="h-px bg-white/[0.06] my-4" />

                <p className="text-[10px] font-[family-name:var(--font-jetbrains)] text-[#334155] uppercase tracking-wider mb-2 px-3">
                  // actions
                </p>

                {!isAuthenticated ? (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-white/10 bg-white/[0.03] text-white text-sm font-semibold font-[family-name:var(--font-jetbrains)]"
                    >
                      <Terminal className="w-4 h-4 text-[#64748b]" />
                      <span>login()</span>
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#22c55e]/10 border border-[#22c55e]/25 text-[#22c55e] text-sm font-semibold font-[family-name:var(--font-jetbrains)] mt-1"
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
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-[#ef4444]/20 bg-[#ef4444]/5 text-[#ef4444] text-sm font-semibold font-[family-name:var(--font-jetbrains)] disabled:opacity-50"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{isLoggingOut ? 'exit()...' : 'logout()'}</span>
                  </button>
                )}
              </div>

              {/* Bottom terminal decoration */}
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/[0.06]">
                <p className="text-[10px] font-[family-name:var(--font-jetbrains)] text-[#334155] flex items-center gap-1">
                  <span className="text-[#22c55e]">$</span>
                  <span>CollegeHub v2.0</span>
                  <motion.span
                    className="inline-block w-1.5 h-3 bg-[#22c55e]/60 ml-1"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
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
