/**
 * Navbar.tsx - Main navigation with auth-aware actions.
 *
 * Why this component exists:
 * - Provides consistent route access across all pages.
 * - Keeps mobile drawer + desktop navigation in one place.
 * - Shows login/register or logout actions based on session token presence.
 */

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowRight, GraduationCap, LogOut, Menu, X } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';
import { AUTH_STATE_EVENT, getAccessToken } from '@/lib/api-client';
import { logout as logoutSession } from '@/services/auth-service';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const syncAuthState = () => {
    setIsAuthenticated(Boolean(getAccessToken()));
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    syncAuthState();

    const handleAuthStateUpdate = () => {
      syncAuthState();
    };

    window.addEventListener(AUTH_STATE_EVENT, handleAuthStateUpdate);
    return () => {
      window.removeEventListener(AUTH_STATE_EVENT, handleAuthStateUpdate);
    };
  }, []);

  useEffect(() => {
    syncAuthState();
  }, [pathname]);

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
      className={`fixed top-0 left-0 right-0 z-[500] transition-all duration-300 ${
        scrolled ? 'glass-strong shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="container-custom" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2 group" aria-label="CollegeHub Home">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center shadow-lg group-hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-shadow duration-300">
              <GraduationCap className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold text-gradient">CollegeHub</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-white bg-white/10'
                      : 'text-[#94a3b8] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-semibold hover:bg-white/10 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span>{isLoggingOut ? 'Signing out...' : 'Logout'}</span>
                <LogOut className="w-4 h-4" />
              </button>
            ) : (
              <Link
                href="/register"
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white text-sm font-semibold hover:shadow-[0_0_24px_rgba(99,102,241,0.4)] transition-all duration-200 hover:-translate-y-0.5"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}

            <button
              onClick={() => setIsOpen((value) => !value)}
              className="md:hidden p-2 rounded-lg text-[#94a3b8] hover:text-white hover:bg-white/5 transition-colors"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          <div className="fixed top-0 right-0 h-full w-72 bg-[#0a0a12] border-l border-white/5 md:hidden z-50 animate-slide-right">
            <div className="flex flex-col gap-2 p-6 pt-20">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-white bg-white/10 border border-white/5'
                        : 'text-[#94a3b8] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {!isAuthenticated ? (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="mt-4 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-semibold"
                  >
                    <span>Login</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white text-sm font-semibold"
                  >
                    <span>Create Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="mt-4 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span>{isLoggingOut ? 'Signing out...' : 'Logout'}</span>
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  );
}
