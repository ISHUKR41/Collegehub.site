/**
 * Dynamic course detail route.
 *
 * Uses route param as identifier. Metadata, JSON-LD, and breadcrumbs
 * are generated dynamically for accurate course-level SEO.
 */

import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import { SITE_CONFIG } from '@/lib/constants';
import CourseDetailContent from './CourseDetailContent';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.BACKEND_PUBLIC_URL ||
  'http://localhost:5000/api';

const objectIdRegex = /^[a-f\d]{24}$/i;

interface CourseSeoRecord {
  title: string;
  description: string;
}

interface CourseDetailResponse {
  success: boolean;
  data?: {
    course?: {
      title?: string;
      description?: string;
    };
  };
}

const prettifySlug = (id: string) =>
  id.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

const fetchCourseSeo = async (id: string): Promise<CourseSeoRecord | null> => {
  if (!objectIdRegex.test(id)) {
    return {
      title: prettifySlug(id),
      description: `Learn ${prettifySlug(id)} with structured lessons, practice tests, and performance analytics on CollegeHub.`,
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as CourseDetailResponse;
    const title = payload.data?.course?.title || 'Course';
    const description =
      payload.data?.course?.description ||
      'Structured course with progressive lessons and analytics.';

    return { title, description };
  } catch {
    return null;
  }
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const seo = await fetchCourseSeo(id);

  if (!seo) {
    const fallbackTitle = prettifySlug(id);
    return {
      title: `${fallbackTitle} - Course Detail`,
      description: `Explore ${fallbackTitle} course details on CollegeHub.`,
    };
  }

  return {
    title: `${seo.title} - Course Detail`,
    description: seo.description,
    alternates: {
      canonical: `${SITE_CONFIG.url}/courses/${id}`,
    },
    openGraph: {
      title: `${seo.title} - Course Detail | CollegeHub`,
      description: seo.description,
      url: `${SITE_CONFIG.url}/courses/${id}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${seo.title} - Course Detail | CollegeHub`,
      description: seo.description,
    },
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const seo = await fetchCourseSeo(id);

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: seo?.title || prettifySlug(id),
    description:
      seo?.description ||
      `Structured learning path for ${prettifySlug(id)} with analytics and progression controls.`,
    provider: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    educationalLevel: 'Beginner to Advanced',
    url: `${SITE_CONFIG.url}/courses/${id}`,
    isAccessibleForFree: true,
    inLanguage: 'en',
  };

  return (
    <>
      <JsonLd data={courseSchema} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Courses', href: '/coding' },
          { name: seo?.title || prettifySlug(id), href: `/courses/${id}` },
        ]}
      />
      <CourseDetailContent key={id} courseId={id} />
    </>
  );
}
