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
import { PLATFORMS } from '@/lib/data/platforms'
import { PlatformIcon } from '@/components/platform/PlatformSections'
import { ICONS } from '@/lib/data/platforms'

/* ─── Platform card ─────────────────────────────── */
function PlatformCard({ platform, index }: { platform: typeof PLATFORMS[0]; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <ScrollReveal delay={index * 0.06}>
      <GlassCard
        className="h-full overflow-hidden group card-depth card-shimmer"
        tilt
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Accent top bar */}
        <div className="h-0.5 w-full" style={{ background: platform.accent }} />

        <div className="p-7">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-display font-bold text-xl text-void dark:text-whisper mb-1">
                {platform.name}
              </h3>
              <div className="text-xs font-medium px-2.5 py-1 rounded-full inline-block"
                style={{ background: `${platform.accent}12`, color: platform.accent }}>
                {platform.price}
              </div>
            </div>
          </div>

          <p className="text-sm text-void/55 dark:text-whisper/55 leading-relaxed mb-5">
            {platform.tagline}
          </p>

          {/* Industries served */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {platform.industries.slice(0, 3).map((ind) => (
              <span key={ind} className="text-[10px] px-2 py-0.5 rounded-md border border-void/8 dark:border-whisper/8 text-void/40 dark:text-whisper/40">
                {ind}
              </span>
            ))}
            {platform.industries.length > 3 && (
              <span className="text-[10px] px-2 py-0.5 rounded-md border border-void/8 dark:border-whisper/8 text-void/40 dark:text-whisper/40">
                +{platform.industries.length - 3} more
              </span>
            )}
          </div>

          {/* Key features — revealed on hover */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: hovered ? 'auto' : 0, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden mb-5"
          >
            <div className="space-y-1.5 pt-2 border-t border-void/8 dark:border-whisper/8">
              <p className="text-[10px] font-semibold tracking-wider uppercase text-void/30 dark:text-whisper/30 mb-2">
                Key features
              </p>
              {platform.keyFeatures.map((f) => (
                <div key={f} className="flex items-center gap-2 text-xs text-void/60 dark:text-whisper/60">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={platform.accent} strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {f}
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTAs */}
          <div className="flex gap-2">
            <Link
              href={`/products/platforms/${platform.slug}`}
              className="flex-1 text-center py-2.5 rounded-xl text-xs font-semibold transition-all duration-150"
              style={{ background: `${platform.accent}12`, color: platform.accent }}
            >
              Learn more
            </Link>
            <Link
              href="/#contact"
              className="flex-1 text-center py-2.5 rounded-xl text-xs font-medium border border-void/10 dark:border-whisper/10 text-void/55 dark:text-whisper/55 hover:border-void/25 dark:hover:border-whisper/25 transition-all duration-150"
            >
              Book consultation
            </Link>
          </div>
        </div>
      </GlassCard>
    </ScrollReveal>
  )
}

/* ─── How it works steps ────────────────────────── */
const HOW_STEPS = [
  { num: '01', title: 'Choose a platform',        desc: 'Pick the platform that matches your business model.' },
  { num: '02', title: 'Book a consultation',       desc: 'We have a free call to understand your exact requirements.' },
  { num: '03', title: 'We customize it',           desc: 'We build and tailor the platform around your business — not a template.' },
  { num: '04', title: 'Launch your solution',      desc: 'Deploy and launch with your brand — with our support throughout.' },
  { num: '05', title: 'Scale with support',        desc: 'We\'re here as you grow — adding features, improving systems, and scaling.' },
]

/* ─── Comparison table ──────────────────────────── */
function ComparisonSection() {
  const WITHOUT = [
    'Build from scratch — months of development',
    'Expensive custom development costs',
    'High risk — no proven foundation',
    'Long testing and QA cycles',
    'Delayed launch and lost revenue',
  ]
  const WITH = [
    'Start from a proven, production-ready system',
    'Faster launch — weeks instead of months',
    'Lower cost — proven foundation reduces risk',
    'Customized to your brand and workflows',
    'Ongoing support as your business grows',
  ]

  return (
    <section className="py-24 px-6 bg-void/[0.015] dark:bg-whisper/[0.015]">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="text-center mb-14">
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-4">
            The difference
          </p>
          <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)] text-void dark:text-whisper">
            Start from zero vs start with Z3ymo
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Without */}
          <ScrollReveal>
            <div className="p-8 rounded-2xl border border-void/10 dark:border-whisper/10 bg-void/3 dark:bg-whisper/3 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-xl bg-void/8 dark:bg-whisper/8 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-void/40 dark:text-whisper/40">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
                <h3 className="font-display font-semibold text-lg text-void dark:text-whisper">Without Z3ymo</h3>
              </div>
              <div className="space-y-3">
                {WITHOUT.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-void/55 dark:text-whisper/55">
                    <div className="w-4 h-4 rounded-full bg-void/8 dark:bg-whisper/8 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-1.5 h-0.5 rounded-full bg-void/30 dark:bg-whisper/30" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* With */}
          <ScrollReveal delay={0.1}>
            <div className="p-8 rounded-2xl border border-crimson/25 bg-crimson/3 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-xl bg-crimson/12 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C0392B" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-display font-semibold text-lg text-void dark:text-whisper">With Z3ymo</h3>
              </div>
              <div className="space-y-3">
                {WITH.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-void/65 dark:text-whisper/65">
                    <div className="w-4 h-4 rounded-full bg-crimson/12 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#C0392B" strokeWidth="3" strokeLinecap="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

/* ─── Page ─────────────────────────────────────── */
export default function PlatformsPage() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <main className="min-h-screen">
      <FloatingNav />

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 65%)' }} />
        <div className="max-w-5xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-5">
              Platform ecosystem
            </p>
            <h1 className="font-display font-bold text-[clamp(2.8rem,7vw,5.5rem)] text-void dark:text-whisper leading-[0.95] tracking-tight mb-6">
              Software platforms built
              <br />
              <span className="text-gold">to scale your business</span>
            </h1>
            <p className="text-base text-void/55 dark:text-whisper/55 leading-relaxed max-w-2xl mx-auto mb-10">
              Z3ymo develops ready-to-customize platforms — so you don't start from scratch. You start from something already designed to work.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <MagneticButton onClick={() => setDrawerOpen(true)} variant="primary" size="lg">
                🔥 Book Free Consultation
              </MagneticButton>
              <a href="#platforms"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium border border-void/15 dark:border-whisper/15 text-void/60 dark:text-whisper/60 hover:border-void/30 dark:hover:border-whisper/30 transition-all">
                Explore platforms
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Positioning — "Not templates" */}
      <section className="py-16 px-6 border-y border-void/8 dark:border-whisper/8">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-display font-bold text-[clamp(1.8rem,4vw,2.8rem)] text-void dark:text-whisper">
              Not templates. Not generic software.
            </h2>
            <p className="text-void/50 dark:text-whisper/50 max-w-xl mx-auto mt-4 leading-relaxed">
              These are production-ready platforms designed from real business needs — then customized to fit your exact model.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                title: 'Built from real use cases',
                desc:  'Every platform was designed around actual business workflows — not abstract ideas or generic templates.',
                icon: ICONS.chart,
                color: '#C0392B',
              },
              {
                title: 'Customizable to your business',
                desc:  'Your brand, your features, your workflows. We tailor the platform around how your business actually operates.',
                icon: ICONS.tools,
                color: '#1B998B',
              },
              {
                title: 'Designed to scale from day one',
                desc:  'Built on modern infrastructure that grows with you — from your first customer to your ten-thousandth.',
                icon: ICONS.bolt,
                color: '#C9A84C',
              },
            ].map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 0.08}>
                <div className="p-6 rounded-2xl border border-void/8 dark:border-whisper/8 text-center">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: `${p.color}10` }}>
                    <PlatformIcon path={p.icon} color={p.color} size={18} />
                  </div>
                  <h3 className="font-display font-semibold text-base text-void dark:text-whisper mb-2">{p.title}</h3>
                  <p className="text-sm text-void/50 dark:text-whisper/50 leading-relaxed">{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Platform grid */}
      <section id="platforms" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="mb-14">
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-4">
              All platforms
            </p>
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)] text-void dark:text-whisper">
              Ready-to-customize platforms
            </h2>
            <p className="text-void/50 dark:text-whisper/50 max-w-lg mt-3 leading-relaxed">
              Start with a system already designed for your business model — then customize it to fit your exact needs.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PLATFORMS.map((platform, i) => (
              <PlatformCard key={platform.id} platform={platform} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 bg-void/[0.015] dark:bg-whisper/[0.015]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="mb-14">
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-4">
              Process
            </p>
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)] text-void dark:text-whisper">
              How Z3ymo platforms work
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {HOW_STEPS.map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 0.07}>
                <div>
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4 bg-crimson/8 border border-crimson/15">
                    <span className="font-display font-bold text-xs text-crimson">{step.num}</span>
                  </div>
                  <h3 className="font-display font-semibold text-sm text-void dark:text-whisper mb-2">{step.title}</h3>
                  <p className="text-xs text-void/50 dark:text-whisper/50 leading-relaxed">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <ComparisonSection />

      {/* Final CTA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display font-bold text-[clamp(2rem,5vw,3.5rem)] text-void dark:text-whisper mb-4">
              Let's build your platform
            </h2>
            <p className="text-void/50 dark:text-whisper/50 mb-10 leading-relaxed">
              Tell us what you want to build — we'll help you choose and customize the right system.
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
