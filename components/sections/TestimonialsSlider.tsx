'use client'

import { useRef } from 'react'
import ScrollReveal from '@/components/ui/ScrollReveal'

const TESTIMONIALS = [
  {
    quote: "Z3ymo delivered a premium website in just two weeks. The quality rivals any international agency I've worked with.",
    name: 'Amina K.',
    role: 'CEO',
    company: 'Nairobi Startup',
    industry: 'Technology',
    initials: 'AK',
    accent: '#C0392B',
    stars: 5,
  },
  {
    quote: "The AI agent they built handles 80% of our customer queries automatically. It's been completely transformative for our team.",
    name: 'David M.',
    role: 'Founder',
    company: 'RetailTZ',
    industry: 'Retail',
    initials: 'DM',
    accent: '#1B998B',
    stars: 5,
  },
  {
    quote: "Professional, fast, and genuinely world-class design. Our site looks better than our London competitors.",
    name: 'Sarah O.',
    role: 'Director',
    company: 'Dar Creative Agency',
    industry: 'Creative Agency',
    initials: 'SO',
    accent: '#C9A84C',
    stars: 5,
  },
  {
    quote: "I was skeptical about AI agents but Z3ymo's consultation changed my mind. Now we save 40 hours a week.",
    name: 'James N.',
    role: 'Operations Manager',
    company: 'Logistics Co.',
    industry: 'Logistics',
    initials: 'JN',
    accent: '#C0392B',
    stars: 5,
  },
  {
    quote: "They understood our market immediately. The app works perfectly even on slow connections — that's rare.",
    name: 'Fatuma A.',
    role: 'Co-founder',
    company: 'HealthTech Kenya',
    industry: 'Healthcare',
    initials: 'FA',
    accent: '#1B998B',
    stars: 5,
  },
  {
    quote: "The free consultation alone saved us from making a $10,000 mistake. They advised us honestly even when it meant less work for them.",
    name: 'Michael T.',
    role: 'CTO',
    company: 'Logistics Platform',
    industry: 'Logistics',
    initials: 'MT',
    accent: '#C9A84C',
    stars: 5,
  },
  {
    quote: "Z3ymo built our PWA in Swahili and English seamlessly. Our customers in the village can use it without any issues.",
    name: 'Rehema J.',
    role: 'CEO',
    company: 'AgriTech Tanzania',
    industry: 'Agriculture',
    initials: 'RJ',
    accent: '#C0392B',
    stars: 5,
  },
  {
    quote: "Three months after launching with Z3ymo, we closed our first investor round. The site made us look fundable.",
    name: 'Abubakar S.',
    role: 'Founder',
    company: 'FinTech Startup',
    industry: 'Fintech',
    initials: 'AS',
    accent: '#1B998B',
    stars: 5,
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {[...Array(count)].map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#C9A84C" stroke="none">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}

function TestimonialCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div
      className="
        shrink-0 w-[320px] mx-3
        p-6 rounded-2xl
        bg-whisper dark:bg-void-800
        border border-void/8 dark:border-whisper/8
        hover:border-void/20 dark:hover:border-whisper/20
        transition-all duration-300
        hover:shadow-lg hover:shadow-void/5 dark:hover:shadow-void/20
        hover:-translate-y-1
        cursor-default select-none
      "
      style={{
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
      }}
    >
      <StarRating count={t.stars} />
      <p className="text-sm text-void/65 dark:text-whisper/65 leading-relaxed mb-5 italic">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
          style={{ background: t.accent }}
        >
          {t.initials}
        </div>
        <div>
          <div className="text-sm font-medium text-void dark:text-whisper">{t.name}</div>
          <div className="text-xs text-void/40 dark:text-whisper/40">
            {t.role}{(t as any).company ? `, ${(t as any).company}` : ''}
          </div>
          {(t as any).industry && (
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full mt-1 inline-block"
              style={{ background: `${t.accent}12`, color: t.accent }}>
              {(t as any).industry}
            </span>
          )}
        </div>
        <div className="ml-auto">
          <div className="w-4 h-4 rounded-full opacity-30" style={{ background: t.accent }} />
        </div>
      </div>
    </div>
  )
}

/* ─── Row with CSS infinite scroll ───────────── */
function MarqueeRow({
  items,
  reverse = false,
  speed = 35,
}: {
  items: typeof TESTIMONIALS
  reverse?: boolean
  speed?: number
}) {
  const doubled = [...items, ...items] // duplicate for seamless loop
  const duration = (items.length * speed)

  return (
    <div className="overflow-hidden">
      <div
        className="flex"
        style={{
          animation: `marquee-${reverse ? 'reverse' : 'forward'} ${duration}s linear infinite`,
        }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={i} t={t} />
        ))}
      </div>
    </div>
  )
}

export default function TestimonialsSlider() {
  // Split into two rows
  const row1 = TESTIMONIALS.slice(0, 4)
  const row2 = TESTIMONIALS.slice(4)

  return (
    <section className="py-24 overflow-hidden">
      {/* Keyframes */}
      <style>{`
        @keyframes marquee-forward {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes marquee-forward { from, to { transform: none; } }
          @keyframes marquee-reverse { from, to { transform: none; } }
        }
      `}</style>

      {/* Header */}
      <ScrollReveal className="max-w-6xl mx-auto px-6 mb-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-3">
              What clients say
            </p>
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)] text-void dark:text-whisper">
              Trusted across Africa
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {TESTIMONIALS.slice(0, 5).map((t, i) => (
                <div key={i}
                  className="w-8 h-8 rounded-full border-2 border-whisper dark:border-void-800 flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: t.accent, zIndex: 5 - i }}>
                  {t.initials[0]}
                </div>
              ))}
            </div>
            <span className="text-sm text-void/50 dark:text-whisper/50">
              8+ happy clients
            </span>
          </div>
        </div>
      </ScrollReveal>

      {/* Faded edges */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, var(--tw-gradient-from), transparent)' }}
          // In Tailwind v4, use inline style
        />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" />

        {/* Fade overlays via inline style */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, white, transparent)' }}
          id="fade-left"
        />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, white, transparent)' }}
          id="fade-right"
        />

        {/* Theme-aware fade overlays */}
        <style>{`
          #fade-left  { background: linear-gradient(to right, var(--color-bg-fade, #F0EEF8), transparent); }
          #fade-right { background: linear-gradient(to left,  var(--color-bg-fade, #F0EEF8), transparent); }
          .dark #fade-left  { background: linear-gradient(to right, #0A0A0F, transparent); }
          .dark #fade-right { background: linear-gradient(to left,  #0A0A0F, transparent); }
        `}</style>

        <div className="flex flex-col gap-5">
          {/* Row 1 — forward */}
          <div
            className="flex"
            style={{ animation: `marquee-forward ${row1.length * 38}s linear infinite` }}
          >
            {[...row1, ...row1].map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          </div>

          {/* Row 2 — reverse */}
          <div
            className="flex"
            style={{ animation: `marquee-reverse ${row2.length * 42}s linear infinite` }}
          >
            {[...row2, ...row2].map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
