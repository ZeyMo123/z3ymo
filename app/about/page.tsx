import type { Metadata } from 'next'
import FloatingNav from '@/components/layout/FloatingNav'
import Footer from '@/components/layout/Footer'
import ScrollReveal from '@/components/ui/ScrollReveal'
import MagneticButton from '@/components/ui/MagneticButton'

export const metadata: Metadata = {
  title: 'About — Our story, mission & vision',
  description:
    'Z3ymo was born in Tanzania with a simple belief: African businesses deserve world-class software. Meet our founder and learn about our mission.',
}

const VALUES = [
  {
    icon: '◈',
    color: '#C0392B',
    title: 'Consultation first',
    desc: 'We never build without understanding. A free conversation before any commitment — always.',
  },
  {
    icon: '◈',
    color: '#1B998B',
    title: 'Quality without compromise',
    desc: 'We build to global standards regardless of geography or budget. No cutting corners.',
  },
  {
    icon: '◈',
    color: '#C9A84C',
    title: 'Built for Africa',
    desc: 'We design for reality — low-bandwidth environments, WhatsApp-first users, mobile-first lives.',
  },
  {
    icon: '◈',
    color: '#C0392B',
    title: 'Honest pricing',
    desc: 'Fixed prices. No hidden fees. No scope creep. What we quote is what you pay.',
  },
  {
    icon: '◈',
    color: '#1B998B',
    title: 'Open knowledge',
    desc: 'We share what we know through our blog — because a rising tech tide lifts all boats in Africa.',
  },
  {
    icon: '◈',
    color: '#C9A84C',
    title: 'Long-term thinking',
    desc: 'We build software to last and relationships to grow. Not just to ship and disappear.',
  },
]

const MILESTONES = [
  { year: '2024', event: 'Z3ymo founded in Dar es Salaam, Tanzania' },
  { year: '2025 Q1', event: 'First clients and products live' },
  { year: '2025 Q2', event: 'Z3ymo Pulse (AI SaaS) beta launch' },
  { year: '2025 Q4', event: 'EBox and Salons Marketplace in development' },
  { year: '2026', event: 'Expansion across East Africa' },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <FloatingNav />

      {/* Founder hero */}
      <section className="pt-36 pb-24 px-6 relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 0% 50%, rgba(192,57,43,0.05) 0%, transparent 60%)',
          }}
        />

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <ScrollReveal>
              <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-4">
                About Z3ymo
              </p>
              <h1 className="font-display font-bold text-[clamp(2.5rem,6vw,4.5rem)] text-void dark:text-whisper leading-none mb-6">
                Born in
                <br />
                <span className="text-crimson">Tanzania.</span>
                <br />
                Built for
                <br />
                <span className="text-void/30 dark:text-whisper/30">the world.</span>
              </h1>
              <p className="text-lg text-void/55 dark:text-whisper/55 leading-relaxed mb-8 max-w-md">
                Z3ymo started with one belief: African businesses deserve software that competes globally —
                not just &ldquo;good enough for Africa.&rdquo;
              </p>
              <MagneticButton href="/contact" variant="primary" size="md">
                Work with us
              </MagneticButton>
            </ScrollReveal>
          </div>

          {/* Founder card */}
          <ScrollReveal direction="left" delay={0.15}>
            <div className="
              p-8 rounded-2xl
              border border-void/8 dark:border-whisper/8
              bg-void/2 dark:bg-whisper/2
              relative overflow-hidden
            ">
              <div className="absolute top-0 right-0 w-40 h-40 rounded-bl-full opacity-5"
                style={{ background: 'radial-gradient(circle, #C0392B, transparent)' }} />

              {/* Avatar placeholder */}
              <div className="w-20 h-20 rounded-full bg-crimson/15 flex items-center justify-center mb-6">
                <span className="font-display font-bold text-3xl text-crimson">Z</span>
              </div>

              <div className="mb-1">
                <span className="text-xs font-medium tracking-[0.14em] uppercase text-void/35 dark:text-whisper/35">
                  Founder & CEO
                </span>
              </div>
              <h2 className="font-display font-bold text-2xl text-void dark:text-whisper mb-3">
                Z3ymo Founder
              </h2>
              <p className="text-sm text-void/55 dark:text-whisper/55 leading-relaxed mb-5">
                A full-stack developer from Dar es Salaam with a vision to build Africa&apos;s most premium tech company —
                one product at a time. Passionate about AI, great design, and the transformative power of software.
              </p>

              <div className="flex gap-3">
                {['LinkedIn', 'X', 'GitHub'].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="
                      text-xs px-3 py-1.5 rounded-lg
                      border border-void/10 dark:border-whisper/10
                      text-void/40 dark:text-whisper/40
                      hover:border-crimson/40 hover:text-crimson
                      transition-colors duration-150
                    "
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-6 bg-void dark:bg-void relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(27,153,139,0.06) 0%, transparent 70%)',
          }}
        />
        <div className="max-w-3xl mx-auto text-center relative">
          <ScrollReveal>
            <span className="font-display font-bold text-[7rem] leading-none text-white/5 select-none block mb-2">
              &ldquo;
            </span>
            <p className="font-display font-semibold text-[clamp(1.5rem,3.5vw,2.5rem)] text-white leading-[1.2] tracking-tight mb-6 text-balance">
              We don&apos;t build software for Africa.
              We build software{' '}
              <span className="text-crimson">from Africa</span>
              {' '}— for the world.
            </p>
            <p className="text-white/40 text-base">Our mission</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="mb-14">
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-4">
              What we stand for
            </p>
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)] text-void dark:text-whisper">
              Our values
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.07}>
                <div className="p-7 rounded-2xl border border-void/8 dark:border-whisper/8 bg-void/2 dark:bg-whisper/2 h-full">
                  <span className="text-2xl mb-4 block" style={{ color: v.color }}>
                    {v.icon}
                  </span>
                  <h3 className="font-display font-semibold text-lg text-void dark:text-whisper mb-2">
                    {v.title}
                  </h3>
                  <p className="text-sm text-void/55 dark:text-whisper/55 leading-relaxed">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-6 bg-void/2 dark:bg-whisper/2">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal className="mb-14">
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-4">
              Our journey
            </p>
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)] text-void dark:text-whisper">
              Milestones
            </h2>
          </ScrollReveal>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-18 top-0 bottom-0 w-px bg-void/8 dark:bg-whisper/8" />

            <div className="space-y-0">
              {MILESTONES.map((m, i) => (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="flex gap-8 py-8 items-center">
                    <div className="w-18 text-right shrink-0">
                      <span className="text-xs font-semibold text-void/40 dark:text-whisper/40">
                        {m.year}
                      </span>
                    </div>
                    {/* Dot */}
                    <div className="relative shrink-0">
                      <div className="w-3 h-3 rounded-full border-2 border-crimson bg-whisper dark:bg-void" />
                    </div>
                    <p className="text-void/70 dark:text-whisper/70 text-sm leading-relaxed">
                      {m.event}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 text-center">
        <ScrollReveal className="max-w-xl mx-auto">
          <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)] text-void dark:text-whisper mb-4">
            Let&apos;s build together
          </h2>
          <p className="text-void/50 dark:text-whisper/50 mb-8">
            Whether you need a website, a mobile app, or an AI agent — start with a free conversation.
          </p>
          <MagneticButton href="/contact" variant="primary" size="lg">
            Book a free consultation
          </MagneticButton>
        </ScrollReveal>
      </section>

      <Footer />
    </main>
  )
}
