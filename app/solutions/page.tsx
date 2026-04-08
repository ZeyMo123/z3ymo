'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import FloatingNav from '@/components/layout/FloatingNav'
import Footer from '@/components/layout/Footer'
import ScrollReveal from '@/components/ui/ScrollReveal'
import GlassCard from '@/components/ui/GlassCard'
import MagneticButton from '@/components/ui/MagneticButton'
import ContactDrawer from '@/components/ui/ContactDrawer'
import { SOLUTIONS } from '@/lib/data/solutions'

// ─── Industry card ────────────────────────────────────────────

function SolutionCard({ solution, index }: {
  solution: typeof SOLUTIONS[0]
  index:    number
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <ScrollReveal delay={index * 0.05}>
      <GlassCard
        tilt
        className="h-full group overflow-hidden"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Accent bar */}
        <div className="h-0.5 w-full" style={{ background: solution.accent }} />

        <div className="p-7">
          {/* Platform badge */}
          <div className="inline-flex items-center gap-1.5 mb-4 px-2.5 py-1 rounded-full text-[10px] font-semibold"
            style={{ background: `${solution.accent}10`, color: solution.accent }}>
            {solution.platformName}
          </div>

          {/* Industry name */}
          <h3 className="font-display font-bold text-xl text-void dark:text-whisper mb-3 group-hover:text-void dark:group-hover:text-whisper transition-colors">
            {solution.industry}
          </h3>

          <p className="text-sm text-void/55 dark:text-whisper/55 leading-relaxed mb-5">
            {solution.cardDesc}
          </p>

          {/* Perfect for */}
          <div className="mb-5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-void/30 dark:text-whisper/30 mb-2">
              Perfect for
            </p>
            <div className="flex flex-wrap gap-1.5">
              {solution.perfectFor.map((item) => (
                <span key={item}
                  className="text-[10px] px-2.5 py-1 rounded-full border border-void/8 dark:border-whisper/8 text-void/50 dark:text-whisper/50">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Capabilities — revealed on hover */}
          <motion.div
            initial={false}
            animate={{ height: hovered ? 'auto' : 0, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="space-y-1.5 pt-3 pb-2 border-t border-void/8 dark:border-whisper/8 mb-4">
              {solution.cardCapabilities.map((cap) => (
                <div key={cap} className="flex items-center gap-2 text-xs text-void/60 dark:text-whisper/60">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                    stroke={solution.accent} strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {cap}
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTAs */}
          <div className="flex gap-2 pt-2 border-t border-void/6 dark:border-whisper/6">
            <Link
              href={`/solutions/${solution.slug}`}
              className="flex-1 text-center py-2.5 rounded-xl text-xs font-semibold transition-all duration-150"
              style={{ background: `${solution.accent}10`, color: solution.accent }}
            >
              Explore solution
            </Link>
            <Link
              href={`/products/platforms/${solution.platformSlug}`}
              className="flex-1 text-center py-2.5 rounded-xl text-xs font-medium border border-void/10 dark:border-whisper/10 text-void/55 dark:text-whisper/55 hover:border-void/25 dark:hover:border-whisper/25 transition-all duration-150"
            >
              View {solution.platformName}
            </Link>
          </div>
        </div>
      </GlassCard>
    </ScrollReveal>
  )
}

// ─── Why Z3ymo pillars ────────────────────────────────────────

const WHY_PILLARS = [
  {
    title: 'Industry-focused platforms',
    desc:  'Our systems are designed specifically for your business model — not generic software forced to fit.',
    icon:  'M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z',
    accent: '#C0392B',
  },
  {
    title: 'AI-powered insights',
    desc:  'Understand how your business performs with intelligent analytics built into every platform.',
    icon:  'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2',
    accent: '#1B998B',
  },
  {
    title: 'Customizable solutions',
    desc:  'Each platform is adapted to your workflows, brand, and specific business requirements.',
    icon:  'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
    accent: '#C9A84C',
  },
  {
    title: 'Expert consultation',
    desc:  'Every project begins with a free consultation — we design the right solution before writing a line of code.',
    icon:  'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
    accent: '#C0392B',
  },
]

// ─── Page ─────────────────────────────────────────────────────

export default function SolutionsPage() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <main className="min-h-screen">
      <FloatingNav />

      {/* ── Hero ────────────────────────────────────────── */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(192,57,43,0.07) 0%, transparent 65%)' }} />

        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-5">
              Industry solutions
            </p>
            <h1 className="font-display font-bold text-[clamp(2.8rem,7vw,5.5rem)] text-void dark:text-whisper leading-[0.95] tracking-tight mb-5">
              Software solutions built
              <br />
              <span className="text-crimson">for modern businesses</span>
            </h1>
            <p className="text-base text-void/55 dark:text-whisper/55 leading-relaxed max-w-2xl mx-auto mb-10">
              Z3ymo builds AI-powered platforms tailored to different industries — helping businesses operate smarter, sell more, and grow faster.
            </p>
            <MagneticButton onClick={() => setDrawerOpen(true)} variant="primary" size="lg">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />
              </svg>
              Book Free Consultation
            </MagneticButton>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Industry grid ───────────────────────────────── */}
      <section id="solutions" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="mb-12">
            <h2 className="font-display font-bold text-[clamp(1.8rem,3.5vw,2.6rem)] text-void dark:text-whisper">
              Find the solution designed for your business
            </h2>
            <p className="text-void/50 dark:text-whisper/50 mt-3 max-w-xl leading-relaxed text-sm">
              Select your industry and see the platform and capabilities built specifically for businesses like yours.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SOLUTIONS.map((solution, i) => (
              <SolutionCard key={solution.slug} solution={solution} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Z3ymo ───────────────────────────────────── */}
      <section className="py-20 px-6 border-t border-void/8 dark:border-whisper/8">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)] text-void dark:text-whisper">
              Why businesses choose Z3ymo
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHY_PILLARS.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 0.07}>
                <div className="flex items-start gap-5 p-6 rounded-2xl border border-void/8 dark:border-whisper/8">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${p.accent}10` }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                      stroke={p.accent} strokeWidth="1.7" strokeLinecap="round">
                      {p.icon.split(' M').map((seg, si) => (
                        <path key={si} d={si === 0 ? seg : `M${seg}`} />
                      ))}
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-base text-void dark:text-whisper mb-1.5">
                      {p.title}
                    </h3>
                    <p className="text-sm text-void/55 dark:text-whisper/55 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────── */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display font-bold text-[clamp(2rem,4.5vw,3.2rem)] text-void dark:text-whisper leading-[1.05] mb-4">
              Let's build the platform
              <br />
              <span className="text-crimson">your business needs</span>
            </h2>
            <p className="text-void/50 dark:text-whisper/50 mb-10 leading-relaxed max-w-lg mx-auto">
              Tell us about your business and we'll design the right platform for you — starting with a free consultation.
            </p>
            <MagneticButton onClick={() => setDrawerOpen(true)} variant="primary" size="lg">
              🔥 Book Free Consultation
            </MagneticButton>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
      <ContactDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </main>
  )
}
