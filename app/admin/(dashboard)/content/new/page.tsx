'use client'

import { useEffect, useState, useTransition } from 'react'
import { Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { upsertContentItem, getContentItem } from '@/lib/admin/actions'
import type { ContentItem } from '@/lib/admin/actions'
import { LoadingState, ErrorState, Icon } from '@/components/admin/ui'
import { motion } from 'framer-motion'

const TYPE_LABELS: Record<string, string> = {
  'guide':      'Guide',
  'doc':        'Documentation',
  'case-study': 'Case study',
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

const INPUT_CLS = 'w-full px-4 py-3 rounded-xl border border-void/10 dark:border-whisper/10 bg-transparent text-void dark:text-whisper text-sm placeholder:text-void/30 dark:placeholder:text-whisper/30 focus:outline-none focus:border-crimson/40 focus:ring-2 focus:ring-crimson/8 transition-all'

function ContentEditorInner() {
  const router       = useRouter()
  const params       = useSearchParams()
  const type         = params.get('type') as ContentItem['type'] | null
  const id           = params.get('id')
  const isEdit       = !!id
  const [isPending, startT] = useTransition()

  const [item,    setItem]    = useState<Partial<ContentItem>>({
    type:        type ?? 'guide',
    title:       '',
    slug:        '',
    excerpt:     '',
    content:     '',
    status:      'draft',
    author_name: 'Z3ymo Team',
    category:    '',
    read_time:   5,
    featured:    false,
  })
  const [loadState, setLoadState] = useState<'idle' | 'loading' | 'error'>(isEdit ? 'loading' : 'idle')
  const [saveError, setSaveError] = useState('')
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  // Load existing item
  useEffect(() => {
    if (!id) return
    getContentItem(id).then((res) => {
      if (res.ok) { setItem(res.data); setLoadState('idle') }
      else setLoadState('error')
    })
  }, [id])

  // Auto-slug
  useEffect(() => {
    if (!isEdit) setItem((prev) => ({ ...prev, slug: slugify(prev.title ?? '') }))
  }, [item.title, isEdit])

  const typeLabel = TYPE_LABELS[item.type ?? 'guide'] ?? 'Content'

  function save(status?: ContentItem['status']) {
    setSaveError('')
    const finalStatus = status ?? item.status ?? 'draft'
    startT(async () => {
      const res = await upsertContentItem({ ...item as any, id: id ?? undefined, status: finalStatus })
      if (res.ok) {
        setItem(res.data)
        setLastSaved(new Date())
        if (!isEdit) router.replace(`/admin/content/new?type=${item.type}&id=${res.data.id}`)
      } else {
        setSaveError(res.error)
      }
    })
  }

  if (loadState === 'loading') return <div className="p-6"><LoadingState /></div>
  if (loadState === 'error')   return <ErrorState title="Could not load item" />

  const backHref = `/admin/content/${item.type === 'case-study' ? 'case-studies' : (item.type ?? 'guides') + 's'}`

  return (
    <div className="max-w-4xl">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6 pb-5 border-b border-void/8 dark:border-whisper/8">
        <div className="flex items-center gap-2 text-sm text-void/50 dark:text-whisper/50">
          <button onClick={() => router.push(backHref)}
            className="hover:text-void dark:hover:text-whisper transition-colors cursor-pointer flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            {typeLabel}s
          </button>
          <span className="text-void/20 dark:text-whisper/20">/</span>
          <span className="text-void/70 dark:text-whisper/70 font-medium">
            {isEdit ? (item.title || 'Edit') : `New ${typeLabel}`}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {lastSaved && (
            <span className="text-[11px] text-void/30 dark:text-whisper/30 hidden sm:block">
              Saved {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
          <button onClick={() => save('draft')} disabled={isPending || !item.title}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-void/10 dark:border-whisper/10 text-xs font-medium text-void/55 dark:text-whisper/55 hover:border-void/25 dark:hover:border-whisper/25 disabled:opacity-40 transition-all cursor-pointer">
            {isPending ? Icon.spinner : Icon.edit} Save draft
          </button>
          <button onClick={() => save('published')} disabled={isPending || !item.title || !item.content}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-crimson text-white text-xs font-semibold hover:bg-crimson/90 disabled:opacity-40 transition-all cursor-pointer">
            {isPending ? Icon.spinner : Icon.check} {item.status === 'published' ? 'Update' : 'Publish'}
          </button>
        </div>
      </div>

      {saveError && (
        <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-red-600 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 px-4 py-3 rounded-xl mb-5">
          {Icon.alert} {saveError}
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-5">
        <div className="space-y-4">
          {/* Title */}
          <input value={item.title ?? ''} onChange={(e) => setItem((p) => ({ ...p, title: e.target.value }))}
            placeholder={`${typeLabel} title…`}
            className="w-full text-2xl font-display font-bold text-void dark:text-whisper placeholder:text-void/20 dark:placeholder:text-whisper/20 bg-transparent border-0 outline-none" />

          {/* Slug */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-void/30 dark:text-whisper/30">z3ymo.com/{item.type}/</span>
            <input value={item.slug ?? ''} onChange={(e) => setItem((p) => ({ ...p, slug: slugify(e.target.value) }))}
              className="flex-1 bg-void/4 dark:bg-whisper/4 rounded-lg px-3 py-1.5 text-void/60 dark:text-whisper/60 border-0 outline-none focus:bg-void/8 dark:focus:bg-whisper/8 transition-colors font-mono" />
          </div>

          {/* Excerpt */}
          <textarea value={item.excerpt ?? ''} onChange={(e) => setItem((p) => ({ ...p, excerpt: e.target.value }))}
            rows={2} placeholder="Brief description shown in listings…"
            className={`${INPUT_CLS} resize-none`} />

          {/* Content */}
          <textarea value={item.content ?? ''} onChange={(e) => setItem((p) => ({ ...p, content: e.target.value }))}
            rows={24} placeholder="Write your MDX content here…"
            className={`${INPUT_CLS} resize-y font-mono leading-relaxed min-h-96`} />
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-950 rounded-2xl border border-void/8 dark:border-whisper/8 p-5 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-void/40 dark:text-whisper/40">Settings</h3>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-void/35 dark:text-whisper/35 mb-1.5">Category</label>
              <input value={item.category ?? ''} onChange={(e) => setItem((p) => ({ ...p, category: e.target.value }))}
                placeholder="e.g. Getting started" className={INPUT_CLS} />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-void/35 dark:text-whisper/35 mb-1.5">Author</label>
              <input value={item.author_name ?? ''} onChange={(e) => setItem((p) => ({ ...p, author_name: e.target.value }))}
                placeholder="Author name" className={INPUT_CLS} />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-void/60 dark:text-whisper/60">Featured</span>
              <button type="button" onClick={() => setItem((p) => ({ ...p, featured: !p.featured }))}
                className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${item.featured ? 'bg-crimson' : 'bg-void/15 dark:bg-whisper/15'}`}>
                <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${item.featured ? 'translate-x-5' : ''}`} />
              </button>
            </div>

            {item.status === 'published' && (
              <button onClick={() => save('archived')}
                className="w-full py-2 rounded-xl border border-void/10 dark:border-whisper/10 text-xs text-void/45 dark:text-whisper/45 hover:border-void/25 dark:hover:border-whisper/25 transition-all cursor-pointer">
                Archive
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ContentNewPage() {
  return (
    <Suspense fallback={<div className="p-6"><LoadingState /></div>}>
      <ContentEditorInner />
    </Suspense>
  )
}
