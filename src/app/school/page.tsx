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
  title: 'School - Class 9 and Class 10 CBSE Study Material',
  description:
    'Complete CBSE study material for Class 9 and Class 10 with chapter lessons, subject tests, and progress analytics.',
  keywords: [
    'class 9 study material',
    'class 10 CBSE notes',
    'CBSE chapter tests',
    'school analytics dashboard',
    'board exam preparation',
  ],
  openGraph: {
    title: 'School - Class 9 and Class 10 CBSE Study Material | CollegeHub',
    description:
      'Chapter-level learning with tests, lock-flow progression, and performance tracking.',
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
    about: ['CBSE Class 9', 'CBSE Class 10', 'Mathematics', 'Science', 'English'],
  };

  return (
    <>
      <JsonLd data={schema} />
      <SchoolPageContent />
    </>
  );
}
