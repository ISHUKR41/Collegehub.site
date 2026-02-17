/**
 * use-course-progress.ts - React Query helpers for resume/lock progress.
 *
 * Keeps course progress API calls and cache updates in one place so
 * CourseDetailContent remains focused on UI rendering.
 */

'use client';

import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  completeCourseLesson,
  fetchCourseProgress,
  updateLastWatchedLesson,
} from '@/services/enrollment-service';
import { CourseProgress } from '@/types/api';

const updateProgressCaches = (
  queryClient: QueryClient,
  progress: CourseProgress
) => {
  queryClient.setQueryData(
    ['enrollments', 'progress', progress.courseId],
    progress
  );
  queryClient.invalidateQueries({ queryKey: ['dashboard', 'overview'] });
  queryClient.invalidateQueries({ queryKey: ['enrollments', 'list'] });
  queryClient.invalidateQueries({ queryKey: ['enrollments', 'resume'] });
};

export const useCourseProgressQuery = (
  courseId: string | null,
  enabled: boolean
) =>
  useQuery({
    queryKey: ['enrollments', 'progress', courseId],
    queryFn: () => fetchCourseProgress(courseId as string),
    enabled: Boolean(courseId) && enabled,
    retry: false,
  });

export const useCompleteLessonMutation = (courseId: string | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (lessonIndex: number) =>
      completeCourseLesson(courseId as string, lessonIndex),
    onSuccess: (progress) => {
      updateProgressCaches(queryClient, progress);
    },
  });
};

export const useUpdateLastWatchedMutation = (courseId: string | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (lessonIndex: number) =>
      updateLastWatchedLesson(courseId as string, lessonIndex),
    onSuccess: (progress) => {
      updateProgressCaches(queryClient, progress);
    },
  });
};
