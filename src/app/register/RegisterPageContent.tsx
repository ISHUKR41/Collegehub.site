/**
 * RegisterPageContent.tsx — Ultra-modern, premium signup experience.
 *
 * Design features:
 * - Split panel: animated branding left, glass form right.
 * - Framer-motion stagger animations on every element.
 * - Password strength meter with live feedback.
 * - Password visibility toggles for both fields.
 * - Google OAuth button with premium style.
 * - Field validation dot indicators.
 * - Animated gradient submit button.
 */

'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  User,
  Sparkles,
  Zap,
  BarChart3,
  Brain,
  Rocket,
} from 'lucide-react';
import { register as registerUser } from '@/services/auth-service';
import { registerFormSchema, RegisterFormValues } from '@/utils/form-schemas';

/* ── Animation Variants ────────────────────────────────── */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const pulseVariants: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.5, 0.8, 0.5],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
};

/* ── Steps for Branding Panel ────────────────────────── */
const STEPS = [
  { icon: Zap, text: 'Pick school or coding track', color: '#fbbf24' },
  { icon: Brain, text: 'Learn at your own pace', color: '#a5b4fc' },
  { icon: BarChart3, text: 'Get real-time analytics', color: '#67e8f9' },
  { icon: Rocket, text: 'Ace your exams & interviews', color: '#86efac' },
];

/* ── Password Strength Helper ────────────────────────── */
const getPasswordStrength = (pw: string) => {
  if (!pw) return { score: 0, label: '', color: '' };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^a-zA-Z0-9]/.test(pw)) score++;

  const map = [
    { label: '', color: '' },
    { label: 'Weak', color: '#ef4444' },
    { label: 'Fair', color: '#f97316' },
    { label: 'Good', color: '#eab308' },
    { label: 'Strong', color: '#22c55e' },
  ];
  return { score, ...map[score] };
};

export default function RegisterPageContent() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, dirtyFields },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    mode: 'onChange',
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  const passwordValue = watch('password', '');
  const strength = useMemo(() => getPasswordStrength(passwordValue), [passwordValue]);

  const registerMutation = useMutation({
    mutationFn: (values: RegisterFormValues) =>
      registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
        role: 'student',
      }),
    onSuccess: () => router.push('/dashboard'),
  });

  const onSubmit = async (values: RegisterFormValues) => {
    await registerMutation.mutateAsync(values);
  };

  const responseError =
    registerMutation.error instanceof AxiosError
      ? (registerMutation.error.response?.data as { message?: string } | undefined)?.message
      : 'Unable to create account right now. Please retry.';

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  return (
    <section className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* ── Ambient Background ── */}
      <div className="absolute inset-0 bg-[#060611]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(139,92,246,0.12)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(99,102,241,0.08)_0%,_transparent_50%)]" />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-[10%] right-[15%] w-80 h-80 rounded-full bg-[#8b5cf6]/[0.06] blur-[100px]"
        variants={pulseVariants}
        animate="animate"
      />
      <motion.div
        className="absolute bottom-[15%] left-[10%] w-72 h-72 rounded-full bg-[#6366f1]/[0.05] blur-[120px]"
        variants={pulseVariants}
        animate="animate"
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
          className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-white/[0.06] shadow-[0_0_80px_rgba(139,92,246,0.08)]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* ═══ LEFT — Branding Panel ═══ */}
          <motion.div
            className="hidden lg:flex flex-col justify-between p-10 xl:p-12 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0d0d20 0%, #15133a 50%, #0e0e2d 100%)' }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-[#8b5cf6]/[0.08] rounded-full blur-[80px]" />
            <div className="absolute bottom-0 right-0 w-52 h-52 bg-[#6366f1]/[0.06] rounded-full blur-[60px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 border border-white/[0.04] rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 border border-white/[0.03] rounded-full" />

            {/* Logo */}
            <div className="relative z-10">
              <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#6366f1] flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.4)]">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white tracking-tight">CollegeHub</span>
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="text-3xl xl:text-4xl font-bold text-white leading-tight mb-4"
              >
                Start Your
                <br />
                <span className="bg-gradient-to-r from-[#c084fc] via-[#a78bfa] to-[#818cf8] bg-clip-text text-transparent">
                  Learning Adventure
                </span>
              </motion.h2>

              <motion.p variants={itemVariants} className="text-[#94a3b8] text-sm leading-relaxed max-w-sm">
                Join thousands of students mastering school subjects and programming with structured
                tracks, smart analytics, and real progress.
              </motion.p>
            </div>

            {/* Steps */}
            <motion.div variants={itemVariants} className="relative z-10 space-y-3 my-8">
              {STEPS.map((s, i) => (
                <motion.div
                  key={s.text}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                  whileHover={{ x: 6, backgroundColor: 'rgba(255,255,255,0.06)' }}
                >
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{ backgroundColor: `${s.color}15`, color: s.color, border: `1px solid ${s.color}30` }}
                  >
                    {i + 1}
                  </div>
                  <span className="text-sm text-[#cbd5e1] font-medium">{s.text}</span>
                  <s.icon className="w-4 h-4 ml-auto" style={{ color: `${s.color}80` }} />
                </motion.div>
              ))}
            </motion.div>

            {/* Trust badges */}
            <motion.div variants={itemVariants} className="relative z-10 flex items-center gap-3">
              <div className="flex -space-x-2">
                {['#6366f1', '#8b5cf6', '#a78bfa', '#c084fc'].map((c, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2 border-[#0d0d20] flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ backgroundColor: c }}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <span className="text-xs text-[#64748b]">10K+ students already learning</span>
            </motion.div>
          </motion.div>

          {/* ═══ RIGHT — Register Form ═══ */}
          <motion.div
            className="relative p-7 md:p-10 xl:p-12 bg-[#0a0a18]/90 backdrop-blur-2xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Mobile logo */}
            <motion.div variants={itemVariants} className="lg:hidden flex items-center gap-2.5 mb-8">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#6366f1] flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">CollegeHub</span>
            </motion.div>

            {/* Header */}
            <motion.div variants={itemVariants} className="mb-7">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
                Create your account
              </h1>
              <p className="text-sm text-[#94a3b8]">
                It&apos;s free — start learning in under a minute
              </p>
            </motion.div>

            {/* Google OAuth */}
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
            <motion.div variants={itemVariants} className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <span className="text-xs text-[#475569] font-medium uppercase tracking-widest">or</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              {/* Name */}
              <motion.div variants={itemVariants}>
                <label htmlFor="name" className="text-xs font-semibold text-[#94a3b8] mb-2 block uppercase tracking-wider">
                  Full Name
                </label>
                <div className="relative group">
                  <User className="w-4 h-4 text-[#475569] absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-[#818cf8]" />
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your full name"
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm
                      placeholder:text-[#334155]
                      focus:outline-none focus:bg-white/[0.05] focus:border-[#6366f1]/50 focus:ring-2 focus:ring-[#6366f1]/20
                      transition-all duration-300"
                    {...register('name')}
                  />
                  {dirtyFields.name && !errors.name && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#22c55e]" />
                  )}
                </div>
                <AnimatePresence>
                  {errors.name && (
                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-xs text-[#ef4444] mt-1.5 flex items-center gap-1">
                      <CircleAlert className="w-3 h-3" /> {errors.name.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

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
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm
                      placeholder:text-[#334155]
                      focus:outline-none focus:bg-white/[0.05] focus:border-[#6366f1]/50 focus:ring-2 focus:ring-[#6366f1]/20
                      transition-all duration-300"
                    {...register('email')}
                  />
                  {dirtyFields.email && !errors.email && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#22c55e]" />
                  )}
                </div>
                <AnimatePresence>
                  {errors.email && (
                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-xs text-[#ef4444] mt-1.5 flex items-center gap-1">
                      <CircleAlert className="w-3 h-3" /> {errors.email.message}
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
                    autoComplete="new-password"
                    placeholder="Min. 8 characters"
                    className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm
                      placeholder:text-[#334155]
                      focus:outline-none focus:bg-white/[0.05] focus:border-[#6366f1]/50 focus:ring-2 focus:ring-[#6366f1]/20
                      transition-all duration-300"
                    {...register('password')}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#475569] hover:text-[#818cf8] transition-colors p-0.5" tabIndex={-1} aria-label={showPassword ? 'Hide' : 'Show'}>
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {/* Strength meter */}
                <AnimatePresence>
                  {passwordValue.length > 0 && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-2 space-y-1.5">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((i) => (
                          <motion.div
                            key={i}
                            className="h-1 flex-1 rounded-full"
                            initial={{ scaleX: 0 }}
                            animate={{
                              scaleX: 1,
                              backgroundColor: i <= strength.score ? strength.color : 'rgba(255,255,255,0.06)',
                            }}
                            transition={{ duration: 0.3, delay: i * 0.05 }}
                            style={{ transformOrigin: 'left' }}
                          />
                        ))}
                      </div>
                      <p className="text-[10px] font-medium" style={{ color: strength.color }}>
                        {strength.label}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {errors.password && (
                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-xs text-[#ef4444] mt-1.5 flex items-center gap-1">
                      <CircleAlert className="w-3 h-3" /> {errors.password.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Confirm Password */}
              <motion.div variants={itemVariants}>
                <label htmlFor="confirmPassword" className="text-xs font-semibold text-[#94a3b8] mb-2 block uppercase tracking-wider">
                  Confirm Password
                </label>
                <div className="relative group">
                  <Lock className="w-4 h-4 text-[#475569] absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-[#818cf8]" />
                  <input
                    id="confirmPassword"
                    type={showConfirm ? 'text' : 'password'}
                    autoComplete="new-password"
                    placeholder="Re-enter password"
                    className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm
                      placeholder:text-[#334155]
                      focus:outline-none focus:bg-white/[0.05] focus:border-[#6366f1]/50 focus:ring-2 focus:ring-[#6366f1]/20
                      transition-all duration-300"
                    {...register('confirmPassword')}
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#475569] hover:text-[#818cf8] transition-colors p-0.5" tabIndex={-1} aria-label={showConfirm ? 'Hide' : 'Show'}>
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <AnimatePresence>
                  {errors.confirmPassword && (
                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-xs text-[#ef4444] mt-1.5 flex items-center gap-1">
                      <CircleAlert className="w-3 h-3" /> {errors.confirmPassword.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Submit */}
              <motion.div variants={itemVariants} className="pt-1">
                <motion.button
                  type="submit"
                  disabled={registerMutation.isPending}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#8b5cf6] via-[#7c3aed] to-[#6366f1] text-white text-sm font-semibold relative overflow-hidden
                    disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300
                    flex items-center justify-center gap-2"
                  whileHover={!registerMutation.isPending ? { y: -1, boxShadow: '0 8px 32px rgba(139,92,246,0.35)' } : {}}
                  whileTap={!registerMutation.isPending ? { scale: 0.985 } : {}}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                  <span className="relative z-10">
                    {registerMutation.isPending ? 'Creating account...' : 'Create Account'}
                  </span>
                  {!registerMutation.isPending && <ArrowRight className="w-4 h-4 relative z-10" />}
                  {registerMutation.isPending && (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin relative z-10" />
                  )}
                </motion.button>
              </motion.div>

              {/* Status Messages */}
              <AnimatePresence>
                {registerMutation.isSuccess && (
                  <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs text-[#22c55e] flex items-center gap-1.5 justify-center">
                    <CircleCheck className="w-3.5 h-3.5" /> Account created! Redirecting...
                  </motion.p>
                )}
                {registerMutation.isError && (
                  <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs text-[#ef4444] flex items-center gap-1.5 justify-center">
                    <CircleAlert className="w-3.5 h-3.5" /> {responseError}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>

            {/* Footer */}
            <motion.p variants={itemVariants} className="text-sm text-[#64748b] mt-7 text-center">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-[#818cf8] hover:text-[#a5b4fc] font-medium transition-colors relative
                  after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#818cf8]
                  hover:after:w-full after:transition-all after:duration-300"
              >
                Sign in
              </Link>
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
