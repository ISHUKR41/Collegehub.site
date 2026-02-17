/**
 * Dynamic favicon for Coding section
 * Uses Next.js ImageResponse for programmatic SVG favicon
 */

import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

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
          background: 'linear-gradient(135deg, #0d1117 0%, #1e1b4b 100%)',
          borderRadius: '6px',
        }}
      >
        <span
          style={{
            fontSize: '16px',
            fontWeight: 900,
            color: '#6366f1',
            fontFamily: 'monospace',
          }}
        >
          {'</>'}
        </span>
      </div>
    ),
    { ...size },
  );
}
