/**
 * next.config.ts - Next.js production runtime configuration.
 *
 * Why these settings:
 * - Adds security headers to reduce common browser-side attacks.
 * - Enables modern image formats for better Core Web Vitals.
 * - Keeps strict mode enabled for safer React behavior.
 *
 * To extend:
 * - Add remote image domains if CMS/external media is introduced.
 * - Add rewrites only when backend proxy behavior is required.
 */

import type { NextConfig } from 'next';

const securityHeaders = [
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'Permissions-Policy',
    value:
      'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
  },
];

const normalizeExternalApiUrl = (value: string | undefined) => {
  const normalized = (value || '').trim().replace(/\/$/, '');
  return /^https?:\/\//i.test(normalized) ? normalized : '';
};

const externalApiBaseUrl = normalizeExternalApiUrl(
  process.env.BACKEND_PUBLIC_URL || process.env.NEXT_PUBLIC_API_URL
);

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
    ];
  },
  async rewrites() {
    if (!externalApiBaseUrl) {
      return [];
    }

    return [
      {
        source: '/api/:path*',
        destination: `${externalApiBaseUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
