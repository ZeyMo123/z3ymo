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
import { SvcIcon } from '@/components/services/ServiceSections'
import {
  SERVICE_PILLARS,
  DECISION_PATHS,
  HOW_WE_WORK,
  INDUSTRIES_SERVED,
  WHY_REASONS,
} from '@/lib/data/services'

function PillarCard({ pillar, index }: { pillar: typeof SERVICE_PILLARS[0]; index: number }) {
  return (
    <ScrollReveal delay={index * 0.08}>
      <GlassCard tilt className="h-full group p-7">
        <div className="h-0.5 w-12 rounded-full mb-6" style={{ background: pillar.accent }} />
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: `${pillar.accent}10` }}>
          <SvcIcon name={pillar.icon} color={pillar.accent} size={20} />
        </div>
        <p className="text-xs font-semibold tracking-wider uppercase mb-2" style={{ color: pillar.accent }}>{pillar.title}</p>
        <h3 className="font-display font-bold text-lg text-void dark:text-whisper mb-3">{pillar.tagline}</h3>
        <p className="text-sm text-void/55 dark:text-whisper/55 leading-relaxed mb-5">{pillar.desc}</p>
        <div className="space-y-2 mb-6">
          {pillar.services.map((svc) => (
            <div key={svc} className="flex items-center gap-2.5 text-xs text-void/55 dark:text-whisper/55">
              <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: pillar.accent }} />
              {svc}
            </div>
          ))}
        </div>
        <Link href={pillar.href}
          className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-150 group-hover:gap-3"
          style={{ color: pillar.accent }}>
          Explore {pillar.title}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </GlassCard>
    </ScrollReveal>
  )
}

export default function ServicesPage() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <main className="min-h-screen">
      <FloatingNav />

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(192,57,43,0.07) 0%, transparent 65%)' }} />
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-5">What we build</p>
            <h1 className="font-display font-bold text-[clamp(2.8rem,7vw,5.5rem)] text-void dark:text-whisper leading-[0.95] tracking-tight mb-5">
              Services designed to build<br /><span className="text-crimson">and scale modern businesses</span>
            </h1>
            <p className="text-base text-void/55 dark:text-whisper/55 leading-relaxed max-w-2xl mx-auto mb-10">
              From custom software to AI systems and strategic guidance — Z3ymo helps you design, build, and grow with the right technology.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <MagneticButton onClick={() => setDrawerOpen(true)} variant="primary" size="lg">
                <SvcIcon name="arrow" size={14} color="white" strokeWidth={2.2} />
                Book Free Consultation
              </MagneticButton>
              <Link href="/solutions"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium border border-void/15 dark:border-whisper/15 text-void/60 dark:text-whisper/60 hover:border-void/30 dark:hover:border-whisper/30 transition-all">
                View our solutions
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3 Pillars */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="mb-12">
            <h2 className="font-display font-bold text-[clamp(1.8rem,3.5vw,2.6rem)] text-void dark:text-whisper">What we help you build</h2>
            <p className="text-void/50 dark:text-whisper/50 mt-3 text-sm max-w-lg leading-relaxed">Three focused service areas — each designed to address a specific type of business need.</p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SERVICE_PILLARS.map((pillar, i) => <PillarCard key={pillar.title} pillar={pillar} index={i} />)}
          </div>
        </div>
      </section>

      {/* Decision helper */}
      <section className="py-20 px-6 border-t border-void/8 dark:border-whisper/8">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="mb-10">
            <h2 className="font-display font-bold text-[clamp(1.8rem,3.5vw,2.6rem)] text-void dark:text-whisper">Not sure where to start?</h2>
            <p className="text-void/50 dark:text-whisper/50 mt-3 text-sm leading-relaxed">Match your current situation to the right service area.</p>
          </ScrollReveal>
          <div className="space-y-4">
            {DECISION_PATHS.map((path, i) => (
              <ScrollReveal key={path.service} delay={i * 0.07}>
                <Link href={path.href} className="group block">
                  <div className="flex items-center gap-5 p-5 rounded-2xl border border-void/8 dark:border-whisper/8 hover:border-void/16 dark:hover:border-whisper/16 transition-all duration-200">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${path.accent}10` }}>
                      <SvcIcon name={path.icon} color={path.accent} size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm text-void/50 dark:text-whisper/50">{path.condition}</span>
                      <span className="mx-2 text-void/25 dark:text-whisper/25">→</span>
                      <span className="text-sm font-semibold" style={{ color: path.accent }}>{path.service}</span>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                      className="text-void/20 dark:text-whisper/20 group-hover:text-void/50 dark:group-hover:text-whisper/50 transition-colors flex-shrink-0">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="py-20 px-6 bg-void/[0.015] dark:bg-whisper/[0.015]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <h2 className="font-display font-bold text-[clamp(1.8rem,3.5vw,2.6rem)] text-void dark:text-whisper">
              A structured approach to building your business
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {HOW_WE_WORK.map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 0.08}>
                <div className="relative">
                  {i < HOW_WE_WORK.length - 1 && (
                    <div aria-hidden="true" className="hidden lg:block absolute top-5 left-[calc(2.5rem+12px)] right-0 h-px bg-void/8 dark:bg-whisper/8 z-0" />
                  )}
                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4 bg-crimson/8 border border-crimson/15">
                      <span className="font-display font-bold text-xs text-crimson">{step.num}</span>
                    </div>
                    <h3 className="font-display font-semibold text-base text-void dark:text-whisper mb-2">{step.title}</h3>
                    <p className="text-sm text-void/50 dark:text-whisper/50 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industries bridge */}
      <section className="py-20 px-6 border-t border-void/8 dark:border-whisper/8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <h2 className="font-display font-bold text-[clamp(1.8rem,3.5vw,2.6rem)] text-void dark:text-whisper mb-4">Built for different types of businesses</h2>
              <p className="text-void/50 dark:text-whisper/50 text-sm leading-relaxed mb-6">Every service we offer is shaped around the realities of specific industries — not generic, one-size-fits-all solutions.</p>
              <Link href="/solutions" className="inline-flex items-center gap-2 text-sm font-semibold text-crimson hover:gap-3 transition-all">
                Explore industry solutions
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <div className="grid grid-cols-2 gap-3">
                {INDUSTRIES_SERVED.map((ind, i) => (
                  <motion.div key={ind.label} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                    <Link href={ind.href}
                      className="flex items-center gap-2.5 p-3.5 rounded-xl border border-void/8 dark:border-whisper/8 text-sm text-void/65 dark:text-whisper/65 hover:border-crimson/25 hover:text-crimson hover:bg-crimson/3 transition-all duration-150 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-crimson/40 group-hover:bg-crimson transition-colors flex-shrink-0" />
                      {ind.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Why Z3ymo */}
      <section className="py-20 px-6 bg-void/[0.015] dark:bg-whisper/[0.015]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="mb-12">
            <h2 className="font-display font-bold text-[clamp(1.8rem,3.5vw,2.6rem)] text-void dark:text-whisper">Why businesses choose Z3ymo</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WHY_REASONS.map((reason, i) => (
              <ScrollReveal key={reason.text} delay={i * 0.07}>
                <div className="flex items-start gap-4 p-5 rounded-2xl border border-void/8 dark:border-whisper/8">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-crimson/8">
                    <SvcIcon name={reason.icon} color="#C0392B" size={16} />
                  </div>
                  <p className="text-sm text-void/65 dark:text-whisper/65 leading-relaxed pt-1.5">{reason.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display font-bold text-[clamp(2rem,4.5vw,3.2rem)] text-void dark:text-whisper leading-[1.05] mb-4">
              Let's build the right system<br /><span className="text-crimson">for your business</span>
            </h2>
            <p className="text-void/50 dark:text-whisper/50 mb-10 leading-relaxed max-w-lg mx-auto">
              Tell us what you're trying to achieve — we'll guide you to the right service and approach.
            </p>
            <MagneticButton onClick={() => setDrawerOpen(true)} variant="primary" size="lg">
              <SvcIcon name="arrow" size={14} color="white" strokeWidth={2.2} />
              Book Free Consultation
            </MagneticButton>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
      <ContactDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </main>
  )
}
