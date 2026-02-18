/**
 * RegisterPageContent.tsx — Professional sign-up page.
 *
 * Clean design — no emojis, no generic AI patterns.
 * Split panel: subtle branding left, clean form right.
 * Password strength meter preserved (good UX).
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
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
} from 'lucide-react';
import { getPublicApiBaseUrl } from '@/lib/api-client';
import { register as registerApi } from '@/services/auth-service';
import { registerFormSchema, RegisterFormValues } from '@/utils/form-schemas';

/* Animations */
const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.06 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
};

/* Password strength */
function getPasswordStrength(pw: string): { score: number; label: string; color: string } {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  if (score <= 1) return { score, label: 'Weak', color: '#ef4444' };
  if (score <= 2) return { score, label: 'Fair', color: '#f59e0b' };
  if (score <= 3) return { score, label: 'Good', color: '#3b82f6' };
  return { score, label: 'Strong', color: '#22c55e' };
}

export default function RegisterPageContent() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    mode: 'onChange',
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  const passwordValue = useWatch({ control, name: 'password' }) || '';
  const strength = getPasswordStrength(passwordValue);

  const registerMutation = useMutation({
    mutationFn: async (values: RegisterFormValues) => {
      const payload = {
        name: values.name,
        email: values.email,
        password: values.password,
      };
      return registerApi(payload);
    },
    onSuccess: () => router.push('/dashboard'),
  });

  const onSubmit = async (values: RegisterFormValues) => {
    await registerMutation.mutateAsync(values);
  };

  const responseError =
    registerMutation.error instanceof AxiosError
      ? (registerMutation.error.response?.data as { message?: string } | undefined)?.message
      : 'Registration failed. Please try again.';

  const apiUrl = getPublicApiBaseUrl();

  return (
    <section className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 bg-[#05070d]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(20,184,166,0.10)_0%,_transparent_58%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(14,116,144,0.08)_0%,_transparent_60%)]" />

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
                Start your<br />learning journey
              </motion.h2>

              <motion.p variants={item} className="text-[#94a3b8] text-sm leading-relaxed max-w-sm">
                Create your free account and get access to courses, coding challenges, and a supportive community.
              </motion.p>
            </div>

            <motion.div variants={item} className="relative z-10 space-y-3 mt-auto pt-8">
              {[
                'Access all courses for free',
                'In-browser code editor — no setup needed',
                'Track your progress across devices',
              ].map((text) => (
                <div key={text} className="flex items-center gap-3">
                  <CircleCheck className="w-4 h-4 text-[#22c55e] flex-shrink-0" />
                  <span className="text-sm text-[#94a3b8]">{text}</span>
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
            <motion.div variants={item} className="mb-7">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-[#94a3b8]">
                Join thousands of students learning every day
              </p>
            </motion.div>

            {/* Google button */}
            <motion.a
              variants={item}
              href={`${apiUrl}/auth/google`}
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
            <motion.div variants={item} className="flex items-center gap-4 my-5">
              <div className="flex-1 h-px bg-white/[0.06]" />
              <span className="text-[11px] text-[#475569] font-medium uppercase tracking-wider">or</span>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5" noValidate>
              {/* Name */}
              <motion.div variants={item}>
                <label htmlFor="name" className="text-xs font-medium text-[#94a3b8] mb-1.5 block">
                  Full Name
                </label>
                <div className="relative group">
                  <User className="w-4 h-4 text-[#475569] absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-[#14b8a6]" />
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your full name"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm
                      placeholder:text-[#334155]
                      focus:outline-none focus:bg-white/[0.04] focus:border-[#14b8a6]/50 focus:ring-1 focus:ring-[#14b8a6]/20
                      transition-all duration-200"
                    {...register('name')}
                  />
                </div>
                <AnimatePresence>
                  {errors.name && (
                    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="text-xs text-[#ef4444] mt-1 flex items-center gap-1">
                      <CircleAlert className="w-3 h-3" /> {errors.name.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

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
                </div>
                <AnimatePresence>
                  {errors.email && (
                    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="text-xs text-[#ef4444] mt-1 flex items-center gap-1">
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
                    autoComplete="new-password"
                    placeholder="Create a strong password"
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

                {/* Password strength bar */}
                {passwordValue.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-2"
                  >
                    <div className="flex gap-1.5 mb-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className="h-1 flex-1 rounded-full transition-colors duration-300"
                          style={{
                            backgroundColor:
                              level <= strength.score ? strength.color : 'rgba(255,255,255,0.06)',
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] font-medium" style={{ color: strength.color }}>
                      {strength.label}
                    </span>
                  </motion.div>
                )}

                <AnimatePresence>
                  {errors.password && (
                    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="text-xs text-[#ef4444] mt-1 flex items-center gap-1">
                      <CircleAlert className="w-3 h-3" /> {errors.password.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Confirm Password */}
              <motion.div variants={item}>
                <label htmlFor="confirmPassword" className="text-xs font-medium text-[#94a3b8] mb-1.5 block">
                  Confirm Password
                </label>
                <div className="relative group">
                  <Lock className="w-4 h-4 text-[#475569] absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-[#14b8a6]" />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    placeholder="Re-enter your password"
                    className="w-full pl-11 pr-12 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm
                      placeholder:text-[#334155]
                      focus:outline-none focus:bg-white/[0.04] focus:border-[#14b8a6]/50 focus:ring-1 focus:ring-[#14b8a6]/20
                      transition-all duration-200"
                    {...register('confirmPassword')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#475569] hover:text-[#94a3b8] transition-colors"
                    tabIndex={-1}
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <AnimatePresence>
                  {errors.confirmPassword && (
                    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="text-xs text-[#ef4444] mt-1 flex items-center gap-1">
                      <CircleAlert className="w-3 h-3" /> {errors.confirmPassword.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Submit */}
              <motion.div variants={item} className="pt-1">
                <motion.button
                  type="submit"
                  disabled={registerMutation.isPending}
                  className="w-full py-3 rounded-xl text-white text-sm font-semibold relative overflow-hidden
                    disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200
                    flex items-center justify-center gap-2"
                  whileHover={!registerMutation.isPending ? { y: -1 } : {}}
                  whileTap={!registerMutation.isPending ? { scale: 0.985 } : {}}
                  style={{
                    background: isValid
                      ? 'linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)'
                      : 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                  }}
                >
                  <span>{registerMutation.isPending ? 'Creating account...' : 'Create Account'}</span>
                  {!registerMutation.isPending && <ArrowRight className="w-4 h-4" />}
                  {registerMutation.isPending && (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  )}
                </motion.button>
              </motion.div>

              {/* Status */}
              <AnimatePresence>
                {registerMutation.isSuccess && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xs text-[#22c55e] flex items-center gap-1.5 justify-center">
                    <CircleCheck className="w-3.5 h-3.5" /> Account created. Redirecting...
                  </motion.p>
                )}
                {registerMutation.isError && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xs text-[#ef4444] flex items-center gap-1.5 justify-center">
                    <CircleAlert className="w-3.5 h-3.5" /> {responseError || 'Registration failed. Please try again.'}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>

            {/* Footer */}
            <motion.p variants={item} className="text-sm text-[#64748b] mt-7 text-center">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-[#2dd4bf] hover:text-white font-medium transition-colors"
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
