/**
 * Newsletter.tsx - Newsletter CTA with real subscription API integration.
 */

'use client';

import { motion } from 'framer-motion';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Mail, ArrowRight, Bell, CircleCheck, CircleAlert } from 'lucide-react';
import { newsletterFormSchema, NewsletterFormValues } from '@/utils/form-schemas';
import { useNewsletterSubscriptionMutation } from '@/hooks/use-contact-mutations';

export default function Newsletter() {
  const subscribeMutation = useNewsletterSubscriptionMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterFormSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (values: NewsletterFormValues) => {
    await subscribeMutation.mutateAsync({
      email: values.email,
      source: 'landing',
    });
    reset();
  };

  return (
    <section className="section-padding relative" aria-label="Newsletter signup">
      <div className="container-custom">
        <motion.div
          className="relative rounded-3xl p-8 md:p-12 lg:p-16 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/20 via-[#8b5cf6]/10 to-transparent" />
          <div className="absolute inset-0 border border-[#6366f1]/20 rounded-3xl" />
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[#6366f1]/10 blur-[80px]" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-[#8b5cf6]/10 blur-[80px]" />

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-[#6366f1]/10 border border-[#6366f1]/20 flex items-center justify-center mx-auto mb-6">
              <Bell className="w-7 h-7 text-[#a5b4fc]" />
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-[#94a3b8] text-base mb-8 leading-relaxed">
              Join thousands of students who are already mastering their subjects
              and coding skills. Get notified about new courses and features.
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              noValidate
            >
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-[#64748b] focus:outline-none focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1]/50 transition-all"
                  {...register('email')}
                />
              </div>
              <button
                type="submit"
                disabled={subscribeMutation.isPending}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-semibold text-sm hover:shadow-[0_0_24px_rgba(99,102,241,0.4)] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span>{subscribeMutation.isPending ? 'Submitting...' : 'Subscribe'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {errors.email && (
              <p className="text-xs text-[#ef4444] mt-2">{errors.email.message}</p>
            )}

            {subscribeMutation.isSuccess && (
              <p className="text-xs text-[#22c55e] mt-2 inline-flex items-center gap-1">
                <CircleCheck className="w-3.5 h-3.5" />
                Subscription confirmed.
              </p>
            )}

            {subscribeMutation.isError && (
              <p className="text-xs text-[#ef4444] mt-2 inline-flex items-center gap-1">
                <CircleAlert className="w-3.5 h-3.5" />
                Unable to subscribe right now.
              </p>
            )}

            <p className="text-xs text-[#64748b] mt-3">No spam. Unsubscribe anytime.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
