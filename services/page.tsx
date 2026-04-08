import type { Metadata } from 'next'
import FloatingNav from '@/components/layout/FloatingNav'
import Footer from '@/components/layout/Footer'
import Services from '@/components/sections/Services'
import ScrollReveal from '@/components/ui/ScrollReveal'

export const metadata: Metadata = {
  title: 'Services — Custom software, AI agents & consultation',
  description:
    'Z3ymo builds custom web apps, mobile apps, and AI agents for businesses. We consult before we build — so you always get the right solution.',
}

const PROCESS = [
  {
    num: '01',
    title: 'Free consultation',
    desc: 'We start with a 30-minute call — no agenda, no sales pitch. Just an honest conversation about what you need, what you have, and what would actually help.',
  },
  {
    num: '02',
    title: 'Proposal & scoping',
    desc: 'We send a clear proposal with scope, timeline, and fixed price. No surprises. You approve before we write a single line of code.',
  },
  {
    num: '03',
    title: 'Build & weekly updates',
    desc: 'We build in 2-week sprints with weekly demos. You see progress in real-time and can provide feedback at every stage.',
  },
  {
    num: '04',
    title: 'Launch & handover',
    desc: 'We deploy, train your team, and hand over full documentation and source code. The product is 100% yours.',
  },
  {
    num: '05',
    title: 'Ongoing support',
    desc: 'We offer monthly retainers for updates, bug fixes, and feature additions. Or you go fully independent — your choice.',
  },
]

const PRICING = [
  {
    name: 'Starter',
    desc: 'For small businesses and individuals',
    price: '$500–$2,000',
    unit: 'per project',
    accent: '#C9A84C',
    features: [
      'Company or portfolio website',
      'Mobile responsive',
      'Contact form + SEO basics',
      'Free consultation included',
      '2 revision rounds',
    ],
    cta: 'Start a project',
  },
  {
    name: 'Growth',
    desc: 'For startups and SMBs',
    price: '$2,000–$8,000',
    unit: 'per project',
    accent: '#C0392B',
    featured: true,
    features: [
      'Custom web or mobile app',
      'Backend + database',
      'Admin dashboard',
      'API integrations',
      'Free consultation + scoping',
      '3 revision rounds',
    ],
    cta: 'Book a consultation',
  },
  {
    name: 'Enterprise',
    desc: 'For complex systems and AI',
    price: 'Custom',
    unit: 'quote',
    accent: '#1B998B',
    features: [
      'Custom AI agent development',
      'Multi-platform (web + mobile)',
      'Complex integrations',
      'Ongoing retainer available',
      'Architecture review',
      'Team training',
    ],
    cta: 'Get a custom quote',
  },
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <FloatingNav />

      {/* Header */}
      <section className="pt-36 pb-16 px-6 relative">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(27,153,139,0.05) 0%, transparent 70%)',
          }}
        />
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-4">
            Services
          </p>
          <h1 className="font-display font-bold text-[clamp(2.5rem,6vw,5rem)] text-void dark:text-whisper leading-none mb-4">
            We consult
            <br />
            <span className="text-void/30 dark:text-whisper/30">before we build.</span>
          </h1>
          <p className="text-lg text-void/50 dark:text-whisper/50 max-w-xl">
            Every engagement starts with an honest conversation — so you invest in the right solution.
          </p>
        </div>
      </section>

      {/* Services overview */}
      <Services />

      {/* How we work */}
      <section className="py-24 px-6 bg-void/2 dark:bg-whisper/2">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="mb-14">
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-4">
              How we work
            </p>
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)] text-void dark:text-whisper">
              Our process
            </h2>
          </ScrollReveal>

          <div className="space-y-0">
            {PROCESS.map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 0.06}>
                <div className="flex gap-8 py-10 border-b border-void/8 dark:border-whisper/8 last:border-0">
                  <span className="font-display font-bold text-5xl text-void/8 dark:text-whisper/8 flex-shrink-0 w-16 text-right leading-none pt-1">
                    {step.num}
                  </span>
                  <div>
                    <h3 className="font-display font-semibold text-xl text-void dark:text-whisper mb-2">
                      {step.title}
                    </h3>
                    <p className="text-void/55 dark:text-whisper/55 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-4">
              Pricing
            </p>
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)] text-void dark:text-whisper mb-3">
              Transparent pricing
            </h2>
            <p className="text-void/50 dark:text-whisper/50 max-w-md mx-auto">
              Fixed prices. No surprise invoices. Every project starts with a free consultation.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING.map((tier, i) => (
              <ScrollReveal key={tier.name} delay={i * 0.08}>
                <div className={`
                  h-full p-8 rounded-2xl relative
                  border transition-all duration-200
                  ${tier.featured
                    ? 'border-crimson/40 bg-crimson/3'
                    : 'border-void/8 dark:border-whisper/8 bg-void/2 dark:bg-whisper/2'
                  }
                `}>
                  {tier.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="text-xs font-semibold px-4 py-1 rounded-full bg-crimson text-whisper">
                        Most popular
                      </span>
                    </div>
                  )}

                  <h3 className="font-display font-bold text-xl text-void dark:text-whisper mb-1">
                    {tier.name}
                  </h3>
                  <p className="text-sm text-void/40 dark:text-whisper/40 mb-6">{tier.desc}</p>

                  <div className="mb-6">
                    <span className="font-display font-bold text-3xl text-void dark:text-whisper">
                      {tier.price}
                    </span>
                    <span className="text-sm text-void/40 dark:text-whisper/40 ml-2">{tier.unit}</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-void/60 dark:text-whisper/60">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                          className="flex-shrink-0 mt-0.5"
                          style={{ color: tier.accent }}>
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button className={`
                    w-full py-3 rounded-xl text-sm font-medium
                    transition-all duration-150 cursor-pointer
                    ${tier.featured
                      ? 'bg-crimson text-whisper hover:bg-crimson-400'
                      : 'border border-void/12 dark:border-whisper/12 text-void/70 dark:text-whisper/70 hover:border-crimson/50 hover:text-crimson'
                    }
                  `}>
                    {tier.cta}
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.2} className="text-center mt-10">
            <p className="text-sm text-void/40 dark:text-whisper/40">
              All projects start with a free 30-minute consultation.{' '}
              <a href="#" className="text-crimson hover:underline">Book yours now →</a>
            </p>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
