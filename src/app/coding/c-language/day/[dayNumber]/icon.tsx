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
          background: 'linear-gradient(145deg, #0f172a 0%, #14532d 55%, #22c55e 100%)',
          borderRadius: '8px',
          boxSizing: 'border-box',
          border: '1px solid rgba(255,255,255,0.22)',
        }}
      >
        <span
          style={{
            fontSize: '14px',
            fontWeight: 900,
            color: '#dcfce7',
            fontFamily: 'ui-monospace',
          }}
        >
          D
        </span>
      </div>
    ),
    { ...size }
  );
}

