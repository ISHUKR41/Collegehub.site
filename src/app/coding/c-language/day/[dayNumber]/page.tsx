/**
 * Route: /coding/c-language/day/[dayNumber]
 *
 * Dynamic day page with full SEO: canonical URL, breadcrumbs,
 * and Course JSON-LD for each day lesson.
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { C_MASTERY_PHASES } from '@/lib/c-mastery-data';
import { SITE_CONFIG } from '@/lib/constants';
import JsonLd from '@/components/seo/JsonLd';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import DayPageContent from './DayPageContent';
import Day1Content from './Day1Content';

function findDay(dayNumber: number) {
  for (const phase of C_MASTERY_PHASES) {
    for (const day of phase.days) {
      if (day.day === dayNumber) {
        return { day, phase };
      }
    }
  }
  return null;
}

export async function generateStaticParams() {
  return C_MASTERY_PHASES.flatMap((phase) =>
    phase.days.map((day) => ({ dayNumber: String(day.day) }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ dayNumber: string }>;
}): Promise<Metadata> {
  const { dayNumber } = await params;
  const numericDay = Number.parseInt(dayNumber, 10);
  const result = findDay(numericDay);

  if (!result) {
    return { title: 'Day Not Found | C Mastery Blueprint — CollegeHub' };
  }

  const title = `Day ${numericDay} — ${result.day.title} | C Mastery Blueprint`;
  const description = numericDay === 1
    ? 'Master computational thinking foundations: how computers think, binary systems, memory architecture, variables, C program structure, compilation process. Interactive simulations, 100+ practice questions, and FAANG-level explanations.'
    : `${result.phase.name}: ${result.day.topics.slice(0, 6).join(', ')}. Master C programming with interactive simulations, detailed explanations, and hands-on coding practice.`;

  return {
    title,
    description,
    keywords: numericDay === 1
      ? ['C programming', 'computational thinking', 'binary system', 'memory architecture', 'compilation process', 'variables in C', 'how computer works', 'FAANG interview prep', 'C language tutorial', 'programming fundamentals']
      : ['C programming', result.day.title, ...result.day.topics.slice(0, 5)],
    alternates: {
      canonical: `${SITE_CONFIG.url}/coding/c-language/day/${numericDay}`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      siteName: 'CollegeHub — C Mastery Blueprint',
      url: `${SITE_CONFIG.url}/coding/c-language/day/${numericDay}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function DayPage({
  params,
}: {
  params: Promise<{ dayNumber: string }>;
}) {
  const { dayNumber } = await params;
  const numericDay = Number.parseInt(dayNumber, 10);

  if (Number.isNaN(numericDay) || numericDay < 1 || numericDay > 40) {
    notFound();
  }

  const result = findDay(numericDay);
  if (!result) {
    notFound();
  }

  const totalDays = C_MASTERY_PHASES.reduce((sum, phase) => sum + phase.days.length, 0);

  const daySchema = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: `Day ${numericDay} — ${result.day.title}`,
    description: `${result.phase.name}: ${result.day.topics.join(', ')}`,
    url: `${SITE_CONFIG.url}/coding/c-language/day/${numericDay}`,
    learningResourceType: 'lesson',
    educationalLevel: 'Beginner to Advanced',
    inLanguage: 'en',
    isAccessibleForFree: true,
    isPartOf: {
      '@type': 'Course',
      name: '40-Day C Mastery Blueprint',
      url: `${SITE_CONFIG.url}/coding/c-language`,
      provider: {
        '@type': 'Organization',
        name: SITE_CONFIG.name,
      },
    },
    teaches: result.day.topics,
    position: numericDay,
  };

  if (numericDay === 1) {
    return (
      <>
        <JsonLd data={daySchema} />
        <BreadcrumbJsonLd
          items={[
            { name: 'Home', href: '/' },
            { name: 'Coding', href: '/coding' },
            { name: 'C Language', href: '/coding/c-language' },
            { name: `Day ${numericDay}`, href: `/coding/c-language/day/${numericDay}` },
          ]}
        />
        <Day1Content />
      </>
    );
  }

  return (
    <>
      <JsonLd data={daySchema} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Coding', href: '/coding' },
          { name: 'C Language', href: '/coding/c-language' },
          { name: `Day ${numericDay}`, href: `/coding/c-language/day/${numericDay}` },
        ]}
      />
      <DayPageContent day={result.day} phase={result.phase} totalDays={totalDays} />
    </>
  );
}
