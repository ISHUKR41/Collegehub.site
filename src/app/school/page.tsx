/**
 * School page metadata and server wrapper.
 *
 * Why this file exists:
 * - Exports route-level SEO metadata.
 * - Injects structured data for search engines.
 * - Keeps interactive UI in a separate client component.
 */

import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import { SITE_CONFIG } from '@/lib/constants';
import SchoolPageContent from './SchoolPageContent';

export const metadata: Metadata = {
  title: 'School - Class 9 and Class 10 CBSE Study Material | Free Online Lessons',
  description:
    'Complete CBSE study material for Class 9 and Class 10. Chapter-wise lessons, subject tests, progress analytics, weakness detection, and board exam preparation — all free on CollegeHub.',
  keywords: [
    'class 9 study material',
    'class 10 CBSE notes',
    'CBSE chapter tests',
    'school analytics dashboard',
    'board exam preparation',
    'class 9 online classes',
    'class 10 online classes',
    'CBSE maths class 9',
    'CBSE science class 10',
    'free CBSE notes online',
    'class 9 class 10 study portal',
    'online school learning platform India',
    'CBSE chapter wise tests online',
    'class 10 board exam preparation free',
    'best study material for class 9',
    'school subject analytics',
    'CBSE English class 10 notes',
    'Hindi study material class 9',
    'Social Science CBSE notes',
    'computer science class 10 CBSE',
  ],
  openGraph: {
    title: 'School - Class 9 and Class 10 CBSE Study Material | CollegeHub',
    description:
      'Chapter-level learning with tests, lock-flow progression, and performance tracking for CBSE Class 9 & 10 students.',
    url: `${SITE_CONFIG.url}/school`,
  },
};

export default function SchoolPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'CollegeHub School Section',
    url: `${SITE_CONFIG.url}/school`,
    description:
      'Class 9 and Class 10 subjects with chapter-level lessons and test analytics.',
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    about: ['CBSE Class 9', 'CBSE Class 10', 'Mathematics', 'Science', 'English', 'Social Science', 'Hindi', 'Computer Science'],
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
      description: 'CBSE Class 9 and Class 10 students preparing for board exams',
    },
    educationalLevel: 'Secondary Education',
    inLanguage: ['en', 'hi'],
  };

  return (
    <>
      <JsonLd data={schema} />
      <SchoolPageContent />
    </>
  );
}
