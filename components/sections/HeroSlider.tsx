'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState as useContactState } from 'react'
import ContactDrawer from '@/components/ui/ContactDrawer'
import Slide1Visual from './hero/Slide1Visual'
import Slide2Visual from './hero/Slide2Visual'
import Slide3Visual from './hero/Slide3Visual'

/* ─── Slide data ──────────────────────────────── */
interface SlideData {
  id: string
  tag: string
  tagColor: string
  headline: string[]       // Array of words/phrases — each animates individually
  headlineAccent: number[] // Indices of highlighted words
  sub: string
  ctaPrimary: string
  ctaSecondary?: string
  ctaSecondaryHref?: string
  accentColor: string
}

const SLIDES: SlideData[] = [
  {
    id: 'company',
    tag: 'AI-powered software company',
    tagColor: '#C0392B',
    headline: ['AI-powered', 'software', 'for real businesses'],
    headlineAccent: [0],
    sub: 'We design and build intelligent web apps, mobile platforms, and automation systems that help companies operate smarter and grow faster.',
    ctaPrimary: 'Book Free Consultation',
    ctaSecondary: 'Explore our services',
    ctaSecondaryHref: '/services',
    accentColor: '#C0392B',
  },
  {
    id: 'apps',
    tag: 'Ready-built software platforms',
    tagColor: '#1B998B',
    headline: ['Launch faster', 'with our', 'ready-built platforms'],
    headlineAccent: [0, 2],
    sub: 'Z3ymo develops powerful platforms that can be customized for your business — from marketplaces to booking systems and digital product platforms.',
    ctaPrimary: 'Start Your Project',
    ctaSecondary: 'Explore Products',
    ctaSecondaryHref: '/products',
    accentColor: '#1B998B',
  },
  {
    id: 'pulse',
    tag: 'Custom AI agents',
    tagColor: '#C9A84C',
    headline: ['Automate work', 'with custom', 'AI agents'],
    headlineAccent: [2],
    sub: 'We design intelligent agents that automate repetitive business workflows — lead qualification, customer support, research, analytics, and more.',
    ctaPrimary: 'Join Pulse Waitlist',
    ctaSecondary: 'Explore AI Agents',
    ctaSecondaryHref: '/ai-agents',
    accentColor: '#C9A84C',
  },
]

const AUTO_ADVANCE_MS = 7000

/* ─── Transition directions ───────────────────── */
const CLIP_EXITS = [
  // Slide 0→1: slash from top-right to bottom-left
  'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
  'polygon(0 0, 0% 0, 0% 100%, 0 100%)',
  // Slide 1→2
  'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
  'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
]

/* ─── Word animator ───────────────────────────── */
function AnimatedHeadline({
  words,
  accentIndices,
  accentColor,
  isEntering,
}: {
  words: string[]
  accentIndices: number[]
  accentColor: string
  isEntering: boolean
}) {
  return (
    <h1 className="font-display font-bold text-[clamp(2.8rem,7vw,5.5rem)] leading-[1.0] tracking-[-0.04em] mb-6">
      {words.map((word, i) => {
        const isAccent = accentIndices.includes(i)
        return (
          <motion.span
            key={`${word}-${i}`}
            initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
            animate={isEntering
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: -30, filter: 'blur(6px)' }
            }
            transition={{
              duration: 0.55,
              delay: isEntering ? i * 0.1 : i * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block mr-[0.22em]"
            style={isAccent ? {
              background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            } : { color: 'currentColor' }}
          >
            {word}
          </motion.span>
        )
      })}
    </h1>
  )
}

/* ─── Slide content (left side) ──────────────── */
function SlideContent({
  slide,
  isEntering,
  onCTAClick,
}: {
  slide: SlideData
  isEntering: boolean
  onCTAClick: () => void
}) {
  return (
    <div className="flex flex-col justify-center h-full">
      {/* Tag */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isEntering ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
        transition={{ duration: 0.4, delay: isEntering ? 0.05 : 0 }}
        className="flex items-center gap-2 mb-5"
      >
        <span className="w-6 h-px" style={{ background: slide.tagColor }} />
        <span className="text-xs font-medium tracking-[0.15em] uppercase"
          style={{ color: slide.tagColor }}>
          {slide.tag}
        </span>
      </motion.div>

      {/* Headline */}
      <AnimatedHeadline
        words={slide.headline}
        accentIndices={slide.headlineAccent}
        accentColor={slide.accentColor}
        isEntering={isEntering}
      />

      {/* Sub */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={isEntering ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.5, delay: isEntering ? 0.35 : 0.05 }}
        className="text-base text-void/55 dark:text-whisper/55 leading-relaxed mb-8 max-w-md"
      >
        {slide.sub}
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={isEntering ? { opacity: 1, y: 0 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: isEntering ? 0.45 : 0 }}
        className="flex flex-wrap gap-3"
      >
        <button
          onClick={onCTAClick}
          className="
            px-7 py-3.5 rounded-full text-sm font-medium text-white
            transition-all duration-200 cursor-pointer
            hover:scale-[1.03] active:scale-[0.97]
          "
          style={{
            background: slide.accentColor,
            boxShadow: `0 0 28px ${slide.accentColor}45`,
          }}
        >
          {slide.ctaPrimary}
        </button>
        {slide.ctaSecondary && (
          <a
            href={slide.ctaSecondaryHref}
            className="
              inline-flex items-center gap-2
              px-7 py-3.5 rounded-full text-sm font-medium
              border border-void/15 dark:border-whisper/15
              text-void/70 dark:text-whisper/70
              hover:border-void/35 dark:hover:border-whisper/35
              transition-all duration-200
            "
          >
            {slide.ctaSecondary}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        )}
      </motion.div>
    </div>
  )
}

/* ─── Navigation dots ─────────────────────────── */
function SlideDots({
  total,
  active,
  onChange,
  accentColor,
}: {
  total: number
  active: number
  onChange: (i: number) => void
  accentColor: string
}) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          className="transition-all duration-300 rounded-full cursor-pointer focus:outline-none"
          style={{
            width: i === active ? 24 : 8,
            height: 8,
            background: i === active ? accentColor : `${accentColor}30`,
          }}
          aria-label={`Go to slide ${i + 1}`}
        />
      ))}
    </div>
  )
}

/* ─── Progress bar ────────────────────────────── */
function ProgressBar({ progress, color }: { progress: number; color: string }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-void/8 dark:bg-whisper/8">
      <motion.div
        className="h-full"
        style={{ background: color, width: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />
    </div>
  )
}

/* ─── Transition overlay ──────────────────────── */
const TRANSITION_CLIPS = [
  { enter: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)', exit: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' },
  { enter: 'polygon(0 0, 0 0, 0 100%, 0 100%)', exit: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' },
  { enter: 'polygon(50% 0, 50% 0, 50% 100%, 50% 100%)', exit: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' },
]

/* ─── Main HeroSlider ─────────────────────────── */
export default function HeroSlider() {
  const [current, setCurrent]   = useState(0)
  const [entering, setEntering] = useState(true)
  const [progress, setProgress] = useState(0)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const progressRef = useRef<NodeJS.Timeout | null>(null)
  const advanceRef  = useRef<NodeJS.Timeout | null>(null)
  const startTime   = useRef(Date.now())
  const frameRef    = useRef<number>(0)

  const goTo = useCallback((index: number) => {
    if (isTransitioning || index === current) return
    setIsTransitioning(true)
    setEntering(false)

    // Brief pause for exit animation, then switch
    setTimeout(() => {
      setCurrent(index)
      setEntering(true)
      setProgress(0)
      startTime.current = Date.now()
      setIsTransitioning(false)
    }, 350)
  }, [isTransitioning, current])

  const advance = useCallback(() => {
    goTo((current + 1) % SLIDES.length)
  }, [current, goTo])

  // Progress animation
  useEffect(() => {
    startTime.current = Date.now()

    const tick = () => {
      const elapsed = Date.now() - startTime.current
      const pct = Math.min((elapsed / AUTO_ADVANCE_MS) * 100, 100)
      setProgress(pct)
      if (pct < 100) {
        frameRef.current = requestAnimationFrame(tick)
      }
    }
    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [current])

  // Auto-advance
  useEffect(() => {
    advanceRef.current = setTimeout(advance, AUTO_ADVANCE_MS)
    return () => { if (advanceRef.current) clearTimeout(advanceRef.current) }
  }, [current, advance])

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goTo((current + 1) % SLIDES.length)
      if (e.key === 'ArrowLeft')  goTo((current - 1 + SLIDES.length) % SLIDES.length)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [current, goTo])

  // Touch/swipe
  const touchStart = useRef(0)
  const onTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX }
  const onTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStart.current - e.changedTouches[0].clientX
    if (Math.abs(delta) > 60) {
      delta > 0
        ? goTo((current + 1) % SLIDES.length)
        : goTo((current - 1 + SLIDES.length) % SLIDES.length)
    }
  }

  const slide = SLIDES[current]
  const visuals = [Slide1Visual, Slide2Visual, Slide3Visual]
  const VisualComponent = visuals[current]

  return (
    <>
      <section
        className="relative min-h-screen flex flex-col overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        aria-label="Hero slider"
      >
        {/* Ambient background — shifts per slide */}
        <motion.div
          key={`bg-${current}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 60% 50% at 20% 40%, ${slide.accentColor}08 0%, transparent 60%),
              radial-gradient(ellipse 40% 40% at 80% 60%, ${slide.accentColor}05 0%, transparent 60%)
            `,
          }}
        />

        {/* Subtle grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.018]"
          style={{
            backgroundImage: `
              linear-gradient(${slide.accentColor} 1px, transparent 1px),
              linear-gradient(90deg, ${slide.accentColor} 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Main content */}
        <div className="flex-1 flex items-center">
          <div className="max-w-6xl mx-auto px-6 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh] py-24">

              {/* Left — text content */}
              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  <SlideContent
                    key={`content-${current}`}
                    slide={slide}
                    isEntering={entering}
                    onCTAClick={() => setDrawerOpen(true)}
                  />
                </AnimatePresence>
              </div>

              {/* Right — visual */}
              <div className="relative h-[420px] lg:h-[520px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`visual-${current}`}
                    initial={{ opacity: 0, scale: 0.92, x: 30 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95, x: -20 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full"
                  >
                    <VisualComponent isActive={entering && !isTransitioning} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom controls */}
        <div className="relative z-10 pb-10 px-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between">

            {/* Slide counter */}
            <div className="flex items-center gap-3 text-xs text-void/30 dark:text-whisper/30 font-mono">
              <span style={{ color: slide.accentColor, fontWeight: 600 }}>
                0{current + 1}
              </span>
              <span>/</span>
              <span>0{SLIDES.length}</span>
            </div>

            {/* Navigation dots */}
            <SlideDots
              total={SLIDES.length}
              active={current}
              onChange={goTo}
              accentColor={slide.accentColor}
            />

            {/* Prev / Next arrows */}
            <div className="flex gap-2">
              <button
                onClick={() => goTo((current - 1 + SLIDES.length) % SLIDES.length)}
                className="
                  w-9 h-9 rounded-full flex items-center justify-center
                  border border-void/12 dark:border-whisper/12
                  text-void/40 dark:text-whisper/40
                  hover:border-void/30 dark:hover:border-whisper/30
                  hover:text-void dark:hover:text-whisper
                  transition-all duration-150 cursor-pointer
                "
                aria-label="Previous slide"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => goTo((current + 1) % SLIDES.length)}
                className="
                  w-9 h-9 rounded-full flex items-center justify-center
                  border border-void/12 dark:border-whisper/12
                  text-void/40 dark:text-whisper/40
                  hover:border-void/30 dark:hover:border-whisper/30
                  hover:text-void dark:hover:text-whisper
                  transition-all duration-150 cursor-pointer
                "
                aria-label="Next slide"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <ProgressBar progress={progress} color={slide.accentColor} />

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase text-void/25 dark:text-whisper/25">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-5 h-8 rounded-full border border-void/12 dark:border-whisper/12 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full" style={{ background: slide.accentColor }} />
          </motion.div>
        </motion.div>
      </section>

      <ContactDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
