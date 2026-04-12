'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { getAdminStats, getPosts, getBookings, getWaitlist } from '@/lib/admin/actions'
import type { AdminStats, Post, Booking, WaitlistEntry } from '@/lib/admin/actions'
import {
  StatsCard, ErrorState, EmptyState, StatusBadge, PageHeader,
  Icon, DataTable,
} from '@/components/admin/ui'

// ─── Types ────────────────────────────────────────────────────

type LoadState = 'loading' | 'success' | 'error'

// ─── Recent bookings mini-table ───────────────────────────────

function RecentBookings({ bookings, loading, error, onRetry }: {
  bookings: Booking[]
  loading: boolean
  error: string
  onRetry: () => void
}) {
  if (error) return <ErrorState message={error} onRetry={onRetry} />
  if (loading) return (
    <div className="space-y-3 p-4 animate-pulse">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-void/6 dark:bg-whisper/6" />
          <div className="flex-1 space-y-1.5">
            <div className="h-3 rounded-full bg-void/6 dark:bg-whisper/6 w-40" />
            <div className="h-2.5 rounded-full bg-void/4 dark:bg-whisper/4 w-24" />
          </div>
          <div className="h-5 w-16 rounded-full bg-void/4 dark:bg-whisper/4" />
        </div>
      ))}
    </div>
  )
  if (!bookings.length) return (
    <EmptyState icon="calendar" title="No bookings yet" description="Bookings from the consultation funnel will appear here." />
  )

  return (
    <div className="divide-y divide-void/5 dark:divide-whisper/5">
      {bookings.slice(0, 5).map((b, i) => (
        <motion.div key={b.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
          className="flex items-center gap-3 px-5 py-3.5">
          <div className="w-8 h-8 rounded-xl bg-crimson/8 flex items-center justify-center shrink-0 text-crimson">
            {Icon.calendar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-void dark:text-whisper truncate">{b.full_name}</div>
            <div className="text-xs text-void/40 dark:text-whisper/40">
              {b.business_type} · {b.budget}
              {b.consultation_slots && ` · ${b.consultation_slots.date}`}
            </div>
          </div>
          <StatusBadge status={b.status} />
        </motion.div>
      ))}
    </div>
  )
}

// ─── Recent posts mini-list ───────────────────────────────────

function RecentPosts({ posts, loading, error, onRetry }: {
  posts: Post[]
  loading: boolean
  error: string
  onRetry: () => void
}) {
  if (error) return <ErrorState message={error} onRetry={onRetry} />
  if (loading) return (
    <div className="space-y-3 p-4 animate-pulse">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-void/6 dark:bg-whisper/6" />
          <div className="flex-1 space-y-1.5">
            <div className="h-3 rounded-full bg-void/6 dark:bg-whisper/6" style={{ width: `${65 - i * 10}%` }} />
            <div className="h-2.5 rounded-full bg-void/4 dark:bg-whisper/4 w-20" />
          </div>
          <div className="h-5 w-14 rounded-full bg-void/4 dark:bg-whisper/4" />
        </div>
      ))}
    </div>
  )
  if (!posts.length) return (
    <EmptyState
      icon="article"
      title="No posts yet"
      description="Create your first blog post to get started."
      action={{ label: 'New post', onClick: () => window.location.href = '/admin/blog/new' }}
    />
  )

  return (
    <div className="divide-y divide-void/5 dark:divide-whisper/5">
      {posts.slice(0, 5).map((p, i) => (
        <motion.div key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
          className="flex items-center gap-3 px-5 py-3.5">
          <div className="w-8 h-8 rounded-xl bg-void/6 dark:bg-whisper/6 flex items-center justify-center shrink-0 text-void/40 dark:text-whisper/40">
            {Icon.article}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-void dark:text-whisper truncate">{p.title}</div>
            <div className="text-xs text-void/40 dark:text-whisper/40">{p.read_time} min read · {p.views} views</div>
          </div>
          <StatusBadge status={p.published ? 'published' : 'draft'} />
        </motion.div>
      ))}
    </div>
  )
}

// ─── Waitlist breakdown ───────────────────────────────────────

const PRODUCTS = ['pulse', 'ebox', 'novel', 'salons']
const PRODUCT_COLORS: Record<string, string> = {
  pulse:  '#C0392B',
  ebox:   '#1B998B',
  novel:  '#C9A84C',
  salons: '#7C3AED',
}

function WaitlistSummary({ entries, loading }: { entries: WaitlistEntry[]; loading: boolean }) {
  if (loading) return (
    <div className="grid grid-cols-2 gap-3 p-5 animate-pulse">
      {[...Array(4)].map((_, i) => <div key={i} className="h-16 rounded-xl bg-void/5 dark:bg-whisper/5" />)}
    </div>
  )

  return (
    <div className="grid grid-cols-2 gap-3 p-5">
      {PRODUCTS.map((product) => {
        const count = entries.filter(e => e.product === product).length
        const color = PRODUCT_COLORS[product]
        return (
          <div key={product} className="p-4 rounded-xl border border-void/8 dark:border-whisper/8">
            <div className="text-[10px] font-semibold uppercase tracking-wider mb-1"
              style={{ color }}>
              {product}
            </div>
            <div className="font-display font-bold text-xl text-void dark:text-whisper">{count}</div>
            <div className="text-[10px] text-void/40 dark:text-whisper/40">signups</div>
          </div>
        )
      })}
    </div>
  )
}

// ─── Main dashboard ───────────────────────────────────────────

export default function AdminDashboard() {
  const [stats,         setStats]         = useState<AdminStats | null>(null)
  const [statsState,    setStatsState]    = useState<LoadState>('loading')
  const [posts,         setPosts]         = useState<Post[]>([])
  const [postsState,    setPostsState]    = useState<LoadState>('loading')
  const [bookings,      setBookings]      = useState<Booking[]>([])
  const [bookingsState, setBookingsState] = useState<LoadState>('loading')
  const [waitlist,      setWaitlist]      = useState<WaitlistEntry[]>([])
  const [waitlistState, setWaitlistState] = useState<LoadState>('loading')
  const [statsError,    setStatsError]    = useState('')

  const loadAll = useCallback(async () => {
    // Parallel fetch — independent 3-state per section
    const [sRes, pRes, bRes, wRes] = await Promise.allSettled([
      getAdminStats(),
      getPosts({ limit: 5 }),
      getBookings({ limit: 5 }),
      getWaitlist(),
    ])

    if (sRes.status === 'fulfilled') {
      if (sRes.value.ok) { setStats(sRes.value.data); setStatsState('success') }
      else { setStatsError(sRes.value.error); setStatsState('error') }
    } else { setStatsState('error') }

    if (pRes.status === 'fulfilled' && pRes.value.ok) { setPosts(pRes.value.data); setPostsState('success') }
    else setPostsState('error')

    if (bRes.status === 'fulfilled' && bRes.value.ok) { setBookings(bRes.value.data); setBookingsState('success') }
    else setBookingsState('error')

    if (wRes.status === 'fulfilled' && wRes.value.ok) { setWaitlist(wRes.value.data); setWaitlistState('success') }
    else setWaitlistState('error')
  }, [])

  useEffect(() => { loadAll() }, [loadAll])

  // Stats card definitions
  const STATS_CARDS = [
    {
      label: 'Published posts',
      value: stats?.published_posts ?? '—',
      sub:   `${stats?.draft_posts ?? 0} drafts`,
      icon:  Icon.article,
      accent: '#C0392B',
    },
    {
      label: 'Consultation bookings',
      value: stats?.active_bookings ?? '—',
      sub:   `${stats?.new_bookings_7d ?? 0} this week`,
      icon:  Icon.calendar,
      accent: '#1B998B',
    },
    {
      label: 'Waitlist total',
      value: stats?.waitlist_total ?? '—',
      sub:   `${stats?.waitlist_7d ?? 0} this week`,
      icon:  Icon.layers,
      accent: '#C9A84C',
    },
    {
      label: 'Subscribers',
      value: stats?.confirmed_subscribers ?? '—',
      sub:   'confirmed',
      icon:  Icon.mail,
      accent: '#C0392B',
    },
    {
      label: 'New contacts',
      value: stats?.new_contacts_7d ?? '—',
      sub:   'last 7 days',
      icon:  Icon.user,
      accent: '#1B998B',
    },
    {
      label: 'Total post views',
      value: stats?.total_post_views ?? '—',
      sub:   'all time',
      icon:  Icon.trending,
      accent: '#C9A84C',
    },
  ]

  return (
    <div className="max-w-6xl">
      <PageHeader
        title="Dashboard"
        subtitle={`Good ${new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'} — here's what's happening.`}
        action={
          <button onClick={loadAll}
            className="flex items-center gap-2 px-3 py-2 rounded-xl border border-void/10 dark:border-whisper/10 text-xs text-void/50 dark:text-whisper/50 hover:border-void/25 dark:hover:border-whisper/25 transition-all cursor-pointer">
            {Icon.refresh} Refresh
          </button>
        }
      />

      {/* Stats grid */}
      {statsState === 'error' && (
        <ErrorState message={statsError} onRetry={loadAll} />
      )}

      {statsState !== 'error' && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-7">
          {STATS_CARDS.map((card) => (
            <StatsCard key={card.label} {...card} loading={statsState === 'loading'} />
          ))}
        </div>
      )}

      {/* Lower grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Recent bookings */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-950 rounded-2xl border border-void/8 dark:border-whisper/8 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-void/6 dark:border-whisper/6">
            <h2 className="font-display font-semibold text-sm text-void dark:text-whisper">Recent bookings</h2>
            <Link href="/admin/bookings" className="text-xs text-crimson hover:underline">View all</Link>
          </div>
          <RecentBookings
            bookings={bookings}
            loading={bookingsState === 'loading'}
            error={bookingsState === 'error' ? 'Could not load bookings.' : ''}
            onRetry={loadAll}
          />
        </div>

        {/* Waitlist */}
        <div className="bg-white dark:bg-gray-950 rounded-2xl border border-void/8 dark:border-whisper/8 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-void/6 dark:border-whisper/6">
            <h2 className="font-display font-semibold text-sm text-void dark:text-whisper">Waitlist</h2>
            <Link href="/admin/waitlist" className="text-xs text-crimson hover:underline">View all</Link>
          </div>
          <WaitlistSummary entries={waitlist} loading={waitlistState === 'loading'} />
        </div>

        {/* Recent posts */}
        <div className="lg:col-span-3 bg-white dark:bg-gray-950 rounded-2xl border border-void/8 dark:border-whisper/8 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-void/6 dark:border-whisper/6">
            <h2 className="font-display font-semibold text-sm text-void dark:text-whisper">Recent posts</h2>
            <div className="flex items-center gap-3">
              <Link href="/admin/blog" className="text-xs text-void/40 dark:text-whisper/40 hover:text-void dark:hover:text-whisper transition-colors">View all</Link>
              <Link href="/admin/blog/new"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-crimson/8 text-crimson text-xs font-semibold hover:bg-crimson/15 transition-colors">
                {Icon.plus} New post
              </Link>
            </div>
          </div>
          <RecentPosts
            posts={posts}
            loading={postsState === 'loading'}
            error={postsState === 'error' ? 'Could not load posts.' : ''}
            onRetry={loadAll}
          />
        </div>
      </div>
    </div>
  )
}
