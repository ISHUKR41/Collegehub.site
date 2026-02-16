/**
 * RegisterPageContent.tsx - Account creation form.
 *
 * Behavior:
 * - Validates credentials with Zod.
 * - Calls backend registration endpoint.
 * - Stores access token through auth service.
 * - Redirects to dashboard on success.
 */

'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  ArrowRight,
  CircleAlert,
  CircleCheck,
  Lock,
  Mail,
  User,
} from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { register as registerUser } from '@/services/auth-service';
import { registerFormSchema, RegisterFormValues } from '@/utils/form-schemas';

export default function RegisterPageContent() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const registerMutation = useMutation({
    mutationFn: (values: RegisterFormValues) =>
      registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
        role: 'student',
      }),
    onSuccess: () => {
      router.push('/dashboard');
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    await registerMutation.mutateAsync(values);
  };

  const responseError =
    registerMutation.error instanceof AxiosError
      ? (registerMutation.error.response?.data as { message?: string } | undefined)?.message
      : 'Unable to create account right now. Please retry.';

  return (
    <section className="min-h-screen pt-28 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[460px] h-[460px] rounded-full bg-[#8b5cf6]/[0.08] blur-[130px]" />

      <div className="container-custom relative z-10 max-w-xl">
        <GlassCard className="!p-7 md:!p-8" hover={false}>
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Create Account
            </h1>
            <p className="text-sm text-[#94a3b8]">
              Join CollegeHub to start school and coding learning paths with
              progress analytics.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div>
              <label htmlFor="name" className="text-sm font-medium text-[#94a3b8] mb-2 block">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#64748b] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your full name"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-[#64748b] focus:outline-none focus:ring-1 focus:ring-[#6366f1]/50 focus:border-[#6366f1] transition-all"
                  {...register('name')}
                />
              </div>
              {errors.name && (
                <p className="text-xs text-[#ef4444] mt-1.5">{errors.name.message}</p>
              )}
            </div>

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
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-[#64748b] focus:outline-none focus:ring-1 focus:ring-[#6366f1]/50 focus:border-[#6366f1] transition-all"
                  {...register('password')}
                />
              </div>
              {errors.password && (
                <p className="text-xs text-[#ef4444] mt-1.5">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-[#94a3b8] mb-2 block"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#64748b] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Re-enter your password"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-[#64748b] focus:outline-none focus:ring-1 focus:ring-[#6366f1]/50 focus:border-[#6366f1] transition-all"
                  {...register('confirmPassword')}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-[#ef4444] mt-1.5">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={registerMutation.isPending}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white text-sm font-semibold hover:shadow-[0_0_24px_rgba(99,102,241,0.35)] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span>{registerMutation.isPending ? 'Creating...' : 'Create Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {registerMutation.isSuccess && (
              <p className="text-xs text-[#22c55e] inline-flex items-center gap-1.5">
                <CircleCheck className="w-3.5 h-3.5" />
                Account created. Redirecting to dashboard...
              </p>
            )}

            {registerMutation.isError && (
              <p className="text-xs text-[#ef4444] inline-flex items-center gap-1.5">
                <CircleAlert className="w-3.5 h-3.5" />
                {responseError || 'Unable to create account right now. Please retry.'}
              </p>
            )}
          </form>

          <p className="text-sm text-[#94a3b8] mt-6 text-center">
            Already have an account?{' '}
            <Link href="/login" className="text-[#a5b4fc] hover:text-white transition-colors">
              Login
            </Link>
          </p>
        </GlassCard>
      </div>
    </section>
  );
}
