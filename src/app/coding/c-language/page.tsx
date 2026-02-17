/**
 * C Language page metadata and server wrapper.
 * Exports route-level SEO metadata and JSON-LD schema.
 */

import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import { SITE_CONFIG } from '@/lib/constants';
import CLangPageContent from './CLangPageContent';

export const metadata: Metadata = {
  title: 'Learn C Language - 40-Day Mastery Blueprint | Free Online Course with Code Editor',
  description:
    'Master C programming in 40 days — from zero to system-level programmer. Structured daily lessons with topics, exercises, and an in-browser code editor. No external tools needed. Free on CollegeHub.',
  keywords: [
    'learn C programming',
    'C language course',
    'C programming for beginners',
    'learn C online free',
    'C language tutorial',
    '40 day C course',
    'C programming exercises',
    'online C compiler',
    'C code editor online',
    'C programming India',
    'pointers in C',
    'data structures in C',
    'C interview questions',
    'system programming C',
    'C programming practice problems',
  ],
  openGraph: {
    title: 'Learn C Language - 40-Day Mastery Blueprint | CollegeHub',
    description:
      'From zero to system-level programmer in 40 days. Practice C code in your browser.',
    url: `${SITE_CONFIG.url}/coding/c-language`,
  },
};

export default function CLangPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: '40-Day C Mastery Blueprint',
    url: `${SITE_CONFIG.url}/coding/c-language`,
    description:
      'Master C programming in 40 days with structured lessons, exercises, and in-browser code editor.',
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
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
      description: 'College students, coding beginners, and aspiring system programmers',
    },
  };

  return (
    <>
      <JsonLd data={schema} />
      <CLangPageContent />
    </>
  );
}
