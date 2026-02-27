/**
 * About page metadata and server wrapper.
 *
 * Publishes About-page metadata, JSON-LD, and breadcrumb schema.
 */

import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import { SITE_CONFIG } from '@/lib/constants';
import AboutPageContent from './AboutPageContent';

export const metadata: Metadata = {
  title: 'About Us - Our Mission, Vision & Team | CollegeHub',
  description:
    'Learn about the CollegeHub mission to make quality education accessible. Meet the team building a free, data-driven learning platform for school and coding students across India.',
  keywords: [
    'about CollegeHub',
    'CollegeHub mission',
    'education startup India',
    'free learning platform',
    'online education team',
    'EdTech startup India',
    'student learning platform',
  ],
  alternates: {
    canonical: `${SITE_CONFIG.url}/about`,
  },
  openGraph: {
    title: 'About CollegeHub - Mission, Vision, and Team',
    description:
      'How CollegeHub is building a secure, data-driven learning platform for school and coding students.',
    url: `${SITE_CONFIG.url}/about`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About CollegeHub - Mission, Vision, and Team',
    description:
      'How CollegeHub is building a secure, data-driven learning platform for school and coding students.',
  },
};

export default function AboutPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About CollegeHub',
    url: `${SITE_CONFIG.url}/about`,
    description:
      'About CollegeHub mission, team, timeline, and educational platform approach.',
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      foundingDate: '2024',
      areaServed: 'India',
    },
  };

  return (
    <>
      <JsonLd data={schema} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'About', href: '/about' },
        ]}
      />
      <AboutPageContent />
    </>
  );
}
