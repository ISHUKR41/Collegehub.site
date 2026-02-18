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
          background: 'linear-gradient(145deg, #0f172a 0%, #1d4ed8 50%, #6366f1 100%)',
          borderRadius: '8px',
          border: '1px solid rgba(255,255,255,0.22)',
          boxSizing: 'border-box',
        }}
      >
        <span style={{ fontSize: '15px', fontWeight: 900, color: '#e0e7ff', fontFamily: 'ui-sans-serif' }}>
          L
        </span>
      </div>
    ),
    { ...size }
  );
}
