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
import { OWN_PRODUCTS, STATUS_STYLES } from '@/lib/data/own-products'

// ─── Status badge ─────────────────────────────────────────────────────────

function StatusBadge({ status, label }: { status: string; label: string }) {
  const s = STATUS_STYLES[status as keyof typeof STATUS_STYLES] ?? STATUS_STYLES['coming-soon']
  return (
    <span className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full ${s.bg} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.dot}`} />
      {label}
    </span>
  )
}

// ─── Platform mini-card (section 1) ──────────────────────────────────────

function PlatformMiniCard({ platform, index }: { platform: typeof PLATFORMS[0]; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <ScrollReveal delay={index * 0.05}>
      <GlassCard
        className="h-full group overflow-hidden"
        tilt
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="h-0.5 w-full" style={{ background: platform.accent }} />
        <div className="p-6">
          {/* Name + price */}
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-display font-bold text-lg text-void dark:text-whisper">
              {platform.name}
            </h3>
            <span className="text-[10px] font-semibold px-2 py-1 rounded-full shrink-0 ml-2"
              style={{ background: `${platform.accent}10`, color: platform.accent }}>
              {platform.price}
            </span>
          </div>

          <p className="text-sm text-void/55 dark:text-whisper/55 leading-relaxed mb-4">
            {platform.tagline}
          </p>

          {/* Industries */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {platform.industries.slice(0, 3).map((ind) => (
              <span key={ind}
                className="text-[10px] px-2 py-0.5 rounded-md border border-void/8 dark:border-whisper/8 text-void/40 dark:text-whisper/40">
                {ind}
              </span>
            ))}
          </div>

          {/* Hover: key features */}
          <motion.div
            initial={false}
            animate={{ height: hovered ? 'auto' : 0, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="pt-3 pb-1 border-t border-void/8 dark:border-whisper/8 space-y-1.5">
              {platform.keyFeatures.slice(0, 4).map((f) => (
                <div key={f} className="flex items-center gap-2 text-xs text-void/60 dark:text-whisper/60">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                    stroke={platform.accent} strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {f}
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <div className="flex gap-2 mt-4 pt-4 border-t border-void/6 dark:border-whisper/6">
            <Link
              href={`/products/platforms/${platform.slug}`}
              className="flex-1 text-center py-2 rounded-xl text-xs font-semibold transition-all duration-150"
              style={{ background: `${platform.accent}12`, color: platform.accent }}
            >
              Learn more
            </Link>
            <Link
              href="/#contact"
              className="flex-1 text-center py-2 rounded-xl text-xs font-medium border border-void/10 dark:border-whisper/10 text-void/55 dark:text-whisper/55 hover:border-void/25 dark:hover:border-whisper/25 transition-all duration-150"
            >
              Book consultation
            </Link>
          </div>
        </div>
      </GlassCard>
    </ScrollReveal>
  )
}

// ─── Own product card (section 2) ────────────────────────────────────────

function OwnProductCard({ product, index }: { product: typeof OWN_PRODUCTS[0]; index: number }) {
  return (
    <ScrollReveal delay={index * 0.07}>
      <GlassCard className="h-full group" tilt>
        <div className="p-7">
          {/* Header row */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-display font-bold text-xl text-void dark:text-whisper mb-2">
                {product.name}
              </h3>
              <StatusBadge status={product.status} label={product.statusLabel} />
            </div>
            {/* Accent accent circle */}
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: `${product.accent}12`, border: `1px solid ${product.accent}20` }}>
              <div className="w-3 h-3 rounded-full" style={{ background: product.accent }} />
            </div>
          </div>

          <p className="text-sm text-void/55 dark:text-whisper/55 leading-relaxed mb-5">
            {product.description}
          </p>

          {/* Features */}
          <div className="space-y-1.5 mb-6">
            {product.features.map((f) => (
              <div key={f} className="flex items-center gap-2 text-xs text-void/60 dark:text-whisper/60">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                  stroke={product.accent} strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {f}
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link
            href={product.href}
            className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-150 group-hover:gap-3"
            style={{ color: product.accent }}
          >
            {product.status === 'waitlist' ? 'Join waitlist' : 'Learn more'}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </GlassCard>
    </ScrollReveal>
  )
}

// ─── How it works ─────────────────────────────────────────────────────────

const HOW_STEPS = [
  {
    num:   '01',
    title: 'Choose a platform or product',
    desc:  'Browse our ready-to-customize platforms or Z3ymo products and identify what fits your business model.',
  },
  {
    num:   '02',
    title: 'Book a consultation',
    desc:  'We have a free, no-commitment call to understand your goals, requirements, and timeline.',
  },
  {
    num:   '03',
    title: 'We guide or customize',
    desc:  'For platforms we customize it to your brand. For products we onboard you and configure your account.',
  },
  {
    num:   '04',
    title: 'Launch your solution',
    desc:  'Go live with your platform or product — with our ongoing support as your business grows.',
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────

export default function ProductsPage() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <main className="min-h-screen">
      <FloatingNav />

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative pt-36 pb-24 px-6 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(192,57,43,0.07) 0%, transparent 65%)' }}
        />
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-5">
              Z3ymo products
            </p>
            <h1 className="font-display font-bold text-[clamp(2.8rem,7vw,5.5rem)] text-void dark:text-whisper leading-[0.95] tracking-tight mb-6">
              Software you don't have
              <br />
              <span className="text-crimson">to build from scratch</span>
            </h1>
            <p className="text-base text-void/55 dark:text-whisper/55 leading-relaxed max-w-2xl mx-auto mb-10">
              Explore Z3ymo's ready-to-customize platforms and our own products — built to solve real business problems.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <MagneticButton onClick={() => setDrawerOpen(true)} variant="primary" size="lg">
                🔥 Book Free Consultation
              </MagneticButton>
              <a
                href="#platforms"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium border border-void/15 dark:border-whisper/15 text-void/60 dark:text-whisper/60 hover:border-void/30 dark:hover:border-whisper/30 transition-all"
              >
                Explore platforms
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Clarity intro ─────────────────────────────── */}
      <section className="py-16 px-6 border-y border-void/8 dark:border-whisper/8">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-display font-bold text-[clamp(1.6rem,3.5vw,2.4rem)] text-void dark:text-whisper">
              Two ways to work with Z3ymo
            </h2>
            <p className="text-void/50 dark:text-whisper/50 max-w-xl mx-auto mt-3 text-sm leading-relaxed">
              Outside of building your software from scratch, there are two clear paths.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Path 1 */}
            <ScrollReveal>
              <a href="#platforms"
                className="block p-7 rounded-2xl border-2 border-crimson/20 bg-crimson/3 hover:border-crimson/40 transition-all duration-200 group cursor-pointer">
                <div className="w-10 h-10 rounded-2xl bg-crimson/10 flex items-center justify-center mb-5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C0392B" strokeWidth="1.8" strokeLinecap="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </div>
                <div className="font-display font-bold text-xl text-void dark:text-whisper mb-2 group-hover:text-crimson transition-colors">
                  Ready-to-Customize Platforms
                </div>
                <p className="text-sm text-void/55 dark:text-whisper/55 leading-relaxed">
                  We start from a proven system already designed for your business model, then tailor it to your exact needs — faster, cheaper, lower risk.
                </p>
                <div className="flex items-center gap-1.5 mt-4 text-sm font-medium text-crimson">
                  Explore platforms
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            </ScrollReveal>

            {/* Path 2 */}
            <ScrollReveal delay={0.08}>
              <a href="#own-products"
                className="block p-7 rounded-2xl border-2 border-emerald/20 bg-emerald/3 hover:border-emerald/40 transition-all duration-200 group cursor-pointer">
                <div className="w-10 h-10 rounded-2xl bg-emerald/10 flex items-center justify-center mb-5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B998B" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="font-display font-bold text-xl text-void dark:text-whisper mb-2 group-hover:text-emerald transition-colors">
                  Z3ymo Products
                </div>
                <p className="text-sm text-void/55 dark:text-whisper/55 leading-relaxed">
                  Standalone platforms we build and scale as independent products for the market — available now or coming soon.
                </p>
                <div className="flex items-center gap-1.5 mt-4 text-sm font-medium text-emerald">
                  See our products
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Section 1: Platforms ──────────────────────── */}
      <section id="platforms" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="mb-14">
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-4">
              Section 01
            </p>
            <h2 className="font-display font-bold text-[clamp(2rem,4.5vw,3.2rem)] text-void dark:text-whisper mb-3">
              Ready-to-customize platforms
            </h2>
            <p className="text-void/50 dark:text-whisper/50 max-w-xl leading-relaxed">
              Start with a system already designed for your business model — then customize it to fit your exact needs.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {PLATFORMS.map((platform, i) => (
              <PlatformMiniCard key={platform.id} platform={platform} index={i} />
            ))}
          </div>

          <ScrollReveal delay={0.2}>
            <div className="text-center mt-12">
              <Link
                href="/products/platforms"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-void/12 dark:border-whisper/12 text-sm text-void/55 dark:text-whisper/55 hover:border-void/25 dark:hover:border-whisper/25 hover:text-void dark:hover:text-whisper transition-all"
              >
                View full platform details →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-void/8 dark:border-whisper/8 mx-6" />

      {/* ── Section 2: Z3ymo Products ─────────────────── */}
      <section id="own-products" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="mb-14">
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-4">
              Section 02
            </p>
            <h2 className="font-display font-bold text-[clamp(2rem,4.5vw,3.2rem)] text-void dark:text-whisper mb-3">
              Z3ymo products
            </h2>
            <p className="text-void/50 dark:text-whisper/50 max-w-xl leading-relaxed">
              Standalone platforms we are building for the market — available now or coming soon.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {OWN_PRODUCTS.map((product, i) => (
              <OwnProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────── */}
      <section className="py-24 px-6 bg-void/1.5 dark:bg-whisper/1.5">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-4">
              Process
            </p>
            <h2 className="font-display font-bold text-[clamp(2rem,4.5vw,3.2rem)] text-void dark:text-whisper">
              How it works
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_STEPS.map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 0.08}>
                <div className="relative">
                  {/* Connector line (desktop) */}
                  {i < HOW_STEPS.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="hidden lg:block absolute top-5 left-13 right-0 h-px bg-void/10 dark:bg-whisper/10 z-0"
                    />
                  )}
                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4 bg-crimson/8 border border-crimson/15">
                      <span className="font-display font-bold text-xs text-crimson">{step.num}</span>
                    </div>
                    <h3 className="font-display font-semibold text-sm text-void dark:text-whisper mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs text-void/50 dark:text-whisper/50 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────── */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display font-bold text-[clamp(2.2rem,5vw,3.8rem)] text-void dark:text-whisper leading-[1.05] mb-4">
              Let's build the right
              <br />
              <span className="text-crimson">solution for you</span>
            </h2>
            <p className="text-void/50 dark:text-whisper/50 mb-10 leading-relaxed max-w-lg mx-auto">
              Tell us about your idea or challenge — we'll help you choose the right platform or product and get started.
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
