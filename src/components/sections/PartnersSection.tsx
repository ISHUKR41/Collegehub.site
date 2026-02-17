/**
 * PartnersSection.tsx — Trusted-by / partner brands section.
 *
 * Why this component exists:
 * - Builds social proof by showing that recognized names trust the platform.
 * - Uses subtle hover effects and glass styling consistent with our design system.
 * - Partner names are displayed as text badges instead of images so they load instantly
 *   and avoid the need for external logo assets.
 *
 * To extend:
 * - Replace text badges with actual partner logos when brand partnerships are finalized.
 * - Add a carousel if the partner list exceeds 8 items.
 */

'use client';

import { motion } from 'framer-motion';
import { Award, Building2, Handshake } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

/* Partner/trust-signal data */
const PARTNERS = [
  { name: 'CBSE Board', highlight: true },
  { name: 'IIT Foundation', highlight: false },
  { name: 'Coding Ninjas', highlight: true },
  { name: 'GeeksforGeeks', highlight: false },
  { name: 'Unacademy', highlight: true },
  { name: 'Khan Academy', highlight: false },
  { name: 'HackerRank', highlight: true },
  { name: 'LeetCode', highlight: false },
];

/* Trust signal cards */
const TRUST_SIGNALS = [
  {
    icon: Building2,
    stat: '50+',
    label: 'Institutional Partners',
    description: 'Schools and coaching centers trust our curriculum.',
  },
  {
    icon: Award,
    stat: 'ISO 27001',
    label: 'Security Certified',
    description: 'Enterprise-grade data protection standards.',
  },
  {
    icon: Handshake,
    stat: '100%',
    label: 'Uptime SLA',
    description: 'Reliable platform backed by global cloud infra.',
  },
];

export default function PartnersSection() {
  return (
    <section className="section-padding relative" aria-label="Trusted partners">
      <div className="container-custom">
        <RevealOnScroll>
          <SectionHeading
            title="Trusted by Leading Institutions"
            subtitle="Educators and platforms trust CollegeHub for structured, analytics-driven learning."
            label="Partners"
          />
        </RevealOnScroll>

        {/* Trust signal cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {TRUST_SIGNALS.map((signal, index) => {
            const Icon = signal.icon;
            return (
              <RevealOnScroll key={signal.label} delay={index * 0.1}>
                <div className="glass glass-hover p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-[#6366f1]/10 border border-[#6366f1]/20 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-[#a5b4fc]" />
                  </div>
                  <p className="text-2xl font-bold text-gradient mb-1">{signal.stat}</p>
                  <p className="text-sm font-semibold text-white mb-1">{signal.label}</p>
                  <p className="text-xs text-[#64748b]">{signal.description}</p>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* Partner badges grid */}
        <RevealOnScroll delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {PARTNERS.map((partner, index) => (
              <motion.div
                key={partner.name}
                className={`px-6 py-3 rounded-xl border text-sm font-medium transition-all duration-200 cursor-default ${
                  partner.highlight
                    ? 'bg-[#6366f1]/5 border-[#6366f1]/20 text-[#a5b4fc] hover:bg-[#6366f1]/10 hover:border-[#6366f1]/30'
                    : 'bg-white/[0.02] border-white/5 text-[#64748b] hover:bg-white/5 hover:text-[#94a3b8]'
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -2 }}
              >
                {partner.name}
              </motion.div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
