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
          background: 'linear-gradient(145deg, #111827 0%, #1d4ed8 55%, #38bdf8 100%)',
          borderRadius: '8px',
          boxSizing: 'border-box',
          border: '1px solid rgba(255,255,255,0.2)',
        }}
      >
        <span
          style={{
            fontSize: '15px',
            fontWeight: 800,
            color: '#f8fafc',
            fontFamily: 'ui-sans-serif',
          }}
        >
          S
        </span>
      </div>
    ),
    { ...size }
  );
}

