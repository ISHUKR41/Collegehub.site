/**
 * Coding page metadata and server wrapper.
 *
 * Exports route-level SEO metadata, JSON-LD, and breadcrumb schema.
 */

import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import { SITE_CONFIG } from '@/lib/constants';
import CodingPageContent from './CodingPageContent';

export const metadata: Metadata = {
  title: 'Coding - Learn C, C++, Java, Python & Web Development | Free Online Courses',
  description:
    'Structured programming courses from beginner to advanced. Learn C, C++, Java, Python, and full-stack Web Development with practice problems, tests, and weakness analytics — all free on CollegeHub.',
  keywords: [
    'learn C++ online',
    'learn C++ online India',
    'java programming course',
    'python for beginners',
    'web development roadmap',
    'coding practice platform India',
    'best coding website for students',
    'learn Java online free',
    'Python tutorial for beginners India',
    'full stack web development course free',
    'C++ competitive programming',
    'learn programming online India',
    'coding roadmap for beginners',
    'free coding courses for students',
    'learn HTML CSS JavaScript free',
    'React.js Node.js course',
    'coding for college students',
    'DSA online course free',
    'programming languages for beginners',
    'best online coding platform India',
  ],
  alternates: {
    canonical: `${SITE_CONFIG.url}/coding`,
  },
  openGraph: {
    title: 'Coding - Learn C, C++, Java, Python & Web Development | CollegeHub',
    description:
      'Practice-first coding tracks with progressive unlock, evaluation tests, and dashboard insights.',
    url: `${SITE_CONFIG.url}/coding`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coding - Learn C, C++, Java, Python & Web Development | CollegeHub',
    description:
      'Practice-first coding tracks with progressive unlock, evaluation tests, and dashboard insights.',
  },
};

export default function CodingPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'CollegeHub Coding Section',
    url: `${SITE_CONFIG.url}/coding`,
    description:
      'Coding courses in C, C++, Java, Python, and Web Development with assessments and analytics.',
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    about: ['C', 'C++', 'Java', 'Python', 'Web Development', 'HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
      description: 'College students, coding beginners, and aspiring developers in India',
    },
    educationalLevel: 'Beginner to Advanced',
    inLanguage: 'en',
  };

  return (
    <>
      <JsonLd data={schema} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Coding', href: '/coding' },
        ]}
      />
      <CodingPageContent />
    </>
  );
}
