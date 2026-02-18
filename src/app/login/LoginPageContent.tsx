/**
 * LoginPageContent.tsx — Professional login page.
 *
 * Clean design — no emojis, no generic AI patterns.
 * Split panel: subtle branding left, clean form right.
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  ArrowRight,
  CircleAlert,
  CircleCheck,
  Eye,
  EyeOff,
  Lock,
  Mail,
} from 'lucide-react';
import { getPublicApiBaseUrl } from '@/lib/api-client';
import { login } from '@/services/auth-service';
import { loginFormSchema, LoginFormValues } from '@/utils/form-schemas';

const normalizeNextPath = (value: string | null) => {
  if (!value) return null;
  const decoded = (() => {
    try {
      return decodeURIComponent(value);
    } catch {
      return value;
    }
  })();
  if (!decoded.startsWith('/')) return null;
  if (decoded.startsWith('//')) return null;
  return decoded;
};

/* Animations */
const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
};

interface Props {
  initialNextPath: string | null;
}

export default function LoginPageContent({ initialNextPath }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = normalizeNextPath(initialNextPath);
  const [showPassword, setShowPassword] = useState(false);

  const googleError = searchParams.get('error');
  const googleErrorMessage =
    googleError === 'google_not_configured'
      ? 'Google sign-in is not configured yet. Please use email/password for now.'
      : 'Google sign-in failed. Please try again or use email/password.';

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (payload) => {
      if (nextPath) { router.push(nextPath); return; }
      if (payload.resume?.courseId) { router.push(`/courses/${payload.resume.courseId}`); return; }
      router.push('/dashboard');
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    await loginMutation.mutateAsync(values);
  };

  const responseError =
    loginMutation.error instanceof AxiosError
      ? (loginMutation.error.response?.data as { message?: string } | undefined)?.message
      : 'Unable to login right now. Please retry.';

  const apiUrl = getPublicApiBaseUrl();
  const googleAuthUrl = `${apiUrl}/auth/google${nextPath ? `?next=${encodeURIComponent(nextPath)}` : ''}`;

  return (
    <section className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 bg-[#05070d]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(20,184,166,0.12)_0%,_transparent_58%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(14,116,144,0.10)_0%,_transparent_60%)]" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Main container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-16 md:py-8">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-white/[0.06]"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Left — Branding */}
          <motion.div
            className="hidden lg:flex flex-col justify-between p-10 xl:p-12 relative overflow-hidden"
            style={{ background: 'linear-gradient(145deg, #0c1624 0%, #102534 100%)' }}
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {/* Subtle decoration */}
            <div className="absolute top-0 right-0 w-52 h-52 bg-[#14b8a6]/[0.10] rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#0ea5e9]/[0.08] rounded-full blur-[60px]" />

            <div className="relative z-10">
              <motion.div variants={item} className="flex items-center gap-2.5 mb-10">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#14b8a6] to-[#0f766e] flex items-center justify-center">
                  <span className="text-white font-bold text-sm">C</span>
                </div>
                <span className="text-lg font-semibold text-white tracking-tight">CollegeHub</span>
              </motion.div>

              <motion.h2 variants={item} className="text-3xl xl:text-4xl font-bold text-white leading-tight mb-4">
                Pick up right<br />where you left off
              </motion.h2>

              <motion.p variants={item} className="text-[#94a3b8] text-sm leading-relaxed max-w-sm">
                Access your courses, track progress, and continue building your skills.
              </motion.p>
            </div>

            <motion.div variants={item} className="relative z-10 flex gap-8 mt-auto pt-8">
              {[
                { value: '40+', label: 'Courses' },
                { value: '10K+', label: 'Students' },
                { value: '4.8', label: 'Rating' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-lg font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-[#64748b]">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            className="relative p-7 md:p-10 xl:p-12 bg-[#081019]/95 backdrop-blur-xl"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {/* Mobile logo */}
            <motion.div variants={item} className="lg:hidden flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#14b8a6] to-[#0f766e] flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-lg font-semibold text-white">CollegeHub</span>
            </motion.div>

            {/* Header */}
            <motion.div variants={item} className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
                Sign in
              </h1>
              <p className="text-sm text-[#94a3b8]">
                Enter your credentials to continue
              </p>
            </motion.div>

            {/* Google OAuth error */}
            <AnimatePresence>
              {googleError && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-5 px-4 py-3 rounded-xl bg-[#ef4444]/8 border border-[#ef4444]/15"
                >
                  <p className="text-xs text-[#fca5a5] flex items-center gap-2">
                    <CircleAlert className="w-3.5 h-3.5 shrink-0" />
                    {googleErrorMessage}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Google button */}
            <motion.a
              variants={item}
              href={googleAuthUrl}
              className="w-full py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm font-medium
                hover:bg-white/[0.07] hover:border-white/[0.14]
                active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-3"
            >
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </motion.a>

            {/* Divider */}
            <motion.div variants={item} className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-white/[0.06]" />
              <span className="text-[11px] text-[#475569] font-medium uppercase tracking-wider">or</span>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              {/* Email */}
              <motion.div variants={item}>
                <label htmlFor="email" className="text-xs font-medium text-[#94a3b8] mb-1.5 block">
                  Email
                </label>
                <div className="relative group">
                  <Mail className="w-4 h-4 text-[#475569] absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-[#14b8a6]" />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm
                      placeholder:text-[#334155]
                      focus:outline-none focus:bg-white/[0.04] focus:border-[#14b8a6]/50 focus:ring-1 focus:ring-[#14b8a6]/20
                      transition-all duration-200"
                    {...register('email')}
                  />
                  {dirtyFields.email && !errors.email && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-3.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                  )}
                </div>
                <AnimatePresence>
                  {errors.email && (
                    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="text-xs text-[#ef4444] mt-1.5 flex items-center gap-1">
                      <CircleAlert className="w-3 h-3" /> {errors.email.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Password */}
              <motion.div variants={item}>
                <label htmlFor="password" className="text-xs font-medium text-[#94a3b8] mb-1.5 block">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="w-4 h-4 text-[#475569] absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-[#14b8a6]" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="w-full pl-11 pr-12 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm
                      placeholder:text-[#334155]
                      focus:outline-none focus:bg-white/[0.04] focus:border-[#14b8a6]/50 focus:ring-1 focus:ring-[#14b8a6]/20
                      transition-all duration-200"
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#475569] hover:text-[#94a3b8] transition-colors"
                    tabIndex={-1}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <AnimatePresence>
                  {errors.password && (
                    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="text-xs text-[#ef4444] mt-1.5 flex items-center gap-1">
                      <CircleAlert className="w-3 h-3" /> {errors.password.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Submit */}
              <motion.div variants={item} className="pt-1">
                <motion.button
                  type="submit"
                  disabled={loginMutation.isPending}
                  className="w-full py-3 rounded-xl text-white text-sm font-semibold relative overflow-hidden
                    disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200
                    flex items-center justify-center gap-2"
                  whileHover={!loginMutation.isPending ? { y: -1 } : {}}
                  whileTap={!loginMutation.isPending ? { scale: 0.985 } : {}}
                  style={{
                    background: isValid
                      ? 'linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)'
                      : 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                  }}
                >
                  <span>{loginMutation.isPending ? 'Signing in...' : 'Sign In'}</span>
                  {!loginMutation.isPending && <ArrowRight className="w-4 h-4" />}
                  {loginMutation.isPending && (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  )}
                </motion.button>
              </motion.div>

              {/* Status */}
              <AnimatePresence>
                {loginMutation.isSuccess && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xs text-[#22c55e] flex items-center gap-1.5 justify-center">
                    <CircleCheck className="w-3.5 h-3.5" /> Login successful. Redirecting...
                  </motion.p>
                )}
                {loginMutation.isError && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xs text-[#ef4444] flex items-center gap-1.5 justify-center">
                    <CircleAlert className="w-3.5 h-3.5" /> {responseError || 'Unable to login right now. Please retry.'}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>

            {/* Footer */}
            <motion.p variants={item} className="text-sm text-[#64748b] mt-8 text-center">
              New to CollegeHub?{' '}
              <Link
                href="/register"
                className="text-[#2dd4bf] hover:text-white font-medium transition-colors"
              >
                Create an account
              </Link>
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
