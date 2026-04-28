'use client'

// ─────────────────────────────────────────────────────────────────
// app/admin/(dashboard)/content/case-studies/page.tsx
//
// Lists all guides from content_items (type = 'guide').
// ✓ "New Case Study"  → /admin/content/case-studies/new
// ✓ Edit item    → /admin/content/guides/[id]
// ✗ Never uses   /admin/content/new?type=guide
// ─────────────────────────────────────────────────────────────────

import { useEffect, useState }    from 'react'
import Link                       from 'next/link'
import { supabase }               from '@/lib/supabase/client'

// ─── Types ────────────────────────────────────────────────────────

interface ContentItem {
  id:           string
  title:        string
  slug:         string
  status:       'draft' | 'published' | 'archived'
  featured:     boolean
  read_time:    number | null
  views:        number | null
  author_name:  string
  created_at:   string
  updated_at:   string
}

// ─── Helpers ──────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}

// ─── Empty state ──────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-3xl bg-emerald/8 flex items-center justify-center mb-5">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
          stroke="#1B998B" strokeWidth="1.5" strokeLinecap="round">
          <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
      <h3 className="font-display font-bold text-lg text-void dark:text-whisper mb-2">
        No case studies yet
      </h3>
      <p className="text-sm text-void/45 dark:text-whisper/45 mb-6 max-w-xs">
        Document your first project to show real-world results with your audience.
      </p>
      <Link
        href="/admin/content/case-studies/new"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-crimson text-white text-sm font-semibold hover:bg-crimson/90 transition-colors cursor-pointer"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Write first case study
      </Link>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────

export default function CaseStudiesAdminPage() {
  type State = 'loading' | 'error' | 'success'
  const [state,  setState]  = useState<State>('loading')
  const [items,  setItems]  = useState<ContentItem[]>([])
  const [errMsg, setErrMsg] = useState('')
  const [search, setSearch] = useState('')

  function load() {
    setState('loading')
    setErrMsg('')
    supabase
      .from('content_items')
      .select('id, title, slug, status, featured, read_time, views, author_name, created_at, updated_at')
      .eq('type', 'case-study')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) { setErrMsg(error.message); setState('error'); return }
        setItems((data ?? []) as ContentItem[])
        setState('success')
      })
  }

  useEffect(() => { load() }, [])

  const filtered = items.filter(i =>
    i.title.toLowerCase().includes(search.toLowerCase())
  )

  // ── Loading ──
  if (state === 'loading') return (
    <div className="min-h-screen bg-whisper dark:bg-void flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 rounded-full border-2 border-emerald/30 border-t-emerald animate-spin" />
        <p className="text-sm text-void/40 dark:text-whisper/40">Loading case studies…</p>
      </div>
    </div>
  )

  // ── Error ──
  if (state === 'error') return (
    <div className="min-h-screen bg-whisper dark:bg-void flex items-center justify-center px-6">
      <div className="text-center">
        <p className="font-semibold text-void dark:text-whisper mb-2">Failed to load case studies</p>
        <p className="text-sm text-void/50 dark:text-whisper/50 mb-5">{errMsg}</p>
        <button onClick={load}
          className="px-5 py-2.5 rounded-full bg-void dark:bg-whisper text-whisper dark:text-void text-sm font-semibold cursor-pointer hover:opacity-90 transition-opacity">
          Retry
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-whisper dark:bg-void">

      {/* Top bar */}
      <div className="sticky top-0 lg:top-0 z-10 bg-whisper/95 dark:bg-void/95 backdrop-blur-xl
        border-b border-void/8 dark:border-whisper/8">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <div>
            <h1 className="font-display font-bold text-lg text-void dark:text-whisper">Case Studies</h1>
            <p className="text-xs text-void/40 dark:text-whisper/40">
              {items.length} 
              {' · '}
              {items.filter(i => i.status === 'published').length} published
            </p>
          </div>

          {/* ✓ Correct route — /admin/content/case-studies/new */}
          <Link
            href="/admin/content/case-studies/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-crimson text-white text-sm font-semibold hover:bg-crimson/90 transition-colors cursor-pointer shadow-sm shadow-crimson/20"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New Case Study
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Search */}
        {items.length > 0 && (
          <div className="relative mb-6">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-void/30 dark:text-whisper/30">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search case studies…"
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-void/10 dark:border-whisper/10
                bg-transparent text-void dark:text-whisper text-sm
                placeholder:text-void/30 dark:placeholder:text-whisper/30
                focus:outline-none focus:border-crimson/40 focus:ring-2 focus:ring-crimson/8
                transition-all"
            />
          </div>
        )}

        {/* Empty state */}
        {items.length === 0 && <EmptyState />}

        {/* No search results */}
        {items.length > 0 && filtered.length === 0 && (
          <p className="text-center py-16 text-void/40 dark:text-whisper/40 text-sm">
            No case studies match "<span className="text-void dark:text-whisper">{search}</span>"
          </p>
        )}

        {/* List */}
        {filtered.length > 0 && (
          <div className="space-y-2">
            {filtered.map(item => (
              // ✓ Correct route — /admin/content/guides/[id]
              <Link
                key={item.id}
                href={`/admin/content/case-studies/${item.id}`}
                className="flex items-center gap-4 p-4 rounded-2xl border border-void/8 dark:border-whisper/8
                  bg-white/60 dark:bg-whisper/3 hover:border-void/16 dark:hover:border-whisper/16
                  hover:shadow-sm transition-all group"
              >
                {/* Status dot */}
                <div className={[
                  'w-2 h-2 rounded-full flex-shrink-0',
                  item.status === 'published' ? 'bg-emerald' : 'bg-void/20 dark:bg-whisper/20',
                ].join(' ')} title={item.status === 'published' ? 'Published' : item.status === 'archived' ? 'Archived' : 'Draft'} />

                {/* Title + meta */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-void dark:text-whisper text-sm group-hover:text-crimson transition-colors truncate">
                      {item.title}
                    </span>
                    {item.featured && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-gold/10 text-gold flex-shrink-0">
                        Featured
                      </span>
                    )}
                    {item.status !== 'published' && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-void/6 dark:bg-whisper/6 text-void/40 dark:text-whisper/40 flex-shrink-0">
                        Draft
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-[11px] text-void/35 dark:text-whisper/35 flex-wrap">
                    <span>{item.author_name}</span>
                    {item.read_time && <span>{item.read_time} min read</span>}
                    {item.views != null && <span>{item.views} views</span>}
                    <span>Updated {formatDate(item.updated_at)}</span>
                  </div>
                </div>

                {/* Edit chevron */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                  className="flex-shrink-0 text-void/20 dark:text-whisper/20 group-hover:text-crimson/60 transition-colors">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
