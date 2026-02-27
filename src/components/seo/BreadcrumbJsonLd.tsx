/**
 * BreadcrumbJsonLd.tsx — Reusable BreadcrumbList structured data.
 *
 * Emits a schema.org BreadcrumbList JSON-LD script so Google
 * can show breadcrumb trails in search results.
 *
 * Usage:
 *   <BreadcrumbJsonLd items={[
 *     { name: 'Home', href: '/' },
 *     { name: 'Coding', href: '/coding' },
 *     { name: 'C Language', href: '/coding/c-language' },
 *   ]} />
 */

import { SITE_CONFIG } from '@/lib/constants';

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

export default function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.href === '/' ? '' : item.href}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  );
}
