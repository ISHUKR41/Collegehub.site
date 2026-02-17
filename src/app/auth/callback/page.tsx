/**
 * auth/callback/page.tsx - Handles Google OAuth redirect from backend.
 *
 * Flow:
 * 1. Backend redirects here with ?token=<accessToken> after Google OAuth
 * 2. This page stores the token in memory via auth service
 * 3. Redirects to dashboard (or login if error occurred)
 */

import AuthCallbackContent from './AuthCallbackContent';

export const metadata = {
  title: 'Authenticating... | CollegeHub',
  description: 'Processing your login.',
  robots: { index: false, follow: false },
};

export default function AuthCallbackPage() {
  return <AuthCallbackContent />;
}
