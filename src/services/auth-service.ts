/**
 * auth-service.ts - Authentication API wrappers.
 *
 * Why this file exists:
 * - Keeps auth endpoint contracts centralized.
 * - Integrates with axios token helpers for consistent session state.
 */

import { apiClient, clearAccessToken, publicApiClient, setAccessToken } from '@/lib/api-client';
import { ApiEnvelope } from '@/types/api';

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  createdAt: string;
}

interface LoginResponse {
  user: AuthUser;
  accessToken: string;
  resume: {
    courseId: string;
    courseTitle: string;
    category: string;
    subCategory: string;
    lastWatchedLesson: number;
    lockedUntilLesson: number;
    updatedAt: string;
  } | null;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role?: 'student' | 'admin';
  adminInviteCode?: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterResponse {
  user: AuthUser;
  accessToken: string;
}

interface RefreshResponse {
  accessToken: string;
}

interface ProfileResponse {
  user: AuthUser;
}

export const register = async (payload: RegisterPayload) => {
  const response = await publicApiClient.post<ApiEnvelope<RegisterResponse>>(
    '/auth/register',
    payload
  );
  setAccessToken(response.data.data.accessToken);
  return response.data.data.user;
};

export const login = async (payload: LoginPayload) => {
  const response = await publicApiClient.post<ApiEnvelope<LoginResponse>>(
    '/auth/login',
    payload
  );
  setAccessToken(response.data.data.accessToken);
  return response.data.data;
};

export const refreshSession = async () => {
  const response = await publicApiClient.post<ApiEnvelope<RefreshResponse>>(
    '/auth/refresh'
  );
  setAccessToken(response.data.data.accessToken);
  return response.data.data.accessToken;
};

export const logout = async () => {
  try {
    await publicApiClient.post('/auth/logout');
  } finally {
    clearAccessToken();
  }
};

export const fetchCurrentUser = async () => {
  const response = await apiClient.get<ApiEnvelope<ProfileResponse>>('/auth/me');
  return response.data.data.user;
};

