/**
 * course-service.ts - Course catalog API wrappers.
 */

import { apiClient, publicApiClient } from '@/lib/api-client';
import { ApiEnvelope, CourseDetail, CourseListItem } from '@/types/api';

interface CourseListResponse {
  courses: CourseListItem[];
}

interface CourseDetailResponse {
  course: CourseDetail;
}

interface CourseListQuery {
  category?: 'school' | 'coding';
  subCategory?: 'class9' | 'class10' | 'cpp' | 'java' | 'python' | 'webdev';
  search?: string;
}

const COURSE_SLUG_TO_SUBCATEGORY: Record<
  string,
  'class9' | 'class10' | 'cpp' | 'java' | 'python' | 'webdev'
> = {
  cpp: 'cpp',
  java: 'java',
  python: 'python',
  'web-development': 'webdev',
  webdev: 'webdev',
};

const objectIdRegex = /^[a-f\d]{24}$/i;

export const isObjectIdLike = (value: string) => objectIdRegex.test(value);

export const fetchPublicCourses = async (
  query: CourseListQuery = {}
): Promise<CourseListItem[]> => {
  const response = await publicApiClient.get<ApiEnvelope<CourseListResponse>>(
    '/courses',
    { params: query }
  );
  return response.data.data.courses;
};

export const fetchAdminCourses = async (
  query: CourseListQuery = {}
): Promise<CourseListItem[]> => {
  const response = await apiClient.get<ApiEnvelope<CourseListResponse>>(
    '/courses/admin/all',
    { params: query }
  );
  return response.data.data.courses;
};

export const fetchCourseById = async (courseId: string): Promise<CourseDetail> => {
  const response = await publicApiClient.get<ApiEnvelope<CourseDetailResponse>>(
    `/courses/${courseId}`
  );
  return response.data.data.course;
};

const resolveSubCategoryBySlug = (slug: string) => {
  const direct = COURSE_SLUG_TO_SUBCATEGORY[slug];
  if (direct) {
    return direct;
  }

  if (slug.startsWith('class9-')) {
    return 'class9' as const;
  }

  if (slug.startsWith('class10-')) {
    return 'class10' as const;
  }

  return null;
};

export const resolveCourseBySlug = async (
  slug: string
): Promise<CourseDetail | null> => {
  const subCategory = resolveSubCategoryBySlug(slug);
  if (!subCategory) {
    return null;
  }

  const courses = await fetchPublicCourses({ subCategory });
  if (courses.length === 0) {
    return null;
  }

  return fetchCourseById(courses[0].id);
};

