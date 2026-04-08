import type { Metadata } from 'next'
import Link from 'next/link'
import FloatingNav from '@/components/layout/FloatingNav'
import Footer from '@/components/layout/Footer'
import ScrollReveal from '@/components/ui/ScrollReveal'
import GlassCard from '@/components/ui/GlassCard'
import { SvcIcon } from '@/components/services/ServiceSections'

export const metadata: Metadata = {
  title: 'Free Consultation — Z3ymo',
  description: 'Book a free consultation with Z3ymo. We start by understanding your business before recommending any solution.',
}

const WHAT_HAPPENS = [
  { icon: 'users' as const,     text: 'Understand your business model and goals' },
  { icon: 'target' as const,    text: 'Identify operational bottlenecks and pain points' },
  { icon: 'lightbulb' as const, text: 'Recommend the best platform or service for your needs' },
  { icon: 'brain' as const,     text: 'Show how AI can automate parts of your business' },
  { icon: 'map' as const,       text: 'Outline clear next steps — no obligation, no pressure' },
]

const FOR_WHO = [
  'You want a serious digital platform — not just a website',
  'You plan to scale your operations online',
  'You want automation integrated into your business',
  'You are ready to invest in long-term software infrastructure',
  'You want a strategic technology partner, not a freelancer',
]

const NOT_FOR_WHO = [
  'You only need a basic informational website',
  'You are looking purely for the cheapest option',
  'You are not ready to launch or invest in a digital system',
]

const ACCENT = '#C0392B'

export default function ConsultationLandingPage() {
  return (
    <main className="min-h-screen">
      <FloatingNav />

      {/* Back button */}
      <div className="pt-28 px-6 max-w-6xl mx-auto">
        <Link href="/services"
          className="inline-flex items-center gap-2 text-sm text-void/50 dark:text-whisper/50 hover:text-void dark:hover:text-whisper transition-colors mb-8">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          All services
        </Link>
      </div>

      {/* Hero */}
      <section className="relative pb-16 px-6 overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${ACCENT}07 0%, transparent 65%)` }} />
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-crimson/25 bg-crimson/5">
              <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-pulse" />
              <span className="text-xs font-semibold text-crimson tracking-wide">Free · No commitment</span>
            </div>
            <h1 className="font-display font-bold text-[clamp(2.6rem,6vw,4.5rem)] text-void dark:text-whisper leading-[1.0] tracking-tight mb-5">
              Build a powerful<br /><span className="text-crimson">digital platform</span><br />for your business
            </h1>
            <p className="text-base text-void/55 dark:text-whisper/55 leading-relaxed max-w-lg mx-auto mb-8">
              Tell us about your business and we'll recommend the best system for you — then find a time that works.
            </p>
            <Link href="/services/consultation/bookfreeconsultation"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-sm text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: ACCENT, boxShadow: `0 0 40px ${ACCENT}30` }}>
              <SvcIcon name="arrow" size={14} color="white" strokeWidth={2.2} />
              Book Your Free Consultation
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Main layout */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start">

          {/* Left: What happens */}
          <ScrollReveal>
            <GlassCard className="p-8">
              <h2 className="font-display font-bold text-xl text-void dark:text-whisper mb-6">
                What happens during the consultation
              </h2>
              <div className="space-y-4 mb-8">
                {WHAT_HAPPENS.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${ACCENT}10` }}>
                      <SvcIcon name={item.icon} color={ACCENT} size={16} />
                    </div>
                    <p className="text-sm text-void/65 dark:text-whisper/65 leading-relaxed pt-1.5">{item.text}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-void/8 dark:border-whisper/8 pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-crimson/8">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C0392B" strokeWidth="1.8" strokeLinecap="round">
                      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-display font-semibold text-sm text-void dark:text-whisper">45 minutes</div>
                    <div className="text-xs text-void/40 dark:text-whisper/40">Video or phone call</div>
                  </div>
                </div>
                <Link href="/services/consultation/bookfreeconsultation"
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl font-semibold text-sm text-white transition-all hover:opacity-90 cursor-pointer"
                  style={{ background: ACCENT }}>
                  <SvcIcon name="arrow" size={14} color="white" strokeWidth={2.2} />
                  Choose a time slot
                </Link>
              </div>
            </GlassCard>
          </ScrollReveal>

          {/* Right sidebar */}
          <div className="space-y-5 lg:sticky lg:top-24">
            {/* For who */}
            <ScrollReveal delay={0.05}>
              <div className="rounded-2xl border border-emerald/20 bg-emerald/3 p-6">
                <h3 className="font-display font-semibold text-sm text-void dark:text-whisper mb-3 flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1B998B" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  This consultation is for businesses that
                </h3>
                <div className="space-y-2">
                  {FOR_WHO.map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-sm text-void/60 dark:text-whisper/60">
                      <div className="w-1 h-1 rounded-full bg-emerald flex-shrink-0 mt-2" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Not for who */}
            <ScrollReveal delay={0.08}>
              <div className="rounded-2xl border border-void/8 dark:border-whisper/8 bg-void/2 dark:bg-whisper/2 p-6">
                <h3 className="font-display font-semibold text-sm text-void/50 dark:text-whisper/50 mb-3 flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="opacity-40">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  May not be suitable if
                </h3>
                <div className="space-y-2">
                  {NOT_FOR_WHO.map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-xs text-void/40 dark:text-whisper/40">
                      <div className="w-1 h-1 rounded-full bg-void/20 dark:bg-whisper/20 flex-shrink-0 mt-1.5" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* CTA card */}
            <ScrollReveal delay={0.1}>
              <div className="rounded-2xl p-6 text-center" style={{ background: `${ACCENT}06`, border: `1px solid ${ACCENT}20` }}>
                <p className="text-sm text-void/60 dark:text-whisper/60 mb-4 leading-relaxed">
                  Ready to tell us about your business?
                </p>
                <Link href="/services/consultation/bookfreeconsultation"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ background: ACCENT }}>
                  <SvcIcon name="arrow" size={13} color="white" strokeWidth={2.2} />
                  Start the process
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
