/**
 * Course Detail Page — Dynamic route for individual courses
 * 
 * Shows full details for a specific course:
 * - Course hero with title and metadata
 * - Curriculum accordion (expandable chapters)
 * - Instructor section
 * - Student reviews
 * - Related courses
 * - Enrollment CTA
 * 
 * Uses dynamic [id] parameter from the URL.
 * In production, fetch course data from the backend API.
 * Currently uses static data for demonstration.
 * 
 * To extend: Connect to backend /api/courses/:id endpoint.
 */

import type { Metadata } from 'next';
import CourseDetailContent from './CourseDetailContent';

/* Dynamic SEO metadata based on course ID */
export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    const title = id.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    return {
        title: `${title} — Course Detail`,
        description: `Learn ${title} with structured lessons, practice problems, chapter tests, and performance analytics on CollegeHub.`,
    };
}

export default async function CourseDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    return <CourseDetailContent courseId={id} />;
}
