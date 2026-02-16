/**
 * CourseDetailContent.tsx - Real course detail view backed by API.
 *
 * This component renders dynamic course structure and enrollment actions
 * using backend endpoints. No mock curriculum data is used.
 */

'use client';

import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  Clock,
  Users,
  Star,
  CheckCircle,
  PlayCircle,
  Award,
  Target,
  BarChart3,
  Lock,
  ArrowLeft,
  CircleAlert,
} from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import SectionHeading from '@/components/ui/SectionHeading';
import { useCourseDetailQuery } from '@/hooks/use-course-detail-query';
import { useEnrollMutation } from '@/hooks/use-enroll-mutation';
import { fetchPublicCourses } from '@/services/course-service';

interface CourseDetailContentProps {
  courseId: string;
}

interface CurriculumBlock {
  id: string;
  title: string;
  lessons: string[];
}

type GenericNode = Record<string, unknown>;

const getNodeTitle = (node: GenericNode, fallback: string) => {
  if (typeof node.title === 'string' && node.title.trim().length > 0) {
    return node.title;
  }

  if (typeof node.name === 'string' && node.name.trim().length > 0) {
    return node.name;
  }

  return fallback;
};

const extractLessons = (lessonNodes: unknown): string[] => {
  if (!Array.isArray(lessonNodes)) {
    return [];
  }

  return lessonNodes
    .map((lesson, index) => {
      if (!lesson || typeof lesson !== 'object') {
        return `Lesson ${index + 1}`;
      }

      const lessonRecord = lesson as GenericNode;
      if (
        typeof lessonRecord.title === 'string' &&
        lessonRecord.title.trim().length > 0
      ) {
        return lessonRecord.title;
      }

      return `Lesson ${index + 1}`;
    })
    .filter(Boolean);
};

const buildSchoolCurriculum = (subjectsInput: unknown): CurriculumBlock[] => {
  if (!Array.isArray(subjectsInput)) {
    return [];
  }

  const blocks: CurriculumBlock[] = [];

  subjectsInput.forEach((subject, subjectIndex) => {
    if (!subject || typeof subject !== 'object') {
      return;
    }

    const subjectNode = subject as GenericNode;
    const subjectTitle = getNodeTitle(subjectNode, `Subject ${subjectIndex + 1}`);

    const chapters = Array.isArray(subjectNode.chapters)
      ? (subjectNode.chapters as GenericNode[])
      : [];

    chapters.forEach((chapter, chapterIndex) => {
      const chapterTitle = getNodeTitle(chapter, `Chapter ${chapterIndex + 1}`);
      const lessons = extractLessons(chapter.lessons);

      blocks.push({
        id: `${subjectIndex}-${chapterIndex}`,
        title: `${subjectTitle} - ${chapterTitle}`,
        lessons,
      });
    });
  });

  return blocks;
};

const buildCodingCurriculum = (modulesInput: unknown): CurriculumBlock[] => {
  if (!Array.isArray(modulesInput)) {
    return [];
  }

  const blocks: CurriculumBlock[] = [];

  modulesInput.forEach((moduleNodeRaw, moduleIndex) => {
    if (!moduleNodeRaw || typeof moduleNodeRaw !== 'object') {
      return;
    }

    const moduleNode = moduleNodeRaw as GenericNode;
    const moduleTitle = getNodeTitle(moduleNode, `Module ${moduleIndex + 1}`);

    const topics = Array.isArray(moduleNode.topics)
      ? (moduleNode.topics as GenericNode[])
      : [];

    topics.forEach((topic, topicIndex) => {
      const topicTitle = getNodeTitle(topic, `Topic ${topicIndex + 1}`);
      const lessons = extractLessons(topic.lessons);

      blocks.push({
        id: `${moduleIndex}-${topicIndex}`,
        title: `${moduleTitle} - ${topicTitle}`,
        lessons,
      });
    });
  });

  return blocks;
};

export default function CourseDetailContent({ courseId }: CourseDetailContentProps) {
  const [openChapter, setOpenChapter] = useState<number>(0);
  const [enrollFeedback, setEnrollFeedback] = useState<string | null>(null);
  const [enrollError, setEnrollError] = useState<string | null>(null);
  const [requiresLogin, setRequiresLogin] = useState(false);

  const { data: course, isLoading, isError } = useCourseDetailQuery(courseId);
  const enrollMutation = useEnrollMutation();

  const curriculumBlocks = useMemo(() => {
    if (!course) {
      return [];
    }

    if (course.category === 'school') {
      return buildSchoolCurriculum(course.subjects);
    }

    return buildCodingCurriculum(course.modules);
  }, [course]);

  const totalLessonsFromCurriculum = curriculumBlocks.reduce(
    (acc, chapter) => acc + chapter.lessons.length,
    0
  );

  const totalLessons =
    course?.totalLessons && course.totalLessons > 0
      ? course.totalLessons
      : totalLessonsFromCurriculum;

  const estimatedWeeks = Math.max(2, Math.ceil(totalLessons / 8));

  const { data: relatedCourses = [] } = useQuery({
    queryKey: ['courses', 'related', course?.category],
    queryFn: () => fetchPublicCourses({ category: course?.category }),
    enabled: Boolean(course?.category),
    select: (items) =>
      items
        .filter((item) => item.id !== course?.id)
        .slice(0, 3),
  });

  const handleEnroll = () => {
    if (!course) {
      return;
    }

    setEnrollFeedback(null);
    setEnrollError(null);
    setRequiresLogin(false);

    enrollMutation.mutate(course.id, {
      onSuccess: () => {
        setEnrollFeedback('Enrollment successful. Course progress has been initialized.');
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          if (error.response?.status === 401) {
            setEnrollError('Please login first to enroll in this course.');
            setRequiresLogin(true);
            return;
          }

          const message =
            (error.response?.data as { message?: string } | undefined)?.message;
          setEnrollError(message || 'Unable to enroll right now. Please try again.');
          return;
        }

        setEnrollError('Unable to enroll right now. Please try again.');
      },
    });
  };

  if (isLoading) {
    return (
      <section className="pt-32 pb-16">
        <div className="container-custom">
          <div className="h-64 rounded-2xl bg-white/[0.04] border border-white/[0.06] animate-pulse" />
        </div>
      </section>
    );
  }

  if (isError || !course) {
    return (
      <section className="pt-32 pb-16">
        <div className="container-custom">
          <GlassCard className="!p-8" hover={false}>
            <div className="flex items-start gap-4">
              <CircleAlert className="w-6 h-6 text-[#ef4444] mt-0.5" />
              <div>
                <h1 className="text-2xl font-bold text-white mb-2">Course Not Available</h1>
                <p className="text-sm text-[#94a3b8] mb-6 max-w-xl">
                  We could not find this course in the published catalog. Please choose
                  another course from the coding or school section.
                </p>
                <div className="flex gap-3 flex-wrap">
                  <Link
                    href="/coding"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white hover:bg-white/10 transition-colors"
                  >
                    Go to Coding
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/school"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white hover:bg-white/10 transition-colors"
                  >
                    Go to School
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-mesh" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-[#6366f1]/[0.06] blur-[120px]" />

        <div className="container-custom relative z-10">
          <Link
            href={course.category === 'school' ? '/school' : '/coding'}
            className="inline-flex items-center gap-2 text-sm text-[#64748b] hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {course.title}
            </h1>
            <p className="text-lg text-[#94a3b8] max-w-2xl mb-6">
              {course.description ||
                'Structured curriculum with guided lessons, progressive unlock, tests, and analytics.'}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-[#94a3b8]">
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#a5b4fc]" />
                {curriculumBlocks.length} Curriculum Blocks
              </span>
              <span className="flex items-center gap-2">
                <PlayCircle className="w-4 h-4 text-[#a5b4fc]" />
                {totalLessons} Lessons
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#a5b4fc]" />
                {estimatedWeeks} weeks
              </span>
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#a5b4fc]" />
                Learner Access Enabled
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <SectionHeading
                title="Course Curriculum"
                subtitle="Expand each block to view all lessons in sequence."
                align="left"
              />

              <div className="space-y-3">
                {curriculumBlocks.length === 0 && (
                  <GlassCard className="!p-5" hover={false}>
                    <p className="text-sm text-[#94a3b8]">
                      Curriculum is being updated. Please check back shortly.
                    </p>
                  </GlassCard>
                )}

                {curriculumBlocks.map((chapter, index) => (
                  <motion.div
                    key={chapter.id}
                    className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <button
                      onClick={() => setOpenChapter(openChapter === index ? -1 : index)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-[#6366f1]/10 flex items-center justify-center text-xs font-bold text-[#a5b4fc]">
                          {index + 1}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-white">{chapter.title}</p>
                          <p className="text-xs text-[#64748b]">
                            {chapter.lessons.length} lessons
                          </p>
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-[#64748b] transition-transform duration-200 ${
                          openChapter === index ? 'rotate-180 text-[#a5b4fc]' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {openChapter === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="px-5 pb-5 border-t border-white/5">
                            <ul className="space-y-2 pt-4">
                              {chapter.lessons.map((lesson, lessonIndex) => (
                                <li
                                  key={`${chapter.id}-${lessonIndex}`}
                                  className="flex items-center gap-3 text-sm text-[#94a3b8]"
                                >
                                  {lessonIndex === 0 ? (
                                    <CheckCircle className="w-4 h-4 text-[#22c55e] flex-shrink-0" />
                                  ) : (
                                    <Lock className="w-4 h-4 text-[#64748b] flex-shrink-0" />
                                  )}
                                  {lesson}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10">
                <SectionHeading
                  title="Reviews"
                  subtitle="Verified learner reviews will appear after enrolled students submit feedback."
                  align="left"
                />
                <GlassCard className="!p-5" hover={false}>
                  <p className="text-sm text-[#94a3b8]">
                    No published reviews yet for this course.
                  </p>
                </GlassCard>
              </div>

              {relatedCourses.length > 0 && (
                <div className="mt-10">
                  <SectionHeading
                    title="Related Courses"
                    subtitle="Explore other learning tracks in the same category."
                    align="left"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {relatedCourses.map((item) => (
                      <GlassCard key={item.id} className="!p-5">
                        <h3 className="text-base font-semibold text-white mb-2">{item.title}</h3>
                        <p className="text-sm text-[#94a3b8] line-clamp-2 mb-4">{item.description}</p>
                        <Link
                          href={`/courses/${item.id}`}
                          className="inline-flex items-center gap-2 text-sm text-[#a5b4fc] hover:text-white transition-colors"
                        >
                          View course
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </GlassCard>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <GlassCard hover={false} className="!p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Enrollment</h3>
                  <div className="space-y-3 mb-6">
                    {[
                      { icon: CheckCircle, text: 'Full curriculum access' },
                      { icon: Target, text: 'Chapter and topic tests' },
                      { icon: BarChart3, text: 'Performance analytics dashboard' },
                      { icon: Lock, text: 'Controlled forward lock system' },
                      { icon: Award, text: 'Progress tracking and resume state' },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.text}
                          className="flex items-center gap-3 text-sm text-[#94a3b8]"
                        >
                          <Icon className="w-4 h-4 text-[#22c55e]" />
                          {item.text}
                        </div>
                      );
                    })}
                  </div>

                  <button
                    onClick={handleEnroll}
                    disabled={enrollMutation.isPending}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-semibold text-sm hover:shadow-[0_0_24px_rgba(99,102,241,0.4)] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span>
                      {enrollMutation.isPending ? 'Enrolling...' : 'Enroll Now'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {enrollFeedback && (
                    <p className="text-xs text-[#22c55e] mt-3">{enrollFeedback}</p>
                  )}
                  {enrollError && (
                    <p className="text-xs text-[#ef4444] mt-3">{enrollError}</p>
                  )}
                  {requiresLogin && (
                    <Link
                      href={`/login?next=/courses/${course.id}`}
                      className="inline-flex mt-3 items-center gap-2 text-xs text-[#a5b4fc] hover:text-white transition-colors"
                    >
                      Open Login
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </GlassCard>

                <GlassCard hover={false} className="!p-6">
                  <h3 className="text-sm font-semibold text-white mb-4">Course Metadata</h3>
                  <div className="space-y-3 text-sm text-[#94a3b8]">
                    <p>
                      <span className="text-[#64748b]">Category:</span>{' '}
                      <span className="capitalize">{course.category}</span>
                    </p>
                    <p>
                      <span className="text-[#64748b]">Track:</span>{' '}
                      <span className="capitalize">{course.subCategory}</span>
                    </p>
                    <p>
                      <span className="text-[#64748b]">Last Updated:</span>{' '}
                      {new Date(course.updatedAt).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                    <p className="flex items-center gap-2 text-[#f59e0b]">
                      <Star className="w-4 h-4" />
                      Data-backed learning path enabled
                    </p>
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
