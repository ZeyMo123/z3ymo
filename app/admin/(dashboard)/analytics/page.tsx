'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { getPosts, getWaitlist, getBookings, getSubscribers } from '@/lib/admin/actions'
import type { Post, WaitlistEntry, Booking, Subscriber } from '@/lib/admin/actions'
import {
  PageHeader, ErrorState, EmptyState, StatsCard, Icon,
} from '@/components/admin/ui'

// ─── Types ────────────────────────────────────────────────────

type LoadState = 'loading' | 'success' | 'error'

interface DailyCount { date: string; count: number }

// ─── Helpers ──────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

// Group items by day (last N days)
function groupByDay(
  items: Array<{ created_at: string }>,
  days = 30,
): DailyCount[] {
  const now     = new Date()
  const result: DailyCount[] = []

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().slice(0, 10)
    const count   = items.filter((x) => x.created_at.slice(0, 10) === dateStr).length
    result.push({ date: dateStr, count })
  }
  return result
}

// Compute % change vs prior period
function pctChange(current: number, prior: number): string {
  if (prior === 0) return current > 0 ? '+100%' : '0%'
  const pct = ((current - prior) / prior) * 100
  return `${pct >= 0 ? '+' : ''}${pct.toFixed(0)}%`
}

function splitHalf<T>(arr: T[]): [T[], T[]] {
  const mid = Math.floor(arr.length / 2)
  return [arr.slice(0, mid), arr.slice(mid)]
}

// ─── Mini sparkline (pure SVG, no lib) ───────────────────────

function Sparkline({
  data, color = '#C0392B', height = 48,
}: {
  data:    number[]
  color?:  string
  height?: number
}) {
  if (!data.length) return null
  const w    = 280
  const h    = height
  const max  = Math.max(...data, 1)
  const step = w / (data.length - 1)
  const pts  = data.map((v, i) => `${i * step},${h - (v / max) * (h - 4)}`)
  const poly = pts.join(' ')
  // Area fill points
  const area = `0,${h} ${poly} ${(data.length - 1) * step},${h}`

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height }}>
      <defs>
        <linearGradient id={`sg-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#sg-${color.replace('#', '')})`} />
      <polyline points={poly} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Last dot */}
      <circle cx={(data.length - 1) * step} cy={h - (data[data.length - 1] / max) * (h - 4)} r="2.5" fill={color} />
    </svg>
  )
}

// ─── Chart card ───────────────────────────────────────────────

function ChartCard({
  title, value, sub, color, data, loading,
}: {
  title:   string
  value:   string | number
  sub:     string
  color:   string
  data:    number[]
  loading: boolean
}) {
  return (
    <div className="bg-white dark:bg-gray-950 rounded-2xl border border-void/8 dark:border-whisper/8 p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs font-medium text-void/40 dark:text-whisper/40 uppercase tracking-wider mb-1">
            {title}
          </p>
          {loading ? (
            <div className="h-7 w-16 rounded-lg bg-void/6 dark:bg-whisper/6 animate-pulse" />
          ) : (
            <div className="flex items-baseline gap-2">
              <span className="font-display font-bold text-2xl text-void dark:text-whisper">{value}</span>
              <span className="text-xs text-void/40 dark:text-whisper/40">{sub}</span>
            </div>
          )}
        </div>
      </div>
      {loading ? (
        <div className="h-12 rounded-xl bg-void/4 dark:bg-whisper/4 animate-pulse" />
      ) : (
        <Sparkline data={data} color={color} />
      )}
    </div>
  )
}

// ─── Content performance table ────────────────────────────────

function ContentTable({
  posts, loading,
}: {
  posts:   Post[]
  loading: boolean
}) {
  const sorted = [...posts].sort((a, b) => b.views - a.views)

  if (loading) {
    return (
      <div className="space-y-3 p-4 animate-pulse">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-void/6 dark:bg-whisper/6 flex-shrink-0" />
            <div className="flex-1 space-y-1.5">
              <div className="h-3 rounded-full bg-void/6 dark:bg-whisper/6" style={{ width: `${70 - i * 8}%` }} />
              <div className="h-2 rounded-full bg-void/4 dark:bg-whisper/4 w-20" />
            </div>
            <div className="h-4 w-12 rounded-full bg-void/4 dark:bg-whisper/4" />
          </div>
        ))}
      </div>
    )
  }

  if (!sorted.length) {
    return (
      <EmptyState
        icon="article"
        title="No posts yet"
        description="Publish your first post to see performance data."
      />
    )
  }

  const maxViews = sorted[0]?.views ?? 1

  return (
    <div className="divide-y divide-void/5 dark:divide-whisper/5">
      {sorted.slice(0, 10).map((post, i) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.04 }}
          className="flex items-center gap-4 px-5 py-4 hover:bg-void/2 dark:hover:bg-whisper/2 transition-colors"
        >
          {/* Rank */}
          <div className="w-6 text-center text-xs font-bold text-void/25 dark:text-whisper/25 flex-shrink-0">
            {i + 1}
          </div>

          {/* Title */}
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-void dark:text-whisper truncate">
              {post.title}
            </div>
            <div className="text-[11px] text-void/35 dark:text-whisper/35 mt-0.5">
              {post.read_time} min · {post.published ? 'Published' : 'Draft'}
              {post.categories && ` · ${post.categories.name}`}
            </div>
          </div>

          {/* View bar */}
          <div className="hidden sm:flex items-center gap-2 w-32">
            <div className="flex-1 h-1.5 rounded-full bg-void/6 dark:bg-whisper/6 overflow-hidden">
              <div
                className="h-full rounded-full bg-crimson/60"
                style={{ width: `${(post.views / maxViews) * 100}%` }}
              />
            </div>
          </div>

          {/* Views */}
          <div className="text-sm font-mono font-medium text-void/60 dark:text-whisper/60 text-right flex-shrink-0">
            {post.views.toLocaleString()}
            <div className="text-[10px] text-void/30 dark:text-whisper/30 font-sans">views</div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// ─── Waitlist chart breakdown ─────────────────────────────────

const PRODUCTS = ['pulse', 'ebox', 'novel', 'salons'] as const
const PRODUCT_COLORS: Record<string, string> = {
  pulse:  '#C0392B',
  ebox:   '#1B998B',
  novel:  '#C9A84C',
  salons: '#7C3AED',
}

// ─── Main page ────────────────────────────────────────────────

export default function AnalyticsPage() {
  const [posts,       setPosts]       = useState<Post[]>([])
  const [waitlist,    setWaitlist]    = useState<WaitlistEntry[]>([])
  const [bookings,    setBookings]    = useState<Booking[]>([])
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])

  const [postsState, setPostsState] = useState<LoadState>('loading')
  const [dataState,  setDataState]  = useState<LoadState>('loading')

  const loadAll = useCallback(async () => {
    setPostsState('loading')
    setDataState('loading')

    const [pRes, wRes, bRes, sRes] = await Promise.allSettled([
      getPosts({ limit: 500 }),
      getWaitlist(),
      getBookings({ limit: 500 }),
      getSubscribers(),
    ])

    if (pRes.status === 'fulfilled' && pRes.value.ok) {
      setPosts(pRes.value.data)
      setPostsState('success')
    } else {
      setPostsState('error')
    }

    if (
      wRes.status === 'fulfilled' && wRes.value.ok &&
      bRes.status === 'fulfilled' && bRes.value.ok &&
      sRes.status === 'fulfilled' && sRes.value.ok
    ) {
      setWaitlist(wRes.value.data)
      setBookings(bRes.value.data)
      setSubscribers(sRes.value.data)
      setDataState('success')
    } else {
      setDataState('error')
    }
  }, [])

  useEffect(() => { loadAll() }, [loadAll])

  // ── Computed metrics ──
  const waitlistData    = groupByDay(waitlist, 30).map((d) => d.count)
  const bookingData     = groupByDay(bookings, 30).map((d) => d.count)
  const subscriberData  = groupByDay(subscribers, 30).map((d) => d.count)
  const totalPostViews  = posts.reduce((s, p) => s + p.views, 0)

  // Weekly comparison
  const [prevWaitlist, curWaitlist]    = splitHalf(waitlistData)
  const [prevBookings, curBookings]    = splitHalf(bookingData)
  const [prevSubs,     curSubs]        = splitHalf(subscriberData)

  const sumArr = (a: number[]) => a.reduce((s, v) => s + v, 0)

  const isLoading = dataState === 'loading'

  // Product waitlist breakdown
  const wlByProduct = PRODUCTS.map((p) => ({
    product: p,
    count:   waitlist.filter((e) => e.product === p).length,
    data:    groupByDay(waitlist.filter((e) => e.product === p), 30).map((d) => d.count),
  }))

  return (
    <div className="max-w-6xl">
      <PageHeader
        title="Analytics"
        subtitle="30-day overview of your content and growth metrics"
        action={
          <button
            onClick={loadAll}
            className="flex items-center gap-2 px-3 py-2 rounded-xl border border-void/10 dark:border-whisper/10 text-xs text-void/50 dark:text-whisper/50 hover:border-void/25 dark:hover:border-whisper/25 transition-all cursor-pointer"
          >
            {Icon.refresh} Refresh
          </button>
        }
      />

      {dataState === 'error' && (
        <ErrorState message="Could not load analytics data." onRetry={loadAll} />
      )}

      {dataState !== 'error' && (
        <>
          {/* ── Growth charts ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-7">
            <ChartCard
              title="Waitlist signups"
              value={isLoading ? '—' : waitlist.length}
              sub={isLoading ? '' : `${pctChange(sumArr(curWaitlist), sumArr(prevWaitlist))} vs prior 15d`}
              color="#C0392B"
              data={waitlistData}
              loading={isLoading}
            />
            <ChartCard
              title="Consultation bookings"
              value={isLoading ? '—' : bookings.length}
              sub={isLoading ? '' : `${pctChange(sumArr(curBookings), sumArr(prevBookings))} vs prior 15d`}
              color="#1B998B"
              data={bookingData}
              loading={isLoading}
            />
            <ChartCard
              title="Email subscribers"
              value={isLoading ? '—' : subscribers.filter((s) => s.confirmed).length}
              sub={isLoading ? '' : `${pctChange(sumArr(curSubs), sumArr(prevSubs))} vs prior 15d`}
              color="#C9A84C"
              data={subscriberData}
              loading={isLoading}
            />
          </div>

          {/* ── Waitlist by product ── */}
          <div className="bg-white dark:bg-gray-950 rounded-2xl border border-void/8 dark:border-whisper/8 p-6 mb-6">
            <h2 className="font-display font-semibold text-sm text-void dark:text-whisper mb-5">
              Waitlist — by product
            </h2>
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 animate-pulse">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-24 rounded-2xl bg-void/5 dark:bg-whisper/5" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {wlByProduct.map(({ product, count, data }) => (
                  <div key={product} className="rounded-2xl border border-void/8 dark:border-whisper/8 p-4">
                    <div
                      className="text-[10px] font-bold uppercase tracking-wider mb-2"
                      style={{ color: PRODUCT_COLORS[product] }}
                    >
                      {product}
                    </div>
                    <div className="font-display font-bold text-2xl text-void dark:text-whisper mb-2">
                      {count}
                    </div>
                    <Sparkline data={data} color={PRODUCT_COLORS[product]} height={32} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Content performance ── */}
          <div className="bg-white dark:bg-gray-950 rounded-2xl border border-void/8 dark:border-whisper/8 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-void/6 dark:border-whisper/6">
              <div>
                <h2 className="font-display font-semibold text-sm text-void dark:text-whisper">
                  Content performance
                </h2>
                <p className="text-[11px] text-void/35 dark:text-whisper/35 mt-0.5">
                  {postsState === 'success' && `${totalPostViews.toLocaleString()} total views across ${posts.length} posts`}
                </p>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-void/30 dark:text-whisper/30">
                <span>Rank</span>
                <span>·</span>
                <span>Views</span>
              </div>
            </div>

            {postsState === 'error' ? (
              <ErrorState message="Could not load post data." onRetry={loadAll} />
            ) : (
              <ContentTable posts={posts} loading={postsState === 'loading'} />
            )}
          </div>

          {/* ── Booking quality breakdown ── */}
          {dataState === 'success' && bookings.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
              {/* Budget distribution */}
              <div className="bg-white dark:bg-gray-950 rounded-2xl border border-void/8 dark:border-whisper/8 p-6">
                <h2 className="font-display font-semibold text-sm text-void dark:text-whisper mb-4">
                  Booking budget distribution
                </h2>
                {(['under-1k', '1k-5k', '5k-20k', '20k-plus', 'unknown'] as const).map((bucket) => {
                  const count     = bookings.filter((b) => b.budget === bucket).length
                  const pct       = bookings.length ? (count / bookings.length) * 100 : 0
                  const labels: Record<string, string> = {
                    'under-1k': 'Under $1K',
                    '1k-5k':    '$1K – $5K',
                    '5k-20k':   '$5K – $20K',
                    '20k-plus': '$20K+',
                    unknown:    'Not sure',
                  }
                  return (
                    <div key={bucket} className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-void/60 dark:text-whisper/60">{labels[bucket]}</span>
                        <span className="font-medium text-void/70 dark:text-whisper/70 font-mono">{count}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-void/6 dark:bg-whisper/6 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-crimson/60 transition-all duration-700"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Stage distribution */}
              <div className="bg-white dark:bg-gray-950 rounded-2xl border border-void/8 dark:border-whisper/8 p-6">
                <h2 className="font-display font-semibold text-sm text-void dark:text-whisper mb-4">
                  Business stage distribution
                </h2>
                {(['idea', 'early', 'growing', 'established'] as const).map((stage) => {
                  const count = bookings.filter((b) => b.business_stage === stage).length
                  const pct   = bookings.length ? (count / bookings.length) * 100 : 0
                  const stageColors: Record<string, string> = {
                    idea: '#C9A84C', early: '#1B998B', growing: '#C0392B', established: '#7C3AED',
                  }
                  return (
                    <div key={stage} className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-void/60 dark:text-whisper/60 capitalize">{stage}</span>
                        <span className="font-medium text-void/70 dark:text-whisper/70 font-mono">{count}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-void/6 dark:bg-whisper/6 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${pct}%`, background: stageColors[stage] }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
