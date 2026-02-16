/**
 * page.tsx — Landing page (Home)
 * 
 * The main entry point of CollegeHub. This is the longest and most
 * detailed page, composed of multiple section components:
 * 
 * 1. Hero — Animated gradient with CTA
 * 2. Stats — Animated counters
 * 3. Features — Why Choose Us grid
 * 4. Learning Path — Timeline showing the learning journey
 * 5. School Preview — Class 9 & 10 subjects
 * 6. Coding Preview — Programming languages + code snippet
 * 7. Testimonials — Student reviews
 * 8. FAQ — Accordion questions
 * 9. Newsletter — Email signup CTA
 * 
 * Why: Everything is a separate component for maintainability.
 * The page itself just composes them in order.
 * 
 * To extend: Add more sections (Partners, Blog, Live Classes).
 */

import Hero from '@/components/sections/Hero';
import StatsSection from '@/components/sections/StatsSection';
import FeaturesGrid from '@/components/sections/FeaturesGrid';
import LearningPath from '@/components/sections/LearningPath';
import SchoolPreview from '@/components/sections/SchoolPreview';
import CodingPreview from '@/components/sections/CodingPreview';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import Newsletter from '@/components/sections/Newsletter';

export default function HomePage() {
  return (
    <>
      {/* Hero — First impression, animated gradient + CTAs */}
      <Hero />

      {/* Stats — Social proof numbers */}
      <StatsSection />

      {/* Divider */}
      <div className="container-custom">
        <div className="divider-gradient" />
      </div>

      {/* Features — Why Choose Us */}
      <FeaturesGrid />

      {/* Learning Path — How It Works timeline */}
      <LearningPath />

      {/* Divider */}
      <div className="container-custom">
        <div className="divider-gradient" />
      </div>

      {/* School Preview — Class 9 & 10 */}
      <SchoolPreview />

      {/* Coding Preview — Programming languages */}
      <CodingPreview />

      {/* Divider */}
      <div className="container-custom">
        <div className="divider-gradient" />
      </div>

      {/* Testimonials — Student reviews */}
      <Testimonials />

      {/* FAQ — Common questions */}
      <FAQ />

      {/* Newsletter — Email CTA */}
      <Newsletter />
    </>
  );
}
