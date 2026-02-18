/**
 * CLangPageContent.tsx - 40-Day C Mastery roadmap overview.
 *
 * Design intent:
 * - Explicit D1..D40 visibility in vertical phase rails.
 * - Every day opens a dedicated page (no popup flow).
 */

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { ComponentType, CSSProperties } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Brain,
  Calendar,
  Code2,
  Cpu,
  Dumbbell,
  Layers,
  Target,
  Trophy,
} from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import { C_MASTERY_PHASES, type DayData, type PhaseData } from '@/lib/c-mastery-data';

const PHASE_ICONS: Record<string, ComponentType<{ className?: string; style?: CSSProperties }>> = {
  Brain,
  Dumbbell,
  Layers,
  Cpu,
  Trophy,
};

function DayRailLink({ day, phaseColor }: { day: DayData; phaseColor: string }) {
  return (
    <Link
      href={`/coding/c-language/day/${day.day}`}
      className="group flex items-start gap-4 rounded-xl border border-white/[0.07] bg-[#0c1220]/60 p-4 hover:border-white/[0.16] hover:bg-[#0f1729] transition-all duration-200"
    >
      <div
        className="w-12 h-12 rounded-xl border flex items-center justify-center text-sm font-extrabold tracking-wide flex-shrink-0"
        style={{
          color: phaseColor,
          borderColor: `${phaseColor}50`,
          backgroundColor: `${phaseColor}12`,
        }}
      >
        D{day.day}
      </div>

      <div className="min-w-0 flex-1">
        <h4 className="text-white text-sm sm:text-base font-semibold leading-tight group-hover:text-[#e2e8f0] transition-colors">
          {day.title}
        </h4>
        <p className="mt-1 text-xs text-[#94a3b8] line-clamp-2">
          {day.topics.slice(0, 2).join(' | ')}
          {day.topics.length > 2 ? ` | +${day.topics.length - 2} more` : ''}
        </p>
      </div>

      <ArrowUpRight className="w-4 h-4 text-[#64748b] group-hover:text-white transition-colors flex-shrink-0 mt-0.5" />
    </Link>
  );
}

function PhaseBlock({ phase }: { phase: PhaseData }) {
  const Icon = PHASE_ICONS[phase.icon] || Brain;

  return (
    <RevealOnScroll>
      <section
        id={`phase-${phase.id}`}
        className="rounded-2xl border border-white/[0.08] bg-[linear-gradient(180deg,rgba(15,23,42,0.7),rgba(15,23,42,0.35))] p-5 sm:p-7 mb-8"
      >
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center border"
            style={{
              borderColor: `${phase.color}45`,
              backgroundColor: `${phase.color}14`,
            }}
          >
            <Icon className="w-6 h-6" style={{ color: phase.color }} />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="text-[11px] uppercase tracking-[0.12em] font-bold px-2.5 py-1 rounded-full"
                style={{ backgroundColor: `${phase.color}18`, color: phase.color }}
              >
                Phase {phase.id}
              </span>
              <span className="text-xs text-[#64748b]">
                Day {phase.dayRange[0]}-{phase.dayRange[1]}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">{phase.name}</h3>
            <p className="text-sm text-[#94a3b8]">{phase.tagline}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          {phase.days.map((day) => (
            <Link
              key={day.day}
              href={`/coding/c-language/day/${day.day}`}
              className="px-2.5 py-1 rounded-md text-xs font-semibold border transition-colors hover:text-white"
              style={{
                borderColor: `${phase.color}35`,
                backgroundColor: `${phase.color}10`,
                color: `${phase.color}dd`,
              }}
            >
              D{day.day}
            </Link>
          ))}
        </div>

        <div className="space-y-3 border-l border-white/[0.08] pl-4 sm:pl-5">
          {phase.days.map((day) => (
            <DayRailLink key={day.day} day={day} phaseColor={phase.color} />
          ))}
        </div>
      </section>
    </RevealOnScroll>
  );
}

export default function CLangPageContent() {
  const totalDays = C_MASTERY_PHASES.reduce((sum, phase) => sum + phase.days.length, 0);

  return (
    <>
      <section className="relative pt-32 md:pt-36 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-mesh" />
        <div className="absolute top-24 left-1/3 w-[440px] h-[440px] bg-[#22c55e]/[0.05] rounded-full blur-[130px]" />
        <div className="absolute bottom-0 right-1/4 w-[380px] h-[380px] bg-[#3b82f6]/[0.05] rounded-full blur-[110px]" />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] mb-5">
              <Code2 className="w-4 h-4 text-[#a3e635]" />
              <span className="text-sm font-medium text-[#d9f99d]">C Language Blueprint</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold text-white leading-[1.1]">
              40-Day C Mastery
              <span className="block text-[#94a3b8] text-2xl sm:text-4xl mt-1">
                One Day, One Dedicated Page
              </span>
            </h1>

            <p className="mt-5 text-[#cbd5e1] text-sm sm:text-base leading-relaxed max-w-2xl">
              Har day (D1 se D40) ka apna separate lesson page hai. Day par click karte hi
              direct naya page open hoga jahan aap topics explain, practice, aur test flow chalenge.
            </p>

            <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: Calendar, label: 'Days', value: totalDays },
                { icon: Layers, label: 'Phases', value: C_MASTERY_PHASES.length },
                { icon: BookOpen, label: 'Topic Blocks', value: '40+' },
                { icon: Target, label: 'Exercises', value: '150+' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-white/[0.08] bg-[#0f172a]/65 px-3 py-3"
                >
                  <item.icon className="w-4 h-4 text-[#93c5fd] mb-1.5" />
                  <p className="text-lg font-bold text-white leading-none">{item.value}</p>
                  <p className="text-[11px] uppercase tracking-wide text-[#64748b] mt-1">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/coding/c-language/day/1"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#22c55e] text-black text-sm font-bold hover:bg-[#16a34a] transition-colors"
              >
                Start With Day 1
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#roadmap"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/[0.14] text-white text-sm font-semibold hover:bg-white/[0.05] transition-colors"
              >
                View Full Day List
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding pt-8" id="roadmap">
        <div className="container-custom">
          <RevealOnScroll>
            <SectionHeading
              label="Roadmap"
              title="Phase-Wise Day Rails"
              subtitle="Brain Reset ke niche D1-D5, phir same flow D40 tak. Every row opens a dedicated day page."
            />
          </RevealOnScroll>

          <div className="flex flex-wrap gap-2 mb-6">
            {C_MASTERY_PHASES.map((phase) => (
              <a
                key={phase.id}
                href={`#phase-${phase.id}`}
                className="px-3 py-2 rounded-lg border text-xs font-semibold transition-colors hover:text-white"
                style={{
                  borderColor: `${phase.color}40`,
                  color: `${phase.color}dd`,
                  backgroundColor: `${phase.color}10`,
                }}
              >
                Phase {phase.id}: {phase.name}
              </a>
            ))}
          </div>

          {C_MASTERY_PHASES.map((phase) => (
            <PhaseBlock key={phase.id} phase={phase} />
          ))}
        </div>
      </section>
    </>
  );
}