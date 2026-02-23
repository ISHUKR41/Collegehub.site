/**
 * Route: /coding/c-language/day/[dayNumber]
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { C_MASTERY_PHASES } from '@/lib/c-mastery-data';
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
    return { title: 'Day Not Found | C Mastery' };
  }

  return {
    title: `Day ${numericDay} - ${result.day.title} | C Mastery`,
    description: `${result.phase.name}: ${result.day.topics.slice(0, 4).join(', ')}. Learn and practice with in-browser coding.`,
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

  if (numericDay === 1) {
    return <Day1Content />;
  }

  return <DayPageContent day={result.day} phase={result.phase} totalDays={totalDays} />;
}
