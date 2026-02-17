/**
 * Learn page — Server component for the immersive lesson viewer.
 *
 * Why a dedicated route:
 * - The course detail page is an overview with enrollment actions.
 * - This route provides a distraction-free, full-screen learning experience.
 * - Hides navbar/footer for maximum content area.
 * - Supports keyboard shortcuts for lesson navigation.
 */

import type { Metadata } from 'next';
import LearnPageContent from './LearnPageContent';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.BACKEND_PUBLIC_URL ||
  'http://localhost:5000/api';

const objectIdRegex = /^[a-f\d]{24}$/i;

const prettifySlug = (id: string) =>
  id.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

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

const fetchCourseSeo = async (id: string): Promise<CourseSeoRecord | null> => {
  if (!objectIdRegex.test(id)) {
    return {
      title: prettifySlug(id),
      description: `Learn ${prettifySlug(id)} with structured lessons on CollegeHub.`,
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) return null;

    const payload = (await response.json()) as CourseDetailResponse;
    return {
      title: payload.data?.course?.title || 'Course',
      description:
        payload.data?.course?.description ||
        'Structured course with progressive lessons and analytics.',
    };
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
  const title = seo?.title || prettifySlug(id);

  return {
    title: `Learn: ${title}`,
    description: seo?.description || `Continue learning ${title} on CollegeHub.`,
    robots: { index: false, follow: false },
  };
}

export default async function LearnPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <LearnPageContent courseId={id} />;
}
