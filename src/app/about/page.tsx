/**
 * About page metadata and server wrapper.
 *
 * Why this file exists:
 * - Publishes About-page metadata.
 * - Injects AboutPage JSON-LD schema.
 * - Keeps interactive visuals in a separate client component.
 */

import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import { SITE_CONFIG } from '@/lib/constants';
import AboutPageContent from './AboutPageContent';

export const metadata: Metadata = {
  title: 'About Us - Mission, Vision, and Team',
  description:
    'Learn the CollegeHub mission, platform journey, and team building a learning intelligence ecosystem for students.',
  openGraph: {
    title: 'About CollegeHub - Mission, Vision, and Team',
    description:
      'How CollegeHub is building a secure, data-driven learning platform for school and coding students.',
    url: `${SITE_CONFIG.url}/about`,
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
    },
  };

  return (
    <>
      <JsonLd data={schema} />
      <AboutPageContent />
    </>
  );
}
