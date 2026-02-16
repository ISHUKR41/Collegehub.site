/**
 * api-client.ts - Axios clients with auth token rotation support.
 *
 * Why this file exists:
 * - Adds access token automatically to protected requests.
 * - Handles 401 responses by calling refresh-token endpoint.
 * - Replays queued requests after token refresh to prevent race issues.
 */

import axios, {
  AxiosError,
  AxiosHeaders,
  InternalAxiosRequestConfig,
} from 'axios';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const ACCESS_TOKEN_STORAGE_KEY = 'collegehub_access_token';
export const AUTH_STATE_EVENT = 'collegehub:auth-state-changed';

let accessTokenMemory: string | null = null;
let isRefreshing = false;
let refreshQueue: Array<(token: string | null) => void> = [];

const isBrowser = typeof window !== 'undefined';

const runRefreshQueue = (token: string | null) => {
  refreshQueue.forEach((callback) => callback(token));
  refreshQueue = [];
};

const normalizeAuthHeader = (
  headers: InternalAxiosRequestConfig['headers']
): AxiosHeaders => {
  if (headers instanceof AxiosHeaders) {
    return headers;
  }
  return new AxiosHeaders(headers);
};

export const getAccessToken = (): string | null => {
  if (accessTokenMemory) {
    return accessTokenMemory;
  }

  if (!isBrowser) {
    return null;
  }

  const fromStorage = window.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
  if (fromStorage) {
    accessTokenMemory = fromStorage;
  }

  return accessTokenMemory;
};

export const setAccessToken = (token: string | null) => {
  accessTokenMemory = token;

  if (!isBrowser) {
    return;
  }

  if (token) {
    window.localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
  } else {
    window.localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
  }

  /*
   * Same-tab localStorage updates do not fire the `storage` event.
   * We emit a dedicated event so auth-aware UI can react immediately.
   */
  window.dispatchEvent(new Event(AUTH_STATE_EVENT));
};

export const clearAccessToken = () => setAccessToken(null);

type RetryableRequest = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

export const publicApiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (!token) {
    return config;
  }

  const headers = normalizeAuthHeader(config.headers);
  headers.set('Authorization', `Bearer ${token}`);
  config.headers = headers;
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequest | undefined;
    const responseStatus = error.response?.status;

    if (!originalRequest || responseStatus !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      const token = await new Promise<string | null>((resolve) => {
        refreshQueue.push(resolve);
      });

      if (!token) {
        return Promise.reject(error);
      }

      const headers = normalizeAuthHeader(originalRequest.headers);
      headers.set('Authorization', `Bearer ${token}`);
      originalRequest.headers = headers;
      return apiClient(originalRequest);
    }

    isRefreshing = true;

    try {
      const refreshResponse = await publicApiClient.post('/auth/refresh');
      const token =
        refreshResponse.data?.data?.accessToken ||
        refreshResponse.data?.accessToken ||
        null;

      if (!token) {
        throw new Error('Access token missing in refresh response.');
      }

      setAccessToken(token);
      runRefreshQueue(token);

      const headers = normalizeAuthHeader(originalRequest.headers);
      headers.set('Authorization', `Bearer ${token}`);
      originalRequest.headers = headers;

      return apiClient(originalRequest);
    } catch (refreshError) {
      clearAccessToken();
      runRefreshQueue(null);
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);
