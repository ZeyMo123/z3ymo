import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt     = 'Z3ymo — Built different. By design.'
export const size    = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          background: '#0A0A0F',
          padding: '72px 80px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ambient glow — top right */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            right: -80,
            width: 480,
            height: 480,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(192,57,43,0.25) 0%, transparent 70%)',
          }}
        />
        {/* Ambient glow — bottom left */}
        <div
          style={{
            position: 'absolute',
            bottom: -100,
            left: -60,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(27,153,139,0.18) 0%, transparent 70%)',
          }}
        />

        {/* Grid lines */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(240,238,248,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(240,238,248,0.02) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, position: 'relative', zIndex: 1 }}>
          {/* Category pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(192,57,43,0.15)',
              border: '1px solid rgba(192,57,43,0.3)',
              borderRadius: 100,
              padding: '8px 20px',
              width: 'fit-content',
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#C0392B' }} />
            <span style={{ fontSize: 14, color: '#C0392B', fontWeight: 500, letterSpacing: '0.1em' }}>
              AFRICA&apos;S PREMIUM AI-NATIVE SOFTWARE COMPANY
            </span>
          </div>

          {/* Headline */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontSize: 80,
                fontWeight: 800,
                color: '#F0EEF8',
                lineHeight: 0.95,
                letterSpacing: '-0.04em',
              }}
            >
              Built different.
            </span>
            <span
              style={{
                fontSize: 80,
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: '-0.04em',
                background: 'linear-gradient(90deg, #C0392B, #C9A84C, #1B998B)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              By design.
            </span>
          </div>
        </div>

        {/* Logo — top right */}
        <div
          style={{
            position: 'absolute',
            top: 56,
            right: 80,
            fontSize: 32,
            fontWeight: 800,
            color: '#F0EEF8',
            letterSpacing: '-0.03em',
          }}
        >
          Z3ymo
        </div>

        {/* Bottom meta */}
        <div
          style={{
            position: 'absolute',
            bottom: 56,
            right: 80,
            display: 'flex',
            gap: 24,
            alignItems: 'center',
          }}
        >
          <span style={{ color: 'rgba(240,238,248,0.3)', fontSize: 14 }}>z3ymo.com</span>
          <span style={{ color: 'rgba(240,238,248,0.15)', fontSize: 14 }}>•</span>
          <span style={{ color: '#1B998B', fontSize: 14 }}>Tanzania → World</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
