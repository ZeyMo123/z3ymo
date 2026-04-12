'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Animated signal bars ─────────────────────────────────────

function SignalBars({ connected }: { connected: boolean }) {
  return (
    <div className="flex items-end gap-1.5 h-8">
      {[3, 5, 7].map((h, i) => (
        <motion.div
          key={i}
          className="w-2.5 rounded-sm"
          animate={{
            background: connected
              ? '#1B998B'
              : i === 0 ? 'rgba(192,57,43,0.55)' : 'rgba(192,57,43,0.18)',
            scaleY: connected ? 1 : i === 0 ? 1 : 0.75,
          }}
          transition={{ duration: 0.35, delay: i * 0.06 }}
          style={{ height: `${h * 4}px`, transformOrigin: 'bottom' }}
        />
      ))}
    </div>
  )
}

// ─── Status pill ──────────────────────────────────────────────

function StatusPill({ online }: { online: boolean }) {
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold tracking-wide ${
      online
        ? 'bg-emerald/8 border-emerald/20 text-emerald'
        : 'bg-crimson/8 border-crimson/15 text-crimson'
    }`}>
      <span className="relative flex h-2 w-2">
        {online && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-60" />}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${online ? 'bg-emerald' : 'bg-crimson/70'}`} />
      </span>
      {online ? 'Connected' : 'No internet connection'}
    </div>
  )
}

// ─── Quick links ──────────────────────────────────────────────

const QUICK_LINKS = [
  { label: 'Home',          href: '/' },
  { label: 'Products',      href: '/products' },
  { label: 'Services',      href: '/services' },
  { label: 'Book a call',   href: '/services/consultation' },
]

// ─── Page ─────────────────────────────────────────────────────

export default function OfflinePage() {
  const [checking,  setChecking]  = useState(false)
  const [connected, setConnected] = useState(false)
  const [attempts,  setAttempts]  = useState(0)

  // Listen for browser "online" event — auto-reload when network returns
  useEffect(() => {
    const handleOnline = () => {
      setConnected(true)
      setTimeout(() => window.location.reload(), 1100)
    }
    window.addEventListener('online', handleOnline)
    return () => window.removeEventListener('online', handleOnline)
  }, [])

  async function handleRetry() {
    setChecking(true)
    setAttempts((n) => n + 1)
    try {
      await fetch('/', { method: 'HEAD', cache: 'no-store', signal: AbortSignal.timeout(4000) })
      setConnected(true)
      setTimeout(() => window.location.reload(), 900)
      return
    } catch {
      // Still offline
    }
    setChecking(false)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-whisper dark:bg-void">

      {/* Subtle dot grid background */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(10,10,15,0.06) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative max-w-sm w-full text-center">
        <AnimatePresence mode="wait">

          {/* ── Offline state ─────────────────────────────────── */}
          {!connected && (
            <motion.div
              key="offline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Icon card */}
              <div className="flex justify-center mb-7">
                <div className="relative w-20 h-20 rounded-3xl bg-void/4 dark:bg-whisper/4 border border-void/8 dark:border-whisper/8 flex items-center justify-center">
                  <SignalBars connected={false} />
                  {/* Cross-out line */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.25, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <div className="w-11 h-0.5 bg-crimson/45 rotate-45 rounded-full" />
                  </motion.div>
                </div>
              </div>

              {/* Status */}
              <div className="mb-5 flex justify-center">
                <StatusPill online={false} />
              </div>

              {/* Headline */}
              <h1 className="font-display font-bold text-[clamp(1.7rem,5vw,2.2rem)] text-void dark:text-whisper leading-tight mb-3">
                You're offline
              </h1>
              <p className="text-void/50 dark:text-whisper/50 text-sm leading-relaxed mb-8 max-w-[260px] mx-auto">
                Check your Wi-Fi or mobile data, then try again — we'll be right here.
              </p>

              {/* Retry button */}
              <motion.button
                onClick={handleRetry}
                disabled={checking}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl bg-void dark:bg-whisper text-whisper dark:text-void text-sm font-semibold disabled:opacity-55 cursor-pointer shadow-lg shadow-void/10 mb-2.5"
              >
                {checking ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                      className="animate-spin">
                      <path d="M21 12a9 9 0 11-6.219-8.56" />
                    </svg>
                    Checking connection…
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
                    </svg>
                    Try again
                  </>
                )}
              </motion.button>

              {/* Feedback after failed retry */}
              <AnimatePresence>
                {attempts > 0 && !checking && (
                  <motion.p
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-void/30 dark:text-whisper/30 mb-6"
                  >
                    Still not connecting. Double-check your network and try once more.
                  </motion.p>
                )}
              </AnimatePresence>
              {attempts === 0 && <div className="mb-6" />}

              {/* Divider */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-void/8 dark:bg-whisper/8" />
                <span className="text-[11px] text-void/25 dark:text-whisper/25 font-medium">while you wait</span>
                <div className="flex-1 h-px bg-void/8 dark:bg-whisper/8" />
              </div>

              {/* Quick links grid */}
              <div className="grid grid-cols-2 gap-2">
                {QUICK_LINKS.map((link) => (
                  <Link key={link.href} href={link.href}
                    className="py-2.5 px-3 rounded-xl border border-void/8 dark:border-whisper/8 text-sm text-void/55 dark:text-whisper/55 hover:border-void/20 dark:hover:border-whisper/20 hover:text-void dark:hover:text-whisper transition-all">
                    {link.label}
                  </Link>
                ))}
              </div>

              <p className="text-[11px] text-void/20 dark:text-whisper/20 mt-7">
                We'll reconnect automatically when you're back online.
              </p>
            </motion.div>
          )}

          {/* ── Back online state ─────────────────────────────── */}
          {connected && (
            <motion.div
              key="online"
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 380, damping: 22, delay: 0.05 }}
                className="w-20 h-20 rounded-3xl bg-emerald/10 border border-emerald/25 flex items-center justify-center mx-auto mb-7"
              >
                <SignalBars connected={true} />
              </motion.div>

              <div className="mb-5 flex justify-center">
                <StatusPill online={true} />
              </div>

              <h2 className="font-display font-bold text-2xl text-void dark:text-whisper mb-2">
                You're back!
              </h2>
              <p className="text-void/45 dark:text-whisper/45 text-sm">
                Reloading the page…
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
