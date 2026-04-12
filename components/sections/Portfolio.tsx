'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'
import GlassCard from '@/components/ui/GlassCard'
import Link from 'next/link'

const PROJECTS = [
  {
    id: 'salon-booking',
    title: 'Serenity Salon',
    category: 'Web App',
    client: 'Dar es Salaam salon chain',
    problem: 'Managing bookings over WhatsApp manually — double-bookings and lost appointments were common.',
    solution: 'Centralized booking platform with real-time availability and automated WhatsApp reminders.',
    outcome: '3× more bookings, 60% fewer no-shows',
    stack: ['Next.js', 'Supabase', 'Twilio'],
    accent: '#1B998B',
    label: 'Sample project',
  },
  {
    id: 'agency-site',
    title: 'Vanguard Creative',
    category: 'Agency Website',
    client: 'Creative agency, Nairobi',
    problem: '78% bounce rate and only 1–2 enquiries per month despite strong social media traffic.',
    solution: 'Redesigned site with clear value proposition, animated portfolio, and a 3-step lead qualification flow.',
    outcome: '5× enquiry rate, 42% lower bounce rate',
    stack: ['Next.js', 'Framer Motion', 'TypeScript'],
    accent: '#C0392B',
    label: 'Sample project',
  },
  {
    id: 'ai-customer',
    title: 'RetailBot TZ',
    category: 'AI Agent',
    client: 'Mid-size Dar es Salaam retailer',
    problem: 'A team of 3 spending 6+ hours daily answering the same WhatsApp product and order questions.',
    solution: 'Custom AI agent trained on the product catalogue — handles 85% of queries autonomously.',
    outcome: '300 queries automated daily, 40 hrs/week saved',
    stack: ['Python', 'OpenAI', 'WhatsApp API'],
    accent: '#C9A84C',
    label: 'Sample project',
  },
]

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative py-28 px-6 section-gradient-emerald">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <ScrollReveal>
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-4">
              Case Studies
            </p>
            <h2 className="font-display font-bold text-[clamp(2rem,5vw,3.5rem)] text-void dark:text-whisper">
              Real products. Real outcomes.
            </h2>
            <p className="text-void/50 dark:text-whisper/50 max-w-md mt-3 text-sm leading-relaxed">
              A selection of platforms and systems built by Z3ymo.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <Link
              href="/portfolio"
              className="
                inline-flex items-center gap-2 text-sm
                text-void/40 dark:text-whisper/40
                hover:text-emerald dark:hover:text-emerald
                transition-colors duration-200
              "
            >
              View all case studies
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </ScrollReveal>
        </div>

        {/* Project cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 0.1}>
              <GlassCard tilt className="group h-full overflow-hidden card-depth card-shimmer card-interactive">
                {/* Mock browser bar */}
                <div className="bg-void/5 dark:bg-whisper/5 px-4 py-2.5 flex items-center gap-2 border-b border-void/6 dark:border-whisper/6">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-crimson/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-gold/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald/40" />
                  </div>
                  <div className="flex-1 bg-void/5 dark:bg-whisper/5 rounded-md px-3 py-1">
                    <span className="text-[10px] text-void/30 dark:text-whisper/30 font-mono">
                      z3ymo.com/work/{project.id}
                    </span>
                  </div>
                </div>

                {/* Preview area */}
                <div
                  className="h-36 flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${project.accent}10 0%, transparent 60%)`,
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-5"
                    style={{
                      backgroundImage: `linear-gradient(${project.accent} 1px, transparent 1px), linear-gradient(90deg, ${project.accent} 1px, transparent 1px)`,
                      backgroundSize: '24px 24px',
                    }}
                  />
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center border"
                    style={{
                      background: `${project.accent}15`,
                      borderColor: `${project.accent}30`,
                    }}
                  >
                    <span className="font-display font-bold text-2xl" style={{ color: project.accent }}>
                      {project.title.charAt(0)}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  {/* Meta */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-[10px] font-medium px-2.5 py-1 rounded-full"
                      style={{ background: `${project.accent}15`, color: project.accent }}
                    >
                      {project.category}
                    </span>
                    <span className="text-[10px] text-void/30 dark:text-whisper/30">
                      {project.label}
                    </span>
                  </div>

                  <h3 className="font-display font-semibold text-lg text-void dark:text-whisper mb-3">
                    {project.title}
                  </h3>

                  {/* Client / Problem / Solution */}
                  <div className="space-y-2 mb-4">
                    {[
                      { key: 'Client',   val: (project as any).client },
                      { key: 'Problem',  val: (project as any).problem },
                      { key: 'Solution', val: (project as any).solution },
                    ].map((row) => (
                      <div key={row.key} className="flex gap-2 text-xs">
                        <span className="text-void/30 dark:text-whisper/30 w-14 shrink-0 font-medium pt-0.5">
                          {row.key}
                        </span>
                        <span className="text-void/60 dark:text-whisper/60 leading-relaxed">{row.val}</span>
                      </div>
                    ))}
                  </div>

                  {/* Outcome */}
                  <div
                    className="flex items-center gap-2 text-sm font-semibold mb-4"
                    style={{ color: project.accent }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                      <polyline points="16 7 22 7 22 13" />
                    </svg>
                    {project.outcome}
                  </div>

                  {/* Stack */}
                  <div className="flex gap-1.5 flex-wrap">
                    {project.stack.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-void/5 dark:bg-whisper/5 text-void/40 dark:text-whisper/40 border border-void/6 dark:border-whisper/6"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
