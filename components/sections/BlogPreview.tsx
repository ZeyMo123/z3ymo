'use client'

// ─────────────────────────────────────────────────────────────────
// components/sections/BlogPreview.tsx
//
// Homepage blog section — centered slider showing featured posts.
// Architecture:
//   - useFeaturedPosts hook handles data / 3 states
//   - Slider: Framer Motion drag + keyboard + dots navigation
//   - Auto-advance every 5s, pauses on hover/focus
//   - Pull-to-refresh: detects downward touch drag from top
//   - Empty state: "No featured posts yet" with admin link
//   - Error state: message + retry button
//   - Loading state: skeleton cards
// ─────────────────────────────────────────────────────────────────

import {
  useCallback, useEffect, useRef, useState,
} from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import BlogCard from '@/components/blog/BlogCard'
import { useFeaturedPosts } from '@/hooks/useFeaturedPosts'

// ─── Icons ────────────────────────────────────────────────────

const ChevronL = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
)

const ChevronR = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
)

const RefreshIcon = ({ spinning }: { spinning?: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
    className={spinning ? 'animate-spin' : ''}>
    <path d="M23 4v6h-6M1 20v-6h6"/>
    <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
  </svg>
)

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)

const AlertIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
)

const EditIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
)

// ─── Skeleton card ────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="flex flex-col h-full rounded-3xl border overflow-hidden
      border-void/8 dark:border-white/8
      bg-white dark:bg-white/[0.03]
      animate-pulse">
      {/* Cover */}
      <div className="h-52 sm:h-56 bg-void/6 dark:bg-white/6 flex-shrink-0" />
      <div className="flex flex-col flex-1 p-6 gap-3">
        {/* Category */}
        <div className="h-5 w-20 rounded-full bg-void/6 dark:bg-white/6" />
        {/* Title */}
        <div className="space-y-2">
          <div className="h-5 w-full rounded-lg bg-void/6 dark:bg-white/6" />
          <div className="h-5 w-3/4  rounded-lg bg-void/6 dark:bg-white/6" />
        </div>
        {/* Excerpt */}
        <div className="space-y-1.5 mt-1">
          <div className="h-3.5 w-full  rounded-md bg-void/4 dark:bg-white/4" />
          <div className="h-3.5 w-5/6   rounded-md bg-void/4 dark:bg-white/4" />
        </div>
        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-4
          border-t border-void/6 dark:border-white/6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-void/8 dark:bg-white/8" />
            <div className="h-3.5 w-24 rounded-md bg-void/6 dark:bg-white/6" />
          </div>
          <div className="h-3.5 w-10 rounded-md bg-void/6 dark:bg-white/6" />
        </div>
      </div>
    </div>
  )
}

// ─── Empty state ──────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-6">
      <div className="w-16 h-16 rounded-3xl flex items-center justify-center mb-5
        bg-void/4 dark:bg-white/4
        text-void/25 dark:text-white/20">
        <EditIcon />
      </div>
      <h3 className="font-display font-semibold text-lg text-void dark:text-white mb-2">
        No featured posts yet
      </h3>
      <p className="text-sm text-void/45 dark:text-white/40 max-w-xs mb-6 leading-relaxed">
        Mark posts as featured in the admin dashboard to show them here.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/admin/blog"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
            bg-crimson text-white text-sm font-semibold
            hover:bg-crimson/90 transition-colors">
          Go to admin
          <ArrowIcon />
        </Link>
        <Link href="/blog"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border
            border-void/12 dark:border-white/12
            text-sm text-void/60 dark:text-white/50
            hover:border-void/25 dark:hover:border-white/25
            transition-colors">
          View all posts
        </Link>
      </div>
    </div>
  )
}

// ─── Error state ──────────────────────────────────────────────

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-6">
      <div className="w-16 h-16 rounded-3xl flex items-center justify-center mb-5
        bg-crimson/6 text-crimson/50">
        <AlertIcon />
      </div>
      <h3 className="font-display font-semibold text-lg text-void dark:text-white mb-2">
        Couldn't load posts
      </h3>
      <p className="text-sm text-void/45 dark:text-white/40 max-w-xs mb-6 leading-relaxed">
        {message || 'Something went wrong. Check your connection and try again.'}
      </p>
      <button onClick={onRetry}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
          bg-void dark:bg-white text-whisper dark:text-void
          text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer">
        <RefreshIcon />
        Try again
      </button>
    </div>
  )
}

// ─── Pull-to-refresh indicator ────────────────────────────────

function PullIndicator({ progress }: { progress: number }) {
  // progress 0–1 → show spinner
  const opacity = Math.min(progress * 2, 1)
  const scale   = 0.6 + progress * 0.4
  return (
    <div
      className="absolute top-0 left-0 right-0 flex justify-center pointer-events-none z-20"
      style={{ transform: `translateY(${progress * 56 - 40}px)`, opacity }}>
      <div className="w-9 h-9 rounded-full flex items-center justify-center
        bg-white dark:bg-[#1A1A22] shadow-lg border border-void/8 dark:border-white/8"
        style={{ transform: `scale(${scale}) rotate(${progress * 360}deg)` }}>
        <RefreshIcon />
      </div>
    </div>
  )
}

// ─── Slider ───────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]
const AUTO_INTERVAL = 5000

interface SliderProps {
  posts: ReturnType<typeof useFeaturedPosts>['posts']
  reduced: boolean
}

function BlogSlider({ posts, reduced }: SliderProps) {
  const [active,    setActive]    = useState(0)
  const [direction, setDirection] = useState(1)  // 1 = forward, -1 = back
  const [hovered,   setHovered]   = useState(false)
  const [dragging,  setDragging]  = useState(false)
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const total   = posts.length

  // ── Auto-advance ──
  useEffect(() => {
    if (hovered || dragging || total <= 1) return
    autoRef.current = setInterval(() => {
      setDirection(1)
      setActive(a => (a + 1) % total)
    }, AUTO_INTERVAL)
    return () => { if (autoRef.current) clearInterval(autoRef.current) }
  }, [hovered, dragging, total])

  const go = useCallback((index: number) => {
    setDirection(index > active ? 1 : -1)
    setActive(index)
    if (autoRef.current) { clearInterval(autoRef.current) }
  }, [active])

  const prev = () => go((active - 1 + total) % total)
  const next = () => go((active + 1) % total)

  // ── Keyboard ──
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [active, total])

  const variants = {
    enter:  (d: number) => ({ x: d > 0 ? '60%' : '-60%', opacity: 0, scale: 0.94 }),
    center: { x: '0%', opacity: 1, scale: 1 },
    exit:   (d: number) => ({ x: d > 0 ? '-60%' : '60%', opacity: 0, scale: 0.94 }),
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Card stage ── */}
      <div className="relative overflow-hidden px-4 sm:px-12 md:px-20">
        {/* Side fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 z-10 pointer-events-none
          bg-gradient-to-r from-whisper dark:from-void to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 z-10 pointer-events-none
          bg-gradient-to-l from-whisper dark:from-void to-transparent" />

        {/* Card */}
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              variants={reduced ? {} : variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.38, ease: EASE }}
              drag={total > 1 ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragStart={() => setDragging(true)}
              onDragEnd={(_, info) => {
                setDragging(false)
                const swipe = info.offset.x
                if (swipe < -60)      next()
                else if (swipe > 60)  prev()
              }}
              style={{ cursor: total > 1 ? 'grab' : 'default' }}
              className="select-none"
            >
              <BlogCard post={posts[active]} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Controls row ── */}
      {total > 1 && (
        <div className="flex items-center justify-center gap-4 mt-7">

          {/* Prev */}
          <button onClick={prev} aria-label="Previous post"
            className="w-9 h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer
              border-void/12 dark:border-white/12
              text-void/50 dark:text-white/40
              hover:border-void/30 dark:hover:border-white/30
              hover:text-void dark:hover:text-white
              hover:bg-void/4 dark:hover:bg-white/4">
            <ChevronL />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2" role="tablist" aria-label="Blog posts">
            {posts.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === active}
                aria-label={`Post ${i + 1} of ${total}`}
                onClick={() => go(i)}
                className="relative cursor-pointer group"
              >
                <motion.div
                  animate={{
                    width:   i === active ? 24 : 6,
                    opacity: i === active ? 1  : 0.3,
                  }}
                  transition={{ duration: 0.28, ease: EASE }}
                  className="h-1.5 rounded-full bg-crimson"
                />
              </button>
            ))}
          </div>

          {/* Next */}
          <button onClick={next} aria-label="Next post"
            className="w-9 h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer
              border-void/12 dark:border-white/12
              text-void/50 dark:text-white/40
              hover:border-void/30 dark:hover:border-white/30
              hover:text-void dark:hover:text-white
              hover:bg-void/4 dark:hover:bg-white/4">
            <ChevronR />
          </button>
        </div>
      )}

      {/* ── Post counter ── */}
      <div className="text-center mt-3">
        <span className="text-xs text-void/30 dark:text-white/25 tabular-nums">
          {active + 1} / {total}
        </span>
      </div>
    </div>
  )
}

// ─── Main section component ────────────────────────────────────

export default function BlogPreview() {
  const reduced = useReducedMotion() ?? false
  const {
    posts, isLoading, isError, isEmpty, errorMsg, refresh, isLoading: loading,
  } = useFeaturedPosts(6)

  // ── Pull-to-refresh ──
  const [pullProgress, setPullProgress] = useState(0)
  const pullRef     = useRef({ startY: 0, pulling: false })
  const PULL_THRESH = 80   // px to trigger refresh

  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        pullRef.current = { startY: e.touches[0].clientY, pulling: true }
      }
    }
    const onTouchMove = (e: TouchEvent) => {
      if (!pullRef.current.pulling) return
      const delta = e.touches[0].clientY - pullRef.current.startY
      if (delta > 0) setPullProgress(Math.min(delta / PULL_THRESH, 1))
    }
    const onTouchEnd = () => {
      if (pullRef.current.pulling && pullProgress >= 1) refresh()
      pullRef.current.pulling = false
      setPullProgress(0)
    }

    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove',  onTouchMove,  { passive: true })
    window.addEventListener('touchend',   onTouchEnd)
    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove',  onTouchMove)
      window.removeEventListener('touchend',   onTouchEnd)
    }
  }, [pullProgress, refresh])

  return (
    <section
      className="relative py-24 px-6 overflow-hidden
        bg-whisper dark:bg-void"
      aria-label="Featured blog posts"
    >
      {/* Pull-to-refresh indicator (mobile) */}
      {pullProgress > 0 && <PullIndicator progress={pullProgress} />}

      <div className="max-w-5xl mx-auto">

        {/* ── Section header ── */}
        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12"
        >
          <div>
            <p className="text-xs font-medium tracking-[0.2em] uppercase mb-3
              text-void/35 dark:text-white/35">
              From the blog
            </p>
            <h2 className="font-display font-bold text-[clamp(2rem,4.5vw,3rem)] leading-tight
              text-void dark:text-white">
              Latest insights &amp;
              <br className="hidden sm:block" />
              <span className="text-crimson">thinking</span>
            </h2>
          </div>

          {/* View all + refresh */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Manual refresh button — visible when not loading */}
            {!isLoading && (
              <button onClick={refresh} aria-label="Refresh posts"
                className="w-9 h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer
                  border-void/10 dark:border-white/10
                  text-void/35 dark:text-white/30
                  hover:border-void/25 dark:hover:border-white/25
                  hover:text-void/70 dark:hover:text-white/60">
                <RefreshIcon spinning={isLoading} />
              </button>
            )}

            <Link href="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border
                text-sm font-semibold transition-all
                border-void/12 dark:border-white/12
                text-void/65 dark:text-white/55
                hover:border-void/28 dark:hover:border-white/25
                hover:text-void dark:hover:text-white
                hover:bg-void/3 dark:hover:bg-white/4">
              View all posts
              <ArrowIcon />
            </Link>
          </div>
        </motion.div>

        {/* ── Content: 3 states ── */}
        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
        >
          {/* Loading */}
          {isLoading && (
            <div className="max-w-2xl mx-auto">
              <SkeletonCard />
            </div>
          )}

          {/* Error */}
          {isError && !isLoading && (
            <ErrorState message={errorMsg} onRetry={refresh} />
          )}

          {/* Empty */}
          {isEmpty && !isLoading && (
            <EmptyState />
          )}

          {/* Success — slider */}
          {!isLoading && !isError && posts.length > 0 && (
            <BlogSlider posts={posts} reduced={reduced} />
          )}
        </motion.div>

        {/* ── Bottom CTA strip ── */}
        {!isLoading && !isError && posts.length > 0 && (
          <motion.div
            initial={reduced ? {} : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: 0.25, ease: EASE }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-14 pt-10
              border-t border-void/6 dark:border-white/6"
          >
            <p className="text-sm text-void/45 dark:text-white/40">
              Insights on AI, software, and building for Africa's market.
            </p>
            <Link href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full
                bg-void dark:bg-white text-whisper dark:text-void
                text-sm font-semibold hover:opacity-90 transition-opacity flex-shrink-0">
              Read all articles
              <ArrowIcon />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}
