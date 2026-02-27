/**
 * sitemap.ts - Dynamic sitemap generation.
 *
 * Emits URLs for all public pages including:
 * - Static pages (home, school, coding, about, contact)
 * - C language course pages (40 days)
 * - Dynamic course pages from backend API
 */

import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import { C_MASTERY_PHASES } from '@/lib/c-mastery-data';

const SITE_URL = SITE_CONFIG.url;
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.BACKEND_PUBLIC_URL ||
  'http://localhost:5000/api';

interface CourseListItem {
  id: string;
  updatedAt: string;
}

interface CourseListResponse {
  success: boolean;
  data?: {
    courses?: CourseListItem[];
  };
}

const fetchPublishedCourses = async (): Promise<CourseListItem[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/courses`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as CourseListResponse;
    return payload.data?.courses || [];
  } catch {
    return [];
  }
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/school`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/coding`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/coding/c-language`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/login`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/register`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  /* ── C Language Day Pages (1–40) ─────────────────────────── */
  const cLanguageDayPages: MetadataRoute.Sitemap = C_MASTERY_PHASES.flatMap(
    (phase) =>
      phase.days.map((day) => ({
        url: `${SITE_URL}/coding/c-language/day/${day.day}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.75,
      }))
  );

  /* ── Dynamic Course Pages from API ───────────────────────── */
  const courses = await fetchPublishedCourses();

  const dynamicCoursePages: MetadataRoute.Sitemap = courses.map((course) => ({
    url: `${SITE_URL}/courses/${course.id}`,
    lastModified: new Date(course.updatedAt || Date.now()),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticPages, ...cLanguageDayPages, ...dynamicCoursePages];
}
