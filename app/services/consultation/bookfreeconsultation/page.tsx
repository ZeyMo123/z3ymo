import type { Metadata } from 'next'
import FloatingNav from '@/components/layout/FloatingNav'
import Footer from '@/components/layout/Footer'
import ScrollReveal from '@/components/ui/ScrollReveal'
import ConsultationFunnel from '@/components/consultation/ConsultationFunnel'

export const metadata: Metadata = {
  title: 'Book a Consultation — Z3ymo',
  description:
    'Book a free consultation with Z3ymo. Tell us about your business and we\'ll recommend the best digital platform for your needs.',
}

/* ─── Static info sections ───────────────────────────────────── */

const WHAT_HAPPENS = [
  { icon: '🧠', text: 'Understand your business model and goals' },
  { icon: '⚙️', text: 'Identify your operational bottlenecks' },
  { icon: '🔍', text: 'Recommend the best platform for your needs' },
  { icon: '🤖', text: 'Show how AI can automate parts of your business' },
  { icon: '📋', text: 'Outline next steps — no obligation, no pressure' },
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
  'You are looking purely for the cheapest option available',
  'You are not ready to launch or invest in a digital system',
  'You need something done in under a week with no planning',
]

const PRICING_TIERS = [
  {
    name:    'Starter',
    range:   '$2K – $5K',
    desc:    'Basic platform setup, branding, and customization for businesses launching their first digital system.',
    accent:  '#C9A84C',
  },
  {
    name:    'Professional',
    range:   '$5K – $20K',
    desc:    'Full customization, third-party integrations, advanced features, and post-launch support.',
    accent:  '#1B998B',
    popular: true,
  },
  {
    name:    'Enterprise',
    range:   '$20K+',
    desc:    'Advanced systems, AI automation, multi-platform integrations, and a dedicated project manager.',
    accent:  '#C0392B',
  },
]

/* ─── Page ────────────────────────────────────────────────────── */

export default function ConsultationPage() {
  return (
    <main className="min-h-screen">
      <FloatingNav />

      {/* ── Hero ──────────────────────────────────────── */}
      <section className="relative pt-36 pb-16 px-6 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(192,57,43,0.07) 0%, transparent 65%)' }}
        />
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-crimson/25 bg-crimson/5">
              <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-pulse" />
              <span className="text-xs font-semibold text-crimson tracking-wide">Free consultation · No commitment</span>
            </div>
            <h1 className="font-display font-bold text-[clamp(2.8rem,6vw,5rem)] text-void dark:text-whisper leading-[0.95] tracking-tight mb-5">
              Build a powerful
              <br />
              <span className="text-crimson">digital platform</span>
              <br />
              for your business
            </h1>
            <p className="text-base text-void/55 dark:text-whisper/55 leading-relaxed max-w-lg mx-auto">
              Tell us about your business and we'll recommend the best system for you — then find a time that works.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Main layout: form + sidebar ────────────────── */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start">

            {/* ── Form (left / main) ── */}
            <ScrollReveal>
              <div className="bg-white dark:bg-void-900 rounded-3xl border border-void/8 dark:border-whisper/8 p-8 shadow-sm">
                <ConsultationFunnel />
              </div>
            </ScrollReveal>

            {/* ── Sidebar (right / sticky) ── */}
            <div className="space-y-5 lg:sticky lg:top-24">

              {/* What happens */}
              <ScrollReveal delay={0.05}>
                <div className="rounded-2xl border border-void/8 dark:border-whisper/8 p-6">
                  <h3 className="font-display font-semibold text-base text-void dark:text-whisper mb-4">
                    What happens during the consultation
                  </h3>
                  <div className="space-y-3">
                    {WHAT_HAPPENS.map((item) => (
                      <div key={item.text} className="flex items-start gap-3">
                        <span className="text-base shrink-0 leading-none mt-0.5">{item.icon}</span>
                        <span className="text-sm text-void/60 dark:text-whisper/60 leading-relaxed">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* For who */}
              <ScrollReveal delay={0.08}>
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
                        <div className="w-1 h-1 rounded-full bg-emerald shrink-0 mt-2" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Not for who */}
              <ScrollReveal delay={0.1}>
                <div className="rounded-2xl border border-void/8 dark:border-whisper/8 bg-void/2 dark:bg-whisper/2 p-6">
                  <h3 className="font-display font-semibold text-sm text-void/60 dark:text-whisper/60 mb-3 flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                      className="opacity-40">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    May not be suitable if
                  </h3>
                  <div className="space-y-2">
                    {NOT_FOR_WHO.map((item) => (
                      <div key={item} className="flex items-start gap-2.5 text-xs text-void/40 dark:text-whisper/40">
                        <div className="w-1 h-1 rounded-full bg-void/25 dark:bg-whisper/25 shrink-0 mt-1.5" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Duration badge */}
              <ScrollReveal delay={0.12}>
                <div className="rounded-2xl bg-void/3 dark:bg-whisper/3 border border-void/8 dark:border-whisper/8 p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-crimson/8 flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C0392B" strokeWidth="1.8" strokeLinecap="round">
                      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-display font-semibold text-sm text-void dark:text-whisper">45 minutes</div>
                    <div className="text-xs text-void/40 dark:text-whisper/40">Video or phone call · Free · No obligation</div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing tiers ─────────────────────────────── */}
      <section className="py-20 px-6 border-t border-void/8 dark:border-whisper/8">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-4">
              Investment
            </p>
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)] text-void dark:text-whisper mb-3">
              Platform investment guide
            </h2>
            <p className="text-void/50 dark:text-whisper/50 max-w-lg mx-auto text-sm leading-relaxed">
              Not selling software development — selling digital infrastructure for your business.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PRICING_TIERS.map((tier, i) => (
              <ScrollReveal key={tier.name} delay={i * 0.08}>
                <div className={[
                  'relative p-7 rounded-2xl border h-full',
                  tier.popular
                    ? 'border-emerald/30 bg-emerald/3'
                    : 'border-void/8 dark:border-whisper/8',
                ].join(' ')}>
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="text-[10px] font-bold px-3 py-1 rounded-full text-white"
                        style={{ background: tier.accent }}>
                        Most common
                      </span>
                    </div>
                  )}
                  <div className="mb-4">
                    <div className="text-xs font-semibold tracking-wider uppercase mb-1" style={{ color: tier.accent }}>
                      {tier.name}
                    </div>
                    <div className="font-display font-bold text-2xl text-void dark:text-whisper">
                      {tier.range}
                    </div>
                  </div>
                  <p className="text-sm text-void/55 dark:text-whisper/55 leading-relaxed">
                    {tier.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.2}>
            <p className="text-center text-xs text-void/30 dark:text-whisper/30 mt-6">
              Exact pricing is determined during the consultation based on your requirements. These are illustrative ranges.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
