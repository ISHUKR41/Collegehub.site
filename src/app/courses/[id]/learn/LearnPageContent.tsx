/**
 * LearnPageContent.tsx — Immersive full-screen lesson viewer.
 *
 * Design decisions:
 * - Full viewport height, no page scroll — sidebar + main content split.
 * - Sidebar shows course structure with lock/complete/active indicators.
 * - Main area shows lesson content, mark-complete, and prev/next navigation.
 * - Keyboard shortcuts: ArrowLeft/Right for prev/next lesson.
 * - Progress bar at top showing overall completion.
 * - "Back to course" link exits immersive mode.
 */

'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  ExternalLink,
  LayoutDashboard,
  Lock,
  Menu,
  PlayCircle,
  X,
} from 'lucide-react';
import { useCourseDetailQuery } from '@/hooks/use-course-detail-query';
import {
  useCompleteLessonMutation,
  useCourseProgressQuery,
  useUpdateLastWatchedMutation,
} from '@/hooks/use-course-progress';
import { fetchLessonContent } from '@/services/enrollment-service';
import { AUTH_STATE_EVENT, getAccessToken } from '@/lib/api-client';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface LearnPageContentProps {
  courseId: string;
}

interface CurriculumLesson {
  id: string;
  index: number;
  title: string;
}

interface CurriculumBlock {
  id: string;
  title: string;
  lessons: CurriculumLesson[];
}

type GenericNode = Record<string, unknown>;

/* ------------------------------------------------------------------ */
/*  Curriculum helpers (shared logic with CourseDetailContent)          */
/* ------------------------------------------------------------------ */

const getNodeTitle = (node: GenericNode, fallback: string) => {
  if (typeof node.title === 'string' && node.title.trim().length > 0) return node.title;
  if (typeof node.name === 'string' && node.name.trim().length > 0) return node.name;
  return fallback;
};

const extractLessons = (lessonNodes: unknown): string[] => {
  if (!Array.isArray(lessonNodes)) return [];
  return lessonNodes.map((lesson, i) => {
    if (!lesson || typeof lesson !== 'object') return `Lesson ${i + 1}`;
    const rec = lesson as GenericNode;
    return typeof rec.title === 'string' && rec.title.trim().length > 0
      ? rec.title
      : `Lesson ${i + 1}`;
  });
};

const withLessonIndexes = (
  blocks: Array<{ id: string; title: string; lessons: string[] }>
): CurriculumBlock[] => {
  let cursor = 0;
  return blocks.map((b) => ({
    id: b.id,
    title: b.title,
    lessons: b.lessons.map((t, offset) => ({
      id: `${b.id}-${offset}`,
      index: cursor++,
      title: t,
    })),
  }));
};

const buildSchoolCurriculum = (subjects: unknown): CurriculumBlock[] => {
  if (!Array.isArray(subjects)) return [];
  const blocks: Array<{ id: string; title: string; lessons: string[] }> = [];
  subjects.forEach((subject, si) => {
    if (!subject || typeof subject !== 'object') return;
    const sNode = subject as GenericNode;
    const sTitle = getNodeTitle(sNode, `Subject ${si + 1}`);
    const chapters = Array.isArray(sNode.chapters) ? (sNode.chapters as GenericNode[]) : [];
    chapters.forEach((ch, ci) => {
      blocks.push({
        id: `${si}-${ci}`,
        title: `${sTitle} — ${getNodeTitle(ch, `Chapter ${ci + 1}`)}`,
        lessons: extractLessons(ch.lessons),
      });
    });
  });
  return withLessonIndexes(blocks);
};

const buildCodingCurriculum = (modules: unknown): CurriculumBlock[] => {
  if (!Array.isArray(modules)) return [];
  const blocks: Array<{ id: string; title: string; lessons: string[] }> = [];
  modules.forEach((mod, mi) => {
    if (!mod || typeof mod !== 'object') return;
    const mNode = mod as GenericNode;
    const mTitle = getNodeTitle(mNode, `Module ${mi + 1}`);
    const topics = Array.isArray(mNode.topics) ? (mNode.topics as GenericNode[]) : [];
    topics.forEach((topic, ti) => {
      blocks.push({
        id: `${mi}-${ti}`,
        title: `${mTitle} — ${getNodeTitle(topic, `Topic ${ti + 1}`)}`,
        lessons: extractLessons(topic.lessons),
      });
    });
  });
  return withLessonIndexes(blocks);
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function LearnPageContent({ courseId }: LearnPageContentProps) {
  /* ---- State ---- */
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [expandedBlocks, setExpandedBlocks] = useState<Set<number>>(new Set([0]));
  const [selectedLesson, setSelectedLesson] = useState<number>(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    typeof window !== 'undefined' ? Boolean(getAccessToken()) : false
  );

  /* ---- Queries ---- */
  const { data: course, isLoading: courseLoading, isError: courseError } = useCourseDetailQuery(courseId);
  const progressQuery = useCourseProgressQuery(
    course?.id ?? null,
    Boolean(course?.id && isAuthenticated)
  );
  const completeMutation = useCompleteLessonMutation(course?.id ?? null);
  const updateWatchedMutation = useUpdateLastWatchedMutation(course?.id ?? null);

  /* ---- Auth sync ---- */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const sync = () => setIsAuthenticated(Boolean(getAccessToken()));
    sync();
    window.addEventListener(AUTH_STATE_EVENT, sync);
    return () => window.removeEventListener(AUTH_STATE_EVENT, sync);
  }, []);

  /* ---- Curriculum ---- */
  const blocks = useMemo(() => {
    if (!course) return [];
    return course.category === 'school'
      ? buildSchoolCurriculum(course.subjects)
      : buildCodingCurriculum(course.modules);
  }, [course]);

  const flatLessons = useMemo(
    () =>
      blocks.flatMap((b) =>
        b.lessons.map((l) => ({ ...l, blockTitle: b.title }))
      ),
    [blocks]
  );

  /* ---- Progress ---- */
  const progress = progressQuery.data ?? null;
  const completedSet = useMemo(() => new Set(progress?.completedLessons || []), [progress]);
  const lockedUntil = progress?.lockedUntilLesson ?? -1;
  const isEnrolled = Boolean(progress);

  /* ---- Initialize to last watched lesson ---- */
  useEffect(() => {
    if (progress && flatLessons.length > 0) {
      const lastWatched = Math.max(0, Math.min(progress.lastWatchedLesson, flatLessons.length - 1));
      setSelectedLesson(lastWatched);

      // Expand the block containing the last watched lesson
      const blockIndex = blocks.findIndex((b) =>
        b.lessons.some((l) => l.index === lastWatched)
      );
      if (blockIndex >= 0) {
        setExpandedBlocks((prev) => new Set(prev).add(blockIndex));
      }
    }
  }, [progress, flatLessons.length, blocks]);

  /* ---- Active lesson ---- */
  const activeLessonIndex = Math.max(0, Math.min(selectedLesson, flatLessons.length - 1));
  const activeLesson = flatLessons[activeLessonIndex] || null;
  const isLessonAccessible = activeLesson ? activeLesson.index <= lockedUntil : false;

  /* ---- Lesson content query ---- */
  const lessonContentQuery = useQuery({
    queryKey: ['enrollments', 'lesson-content', course?.id, activeLesson?.index],
    queryFn: () => fetchLessonContent(course!.id, activeLesson!.index),
    enabled:
      Boolean(course?.id) &&
      activeLesson !== null &&
      isAuthenticated &&
      isEnrolled &&
      isLessonAccessible,
    retry: false,
  });

  /* ---- Navigation ---- */
  const canGoPrev = activeLessonIndex > 0;
  const canGoNext = activeLessonIndex < flatLessons.length - 1;

  const navigateLesson = useCallback(
    (index: number) => {
      if (index < 0 || index >= flatLessons.length) return;
      if (!isEnrolled) {
        setErrorMsg('Enroll in this course to start learning.');
        return;
      }
      if (index > lockedUntil) {
        setErrorMsg(`Lesson ${index + 1} is locked. Complete lesson ${lockedUntil + 1} first.`);
        return;
      }
      setErrorMsg(null);
      setFeedback(null);
      setSelectedLesson(index);
      setMobileSidebarOpen(false);

      // Expand containing block
      const blockIdx = blocks.findIndex((b) => b.lessons.some((l) => l.index === index));
      if (blockIdx >= 0) {
        setExpandedBlocks((prev) => new Set(prev).add(blockIdx));
      }
    },
    [flatLessons.length, isEnrolled, lockedUntil, blocks]
  );

  const goPrev = useCallback(() => canGoPrev && navigateLesson(activeLessonIndex - 1), [canGoPrev, activeLessonIndex, navigateLesson]);
  const goNext = useCallback(() => canGoNext && navigateLesson(activeLessonIndex + 1), [canGoNext, activeLessonIndex, navigateLesson]);

  /* ---- Keyboard shortcuts ---- */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev(); }
      if (e.key === 'ArrowRight') { e.preventDefault(); goNext(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goPrev, goNext]);

  /* ---- Mark complete ---- */
  const handleMarkComplete = () => {
    if (!course || !activeLesson) return;
    if (!isAuthenticated) { setErrorMsg('Login required.'); return; }
    if (!isEnrolled) { setErrorMsg('Enroll first.'); return; }
    if (activeLesson.index > lockedUntil) {
      setErrorMsg('This lesson is locked.');
      return;
    }

    setErrorMsg(null);
    setFeedback(null);

    completeMutation.mutate(activeLesson.index, {
      onSuccess: (updated) => {
        const nextUnlocked = Math.min(updated.lockedUntilLesson, flatLessons.length - 1);
        setFeedback(`Lesson ${activeLesson.index + 1} completed! Next lesson unlocked.`);
        // Auto-advance to next lesson if available
        if (activeLesson.index < flatLessons.length - 1 && activeLesson.index + 1 <= nextUnlocked) {
          setTimeout(() => setSelectedLesson(activeLesson.index + 1), 800);
        }
      },
      onError: (err) => {
        const msg = err instanceof AxiosError
          ? (err.response?.data as { message?: string } | undefined)?.message ?? null
          : null;
        setErrorMsg(msg || 'Unable to mark lesson complete.');
      },
    });
  };

  /* ---- Save resume point ---- */
  useEffect(() => {
    if (!course || !activeLesson || !isAuthenticated || !isEnrolled || !isLessonAccessible) return;
    const timer = setTimeout(() => {
      updateWatchedMutation.mutate(activeLesson.index);
    }, 1500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLesson?.index, course?.id, isAuthenticated, isEnrolled, isLessonAccessible]);

  /* ---- Toggle block expansion ---- */
  const toggleBlock = (index: number) => {
    setExpandedBlocks((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  /* ---- Overall progress ---- */
  const overallProgress = progress?.overallProgress ?? 0;

  /* ================================================================ */
  /*  LOADING STATE                                                    */
  /* ================================================================ */

  if (courseLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0a0a12]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[#6366f1] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-[#94a3b8]">Loading course...</p>
        </div>
      </div>
    );
  }

  /* ================================================================ */
  /*  ERROR STATE                                                      */
  /* ================================================================ */

  if (courseError || !course) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0a0a12] p-6">
        <div className="max-w-md text-center">
          <CircleAlert className="w-10 h-10 text-[#ef4444] mx-auto mb-4" />
          <h1 className="text-xl font-bold text-white mb-2">Course Not Available</h1>
          <p className="text-sm text-[#94a3b8] mb-6">
            This course could not be loaded. It may not exist or may be unpublished.
          </p>
          <Link
            href={`/courses/${courseId}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Course
          </Link>
        </div>
      </div>
    );
  }

  /* ================================================================ */
  /*  AUTH REQUIRED STATE                                               */
  /* ================================================================ */

  if (!isAuthenticated) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0a0a12] p-6">
        <div className="max-w-md text-center">
          <Lock className="w-10 h-10 text-[#f59e0b] mx-auto mb-4" />
          <h1 className="text-xl font-bold text-white mb-2">Login Required</h1>
          <p className="text-sm text-[#94a3b8] mb-6">
            Please login to access the lesson viewer and track your progress.
          </p>
          <Link
            href={`/login?next=/courses/${courseId}/learn`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white text-sm font-semibold hover:shadow-[0_0_24px_rgba(99,102,241,0.3)] transition-all"
          >
            Login to Continue
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  /* ================================================================ */
  /*  NOT ENROLLED STATE                                               */
  /* ================================================================ */

  if (!progressQuery.isLoading && !isEnrolled) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0a0a12] p-6">
        <div className="max-w-md text-center">
          <BookOpen className="w-10 h-10 text-[#a5b4fc] mx-auto mb-4" />
          <h1 className="text-xl font-bold text-white mb-2">Enrollment Required</h1>
          <p className="text-sm text-[#94a3b8] mb-6">
            You need to enroll in <span className="text-white font-medium">{course.title}</span> before
            accessing the lesson viewer. Enroll from the course detail page.
          </p>
          <Link
            href={`/courses/${courseId}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white text-sm font-semibold hover:shadow-[0_0_24px_rgba(99,102,241,0.3)] transition-all"
          >
            Go to Course Detail
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  /* ================================================================ */
  /*  MAIN LEARN VIEW                                                  */
  /* ================================================================ */

  const lessonContent = lessonContentQuery.data;

  return (
    <div className="h-screen flex flex-col bg-[#0a0a12] overflow-hidden">
      {/* ---- Top bar ---- */}
      <header className="flex-shrink-0 h-14 flex items-center justify-between px-4 bg-[#0d0d18] border-b border-white/[0.06] z-30">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setSidebarOpen((p) => !p);
              setMobileSidebarOpen((p) => !p);
            }}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5 text-[#94a3b8]" />
          </button>
          <Link
            href={`/courses/${courseId}`}
            className="flex items-center gap-2 text-sm text-[#64748b] hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Course</span>
          </Link>
          <span className="hidden md:inline text-[#334155]">|</span>
          <h1 className="hidden md:inline text-sm font-medium text-white truncate max-w-[300px]">
            {course.title}
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs text-[#64748b]">
            <span>{completedSet.size} / {flatLessons.length} lessons</span>
          </div>
          <Link
            href="/dashboard"
            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
            title="Dashboard"
          >
            <LayoutDashboard className="w-4 h-4 text-[#94a3b8]" />
          </Link>
        </div>
      </header>

      {/* ---- Progress bar ---- */}
      <div className="flex-shrink-0 h-1 bg-white/[0.04]">
        <motion.div
          className="h-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, overallProgress)}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* ---- Body (sidebar + main) ---- */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* ---- Sidebar (desktop) ---- */}
        <aside
          className={`
            hidden lg:flex flex-col flex-shrink-0 bg-[#0d0d18] border-r border-white/[0.06]
            transition-all duration-300 overflow-hidden
            ${sidebarOpen ? 'w-80' : 'w-0'}
          `}
        >
          <div className="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar">
            {blocks.map((block, blockIdx) => (
              <div key={block.id} className="mb-1">
                <button
                  type="button"
                  onClick={() => toggleBlock(blockIdx)}
                  className="w-full flex items-center justify-between p-3 rounded-xl text-left hover:bg-white/[0.03] transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-[#6366f1]/10 flex items-center justify-center text-[11px] font-bold text-[#a5b4fc]">
                      {blockIdx + 1}
                    </span>
                    <span className="text-xs font-medium text-[#e2e8f0] truncate">
                      {block.title}
                    </span>
                  </div>
                  <ChevronDown
                    className={`flex-shrink-0 w-4 h-4 text-[#475569] transition-transform duration-200 ${
                      expandedBlocks.has(blockIdx) ? 'rotate-180 text-[#a5b4fc]' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {expandedBlocks.has(blockIdx) && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="overflow-hidden"
                    >
                      {block.lessons.map((lesson) => {
                        const isCompleted = completedSet.has(lesson.index);
                        const isLocked = lesson.index > lockedUntil;
                        const isActive = lesson.index === activeLessonIndex;

                        return (
                          <li key={lesson.id}>
                            <button
                              type="button"
                              onClick={() => navigateLesson(lesson.index)}
                              disabled={isLocked}
                              className={`
                                w-full flex items-center gap-3 px-3 py-2.5 ml-5 rounded-lg text-left transition-all text-xs
                                ${isActive
                                  ? 'bg-[#6366f1]/15 border border-[#6366f1]/30 text-white'
                                  : isLocked
                                    ? 'text-[#475569] cursor-not-allowed'
                                    : 'text-[#94a3b8] hover:bg-white/[0.03] hover:text-white'
                                }
                              `}
                            >
                              <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                                {isCompleted ? (
                                  <CheckCircle className="w-4 h-4 text-[#22c55e]" />
                                ) : isLocked ? (
                                  <Lock className="w-3.5 h-3.5 text-[#475569]" />
                                ) : isActive ? (
                                  <PlayCircle className="w-4 h-4 text-[#a5b4fc]" />
                                ) : (
                                  <span className="w-2 h-2 rounded-full bg-[#334155]" />
                                )}
                              </span>
                              <span className="truncate">{lesson.title}</span>
                            </button>
                          </li>
                        );
                      })}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </aside>

        {/* ---- Mobile sidebar overlay ---- */}
        <AnimatePresence>
          {mobileSidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                onClick={() => setMobileSidebarOpen(false)}
              />
              <motion.aside
                initial={{ x: -320 }}
                animate={{ x: 0 }}
                exit={{ x: -320 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="lg:hidden fixed left-0 top-0 bottom-0 w-80 bg-[#0d0d18] border-r border-white/[0.06] z-50 flex flex-col"
              >
                <div className="h-14 flex items-center justify-between px-4 border-b border-white/[0.06]">
                  <span className="text-sm font-medium text-white">Course Lessons</span>
                  <button
                    type="button"
                    onClick={() => setMobileSidebarOpen(false)}
                    className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <X className="w-5 h-5 text-[#94a3b8]" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto py-4 px-3">
                  {blocks.map((block, blockIdx) => (
                    <div key={block.id} className="mb-1">
                      <button
                        type="button"
                        onClick={() => toggleBlock(blockIdx)}
                        className="w-full flex items-center justify-between p-3 rounded-xl text-left hover:bg-white/[0.03] transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-[#6366f1]/10 flex items-center justify-center text-[11px] font-bold text-[#a5b4fc]">
                            {blockIdx + 1}
                          </span>
                          <span className="text-xs font-medium text-[#e2e8f0] truncate">
                            {block.title}
                          </span>
                        </div>
                        <ChevronDown
                          className={`flex-shrink-0 w-4 h-4 text-[#475569] transition-transform duration-200 ${
                            expandedBlocks.has(blockIdx) ? 'rotate-180 text-[#a5b4fc]' : ''
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {expandedBlocks.has(blockIdx) && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="overflow-hidden"
                          >
                            {block.lessons.map((lesson) => {
                              const isCompleted = completedSet.has(lesson.index);
                              const isLocked = lesson.index > lockedUntil;
                              const isActive = lesson.index === activeLessonIndex;

                              return (
                                <li key={lesson.id}>
                                  <button
                                    type="button"
                                    onClick={() => navigateLesson(lesson.index)}
                                    disabled={isLocked}
                                    className={`
                                      w-full flex items-center gap-3 px-3 py-2.5 ml-5 rounded-lg text-left transition-all text-xs
                                      ${isActive
                                        ? 'bg-[#6366f1]/15 border border-[#6366f1]/30 text-white'
                                        : isLocked
                                          ? 'text-[#475569] cursor-not-allowed'
                                          : 'text-[#94a3b8] hover:bg-white/[0.03] hover:text-white'
                                      }
                                    `}
                                  >
                                    <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                                      {isCompleted ? (
                                        <CheckCircle className="w-4 h-4 text-[#22c55e]" />
                                      ) : isLocked ? (
                                        <Lock className="w-3.5 h-3.5 text-[#475569]" />
                                      ) : isActive ? (
                                        <PlayCircle className="w-4 h-4 text-[#a5b4fc]" />
                                      ) : (
                                        <span className="w-2 h-2 rounded-full bg-[#334155]" />
                                      )}
                                    </span>
                                    <span className="truncate">{lesson.title}</span>
                                  </button>
                                </li>
                              );
                            })}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* ---- Main content ---- */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {/* Lesson header */}
              {activeLesson && (
                <motion.div
                  key={activeLesson.index}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2.5 py-1 rounded-full bg-[#6366f1]/10 text-[11px] font-semibold text-[#a5b4fc] uppercase tracking-wider">
                      Lesson {activeLesson.index + 1}
                    </span>
                    {completedSet.has(activeLesson.index) && (
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#22c55e]/10 text-[11px] font-semibold text-[#22c55e]">
                        <Check className="w-3 h-3" />
                        Completed
                      </span>
                    )}
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {activeLesson.title}
                  </h2>
                  <p className="text-sm text-[#64748b] mb-8">
                    {activeLesson.blockTitle}
                  </p>

                  {/* ---- Lesson content ---- */}
                  <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6 md:p-8 min-h-[300px]">
                    {!isLessonAccessible && (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <Lock className="w-12 h-12 text-[#475569] mb-4" />
                        <p className="text-lg font-semibold text-white mb-2">Lesson Locked</p>
                        <p className="text-sm text-[#94a3b8] max-w-sm">
                          Complete lesson {lockedUntil + 1} to unlock this lesson.
                          Lessons are unlocked sequentially to ensure mastery.
                        </p>
                      </div>
                    )}

                    {isLessonAccessible && lessonContentQuery.isLoading && (
                      <div className="flex items-center justify-center py-16">
                        <div className="w-8 h-8 border-2 border-[#6366f1] border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}

                    {isLessonAccessible && lessonContentQuery.isError && (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <CircleAlert className="w-10 h-10 text-[#ef4444] mb-4" />
                        <p className="text-sm text-[#ef4444]">
                          {lessonContentQuery.error instanceof AxiosError
                            ? (lessonContentQuery.error.response?.data as { message?: string } | undefined)?.message
                            : 'Unable to load lesson content.'}
                        </p>
                      </div>
                    )}

                    {isLessonAccessible && lessonContent && (
                      <div className="space-y-6">
                        {/* Meta info */}
                        <div className="flex flex-wrap items-center gap-4 text-xs text-[#64748b] pb-4 border-b border-white/[0.06]">
                          <span className="flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5" />
                            {lessonContent.subject.name}
                          </span>
                          <span>•</span>
                          <span>{lessonContent.chapter.title}</span>
                          <span>•</span>
                          <span className="capitalize">{lessonContent.contentType}</span>
                          {lessonContent.duration > 0 && (
                            <>
                              <span>•</span>
                              <span>{lessonContent.duration} min</span>
                            </>
                          )}
                        </div>

                        {/* Description */}
                        {lessonContent.description && (
                          <div className="prose prose-invert prose-sm max-w-none">
                            <p className="text-[#cbd5e1] leading-relaxed whitespace-pre-wrap">
                              {lessonContent.description}
                            </p>
                          </div>
                        )}

                        {/* Content URL (video/resource link) */}
                        {lessonContent.contentUrl && (
                          <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
                            {lessonContent.contentType === 'video' ? (
                              <div className="aspect-video rounded-lg overflow-hidden bg-black">
                                <iframe
                                  src={lessonContent.contentUrl}
                                  className="w-full h-full"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                  title={lessonContent.title}
                                />
                              </div>
                            ) : (
                              <a
                                href={lessonContent.contentUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#6366f1]/10 border border-[#6366f1]/20 text-sm text-[#a5b4fc] hover:bg-[#6366f1]/20 transition-colors"
                              >
                                <ExternalLink className="w-4 h-4" />
                                Open Lesson Resource
                              </a>
                            )}
                          </div>
                        )}

                        {/* Mark complete button */}
                        {!completedSet.has(activeLesson.index) && (
                          <button
                            type="button"
                            onClick={handleMarkComplete}
                            disabled={completeMutation.isPending}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#22c55e] to-[#14b8a6] text-white text-sm font-semibold hover:shadow-[0_0_24px_rgba(34,197,94,0.3)] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                          >
                            {completeMutation.isPending ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Updating...
                              </>
                            ) : (
                              <>
                                <CheckCircle className="w-4 h-4" />
                                Mark as Complete
                              </>
                            )}
                          </button>
                        )}

                        {completedSet.has(activeLesson.index) && (
                          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#22c55e]/10 border border-[#22c55e]/20">
                            <CheckCircle className="w-4 h-4 text-[#22c55e]" />
                            <span className="text-sm text-[#22c55e] font-medium">
                              You have completed this lesson
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* ---- Feedback / Error ---- */}
                  <AnimatePresence>
                    {feedback && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-sm text-[#22c55e] mt-4"
                      >
                        {feedback}
                      </motion.p>
                    )}
                    {errorMsg && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-sm text-[#ef4444] mt-4"
                      >
                        {errorMsg}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {!activeLesson && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <BookOpen className="w-12 h-12 text-[#475569] mb-4" />
                  <p className="text-lg font-semibold text-white mb-2">No Lessons Available</p>
                  <p className="text-sm text-[#94a3b8]">This course does not have any published lessons yet.</p>
                </div>
              )}
            </div>
          </div>

          {/* ---- Bottom navigation bar ---- */}
          <div className="flex-shrink-0 h-16 flex items-center justify-between px-4 sm:px-6 bg-[#0d0d18] border-t border-white/[0.06]">
            <button
              type="button"
              onClick={goPrev}
              disabled={!canGoPrev}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white hover:bg-white/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <div className="text-xs text-[#64748b]">
              {activeLesson
                ? `${activeLessonIndex + 1} of ${flatLessons.length}`
                : 'No lessons'}
            </div>

            <button
              type="button"
              onClick={goNext}
              disabled={!canGoNext}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white hover:bg-white/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
