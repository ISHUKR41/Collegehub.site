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

const resolveApiBaseUrl = () => {
  const serverConfigured = (
    process.env.BACKEND_PUBLIC_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    ''
  ).trim();

  /*
   * Browser should always hit same-origin /api.
   * next.config rewrites /api/* to backend, so frontend never needs
   * environment-specific absolute API URLs.
   */
  if (typeof window !== 'undefined') {
    return '/api';
  }

  return serverConfigured || 'http://localhost:5000/api';
};

const API_BASE_URL = resolveApiBaseUrl().replace(/\/$/, '');
export const AUTH_STATE_EVENT = 'collegehub:auth-state-changed';

export const getPublicApiBaseUrl = () => API_BASE_URL;

let accessTokenMemory: string | null = null;
let isRefreshing = false;
let bootstrapPromise: Promise<string | null> | null = null;
let refreshQueue: Array<(token: string | null) => void> = [];

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
  return accessTokenMemory;
};

export const setAccessToken = (token: string | null) => {
  accessTokenMemory = token;

  if (typeof window === 'undefined') {
    return;
  }

  /*
   * Access tokens stay in memory only. A dedicated event keeps UI synchronized
   * after login/logout/refresh without relying on localStorage.
   */
  window.dispatchEvent(new Event(AUTH_STATE_EVENT));
};

export const clearAccessToken = () => setAccessToken(null);

export const bootstrapAccessToken = async (): Promise<string | null> => {
  if (accessTokenMemory) {
    return accessTokenMemory;
  }

  if (bootstrapPromise) {
    return bootstrapPromise;
  }

  bootstrapPromise = publicApiClient
    .post('/auth/refresh')
    .then((response) => {
      const token =
        response.data?.data?.accessToken || response.data?.accessToken || null;
      setAccessToken(token);
      return token;
    })
    .catch(() => {
      clearAccessToken();
      return null;
    })
    .finally(() => {
      bootstrapPromise = null;
    });

  return bootstrapPromise;
};

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
