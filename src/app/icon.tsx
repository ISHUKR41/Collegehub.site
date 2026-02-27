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
          border: '1.5px solid rgba(34,197,94,0.4)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Green glow effect */}
        <div
          style={{
            position: 'absolute',
            top: '-4px',
            left: '-4px',
            right: '-4px',
            bottom: '-4px',
            background: 'radial-gradient(circle at center, rgba(34,197,94,0.12) 0%, transparent 70%)',
            display: 'flex',
          }}
        />
        {/* Braces + CH text */}
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
          <span style={{ color: '#22c55e', opacity: 0.7, fontSize: '12px' }}>{`{`}</span>
          <span style={{ color: '#f0fdf4', fontSize: '11px', fontWeight: 900 }}>CH</span>
          <span style={{ color: '#22c55e', opacity: 0.7, fontSize: '12px' }}>{`}`}</span>
        </span>
      </div>
    ),
    { ...size }
  );
}
