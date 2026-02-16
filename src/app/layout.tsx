/**
 * layout.tsx — Root layout for the entire CollegeHub application
 * 
 * This is the top-level layout that wraps every page. It includes:
 * - Inter font from Google Fonts
 * - Global metadata (SEO, OpenGraph, Twitter Cards)
 * - ScrollProgress indicator
 * - Navbar (sticky at top)
 * - Footer (at bottom of every page)
 * - JSON-LD structured data for SEO
 * 
 * Why this approach:
 * - Next.js App Router uses layout.tsx as the persistent wrapper
 * - Metadata export handles all SEO tags automatically
 * - Inter font is loaded via next/font for optimal performance
 * 
 * To extend: Add providers (React Query, Auth) here.
 * Add global error boundary or loading state.
 */

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/layout/ScrollProgress';
import { SITE_CONFIG } from '@/lib/constants';

/* Load Inter font with subsets for optimal performance */
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

/* Global SEO metadata — applied to all pages unless overridden */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [...SITE_CONFIG.keywords],
  authors: [{ name: SITE_CONFIG.author }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,

  /* OpenGraph for social media sharing */
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },

  /* Twitter card for Twitter sharing */
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    images: ['/og-image.png'],
    creator: SITE_CONFIG.social.twitter,
  },

  /* Robots and indexing */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  /* Alternate languages (future) */
  alternates: {
    canonical: SITE_CONFIG.url,
  },
};

/**
 * RootLayout — Wraps all pages with shared UI and metadata.
 * Children are the page components that change per route.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* JSON-LD Structured Data for Google SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: SITE_CONFIG.name,
              url: SITE_CONFIG.url,
              description: SITE_CONFIG.description,
              sameAs: [
                SITE_CONFIG.social.github,
                SITE_CONFIG.social.linkedin,
                SITE_CONFIG.social.instagram,
                SITE_CONFIG.social.youtube,
              ],
              offers: {
                '@type': 'Offer',
                category: 'Online Education',
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-[#0a0a12] text-[#f1f5f9] antialiased">
        {/* Scroll progress bar at the very top */}
        <ScrollProgress />

        {/* Sticky navigation */}
        <Navbar />

        {/* Page content — changes per route */}
        <main>{children}</main>

        {/* Site-wide footer */}
        <Footer />
      </body>
    </html>
  );
}
