'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

// ─────────────────────────────────────────────────────────────────
// ConsultationCTA — drop-in replacement for the MagneticButton +
// ContactDrawer pattern used across the site.
//
// Instead of opening a drawer, this routes to /services/consultation
// where users choose the right level of consultation.
//
// Usage:
//   <ConsultationCTA />
//   <ConsultationCTA size="sm" label="Book a call" />
//   <ConsultationCTA href="/services/consultation/bookfreeconsultation" label="Book Free Call" />
// ─────────────────────────────────────────────────────────────────

interface ConsultationCTAProps {
  /** Custom button label */
  label?:     string
  /** Override destination — defaults to /services/consultation */
  href?:      string
  /** Button size */
  size?:      'sm' | 'md' | 'lg'
  /** Full-width */
  fullWidth?: boolean
  /** Additional classes */
  className?: string
  /** Variant */
  variant?:   'primary' | 'outline'
}

export function ConsultationCTA({
  label     = 'Book Free Consultation',
  href      = '/services/consultation',
  size      = 'md',
  fullWidth = false,
  className = '',
  variant   = 'primary',
}: ConsultationCTAProps) {
  const sizeMap = {
    sm:  'px-5 py-2.5 text-xs',
    md:  'px-7 py-3.5 text-sm',
    lg:  'px-8 py-4 text-sm',
  }

  const variantMap = {
    primary: 'bg-crimson text-white hover:bg-crimson/90 shadow-lg shadow-crimson/20',
    outline: 'border border-void/15 dark:border-whisper/15 text-void/60 dark:text-whisper/60 hover:border-void/30 dark:hover:border-whisper/30',
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={fullWidth ? 'w-full' : 'inline-block'}
    >
      <Link
        href={href}
        className={[
          'inline-flex items-center justify-center gap-2.5 rounded-full font-semibold transition-all',
          sizeMap[size],
          variantMap[variant],
          fullWidth ? 'w-full' : '',
          className,
        ].join(' ')}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />
        </svg>
        {label}
      </Link>
    </motion.div>
  )
}

// ─── Convenience exports ───────────────────────────────────────

export function FreeConsultationCTA(props: Omit<ConsultationCTAProps, 'href'>) {
  return (
    <ConsultationCTA
      {...props}
      label={props.label ?? 'Book Free Consultation'}
      href="/services/consultation/bookfreeconsultation"
    />
  )
}

export function TechConsultationCTA(props: Omit<ConsultationCTAProps, 'href'>) {
  return (
    <ConsultationCTA
      {...props}
      label={props.label ?? 'Book Tech Consultation'}
      href="/services/consultation/book?type=tech"
    />
  )
}

export function StrategyConsultationCTA(props: Omit<ConsultationCTAProps, 'href'>) {
  return (
    <ConsultationCTA
      {...props}
      label={props.label ?? 'Move Strategically'}
      href="/services/consultation/book?type=strategy"
    />
  )
}
