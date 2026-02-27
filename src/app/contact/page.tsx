/**
 * Contact page metadata and server wrapper.
 *
 * Adds route-level metadata, JSON-LD, and breadcrumb schema.
 */

import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import { SITE_CONFIG } from '@/lib/constants';
import ContactPageContent from './ContactPageContent';

export const metadata: Metadata = {
  title: 'Contact Us - Support, Partnerships & Queries | CollegeHub',
  description:
    'Contact CollegeHub for support, partnerships, feedback, and learning-related questions. Get in touch with our team for technical help, suggestions, or collaborations.',
  keywords: [
    'contact CollegeHub',
    'CollegeHub support',
    'learning platform help',
    'CollegeHub feedback',
    'education platform contact India',
  ],
  alternates: {
    canonical: `${SITE_CONFIG.url}/contact`,
  },
  openGraph: {
    title: 'Contact CollegeHub - Support and Queries',
    description:
      'Reach the CollegeHub team for support requests, feature suggestions, and partnership discussions.',
    url: `${SITE_CONFIG.url}/contact`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact CollegeHub - Support and Queries',
    description:
      'Reach the CollegeHub team for support requests, feature suggestions, and partnership discussions.',
  },
};

export default function ContactPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact CollegeHub',
    url: `${SITE_CONFIG.url}/contact`,
    description: 'Contact page for CollegeHub support and collaboration requests.',
    mainEntity: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'hello@collegehub.site',
        availableLanguage: ['English', 'Hindi'],
      },
    },
  };

  return (
    <>
      <JsonLd data={schema} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Contact', href: '/contact' },
        ]}
      />
      <ContactPageContent />
    </>
  );
}
