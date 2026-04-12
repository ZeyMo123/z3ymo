'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'
import GlassCard from '@/components/ui/GlassCard'
import MagneticButton from '@/components/ui/MagneticButton'
import ContactDrawer from '@/components/ui/ContactDrawer'
import { useState } from 'react'
import type { PlatformFeature } from '@/lib/data/platforms'

/* ─── SVG Icon ─────────────────────────────────────── */
export function PlatformIcon({ path, color, size = 20 }: { path: string; color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {path.split(' M').map((segment, i) => (
        <path key={i} d={i === 0 ? segment : `M${segment}`} />
      ))}
    </svg>
  )
}

/* ─── Problem section ───────────────────────────────── */
export function ProblemSection({
  headline, problems, accent,
}: {
  headline: string; problems: string[]; accent: string
}) {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/2">
              <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-4">
                The challenge
              </p>
              <h2 className="font-display font-bold text-[clamp(1.8rem,3.5vw,2.5rem)] text-void dark:text-whisper">
                {headline}
              </h2>
            </div>
            <div className="md:w-1/2 space-y-3">
              {problems.map((problem, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: `${accent}12` }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </div>
                  <p className="text-sm text-void/60 dark:text-whisper/60 leading-relaxed">{problem}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

/* ─── Features grid ─────────────────────────────────── */
export function FeaturesSection({
  headline, features, accent,
}: {
  headline: string; features: PlatformFeature[]; accent: string
}) {
  return (
    <section id="features" className="py-20 px-6 bg-void/1.5 dark:bg-whisper/1.5">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="mb-14">
          <p className="text-xs font-medium tracking-[0.18em] uppercase mb-4" style={{ color: accent, opacity: 0.7 }}>
            What's included
          </p>
          <h2 className="font-display font-bold text-[clamp(1.8rem,4vw,3rem)] text-void dark:text-whisper">
            {headline}
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <ScrollReveal key={f.title} delay={i * 0.07}>
              <GlassCard className="p-6 h-full hover:border-void/16 dark:hover:border-whisper/16 transition-all duration-200" tilt>
                <div className="mb-4">
                  <PlatformIcon path={f.iconPath} color={accent} size={22} />
                </div>
                <h3 className="font-display font-semibold text-base text-void dark:text-whisper mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-void/55 dark:text-whisper/55 leading-relaxed">
                  {f.desc}
                </p>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── AI Insights section ───────────────────────────── */
export function AISection({
  headline, insights, accent,
}: {
  headline: string; insights: string[]; accent: string
}) {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-4">
              AI-powered
            </p>
            <h2 className="font-display font-bold text-[clamp(1.8rem,3.5vw,2.5rem)] text-void dark:text-whisper mb-4">
              {headline}
            </h2>
            <p className="text-void/50 dark:text-whisper/50 text-sm leading-relaxed">
              Smart insights that help you make better decisions — built in, not bolted on.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="space-y-3">
              {insights.map((insight, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-2xl border border-void/8 dark:border-whisper/8 bg-void/2 dark:bg-whisper/2">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${accent}12` }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round">
                      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                      <polyline points="16 7 22 7 22 13" />
                    </svg>
                  </div>
                  <span className="text-sm text-void/70 dark:text-whisper/70">{insight}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

/* ─── Industries section ────────────────────────────── */
export function IndustriesSection({
  industries, accent,
}: {
  industries: string[]; accent: string
}) {
  return (
    <section className="py-16 px-6 bg-void/1.5 dark:bg-whisper/1.5">
      <div className="max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-4">
            Built for
          </p>
          <h2 className="font-display font-bold text-[clamp(1.5rem,3vw,2rem)] text-void dark:text-whisper mb-8">
            Designed for your industry
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {industries.map((industry) => (
              <span key={industry}
                className="text-sm font-medium px-4 py-2 rounded-full border"
                style={{ borderColor: `${accent}25`, background: `${accent}08`, color: accent }}>
                {industry}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

/* ─── Automation section ────────────────────────────── */
export function AutomationSection({
  automations, accent,
}: {
  automations: string[]; accent: string
}) {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="mb-10">
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-4">
            Automation
          </p>
          <h2 className="font-display font-bold text-[clamp(1.8rem,3.5vw,2.5rem)] text-void dark:text-whisper">
            Reduce daily manual work
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {automations.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.06}>
              <div className="flex items-center gap-3 p-4 rounded-2xl border border-void/8 dark:border-whisper/8">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${accent}10` }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-sm text-void/65 dark:text-whisper/65">{item}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── How it works ──────────────────────────────────── */
export function HowItWorksSection({ accent }: { accent: string }) {
  const STEPS = [
    { num: '01', title: 'Book a consultation',         desc: 'We start with a free call to understand your business, goals, and exact requirements.' },
    { num: '02', title: 'We understand your needs',    desc: 'We map your workflows, pain points, and what a successful platform looks like for you.' },
    { num: '03', title: 'We customize your platform',  desc: 'We build and configure the platform around your business — not a generic template.' },
    { num: '04', title: 'Launch your system',          desc: 'We deploy your platform, train your team, and provide ongoing support as you grow.' },
  ]

  return (
    <section className="py-20 px-6 bg-void/1.5 dark:bg-whisper/1.5">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="mb-14">
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-4">
            Process
          </p>
          <h2 className="font-display font-bold text-[clamp(1.8rem,3.5vw,2.5rem)] text-void dark:text-whisper">
            How it works
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <ScrollReveal key={step.num} delay={i * 0.08}>
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: `${accent}10`, border: `1px solid ${accent}20` }}>
                  <span className="font-display font-bold text-sm" style={{ color: accent }}>
                    {step.num}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-base text-void dark:text-whisper mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-void/50 dark:text-whisper/50 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Example platform nav preview ─────────────────── */
export function ExamplePlatformSection({
  customerNav, adminNav, accent, name,
}: {
  customerNav: string[]; adminNav: string[]; accent: string; name: string
}) {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="mb-12">
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-4">
            Platform structure
          </p>
          <h2 className="font-display font-bold text-[clamp(1.8rem,3.5vw,2.5rem)] text-void dark:text-whisper">
            What your platform includes
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Customer view */}
          <ScrollReveal>
            <GlassCard className="p-6">
              <div className="text-xs font-semibold tracking-wider uppercase text-void/35 dark:text-whisper/35 mb-4">
                Customer-facing pages
              </div>
              <div className="space-y-2">
                {customerNav.map((page) => (
                  <div key={page} className="flex items-center gap-2.5 py-2 px-3 rounded-xl bg-void/3 dark:bg-whisper/3">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
                    <span className="text-sm text-void/65 dark:text-whisper/65">{page}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </ScrollReveal>

          {/* Admin view */}
          <ScrollReveal delay={0.1}>
            <GlassCard className="p-6">
              <div className="text-xs font-semibold tracking-wider uppercase text-void/35 dark:text-whisper/35 mb-4">
                Admin dashboard
              </div>
              <div className="space-y-2">
                {adminNav.map((page) => (
                  <div key={page} className="flex items-center gap-2.5 py-2 px-3 rounded-xl bg-void/3 dark:bg-whisper/3">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
                    <span className="text-sm text-void/65 dark:text-whisper/65">{page}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

/* ─── Benefits section ──────────────────────────────── */
export function BenefitsSection({
  benefits, accent, name,
}: {
  benefits: Array<{ title: string; desc: string }>; accent: string; name: string
}) {
  return (
    <section className="py-20 px-6 bg-void/1.5 dark:bg-whisper/1.5">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="mb-12">
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-4">
            Why {name}
          </p>
          <h2 className="font-display font-bold text-[clamp(1.8rem,3.5vw,2.5rem)] text-void dark:text-whisper">
            Why businesses choose {name}
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {benefits.map((b, i) => (
            <ScrollReveal key={b.title} delay={i * 0.07}>
              <div className="flex items-start gap-4 p-6 rounded-2xl border border-void/8 dark:border-whisper/8">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${accent}10` }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <div className="font-display font-semibold text-sm text-void dark:text-whisper mb-1">{b.title}</div>
                  <div className="text-sm text-void/50 dark:text-whisper/50 leading-relaxed">{b.desc}</div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Platform final CTA ────────────────────────────── */
export function PlatformCTA({
  headline, text, accent,
}: {
  headline: string; text: string; accent: string
}) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-8"
              style={{ background: `${accent}12`, border: `1px solid ${accent}25` }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.8" strokeLinecap="round">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)] text-void dark:text-whisper mb-4">
              {headline}
            </h2>
            <p className="text-void/50 dark:text-whisper/50 mb-10 leading-relaxed max-w-xl mx-auto">
              {text}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setDrawerOpen(true)}
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-medium text-sm text-white transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                style={{ background: accent, boxShadow: `0 0 32px ${accent}35` }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />
                </svg>
                Book Free Consultation
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <ContactDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
