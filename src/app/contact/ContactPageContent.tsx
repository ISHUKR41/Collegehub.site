/**
 * ContactPageContent.tsx - Contact page with production-ready form handling.
 *
 * This component uses React Hook Form + Zod validation and submits
 * real contact messages to backend APIs.
 */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Send,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  HelpCircle,
  ChevronDown,
  CircleCheck,
  CircleAlert,
  Map,
} from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import { contactFormSchema, ContactFormValues } from '@/utils/form-schemas';
import { useSubmitContactMutation } from '@/hooks/use-contact-mutations';

const CONTACT_INFO = [
  {
    icon: Mail,
    title: 'Email',
    value: 'hello@collegehub.site',
    description: 'We reply within 24 business hours.',
  },
  {
    icon: MapPin,
    title: 'Operations',
    value: 'India (Remote Team)',
    description: 'Serving students across India.',
  },
  {
    icon: Clock,
    title: 'Working Hours',
    value: 'Monday to Saturday, 9 AM to 6 PM IST',
    description: 'Support requests are processed during working hours.',
  },
  {
    icon: MessageSquare,
    title: 'Support Channel',
    value: 'Ticket by Contact Form',
    description: 'Best way to report issues or partnership inquiries.',
  },
];

const CONTACT_FAQ = [
  {
    q: 'How long does it take to get a response?',
    a: 'Most messages get a response within 24 business hours.',
  },
  {
    q: 'Can I request a specific course or language?',
    a: 'Yes. Share your request in the subject and message fields, and our curriculum team will review it.',
  },
  {
    q: 'How do I report a bug?',
    a: 'Select a clear subject like "Bug Report" and include steps to reproduce, expected behavior, and screenshots if possible.',
  },
  {
    q: 'Do you support school or institution partnerships?',
    a: 'Yes. Use the contact form with subject "Partnership" and include institution details.',
  },
];

export default function ContactPageContent() {
  const [faqOpen, setFaqOpen] = useState<number>(-1);
  const contactMutation = useSubmitContactMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    await contactMutation.mutateAsync({
      ...values,
      source: 'website',
    });
    reset();
  };

  return (
    <>
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-mesh" />
        <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-[#6366f1]/[0.05] blur-[120px]" />

        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <MessageSquare className="w-4 h-4 text-[#a5b4fc]" />
              <span className="text-sm text-[#a5b4fc] font-medium">Get in Touch</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-gradient">Contact Us</span>
            </h1>
            <p className="text-lg text-[#94a3b8] max-w-2xl mx-auto">
              Have questions, feedback, or partnership ideas? Send us a message and we
              will get back to you.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="name" className="text-sm font-medium text-[#94a3b8] mb-2 block">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-[#64748b] focus:outline-none focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1]/50 transition-all"
                    {...register('name')}
                  />
                  {errors.name && (
                    <p className="text-xs text-[#ef4444] mt-1.5">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="text-sm font-medium text-[#94a3b8] mb-2 block">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-[#64748b] focus:outline-none focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1]/50 transition-all"
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="text-xs text-[#ef4444] mt-1.5">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="subject" className="text-sm font-medium text-[#94a3b8] mb-2 block">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="How can we help?"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-[#64748b] focus:outline-none focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1]/50 transition-all"
                    {...register('subject')}
                  />
                  {errors.subject && (
                    <p className="text-xs text-[#ef4444] mt-1.5">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="text-sm font-medium text-[#94a3b8] mb-2 block">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Share details so we can help you quickly."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-[#64748b] focus:outline-none focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1]/50 transition-all resize-none"
                    {...register('message')}
                  />
                  {errors.message && (
                    <p className="text-xs text-[#ef4444] mt-1.5">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-semibold text-sm hover:shadow-[0_0_24px_rgba(99,102,241,0.4)] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span>{contactMutation.isPending ? 'Sending...' : 'Send Message'}</span>
                  <Send className="w-4 h-4" />
                </button>

                {contactMutation.isSuccess && (
                  <p className="text-sm text-[#22c55e] flex items-center gap-2">
                    <CircleCheck className="w-4 h-4" />
                    Message submitted successfully.
                  </p>
                )}

                {contactMutation.isError && (
                  <p className="text-sm text-[#ef4444] flex items-center gap-2">
                    <CircleAlert className="w-4 h-4" />
                    Unable to submit right now. Please retry.
                  </p>
                )}
              </form>
            </motion.div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
              {CONTACT_INFO.map((item, index) => {
                const Icon = item.icon;
                return (
                  <GlassCard key={item.title} delay={index * 0.08} className="!p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#6366f1]/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[#a5b4fc]" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                        <p className="text-sm text-[#a5b4fc]">{item.value}</p>
                        <p className="text-xs text-[#64748b] mt-1">{item.description}</p>
                      </div>
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-custom">
          <SectionHeading
            label="Office Map"
            title="Service Coverage"
            subtitle="CollegeHub operates remotely and supports learners across India."
          />

          <GlassCard className="!p-0 overflow-hidden" hover={false}>
            <div className="relative h-72 md:h-80 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#0b1120]">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.25),_transparent_60%)]" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <Map className="w-8 h-8 text-[#a5b4fc] mb-3" />
                <p className="text-white font-semibold mb-1">India-Wide Learning Platform</p>
                <p className="text-sm text-[#94a3b8] max-w-md">
                  Team collaboration is remote-first, enabling us to support students
                  from all regions with consistent response times.
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-custom">
          <SectionHeading
            label="Help"
            title="Common Questions"
            subtitle="Quick answers about support and communication."
          />

          <div className="max-w-3xl mx-auto space-y-3">
            {CONTACT_FAQ.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden"
              >
                <button
                  onClick={() => setFaqOpen(faqOpen === index ? -1 : index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className="flex items-center gap-3 text-sm font-semibold text-white pr-4">
                    <HelpCircle className="w-4 h-4 text-[#a5b4fc] flex-shrink-0" />
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#64748b] transition-transform duration-200 ${
                      faqOpen === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {faqOpen === index && (
                  <div className="px-5 pb-5 text-sm text-[#94a3b8] border-t border-white/5 pt-4 ml-7">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
