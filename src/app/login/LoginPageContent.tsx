/**
 * LoginPageContent.tsx - Auth login form with resume-aware redirect.
 *
 * Behavior:
 * - Submits real credentials to backend.
 * - Stores access token via auth service.
 * - Redirects to requested route, latest resume course, or dashboard.
 */

'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ArrowRight, CircleAlert, CircleCheck, Lock, Mail } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { login } from '@/services/auth-service';
import { loginFormSchema, LoginFormValues } from '@/utils/form-schemas';

const normalizeNextPath = (value: string | null) => {
  if (!value) return null;
  if (!value.startsWith('/')) return null;
  if (value.startsWith('//')) return null;
  return value;
};

interface LoginPageContentProps {
  initialNextPath: string | null;
}

export default function LoginPageContent({ initialNextPath }: LoginPageContentProps) {
  const router = useRouter();
  const nextPath = normalizeNextPath(initialNextPath);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (payload) => {
      if (nextPath) {
        router.push(nextPath);
        return;
      }

      if (payload.resume?.courseId) {
        router.push(`/courses/${payload.resume.courseId}`);
        return;
      }

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

  return (
    <section className="min-h-screen pt-28 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full bg-[#6366f1]/[0.08] blur-[120px]" />

      <div className="container-custom relative z-10 max-w-xl">
        <GlassCard className="!p-7 md:!p-8" hover={false}>
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Welcome Back
            </h1>
            <p className="text-sm text-[#94a3b8]">
              Login to continue your learning progress and dashboard analytics.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-[#94a3b8] mb-2 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#64748b] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-[#64748b] focus:outline-none focus:ring-1 focus:ring-[#6366f1]/50 focus:border-[#6366f1] transition-all"
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-[#ef4444] mt-1.5">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium text-[#94a3b8] mb-2 block">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#64748b] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-[#64748b] focus:outline-none focus:ring-1 focus:ring-[#6366f1]/50 focus:border-[#6366f1] transition-all"
                  {...register('password')}
                />
              </div>
              {errors.password && (
                <p className="text-xs text-[#ef4444] mt-1.5">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white text-sm font-semibold hover:shadow-[0_0_24px_rgba(99,102,241,0.35)] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span>{loginMutation.isPending ? 'Signing in...' : 'Login'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {loginMutation.isSuccess && (
              <p className="text-xs text-[#22c55e] inline-flex items-center gap-1.5">
                <CircleCheck className="w-3.5 h-3.5" />
                Login successful. Redirecting...
              </p>
            )}

            {loginMutation.isError && (
              <p className="text-xs text-[#ef4444] inline-flex items-center gap-1.5">
                <CircleAlert className="w-3.5 h-3.5" />
                {responseError || 'Unable to login right now. Please retry.'}
              </p>
            )}
          </form>

          <p className="text-sm text-[#94a3b8] mt-6 text-center">
            New to CollegeHub?{' '}
            <Link href="/register" className="text-[#a5b4fc] hover:text-white transition-colors">
              Create account
            </Link>
          </p>
        </GlassCard>
      </div>
    </section>
  );
}
