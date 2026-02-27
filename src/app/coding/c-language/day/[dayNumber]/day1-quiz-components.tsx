'use client';

/**
 * day1-quiz-components.tsx — Interactive Quiz Components for Day 1
 * MCQ Quiz, Short Answer Q&A, Long Format Q&A, and Flashcards
 */

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle, XCircle, ChevronDown, ChevronUp,
  HelpCircle, BookOpen, BrainCircuit, Award,
  RotateCcw, Sparkles, MessageSquareQuote, Lightbulb,
  ArrowRight, Trophy, Target, Zap, Eye, EyeOff,
} from 'lucide-react';
import type { MCQ, ShortQA, LongQA, PartQuizData } from './day1-quiz-data';

const PHASE_COLOR = '#22c55e';
const MONO_FONT = 'font-[family-name:var(--font-jetbrains)]';

/* ─── MCQ Quiz Component ─── */
export function MCQQuiz({ mcqs, partTitle }: { mcqs: MCQ[]; partTitle: string }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<boolean[]>(new Array(mcqs.length).fill(false));
  const [finished, setFinished] = useState(false);

  const handleSelect = useCallback((idx: number) => {
    if (answered[currentQ]) return;
    setSelected(idx);
    setShowExplanation(true);
    const newAnswered = [...answered];
    newAnswered[currentQ] = true;
    setAnswered(newAnswered);
    if (idx === mcqs[currentQ].correct) {
      setScore(prev => prev + 1);
    }
  }, [answered, currentQ, mcqs]);

  const handleNext = () => {
    if (currentQ < mcqs.length - 1) {
      setCurrentQ(prev => prev + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      setFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentQ(0);
    setSelected(null);
    setShowExplanation(false);
    setScore(0);
    setAnswered(new Array(mcqs.length).fill(false));
    setFinished(false);
  };

  if (finished) {
    const percentage = Math.round((score / mcqs.length) * 100);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#22c55e]/[0.06] to-[#3b82f6]/[0.04] p-6 sm:p-8 backdrop-blur-sm"
      >
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          >
            {percentage >= 80 ? (
              <Trophy className="w-16 h-16 mx-auto text-[#f59e0b]" />
            ) : percentage >= 60 ? (
              <Award className="w-16 h-16 mx-auto text-[#3b82f6]" />
            ) : (
              <Target className="w-16 h-16 mx-auto text-[#ef4444]" />
            )}
          </motion.div>
          <h4 className="text-white font-bold text-lg">Quiz Complete!</h4>
          <div className="flex items-center justify-center gap-2">
            <span className="text-3xl font-black" style={{ color: PHASE_COLOR }}>{score}</span>
            <span className="text-[#64748b] text-lg">/</span>
            <span className="text-3xl font-black text-white">{mcqs.length}</span>
          </div>
          <p className="text-sm text-[#94a3b8]">
            {percentage >= 80
              ? '🔥 Outstanding! You have a strong grip on the fundamentals.'
              : percentage >= 60
                ? '👍 Good effort! Review the explanations for missed questions.'
                : '📖 Keep studying! Re-read the section and try again.'}
          </p>
          <div className="w-full bg-white/[0.06] rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${PHASE_COLOR}, #3b82f6)` }}
            />
          </div>
          <motion.button
            onClick={handleReset}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 px-5 py-2.5 rounded-xl border border-white/[0.1] bg-white/[0.04] text-white text-xs font-semibold hover:bg-white/[0.08] transition-all flex items-center gap-2 mx-auto cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Retake Quiz
          </motion.button>
        </div>
      </motion.div>
    );
  }

  const q = mcqs[currentQ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#a855f7]/[0.04] to-[#3b82f6]/[0.03] p-5 sm:p-6 backdrop-blur-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-4.5 h-4.5 text-[#a855f7]" />
          <h4 className="text-white font-bold text-sm">MCQ Challenge</h4>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-[#64748b] font-mono">
            {currentQ + 1}/{mcqs.length}
          </span>
          <span className="flex items-center gap-1 text-[10px] font-bold" style={{ color: PHASE_COLOR }}>
            <Zap className="w-3 h-3" /> {score}
          </span>
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1 mb-5">
        {mcqs.map((_, i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full transition-all duration-300"
            style={{
              background: i === currentQ
                ? PHASE_COLOR
                : i < currentQ
                  ? `${PHASE_COLOR}60`
                  : 'rgba(255,255,255,0.06)',
            }}
          />
        ))}
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
        >
          <p className="text-[#e2e8f0] text-sm font-medium leading-relaxed mb-5">
            <span className="text-[#a855f7] font-bold mr-2">Q{currentQ + 1}.</span>
            {q.question}
          </p>

          {/* Options */}
          <div className="space-y-2.5">
            {q.options.map((opt, i) => {
              const isCorrect = i === q.correct;
              const isSelected = selected === i;
              const isAnswered = answered[currentQ];

              let borderColor = 'rgba(255,255,255,0.08)';
              let bgColor = 'rgba(255,255,255,0.02)';
              let textColor = '#b0bec5';

              if (isAnswered) {
                if (isCorrect) {
                  borderColor = `${PHASE_COLOR}60`;
                  bgColor = `${PHASE_COLOR}12`;
                  textColor = PHASE_COLOR;
                } else if (isSelected && !isCorrect) {
                  borderColor = '#ef444460';
                  bgColor = '#ef444412';
                  textColor = '#ef4444';
                }
              }

              return (
                <motion.button
                  key={i}
                  onClick={() => handleSelect(i)}
                  whileHover={!isAnswered ? { scale: 1.01, x: 4 } : {}}
                  whileTap={!isAnswered ? { scale: 0.99 } : {}}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-xs sm:text-sm leading-relaxed transition-all flex items-center gap-3 ${!isAnswered ? 'cursor-pointer hover:border-white/[0.15]' : 'cursor-default'}`}
                  style={{ borderColor, background: bgColor, color: textColor }}
                >
                  <span className="w-6 h-6 rounded-lg border flex items-center justify-center text-[10px] font-bold shrink-0"
                    style={{ borderColor, color: textColor }}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="flex-1">{opt}</span>
                  {isAnswered && isCorrect && <CheckCircle className="w-4 h-4 shrink-0" style={{ color: PHASE_COLOR }} />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-[#ef4444] shrink-0" />}
                </motion.button>
              );
            })}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 rounded-xl border border-[#f59e0b]/20 bg-[#f59e0b]/[0.06] p-4"
              >
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-[#f59e0b] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] text-[#f59e0b] font-bold uppercase tracking-wider mb-1">Explanation</p>
                    <p className="text-xs text-[#e2e8f0] leading-relaxed">{q.explanation}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Next Button */}
          {answered[currentQ] && (
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleNext}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-4 px-5 py-2.5 rounded-xl text-xs font-bold text-black flex items-center gap-2 ml-auto cursor-pointer"
              style={{ backgroundColor: PHASE_COLOR }}
            >
              {currentQ < mcqs.length - 1 ? (
                <>Next Question <ArrowRight className="w-3.5 h-3.5" /></>
              ) : (
                <>See Results <Trophy className="w-3.5 h-3.5" /></>
              )}
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Short Answer Q&A (Blur-to-Reveal) ─── */
export function ShortAnswerSection({ qas, partTitle }: { qas: ShortQA[]; partTitle: string }) {
  const [revealedSet, setRevealedSet] = useState<Set<number>>(new Set());

  const toggleReveal = useCallback((idx: number) => {
    setRevealedSet(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#3b82f6]/[0.04] to-transparent p-5 sm:p-6 backdrop-blur-sm"
    >
      <div className="flex items-center gap-2 mb-4">
        <MessageSquareQuote className="w-4.5 h-4.5 text-[#3b82f6]" />
        <h4 className={`text-white font-bold text-sm ${MONO_FONT} tracking-wide`}>Quick-Fire Q&A</h4>
        <span className={`ml-auto text-[10px] text-[#64748b] bg-white/[0.04] px-2 py-0.5 rounded-md ${MONO_FONT}`}>
          {qas.length} questions
        </span>
      </div>
      <div className="space-y-2.5">
        {qas.map((qa, i) => {
          const isRevealed = revealedSet.has(i);
          return (
          <motion.div key={i} layout className="rounded-xl border border-white/[0.06] overflow-hidden">
            {/* Question */}
            <div className="flex items-start gap-3 px-4 py-3">
              <HelpCircle className="w-4 h-4 text-[#3b82f6] mt-0.5 shrink-0" />
              <span className="text-xs sm:text-sm text-[#e2e8f0] leading-relaxed flex-1">
                {qa.question}
              </span>
            </div>

            {/* Answer — Blur-to-Reveal */}
            <div className="px-4 pb-4 pt-1 border-t border-white/[0.06]">
              <div className="relative">
                {/* Answer text with blur effect */}
                <motion.div
                  animate={{ filter: isRevealed ? 'blur(0px)' : 'blur(7px)' }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="select-none"
                  style={{ userSelect: isRevealed ? 'auto' : 'none' }}
                >
                  <div className="flex items-start gap-2 mt-2">
                    <Sparkles className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: PHASE_COLOR }} />
                    <p className="text-xs text-[#94a3b8] leading-relaxed">{qa.answer}</p>
                  </div>
                </motion.div>

                {/* Reveal overlay */}
                <AnimatePresence>
                  {!isRevealed && (
                    <motion.div
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex items-center justify-center cursor-pointer"
                      onClick={() => toggleReveal(i)}
                    >
                      <motion.button
                        whileHover={{ scale: 1.06, boxShadow: `0 0 20px ${PHASE_COLOR}40` }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border cursor-pointer"
                        style={{
                          background: `linear-gradient(135deg, ${PHASE_COLOR}15, ${PHASE_COLOR}08)`,
                          borderColor: `${PHASE_COLOR}40`,
                          color: PHASE_COLOR,
                          boxShadow: `0 0 12px ${PHASE_COLOR}20`,
                        }}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Reveal Answer
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Hide button */}
              {isRevealed && (
                <motion.button
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => toggleReveal(i)}
                  className="mt-2 text-[10px] text-[#64748b] hover:text-[#94a3b8] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <EyeOff className="w-3 h-3" /> Hide answer
                </motion.button>
              )}
            </div>
          </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ─── Long Format Q&A (Blur-to-Reveal) ─── */
export function LongFormatSection({ qas, partTitle }: { qas: LongQA[]; partTitle: string }) {
  const [revealedSet, setRevealedSet] = useState<Set<number>>(new Set());

  const toggleReveal = useCallback((idx: number) => {
    setRevealedSet(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#f59e0b]/[0.04] to-transparent p-5 sm:p-6 backdrop-blur-sm"
    >
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-4.5 h-4.5 text-[#f59e0b]" />
        <h4 className={`text-white font-bold text-sm ${MONO_FONT} tracking-wide`}>Deep-Dive Conceptual Q&A</h4>
      </div>
      <div className="space-y-3">
        {qas.map((qa, i) => {
          const isRevealed = revealedSet.has(i);
          return (
          <motion.div key={i} layout className="rounded-xl border border-[#f59e0b]/10 overflow-hidden bg-[#f59e0b]/[0.03]">
            {/* Question */}
            <div className="flex items-start gap-3 px-4 py-3.5">
              <span className="w-6 h-6 rounded-lg bg-[#f59e0b]/10 border border-[#f59e0b]/20 flex items-center justify-center text-[10px] font-bold text-[#f59e0b] shrink-0">
                {i + 1}
              </span>
              <span className="text-xs sm:text-sm text-[#e2e8f0] leading-relaxed flex-1 font-medium">
                {qa.question}
              </span>
            </div>

            {/* Answer — Blur-to-Reveal */}
            <div className="px-4 pb-5 pt-2 border-t border-[#f59e0b]/10">
              <div className="relative">
                <motion.div
                  animate={{ filter: isRevealed ? 'blur(0px)' : 'blur(8px)' }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{ userSelect: isRevealed ? 'auto' : 'none' }}
                >
                  <div className="rounded-xl bg-[#0d1117] border border-white/[0.06] p-4 mt-2">
                    <p className="text-xs text-[#b0bec5] leading-[1.8] whitespace-pre-line">{qa.answer}</p>
                  </div>
                </motion.div>

                {/* Reveal overlay */}
                <AnimatePresence>
                  {!isRevealed && (
                    <motion.div
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex items-center justify-center cursor-pointer"
                      onClick={() => toggleReveal(i)}
                    >
                      <motion.button
                        whileHover={{ scale: 1.06, boxShadow: '0 0 24px rgba(245,158,11,0.3)' }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold border cursor-pointer"
                        style={{
                          background: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.06))',
                          borderColor: 'rgba(245,158,11,0.4)',
                          color: '#f59e0b',
                          boxShadow: '0 0 16px rgba(245,158,11,0.15)',
                        }}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Reveal Deep Analysis
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {isRevealed && (
                <motion.button
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => toggleReveal(i)}
                  className="mt-2 text-[10px] text-[#64748b] hover:text-[#94a3b8] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <EyeOff className="w-3 h-3" /> Hide answer
                </motion.button>
              )}
            </div>
          </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ─── Combined Quiz Section (All 3 types) ─── */
export function QuizSection({ data }: { data: PartQuizData }) {
  const [activeTab, setActiveTab] = useState<'mcq' | 'short' | 'long'>('mcq');

  const tabs = [
    { id: 'mcq' as const, label: 'MCQ Challenge', icon: BrainCircuit, count: data.mcqs.length, color: '#a855f7' },
    { id: 'short' as const, label: 'Quick Q&A', icon: MessageSquareQuote, count: data.shortQAs.length, color: '#3b82f6' },
    { id: 'long' as const, label: 'Deep Dive', icon: BookOpen, count: data.longQAs.length, color: '#f59e0b' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="space-y-4"
    >
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ background: `${PHASE_COLOR}15`, border: `1px solid ${PHASE_COLOR}30` }}>
          <HelpCircle className="w-4 h-4" style={{ color: PHASE_COLOR }} />
        </div>
        <div>
          <h3 className={`text-white font-bold text-sm ${MONO_FONT} tracking-wide`}>
            Test Your Knowledge — {data.partTitle}
          </h3>
          <p className={`text-[10px] text-[#64748b] ${MONO_FONT}`}>
            {data.mcqs.length + data.shortQAs.length + data.longQAs.length} questions total
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map(tab => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'shadow-lg'
                : 'border-white/[0.08] bg-white/[0.02] text-[#94a3b8]'
            }`}
            style={activeTab === tab.id ? {
              borderColor: `${tab.color}50`,
              background: `${tab.color}12`,
              color: tab.color,
            } : {}}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
            <span className="text-[10px] opacity-60 ml-0.5">({tab.count})</span>
          </motion.button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'mcq' && <MCQQuiz mcqs={data.mcqs} partTitle={data.partTitle} />}
          {activeTab === 'short' && <ShortAnswerSection qas={data.shortQAs} partTitle={data.partTitle} />}
          {activeTab === 'long' && <LongFormatSection qas={data.longQAs} partTitle={data.partTitle} />}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
