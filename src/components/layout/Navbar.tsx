/**
 * Navbar.tsx — Ultra-premium coder-aesthetic navigation bar.
 *
 * This is the main navigation component shown at the top of every page.
 * It uses a terminal / IDE inspired design with the JetBrains Mono font.
 *
 * Features:
 * - IDE/Terminal-inspired layout with JetBrains Mono font
 * - Animated gradient accent line at the top
 * - Glassmorphism effect when user scrolls down
 * - Animated hamburger → X toggle for mobile
 * - Right-slide mobile drawer styled like a terminal window
 * - Auth-aware: shows login/logout buttons based on user state
 * - All animations CSS-driven for zero-lag performance
 * - Responsive: desktop links hidden on mobile, drawer shown instead
 */

'use client';

/* ─── React hooks for state, effects, and memoization ─── */
import { useEffect, useState, useCallback } from 'react';
/* ─── Next.js Link for client-side navigation ─── */
import Link from 'next/link';
/* ─── Next.js hooks for reading the current URL and programmatic navigation ─── */
import { usePathname, useRouter } from 'next/navigation';
/* ─── Framer Motion for smooth enter/exit animations ─── */
import { motion, AnimatePresence } from 'framer-motion';
/* ─── Lucide icons — professional, consistent icon set ─── */
import {
  ArrowRight, LogOut, Terminal, Code2, Home,
  GraduationCap, LayoutDashboard, BookOpen, MessageSquare, Info,
} from 'lucide-react';
/* ─── App-wide constants: navigation link data ─── */
import { NAV_LINKS } from '@/lib/constants';
/* ─── Auth utilities: check if user is logged in ─── */
import { AUTH_STATE_EVENT, getAccessToken } from '@/lib/api-client';
/* ─── Auth service: handle logout flow ─── */
import { logout as logoutSession } from '@/services/auth-service';

/* ─── Icon mapping: maps each route path to its Lucide icon component ─── */
const NAV_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  '/': Home,
  '/school': BookOpen,
  '/coding': Code2,
  '/dashboard': LayoutDashboard,
  '/about': Info,
  '/contact': MessageSquare,
};

/* ─── Shorthand CSS class for using JetBrains Mono font ─── */
const MONO = 'font-[family-name:var(--font-jetbrains)]';

/**
 * Navbar — The main navigation component.
 *
 * Renders a fixed-position header with:
 * 1. Desktop: horizontal links with active indicator
 * 2. Mobile: hamburger button → slide-in drawer
 * 3. Auth buttons: login/register or logout
 */
export default function Navbar() {
  /* ─── State: is the mobile drawer open? ─── */
  const [isOpen, setIsOpen] = useState(false);
  /* ─── State: has the user scrolled past 20px? (triggers glassmorphism) ─── */
  const [scrolled, setScrolled] = useState(false);
  /* ─── State: is the user currently logged in? ─── */
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  /* ─── State: is logout in progress? (prevents double-clicks) ─── */
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  /* ─── Read the current URL path (e.g. "/coding") ─── */
  const pathname = usePathname();
  /* ─── Router for programmatic navigation after logout ─── */
  const router = useRouter();

  /**
   * syncAuthState — Checks localStorage for an access token
   * and updates the isAuthenticated state accordingly.
   */
  const syncAuthState = useCallback(() => {
    setIsAuthenticated(Boolean(getAccessToken()));
  }, []);

  /* ─── Effect: Listen for scroll events to toggle the glassmorphism style ─── */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ─── Effect: Prevent body scroll when mobile drawer is open ─── */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  /* ─── Effect: Sync auth state on mount and listen for auth changes ─── */
  useEffect(() => {
    syncAuthState();
    const handler = () => syncAuthState();
    window.addEventListener(AUTH_STATE_EVENT, handler);
    return () => window.removeEventListener(AUTH_STATE_EVENT, handler);
  }, [syncAuthState]);

  /* ─── Effect: Re-check auth when the page route changes ─── */
  useEffect(() => { syncAuthState(); }, [pathname, syncAuthState]);

  /**
   * handleLogout — Calls the auth service to log out,
   * clears state, closes drawer, and navigates to /login.
   */
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
      {/* ─── Animated top accent gradient line — CSS gradient animation ─── */}
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

      {/* ─── Main nav container ─── */}
      <nav className="container-custom" aria-label="Main navigation">
        <div className="flex items-center justify-between h-[4.5rem] lg:h-[5.25rem]">

          {/* ════════════════════════════════════════════════
              Logo — Terminal icon badge + "{ CollegeHub }" text
              ════════════════════════════════════════════════ */}
          <Link href="/" className="flex items-center gap-3.5 group select-none" aria-label="CollegeHub Home">
            {/* Icon badge with gradient border */}
            <div className="relative w-11 h-11 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
              {/* Gradient border ring */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#22c55e] via-[#6366f1] to-[#22c55e] p-[1.5px]">
                <div className="w-full h-full rounded-xl bg-[#0a0a12] flex items-center justify-center">
                  <Terminal className="w-5 h-5 lg:w-[22px] lg:h-[22px] text-[#22c55e]" strokeWidth={2.5} />
                </div>
              </div>
              {/* Subtle green glow behind the badge */}
              <div
                className="absolute inset-0 rounded-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500"
                style={{ boxShadow: '0 0 28px rgba(34,197,94,0.3)' }}
              />
            </div>

            {/* Brand text: { CollegeHub } — styled like a code block */}
            <div className="flex items-center gap-1.5">
              <span className={`text-[#22c55e]/40 ${MONO} text-base lg:text-lg group-hover:text-[#22c55e]/60 transition-colors duration-300`}>{`{`}</span>
              <span className={`text-[1.2rem] lg:text-[1.35rem] font-bold ${MONO} tracking-tight`}>
                <span className="text-[#22c55e]">College</span>
                <span className="text-white">Hub</span>
              </span>
              <span className={`text-[#22c55e]/40 ${MONO} text-base lg:text-lg group-hover:text-[#22c55e]/60 transition-colors duration-300`}>{`}`}</span>
            </div>
          </Link>

          {/* ════════════════════════════════════════════════
              Desktop Nav Links — Hidden on mobile (< md)
              Each link has an icon, label, active underline, and hover glow
              ════════════════════════════════════════════════ */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3 xl:gap-4">
            {NAV_LINKS.map((link) => {
              /* ─── Check if this link matches the current page ─── */
              const isActive = pathname === link.href;
              /* ─── Get the icon component for this route ─── */
              const IconComp = NAV_ICONS[link.href];
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 lg:px-5 xl:px-6 py-2.5 lg:py-3 rounded-xl text-[13px] lg:text-[14px] font-semibold ${MONO} tracking-[0.04em] transition-all duration-250 flex items-center gap-2.5 lg:gap-3 group/link ${
                    isActive
                      ? 'text-[#22c55e]'
                      : 'text-[#64748b] hover:text-[#94a3b8]'
                  }`}
                >
                  {/* Link icon */}
                  {IconComp && (
                    <IconComp
                      className={`w-[15px] h-[15px] lg:w-4 lg:h-4 transition-all duration-250 ${
                        isActive ? 'text-[#22c55e]' : 'text-[#475569] group-hover/link:text-[#64748b]'
                      }`}
                    />
                  )}
                  {/* Link label text */}
                  {link.label}

                  {/* Active indicator — animated green underline that follows active link */}
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

                  {/* Hover glow — subtle white overlay on hover */}
                  {!isActive && (
                    <span className="absolute inset-0 rounded-xl bg-white/[0.03] opacity-0 group-hover/link:opacity-100 transition-opacity duration-250" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ════════════════════════════════════════════════
              Right side actions — cursor blink + auth button + hamburger
              ════════════════════════════════════════════════ */}
          <div className="flex items-center gap-4 lg:gap-5">
            {/* Terminal cursor blink — purely decorative */}
            <motion.span
              className="hidden lg:inline-block w-[3px] h-5 bg-[#22c55e]/70 rounded-[1px]"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />

            {/* Auth button — shows logout if authenticated, or register if not */}
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

            {/* ──── Mobile hamburger button ────
                 Three lines that animate into an X when clicked. */}
            <button
              onClick={() => setIsOpen((v) => !v)}
              className="md:hidden p-3 rounded-xl text-[#64748b] hover:text-[#22c55e] hover:bg-[#22c55e]/5 transition-all duration-200 active:scale-95"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              <div className="w-6 h-5 flex flex-col justify-between relative">
                {/* Top line — rotates 45° when open */}
                <motion.span
                  className="w-full h-[2px] bg-current rounded-full origin-left"
                  animate={isOpen ? { rotate: 45, x: 2 } : { rotate: 0, x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                {/* Middle line — fades and slides left when open */}
                <motion.span
                  className="w-4 h-[2px] bg-current rounded-full"
                  animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                />
                {/* Bottom line — rotates -45° when open */}
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

      {/* ════════════════════════════════════════════════
          Mobile Drawer — Slides in from the right side
          Styled like a terminal window with red/yellow/green dots
          ════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay — fades in, closes drawer on click */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm md:hidden z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer panel — slides in from right */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed top-0 right-0 h-full w-[320px] max-w-[85vw] bg-[#0a0a12] border-l border-[#22c55e]/12 md:hidden z-50 overflow-y-auto"
            >
              {/* Terminal chrome header — red/yellow/green dots + file name */}
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

              {/* Navigation links list */}
              <div className="flex flex-col gap-1.5 p-5 pt-6">
                {/* Section label — styled like a code comment */}
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
                        {/* Show "← active" label for the current page */}
                        {isActive && (
                          <span className={`ml-auto text-[9px] text-[#22c55e]/60 ${MONO}`}>
                            ← active
                          </span>
                        )}
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Divider line */}
                <div className="h-px bg-white/[0.06] my-5" />

                {/* Actions section label */}
                <p className={`text-[10px] ${MONO} text-[#334155] uppercase tracking-[0.15em] mb-2.5 px-3`}>
                  {'// actions'}
                </p>

                {/* Auth actions — login/register or logout */}
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

              {/* Bottom terminal decoration — shows version with blinking cursor */}
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
