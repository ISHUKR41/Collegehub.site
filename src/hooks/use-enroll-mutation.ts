/**
 * use-enroll-mutation.ts - Enrollment mutation hook.
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { enrollInCourse } from '@/services/enrollment-service';

export const useEnrollMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: enrollInCourse,
    onSuccess: (progress) => {
      queryClient.setQueryData(
        ['enrollments', 'progress', progress.courseId],
        progress
      );
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'overview'] });
      queryClient.invalidateQueries({ queryKey: ['enrollments', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['enrollments', 'resume'] });
    },
  });
};
