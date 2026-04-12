import type { Metadata } from 'next'
import Link from 'next/link'
import FloatingNav from '@/components/layout/FloatingNav'
import Footer from '@/components/layout/Footer'
import ScrollReveal from '@/components/ui/ScrollReveal'
import MagneticButton from '@/components/ui/MagneticButton'

export const metadata: Metadata = {
  title: 'Investors — Z3ymo',
  description: 'Z3ymo is building Africa\'s premium AI-native software ecosystem — from Dar es Salaam to the world. Learn about our vision, traction, and investment opportunity.',
}

const METRICS = [
  { value: '20+', label: 'Projects delivered', sub: 'Across Tanzania & East Africa' },
  { value: '$0', label: 'External funding', sub: 'Profitable from month 1' },
  { value: '3', label: 'Products in pipeline', sub: 'Pulse, EBox, Salons' },
  { value: '560M+', label: 'Swahili speakers', sub: 'Total addressable market' },
]

const PRODUCTS = [
  {
    name: 'Z3ymo Pulse',
    status: 'Waitlist',
    statusColor: '#C0392B',
    category: 'SaaS',
    tam: 'African SMB communications',
    model: '$29–199/month per business',
    moat: 'English + Swahili AI · WhatsApp-native · First-mover in EAF',
    timeline: 'Q2 2025 launch',
    accent: '#C0392B',
  },
  {
    name: 'EBox',
    status: 'In development',
    statusColor: '#C9A84C',
    category: 'SaaS · Marketplace',
    tam: 'African business review & discovery',
    model: '$19–99/month per business + ads',
    moat: 'First localised review platform for Tanzania/EAF',
    timeline: 'Q4 2025',
    accent: '#1B998B',
  },
  {
    name: 'Salons Marketplace',
    status: 'In development',
    statusColor: '#C9A84C',
    category: 'Marketplace',
    tam: '$4.2B East African beauty market',
    model: '10–15% commission per booking',
    moat: 'Mobile-first, WhatsApp-integrated, offline-aware',
    timeline: 'Q1 2026',
    accent: '#C9A84C',
  },
  {
    name: 'Novel App',
    status: 'Planned',
    statusColor: '#888',
    category: 'Consumer · Subscription',
    tam: 'African digital content & publishing',
    model: '$5–15/month reader · Revenue share with writers',
    moat: 'African stories, African writers, offline reading',
    timeline: '2026',
    accent: '#C0392B',
  },
]

const ADVANTAGES = [
  {
    title: 'Founder-market fit',
    desc: 'Born and building in Tanzania. Deep knowledge of local infrastructure constraints, payment systems, WhatsApp-first behaviour, and cultural nuances that outsiders miss.',
    color: '#C0392B',
  },
  {
    title: 'Language moat',
    desc: 'Swahili AI capability is a genuine barrier to entry. 560M+ speakers across East and Central Africa — no major AI company has invested in this properly.',
    color: '#1B998B',
  },
  {
    title: 'Platform strategy',
    desc: 'Each product feeds the others. A Pulse customer becomes an EBox listing and a Salons booking. Network effects compound as the ecosystem grows.',
    color: '#C9A84C',
  },
  {
    title: 'Proven execution',
    desc: 'Building and shipping without external capital proves discipline. The company generates revenue before raising, giving investors a de-risked entry point.',
    color: '#C0392B',
  },
  {
    title: 'Services revenue',
    desc: 'The service arm (custom builds, AI agents, websites) generates recurring cash flow that funds product development — no runway anxiety.',
    color: '#1B998B',
  },
  {
    title: 'Global-first design',
    desc: 'Every product is built to global standards and priced for local reality. This creates both a local competitive moat and a path to expansion across Africa and diaspora.',
    color: '#C9A84C',
  },
]

const ROADMAP = [
  { period: 'Now', milestone: 'Services revenue + PWA company website live', done: true },
  { period: 'Q2 2025', milestone: 'Z3ymo Pulse beta — 50 paying customers', done: false },
  { period: 'Q3 2025', milestone: '$5K MRR from Pulse + services combined', done: false },
  { period: 'Q4 2025', milestone: 'EBox beta launch in Dar es Salaam', done: false },
  { period: 'Q1 2026', milestone: 'Salons Marketplace pilot — 100 salons onboarded', done: false },
  { period: 'Q2 2026', milestone: 'Seed round close — $500K target', done: false },
  { period: '2026+', milestone: 'Expand across East Africa · Novel App launch', done: false },
]

export default function InvestorsPage() {
  return (
    <main className="min-h-screen">
      <FloatingNav />

      {/* Hero */}
      <section className="relative pt-36 pb-24 px-6 overflow-hidden" style={{ background: '#06060C' }}>
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 30% 50%, rgba(192,57,43,0.1) 0%, transparent 60%)' }} />
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{ backgroundImage: 'linear-gradient(rgba(240,238,248,1) 1px, transparent 1px), linear-gradient(90deg, rgba(240,238,248,1) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />

        <div className="max-w-5xl mx-auto relative">
          <ScrollReveal>
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-crimson/70 mb-5">For investors</p>
            <h1 className="font-display font-bold text-[clamp(3rem,8vw,6.5rem)] text-white leading-[0.92] tracking-tight mb-8">
              Africa&apos;s next
              <br />
              <span className="text-crimson">tech platform</span>
              <br />
              <span className="text-white/20">starts here.</span>
            </h1>
            <p className="text-lg text-white/50 max-w-xl leading-relaxed mb-10">
              Z3ymo is building a multi-product software ecosystem for African businesses — from AI agents to marketplaces — starting in Tanzania and expanding across the continent.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/z3ymo-pitch-deck.pdf"
                target="_blank"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium bg-crimson text-white hover:bg-crimson-400 transition-colors shadow-[0_0_32px_rgba(192,57,43,0.25)]"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                Download pitch deck
              </a>
              <a href="mailto:investors@z3ymo.com"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium border border-white/15 text-white/60 hover:text-white hover:border-white/30 transition-all">
                investors@z3ymo.com
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {METRICS.map((m, i) => (
              <ScrollReveal key={i} delay={i * 0.07}>
                <div className="p-7 rounded-2xl border border-void/8 dark:border-whisper/8 bg-void/2 dark:bg-whisper/2 text-center">
                  <div className="font-display font-bold text-4xl text-void dark:text-whisper mb-1">{m.value}</div>
                  <div className="text-sm font-medium text-void/70 dark:text-whisper/70 mb-1">{m.label}</div>
                  <div className="text-xs text-void/35 dark:text-whisper/35">{m.sub}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* The opportunity */}
      <section className="py-20 px-6 border-t border-void/6 dark:border-whisper/6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="mb-14">
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-4">The opportunity</p>
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,3.5rem)] text-void dark:text-whisper max-w-2xl">
              560 million Swahili speakers. Zero dominant software platform.
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal delay={0.1}>
              <div className="space-y-5">
                <p className="text-void/65 dark:text-whisper/65 leading-relaxed">
                  East and Central Africa is home to over 560 million Swahili speakers across Tanzania, Kenya, Uganda, DRC, and the diaspora. The region has a rapidly growing middle class, high mobile penetration, and a business sector almost entirely underserved by quality software.
                </p>
                <p className="text-void/65 dark:text-whisper/65 leading-relaxed">
                  WhatsApp is not just a messaging app here — it is the operating system of commerce. Most SMBs run sales, support, and booking entirely through WhatsApp, with no automation or analytics.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="p-7 rounded-2xl bg-void/3 dark:bg-whisper/3 border border-void/6 dark:border-whisper/6 space-y-4">
                {[
                  { label: 'East Africa SMBs', value: '44M+', color: '#C0392B' },
                  { label: 'Mobile internet penetration', value: '43%', color: '#1B998B' },
                  { label: 'WhatsApp daily active users (EAF)', value: '200M+', color: '#C9A84C' },
                  { label: 'Projected digital economy (2030)', value: '$180B', color: '#C0392B' },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between py-3 border-b border-void/6 dark:border-whisper/6 last:border-0">
                    <span className="text-sm text-void/55 dark:text-whisper/55">{stat.label}</span>
                    <span className="font-display font-bold text-xl" style={{ color: stat.color }}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Product portfolio */}
      <section className="py-20 px-6 bg-void/2 dark:bg-whisper/2">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="mb-14">
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-4">Product portfolio</p>
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)] text-void dark:text-whisper">
              Four products. One ecosystem.
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PRODUCTS.map((p, i) => (
              <ScrollReveal key={p.name} delay={i * 0.07}>
                <div className="p-7 rounded-2xl border border-void/8 dark:border-whisper/8 bg-void/1 dark:bg-whisper/1 h-full relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${p.accent}, transparent)` }} />
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <h3 className="font-display font-bold text-xl text-void dark:text-whisper mb-0.5">{p.name}</h3>
                      <span className="text-xs text-void/40 dark:text-whisper/40">{p.category}</span>
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full shrink-0"
                      style={{ background: `${p.statusColor}15`, color: p.statusColor, border: `1px solid ${p.statusColor}30` }}>
                      {p.status}
                    </span>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex gap-3">
                      <span className="text-void/35 dark:text-whisper/35 w-20 shrink-0">Market</span>
                      <span className="text-void/65 dark:text-whisper/65">{p.tam}</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-void/35 dark:text-whisper/35 w-20 shrink-0">Model</span>
                      <span className="text-void/65 dark:text-whisper/65">{p.model}</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-void/35 dark:text-whisper/35 w-20 shrink-0">Moat</span>
                      <span className="text-void/65 dark:text-whisper/65">{p.moat}</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-void/35 dark:text-whisper/35 w-20 shrink-0">Timeline</span>
                      <span className="font-medium" style={{ color: p.accent }}>{p.timeline}</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Competitive advantages */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="mb-14">
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-4">Why Z3ymo wins</p>
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)] text-void dark:text-whisper">
              Our unfair advantages
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ADVANTAGES.map((a, i) => (
              <ScrollReveal key={a.title} delay={i * 0.06}>
                <div className="p-7 rounded-2xl border border-void/8 dark:border-whisper/8 bg-void/2 dark:bg-whisper/2 h-full">
                  <div className="w-8 h-0.5 mb-5 rounded-full" style={{ background: a.color }} />
                  <h3 className="font-display font-semibold text-lg text-void dark:text-whisper mb-3">{a.title}</h3>
                  <p className="text-sm text-void/55 dark:text-whisper/55 leading-relaxed">{a.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-20 px-6 bg-void/2 dark:bg-whisper/2">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal className="mb-14">
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-4">Roadmap</p>
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)] text-void dark:text-whisper">
              Path to seed round
            </h2>
          </ScrollReveal>
          <div className="relative">
            <div className="absolute left-22 top-0 bottom-0 w-px bg-void/8 dark:bg-whisper/8" />
            {ROADMAP.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="flex items-center gap-8 py-7 border-b border-void/5 dark:border-whisper/5 last:border-0">
                  <div className="w-22 text-right shrink-0">
                    <span className={`text-xs font-semibold ${item.done ? 'text-emerald' : 'text-void/35 dark:text-whisper/35'}`}>
                      {item.period}
                    </span>
                  </div>
                  <div className="relative shrink-0">
                    <div className={`w-3 h-3 rounded-full border-2 ${item.done
                      ? 'bg-emerald border-emerald'
                      : 'bg-whisper dark:bg-void border-void/20 dark:border-whisper/20'}`} />
                  </div>
                  <p className={`text-sm leading-relaxed ${item.done ? 'text-void/70 dark:text-whisper/70' : 'text-void/50 dark:text-whisper/50'}`}>
                    {item.milestone}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ background: '#06060C' }}>
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(192,57,43,0.08) 0%, transparent 65%)' }} />
        <div className="max-w-2xl mx-auto text-center relative">
          <ScrollReveal>
            <h2 className="font-display font-bold text-[clamp(2rem,5vw,4rem)] text-white leading-[1.05] mb-5">
              Let&apos;s talk about
              <br />
              <span className="text-crimson">the opportunity.</span>
            </h2>
            <p className="text-white/45 mb-10 leading-relaxed">
              We&apos;re raising a pre-seed / seed round to accelerate Pulse&apos;s go-to-market and fund EBox development. We&apos;d love to talk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/z3ymo-pitch-deck.pdf"
                target="_blank"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium bg-crimson text-white hover:bg-crimson-400 transition-colors shadow-[0_0_24px_rgba(192,57,43,0.3)]"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                Download pitch deck
              </a>
              <a href="mailto:investors@z3ymo.com"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-sm font-medium border border-white/15 text-white/60 hover:text-white hover:border-white/30 transition-all">
                investors@z3ymo.com
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
