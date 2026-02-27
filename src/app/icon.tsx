/**
 * icon.tsx — Dynamic Favicon Generator for CollegeHub.
 *
 * This file generates a 32x32 PNG favicon at build time using Next.js
 * ImageResponse API. The favicon features the "CH" monogram with
 * a green-to-blue gradient, matching the CollegeHub brand identity.
 *
 * For beginners:
 * - Next.js can generate favicons dynamically using React components
 * - The ImageResponse API converts JSX to an image at build time
 * - This approach means the favicon always matches the site's theme
 * - The exported `size` and `contentType` tell Next.js what to produce
 */

import { ImageResponse } from 'next/og';

/* ─── Favicon dimensions: 32x32 pixels (standard browser tab icon size) ─── */
export const size = { width: 32, height: 32 };

/* ─── Output format: PNG for transparency support ─── */
export const contentType = 'image/png';

/**
 * Icon — Renders the CollegeHub favicon.
 *
 * Design: Dark background with a green "{ CH }" monogram that
 * represents the coding + education branding of CollegeHub.
 * The curly braces symbolise code, and "CH" stands for CollegeHub.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          /* Dark background matching the site's theme */
          background: 'linear-gradient(135deg, #0a0a14 0%, #0d1117 50%, #0a0a14 100%)',
          borderRadius: '7px',
          boxSizing: 'border-box',
          /* Subtle green border for brand recognition */
          border: '1.5px solid rgba(34,197,94,0.5)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Radial glow effect behind the text — adds depth */}
        <div
          style={{
            position: 'absolute',
            top: '-6px',
            left: '-6px',
            right: '-6px',
            bottom: '-6px',
            background: 'radial-gradient(circle at center, rgba(34,197,94,0.15) 0%, transparent 70%)',
            display: 'flex',
          }}
        />
        {/* CH monogram with code braces — the core brand mark */}
        <span
          style={{
            fontSize: '10px',
            fontWeight: 900,
            color: '#22c55e',
            letterSpacing: '-0.3px',
            fontFamily: 'monospace',
            display: 'flex',
            alignItems: 'center',
            gap: '0px',
          }}
        >
          {/* Opening brace — slightly translucent for depth */}
          <span style={{ color: '#22c55e', opacity: 0.8, fontSize: '13px', fontWeight: 700 }}>{`{`}</span>
          {/* CH text — bright white-green for contrast */}
          <span style={{ color: '#f0fdf4', fontSize: '11px', fontWeight: 900, letterSpacing: '-0.5px' }}>CH</span>
          {/* Closing brace */}
          <span style={{ color: '#22c55e', opacity: 0.8, fontSize: '13px', fontWeight: 700 }}>{`}`}</span>
        </span>
      </div>
    ),
    { ...size }
  );
}
