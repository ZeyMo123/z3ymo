'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ui/ScrollReveal'
import GlassCard from '@/components/ui/GlassCard'
import MagneticButton from '@/components/ui/MagneticButton'
import ContactDrawer from '@/components/ui/ContactDrawer'
import { SOL_ICONS, type SolIconKey, type SolutionFeature, type UseCase, type WorkflowStep, type CaseStudy } from '@/lib/data/solutions'

// ─── SVG Icon renderer ────────────────────────────────────────

export function SolIcon({
  name,
  size = 18,
  color = 'currentColor',
  strokeWidth = 1.7,
}: {
  name:          SolIconKey
  size?:         number
  color?:        string
  strokeWidth?:  number
}) {
  const d = SOL_ICONS[name]
  // Some paths have spaces indicating multiple paths
  const paths = d.includes(' M') && !d.startsWith('M9 19v') // handle multi-path icons
    ? d.split(' M').map((seg, i) => i === 0 ? seg : `M${seg}`)
    : [d]

  return (
    <svg
      width={size} height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths.map((p, i) => <path key={i} d={p} />)}
    </svg>
  )
}

// ─── Back button ──────────────────────────────────────────────

export function BackButton() {
  return (
    <Link
      href="/solutions"
      className="inline-flex items-center gap-2 text-sm text-void/50 dark:text-whisper/50 hover:text-void dark:hover:text-whisper transition-colors group mb-8"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        className="transition-transform group-hover:-translate-x-0.5">
        <path d="M19 12H5M12 5l-7 7 7 7" />
      </svg>
      All solutions
    </Link>
  )
}

// ─── 1. Hero ──────────────────────────────────────────────────

interface HeroProps {
  headline:     string
  subheadline:  string
  accent:       string
  platformName: string
  platformSlug: string
  industry:     string
}

export function SolutionHero({
  headline, subheadline, accent, platformName, platformSlug, industry,
}: HeroProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Ambient glow */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 70% 55% at 50% 0%, ${accent}0B 0%, transparent 65%)` }} />

        <div className="max-w-5xl mx-auto">
          <BackButton />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Industry badge */}
            <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border"
              style={{ borderColor: `${accent}30`, background: `${accent}08` }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
              <span className="text-xs font-semibold tracking-wide" style={{ color: accent }}>{industry}</span>
            </div>

            <h1 className="font-display font-bold text-[clamp(2.4rem,5.5vw,4.2rem)] text-void dark:text-whisper leading-[1.05] tracking-tight mb-5 max-w-3xl">
              {headline}
            </h1>
            <p className="text-base text-void/55 dark:text-whisper/55 leading-relaxed max-w-2xl mb-10">
              {subheadline}
            </p>

            <div className="flex flex-wrap gap-3">
              <MagneticButton onClick={() => setDrawerOpen(true)} variant="primary" size="lg">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />
                </svg>
                Book Free Consultation
              </MagneticButton>

              <Link
                href={`/products/platforms/${platformSlug}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium border border-void/15 dark:border-whisper/15 text-void/60 dark:text-whisper/60 hover:border-void/30 dark:hover:border-whisper/30 transition-all"
              >
                Explore {platformName}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <ContactDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}

// ─── 2. Pain section ──────────────────────────────────────────

export function PainSection({ headline, points, accent }: {
  headline: string; points: string[]; accent: string
}) {
  return (
    <section className="py-20 px-6 border-t border-void/8 dark:border-whisper/8">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <ScrollReveal>
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/35 dark:text-whisper/35 mb-4">
              The challenge
            </p>
            <h2 className="font-display font-bold text-[clamp(1.8rem,3.5vw,2.6rem)] text-void dark:text-whisper">
              {headline}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="space-y-4">
              {points.map((point, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-3.5"
                >
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: `${accent}12` }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                      stroke={accent} strokeWidth="2.5" strokeLinecap="round">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </div>
                  <p className="text-sm text-void/60 dark:text-whisper/60 leading-relaxed">{point}</p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

// ─── 3. Solution section ──────────────────────────────────────

export function SolutionSection({ headline, message, capabilities, accent }: {
  headline: string; message: string; capabilities: string[]; accent: string
}) {
  return (
    <section className="py-20 px-6 bg-void/1.5 dark:bg-whisper/1.5">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <ScrollReveal>
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/35 dark:text-whisper/35 mb-4">
              Our approach
            </p>
            <h2 className="font-display font-bold text-[clamp(1.8rem,3.5vw,2.6rem)] text-void dark:text-whisper mb-5">
              {headline}
            </h2>
            <p className="text-base text-void/55 dark:text-whisper/55 leading-relaxed italic">
              {message}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="space-y-3">
              {capabilities.map((cap, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: `${accent}12` }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                      stroke={accent} strokeWidth="2.5" strokeLinecap="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className="text-sm text-void/65 dark:text-whisper/65 leading-relaxed">{cap}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

// ─── 4. Platform features ─────────────────────────────────────

export function FeaturesSection({ platformName, platformSlug, desc, features, accent }: {
  platformName: string; platformSlug: string; desc: string; features: SolutionFeature[]; accent: string
}) {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="mb-12">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs font-medium tracking-[0.18em] uppercase mb-3"
                style={{ color: accent, opacity: 0.75 }}>
                The platform
              </p>
              <h2 className="font-display font-bold text-[clamp(1.8rem,3.5vw,2.6rem)] text-void dark:text-whisper mb-2">
                Powered by {platformName}
              </h2>
              <p className="text-void/50 dark:text-whisper/50 max-w-lg leading-relaxed text-sm">{desc}</p>
            </div>
            <Link href={`/products/platforms/${platformSlug}`}
              className="inline-flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all"
              style={{ color: accent }}>
              View full platform
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <ScrollReveal key={f.title} delay={i * 0.07}>
              <GlassCard tilt className="p-6 h-full hover:border-void/14 dark:hover:border-whisper/14 transition-all duration-200">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: `${accent}10` }}>
                  <SolIcon name={f.icon} color={accent} size={18} />
                </div>
                <h3 className="font-display font-semibold text-base text-void dark:text-whisper mb-2">{f.title}</h3>
                <p className="text-sm text-void/55 dark:text-whisper/55 leading-relaxed">{f.desc}</p>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 5. Use cases ─────────────────────────────────────────────

export function UseCasesSection({ headline, useCases, accent }: {
  headline: string; useCases: UseCase[]; accent: string
}) {
  return (
    <section className="py-20 px-6 bg-void/1.5 dark:bg-whisper/1.5">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="mb-12">
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/35 dark:text-whisper/35 mb-4">
            Use cases
          </p>
          <h2 className="font-display font-bold text-[clamp(1.8rem,3.5vw,2.6rem)] text-void dark:text-whisper">
            {headline}
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {useCases.map((uc, i) => (
            <ScrollReveal key={uc.title} delay={i * 0.07}>
              <div className="p-6 rounded-2xl border border-void/8 dark:border-whisper/8 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{ background: `${accent}10` }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke={accent} strokeWidth="2" strokeLinecap="round">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <h3 className="font-display font-semibold text-base text-void dark:text-whisper">{uc.title}</h3>
                </div>
                <div className="space-y-2">
                  {uc.points.map((point) => (
                    <div key={point} className="flex items-start gap-2.5 text-sm text-void/60 dark:text-whisper/60">
                      <div className="w-1 h-1 rounded-full mt-2 shrink-0" style={{ background: accent }} />
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 6. Workflow ──────────────────────────────────────────────

export function WorkflowSection({ headline, steps, accent }: {
  headline: string; steps: WorkflowStep[]; accent: string
}) {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal className="mb-12 text-center">
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/35 dark:text-whisper/35 mb-4">
            How it works
          </p>
          <h2 className="font-display font-bold text-[clamp(1.8rem,3.5vw,2.6rem)] text-void dark:text-whisper">
            {headline}
          </h2>
        </ScrollReveal>

        <div className="relative">
          {/* Vertical connector */}
          <div className="absolute left-4.75 top-8 bottom-8 w-px bg-void/8 dark:bg-whisper/8 hidden sm:block" />

          <div className="space-y-4">
            {steps.map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.07}>
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-5"
                >
                  {/* Step circle */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 relative z-10 bg-white dark:bg-void-900"
                    style={{
                      borderColor: i === 0 || i === steps.length - 1 ? accent : `${accent}40`,
                      background:  i === 0 || i === steps.length - 1 ? `${accent}10` : 'transparent',
                    }}
                  >
                    <span className="font-display font-bold text-xs" style={{ color: accent }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Step label */}
                  <div className={[
                    'flex-1 py-3 px-5 rounded-2xl text-sm font-medium transition-all',
                    i === 0 || i === steps.length - 1
                      ? 'text-void dark:text-whisper border border-void/10 dark:border-whisper/10'
                      : 'text-void/60 dark:text-whisper/60',
                  ].join(' ')}
                    style={i === 0 || i === steps.length - 1 ? { background: `${accent}06` } : {}}>
                    {step.label}
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── 7. AI layer ──────────────────────────────────────────────

export function AISection({ headline, message, examples, accent }: {
  headline: string; message: string; examples: string[]; accent: string
}) {
  return (
    <section className="py-20 px-6 bg-void/1.5 dark:bg-whisper/1.5">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/35 dark:text-whisper/35 mb-4">
              AI-enhanced
            </p>
            <h2 className="font-display font-bold text-[clamp(1.8rem,3.5vw,2.4rem)] text-void dark:text-whisper mb-4">
              {headline}
            </h2>
            <p className="text-void/55 dark:text-whisper/55 text-sm leading-relaxed">
              {message}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="space-y-3">
              {examples.map((ex, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-void/8 dark:border-whisper/8 bg-white dark:bg-void-900/50">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${accent}10` }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke={accent} strokeWidth="2" strokeLinecap="round">
                      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                      <polyline points="16 7 22 7 22 13" />
                    </svg>
                  </div>
                  <span className="text-sm text-void/65 dark:text-whisper/65">{ex}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

// ─── 8. Case study ────────────────────────────────────────────

export function CaseStudySection({ caseStudy, accent }: {
  caseStudy: CaseStudy; accent: string
}) {
  const rows = [
    { label: 'Problem',  value: caseStudy.problem,  icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
    { label: 'Solution', value: caseStudy.solution, icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
    { label: 'Outcome',  value: caseStudy.outcome,  icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  ]

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="mb-10">
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/35 dark:text-whisper/35 mb-4">
            Example outcome
          </p>
          <h2 className="font-display font-bold text-[clamp(1.8rem,3.5vw,2.4rem)] text-void dark:text-whisper">
            What this looks like in action
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <GlassCard className="overflow-hidden">
            {/* Card header */}
            <div className="px-7 py-5 border-b border-void/8 dark:border-whisper/8"
              style={{ background: `${accent}05` }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: `${accent}15` }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke={accent} strokeWidth="2" strokeLinecap="round">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                  </svg>
                </div>
                <span className="font-display font-bold text-void dark:text-whisper">{caseStudy.title}</span>
                <span className="ml-auto text-[10px] font-semibold px-2 py-1 rounded-full"
                  style={{ background: `${accent}12`, color: accent }}>
                  Sample project
                </span>
              </div>
            </div>

            <div className="p-7 space-y-5">
              {rows.map(({ label, value, icon }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${accent}08` }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke={accent} strokeWidth="1.8" strokeLinecap="round">
                      <path d={icon} />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-void/30 dark:text-whisper/30 mb-1">
                      {label}
                    </div>
                    <div className="text-sm text-void/65 dark:text-whisper/65 leading-relaxed">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </ScrollReveal>
      </div>
    </section>
  )
}

// ─── 9. Comparison ────────────────────────────────────────────

export function ComparisonSection({ title, without, withZ3ymo, accent }: {
  title: string; without: string[]; withZ3ymo: string[]; accent: string
}) {
  return (
    <section className="py-20 px-6 bg-void/1.5 dark:bg-whisper/1.5">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <h2 className="font-display font-bold text-[clamp(1.8rem,3.5vw,2.6rem)] text-void dark:text-whisper">
            {title}
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Without */}
          <ScrollReveal>
            <div className="p-7 rounded-2xl border border-void/10 dark:border-whisper/10 bg-white dark:bg-void-900/50 h-full">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-xl bg-void/6 dark:bg-whisper/6 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                    className="text-void/35 dark:text-whisper/35">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
                <h3 className="font-display font-semibold text-void dark:text-whisper">Without Z3ymo</h3>
              </div>
              <div className="space-y-3">
                {without.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-void/55 dark:text-whisper/55">
                    <div className="w-1 h-1 rounded-full mt-2 shrink-0 bg-void/20 dark:bg-whisper/20" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* With Z3ymo */}
          <ScrollReveal delay={0.08}>
            <div className="p-7 rounded-2xl border h-full"
              style={{ borderColor: `${accent}25`, background: `${accent}04` }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: `${accent}12` }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke={accent} strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-display font-semibold text-void dark:text-whisper">With Z3ymo</h3>
              </div>
              <div className="space-y-3">
                {withZ3ymo.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-void/65 dark:text-whisper/65">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: `${accent}12` }}>
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none"
                        stroke={accent} strokeWidth="3" strokeLinecap="round">
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

// ─── 10. Final CTA ────────────────────────────────────────────

export function SolutionCTA({ headline, text, accent }: {
  headline: string; text: string; accent: string
}) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-8"
              style={{ background: `${accent}10`, border: `1px solid ${accent}22` }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke={accent} strokeWidth="1.8" strokeLinecap="round">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="font-display font-bold text-[clamp(2rem,4.5vw,3.2rem)] text-void dark:text-whisper mb-4">
              {headline}
            </h2>
            <p className="text-void/50 dark:text-whisper/50 mb-10 leading-relaxed max-w-lg mx-auto">
              {text}
            </p>
            <button
              onClick={() => setDrawerOpen(true)}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-sm text-white transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              style={{ background: accent, boxShadow: `0 0 40px ${accent}30` }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />
              </svg>
              Book Free Consultation
            </button>
          </ScrollReveal>
        </div>
      </section>
      <ContactDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
