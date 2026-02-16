/**
 * JsonLd.tsx - Reusable JSON-LD script injector.
 *
 * Why this helper exists:
 * - Keeps page files clean when adding structured data.
 * - Ensures consistent JSON serialization across routes.
 * - Makes schema extension straightforward as SEO grows.
 */

interface JsonLdProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

