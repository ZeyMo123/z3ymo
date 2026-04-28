'use client'

// ─────────────────────────────────────────────────────────────────
// components/sections/CaseStudiesPreview.tsx
//
// Homepage section showing featured case studies.
// Crimson accent. Same slider + 3-state architecture as GuidesPreview.
// ─────────────────────────────────────────────────────────────────

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import ContentCard from '@/components/content/ContentCard'
import { useContentItems } from '@/hooks/useContentItems'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]
const AUTO = 6000

// ─── Icons ────────────────────────────────────────────────────

const ChevL  = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
const ChevR  = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
const Refresh = ({ s }: { s?: boolean }) => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={s ? 'animate-spin' : ''}><path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>
const Arrow  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
const Alert  = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
const BriefIcon = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="12"/></svg>

// ─── Skeleton / Empty / Error ──────────────────────────────────

function Skeleton() {
  return (
    <div className="flex flex-col h-full rounded-3xl border overflow-hidden border-void/8 dark:border-white/8 bg-white dark:bg-white/[0.03] animate-pulse">
      <div className="h-52 bg-void/6 dark:bg-white/6 flex-shrink-0" />
      <div className="flex flex-col flex-1 p-6 gap-3">
        <div className="flex gap-2"><div className="h-5 w-20 rounded-full bg-void/6" /><div className="h-5 w-24 rounded-full bg-void/6" /></div>
        <div className="space-y-2"><div className="h-5 w-full rounded-lg bg-void/6" /><div className="h-5 w-3/4 rounded-lg bg-void/6" /></div>
        <div className="space-y-1.5"><div className="h-3.5 w-full rounded-md bg-void/4" /><div className="h-3.5 w-5/6 rounded-md bg-void/4" /></div>
        <div className="flex justify-between mt-auto pt-4 border-t border-void/6"><div className="h-3.5 w-28 rounded-md bg-void/6" /></div>
      </div>
    </div>
  )
}

function Empty() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-6">
      <div className="w-16 h-16 rounded-3xl flex items-center justify-center mb-5 bg-crimson/6 text-crimson/40"><BriefIcon /></div>
      <h3 className="font-display font-semibold text-lg text-void dark:text-white mb-2">No featured case studies yet</h3>
      <p className="text-sm text-void/45 dark:text-white/40 max-w-xs mb-6 leading-relaxed">Mark case studies as featured in the dashboard to show them here.</p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/admin/content/case-studies/new" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-crimson text-white text-sm font-semibold hover:bg-crimson/90 transition-colors">Add a case study <Arrow /></Link>
        <Link href="/case-studies" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-void/12 dark:border-white/12 text-sm text-void/60 dark:text-white/50 hover:border-void/25 transition-colors">All case studies</Link>
      </div>
    </div>
  )
}

function Err({ msg, retry }: { msg: string; retry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-6">
      <div className="w-16 h-16 rounded-3xl flex items-center justify-center mb-5 bg-crimson/6 text-crimson/50"><Alert /></div>
      <h3 className="font-display font-semibold text-lg text-void dark:text-white mb-2">Couldn't load case studies</h3>
      <p className="text-sm text-void/45 dark:text-white/40 max-w-xs mb-6">{msg || 'Something went wrong.'}</p>
      <button onClick={retry} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-void dark:bg-white text-whisper dark:text-void text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"><Refresh /> Try again</button>
    </div>
  )
}

// ─── Slider ───────────────────────────────────────────────────

function Slider({ items, reduced }: { items: ReturnType<typeof useContentItems>['items']; reduced: boolean }) {
  const [active, setActive] = useState(0)
  const [dir,    setDir]    = useState(1)
  const [hover,  setHover]  = useState(false)
  const [drag,   setDrag]   = useState(false)
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const total   = items.length

  useEffect(() => {
    if (hover || drag || total <= 1) return
    autoRef.current = setInterval(() => { setDir(1); setActive(a => (a + 1) % total) }, AUTO)
    return () => { if (autoRef.current) clearInterval(autoRef.current) }
  }, [hover, drag, total])

  const go = useCallback((i: number) => {
    setDir(i > active ? 1 : -1); setActive(i)
    if (autoRef.current) clearInterval(autoRef.current)
  }, [active])

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'ArrowLeft') go((active - 1 + total) % total); if (e.key === 'ArrowRight') go((active + 1) % total) }
    window.addEventListener('keydown', h); return () => window.removeEventListener('keydown', h)
  }, [active, go, total])

  const variants = {
    enter:  (d: number) => ({ x: d > 0 ? '60%' : '-60%', opacity: 0, scale: 0.94 }),
    center: { x: '0%', opacity: 1, scale: 1 },
    exit:   (d: number) => ({ x: d > 0 ? '-60%' : '60%', opacity: 0, scale: 0.94 }),
  }

  return (
    <div className="relative" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className="relative overflow-hidden px-4 sm:px-12 md:px-20">
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 z-10 pointer-events-none bg-gradient-to-r from-whisper dark:from-void to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 z-10 pointer-events-none bg-gradient-to-l from-whisper dark:from-void to-transparent" />
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={active} custom={dir} variants={reduced ? {} : variants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.38, ease: EASE }}
              drag={total > 1 ? 'x' : false} dragConstraints={{ left: 0, right: 0 }} dragElastic={0.2}
              onDragStart={() => setDrag(true)}
              onDragEnd={(_, info) => { setDrag(false); if (info.offset.x < -60) go((active + 1) % total); else if (info.offset.x > 60) go((active - 1 + total) % total) }}
              style={{ cursor: total > 1 ? 'grab' : 'default' }} className="select-none">
              <ContentCard item={items[active]} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {total > 1 && (
        <div className="flex items-center justify-center gap-4 mt-7">
          <button onClick={() => go((active - 1 + total) % total)} aria-label="Previous"
            className="w-9 h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer border-void/12 dark:border-white/12 text-void/50 dark:text-white/40 hover:border-void/30 hover:text-void dark:hover:text-white hover:bg-void/4"><ChevL /></button>
          <div className="flex items-center gap-2">
            {items.map((_, i) => (
              <button key={i} onClick={() => go(i)} className="cursor-pointer">
                <motion.div animate={{ width: i === active ? 24 : 6, opacity: i === active ? 1 : 0.3 }} transition={{ duration: 0.28, ease: EASE }} className="h-1.5 rounded-full bg-crimson" />
              </button>
            ))}
          </div>
          <button onClick={() => go((active + 1) % total)} aria-label="Next"
            className="w-9 h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer border-void/12 dark:border-white/12 text-void/50 dark:text-white/40 hover:border-void/30 hover:text-void dark:hover:text-white hover:bg-void/4"><ChevR /></button>
        </div>
      )}
      <div className="text-center mt-3"><span className="text-xs text-void/30 dark:text-white/25 tabular-nums">{active + 1} / {total}</span></div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────

export default function CaseStudiesPreview() {
  const reduced = useReducedMotion() ?? false
  const { items, isLoading, isError, isEmpty, errorMsg, refresh } = useContentItems({ type: 'case-study', featuredOnly: true, limit: 6 })

  const [pull, setPull] = useState(0)
  const pRef = useRef({ startY: 0, pulling: false })
  useEffect(() => {
    const s = (e: TouchEvent) => { if (window.scrollY === 0) pRef.current = { startY: e.touches[0].clientY, pulling: true } }
    const m = (e: TouchEvent) => { if (!pRef.current.pulling) return; const d = e.touches[0].clientY - pRef.current.startY; if (d > 0) setPull(Math.min(d / 80, 1)) }
    const e = () => { if (pRef.current.pulling && pull >= 1) refresh(); pRef.current.pulling = false; setPull(0) }
    window.addEventListener('touchstart', s, { passive: true }); window.addEventListener('touchmove', m, { passive: true }); window.addEventListener('touchend', e)
    return () => { window.removeEventListener('touchstart', s); window.removeEventListener('touchmove', m); window.removeEventListener('touchend', e) }
  }, [pull, refresh])

  return (
    <section className="relative py-24 px-6 overflow-hidden bg-whisper dark:bg-void" aria-label="Featured case studies">
      {pull > 0 && (
        <div className="absolute top-0 left-0 right-0 flex justify-center pointer-events-none z-20"
          style={{ transform: `translateY(${pull * 56 - 40}px)`, opacity: Math.min(pull * 2, 1) }}>
          <div className="w-9 h-9 rounded-full flex items-center justify-center bg-white dark:bg-[#1A1A22] shadow-lg border border-void/8 dark:border-white/8"><Refresh /></div>
        </div>
      )}

      <div className="max-w-5xl mx-auto">
        <motion.div initial={reduced ? {} : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5, ease: EASE }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] uppercase mb-3 text-void/35 dark:text-white/35">Proven results</p>
            <h2 className="font-display font-bold text-[clamp(2rem,4.5vw,3rem)] leading-tight text-void dark:text-white">
              Case studies &amp; <span className="text-crimson">outcomes</span>
            </h2>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            {!isLoading && (
              <button onClick={refresh} aria-label="Refresh"
                className="w-9 h-9 rounded-full flex items-center justify-center border border-void/10 dark:border-white/10 text-void/35 dark:text-white/30 hover:border-void/25 hover:text-void/70 transition-all cursor-pointer">
                <Refresh s={isLoading} />
              </button>
            )}
            <Link href="/case-studies"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-semibold transition-all border-void/12 dark:border-white/12 text-void/65 dark:text-white/55 hover:border-void/28 hover:text-void dark:hover:text-white hover:bg-void/3 dark:hover:bg-white/4">
              All case studies <Arrow />
            </Link>
          </div>
        </motion.div>

        <motion.div initial={reduced ? {} : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5, delay: 0.1, ease: EASE }}>
          {isLoading && <div className="max-w-2xl mx-auto"><Skeleton /></div>}
          {isError && !isLoading && <Err msg={errorMsg} retry={refresh} />}
          {isEmpty && !isLoading && <Empty />}
          {!isLoading && !isError && items.length > 0 && <Slider items={items} reduced={reduced} />}
        </motion.div>

        {!isLoading && !isError && items.length > 0 && (
          <motion.div initial={reduced ? {} : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.45, delay: 0.25, ease: EASE }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-14 pt-10 border-t border-void/6 dark:border-white/6">
            <p className="text-sm text-void/45 dark:text-white/40">Real projects. Real results. How businesses in Africa used technology to grow.</p>
            <Link href="/case-studies" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-crimson text-white text-sm font-semibold hover:bg-crimson/90 transition-all flex-shrink-0 shadow-lg shadow-crimson/20">See all case studies <Arrow /></Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}
