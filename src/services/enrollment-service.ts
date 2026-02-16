/**
 * enrollment-service.ts - Enrollment and progress API wrappers.
 */

import { apiClient } from '@/lib/api-client';
import { ApiEnvelope } from '@/types/api';

interface EnrollmentProgress {
  id: string;
  courseId: string;
  lastWatchedLesson: number;
  lockedUntilLesson: number;
  overallProgress: number;
}

interface EnrollResponse {
  progress: EnrollmentProgress;
}

export const enrollInCourse = async (courseId: string) => {
  const response = await apiClient.post<ApiEnvelope<EnrollResponse>>(
    '/enrollments',
    { courseId }
  );
  return response.data.data.progress;
};

