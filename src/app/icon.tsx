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
          background: 'linear-gradient(135deg, #0b1220 0%, #1e293b 55%, #16a34a 100%)',
          borderRadius: '8px',
          boxSizing: 'border-box',
          border: '1px solid rgba(255,255,255,0.25)',
        }}
      >
        <span
          style={{
            fontSize: '14px',
            fontWeight: 800,
            color: '#f8fafc',
            letterSpacing: '-0.4px',
            fontFamily: 'ui-sans-serif',
          }}
        >
          CH
        </span>
      </div>
    ),
    { ...size }
  );
}

