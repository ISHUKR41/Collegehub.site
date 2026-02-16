/**
 * Dashboard page - Personalized analytics and resume overview.
 */

import type { Metadata } from 'next';
import DashboardPageContent from './DashboardPageContent';

export const metadata: Metadata = {
  title: 'Dashboard - Learning Analytics',
  description:
    'Track your subject performance, weak topics, and resume learning journey with CollegeHub analytics dashboard.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardPage() {
  return <DashboardPageContent />;
}

