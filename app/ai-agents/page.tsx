import type { Metadata } from 'next'
import Link from 'next/link'
import FloatingNav from '@/components/layout/FloatingNav'
import Footer from '@/components/layout/Footer'
import ScrollReveal from '@/components/ui/ScrollReveal'
import MagneticButton from '@/components/ui/MagneticButton'
import GlassCard from '@/components/ui/GlassCard'

export const metadata: Metadata = {
  title: 'AI Agents — Custom builds & Z3ymo Pulse',
  description:
    'Z3ymo builds custom AI agents for African businesses and offers Pulse — a WhatsApp-native AI SaaS. Automate customer support, bookings, and sales in English and Swahili.',
}

const USE_CASES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
    title: 'Customer support automation',
    desc: 'Handle FAQs, complaints, order tracking, and escalations — 24/7, no human needed.',
    industries: ['Retail', 'E-commerce', 'Hospitality'],
    accent: '#C0392B',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    title: 'Appointment & booking',
    desc: 'Clients book, reschedule, and get reminders automatically via WhatsApp.',
    industries: ['Salons', 'Clinics', 'Restaurants'],
    accent: '#1B998B',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: 'Lead qualification',
    desc: 'Qualify inbound leads, collect contact info, and follow up automatically on your behalf.',
    industries: ['Real estate', 'Finance', 'B2B services'],
    accent: '#C9A84C',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    title: 'Operations & reporting',
    desc: 'Internal agents that summarise reports, track KPIs, and surface insights on demand.',
    industries: ['SMBs', 'Startups', 'Enterprises'],
    accent: '#C0392B',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" />
        <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
      </svg>
    ),
    title: 'Multilingual support',
    desc: 'Agents that communicate natively in English, Swahili, and more — built for African markets.',
    industries: ['Any industry', 'Pan-African'],
    accent: '#1B998B',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: 'Website & app integration',
    desc: 'Embed AI chat agents into your existing website, mobile app, or CRM system.',
    industries: ['Any platform'],
    accent: '#C9A84C',
  },
]

const PROCESS_STEPS = [
  { num: '01', title: 'Free discovery call', desc: 'We learn your exact workflows, pain points, and what an agent needs to do.' },
  { num: '02', title: 'Agent design & scoping', desc: 'We design the conversation flows, integrations, and success metrics. You approve before we build.' },
  { num: '03', title: 'Build & test', desc: 'We build, train, and rigorously test the agent with real scenarios from your business.' },
  { num: '04', title: 'Soft launch & tuning', desc: 'We go live with a small audience, monitor performance, and fine-tune based on real interactions.' },
  { num: '05', title: 'Full launch & handover', desc: 'Full deployment with documentation, training, and ongoing support options.' },
]

export default function AIAgentsPage() {
  return (
    <main className="min-h-screen">
      <FloatingNav />

      {/* Hero */}
      <section className="relative pt-36 pb-24 px-6 overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(192,57,43,0.07) 0%, transparent 65%)' }} />
        {/* Grid */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{ backgroundImage: 'linear-gradient(rgba(192,57,43,1) 1px, transparent 1px), linear-gradient(90deg, rgba(192,57,43,1) 1px, transparent 1px)', backgroundSize: '72px 72px' }} />

        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <ScrollReveal>
              <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-5">
                AI agents
              </p>
              <h1 className="font-display font-bold text-[clamp(2.8rem,7vw,5.5rem)] text-void dark:text-whisper leading-[0.95] tracking-tight mb-6">
                Automate the work.
                <br />
                <span className="text-crimson">Keep the humans.</span>
              </h1>
              <p className="text-lg text-void/55 dark:text-whisper/55 leading-relaxed max-w-xl mb-10">
                We build custom AI agents that handle real business tasks — on WhatsApp, your website, or internal tools. And if you need something off-the-shelf, Pulse is ready.
              </p>

              <div className="flex flex-wrap gap-4">
                <MagneticButton href="/ai-agents/pulse" variant="primary" size="lg">
                  Explore Pulse
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </MagneticButton>
                <MagneticButton href="#custom" variant="secondary" size="lg">
                  Custom AI builds
                </MagneticButton>
              </div>
            </ScrollReveal>
          </div>

          {/* Feature chips */}
          <ScrollReveal delay={0.2} className="mt-14 flex flex-wrap gap-2">
            {['WhatsApp-native', 'English & Swahili', 'No-code deployment', 'OpenAI + Claude powered', 'GDPR compliant', 'Works offline'].map((tag) => (
              <span key={tag} className="text-xs px-3 py-1.5 rounded-full border border-void/10 dark:border-whisper/10 text-void/50 dark:text-whisper/50">
                {tag}
              </span>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Pulse CTA card */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="relative rounded-3xl overflow-hidden p-10 md:p-14"
              style={{ background: '#080810', border: '1px solid rgba(240,238,248,0.06)' }}>
              {/* BG glow */}
              <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 60% 70% at 0% 50%, rgba(192,57,43,0.12) 0%, transparent 60%)' }} />

              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div>
                  <span className="text-xs font-medium tracking-[0.16em] uppercase text-crimson/70 mb-3 block">
                    Our SaaS product
                  </span>
                  <h2 className="font-display font-bold text-[clamp(2rem,5vw,3.5rem)] text-white leading-[1.05] mb-4">
                    Z3ymo Pulse
                  </h2>
                  <p className="text-white/50 leading-relaxed mb-7 max-w-sm">
                    Ready to deploy in 24 hours. A WhatsApp AI agent for African SMBs — customer support, booking, and lead capture. Starting at $29/month.
                  </p>
                  <div className="flex gap-3">
                    <Link href="/ai-agents/pulse"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-crimson text-white hover:bg-crimson-400 transition-colors duration-150">
                      Learn more →
                    </Link>
                    <Link href="/ai-agents/pulse#waitlist"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium border border-white/15 text-white/60 hover:border-white/30 hover:text-white transition-all duration-150">
                      Join waitlist
                    </Link>
                  </div>
                </div>

                {/* Pulse pricing preview */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { name: 'Starter', price: '$29', highlight: false },
                    { name: 'Business', price: '$79', highlight: true },
                    { name: 'Enterprise', price: '$199', highlight: false },
                  ].map((t) => (
                    <div key={t.name} className={`p-4 rounded-2xl text-center border transition-all duration-150
                      ${t.highlight
                        ? 'bg-crimson/15 border-crimson/40'
                        : 'bg-white/3 border-white/8'
                      }`}>
                      <div className="text-xs text-white/40 mb-2">{t.name}</div>
                      <div className={`font-display font-bold text-2xl ${t.highlight ? 'text-crimson' : 'text-white/80'}`}>
                        {t.price}
                      </div>
                      <div className="text-[10px] text-white/25 mt-1">/month</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-20 px-6" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(27,153,139,0.04) 0%, transparent 70%)' }}>
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="mb-14">
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-4">Use cases</p>
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)] text-void dark:text-whisper">
              What our agents do
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {USE_CASES.map((uc, i) => (
              <ScrollReveal key={uc.title} delay={i * 0.06}>
                <GlassCard className="p-7 h-full group" tilt>
                  <div className="mb-5" style={{ color: uc.accent }}>{uc.icon}</div>
                  <h3 className="font-display font-semibold text-lg text-void dark:text-whisper mb-2">{uc.title}</h3>
                  <p className="text-sm text-void/55 dark:text-whisper/55 leading-relaxed mb-4">{uc.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {uc.industries.map((ind) => (
                      <span key={ind} className="text-[10px] px-2 py-0.5 rounded-md border border-void/8 dark:border-whisper/8 text-void/40 dark:text-whisper/40">
                        {ind}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Custom builds section */}
      <section id="custom" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="mb-16">
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-4">Custom AI builds</p>
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)] text-void dark:text-whisper mb-4">
              Need something bespoke?
            </h2>
            <p className="text-void/55 dark:text-whisper/55 max-w-xl leading-relaxed">
              Every business is different. We design and build custom agents trained on your data, integrated with your systems, and tuned to your exact workflows.
            </p>
          </ScrollReveal>

          {/* Process */}
          <div className="space-y-0">
            {PROCESS_STEPS.map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 0.07}>
                <div className="grid grid-cols-[56px_1fr] gap-8 py-10 border-b border-void/8 dark:border-whisper/8 last:border-0 items-start">
                  <span className="font-display font-bold text-4xl text-void/8 dark:text-whisper/8 text-right leading-none pt-1">
                    {step.num}
                  </span>
                  <div>
                    <h3 className="font-display font-semibold text-xl text-void dark:text-whisper mb-2">{step.title}</h3>
                    <p className="text-void/55 dark:text-whisper/55 leading-relaxed text-sm">{step.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.2} className="mt-12 text-center">
            <MagneticButton href="/#contact" variant="primary" size="lg">
              Start with a free discovery call
            </MagneticButton>
            <p className="text-xs text-void/30 dark:text-whisper/30 mt-4">
              Custom AI agents typically start at $2,000 — price depends on scope and integrations.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
