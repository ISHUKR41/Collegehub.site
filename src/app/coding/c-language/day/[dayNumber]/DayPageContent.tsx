/**
 * DayPageContent.tsx - Dedicated day page for C Mastery roadmap.
 */

'use client';

import { useCallback, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Target,
  Layers,
  Code2,
  ArrowLeft,
  CheckCircle2,
  Hash,
  Play,
  GraduationCap,
} from 'lucide-react';
import CodeEditor from '@/components/coding/CodeEditorWrapper';
import type { DayData, PhaseData } from '@/lib/c-mastery-data';

interface Props {
  day: DayData;
  phase: PhaseData;
  totalDays: number;
}

export default function DayPageContent({ day, phase, totalDays }: Props) {
  const editorRef = useRef<HTMLDivElement>(null);

  const scrollToEditor = useCallback(() => {
    editorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const hasPrev = day.day > 1;
  const hasNext = day.day < totalDays;
  const progress = Math.round((day.day / totalDays) * 100);

  return (
    <div className="min-h-screen bg-[#0a0a12]">
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[160px] opacity-[0.05]"
          style={{ backgroundColor: phase.color }}
        />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[#6366f1]/[0.03] blur-[140px]" />
      </div>

      <div className="relative z-10">
        <div className="border-b border-white/[0.06]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-sm">
                <Link href="/coding/c-language" className="flex items-center gap-1.5 text-[#64748b] hover:text-white transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">C Mastery Blueprint</span>
                  <span className="sm:hidden">Back</span>
                </Link>
                <span className="text-[#334155]">/</span>
                <span className="text-xs font-medium px-2 py-0.5 rounded-md" style={{ backgroundColor: `${phase.color}15`, color: phase.color }}>
                  {phase.name}
                </span>
                <span className="text-[#334155]">/</span>
                <span className="text-[#94a3b8] font-medium">Day {day.day}</span>
              </div>

              <div className="hidden sm:flex items-center gap-3">
                <span className="text-xs text-[#475569]">{progress}% complete</span>
                <div className="w-24 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: phase.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="pt-10 sm:pt-14 pb-8 sm:pb-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0, duration: 0.45, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row sm:items-start gap-5"
            >
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${phase.color}12`, border: `1px solid ${phase.color}25` }}
              >
                <span className="text-2xl sm:text-3xl font-bold" style={{ color: phase.color }}>
                  D{day.day}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md" style={{ backgroundColor: `${phase.color}15`, color: phase.color }}>
                    Phase {phase.id} - {phase.name}
                  </span>
                  <span className="text-xs text-[#475569]">Day {day.day} of {totalDays}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">{day.title}</h1>
                <p className="text-[#94a3b8] text-sm sm:text-base max-w-2xl leading-relaxed">{day.goal}</p>

                <button
                  onClick={scrollToEditor}
                  className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-black transition-all hover:scale-[1.03] active:scale-[0.97]"
                  style={{ backgroundColor: phase.color }}
                >
                  <Play className="w-4 h-4" />
                  Start Practicing
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="pb-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06, duration: 0.45, ease: 'easeOut' }}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6"
              >
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${phase.color}12` }}>
                    <BookOpen className="w-4 h-4" style={{ color: phase.color }} />
                  </div>
                  <h2 className="text-lg font-bold text-white">Topics</h2>
                  <span className="text-xs text-[#475569] ml-auto">{day.topics.length} topics</span>
                </div>
                <ul className="space-y-3">
                  {day.topics.map((topic, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div
                        className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold"
                        style={{ backgroundColor: `${phase.color}12`, color: phase.color }}
                      >
                        {index + 1}
                      </div>
                      <span className="text-sm text-[#c8d0db] leading-relaxed">{topic}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {day.subtopics.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12, duration: 0.45, ease: 'easeOut' }}
                  className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6"
                >
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${phase.color}12` }}>
                      <Layers className="w-4 h-4" style={{ color: phase.color }} />
                    </div>
                    <h2 className="text-lg font-bold text-white">Subtopics</h2>
                    <span className="text-xs text-[#475569] ml-auto">{day.subtopics.length} concepts</span>
                  </div>
                  <ul className="space-y-3">
                    {day.subtopics.map((subtopic, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: phase.color }} />
                        <span className="text-sm text-[#c8d0db] leading-relaxed">{subtopic}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        <section className="pb-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.45, ease: 'easeOut' }}
            >
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${phase.color}12` }}>
                  <Target className="w-4 h-4" style={{ color: phase.color }} />
                </div>
                <h2 className="text-lg font-bold text-white">Practice Exercises</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {day.exercises.map((exercise, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                  >
                    <span
                      className="flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold flex-shrink-0"
                      style={{ backgroundColor: `${phase.color}15`, color: phase.color }}
                    >
                      {index + 1}
                    </span>
                    <span className="text-sm text-[#c8d0db] leading-relaxed pt-0.5">{exercise}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <h3 className="text-sm font-semibold text-white mb-1.5">Instructor Flow</h3>
                <p className="text-xs text-[#94a3b8] leading-relaxed">
                  Is day page par aap direct topic explanation, concept examples, aur coding task sequence de sakte
                  hain. Student ko step-by-step yahin se guide karein, fir niche editor mein hands-on karwayein.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="pb-10" ref={editorRef}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.45, ease: 'easeOut' }}
            >
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${phase.color}12` }}>
                  <Code2 className="w-4 h-4" style={{ color: phase.color }} />
                </div>
                <h2 className="text-lg font-bold text-white">Code Playground</h2>
                <span className="text-xs text-[#475569] ml-1">C, C++, Java, Python</span>
              </div>

              <div className="rounded-2xl border border-white/[0.08] overflow-hidden bg-[#0d1117]">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-[38%] border-b lg:border-b-0 lg:border-r border-white/[0.08] overflow-y-auto lg:max-h-[600px]">
                    <div className="p-5 space-y-5">
                      <div className="flex items-center gap-2">
                        <span
                          className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md"
                          style={{ backgroundColor: `${phase.color}15`, color: phase.color }}
                        >
                          Day {day.day}
                        </span>
                        <span className="text-sm font-semibold text-white">{day.title}</span>
                      </div>

                      <div>
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#64748b] mb-2">Topics</h3>
                        <div className="flex flex-wrap gap-1.5">
                          {day.topics.map((topic) => (
                            <span
                              key={topic}
                              className="px-2 py-1 rounded-md text-[11px] border"
                              style={{
                                borderColor: `${phase.color}20`,
                                backgroundColor: `${phase.color}06`,
                                color: `${phase.color}cc`,
                              }}
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#64748b] mb-2">Questions</h3>
                        <ul className="space-y-2">
                          {day.exercises.map((exercise, index) => (
                            <li key={index} className="flex items-start gap-2 text-xs text-[#94a3b8]">
                              <Hash className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: phase.color }} />
                              {exercise}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <GraduationCap className="w-3.5 h-3.5 text-[#22c55e]" />
                          <span className="text-xs font-semibold text-white">Goal</span>
                        </div>
                        <p className="text-xs text-[#94a3b8] leading-relaxed">{day.goal}</p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-[62%] flex flex-col">
                    <CodeEditor
                      defaultCode={day.starterCode}
                      defaultLanguage="c"
                      title={`Day ${day.day} - ${day.title}`}
                      height="420px"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="pb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.45, ease: 'easeOut' }}
              className="flex items-center justify-between"
            >
              {hasPrev ? (
                <Link
                  href={`/coding/c-language/day/${day.day - 1}`}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] text-sm font-medium text-[#94a3b8] hover:text-white hover:bg-white/[0.05] hover:border-white/[0.14] transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Day {day.day - 1}
                </Link>
              ) : (
                <div />
              )}

              {hasNext ? (
                <Link
                  href={`/coding/c-language/day/${day.day + 1}`}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-black transition-all hover:scale-[1.03] active:scale-[0.97]"
                  style={{ backgroundColor: phase.color }}
                >
                  Day {day.day + 1}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              ) : (
                <div className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#22c55e] text-sm font-semibold text-black">
                  <CheckCircle2 className="w-4 h-4" />
                  Course Complete
                </div>
              )}
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
