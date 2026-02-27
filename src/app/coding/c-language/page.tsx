/**
 * C language page metadata and schema wrapper.
 */

import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import { SITE_CONFIG } from '@/lib/constants';
import CLangPageContent from './CLangPageContent';

export const metadata: Metadata = {
  title: 'Learn C Language - 40-Day Mastery Blueprint | Free Course with Code Editor',
  description:
    'Master C programming in 40 days, from zero to system-level programmer. Daily pages with topics, exercises, and in-browser coding.',
  keywords: [
    'learn C programming',
    'C language course',
    'C programming for beginners',
    'learn C online free',
    '40 day C course',
    'C programming exercises',
    'online C compiler',
    'C interview preparation',
  ],
  alternates: {
    canonical: `${SITE_CONFIG.url}/coding/c-language`,
  },
  openGraph: {
    title: 'Learn C Language - 40-Day Mastery Blueprint | CollegeHub',
    description: 'From zero to system-level programmer in 40 days. Practice code directly in browser.',
    url: `${SITE_CONFIG.url}/coding/c-language`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Learn C Language - 40-Day Mastery Blueprint | CollegeHub',
    description: 'From zero to system-level programmer in 40 days. Practice code directly in browser.',
  },
};

export default function CLangPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: '40-Day C Mastery Blueprint',
    url: `${SITE_CONFIG.url}/coding/c-language`,
    description:
      'Master C programming in 40 days with structured daily lessons, practice problems, and an in-browser code editor.',
    provider: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    educationalLevel: 'Beginner to Advanced',
    programmingLanguage: 'C',
    timeRequired: 'P40D',
    inLanguage: 'en',
    isAccessibleForFree: true,
    numberOfCredits: 40,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'P40D',
    },
  };

  return (
    <>
      <JsonLd data={schema} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Coding', href: '/coding' },
          { name: 'C Language', href: '/coding/c-language' },
        ]}
      />
      <CLangPageContent />
    </>
  );
}
