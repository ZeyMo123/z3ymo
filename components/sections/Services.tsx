'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ui/ScrollReveal'
import ContactDrawer from '@/components/ui/ContactDrawer'

const SERVICES = [
  {
    num: '01',
    title: 'Web & Mobile Apps',
    description:
      'From PWAs to full native mobile apps — we build performant, beautiful digital products that work flawlessly on every device and every connection speed.',
    tags: ['Next.js', 'React Native', 'Flutter', 'TypeScript', 'Supabase'],
    accent: 'text-emerald',
    bar: '#1B998B',
    context: 'Web & Mobile App development',
  },
  {
    num: '02',
    title: 'AI Agent Development',
    description:
      'Custom AI agents that automate your real business problems — customer support, lead qualification, booking, reporting, and operations. WhatsApp-native or API-integrated.',
    tags: ['OpenAI', 'Claude API', 'Python', 'NestJS', 'WhatsApp API'],
    accent: 'text-crimson',
    bar: '#C0392B',
    context: 'Custom AI Agent development',
  },
  {
    num: '03',
    title: 'Custom Software',
    description:
      'End-to-end software development — SaaS platforms, internal tools, dashboards, marketplaces, and complex system integrations. We architect for scale from day one.',
    tags: ['NestJS', 'PostgreSQL', 'Docker', 'REST APIs', 'GraphQL'],
    accent: 'text-gold',
    bar: '#C9A84C',
    context: 'Custom Software development',
  },
  {
    num: '04',
    title: 'Tech Consultation',
    description:
      'Not sure what to build or which tech to choose? A free 30-minute consultation with our team can save you months of wrong turns and wasted budget.',
    tags: ['Architecture review', 'Tech stack advice', 'Project scoping', 'Free first session'],
    accent: 'text-emerald',
    bar: '#1B998B',
    context: 'Tech Consultation',
  },
]

export default function Services() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [context, setContext] = useState<string | null>(null)

  const openConsult = (ctx: string) => {
    setContext(ctx)
    setDrawerOpen(true)
  }

  return (
    <section
      id="services"
      className="relative py-28 px-6"
      style={{
        background:
          'radial-gradient(ellipse 70% 40% at 50% 50%, rgba(27,153,139,0.04) 0%, transparent 70%)',
      }}
    >
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <ScrollReveal className="mb-20">
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-4">
            Services
          </p>
          <h2 className="font-display font-bold text-[clamp(2rem,5vw,3.5rem)] text-void dark:text-whisper">
            Custom software built around your business
          </h2>
          <p className="text-void/50 dark:text-whisper/50 max-w-xl mt-4 text-base leading-relaxed">
            Beyond platforms, Z3ymo designs fully custom systems tailored to complex business needs.
          </p>
        </ScrollReveal>

        {/* Service rows — alternating */}
        <div className="flex flex-col gap-0">
          {SERVICES.map((s, i) => (
            <ScrollReveal key={s.num} delay={i * 0.07}>
              <div
                className={`
                  flex flex-col md:flex-row gap-8 py-12
                  border-b border-void/8 dark:border-whisper/8
                  ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}
                `}
              >
                {/* Left: number + accent bar */}
                <div className="flex items-start gap-4 md:w-16 shrink-0 pt-1">
                  <div className="flex flex-col items-center gap-3">
                    <span
                      className={`font-display font-bold text-5xl leading-none ${s.accent} opacity-20`}
                    >
                      {s.num}
                    </span>
                    <div
                      className="w-0.5 flex-1 min-h-10 rounded-full"
                      style={{ background: s.bar, opacity: 0.3 }}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className={`font-display font-semibold text-2xl mb-3 ${s.accent}`}>
                    {s.title}
                  </h3>
                  <p className="text-base text-void/60 dark:text-whisper/60 leading-relaxed mb-5 max-w-lg">
                    {s.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {s.tags.map((tag) => (
                      <span
                        key={tag}
                        className="
                          text-xs px-3 py-1 rounded-full font-medium
                          bg-void/5 dark:bg-whisper/5
                          text-void/50 dark:text-whisper/50
                          border border-void/8 dark:border-whisper/8
                        "
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => openConsult(s.context)}
                    className={`
                      inline-flex items-center gap-2 text-sm font-medium
                      ${s.accent} opacity-70 hover:opacity-100
                      transition-all duration-200 cursor-pointer
                      group
                    `}
                  >
                    Start with a free consult
                    <svg
                      width="14" height="14" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor"
                      strokeWidth="2" strokeLinecap="round"
                      className="group-hover:translate-x-1 transition-transform duration-200"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Trust statement */}
        <ScrollReveal delay={0.2} className="mt-16">
          <div className="
            rounded-2xl p-8
            bg-void/3 dark:bg-whisper/3
            border border-void/6 dark:border-whisper/6
            text-center
          ">
            <p className="font-display text-xl font-semibold text-void dark:text-whisper mb-2">
              &quot;We consult before we build.&quot;
            </p>
            <p className="text-sm text-void/50 dark:text-whisper/50 max-w-md mx-auto">
              So you never commit budget to something that doesn&apos;t fit your actual needs.
              Every engagement starts with a free conversation.
            </p>
          </div>
        </ScrollReveal>
      </div>

      <ContactDrawer
        open={drawerOpen}
        onClose={() => { setDrawerOpen(false); setContext(null) }}
        context={context ?? undefined}
      />
    </section>
  )
}
