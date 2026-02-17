/**
 * Dynamic favicon for C Language section
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
          background: 'linear-gradient(135deg, #0d1117 0%, #1a1a2e 100%)',
          borderRadius: '6px',
        }}
      >
        <span
          style={{
            fontSize: '20px',
            fontWeight: 900,
            color: '#A8B9CC',
            fontFamily: 'monospace',
          }}
        >
          C
        </span>
      </div>
    ),
    { ...size },
  );
}
