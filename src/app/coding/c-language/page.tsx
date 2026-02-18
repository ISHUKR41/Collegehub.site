/**
 * C language page metadata and schema wrapper.
 */

import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
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
  openGraph: {
    title: 'Learn C Language - 40-Day Mastery Blueprint | CollegeHub',
    description: 'From zero to system-level programmer in 40 days. Practice code directly in browser.',
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
  };

  return (
    <>
      <JsonLd data={schema} />
      <CLangPageContent />
    </>
  );
}
