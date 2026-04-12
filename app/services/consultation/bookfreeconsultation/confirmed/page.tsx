'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import FloatingNav from '@/components/layout/FloatingNav'
import Footer from '@/components/layout/Footer'

/* ─── Helpers ─────────────────────────────────────────────── */

function formatTime(time: string): string {
  const [h, m] = time.split(':').map(Number)
  const ampm   = h >= 12 ? 'PM' : 'AM'
  const hour   = h % 12 || 12
  return `${hour}:${String(m).padStart(2, '0')} ${ampm}`
}

function formatDateLong(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })
}

/* ─── Preparation checklist ──────────────────────────────── */

const PREP_ITEMS = [
  {
    icon:  '🏢',
    title: 'A short description of your business',
    desc:  'What you do, who your customers are, and how you currently operate.',
  },
  {
    icon:  '⚠️',
    title: 'Your biggest challenges',
    desc:  'The specific problems you want software or AI to solve for you.',
  },
  {
    icon:  '🎯',
    title: 'Your vision for the platform',
    desc:  'What success looks like 12 months after launch.',
  },
  {
    icon:  '💰',
    title: 'Your budget range',
    desc:  'A rough idea of what you are comfortable investing in the right system.',
  },
]

/* ─── What to expect ─────────────────────────────────────── */

const NEXT_STEPS = [
  {
    step: '01',
    title: 'Check your email',
    desc: 'A confirmation with the meeting link has been sent to your email address.',
  },
  {
    step: '02',
    title: 'Prepare for the call',
    desc: 'Review the checklist below so we can make the most of our 45 minutes together.',
  },
  {
    step: '03',
    title: 'We\'ll recommend the right system',
    desc: 'Based on your answers, we\'ll arrive with tailored platform recommendations.',
  },
  {
    step: '04',
    title: 'Receive your proposal',
    desc: 'After the call, you\'ll receive a written proposal with timeline and pricing.',
  },
]

/* ─── Confirmation content ───────────────────────────────── */

function ConfirmationContent() {
  const params  = useSearchParams()
  const id      = params.get('id')    ?? ''
  const date    = params.get('date')  ?? ''
  const start   = params.get('start') ?? ''
  const end     = params.get('end')   ?? ''
  const name    = params.get('name')  ?? ''

  return (
    <main className="min-h-screen">
      <FloatingNav />

      <section className="relative pt-36 pb-24 px-6 overflow-hidden">
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(27,153,139,0.07) 0%, transparent 65%)' }}
        />

        <div className="max-w-3xl mx-auto">

          {/* Success header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-20 h-20 rounded-3xl bg-emerald/10 border-2 border-emerald/25 flex items-center justify-center mx-auto mb-7"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1B998B" strokeWidth="1.8" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
            >
              <h1 className="font-display font-bold text-[clamp(2.2rem,5vw,3.5rem)] text-void dark:text-whisper leading-tight mb-3">
                Your consultation
                <br />
                <span className="text-emerald">is confirmed</span>
              </h1>
              {name && (
                <p className="text-base text-void/55 dark:text-whisper/55">
                  We're looking forward to speaking with you{name ? `, ${name.split(' ')[0]}` : ''}.
                </p>
              )}
            </motion.div>
          </div>

          {/* Booking summary card */}
          {date && start && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="rounded-2xl border border-emerald/25 bg-emerald/3 p-6 mb-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-emerald/12 flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1B998B" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />
                  </svg>
                </div>
                <div>
                  <div className="font-display font-bold text-void dark:text-whisper">
                    {formatDateLong(date)}
                  </div>
                  <div className="text-sm text-void/55 dark:text-whisper/55">
                    {formatTime(start)} – {formatTime(end)} EAT (UTC+3)
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-emerald/15">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-void/30 dark:text-whisper/30 mb-1">Duration</div>
                  <div className="text-sm text-void/70 dark:text-whisper/70">45 minutes</div>
                </div>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-void/30 dark:text-whisper/30 mb-1">Format</div>
                  <div className="text-sm text-void/70 dark:text-whisper/70">Video / Phone call</div>
                </div>
                {id && (
                  <div className="col-span-2">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-void/30 dark:text-whisper/30 mb-1">Booking ID</div>
                    <div className="text-xs text-void/40 dark:text-whisper/40 font-mono">{id}</div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Preparation checklist */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="rounded-2xl border border-void/8 dark:border-whisper/8 p-7 mb-8"
          >
            <h2 className="font-display font-bold text-lg text-void dark:text-whisper mb-5">
              Prepare for your call
            </h2>
            <div className="space-y-4">
              {PREP_ITEMS.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-void/4 dark:bg-whisper/4 flex items-center justify-center shrink-0 text-lg">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-display font-semibold text-sm text-void dark:text-whisper mb-0.5">
                      {item.title}
                    </div>
                    <div className="text-xs text-void/50 dark:text-whisper/50 leading-relaxed">
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Next steps */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="rounded-2xl border border-void/8 dark:border-whisper/8 p-7 mb-10"
          >
            <h2 className="font-display font-bold text-lg text-void dark:text-whisper mb-5">
              What happens next
            </h2>
            <div className="space-y-4">
              {NEXT_STEPS.map((s, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-crimson/8 border border-crimson/15">
                    <span className="font-display font-bold text-xs text-crimson">{s.step}</span>
                  </div>
                  <div>
                    <div className="font-display font-semibold text-sm text-void dark:text-whisper mb-0.5">
                      {s.title}
                    </div>
                    <div className="text-xs text-void/50 dark:text-whisper/50 leading-relaxed">
                      {s.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-void/15 dark:border-whisper/15 text-sm text-void/60 dark:text-whisper/60 hover:border-void/30 dark:hover:border-whisper/30 transition-all"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Back to Z3ymo
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-void dark:bg-whisper text-whisper dark:text-void text-sm font-semibold hover:opacity-90 transition-all"
            >
              Explore our platforms
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

/* ─── Page wrapper — Suspense required for useSearchParams ─── */

export default function ConfirmedPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen">
        <FloatingNav />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-full border-2 border-crimson/30 border-t-crimson animate-spin mx-auto" />
            <p className="text-sm text-void/40 dark:text-whisper/40">Loading confirmation…</p>
          </div>
        </div>
      </main>
    }>
      <ConfirmationContent />
    </Suspense>
  )
}
