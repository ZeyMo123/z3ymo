'use client'

import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import ScrollReveal from '@/components/ui/ScrollReveal'

const STATS = [
  { value: 20, suffix: '+', label: 'Projects delivered' },
  { value: 15, suffix: '+', label: 'Happy clients' },
  { value: 3,  suffix: '',  label: 'Countries served' },
  { value: 100, suffix: '%', label: 'Satisfaction rate' },
]

const TESTIMONIALS = [
  {
    quote: 'Z3ymo delivered a premium website in just two weeks. The quality rivals any international agency.',
    name: 'Amina K.',
    role: 'CEO, Nairobi Startup',
    initials: 'AK',
    accent: '#1B998B',
  },
  {
    quote: "The AI agent they built handles 80% of our customer queries automatically. It's been transformative.",
    name: 'David M.',
    role: 'Founder, RetailTZ',
    initials: 'DM',
    accent: '#C0392B',
  },
  {
    quote: 'Professional, fast, and genuinely world-class design. Our site looks better than our competitors in London.',
    name: 'Sarah O.',
    role: 'Director, Dar Agency',
    initials: 'SO',
    accent: '#C9A84C',
  },
]

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const start = performance.now()
    const frame = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(ease * target))
      if (progress < 1) requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
  }, [inView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function SocialProof() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Metrics strip */}
        <ScrollReveal className="mb-20">
          <div className="
            grid grid-cols-2 md:grid-cols-4 gap-6
            p-8 rounded-2xl
            bg-void/3 dark:bg-whisper/3
            border border-void/6 dark:border-whisper/6
          ">
            {STATS.map((s, i) => (
              <div key={i} className="text-center">
                <div className="font-display font-bold text-[clamp(2.5rem,5vw,3.5rem)] text-void dark:text-whisper leading-none mb-2">
                  <CountUp target={s.value} suffix={s.suffix} />
                </div>
                <div className="text-sm text-void/40 dark:text-whisper/40">{s.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Testimonials */}
        <ScrollReveal className="mb-8">
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-4">
            What clients say
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="
                h-full p-7 rounded-2xl
                bg-void/3 dark:bg-whisper/3
                border border-void/6 dark:border-whisper/6
                hover:border-void/12 dark:hover:border-whisper/12
                transition-colors duration-200
              ">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} width="13" height="13" viewBox="0 0 24 24"
                      fill="#C9A84C" stroke="none">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>

                <p className="text-sm text-void/65 dark:text-whisper/65 leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ background: t.accent }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-void dark:text-whisper">{t.name}</div>
                    <div className="text-xs text-void/40 dark:text-whisper/40">{t.role}</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
