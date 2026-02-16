/**
 * dashboard-service.ts - Dashboard analytics API wrappers.
 */

import { apiClient } from '@/lib/api-client';
import { ApiEnvelope, DashboardPayload } from '@/types/api';

interface DashboardResponse {
  dashboard: DashboardPayload;
}

export const fetchDashboard = async (): Promise<DashboardPayload> => {
  const response = await apiClient.get<ApiEnvelope<DashboardResponse>>('/dashboard');
  return response.data.data.dashboard;
};

