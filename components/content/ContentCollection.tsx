'use client'

// ─────────────────────────────────────────────────────────────────
// components/content/ContentCollection.tsx
//
// Shared collection page for Guides, Case Studies, and Docs.
// Features: search, category filter, 3-state data, pull-to-refresh,
// empty state, error state with retry, responsive card grid.
// ─────────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import ContentCard from '@/components/content/ContentCard'
import { useContentItems } from '@/hooks/useContentItems'
import { supabase } from '@/lib/supabase/client'
import type { ContentType } from '@/lib/supabase/client'

// ─── Type config ──────────────────────────────────────────────

const TYPE_CONFIG: Record<ContentType, {
  title:         string
  subtitle:      string
  color:         string
  emptyTitle:    string
  emptyBody:     string
  adminHref:     string
}> = {
  'guide': {
    title:      'Guides',
    subtitle:   'Step-by-step guides on AI, software, business tech, and building in Africa.',
    color:      '#1B998B',
    emptyTitle: 'No guides published yet',
    emptyBody:  'Comprehensive guides will appear here once published.',
    adminHref:  '/admin/content/guides/new',
  },
  'case-study': {
    title:      'Case Studies',
    subtitle:   'Real projects. Real results. How businesses across Africa used technology to grow.',
    color:      '#C0392B',
    emptyTitle: 'No case studies published yet',
    emptyBody:  'Case studies will appear here once published.',
    adminHref:  '/admin/content/case-studies/new',
  },
  'doc': {
    title:      'Documentation',
    subtitle:   'Technical documentation for Pulse API, Z3ymo platforms, and developer tools.',
    color:      '#C9A84C',
    emptyTitle: 'No documentation published yet',
    emptyBody:  'API docs and platform documentation will appear here.',
    adminHref:  '/admin/content/docs/new',
  },
}

// ─── Icons ────────────────────────────────────────────────────

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
)

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
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
      border-void/8 dark:border-white/8 bg-white dark:bg-white/[0.03] animate-pulse">
      <div className="h-48 sm:h-52 bg-void/6 dark:bg-white/6 flex-shrink-0" />
      <div className="flex flex-col flex-1 p-6 gap-3">
        <div className="flex gap-2">
          <div className="h-5 w-16 rounded-full bg-void/6 dark:bg-white/6" />
          <div className="h-5 w-24 rounded-full bg-void/6 dark:bg-white/6" />
        </div>
        <div className="space-y-2">
          <div className="h-5 w-full rounded-lg bg-void/6 dark:bg-white/6" />
          <div className="h-5 w-4/5 rounded-lg bg-void/6 dark:bg-white/6" />
        </div>
        <div className="space-y-1.5">
          <div className="h-3.5 w-full rounded-md bg-void/4 dark:bg-white/4" />
          <div className="h-3.5 w-5/6 rounded-md bg-void/4 dark:bg-white/4" />
        </div>
        <div className="flex justify-between mt-auto pt-4 border-t border-void/6 dark:border-white/6">
          <div className="h-3.5 w-28 rounded-md bg-void/6 dark:bg-white/6" />
          <div className="h-3.5 w-12 rounded-md bg-void/6 dark:bg-white/6" />
        </div>
      </div>
    </div>
  )
}

// ─── Empty state ──────────────────────────────────────────────

function EmptyState({ type, onReset }: { type: ContentType; onReset?: () => void }) {
  const config = TYPE_CONFIG[type]
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-24 text-center px-6">
      <div className="w-16 h-16 rounded-3xl flex items-center justify-center mb-5
        bg-void/4 dark:bg-white/4 text-void/25 dark:text-white/20">
        <EditIcon />
      </div>
      <h3 className="font-display font-semibold text-lg text-void dark:text-white mb-2">
        {config.emptyTitle}
      </h3>
      <p className="text-sm text-void/45 dark:text-white/40 max-w-xs mb-6 leading-relaxed">
        {config.emptyBody}
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        {onReset && (
          <button onClick={onReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border
              border-void/12 dark:border-white/12
              text-sm text-void/60 dark:text-white/50
              hover:border-void/25 transition-colors cursor-pointer">
            Clear filters
          </button>
        )}
        <Link href={config.adminHref}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
            bg-crimson text-white text-sm font-semibold hover:bg-crimson/90 transition-colors">
          Add first {TYPE_CONFIG[type].title.slice(0, -1).toLowerCase()}
        </Link>
      </div>
    </div>
  )
}

// ─── Error state ──────────────────────────────────────────────

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-24 text-center px-6">
      <div className="w-16 h-16 rounded-3xl flex items-center justify-center mb-5
        bg-crimson/6 text-crimson/50">
        <AlertIcon />
      </div>
      <h3 className="font-display font-semibold text-lg text-void dark:text-white mb-2">
        Couldn't load content
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

// ─── Pull indicator ───────────────────────────────────────────

function PullIndicator({ progress }: { progress: number }) {
  return (
    <div className="absolute top-0 left-0 right-0 flex justify-center pointer-events-none z-20"
      style={{ transform: `translateY(${progress * 56 - 40}px)`, opacity: Math.min(progress * 2, 1) }}>
      <div className="w-9 h-9 rounded-full flex items-center justify-center
        bg-white dark:bg-[#1A1A22] shadow-lg border border-void/8 dark:border-white/8">
        <RefreshIcon />
      </div>
    </div>
  )
}

// ─── Category interface ───────────────────────────────────────

interface Category { id: string; name: string; color: string }

// ─── Main component ───────────────────────────────────────────

interface ContentCollectionProps {
  type: ContentType
}

export default function ContentCollection({ type }: ContentCollectionProps) {
  const config = TYPE_CONFIG[type]

  const [search,     setSearch]     = useState('')
  const [activeSearch, setActiveSearch] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [categories, setCategories] = useState<Category[]>([])
  const [pullProgress, setPullProgress] = useState(0)

  const { items, isLoading, isError, isEmpty, errorMsg, refresh } = useContentItems({
    type,
    categoryId: categoryId || undefined,
    search:     activeSearch,
    limit:      24,
  })

  // Load categories for filter — only for types with categories
  useEffect(() => {
    if (type === 'doc') return
    supabase.from('categories').select('id, name, color').order('name')
      .then(({ data }) => setCategories(data ?? []))
  }, [type])

  // Search on Enter or 300ms debounce
  useEffect(() => {
    const t = setTimeout(() => setActiveSearch(search), 300)
    return () => clearTimeout(t)
  }, [search])

  // Pull-to-refresh (mobile)
  const pullRef = useRef({ startY: 0, pulling: false })
  const THRESH  = 80

  useEffect(() => {
    const onStart = (e: TouchEvent) => {
      if (window.scrollY === 0) pullRef.current = { startY: e.touches[0].clientY, pulling: true }
    }
    const onMove = (e: TouchEvent) => {
      if (!pullRef.current.pulling) return
      const delta = e.touches[0].clientY - pullRef.current.startY
      if (delta > 0) setPullProgress(Math.min(delta / THRESH, 1))
    }
    const onEnd = () => {
      if (pullRef.current.pulling && pullProgress >= 1) refresh()
      pullRef.current.pulling = false
      setPullProgress(0)
    }
    window.addEventListener('touchstart', onStart, { passive: true })
    window.addEventListener('touchmove',  onMove,  { passive: true })
    window.addEventListener('touchend',   onEnd)
    return () => {
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchmove',  onMove)
      window.removeEventListener('touchend',   onEnd)
    }
  }, [pullProgress, refresh])

  const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

  const hasFilters = !!search || !!categoryId
  const resetFilters = () => { setSearch(''); setActiveSearch(''); setCategoryId('') }

  return (
    <div className="relative min-h-screen bg-whisper dark:bg-void">
      {pullProgress > 0 && <PullIndicator progress={pullProgress} />}

      {/* ── Hero header ── */}
      <div className="pt-32 pb-12 px-6 border-b border-void/6 dark:border-white/6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full mb-5"
              style={{ background: `${config.color}10`, color: config.color }}>
              Z3ymo {config.title}
            </span>
            <h1 className="font-display font-bold text-[clamp(2.4rem,6vw,4rem)] text-void dark:text-white leading-tight tracking-tight mb-3">
              {config.title}
            </h1>
            <p className="text-void/50 dark:text-white/45 max-w-lg leading-relaxed mb-8">
              {config.subtitle}
            </p>

            {/* Search + filter row */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search input */}
              <div className="relative flex-1 max-w-sm">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-void/30 dark:text-white/30 pointer-events-none">
                  <SearchIcon />
                </div>
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder={`Search ${config.title.toLowerCase()}…`}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-void/10 dark:border-white/10
                    bg-white dark:bg-white/[0.04] text-sm text-void dark:text-white
                    placeholder:text-void/30 dark:placeholder:text-white/25
                    focus:outline-none focus:border-crimson/40 focus:ring-2 focus:ring-crimson/8
                    transition-all"
                />
                {search && (
                  <button onClick={() => { setSearch(''); setActiveSearch('') }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-void/30 dark:text-white/30 hover:text-void dark:hover:text-white transition-colors cursor-pointer">
                    <XIcon />
                  </button>
                )}
              </div>

              {/* Category pills — only for non-docs */}
              {type !== 'doc' && categories.length > 0 && (
                <div className="flex gap-2 flex-wrap items-center">
                  <button
                    onClick={() => setCategoryId('')}
                    className={[
                      'px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer',
                      !categoryId
                        ? 'bg-void dark:bg-white text-whisper dark:text-void border-transparent'
                        : 'border-void/10 dark:border-white/10 text-void/55 dark:text-white/45 hover:border-void/20 dark:hover:border-white/20',
                    ].join(' ')}>
                    All
                  </button>
                  {categories.map(cat => (
                    <button key={cat.id}
                      onClick={() => setCategoryId(categoryId === cat.id ? '' : cat.id)}
                      className={[
                        'px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer',
                        categoryId === cat.id
                          ? 'text-white border-transparent'
                          : 'border-void/10 dark:border-white/10 text-void/55 dark:text-white/45 hover:border-void/20 dark:hover:border-white/20',
                      ].join(' ')}
                      style={categoryId === cat.id ? { background: cat.color } : {}}>
                      {cat.name}
                    </button>
                  ))}
                </div>
              )}

              {/* Refresh */}
              {!isLoading && (
                <button onClick={refresh} aria-label="Refresh"
                  className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border
                    border-void/10 dark:border-white/10
                    text-void/35 dark:text-white/30
                    hover:border-void/25 dark:hover:border-white/25
                    hover:text-void/70 dark:hover:text-white/60
                    transition-all cursor-pointer">
                  <RefreshIcon spinning={isLoading} />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Content grid ── */}
      <div className="px-6 py-12">
        <div className="max-w-5xl mx-auto">

          {/* Result count / active filters */}
          {!isLoading && !isError && items.length > 0 && (
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-void/40 dark:text-white/35">
                {items.length} {items.length === 1 ? config.title.slice(0, -1) : config.title.toLowerCase()}
                {activeSearch && ` matching "${activeSearch}"`}
                {categoryId && ` in selected category`}
              </p>
              {hasFilters && (
                <button onClick={resetFilters}
                  className="text-xs text-crimson hover:underline cursor-pointer">
                  Clear all filters
                </button>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {/* Loading — 6 skeleton cards */}
            {isLoading && Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}

            {/* Error */}
            {isError && !isLoading && (
              <ErrorState message={errorMsg} onRetry={refresh} />
            )}

            {/* Empty */}
            {isEmpty && !isLoading && (
              <EmptyState type={type} onReset={hasFilters ? resetFilters : undefined} />
            )}

            {/* Cards */}
            {!isLoading && !isError && items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.04, ease: EASE }}
              >
                <ContentCard item={item} className="h-full" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
