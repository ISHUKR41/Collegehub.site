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
          background: 'linear-gradient(135deg, #0a0a14 0%, #0d1117 50%, #0a0a14 100%)',
          borderRadius: '7px',
          boxSizing: 'border-box',
          border: '1.5px solid rgba(34,197,94,0.35)',
        }}
      >
        <span
          style={{
            fontSize: '10px',
            fontWeight: 900,
            color: '#22c55e',
            fontFamily: 'monospace',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span style={{ opacity: 0.6, fontSize: '11px' }}>{`{`}</span>
          <span style={{ color: '#bbf7d0', fontSize: '11px', fontWeight: 900 }}>C</span>
          <span style={{ opacity: 0.6, fontSize: '11px' }}>{`}`}</span>
        </span>
      </div>
    ),
    { ...size }
  );
}
