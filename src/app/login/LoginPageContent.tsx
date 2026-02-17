/**
 * LoginPageContent.tsx — Ultra-modern, premium login experience.
 *
 * Design features:
 * - Split panel: animated branding left, glass form right.
 * - Framer-motion stagger animations on every element.
 * - Animated gradient border & floating orbs.
 * - Password visibility toggle.
 * - Google OAuth button with premium style.
 * - Micro-interactions: focus rings, hover glows, button pulse.
 * - Fully responsive with mobile-first approach.
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  CircleAlert,
  CircleCheck,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Sparkles,
  BookOpen,
  Code2,
  TrendingUp,
  Shield,
} from 'lucide-react';
import { login } from '@/services/auth-service';
import { loginFormSchema, LoginFormValues } from '@/utils/form-schemas';

const normalizeNextPath = (value: string | null) => {
  if (!value) return null;
  if (!value.startsWith('/')) return null;
  if (value.startsWith('//')) return null;
  return value;
};

/* ── Animation Variants ────────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const floatVariants = {
  animate: {
    y: [-8, 8, -8],
    rotate: [0, 5, -5, 0],
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
  },
};

const pulseVariants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.5, 0.8, 0.5],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
};

/* ── Feature Pills for Branding Panel ─────────────────── */
const FEATURES = [
  { icon: BookOpen, text: 'CBSE Class 9 & 10', color: '#a5b4fc' },
  { icon: Code2, text: 'C++, Java, Python', color: '#67e8f9' },
  { icon: TrendingUp, text: 'Smart Analytics', color: '#86efac' },
  { icon: Shield, text: 'Progress Tracking', color: '#fbbf24' },
];

interface LoginPageContentProps {
  initialNextPath: string | null;
}

export default function LoginPageContent({ initialNextPath }: LoginPageContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = normalizeNextPath(initialNextPath);
  const [showPassword, setShowPassword] = useState(false);

  /* ── Google auth error from redirect ── */
  const googleError = searchParams.get('error');

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

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  return (
    <section className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* ── Ambient Background ── */}
      <div className="absolute inset-0 bg-[#060611]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(99,102,241,0.12)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(139,92,246,0.08)_0%,_transparent_50%)]" />

      {/* Animated floating orbs */}
      <motion.div
        className="absolute top-[15%] left-[10%] w-72 h-72 rounded-full bg-[#6366f1]/[0.06] blur-[100px]"
        variants={pulseVariants}
        animate="animate"
      />
      <motion.div
        className="absolute bottom-[20%] right-[5%] w-96 h-96 rounded-full bg-[#8b5cf6]/[0.05] blur-[120px]"
        variants={pulseVariants}
        animate="animate"
        style={{ animationDelay: '1.5s' }}
      />
      <motion.div
        className="absolute top-[60%] left-[50%] w-48 h-48 rounded-full bg-[#06b6d4]/[0.04] blur-[80px]"
        variants={pulseVariants}
        animate="animate"
        style={{ animationDelay: '3s' }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Main Container ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-16 md:py-8">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-white/[0.06] shadow-[0_0_80px_rgba(99,102,241,0.08)]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* ═══ LEFT — Branding Panel ═══ */}
          <motion.div
            className="hidden lg:flex flex-col justify-between p-10 xl:p-12 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0c0c1d 0%, #131332 50%, #0f0f2a 100%)' }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#6366f1]/[0.08] rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#8b5cf6]/[0.06] rounded-full blur-[60px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/[0.04] rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 border border-white/[0.03] rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 border border-white/[0.02] rounded-full" />

            {/* Top — Logo & Tagline */}
            <div className="relative z-10">
              <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white tracking-tight">CollegeHub</span>
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="text-3xl xl:text-4xl font-bold text-white leading-tight mb-4"
              >
                Your Learning
                <br />
                <span className="bg-gradient-to-r from-[#a5b4fc] via-[#818cf8] to-[#c084fc] bg-clip-text text-transparent">
                  Journey Awaits
                </span>
              </motion.h2>

              <motion.p variants={itemVariants} className="text-[#94a3b8] text-sm leading-relaxed max-w-sm">
                Resume where you left off. Track progress, analyze weaknesses, and master every
                subject at your own pace.
              </motion.p>
            </div>

            {/* Middle — Feature Pills */}
            <motion.div variants={itemVariants} className="relative z-10 space-y-3 my-8">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.text}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                  whileHover={{ x: 6, backgroundColor: 'rgba(255,255,255,0.06)' }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${f.color}15`, border: `1px solid ${f.color}25` }}
                  >
                    <f.icon className="w-4 h-4" style={{ color: f.color }} />
                  </div>
                  <span className="text-sm text-[#cbd5e1] font-medium">{f.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Bottom — Stats */}
            <motion.div variants={itemVariants} className="relative z-10 flex gap-8">
              {[
                { value: '10K+', label: 'Students' },
                { value: '250+', label: 'Chapters' },
                { value: '98%', label: 'Satisfaction' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-[#64748b]">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ═══ RIGHT — Login Form ═══ */}
          <motion.div
            className="relative p-7 md:p-10 xl:p-12 bg-[#0a0a18]/90 backdrop-blur-2xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Mobile logo */}
            <motion.div variants={itemVariants} className="lg:hidden flex items-center gap-2.5 mb-8">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">CollegeHub</span>
            </motion.div>

            {/* Header */}
            <motion.div variants={itemVariants} className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
                Welcome back
              </h1>
              <p className="text-sm text-[#94a3b8]">
                Enter your credentials to access your dashboard
              </p>
            </motion.div>

            {/* Google OAuth error banner */}
            <AnimatePresence>
              {googleError && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-5 px-4 py-3 rounded-xl bg-[#ef4444]/10 border border-[#ef4444]/20"
                >
                  <p className="text-xs text-[#fca5a5] flex items-center gap-2">
                    <CircleAlert className="w-3.5 h-3.5 shrink-0" />
                    Google sign-in failed. Please try again or use email/password.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Google OAuth Button */}
            <motion.a
              variants={itemVariants}
              href={`${apiUrl}/auth/google`}
              className="w-full py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm font-semibold
                hover:bg-white/[0.08] hover:border-white/[0.16] hover:shadow-[0_4px_24px_rgba(255,255,255,0.04)]
                active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 group"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.985 }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span className="group-hover:text-white transition-colors">Continue with Google</span>
            </motion.a>

            {/* Divider */}
            <motion.div variants={itemVariants} className="flex items-center gap-4 my-7">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <span className="text-xs text-[#475569] font-medium uppercase tracking-widest">or</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              {/* Email */}
              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="text-xs font-semibold text-[#94a3b8] mb-2 block uppercase tracking-wider">
                  Email
                </label>
                <div className="relative group">
                  <Mail className="w-4 h-4 text-[#475569] absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-[#818cf8]" />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm
                      placeholder:text-[#334155]
                      focus:outline-none focus:bg-white/[0.05] focus:border-[#6366f1]/50 focus:ring-2 focus:ring-[#6366f1]/20
                      transition-all duration-300"
                    {...register('email')}
                  />
                  {/* Active indicator dot */}
                  {dirtyFields.email && !errors.email && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#22c55e]"
                    />
                  )}
                </div>
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-xs text-[#ef4444] mt-1.5 flex items-center gap-1"
                    >
                      <CircleAlert className="w-3 h-3" />
                      {errors.email.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Password */}
              <motion.div variants={itemVariants}>
                <label htmlFor="password" className="text-xs font-semibold text-[#94a3b8] mb-2 block uppercase tracking-wider">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="w-4 h-4 text-[#475569] absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-[#818cf8]" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm
                      placeholder:text-[#334155]
                      focus:outline-none focus:bg-white/[0.05] focus:border-[#6366f1]/50 focus:ring-2 focus:ring-[#6366f1]/20
                      transition-all duration-300"
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#475569] hover:text-[#818cf8] transition-colors p-0.5"
                    tabIndex={-1}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <AnimatePresence>
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-xs text-[#ef4444] mt-1.5 flex items-center gap-1"
                    >
                      <CircleAlert className="w-3 h-3" />
                      {errors.password.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Submit */}
              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  disabled={loginMutation.isPending}
                  className="w-full py-3.5 rounded-xl text-white text-sm font-semibold relative overflow-hidden
                    disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300
                    flex items-center justify-center gap-2"
                  whileHover={!loginMutation.isPending ? { y: -1, boxShadow: '0 8px 32px rgba(99,102,241,0.35)' } : {}}
                  whileTap={!loginMutation.isPending ? { scale: 0.985 } : {}}
                  style={{
                    background: isValid
                      ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)'
                      : 'linear-gradient(135deg, #374151 0%, #4b5563 100%)',
                  }}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                  <span className="relative z-10">
                    {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
                  </span>
                  {!loginMutation.isPending && <ArrowRight className="w-4 h-4 relative z-10" />}
                  {loginMutation.isPending && (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin relative z-10" />
                  )}
                </motion.button>
              </motion.div>

              {/* Status Messages */}
              <AnimatePresence>
                {loginMutation.isSuccess && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-[#22c55e] flex items-center gap-1.5 justify-center"
                  >
                    <CircleCheck className="w-3.5 h-3.5" />
                    Login successful. Redirecting...
                  </motion.p>
                )}
                {loginMutation.isError && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-[#ef4444] flex items-center gap-1.5 justify-center"
                  >
                    <CircleAlert className="w-3.5 h-3.5" />
                    {responseError || 'Unable to login right now. Please retry.'}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>

            {/* Footer */}
            <motion.p variants={itemVariants} className="text-sm text-[#64748b] mt-8 text-center">
              New to CollegeHub?{' '}
              <Link
                href="/register"
                className="text-[#818cf8] hover:text-[#a5b4fc] font-medium transition-colors relative
                  after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#818cf8]
                  hover:after:w-full after:transition-all after:duration-300"
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
