'use client'

// ─────────────────────────────────────────────────────────────────
// components/blog/BlogCTA.tsx
//
// Two exports:
//
//   default BlogCTA       — sticky card that slides up from the bottom
//                           after the reader scrolls past 60% of the page.
//                           Used for blog posts.
//
//   InlineBlogCTA         — static CTA block rendered at the end of the
//                           article body. Used in all content reading pages.
//
// Both accept:
//   type      — one of the 5 cta_type values
//   headline  — optional custom headline (falls back to default per type)
//   body      — optional custom body text
// ─────────────────────────────────────────────────────────────────

import { useEffect, useState } from 'react'
import Link                    from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

// ─── CTA defaults per type ────────────────────────────────────

type CtaTypeValue = 'consultation' | 'services' | 'products' | 'pulse' | 'none'

const DEFAULTS: Record<string, {
  headline: string
  body:     string
  label:    string
  href:     string
}> = {
  consultation: {
    headline: 'Ready to build this for your business?',
    body:     'Book a free strategy call. We'll help you plan the right approach.',
    label:    'Book free consultation',
    href:     '/services/consultation/bookfreeconsultation',
  },
  services: {
    headline: 'Need a team to build this?',
    body:     'Explore our custom development services for African businesses.',
    label:    'See our services',
    href:     '/services',
  },
  products: {
    headline: 'Explore our platforms',
    body:     'Pre-built digital solutions designed for the African market.',
    label:    'View platforms',
    href:     '/platforms',
  },
  pulse: {
    headline: 'Automate your business with Pulse',
    body:     'WhatsApp AI for African SMBs. Join the early access waitlist.',
    label:    'Join the waitlist',
    href:     '/products/pulse',
  },
}

// ─── Shared CTA body ──────────────────────────────────────────

function CtaBody({
  type, headline, body, compact = false,
}: {
  type:      string
  headline?: string | null
  body?:     string | null
  compact?:  boolean
}) {
  const d = DEFAULTS[type] ?? DEFAULTS.consultation
  const h = headline || d.headline
  const b = body     || d.body

  return (
    <div className={compact ? 'flex flex-col sm:flex-row sm:items-center gap-5' : 'text-center'}>
      <div className={compact ? 'flex-1' : 'mb-6'}>
        <p className={`font-display font-bold text-void dark:text-whisper ${compact ? 'text-base' : 'text-xl mb-2'}`}>
          {h}
        </p>
        <p className={`text-void/55 dark:text-whisper/50 leading-relaxed ${compact ? 'text-xs mt-1' : 'text-sm max-w-sm mx-auto'}`}>
          {b}
        </p>
      </div>
      <Link
        href={d.href}
        className={[
          'inline-flex items-center gap-2 rounded-full bg-crimson text-white font-semibold',
          'hover:bg-crimson/90 transition-colors shadow-sm shadow-crimson/20 flex-shrink-0',
          compact ? 'px-4 py-2 text-xs' : 'px-6 py-3 text-sm mx-auto',
        ].join(' ')}
      >
        {d.label}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </Link>
    </div>
  )
}

// ─── InlineBlogCTA — static block at end of article ───────────

export function InlineBlogCTA({
  type, headline, body,
}: {
  type:      string
  headline?: string | null
  body?:     string | null
}) {
  if (!type || type === 'none') return null

  return (
    <div className="mt-12 rounded-2xl border border-crimson/15 bg-crimson/4 dark:bg-crimson/6 p-8">
      <CtaBody type={type} headline={headline} body={body} compact={false} />
    </div>
  )
}

// ─── BlogCTA — sticky bottom card ─────────────────────────────

export default function BlogCTA({
  type, headline, body,
}: {
  type:      string
  headline?: string | null
  body?:     string | null
}) {
  const [visible,   setVisible]   = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    function onScroll() {
      const scrolled = window.scrollY
      const total    = document.documentElement.scrollHeight - window.innerHeight
      if (total > 0 && scrolled / total > 0.6) {
        setVisible(true)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!type || type === 'none') return null

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0,  opacity: 1 }}
          exit={{   y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 340, damping: 30 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-xl px-4 sm:px-0"
        >
          <div className="relative rounded-2xl border border-crimson/15
            bg-white/95 dark:bg-[#13131A]/95 backdrop-blur-xl
            shadow-xl shadow-black/10 px-6 py-5">

            {/* Dismiss */}
            <button
              onClick={() => setDismissed(true)}
              className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center
                rounded-full text-void/30 dark:text-whisper/30
                hover:text-void dark:hover:text-whisper
                hover:bg-void/6 dark:hover:bg-whisper/6
                transition-colors cursor-pointer"
              aria-label="Dismiss"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6"  x2="6"  y2="18"/>
                <line x1="6"  y1="6"  x2="18" y2="18"/>
              </svg>
            </button>

            <CtaBody type={type} headline={headline} body={body} compact />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
