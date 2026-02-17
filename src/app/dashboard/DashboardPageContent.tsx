/**
 * DashboardPageContent.tsx - Authenticated learner analytics UI.
 *
 * This page consumes backend dashboard payload and renders:
 * - Summary KPIs
 * - Resume card
 * - Progress-by-course chart
 * - Subject performance chart
 * - Weak-topic indicators
 * - Suggestion engine output
 */

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { AxiosError } from 'axios';
import {
  Activity,
  ArrowRight,
  BarChart3,
  BookOpen,
  CircleAlert,
  CircleCheck,
  Flame,
  GraduationCap,
  TrendingUp,
} from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import { useDashboardQuery } from '@/hooks/use-dashboard-query';

const toBarWidth = (value: number) => `${Math.max(0, Math.min(100, value))}%`;

export default function DashboardPageContent() {
  const { data, isLoading, isError, error } = useDashboardQuery();

  const unauthorized =
    error instanceof AxiosError && error.response?.status === 401;

  return (
    <>
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-mesh" />
        <div className="absolute top-1/3 right-1/4 w-[420px] h-[420px] rounded-full bg-[#6366f1]/[0.06] blur-[120px]" />
        <div className="container-custom relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <BarChart3 className="w-4 h-4 text-[#a5b4fc]" />
            <span className="text-sm text-[#a5b4fc] font-medium">
              Learner Analytics
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your <span className="text-gradient">Dashboard</span>
          </h1>
          <p className="text-[#94a3b8] max-w-2xl">
            Monitor progress, identify weak topics, and continue exactly from
            where you left your course journey.
          </p>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-custom">
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="h-36 rounded-2xl bg-white/[0.04] border border-white/[0.06] animate-pulse"
                />
              ))}
            </div>
          )}

          {isError && unauthorized && (
            <GlassCard className="!p-8" hover={false}>
              <div className="flex items-start gap-4">
                <CircleAlert className="w-6 h-6 text-[#f59e0b] mt-0.5" />
                <div>
                  <h2 className="text-xl font-semibold text-white mb-2">
                    Session Required
                  </h2>
                  <p className="text-sm text-[#94a3b8] mb-5 max-w-xl">
                    Dashboard data is protected. Login first, then return to see
                    your personalized performance analytics.
                  </p>
                  <Link
                    href="/login?next=/dashboard"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-white hover:bg-white/10 transition-colors"
                  >
                    Login to Continue
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </GlassCard>
          )}

          {isError && !unauthorized && (
            <GlassCard className="!p-8" hover={false}>
              <div className="flex items-start gap-4">
                <CircleAlert className="w-6 h-6 text-[#ef4444] mt-0.5" />
                <div>
                  <h2 className="text-xl font-semibold text-white mb-2">
                    Unable to Load Dashboard
                  </h2>
                  <p className="text-sm text-[#94a3b8]">
                    Please verify backend availability and try again.
                  </p>
                </div>
              </div>
            </GlassCard>
          )}

          {data && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <GlassCard className="!p-6" delay={0.05}>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-[#94a3b8]">Enrolled Courses</p>
                    <BookOpen className="w-4 h-4 text-[#a5b4fc]" />
                  </div>
                  <p className="text-3xl font-bold text-white">
                    {data.summary.enrolledCourses}
                  </p>
                </GlassCard>

                <GlassCard className="!p-6" delay={0.1}>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-[#94a3b8]">Average Progress</p>
                    <TrendingUp className="w-4 h-4 text-[#22c55e]" />
                  </div>
                  <p className="text-3xl font-bold text-white">
                    {data.summary.averageProgress}%
                  </p>
                </GlassCard>

                <GlassCard className="!p-6" delay={0.15}>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-[#94a3b8]">Completed Lessons</p>
                    <CircleCheck className="w-4 h-4 text-[#22c55e]" />
                  </div>
                  <p className="text-3xl font-bold text-white">
                    {data.summary.totalCompletedLessons}
                  </p>
                </GlassCard>
              </div>

              {data.resume && (
                <GlassCard className="!p-6 mb-8" delay={0.2}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <p className="text-sm text-[#94a3b8] mb-1">Resume</p>
                      <h2 className="text-xl font-semibold text-white">
                        {data.resume.courseTitle}
                      </h2>
                      <p className="text-sm text-[#94a3b8] mt-1">
                        Continue from lesson {data.resume.lastWatchedLesson + 1}
                      </p>
                    </div>
                    <Link
                      href={`/courses/${data.resume.courseId}/learn`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white text-sm font-semibold hover:shadow-[0_0_24px_rgba(99,102,241,0.3)] transition-all"
                    >
                      Resume Learning
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </GlassCard>
              )}

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
                <GlassCard className="!p-6" delay={0.25}>
                  <SectionHeading
                    title="Progress by Course"
                    subtitle="Overall completion percentage for each enrolled course."
                    align="left"
                  />
                  <div className="space-y-4 mt-6">
                    {data.charts.progressByCourse.length === 0 && (
                      <p className="text-sm text-[#94a3b8]">
                        No enrolled courses yet.
                      </p>
                    )}
                    {data.charts.progressByCourse.map((item) => (
                      <div key={item.label}>
                        <div className="flex items-center justify-between mb-1.5">
                          <p className="text-sm text-white">{item.label}</p>
                          <p className="text-xs text-[#94a3b8]">{item.value}%</p>
                        </div>
                        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: toBarWidth(item.value) }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="h-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                <GlassCard className="!p-6" delay={0.3}>
                  <SectionHeading
                    title="Subject Performance"
                    subtitle="Subject or module level completion in all courses."
                    align="left"
                  />
                  <div className="space-y-4 mt-6 max-h-[360px] overflow-y-auto pr-1">
                    {data.charts.subjectPerformance.length === 0 && (
                      <p className="text-sm text-[#94a3b8]">
                        Subject analytics will appear after lesson completion.
                      </p>
                    )}
                    {data.charts.subjectPerformance.map((item) => (
                      <div key={item.label}>
                        <div className="flex items-center justify-between mb-1.5">
                          <p className="text-sm text-white line-clamp-1">
                            {item.label}
                          </p>
                          <p className="text-xs text-[#94a3b8]">{item.value}%</p>
                        </div>
                        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: toBarWidth(item.value) }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="h-full bg-gradient-to-r from-[#22c55e] to-[#14b8a6]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <GlassCard className="!p-6" delay={0.35}>
                  <SectionHeading
                    title="Weak Topic Indicators"
                    subtitle="Topic accuracy bands generated from your test attempts."
                    align="left"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    {[
                      {
                        label: 'High Priority',
                        color: 'text-[#ef4444]',
                        bg: 'bg-[#ef4444]/10',
                        icon: Flame,
                        items: data.weakTopicIndicators.red,
                      },
                      {
                        label: 'Medium Priority',
                        color: 'text-[#f59e0b]',
                        bg: 'bg-[#f59e0b]/10',
                        icon: Activity,
                        items: data.weakTopicIndicators.yellow,
                      },
                      {
                        label: 'Healthy Topics',
                        color: 'text-[#22c55e]',
                        bg: 'bg-[#22c55e]/10',
                        icon: CircleCheck,
                        items: data.weakTopicIndicators.green,
                      },
                    ].map((bucket) => {
                      const BucketIcon = bucket.icon;
                      return (
                        <div
                          key={bucket.label}
                          className={`rounded-xl border border-white/10 p-4 ${bucket.bg}`}
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <BucketIcon className={`w-4 h-4 ${bucket.color}`} />
                            <p className={`text-sm font-semibold ${bucket.color}`}>
                              {bucket.label}
                            </p>
                          </div>
                          <div className="space-y-2">
                            {bucket.items.length === 0 && (
                              <p className="text-xs text-[#94a3b8]">No topics yet.</p>
                            )}
                            {bucket.items.slice(0, 4).map((item) => (
                              <p
                                key={item.topic}
                                className="text-xs text-[#e2e8f0] flex items-center justify-between gap-2"
                              >
                                <span className="line-clamp-1">{item.topic}</span>
                                <span className="text-[#94a3b8]">
                                  {item.accuracy}%
                                </span>
                              </p>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </GlassCard>

                <GlassCard className="!p-6" delay={0.4}>
                  <SectionHeading
                    title="Suggestion Engine"
                    subtitle="Actionable recommendations generated from weak topics."
                    align="left"
                  />
                  <div className="space-y-3 mt-6">
                    {data.suggestions.length === 0 && (
                      <p className="text-sm text-[#94a3b8]">
                        Complete tests to unlock personalized revision suggestions.
                      </p>
                    )}
                    {data.suggestions.map((item) => (
                      <div
                        key={`${item.topic}-${item.priority}`}
                        className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-semibold text-white capitalize">
                            {item.topic}
                          </p>
                          <span
                            className={`text-[11px] px-2 py-1 rounded-full ${
                              item.priority === 'high'
                                ? 'bg-[#ef4444]/15 text-[#ef4444]'
                                : 'bg-[#f59e0b]/15 text-[#f59e0b]'
                            }`}
                          >
                            {item.priority}
                          </span>
                        </div>
                        <p className="text-xs text-[#94a3b8]">{item.reason}</p>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>

              {data.enrolledCourseProgress.length > 0 && (
                <div className="mt-8">
                  <SectionHeading
                    label="Course Cards"
                    title="Detailed Course Progress"
                    subtitle="Track resume point, lock state, and completion status per enrolled course."
                  />
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {data.enrolledCourseProgress.map((item) => (
                      <GlassCard key={`${item.courseId}-${item.title}`} className="!p-6">
                        <div className="flex items-center justify-between gap-4 mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-white">
                              {item.title}
                            </h3>
                            <p className="text-xs text-[#94a3b8] capitalize">
                              {item.category} - {item.subCategory}
                            </p>
                          </div>
                          <GraduationCap className="w-5 h-5 text-[#a5b4fc]" />
                        </div>

                        <div className="space-y-2 mb-4">
                          <p className="text-xs text-[#94a3b8]">
                            Completed lessons: {item.completedLessons} /{' '}
                            {item.totalLessons}
                          </p>
                          <p className="text-xs text-[#94a3b8]">
                            Last watched lesson: {item.lastWatchedLesson + 1}
                          </p>
                          <p className="text-xs text-[#94a3b8]">
                            Locked until lesson: {item.lockedUntilLesson + 1}
                          </p>
                        </div>

                        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]"
                            style={{ width: toBarWidth(item.overallProgress) }}
                          />
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
