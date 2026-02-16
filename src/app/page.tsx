/**
 * page.tsx - Landing page (Home)
 *
 * The main entry point of CollegeHub. This is the longest and most
 * detailed page, composed of multiple section components:
 *
 * 1. Hero - Animated gradient with CTA
 * 2. Stats - Animated counters
 * 3. Features - Why Choose Us grid
 * 4. Learning Path - Timeline showing the learning journey
 * 5. School Preview - Class 9 and Class 10 subjects
 * 6. Coding Preview - Programming languages and code snippet
 * 7. Testimonials - Student reviews
 * 8. FAQ - Accordion questions
 * 9. Newsletter - Email signup CTA
 *
 * Why: Everything is a separate component for maintainability.
 * The page itself just composes them in order.
 *
 * To extend: Add more sections (Partners, Blog, Live Classes).
 */

import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import StatsSection from '@/components/sections/StatsSection';
import FeaturesGrid from '@/components/sections/FeaturesGrid';
import LearningPath from '@/components/sections/LearningPath';
import SchoolPreview from '@/components/sections/SchoolPreview';
import CodingPreview from '@/components/sections/CodingPreview';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import Newsletter from '@/components/sections/Newsletter';
import JsonLd from '@/components/seo/JsonLd';
import { SITE_CONFIG } from '@/lib/constants';

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
  openGraph: {
    title: 'CollegeHub - School and Coding Learning Platform',
    description:
      'Structured school and coding learning paths with test analytics and resume tracking.',
    url: SITE_CONFIG.url,
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

  return (
    <>
      <JsonLd data={websiteSchema} />

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

      {/* Learning Path - How it works timeline */}
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

      {/* FAQ - Common questions */}
      <FAQ />

      {/* Newsletter - Email CTA */}
      <Newsletter />
    </>
  );
}
