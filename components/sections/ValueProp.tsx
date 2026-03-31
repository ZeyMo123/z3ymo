'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ui/ScrollReveal'
import GlassCard from '@/components/ui/GlassCard'
import ContactDrawer from '@/components/ui/ContactDrawer'
import Link from 'next/link'

const PILLARS = [
  {
    id: 'products',
    accent: 'gold' as const,
    label: '01',
    title: 'Products for sale',
    description:
      'Ready-made premium websites and apps — company profiles, agency sites, portfolios. Buy today, launch tomorrow.',
    href: '#products',
    cta: 'Browse products',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    tags: ['Company sites', 'Agency sites', 'Portfolios', 'Landing pages'],
  },
  {
    id: 'services',
    accent: 'emerald' as const,
    label: '02',
    title: 'Services',
    description:
      'Custom web & mobile apps, full-stack development, and free consultations — so you invest in the right solution.',
    href: '#services',
    cta: 'See services',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    tags: ['Web apps', 'Mobile apps', 'PWA', 'Free consult'],
  },
  {
    id: 'ai',
    accent: 'crimson' as const,
    label: '03',
    title: 'AI agents',
    description:
      'Custom AI agent builds for businesses and Z3ymo Pulse — our WhatsApp AI SaaS built specifically for African SMBs.',
    href: '#ai-agents',
    cta: 'Explore AI',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a2 2 0 012 2v2a2 2 0 01-2 2 2 2 0 01-2-2V4a2 2 0 012-2z" />
        <path d="M12 16a2 2 0 012 2v2a2 2 0 01-2 2 2 2 0 01-2-2v-2a2 2 0 012-2z" />
        <path d="M4 10a2 2 0 012-2h2a2 2 0 012 2 2 2 0 01-2 2H6a2 2 0 01-2-2z" />
        <path d="M14 10a2 2 0 012-2h2a2 2 0 012 2 2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        <line x1="10" y1="8" x2="8" y2="10" />
        <line x1="14" y1="8" x2="16" y2="10" />
        <line x1="10" y1="12" x2="8" y2="10" />
        <line x1="14" y1="12" x2="16" y2="10" />
      </svg>
    ),
    tags: ['Custom AI agents', 'WhatsApp AI', 'Automation', 'Pulse SaaS'],
  },
]

const accentColors: Record<string, string> = {
  gold:    'text-gold',
  emerald: 'text-emerald',
  crimson: 'text-crimson',
}

export default function ValueProp() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <section id="what-we-do" className="relative py-28 px-6 section-gradient-crimson">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-4">
            What we do
          </p>
          <h2 className="font-display font-bold text-[clamp(2rem,5vw,3.5rem)] text-void dark:text-whisper text-balance">
            Not just an agency.
            <br />
            <span className="text-void/40 dark:text-whisper/30">A product company with a studio arm.</span>
          </h2>
        </ScrollReveal>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLARS.map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 0.1}>
              <GlassCard accent={p.accent} tilt className="h-full p-8 group card-depth card-shimmer card-interactive">
                <div className="flex items-start justify-between mb-6">
                  <div className={`${accentColors[p.accent]} opacity-80`}>
                    {p.icon}
                  </div>
                  <span className="font-display font-bold text-4xl text-void/6 dark:text-whisper/6 select-none">
                    {p.label}
                  </span>
                </div>

                <h3 className="font-display font-semibold text-xl text-void dark:text-whisper mb-3">
                  {p.title}
                </h3>
                <p className="text-sm text-void/55 dark:text-whisper/55 leading-relaxed mb-6">
                  {p.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="
                        text-[11px] px-2.5 py-1 rounded-full
                        bg-void/5 dark:bg-whisper/5
                        text-void/50 dark:text-whisper/50
                        border border-void/8 dark:border-whisper/8
                      "
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={p.href}
                  className={`
                    inline-flex items-center gap-1.5 text-sm font-medium
                    ${accentColors[p.accent]}
                    group-hover:gap-2.5 transition-all duration-200
                  `}
                >
                  {p.cta}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom trust statement */}
        <ScrollReveal delay={0.3} className="text-center mt-14">
          <button
            onClick={() => setDrawerOpen(true)}
            className="
              inline-flex items-center gap-3
              text-sm text-void/50 dark:text-whisper/40
              hover:text-void dark:hover:text-whisper
              transition-colors duration-200 cursor-pointer
              group
            "
          >
            <span className="w-8 h-px bg-void/20 dark:bg-whisper/20 group-hover:bg-crimson transition-colors" />
            We consult before we build — so you never pay for the wrong solution
            <span className="w-8 h-px bg-void/20 dark:bg-whisper/20 group-hover:bg-crimson transition-colors" />
          </button>
        </ScrollReveal>
      </div>

      <ContactDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </section>
  )
}
