/**
 * use-enroll-mutation.ts - Enrollment mutation hook.
 */

import { useMutation } from '@tanstack/react-query';
import { enrollInCourse } from '@/services/enrollment-service';

export const useEnrollMutation = () =>
  useMutation({
    mutationFn: enrollInCourse,
  });

