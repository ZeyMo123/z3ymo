'use client'

// ─────────────────────────────────────────────────────────────────
// components/blog/BlogCTA.tsx
//
// Sticky CTA that slides up from the bottom after the reader
// scrolls 60% through the article. Three offer types:
//   'consultation' — book a free consultation
//   'services'     — explore development services
//   'products'     — view platform products
//
// The admin selects the CTA type per post from the editor.
// ─────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Offer configurations ─────────────────────────────────────

type CtaType = 'consultation' | 'services' | 'products' | 'pulse'

interface CtaConfig {
  badge:     string
  headline:  string
  body:      string
  primary:   { label: string; href: string }
  secondary: { label: string; href: string }
  accent:    string
}

const CTA_CONFIGS: Record<CtaType, CtaConfig> = {
  consultation: {
    badge:    'Free · 20–30 min',
    headline: 'Not sure where to start?',
    body:     'Book a free consultation. We\'ll listen to your situation and give you clear direction — no commitment.',
    primary:  { label: 'Book Free Consultation', href: '/services/consultation/bookfreeconsultation' },
    secondary:{ label: 'See all options →',      href: '/services/consultation' },
    accent:   '#1B998B',
  },
  services: {
    badge:    'Custom development',
    headline: 'Ready to build something real?',
    body:     'Z3ymo designs and develops software tailored to your exact business — not templates, not shortcuts.',
    primary:  { label: 'Explore Services',        href: '/services' },
    secondary:{ label: 'Book a free call →',      href: '/services/consultation' },
    accent:   '#C0392B',
  },
  products: {
    badge:    'Ready-to-customize platforms',
    headline: 'Start from something that already works.',
    body:     'Our platforms are built from real business needs. Customize them to yours — and launch faster.',
    primary:  { label: 'View Platforms',          href: '/products/platforms' },
    secondary:{ label: 'Book a free call →',      href: '/services/consultation' },
    accent:   '#C9A84C',
  },
  pulse: {
    badge:    'WhatsApp AI · Join waitlist',
    headline: 'Automate your customer conversations.',
    body:     'Z3ymo Pulse handles support, bookings, and lead capture on WhatsApp — 24/7, in English and Swahili.',
    primary:  { label: 'Join Pulse Waitlist',     href: '/ai-agents/pulse' },
    secondary:{ label: 'Learn more →',            href: '/ai-agents' },
    accent:   '#C0392B',
  },
}

// ─── Icons ────────────────────────────────────────────────────

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const ArrowIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

// ─── Component ────────────────────────────────────────────────

interface BlogCTAProps {
  type?:         CtaType
  /** Override headline */
  headline?:     string
  /** Override body text */
  body?:         string
  /** Scroll % (0–100) at which CTA appears. Default 60 */
  triggerAt?:    number
}

export default function BlogCTA({
  type       = 'consultation',
  headline,
  body,
  triggerAt  = 60,
}: BlogCTAProps) {
  const [visible,   setVisible]   = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const config = CTA_CONFIGS[type]

  useEffect(() => {
    if (dismissed) return

    const onScroll = () => {
      const scrolled = window.scrollY
      const total    = document.documentElement.scrollHeight - window.innerHeight
      const pct      = total > 0 ? (scrolled / total) * 100 : 0

      if (pct >= triggerAt && !visible) {
        // Small delay so it doesn't snap in immediately
        timerRef.current = setTimeout(() => setVisible(true), 400)
      } else if (pct < triggerAt - 10 && visible) {
        setVisible(false)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [visible, dismissed, triggerAt])

  if (dismissed) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0,   opacity: 1 }}
          exit={{   y: 120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 30, mass: 0.9 }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm z-40"
        >
          <div className="relative rounded-3xl border overflow-hidden shadow-2xl
            bg-whisper dark:bg-[#13131A]
            border-void/10 dark:border-white/8
            shadow-void/15 dark:shadow-black/50">

            {/* Accent bar */}
            <div className="h-[3px]" style={{ background: `linear-gradient(90deg, ${config.accent}, ${config.accent}55)` }} />

            {/* Inner glow */}
            <div className="absolute inset-0 pointer-events-none rounded-3xl"
              style={{ background: `radial-gradient(ellipse 80% 50% at 0% 0%, ${config.accent}08 0%, transparent 60%)` }} />

            <div className="p-5 relative z-10">
              {/* Dismiss */}
              <button
                onClick={() => { setDismissed(true); setVisible(false) }}
                className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center
                  text-void/30 dark:text-white/25
                  hover:bg-void/6 dark:hover:bg-white/6
                  hover:text-void/60 dark:hover:text-white/50
                  transition-colors cursor-pointer"
                aria-label="Dismiss"
              >
                <XIcon />
              </button>

              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase mb-3"
                style={{ background: `${config.accent}12`, color: config.accent }}>
                <span className="w-1 h-1 rounded-full" style={{ background: config.accent }} />
                {config.badge}
              </div>

              {/* Headline */}
              <h3 className="font-display font-bold text-base leading-tight mb-2 pr-6
                text-void dark:text-white">
                {headline ?? config.headline}
              </h3>

              {/* Body */}
              <p className="text-xs leading-relaxed mb-4
                text-void/55 dark:text-white/45">
                {body ?? config.body}
              </p>

              {/* CTAs */}
              <div className="space-y-2">
                <Link href={config.primary.href}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98]"
                  style={{ background: `linear-gradient(135deg, ${config.accent}, ${config.accent}bb)`, boxShadow: `0 4px 16px ${config.accent}30` }}>
                  {config.primary.label}
                  <ArrowIcon />
                </Link>
                <Link href={config.secondary.href}
                  className="flex items-center justify-center gap-1 w-full py-2 text-xs font-medium transition-colors
                    text-void/45 dark:text-white/35
                    hover:text-void dark:hover:text-white/65">
                  {config.secondary.label}
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── In-content CTA block ─────────────────────────────────────
// Embedded inline at the end of the blog article body.
// Used as a visual anchor before the sticky CTA appears.

export function InlineBlogCTA({
  type = 'consultation',
}: {
  type?: CtaType
}) {
  const config = CTA_CONFIGS[type]

  return (
    <div className="my-10 rounded-3xl border p-6 sm:p-8 not-prose
      border-void/8 dark:border-white/8
      bg-void/[0.015] dark:bg-white/[0.02]">

      {/* Accent line */}
      <div className="h-0.5 w-12 rounded-full mb-5" style={{ background: config.accent }} />

      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase mb-4"
        style={{ background: `${config.accent}12`, color: config.accent }}>
        {config.badge}
      </div>

      <h3 className="font-display font-bold text-xl text-void dark:text-white mb-2">
        {config.headline}
      </h3>
      <p className="text-sm text-void/55 dark:text-white/45 leading-relaxed mb-6">
        {config.body}
      </p>

      <div className="flex flex-wrap gap-3">
        <Link href={config.primary.href}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90 shadow-lg"
          style={{ background: config.accent, boxShadow: `0 4px 20px ${config.accent}30` }}>
          {config.primary.label}
          <ArrowIcon />
        </Link>
        <Link href={config.secondary.href}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm border transition-all
            border-void/12 dark:border-white/10
            text-void/60 dark:text-white/45
            hover:border-void/25 dark:hover:border-white/20
            hover:text-void dark:hover:text-white/70">
          {config.secondary.label}
        </Link>
      </div>
    </div>
  )
}
