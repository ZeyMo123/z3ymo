'use client'

// ─────────────────────────────────────────────────────────────────
// components/ui/VisualPrimitives.tsx
//
// Premium visual enhancement system.
// All components are 'use client' (framer-motion hooks + onError).
//
// CldImage is imported directly — next-cloudinary must be installed.
// Every image has an onError fallback so a 404 (image not yet
// uploaded to Cloudinary) degrades gracefully without crashing.
// ─────────────────────────────────────────────────────────────────

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CldImage } from 'next-cloudinary'

// ─── Shared ease tuple ────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

// ─── 1. Grid overlay — "systems thinking" signal ─────────────
// Pure CSS, no hooks. Safe to use anywhere.

export function GridOverlay({
  opacity   = 0.035,
  className = '',
}: {
  opacity?:   number
  className?: string
}) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(rgba(240,238,248,${opacity}) 1px, transparent 1px),
          linear-gradient(90deg, rgba(240,238,248,${opacity}) 1px, transparent 1px)
        `,
        backgroundSize: '52px 52px',
      }}
    />
  )
}

// ─── 2. Glow orb — ambient radial gradient ───────────────────
// Pure CSS. Hex color is parsed to RGBA for opacity control.

export function GlowOrb({
  color,
  x         = '50%',
  y         = '0%',
  size      = '70%',
  intensity = 0.07,
  className = '',
}: {
  color:      string   // hex, e.g. '#C0392B'
  x?:         string
  y?:         string
  size?:      string
  intensity?: number
  className?: string
}) {
  const r = parseInt(color.slice(1, 3), 16)
  const g = parseInt(color.slice(3, 5), 16)
  const b = parseInt(color.slice(5, 7), 16)

  return (
    <div
      aria-hidden="true"
      className={`absolute pointer-events-none ${className}`}
      style={{
        inset: 0,
        background: `radial-gradient(ellipse ${size} 60% at ${x} ${y}, rgba(${r},${g},${b},${intensity}) 0%, transparent 70%)`,
      }}
    />
  )
}

// ─── 3. Section fade — scroll-triggered entrance ─────────────

export function SectionFade({
  children,
  className = '',
  delay     = 0,
}: {
  children:   React.ReactNode
  className?: string
  delay?:     number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── 4. BgImage — full-section Cloudinary background ─────────
// onError replaces the image with a plain gradient fallback so
// a 404 (image not yet uploaded) never breaks the page layout.

export function BgImage({
  publicId,
  overlay      = 0.72,
  children,
  className    = '',
  overlayColor = '#0A0A0F',
}: {
  publicId:      string
  overlay?:      number   // 0–1 dark overlay opacity
  children?:     React.ReactNode
  className?:    string
  overlayColor?: string
}) {
  const [imgError, setImgError] = useState(false)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Cloudinary image — or gradient fallback on 404 */}
      <div className="absolute inset-0">
        {imgError ? (
          /* Fallback: rich dark gradient that still looks intentional */
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, #0D0D11 0%, #111118 50%, #0A0A0F 100%)',
            }}
          />
        ) : (
          <CldImage
            src={publicId}
            fill
            alt=""
            className="object-cover object-center"
            sizes="100vw"
            priority
            onError={() => setImgError(true)}
          />
        )}
        {/* Dark overlay — always applied */}
        <div
          className="absolute inset-0"
          style={{ background: overlayColor, opacity: overlay }}
        />
      </div>
      {/* Content always above */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

// ─── 5. Inline image with reveal animation ───────────────────
// Fades out entirely on 404 so layout doesn't shift.

export function RevealImage({
  publicId,
  width,
  height,
  alt       = '',
  className = '',
  delay     = 0,
  priority  = false,
}: {
  publicId:   string
  width:      number
  height:     number
  alt?:       string
  className?: string
  delay?:     number
  priority?:  boolean
}) {
  const [imgError, setImgError] = useState(false)

  if (imgError) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: EASE }}
      className={`overflow-hidden rounded-2xl ${className}`}
    >
      <CldImage
        src={publicId}
        width={width}
        height={height}
        alt={alt}
        className="w-full h-auto"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={priority}
        onError={() => setImgError(true)}
      />
    </motion.div>
  )
}

// ─── 6. System architecture decorative bar ───────────────────
// Image 5: 612×141px, no background, grayscale overlay treatment.
// Falls back to a text-based substitute on 404.

export function SystemArchBar({ className = '' }: { className?: string }) {
  const [imgError, setImgError] = useState(false)

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
    >
      {imgError ? (
        /* Text fallback — same visual weight as the image */
        <div className="flex gap-6 items-center justify-center opacity-[0.04]">
          {['STRATEGY', 'CLARITY', 'SYSTEMS', 'PRECISION', 'EXECUTION'].map((w) => (
            <span
              key={w}
              className="text-[10px] font-mono font-bold tracking-[0.35em] text-white"
            >
              {w}
            </span>
          ))}
        </div>
      ) : (
        <CldImage
          src="/system-architecture-feel_uwjo52"
          width={612}
          height={141}
          alt=""
          className="w-full opacity-[0.055] dark:opacity-[0.07]"
          style={{ filter: 'grayscale(100%) brightness(200%)' }}
          onError={() => setImgError(true)}
        />
      )}
    </div>
  )
}

// ─── 7. Premium card — glass depth + spring hover lift ───────

export function PremiumCard({
  children,
  className = '',
  glow      = false,
  glowColor = '#C0392B',
}: {
  children:   React.ReactNode
  className?: string
  glow?:      boolean
  glowColor?: string
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.015, y: -3 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      className={[
        'relative rounded-3xl border border-white/6',
        'bg-white/[0.02] dark:bg-white/[0.025]',
        'backdrop-blur-xl',
        'shadow-[0_4px_24px_rgba(0,0,0,0.18),0_1px_4px_rgba(0,0,0,0.1)]',
        'dark:shadow-[0_4px_32px_rgba(0,0,0,0.45),0_1px_4px_rgba(0,0,0,0.2)]',
        className,
      ].join(' ')}
      style={
        glow
          ? { boxShadow: `0 0 40px ${glowColor}18, 0 4px 24px rgba(0,0,0,0.18)` }
          : undefined
      }
    >
      {children}
    </motion.div>
  )
}

// ─── 8. Focus mode — dims background during form/booking ─────
// Wrap page layout; pass active=true when user is in a form flow.

export function FocusMode({
  active,
  children,
}: {
  active:   boolean
  children: React.ReactNode
}) {
  return (
    <div className="relative">
      <motion.div
        aria-hidden="true"
        animate={{ opacity: active ? 0.45 : 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-10 bg-void pointer-events-none"
      />
      <div className={active ? 'relative z-20' : 'relative'}>
        {children}
      </div>
    </div>
  )
}
