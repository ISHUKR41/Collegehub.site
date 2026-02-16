/**
 * twitter-image.tsx - Dynamic Twitter card image generation.
 *
 * Why this file exists:
 * - Provides a dedicated large-card image for social sharing.
 * - Prevents dependency on manually exported static assets.
 */

import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 600,
};

export const contentType = 'image/png';

export default function TwitterImage() {
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
            'radial-gradient(circle at 15% 20%, rgba(34,197,94,0.22), transparent 45%), radial-gradient(circle at 85% 75%, rgba(99,102,241,0.32), transparent 55%), linear-gradient(135deg, #090c1a, #0f172a)',
          color: '#f8fafc',
          padding: '52px',
        }}
      >
        <div style={{ fontSize: 24, letterSpacing: 1.5, opacity: 0.9 }}>
          COLLEGEHUB.SITE
        </div>
        <div
          style={{
            fontSize: 62,
            fontWeight: 700,
            lineHeight: 1.1,
            marginTop: 16,
            maxWidth: 940,
          }}
        >
          Smart Learning Paths for School and Coding
        </div>
        <div
          style={{
            fontSize: 28,
            color: '#cbd5e1',
            marginTop: 18,
            maxWidth: 960,
          }}
        >
          Progress lock, chapter tests, weakness analytics, and resume engine.
        </div>
      </div>
    ),
    { ...size }
  );
}

