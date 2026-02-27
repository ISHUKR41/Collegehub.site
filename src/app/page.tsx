/**
 * page.tsx - Landing page (Home)
 *
 * The main entry point of CollegeHub. Composed of multiple section components.
 * Includes WebSite and FAQPage JSON-LD schemas for rich search results.
 */

import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import StatsSection from '@/components/sections/StatsSection';
import FeaturesGrid from '@/components/sections/FeaturesGrid';
import HowItWorks from '@/components/sections/HowItWorks';
import LearningPath from '@/components/sections/LearningPath';
import SchoolPreview from '@/components/sections/SchoolPreview';
import CodingPreview from '@/components/sections/CodingPreview';
import Testimonials from '@/components/sections/Testimonials';
import PartnersSection from '@/components/sections/PartnersSection';
import FAQ from '@/components/sections/FAQ';
import Newsletter from '@/components/sections/Newsletter';
import JsonLd from '@/components/seo/JsonLd';
import { SITE_CONFIG, FAQ_ITEMS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Home - School and Coding Learning Platform',
  description:
    'CollegeHub helps Class 9 and Class 10 students and coding learners with structured courses, chapter tests, and personalized analytics.',
  keywords: [
    'collegehub.site',
    'class 9 online classes',
    'class 10 CBSE platform',
    'learn coding online India',
    'cpp java python web development',
    'learning analytics dashboard',
  ],
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  openGraph: {
    title: 'CollegeHub - School and Coding Learning Platform',
    description:
      'Structured school and coding learning paths with test analytics and resume tracking.',
    url: SITE_CONFIG.url,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CollegeHub - School and Coding Learning Platform',
    description:
      'Structured school and coding learning paths with test analytics and resume tracking.',
  },
};

export default function HomePage() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    inLanguage: 'en-IN',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_CONFIG.url}/coding`,
      'query-input': 'required name=search_term_string',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={websiteSchema} />
      <JsonLd data={faqSchema} />

      {/* Hero - First impression, animated gradient plus CTAs */}
      <Hero />

      {/* Stats - Social proof numbers */}
      <StatsSection />

      {/* Divider */}
      <div className="container-custom">
        <div className="divider-gradient" />
      </div>

      {/* Features - Why Choose Us */}
      <FeaturesGrid />

      {/* How It Works - 5-step learning journey */}
      <HowItWorks />

      {/* Learning Path - Visual learning path */}
      <LearningPath />

      {/* Divider */}
      <div className="container-custom">
        <div className="divider-gradient" />
      </div>

      {/* School Preview - Class 9 and Class 10 */}
      <SchoolPreview />

      {/* Coding Preview - Programming languages */}
      <CodingPreview />

      {/* Divider */}
      <div className="container-custom">
        <div className="divider-gradient" />
      </div>

      {/* Testimonials - Student reviews */}
      <Testimonials />

      {/* Partners - Trust signals and brand badges */}
      <PartnersSection />

      {/* Divider */}
      <div className="container-custom">
        <div className="divider-gradient" />
      </div>

      {/* FAQ - Common questions */}
      <FAQ />

      {/* Newsletter - Email CTA */}
      <Newsletter />
    </>
  );
}
