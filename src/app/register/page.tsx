/**
 * Register page entry point.
 *
 * Exports metadata in a server component and renders client form UI.
 */

import type { Metadata } from 'next';
import RegisterPageContent from './RegisterPageContent';

export const metadata: Metadata = {
  title: 'Create Account - Start Learning',
  description:
    'Create your CollegeHub account to enroll in school and coding courses with personalized analytics.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function RegisterPage() {
  return <RegisterPageContent />;
}
