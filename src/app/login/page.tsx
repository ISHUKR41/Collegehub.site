/**
 * Login page entry point.
 *
 * Keeps metadata in a server component and renders the client form
 * in a separate file.
 */

import type { Metadata } from 'next';
import LoginPageContent from './LoginPageContent';

export const metadata: Metadata = {
  title: 'Login - Continue Learning',
  description:
    'Sign in to CollegeHub to resume your lessons, track analytics, and continue your learning journey.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string | string[] }>;
}) {
  const params = await searchParams;
  const nextParam = Array.isArray(params.next) ? params.next[0] : params.next;

  return <LoginPageContent initialNextPath={nextParam || null} />;
}
