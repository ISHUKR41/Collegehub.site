/**
 * use-course-detail-query.ts - Dynamic course detail hook by id or slug.
 */

import { useQuery } from '@tanstack/react-query';
import {
  fetchCourseById,
  isObjectIdLike,
  resolveCourseBySlug,
} from '@/services/course-service';

const getCourseQueryFn = async (identifier: string) => {
  if (isObjectIdLike(identifier)) {
    return fetchCourseById(identifier);
  }
  return resolveCourseBySlug(identifier);
};

export const useCourseDetailQuery = (identifier: string) =>
  useQuery({
    queryKey: ['courses', 'detail', identifier],
    queryFn: () => getCourseQueryFn(identifier),
    enabled: Boolean(identifier),
  });

