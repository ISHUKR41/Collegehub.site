/**
 * ProblemPlayground.tsx — LeetCode-style split panel
 *
 * Left:  Problem description (question, topics, hints, expected output)
 * Right: Multi-language code editor + I/O
 * Mobile: stacked vertically
 */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen, Target, Sparkles, Lightbulb,
  X, Maximize2, Minimize2, CheckCircle2
} from 'lucide-react';
import CodeEditor from './CodeEditorWrapper';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface ProblemData {
  day: number;
  title: string;
  topics: string[];
  subtopics: string[];
  exercises: string[];
  goal: string;
  starterCode: string;
  phaseColor: string;
  phaseName: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

interface PlaygroundProps {
  problem: ProblemData;
  onClose: () => void;
}

export default function ProblemPlayground({ problem, onClose }: PlaygroundProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showHints, setShowHints] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`${
        isFullscreen
          ? 'fixed inset-0 z-[100] bg-[#0a0e17]'
          : 'relative'
      }`}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0d1117] border-b border-white/10">
        <div className="flex items-center gap-3">
          <div
            className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
            style={{ backgroundColor: `${problem.phaseColor}20`, color: problem.phaseColor }}
          >
            Day {problem.day}
          </div>
          <span className="text-sm font-semibold text-white truncate max-w-[200px] sm:max-w-none">
            {problem.title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-lg text-[#64748b] hover:text-white hover:bg-white/5 transition-all"
            title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[#64748b] hover:text-[#ef4444] hover:bg-white/5 transition-all"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Split Panel */}
      <div className={`flex flex-col lg:flex-row ${isFullscreen ? 'h-[calc(100vh-52px)]' : ''}`}>
        {/* ─── Left Panel: Problem Description ─── */}
        <div
          className={`${
            isFullscreen ? 'lg:w-[40%]' : 'lg:w-[40%]'
          } border-b lg:border-b-0 lg:border-r border-white/10 overflow-y-auto`}
          style={{ maxHeight: isFullscreen ? 'calc(100vh - 52px)' : '600px' }}
        >
          <div className="p-5 sm:p-6 space-y-6">
            {/* Title & Phase */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: problem.phaseColor }}
                >
                  {problem.phaseName}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Day {problem.day}: {problem.title}
              </h2>
            </div>

            {/* Topics */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-[#6366f1]" />
                <span className="text-sm font-semibold text-white">Topics to Cover</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {problem.topics.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all hover:scale-105"
                    style={{
                      borderColor: `${problem.phaseColor}30`,
                      backgroundColor: `${problem.phaseColor}08`,
                      color: problem.phaseColor,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Subtopics */}
            {problem.subtopics.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-4 h-4 text-[#f59e0b]" />
                  <span className="text-sm font-semibold text-white">Deep Dive Concepts</span>
                </div>
                <ul className="space-y-2">
                  {problem.subtopics.map((s) => (
                    <li key={s} className="flex items-start gap-2.5 text-sm text-[#94a3b8]">
                      <CheckCircle2
                        className="w-4 h-4 flex-shrink-0 mt-0.5"
                        style={{ color: problem.phaseColor }}
                      />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Exercises */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-[#ec4899]" />
                <span className="text-sm font-semibold text-white">Practice Problems</span>
              </div>
              <ul className="space-y-2.5">
                {problem.exercises.map((e, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-sm text-[#c8d0db]"
                  >
                    <span
                      className="flex items-center justify-center w-6 h-6 rounded-lg text-xs font-bold flex-shrink-0"
                      style={{ backgroundColor: `${problem.phaseColor}20`, color: problem.phaseColor }}
                    >
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{e}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hints */}
            <div>
              <button
                onClick={() => setShowHints(!showHints)}
                className="flex items-center gap-2 text-sm font-medium text-[#f59e0b] hover:text-[#fbbf24] transition-colors"
              >
                <Lightbulb className="w-4 h-4" />
                {showHints ? 'Hide Hint' : 'Show Hint'}
              </button>
              {showHints && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 p-4 rounded-xl bg-[#f59e0b]/[0.05] border border-[#f59e0b]/20"
                >
                  <p className="text-sm text-[#f59e0b]/80">
                    💡 Start with the starter code provided in the editor. Focus on understanding
                    each concept from the topics above before solving the exercises. Break the problem
                    down into smaller steps — think before you type!
                  </p>
                </motion.div>
              )}
            </div>

            {/* Goal */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08]">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-[#22c55e]" />
                <span className="text-sm font-semibold text-white">Today&apos;s Goal</span>
              </div>
              <p className="text-sm text-[#94a3b8]">{problem.goal}</p>
            </div>
          </div>
        </div>

        {/* ─── Right Panel: Code Editor ─── */}
        <div className={`${isFullscreen ? 'lg:w-[60%]' : 'lg:w-[60%]'} flex flex-col`}>
          <CodeEditor
            defaultCode={problem.starterCode}
            defaultLanguage="c"
            title={`Day ${problem.day} — ${problem.title}`}
            height={isFullscreen ? 'calc(100vh - 342px)' : '350px'}
          />
        </div>
      </div>
    </motion.div>
  );
}
