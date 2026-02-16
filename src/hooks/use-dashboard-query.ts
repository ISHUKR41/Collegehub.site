/**
 * use-dashboard-query.ts - Dashboard analytics data hook.
 */

import { useQuery } from '@tanstack/react-query';
import { fetchDashboard } from '@/services/dashboard-service';

export const useDashboardQuery = () =>
  useQuery({
    queryKey: ['dashboard', 'overview'],
    queryFn: fetchDashboard,
  });

