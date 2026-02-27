/**
 * manifest.ts — Web App Manifest for PWA and SEO.
 *
 * Provides metadata for "Add to Home Screen" on mobile devices
 * and helps search engines understand the app identity.
 */

import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'CollegeHub - Smart Learning Platform',
    short_name: 'CollegeHub',
    description:
      'Master school subjects and coding skills with structured learning paths, progress tracking, and personalized analytics.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a12',
    theme_color: '#6366f1',
    orientation: 'portrait-primary',
    categories: ['education', 'learning', 'programming'],
    icons: [
      {
        src: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
    ],
  };
}
