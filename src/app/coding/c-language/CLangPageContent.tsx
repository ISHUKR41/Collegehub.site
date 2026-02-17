/**
 * CLangPageContent.tsx — 40-Day C Mastery Blueprint (client component)
 *
 * Sections:
 * 1. Hero with animated gradient
 * 2. Phase overview cards
 * 3. Day-by-day expandable accordion
 * 4. LeetCode-style ProblemPlayground (opens when "Practice Now" is clicked)
 * 5. Standalone Code Editor (always visible)
 * 6. Results & CTA
 */

'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, Dumbbell, Layers, Cpu, Trophy,
  ChevronDown, BookOpen, Target, Code2,
  Sparkles, ArrowRight, Calendar, CheckCircle2
} from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import CodeEditor from '@/components/coding/CodeEditorWrapper';
import ProblemPlayground from '@/components/coding/ProblemPlayground';
import type { ProblemData } from '@/components/coding/ProblemPlayground';
import { C_MASTERY_PHASES, type PhaseData, type DayData } from '@/lib/c-mastery-data';

/* Phase icon mapping */
const PHASE_ICONS: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Brain, Dumbbell, Layers, Cpu, Trophy,
};

/* ------------------------------------------------------------------ */
/*  Day Accordion Item                                                 */
/* ------------------------------------------------------------------ */

function DayItem({
  day,
  phaseColor,
  phaseName,
  onPractice,
}: {
  day: DayData;
  phaseColor: string;
  phaseName: string;
  onPractice: (day: DayData, phaseName: string, phaseColor: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 p-4 sm:p-5 text-left hover:bg-white/[0.02] transition-colors"
      >
        <div
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm sm:text-base"
          style={{ backgroundColor: `${phaseColor}20`, color: phaseColor }}
        >
          {day.day}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-white text-sm sm:text-base">{day.title}</h4>
          <p className="text-xs text-[#64748b] mt-0.5 truncate">
            {day.topics.slice(0, 3).join(' • ')}
          </p>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-5 h-5 text-[#64748b]" />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-5 pb-5 space-y-4">
              {/* Topics */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4" style={{ color: phaseColor }} />
                  <span className="text-sm font-semibold text-white">Topics</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {day.topics.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-lg text-xs bg-white/5 border border-white/5 text-[#94a3b8]">{t}</span>
                  ))}
                </div>
              </div>

              {/* Subtopics */}
              {day.subtopics.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Layers className="w-4 h-4" style={{ color: phaseColor }} />
                    <span className="text-sm font-semibold text-white">Deep Dive</span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {day.subtopics.map((s) => (
                      <li key={s} className="flex items-center gap-2 text-xs text-[#94a3b8]">
                        <CheckCircle2 className="w-3 h-3 flex-shrink-0" style={{ color: phaseColor }} />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Exercises */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4" style={{ color: phaseColor }} />
                  <span className="text-sm font-semibold text-white">Exercises</span>
                </div>
                <ul className="space-y-1.5">
                  {day.exercises.map((e, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-[#94a3b8]">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5" style={{ color: phaseColor }}>
                        {i + 1}
                      </span>
                      {e}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Goal & Practice */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-white/5">
                <p className="text-xs text-[#64748b] italic">
                  <Sparkles className="w-3 h-3 inline mr-1" style={{ color: phaseColor }} />
                  Goal: {day.goal}
                </p>
                <button
                  onClick={() => onPractice(day, phaseName, phaseColor)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-black transition-all hover:scale-105"
                  style={{ backgroundColor: phaseColor }}
                >
                  <Code2 className="w-4 h-4" />
                  Practice Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Phase Section                                                      */
/* ------------------------------------------------------------------ */

function PhaseSection({
  phase,
  onPractice,
}: {
  phase: PhaseData;
  onPractice: (day: DayData, phaseName: string, phaseColor: string) => void;
}) {
  const Icon = PHASE_ICONS[phase.icon] || Brain;

  return (
    <RevealOnScroll>
      <div className="mb-14" id={`phase-${phase.id}`}>
        {/* Phase header */}
        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: `${phase.color}15` }}
          >
            <Icon className="w-7 h-7" style={{ color: phase.color }} />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span
                className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                style={{ backgroundColor: `${phase.color}20`, color: phase.color }}
              >
                Phase {phase.id}
              </span>
              <span className="text-xs text-[#64748b]">
                Day {phase.dayRange[0]}–{phase.dayRange[1]}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">{phase.name}</h3>
            <p className="text-sm text-[#94a3b8] mt-0.5">{phase.tagline}</p>
          </div>
        </div>

        {/* Day items */}
        <div className="space-y-3 pl-0 sm:pl-4">
          {phase.days.map((day) => (
            <DayItem
              key={day.day}
              day={day}
              phaseColor={phase.color}
              phaseName={phase.name}
              onPractice={onPractice}
            />
          ))}
        </div>
      </div>
    </RevealOnScroll>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page Component                                                */
/* ------------------------------------------------------------------ */

export default function CLangPageContent() {
  const [activeProblem, setActiveProblem] = useState<ProblemData | null>(null);
  const playgroundRef = useRef<HTMLDivElement>(null);

  const handlePractice = useCallback(
    (day: DayData, phaseName: string, phaseColor: string) => {
      setActiveProblem({
        day: day.day,
        title: day.title,
        topics: day.topics,
        subtopics: day.subtopics,
        exercises: day.exercises,
        goal: day.goal,
        starterCode: day.starterCode,
        phaseColor,
        phaseName,
      });
      setTimeout(() => {
        playgroundRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    },
    [],
  );

  const closePlayground = useCallback(() => {
    setActiveProblem(null);
  }, []);

  const totalDays = C_MASTERY_PHASES.reduce((sum, p) => sum + p.days.length, 0);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-mesh" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#A8B9CC]/[0.04] blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-[#22c55e]/[0.04] blur-[120px]" />

        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <Code2 className="w-4 h-4 text-[#A8B9CC]" />
              <span className="text-sm text-[#A8B9CC] font-medium">C Language Mastery</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#A8B9CC] via-white to-[#22c55e] bg-clip-text text-transparent">
                40-Day C Mastery
              </span>
              <br />
              <span className="text-white text-3xl md:text-4xl lg:text-5xl">Blueprint</span>
            </h1>
            <p className="text-lg text-[#94a3b8] max-w-2xl mx-auto mb-8">
              Zero → Strong Thinker → System-Level Programmer. Master C with structured daily lessons,
              hands-on exercises, and an in-browser code editor. No external tools needed.
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center gap-6 sm:gap-10 flex-wrap">
              {[
                { label: 'Days', value: totalDays, icon: Calendar },
                { label: 'Phases', value: C_MASTERY_PHASES.length, icon: Layers },
                { label: 'Exercises', value: '150+', icon: Target },
                { label: 'Projects', value: '3+', icon: Sparkles },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <stat.icon className="w-5 h-5 mx-auto mb-1 text-[#A8B9CC]" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-[#64748b]">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Phase Overview Cards */}
      <section className="section-padding" id="phases">
        <div className="container-custom">
          <RevealOnScroll>
            <SectionHeading
              label="Phases"
              title="5 Mental Phases"
              subtitle="A proven progression from complete beginner to interview-ready C programmer."
            />
          </RevealOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {C_MASTERY_PHASES.map((phase, index) => {
              const Icon = PHASE_ICONS[phase.icon] || Brain;
              return (
                <GlassCard key={phase.id} delay={index * 0.08}>
                  <a href={`#phase-${phase.id}`} className="block group">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${phase.color}15` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: phase.color }} />
                    </div>
                    <h3 className="text-base font-bold text-white mb-1">{phase.name}</h3>
                    <p className="text-xs text-[#64748b] mb-2">
                      Day {phase.dayRange[0]}–{phase.dayRange[1]} • {phase.days.length} days
                    </p>
                    <p className="text-xs text-[#94a3b8] line-clamp-2">{phase.tagline}</p>
                    <div className="mt-3 flex items-center gap-1 text-xs text-[#6366f1] group-hover:text-white transition-colors">
                      View days <ArrowRight className="w-3 h-3" />
                    </div>
                  </a>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Day-by-Day Breakdown */}
      <section className="section-padding" id="blueprint">
        <div className="container-custom">
          <RevealOnScroll>
            <SectionHeading
              label="Blueprint"
              title="Day-by-Day Breakdown"
              subtitle="Click any day to expand. Hit 'Practice Now' to open the LeetCode-style coding playground."
            />
          </RevealOnScroll>

          {C_MASTERY_PHASES.map((phase) => (
            <PhaseSection key={phase.id} phase={phase} onPractice={handlePractice} />
          ))}
        </div>
      </section>

      {/* LeetCode-style Problem Playground (conditional) */}
      <div ref={playgroundRef}>
        <AnimatePresence>
          {activeProblem && (
            <section className="section-padding" id="playground-section">
              <div className="container-custom">
                <RevealOnScroll>
                  <SectionHeading
                    label="Playground"
                    title="Solve & Practice"
                    subtitle="LeetCode-style environment. Question on left, editor on right. Choose any language."
                  />
                </RevealOnScroll>
                <div className="rounded-2xl border border-white/10 overflow-hidden">
                  <ProblemPlayground problem={activeProblem} onClose={closePlayground} />
                </div>
              </div>
            </section>
          )}
        </AnimatePresence>
      </div>

      {/* Standalone Code Editor (always visible) */}
      <section className="section-padding" id="code-editor-section">
        <div className="container-custom">
          <RevealOnScroll>
            <SectionHeading
              label="Practice"
              title="Free Code Editor"
              subtitle="Write code in C, C++, Java, or Python — compile and run directly in your browser."
            />
          </RevealOnScroll>

          <div className="max-w-4xl mx-auto">
            <CodeEditor
              title="main.c"
              defaultLanguage="c"
            />
          </div>
        </div>
      </section>

      {/* Result After 40 Days */}
      <section className="section-padding">
        <div className="container-custom">
          <RevealOnScroll>
            <SectionHeading
              label="Result"
              title="After 40 Days You Will"
              subtitle="Complete this blueprint and gain real, interview-ready C skills."
            />
          </RevealOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { text: 'Think logically & break problems down', color: '#22c55e' },
              { text: 'Understand memory, pointers & DMA', color: '#3b82f6' },
              { text: 'Write structured, modular C code', color: '#f59e0b' },
              { text: 'Handle files & data persistence', color: '#ef4444' },
              { text: 'Understand compilation & build systems', color: '#a855f7' },
              { text: 'Solve interview-level coding problems', color: '#ec4899' },
            ].map((item, i) => (
              <GlassCard key={i} delay={i * 0.06}>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: item.color }} />
                  <span className="text-sm text-white">{item.text}</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Master C?
            </h2>
            <p className="text-[#94a3b8] mb-8 max-w-lg mx-auto">
              Start from Day 1, follow the blueprint, practice in the editor. No external tools needed.
            </p>
            <button
              onClick={() => {
                const firstPhase = C_MASTERY_PHASES[0];
                handlePractice(firstPhase.days[0], firstPhase.name, firstPhase.color);
              }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#A8B9CC] to-[#22c55e] text-black font-bold text-base hover:scale-105 transition-transform"
            >
              <Code2 className="w-5 h-5" />
              Start Day 1 Now
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
