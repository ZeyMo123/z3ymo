'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ui/ScrollReveal'
import MagneticButton from '@/components/ui/MagneticButton'
import ContactDrawer from '@/components/ui/ContactDrawer'

export default function FinalCTA() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('sending')
    // Will hook up to Resend/Supabase in next sprint
    await new Promise((r) => setTimeout(r, 900))
    setStatus('done')
    setEmail('')
  }

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Animated gradient background */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 0% 50%, rgba(192,57,43,0.07) 0%, transparent 50%),
            radial-gradient(ellipse 80% 60% at 100% 50%, rgba(27,153,139,0.07) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 50% 100%, rgba(201,168,76,0.05) 0%, transparent 60%)
          `,
        }}
      />

      {/* Decorative line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-void/10 dark:via-whisper/10 to-transparent" />

      <div className="relative max-w-3xl mx-auto text-center">

        <ScrollReveal>
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-6">
            Work with Z3ymo
          </p>

          <h2 className="font-display font-bold text-[clamp(2.5rem,7vw,5rem)] text-void dark:text-whisper leading-[0.95] mb-6 text-balance">
            Let&apos;s design the
            <br />
            <span className="text-crimson">right system</span>
            <br />
            for your business
          </h2>

          <p className="text-base text-void/50 dark:text-whisper/50 max-w-lg mx-auto mb-10 leading-relaxed">
            Tell us about your idea or challenge, and we&apos;ll explore how software and AI can help solve it.
          </p>
        </ScrollReveal>

        {/* CTA buttons */}
        <ScrollReveal delay={0.1} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <MagneticButton
            onClick={() => setDrawerOpen(true)}
            variant="primary"
            size="lg"
          >
            🔥 Book Free Consultation
          </MagneticButton>

          <div className="flex items-center gap-4 text-sm text-void/40 dark:text-whisper/30">
            <span className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="#1B998B" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Free first consult
            </span>
            <span className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="#1B998B" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              No commitment
            </span>
            <span className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="#1B998B" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Reply within hours
            </span>
          </div>
        </ScrollReveal>

        {/* Divider */}
        <ScrollReveal delay={0.15}>
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-void/8 dark:bg-whisper/8" />
            <span className="text-xs text-void/30 dark:text-whisper/30">or stay in the loop</span>
            <div className="flex-1 h-px bg-void/8 dark:bg-whisper/8" />
          </div>
        </ScrollReveal>

        {/* Newsletter */}
        <ScrollReveal delay={0.2}>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              disabled={status === 'sending' || status === 'done'}
              className="
                flex-1 px-5 py-3 rounded-full text-sm
                bg-void/5 dark:bg-whisper/5
                border border-void/10 dark:border-whisper/10
                text-void dark:text-whisper
                placeholder:text-void/30 dark:placeholder:text-whisper/30
                focus:outline-none focus:border-crimson/50
                transition-colors duration-150
                disabled:opacity-40
              "
            />
            <button
              type="submit"
              disabled={status === 'sending' || status === 'done' || !email.trim()}
              className="
                px-6 py-3 rounded-full text-sm font-medium
                bg-void dark:bg-whisper
                text-whisper dark:text-void
                hover:opacity-80 transition-opacity duration-150
                disabled:opacity-30 cursor-pointer
                disabled:cursor-not-allowed
              "
            >
              {status === 'sending' ? 'Subscribing…'
               : status === 'done'    ? '✓ Subscribed!'
               : 'Subscribe'}
            </button>
          </form>
          <p className="text-xs text-void/25 dark:text-whisper/25 mt-3">
            Tech tips, guides, and Z3ymo news. No spam — unsubscribe anytime.
          </p>
        </ScrollReveal>

        {/* Location */}
        <ScrollReveal delay={0.25} className="mt-12">
          <p className="text-sm text-void/30 dark:text-whisper/30 flex items-center justify-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Based in Dar es Salaam, Tanzania · Serving clients worldwide
          </p>
        </ScrollReveal>
      </div>

      <ContactDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </section>
  )
}
