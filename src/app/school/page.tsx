/**
 * School Page — Class 9 & 10 CBSE Section
 * 
 * Comprehensive school section with:
 * - Hero banner for school
 * - Class selector tabs (9 & 10)
 * - Subject cards with icons and chapter counts
 * - Exam pattern section
 * - Study roadmap
 * - Study tips section
 * - CTA to enroll
 * 
 * Why: School students need to see all subjects organized clearly.
 * The page builds confidence in the platform's coverage.
 * 
 * To extend: Add individual subject pages. Fetch real course data from API.
 */

import type { Metadata } from 'next';
import SchoolPageContent from './SchoolPageContent';

/* SEO metadata for the School page */
export const metadata: Metadata = {
    title: 'School — Class 9 & 10 CBSE Study Material',
    description: 'Complete CBSE study material for Class 9 and Class 10. Mathematics, Science, English, Social Science, and more. Chapter-wise lessons, tests, and performance analytics.',
    keywords: [
        'class 9 study material',
        'class 10 CBSE notes',
        'CBSE mathematics',
        'science class 10',
        'school study platform',
        'free class 9 notes',
        'board exam preparation',
    ],
    openGraph: {
        title: 'School — Class 9 & 10 CBSE Study Material | CollegeHub',
        description: 'Complete CBSE study material with chapter tests and performance analytics.',
    },
};

export default function SchoolPage() {
    return <SchoolPageContent />;
}
