/**
 * enrollment-service.ts - Enrollment and progress API wrappers.
 */

import { apiClient } from '@/lib/api-client';
import {
  ApiEnvelope,
  CourseProgress,
  EnrollmentListItem,
  LessonContent,
  ResumeFeed,
} from '@/types/api';

interface EnrollResponse {
  progress: CourseProgress;
}

interface CourseProgressResponse {
  progress: CourseProgress;
}

interface EnrolledCoursesResponse {
  enrollments: EnrollmentListItem[];
}

interface ResumeFeedResponse {
  resume: ResumeFeed | null;
}

interface LessonAccessResponse {
  allowed: boolean;
  requestedLesson: number;
  lockedUntilLesson: number;
}

interface LessonContentResponse {
  lesson: LessonContent;
}

export const enrollInCourse = async (courseId: string): Promise<CourseProgress> => {
  const response = await apiClient.post<ApiEnvelope<EnrollResponse>>(
    '/enrollments',
    { courseId }
  );
  return response.data.data.progress;
};

export const fetchMyEnrollments = async (): Promise<EnrollmentListItem[]> => {
  const response = await apiClient.get<ApiEnvelope<EnrolledCoursesResponse>>(
    '/enrollments'
  );
  return response.data.data.enrollments;
};

export const fetchResumeFeed = async (): Promise<ResumeFeed | null> => {
  const response = await apiClient.get<ApiEnvelope<ResumeFeedResponse>>(
    '/enrollments/resume'
  );
  return response.data.data.resume;
};

export const fetchCourseProgress = async (
  courseId: string
): Promise<CourseProgress> => {
  const response = await apiClient.get<ApiEnvelope<CourseProgressResponse>>(
    `/enrollments/${courseId}`
  );
  return response.data.data.progress;
};

export const updateLastWatchedLesson = async (
  courseId: string,
  lessonIndex: number
): Promise<CourseProgress> => {
  const response = await apiClient.patch<ApiEnvelope<CourseProgressResponse>>(
    `/enrollments/${courseId}/last-watched`,
    { lessonIndex }
  );
  return response.data.data.progress;
};

export const completeCourseLesson = async (
  courseId: string,
  lessonIndex: number
): Promise<CourseProgress> => {
  const response = await apiClient.patch<ApiEnvelope<CourseProgressResponse>>(
    `/enrollments/${courseId}/complete`,
    { lessonIndex }
  );
  return response.data.data.progress;
};

export const checkLessonAccess = async (
  courseId: string,
  lessonIndex: number
): Promise<LessonAccessResponse> => {
  const response = await apiClient.get<ApiEnvelope<LessonAccessResponse>>(
    `/enrollments/${courseId}/lesson-access`,
    { params: { lessonIndex } }
  );
  return response.data.data;
};

export const fetchLessonContent = async (
  courseId: string,
  lessonIndex: number
): Promise<LessonContent> => {
  const response = await apiClient.get<ApiEnvelope<LessonContentResponse>>(
    `/enrollments/${courseId}/lessons/${lessonIndex}`
  );
  return response.data.data.lesson;
};
