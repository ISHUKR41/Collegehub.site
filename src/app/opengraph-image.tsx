/**
 * opengraph-image.tsx - Dynamic OG image generation.
 *
 * Why this file exists:
 * - Ensures a real Open Graph image is always available at build/runtime.
 * - Avoids broken social cards from missing static image assets.
 * - Keeps branding text synchronized with site metadata.
 */

import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background:
            'radial-gradient(circle at 20% 20%, rgba(99,102,241,0.45), transparent 45%), radial-gradient(circle at 80% 80%, rgba(139,92,246,0.35), transparent 50%), linear-gradient(140deg, #0a0a12, #17192b)',
          color: '#f8fafc',
          padding: '64px',
        }}
      >
        <div
          style={{
            fontSize: 28,
            opacity: 0.9,
            letterSpacing: 2,
            textTransform: 'uppercase',
          }}
        >
          CollegeHub.site
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.1,
            marginTop: 24,
            maxWidth: 900,
          }}
        >
          School + Coding Learning Intelligence Platform
        </div>
        <div
          style={{
            fontSize: 30,
            color: '#cbd5e1',
            marginTop: 20,
            maxWidth: 920,
          }}
        >
          Resume exactly where you left. Track weak topics. Learn with structured progress.
        </div>
      </div>
    ),
    { ...size }
  );
}

