'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ui/ScrollReveal'
import GlassCard from '@/components/ui/GlassCard'
import MagneticButton from '@/components/ui/MagneticButton'
import ContactDrawer from '@/components/ui/ContactDrawer'
import {
  SVC_ICONS,
  type SvcIconKey,
  type ServiceCapability,
  type ServiceUseCase,
  type ServiceWorkflowStep,
  type ServiceCaseExample,
} from '@/lib/data/services'

// ─── SVG icon renderer ────────────────────────────────────────

export function SvcIcon({
  name,
  size = 18,
  color = 'currentColor',
  strokeWidth = 1.75,
}: {
  name:         SvcIconKey
  size?:        number
  color?:       string
  strokeWidth?: number
}) {
  const raw   = SVC_ICONS[name]
  const segs  = raw.split(' M').map((seg, i) => (i === 0 ? seg : `M${seg}`))

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {segs.map((d, i) => <path key={i} d={d} />)}
    </svg>
  )
}

// ─── Back button ──────────────────────────────────────────────

export function ServiceBackButton() {
  return (
    <Link
      href="/services"
      className="inline-flex items-center gap-2 text-sm text-void/50 dark:text-whisper/50 hover:text-void dark:hover:text-whisper transition-colors group mb-8"
    >
      <motion.span
        className="flex items-center"
        whileHover={{ x: -3 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <svg
          width="16" height="16" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        >
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
      </motion.span>
      All services
    </Link>
  )
}

// ─── 1. Hero ──────────────────────────────────────────────────

export function ServiceHero({
  tagline,
  headline,
  subheadline,
  accent,
  secondaryCta,
  secondaryHref,
}: {
  tagline:       string
  headline:      string
  subheadline:   string
  accent:        string
  secondaryCta:  string
  secondaryHref: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 70% 55% at 50% 0%, ${accent}0A 0%, transparent 65%)` }}
        />
        <div className="max-w-5xl mx-auto">
          <ServiceBackButton />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Category badge */}
            <div
              className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border"
              style={{ borderColor: `${accent}35`, background: `${accent}08` }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
              <span className="text-xs font-semibold tracking-wide" style={{ color: accent }}>
                {tagline}
              </span>
            </div>

            <h1 className="font-display font-bold text-[clamp(2.2rem,5.5vw,4rem)] text-void dark:text-whisper leading-[1.05] tracking-tight mb-5 max-w-3xl">
              {headline}
            </h1>
            <p className="text-base text-void/55 dark:text-whisper/55 leading-relaxed max-w-2xl mb-10">
              {subheadline}
            </p>

            <div className="flex flex-wrap gap-3">
              <MagneticButton onClick={() => setOpen(true)} variant="primary" size="lg">
                <SvcIcon name="arrow" size={14} color="white" strokeWidth={2.2} />
                Book Free Consultation
              </MagneticButton>
              <Link
                href={secondaryHref}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium border border-void/15 dark:border-whisper/15 text-void/60 dark:text-whisper/60 hover:border-void/30 dark:hover:border-whisper/30 transition-all"
              >
                {secondaryCta}
                <SvcIcon name="arrow" size={13} strokeWidth={2} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <ContactDrawer open={open} onClose={() => setOpen(false)} />
    </>
  )
}

// ─── 2. Problem section ───────────────────────────────────────

export function ProblemSection({
  headline,
  painPoints,
  accent,
}: {
  headline:   string
  painPoints: string[]
  accent:     string
}) {
  return (
    <section className="py-20 px-6 border-t border-void/8 dark:border-whisper/8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <ScrollReveal>
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/35 dark:text-whisper/35 mb-4">
            The challenge
          </p>
          <h2 className="font-display font-bold text-[clamp(1.7rem,3.2vw,2.5rem)] text-void dark:text-whisper">
            {headline}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="space-y-4">
            {painPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-start gap-3.5"
              >
                {/* X icon */}
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: `${accent}12` }}
                >
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none"
                    stroke={accent} strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
                <p className="text-sm text-void/60 dark:text-whisper/60 leading-relaxed">{point}</p>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

// ─── 3. Solution section ──────────────────────────────────────

export function SolutionSection({
  headline,
  message,
  deliverables,
  accent,
}: {
  headline:     string
  message:      string
  deliverables: string[]
  accent:       string
}) {
  return (
    <section className="py-20 px-6 bg-void/[0.015] dark:bg-whisper/[0.015]">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <ScrollReveal>
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/35 dark:text-whisper/35 mb-4">
            Our approach
          </p>
          <h2 className="font-display font-bold text-[clamp(1.7rem,3.2vw,2.5rem)] text-void dark:text-whisper mb-5">
            {headline}
          </h2>
          <p className="text-base text-void/55 dark:text-whisper/55 leading-relaxed italic border-l-2 pl-4"
            style={{ borderColor: `${accent}40` }}>
            {message}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/35 dark:text-whisper/35 mb-4">
            What we deliver
          </p>
          <div className="space-y-3">
            {deliverables.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: `${accent}12` }}
                >
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none"
                    stroke={accent} strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="text-sm text-void/65 dark:text-whisper/65 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

// ─── 4. Capabilities grid (Software/AI pages) ─────────────────

export function CapabilitiesSection({
  headline,
  capabilities,
  accent,
}: {
  headline:     string
  capabilities: ServiceCapability[]
  accent:       string
}) {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="mb-12">
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/35 dark:text-whisper/35 mb-4">
            Capabilities
          </p>
          <h2 className="font-display font-bold text-[clamp(1.7rem,3.2vw,2.5rem)] text-void dark:text-whisper">
            {headline}
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {capabilities.map((cap, i) => (
            <ScrollReveal key={cap.title} delay={i * 0.07}>
              <GlassCard tilt className="p-6 h-full">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4 flex-shrink-0"
                  style={{ background: `${accent}10` }}
                >
                  <SvcIcon name={cap.icon} color={accent} size={18} />
                </div>
                <h3 className="font-display font-semibold text-base text-void dark:text-whisper mb-2">
                  {cap.title}
                </h3>
                <p className="text-sm text-void/55 dark:text-whisper/55 leading-relaxed">{cap.desc}</p>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 4b. Deliverables grid (Consulting pages) ─────────────────

export function DeliverablesSection({
  headline,
  blocks,
  accent,
}: {
  headline: string
  blocks:   ServiceCapability[]
  accent:   string
}) {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="mb-12">
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/35 dark:text-whisper/35 mb-4">
            Deliverables
          </p>
          <h2 className="font-display font-bold text-[clamp(1.7rem,3.2vw,2.5rem)] text-void dark:text-whisper">
            {headline}
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {blocks.map((block, i) => (
            <ScrollReveal key={block.title} delay={i * 0.07}>
              <div className="p-6 rounded-2xl border border-void/8 dark:border-whisper/8 h-full hover:border-void/14 dark:hover:border-whisper/14 transition-all duration-200">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: `${accent}10` }}
                >
                  <SvcIcon name={block.icon} color={accent} size={18} />
                </div>
                <h3 className="font-display font-semibold text-base text-void dark:text-whisper mb-2">
                  {block.title}
                </h3>
                <p className="text-sm text-void/55 dark:text-whisper/55 leading-relaxed">{block.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 5. Use cases ─────────────────────────────────────────────

export function UseCasesSection({
  headline,
  useCases,
  accent,
}: {
  headline: string
  useCases: ServiceUseCase[]
  accent:   string
}) {
  return (
    <section className="py-20 px-6 bg-void/[0.015] dark:bg-whisper/[0.015]">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="mb-12">
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/35 dark:text-whisper/35 mb-4">
            Use cases
          </p>
          <h2 className="font-display font-bold text-[clamp(1.7rem,3.2vw,2.5rem)] text-void dark:text-whisper">
            {headline}
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {useCases.map((uc, i) => (
            <ScrollReveal key={uc.title} delay={i * 0.07}>
              <div className="p-6 rounded-2xl border border-void/8 dark:border-whisper/8 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{ background: `${accent}10` }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke={accent} strokeWidth="2" strokeLinecap="round">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <h3 className="font-display font-semibold text-base text-void dark:text-whisper">
                    {uc.title}
                  </h3>
                </div>
                <div className="space-y-2">
                  {uc.points.map((pt) => (
                    <div key={pt} className="flex items-start gap-2.5 text-sm text-void/60 dark:text-whisper/60">
                      <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: accent }} />
                      {pt}
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

export function WorkflowSection({
  headline,
  steps,
  accent,
}: {
  headline: string
  steps:    ServiceWorkflowStep[]
  accent:   string
}) {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal className="mb-12 text-center">
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/35 dark:text-whisper/35 mb-4">
            Process
          </p>
          <h2 className="font-display font-bold text-[clamp(1.7rem,3.2vw,2.5rem)] text-void dark:text-whisper">
            {headline}
          </h2>
        </ScrollReveal>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-8 bottom-8 w-px bg-void/8 dark:bg-whisper/8 hidden sm:block" />

          <div className="space-y-4">
            {steps.map((step, i) => {
              const isFirst = i === 0
              const isLast  = i === steps.length - 1
              const isEnd   = isFirst || isLast

              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <motion.div
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-5"
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 border-2"
                      style={{
                        borderColor:  isEnd ? accent : `${accent}40`,
                        background:   isEnd ? `${accent}10` : 'transparent',
                      }}
                    >
                      <span
                        className="font-display font-bold text-[11px]"
                        style={{ color: accent }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <div
                      className={[
                        'flex-1 py-3 px-5 rounded-2xl text-sm font-medium transition-colors',
                        isEnd
                          ? 'text-void dark:text-whisper border border-void/10 dark:border-whisper/10'
                          : 'text-void/60 dark:text-whisper/60',
                      ].join(' ')}
                      style={isEnd ? { background: `${accent}06` } : {}}
                    >
                      {step.label}
                    </div>
                  </motion.div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── 7. Technology section (Software/AI pages) ───────────────

export function TechSection({
  headline,
  message,
  techPoints,
  accent,
}: {
  headline:   string
  message:    string
  techPoints: string[]
  accent:     string
}) {
  return (
    <section className="py-20 px-6 bg-void/[0.015] dark:bg-whisper/[0.015]">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <ScrollReveal>
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/35 dark:text-whisper/35 mb-4">
            Technology
          </p>
          <h2 className="font-display font-bold text-[clamp(1.7rem,3.2vw,2.5rem)] text-void dark:text-whisper mb-4">
            {headline}
          </h2>
          <p className="text-void/55 dark:text-whisper/55 text-sm leading-relaxed">{message}</p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="space-y-3">
            {techPoints.map((pt, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 rounded-2xl border border-void/8 dark:border-whisper/8"
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${accent}10` }}
                >
                  <SvcIcon name="check" color={accent} size={14} />
                </div>
                <span className="text-sm text-void/65 dark:text-whisper/65">{pt}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

// ─── 7b. Why it matters (Consulting pages) ───────────────────

export function WhySection({
  headline,
  message,
  accent,
}: {
  headline: string
  message:  string
  accent:   string
}) {
  return (
    <section className="py-20 px-6 bg-void/[0.015] dark:bg-whisper/[0.015]">
      <div className="max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/35 dark:text-whisper/35 mb-4">
            Why it matters
          </p>
          <h2 className="font-display font-bold text-[clamp(1.7rem,3.2vw,2.5rem)] text-void dark:text-whisper mb-6">
            {headline}
          </h2>
          <p
            className="text-base text-void/60 dark:text-whisper/60 leading-relaxed italic border-l-2 text-left px-6 py-4 rounded-r-2xl"
            style={{ borderColor: accent, background: `${accent}04` }}
          >
            {message}
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}

// ─── 8. Case example ─────────────────────────────────────────

export function CaseExampleSection({
  caseExample,
  accent,
}: {
  caseExample: ServiceCaseExample
  accent:      string
}) {
  const rows = [
    {
      label: 'Problem',
      value: caseExample.problem,
      icon:  'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    },
    {
      label: 'Solution',
      value: caseExample.solution,
      icon:  'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    },
    {
      label: 'Outcome',
      value: caseExample.outcome,
      icon:  'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    },
  ]

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="mb-10">
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/35 dark:text-whisper/35 mb-4">
            Example outcome
          </p>
          <h2 className="font-display font-bold text-[clamp(1.7rem,3.2vw,2.5rem)] text-void dark:text-whisper">
            What this looks like in practice
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <GlassCard className="overflow-hidden">
            <div
              className="px-7 py-5 border-b border-void/8 dark:border-whisper/8 flex items-center gap-3"
              style={{ background: `${accent}04` }}
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: `${accent}15` }}
              >
                <SvcIcon name="target" color={accent} size={14} />
              </div>
              <span className="font-display font-bold text-void dark:text-whisper">{caseExample.title}</span>
              <span
                className="ml-auto text-[10px] font-semibold px-2 py-1 rounded-full"
                style={{ background: `${accent}12`, color: accent }}
              >
                Sample project
              </span>
            </div>

            <div className="p-7 space-y-5">
              {rows.map(({ label, value, icon }) => (
                <div key={label} className="flex items-start gap-4">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${accent}08` }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke={accent} strokeWidth="1.8" strokeLinecap="round">
                      <path d={icon} />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-void/30 dark:text-whisper/30 mb-1">
                      {label}
                    </div>
                    <div className="text-sm text-void/65 dark:text-whisper/65 leading-relaxed">
                      {value}
                    </div>
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

export function ComparisonSection({
  title,
  leftLabel,
  leftItems,
  rightLabel,
  rightItems,
  accent,
}: {
  title:      string
  leftLabel:  string
  leftItems:  string[]
  rightLabel: string
  rightItems: string[]
  accent:     string
}) {
  return (
    <section className="py-20 px-6 bg-void/[0.015] dark:bg-whisper/[0.015]">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <h2 className="font-display font-bold text-[clamp(1.7rem,3.2vw,2.5rem)] text-void dark:text-whisper">
            {title}
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Left — without */}
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
                <h3 className="font-display font-semibold text-void dark:text-whisper">{leftLabel}</h3>
              </div>
              <div className="space-y-3">
                {leftItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-void/55 dark:text-whisper/55">
                    <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0 bg-void/20 dark:bg-whisper/20" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right — with Z3ymo */}
          <ScrollReveal delay={0.08}>
            <div
              className="p-7 rounded-2xl border h-full"
              style={{ borderColor: `${accent}25`, background: `${accent}04` }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: `${accent}12` }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke={accent} strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-display font-semibold text-void dark:text-whisper">{rightLabel}</h3>
              </div>
              <div className="space-y-3">
                {rightItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-void/65 dark:text-whisper/65">
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: `${accent}12` }}
                    >
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

export function ServiceCTA({
  headline,
  text,
  accent,
}: {
  headline: string
  text:     string
  accent:   string
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-8"
              style={{ background: `${accent}10`, border: `1px solid ${accent}22` }}
            >
              <SvcIcon name="zap" color={accent} size={22} strokeWidth={1.8} />
            </div>
            <h2 className="font-display font-bold text-[clamp(2rem,4.5vw,3.2rem)] text-void dark:text-whisper mb-4">
              {headline}
            </h2>
            <p className="text-void/50 dark:text-whisper/50 mb-10 leading-relaxed max-w-lg mx-auto">
              {text}
            </p>
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-sm text-white transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              style={{ background: accent, boxShadow: `0 0 40px ${accent}30` }}
            >
              <SvcIcon name="arrow" size={14} color="white" strokeWidth={2.2} />
              Book Free Consultation
            </button>
          </ScrollReveal>
        </div>
      </section>
      <ContactDrawer open={open} onClose={() => setOpen(false)} />
    </>
  )
}
