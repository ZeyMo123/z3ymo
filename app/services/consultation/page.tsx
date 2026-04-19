import type { Metadata } from 'next'
import Link from 'next/link'
import FloatingNav from '@/components/layout/FloatingNav'
import Footer from '@/components/layout/Footer'
import ConsultationPackages from '@/components/consultation/ConsultationPackages'
import {
  GridOverlay,
  GlowOrb,
  BgImage,
  RevealImage,
  SectionFade,
  SystemArchBar,
} from '@/components/ui/VisualPrimitives'

export const metadata: Metadata = {
  title:       'Consultation — Z3ymo',
  description: 'Whether you\'re exploring an idea or preparing to build, Z3ymo offers structured consultation to help you make the right decisions before you commit time or money.',
}

// ─── Data ─────────────────────────────────────────────────────

const PAIN_POINTS = [
  'You\'re not sure what you actually need',
  'You\'re overwhelmed by tools, options, and advice',
  'You risk building the wrong thing entirely',
  'You\'ve already wasted time or money before',
]

const PROCESS_STEPS = [
  { num: '01', label: 'You choose your starting point' },
  { num: '02', label: 'We understand your business and goals' },
  { num: '03', label: 'We give you clear, honest direction' },
  { num: '04', label: 'You decide how to move forward' },
]

const WHY_PILLARS = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    title: 'You\'re solving the right problem',
    desc:  'Most projects fail because they solve the wrong thing — not because of bad execution.',
    accent: '#C0392B',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
      </svg>
    ),
    title: 'You\'re building the right solution',
    desc:  'Clarity about what to build before you build it saves months of rework and rethinking.',
    accent: '#1B998B',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
    title: 'You\'re not wasting time or resources',
    desc:  'A focused consultation saves far more than it costs — in time, money, and misdirection.',
    accent: '#C9A84C',
  },
]

// ─── Page ─────────────────────────────────────────────────────

export default function ConsultationHubPage() {
  return (
    // Light mode: clean whisper white. Dark mode: deep void black.
    <main className="min-h-screen bg-whisper dark:bg-[#0B0B0F]">
      <FloatingNav />

      {/* ════════════════════════════════════════════════════
          1. HERO — always dark (Cloudinary bg image + overlay)
             White text is correct here regardless of theme.
          ════════════════════════════════════════════════════ */}
      <BgImage
        publicId="/hero-background_eyp9ji"
        overlay={0.68}
        className="relative min-h-[92vh] flex items-center"
      >
        <GridOverlay opacity={0.04} />
        <GlowOrb color="#C0392B" x="20%" y="40%" size="55%" intensity={0.09} />
        <GlowOrb color="#1B998B" x="80%" y="60%" size="45%" intensity={0.07} />
        <GlowOrb color="#C9A84C" x="50%" y="90%" size="40%" intensity={0.05} />

        <div className="relative z-10 w-full pt-36 pb-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <SectionFade>
              <p className="text-xs font-medium tracking-[0.22em] uppercase text-white/40 mb-6">
                Consultation services
              </p>
              <h1 className="font-display font-bold text-[clamp(2.8rem,7vw,5.5rem)] text-white leading-[0.95] tracking-tight mb-6">
                Start with the right
                <br />
                <span className="text-crimson">level of guidance</span>
              </h1>
              <p className="text-base text-white/55 leading-relaxed max-w-xl mx-auto mb-6">
                Whether you're exploring an idea or preparing to build, Z3ymo offers structured consultation to help you make the right decisions — before you commit time or money.
              </p>

              {/* Explore → Clarify → Strategize */}
              <div className="flex items-center justify-center gap-3 mb-12 flex-wrap">
                {[
                  { label: 'Explore',    color: '#1B998B' },
                  { label: 'Clarify',    color: '#C9A84C' },
                  { label: 'Strategize', color: '#C0392B' },
                ].map((step, i) => (
                  <div key={step.label} className="flex items-center gap-3">
                    <span className="text-xs font-semibold px-3.5 py-1.5 rounded-full border"
                      style={{
                        borderColor: `${step.color}40`,
                        background:  `${step.color}12`,
                        color:       step.color,
                      }}>
                      {step.label}
                    </span>
                    {i < 2 && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        className="text-white/20">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                <a href="#consultation-packages"
                  className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-crimson text-white text-sm font-semibold hover:bg-crimson/90 hover:shadow-[0_0_32px_rgba(192,57,43,0.4)] transition-all shadow-lg shadow-crimson/25">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  View Consultation Options
                </a>
                <Link href="/services/consultation/bookfreeconsultation"
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-white/15 text-sm text-white/65 hover:border-white/30 hover:text-white/85 transition-all backdrop-blur-sm">
                  Book Free Consultation
                </Link>
              </div>
            </SectionFade>
          </div>
        </div>

        {/* Fade into page background — matches theme */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none
          bg-gradient-to-t from-whisper dark:from-[#0B0B0F] to-transparent" />
      </BgImage>

      {/* ════════════════════════════════════════════════════
          2. PROBLEM — "chaos to clarity" image + pain points
          ════════════════════════════════════════════════════ */}
      <section className="relative py-24 px-6 overflow-hidden
        bg-whisper dark:bg-[#0B0B0F]">
        {/* Glow only visible in dark mode — negligible on white bg */}
        <GlowOrb color="#C0392B" x="90%" y="50%" size="50%" intensity={0.05} />

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Copy */}
          <SectionFade>
            <p className="text-xs font-medium tracking-[0.2em] uppercase
              text-void/35 dark:text-white/35 mb-5">
              Why this matters
            </p>
            <h2 className="font-display font-bold text-[clamp(1.8rem,4vw,2.8rem)] leading-tight mb-5
              text-void dark:text-white">
              Most businesses make decisions without clarity
            </h2>
            <p className="text-sm italic leading-relaxed border-l-2 border-crimson/35 pl-4 mb-8
              text-void/55 dark:text-white/50">
              You don't just need technology. You need to know what actually matters before you build anything.
            </p>

            <div className="space-y-4">
              {PAIN_POINTS.map((point, i) => (
                <SectionFade key={i} delay={i * 0.07}>
                  <div className="flex items-start gap-3.5">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: 'rgba(192,57,43,0.12)' }}>
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none"
                        stroke="#C0392B" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </div>
                    <p className="text-sm leading-relaxed
                      text-void/60 dark:text-white/55">
                      {point}
                    </p>
                  </div>
                </SectionFade>
              ))}
            </div>
          </SectionFade>

          {/* Image */}
          <SectionFade delay={0.15}>
            <div className="relative rounded-2xl overflow-hidden ring-1
              ring-void/8 dark:ring-white/8">
              <RevealImage
                publicId="/chaos-to-clarity_efqgja"
                width={1536}
                height={1024}
                alt="From chaos to clarity"
                className="w-full"
              />
              {/* Bottom fade matches section bg */}
              <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none
                bg-gradient-to-t from-whisper dark:from-[#0B0B0F] to-transparent" />
            </div>
          </SectionFade>
        </div>
      </section>

      {/* System architecture bar — decorative strip */}
      <div className="py-4 px-6 overflow-hidden
        bg-whisper dark:bg-[#0B0B0F]
        border-y border-void/[0.06] dark:border-white/[0.04]">
        <SystemArchBar className="max-w-2xl mx-auto" />
      </div>

      {/* ════════════════════════════════════════════════════
          3. PACKAGES — light bg in light mode, no dark prop
          ════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden
        bg-void/[0.012] dark:bg-[#0B0B0F]">
        <GlowOrb color="#1B998B" x="10%" y="50%" size="55%" intensity={0.05} />
        <GlowOrb color="#C9A84C" x="85%" y="20%" size="40%" intensity={0.04} />
        {/* dark prop intentionally omitted — cards adapt per theme */}
        <ConsultationPackages
          showHeader
          showDecisionHelper
          className="relative z-10 py-20 px-6"
        />
      </section>

      {/* ════════════════════════════════════════════════════
          4. HOW IT WORKS — process steps + flow diagram
          ════════════════════════════════════════════════════ */}
      <section className="relative py-24 px-6 overflow-hidden
        bg-whisper dark:bg-[#0D0D11]">
        <GlowOrb color="#1B998B" x="50%" y="0%" size="60%" intensity={0.05} />

        <div className="max-w-5xl mx-auto">
          <SectionFade className="text-center mb-14">
            <p className="text-xs font-medium tracking-[0.2em] uppercase mb-4
              text-void/35 dark:text-white/35">
              The process
            </p>
            <h2 className="font-display font-bold text-[clamp(1.8rem,4vw,2.8rem)]
              text-void dark:text-white">
              A simple, structured process
            </h2>
          </SectionFade>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Steps */}
            <div className="relative">
              <div className="absolute left-5 top-6 bottom-6 w-px hidden sm:block
                bg-void/8 dark:bg-white/[0.07]" />
              <div className="space-y-5">
                {PROCESS_STEPS.map((step, i) => {
                  const isHighlighted = i === 0 || i === PROCESS_STEPS.length - 1
                  return (
                    <SectionFade key={step.num} delay={i * 0.08}>
                      <div className="flex items-center gap-5">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 border-2"
                          style={{
                            borderColor: isHighlighted ? '#C0392B' : 'rgba(192,57,43,0.22)',
                            background:  isHighlighted ? 'rgba(192,57,43,0.08)' : 'transparent',
                          }}
                        >
                          <span className="font-display font-bold text-[11px] text-crimson">
                            {step.num}
                          </span>
                        </div>
                        <div className={[
                          'flex-1 py-3 px-5 rounded-2xl text-sm font-medium border transition-all',
                          isHighlighted
                            ? 'border-void/10 dark:border-white/10 bg-crimson/4 dark:bg-crimson/5 text-void dark:text-white'
                            : 'border-transparent text-void/50 dark:text-white/50',
                        ].join(' ')}>
                          {step.label}
                        </div>
                      </div>
                    </SectionFade>
                  )
                })}
              </div>
            </div>

            {/* Flow diagram */}
            <SectionFade delay={0.2}>
              <div className="relative rounded-2xl overflow-hidden ring-1
                ring-void/8 dark:ring-white/8">
                <RevealImage
                  publicId="/consultation-flow-diagram_kpifa8"
                  width={1536}
                  height={1024}
                  alt="Consultation process flow"
                  delay={0.2}
                />
                <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none
                  bg-linear-to-t from-whisper dark:from-[#0D0D11] to-transparent" />
              </div>
            </SectionFade>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          5. WHY THIS APPROACH — decision intelligence visual
          ════════════════════════════════════════════════════ */}
      <section className="relative py-24 px-6 overflow-hidden
        bg-void/[0.012] dark:bg-[#0B0B0F]">
        <GlowOrb color="#C9A84C" x="90%" y="60%" size="50%" intensity={0.05} />
        <GlowOrb color="#C0392B" x="5%"  y="30%" size="40%" intensity={0.04} />

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

            {/* Image — sticky on desktop */}
            <SectionFade>
              <div className="relative rounded-2xl overflow-hidden sticky top-24 ring-1
                ring-void/8 dark:ring-white/8">
                <RevealImage
                  publicId="/decision-intelligence-visual_rywea7"
                  width={1536}
                  height={1024}
                  alt="Decision intelligence"
                />
                <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none
                  bg-linear-to-t from-void/[0.012] dark:from-[#0B0B0F] to-transparent" />
              </div>
            </SectionFade>

            {/* Why pillars */}
            <div>
              <SectionFade>
                <p className="text-xs font-medium tracking-[0.2em] uppercase mb-4
                  text-void/35 dark:text-white/35">
                  Our philosophy
                </p>
                <h2 className="font-display font-bold text-[clamp(1.8rem,4vw,2.8rem)] leading-tight mb-3
                  text-void dark:text-white">
                  Why we don't jump straight into development
                </h2>
                <p className="text-sm italic max-w-lg leading-relaxed mb-8
                  text-void/45 dark:text-white/45">
                  Most costly mistakes happen before anything is built. We use consultation to ensure:
                </p>
              </SectionFade>

              <div className="space-y-4">
                {WHY_PILLARS.map((p, i) => (
                  <SectionFade key={p.title} delay={i * 0.1}>
                    <div className="flex items-start gap-4 p-5 rounded-2xl border transition-all duration-300 group
                      border-void/8 dark:border-white/[0.07]
                      bg-transparent dark:bg-white/[0.02]
                      hover:border-void/14 dark:hover:border-white/12
                      hover:bg-void/[0.025] dark:hover:bg-white/[0.035]">
                      <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${p.accent}12`, color: p.accent }}>
                        {p.icon}
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-base mb-1.5
                          text-void dark:text-white">
                          {p.title}
                        </h3>
                        <p className="text-sm leading-relaxed
                          text-void/50 dark:text-white/45">
                          {p.desc}
                        </p>
                      </div>
                    </div>
                  </SectionFade>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          6. BRIDGE TO SERVICES
          ════════════════════════════════════════════════════ */}
      <section className="relative py-20 px-6 overflow-hidden
        bg-whisper dark:bg-[#0D0D11]">

        <div className="max-w-4xl mx-auto">
          <SectionFade>
            <div className="relative rounded-3xl border overflow-hidden p-8 sm:p-10
              border-void/8 dark:border-white/[0.08]
              bg-void/[0.02] dark:bg-white/[0.025]
              shadow-sm dark:shadow-[0_4px_40px_rgba(0,0,0,0.4)]">

              {/* Subtle inner glow — visible only in dark */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full pointer-events-none
                opacity-0 dark:opacity-20"
                style={{ background: 'radial-gradient(circle, #1B998B, transparent 70%)' }} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
                <div>
                  <p className="text-xs font-medium tracking-[0.2em] uppercase mb-4
                    text-void/35 dark:text-white/35">
                    When you're ready
                  </p>
                  <h2 className="font-display font-bold text-[clamp(1.5rem,3vw,2rem)] mb-3
                    text-void dark:text-white">
                    We build with you
                  </h2>
                  <p className="text-sm leading-relaxed
                    text-void/55 dark:text-white/50">
                    If you decide to move forward, Z3ymo designs and develops your system — based on the clarity we've already created together. The consultation becomes part of your investment, not an added cost.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  {[
                    { label: 'Explore our services',     href: '/services' },
                    { label: 'View industry solutions',  href: '/solutions' },
                    { label: 'See our platforms',        href: '/products' },
                  ].map(({ label, href }) => (
                    <Link key={href} href={href}
                      className="flex items-center justify-between p-4 rounded-2xl border transition-all group
                        border-void/8 dark:border-white/[0.07]
                        hover:border-void/16 dark:hover:border-white/14
                        hover:bg-void/[0.025] dark:hover:bg-white/[0.03]">
                      <span className="text-sm font-medium transition-colors
                        text-void/60 dark:text-white/55
                        group-hover:text-void dark:group-hover:text-white/80">
                        {label}
                      </span>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        className="transition-colors text-void/20 dark:text-white/20 group-hover:text-crimson">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </SectionFade>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          7. FINAL CTA
          ════════════════════════════════════════════════════ */}
      <section className="relative py-28 px-6 text-center overflow-hidden
        bg-whisper dark:bg-[#0B0B0F]">
        {/* Glow prominent in dark, barely visible in light */}
        <GlowOrb color="#C0392B" x="50%" y="50%" size="70%" intensity={0.07} />

        <div className="max-w-2xl mx-auto relative z-10">
          <SectionFade>
            <h2 className="font-display font-bold text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.02] mb-4
              text-void dark:text-white">
              Start with clarity
            </h2>
            <p className="mb-10 leading-relaxed max-w-md mx-auto
              text-void/50 dark:text-white/45">
              You don't need to figure everything out alone. Start with the right level of guidance and move forward with confidence.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href="#consultation-packages"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-crimson text-white text-sm font-semibold
                  hover:bg-crimson/90 hover:shadow-[0_0_40px_rgba(192,57,43,0.35)] transition-all shadow-lg shadow-crimson/20">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Choose Your Starting Point
              </a>
              <Link href="/services/consultation/bookfreeconsultation"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full border text-sm transition-all
                  border-void/15 dark:border-white/12
                  text-void/60 dark:text-white/55
                  hover:border-void/30 dark:hover:border-white/25
                  hover:text-void dark:hover:text-white/80">
                Book Free Consultation
              </Link>
            </div>
          </SectionFade>
        </div>
      </section>

      <Footer />
    </main>
  )
}
