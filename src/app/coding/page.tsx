/**
 * Coding Page — Programming languages section
 * 
 * Server component entry that exports SEO metadata
 * and renders CodingPageContent client component.
 */

import type { Metadata } from 'next';
import CodingPageContent from './CodingPageContent';

export const metadata: Metadata = {
    title: 'Coding — Learn C++, Java, Python, Web Development',
    description: 'Structured programming courses from beginner to advanced. Learn C++, Java, Python, and Web Development with practice problems, tests, and topic-wise analytics.',
    keywords: [
        'learn C++ online',
        'Java programming course',
        'Python for beginners',
        'web development course India',
        'coding for college students',
        'programming tutorials',
    ],
    openGraph: {
        title: 'Coding — Learn C++, Java, Python, Web Development | CollegeHub',
        description: 'Structured programming courses with practice problems and analytics.',
    },
};

export default function CodingPage() {
    return <CodingPageContent />;
}
