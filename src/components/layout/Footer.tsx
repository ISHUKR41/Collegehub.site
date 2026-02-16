/**
 * Footer.tsx - Site footer with real newsletter integration and link groups.
 */

'use client';

import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  GraduationCap,
  Mail,
  ArrowRight,
  Github,
  Linkedin,
  Instagram,
  Youtube,
  Twitter,
  CircleCheck,
} from 'lucide-react';
import { SITE_CONFIG, FOOTER_LINKS } from '@/lib/constants';
import { newsletterFormSchema, NewsletterFormValues } from '@/utils/form-schemas';
import { useNewsletterSubscriptionMutation } from '@/hooks/use-contact-mutations';

export default function Footer() {
  const subscribeMutation = useNewsletterSubscriptionMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: NewsletterFormValues) => {
    await subscribeMutation.mutateAsync({
      email: values.email,
      source: 'website',
    });
    reset();
  };

  return (
    <footer className="relative border-t border-white/5" role="contentinfo">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-[#6366f1]/30 to-transparent" />

      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="max-w-md">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold text-gradient">CollegeHub</span>
            </Link>
            <p className="text-[#94a3b8] text-sm leading-relaxed mb-6">{SITE_CONFIG.description}</p>
            <div className="flex items-center gap-3">
              {[
                { Icon: Twitter, href: SITE_CONFIG.social.twitter, label: 'Twitter' },
                { Icon: Github, href: SITE_CONFIG.social.github, label: 'GitHub' },
                { Icon: Linkedin, href: SITE_CONFIG.social.linkedin, label: 'LinkedIn' },
                { Icon: Instagram, href: SITE_CONFIG.social.instagram, label: 'Instagram' },
                { Icon: Youtube, href: SITE_CONFIG.social.youtube, label: 'YouTube' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-[#64748b] hover:text-white hover:bg-white/10 hover:border-[#6366f1]/30 transition-all duration-200"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:ml-auto max-w-md w-full">
            <h3 className="text-lg font-semibold text-white mb-2">Stay Updated</h3>
            <p className="text-[#94a3b8] text-sm mb-4">
              Get notified about new courses, releases, and learning updates.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2" noValidate>
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-[#64748b] focus:outline-none focus:border-[#6366f1] transition-colors"
                  {...register('email')}
                />
              </div>
              <button
                type="submit"
                disabled={subscribeMutation.isPending}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white text-sm font-semibold hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-200 flex items-center gap-1 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span>{subscribeMutation.isPending ? 'Saving...' : 'Subscribe'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            {errors.email && (
              <p className="text-xs text-[#ef4444] mt-2">{errors.email.message}</p>
            )}
            {subscribeMutation.isSuccess && (
              <p className="text-xs text-[#22c55e] mt-2 inline-flex items-center gap-1">
                <CircleCheck className="w-3.5 h-3.5" />
                Subscription saved.
              </p>
            )}
          </div>
        </div>

        <div className="divider-gradient mb-12" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Platform</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.platform.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[#94a3b8] hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[#94a3b8] hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Resources</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[#94a3b8] hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[#94a3b8] hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="divider-gradient mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748b]">
          <p>&copy; {new Date().getFullYear()} CollegeHub. All rights reserved.</p>
          <p>Built for outcome-driven learners across India</p>
        </div>
      </div>
    </footer>
  );
}
