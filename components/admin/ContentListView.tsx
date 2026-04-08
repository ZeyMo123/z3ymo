'use client'

import { useEffect, useState, useCallback, useTransition } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { getContentItems, deleteContentItem } from '@/lib/admin/actions'
import type { ContentItem } from '@/lib/admin/actions'
import {
  PageHeader, StatusBadge, ErrorState, EmptyState,
  LoadingState, SearchInput, FilterChip, ConfirmDialog, Icon,
} from '@/components/admin/ui'

// ─── Helpers ──────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}

// ─── Types ────────────────────────────────────────────────────

type Filter = 'all' | 'published' | 'draft' | 'archived'

interface Props {
  type:        ContentItem['type']
  title:       string
  description: string
  singularLabel: string // "guide" | "doc" | "case study"
  backPath:    string   // "/admin/content/guides" etc.
}

// ─── Component ────────────────────────────────────────────────

export default function ContentListView({
  type, title, description, singularLabel, backPath,
}: Props) {
  const router = useRouter()

  const [items,     setItems]     = useState<ContentItem[]>([])
  const [loadState, setLoadState] = useState<'loading' | 'success' | 'error'>('loading')
  const [search,    setSearch]    = useState('')
  const [filter,    setFilter]    = useState<Filter>('all')
  const [confirmId, setConfirmId] = useState<string | null>(null)
  const [deleting,  startDelete]  = useTransition()

  const load = useCallback(async () => {
    setLoadState('loading')
    const res = await getContentItems(type)
    if (res.ok) { setItems(res.data); setLoadState('success') }
    else setLoadState('error')
  }, [type])

  useEffect(() => { load() }, [load])

  // Filter + search
  const visible = items.filter((it) => {
    const matchFilter = filter === 'all' || it.status === filter
    const matchSearch = !search || it.title.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const counts: Record<Filter, number> = {
    all:       items.length,
    published: items.filter((x) => x.status === 'published').length,
    draft:     items.filter((x) => x.status === 'draft').length,
    archived:  items.filter((x) => x.status === 'archived').length,
  }

  function handleDeleteConfirm() {
    if (!confirmId) return
    const id = confirmId
    setConfirmId(null)
    startDelete(async () => {
      await deleteContentItem(id)
      setItems((prev) => prev.filter((x) => x.id !== id))
    })
  }

  function newItemUrl() {
    return `/admin/content/new?type=${type}`
  }

  function editItemUrl(id: string) {
    return `/admin/content/new?type=${type}&id=${id}`
  }

  return (
    <div className="max-w-5xl">
      <PageHeader
        title={title}
        subtitle={description}
        action={
          <button
            onClick={() => router.push(newItemUrl())}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-crimson text-white text-sm font-semibold hover:bg-crimson/90 transition-colors cursor-pointer"
          >
            {Icon.plus} New {singularLabel}
          </button>
        }
      />

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex-1 max-w-xs">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder={`Search ${singularLabel}s…`}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(['all', 'published', 'draft', 'archived'] as Filter[]).map((f) => (
            <FilterChip
              key={f}
              label={`${f.charAt(0).toUpperCase() + f.slice(1)} (${counts[f]})`}
              active={filter === f}
              onClick={() => setFilter(f)}
            />
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-950 rounded-2xl border border-void/8 dark:border-whisper/8 overflow-hidden">
        {loadState === 'loading' && (
          <div className="p-5">
            <LoadingState message={`Loading ${singularLabel}s…`} />
          </div>
        )}

        {loadState === 'error' && <ErrorState onRetry={load} />}

        {loadState === 'success' && visible.length === 0 && (
          <EmptyState
            icon="article"
            title={search ? `No ${singularLabel}s match your search` : `No ${singularLabel}s yet`}
            description={
              search
                ? 'Try a different search term.'
                : `Create your first ${singularLabel} to get started.`
            }
            action={
              !search
                ? { label: `New ${singularLabel}`, onClick: () => router.push(newItemUrl()) }
                : undefined
            }
          />
        )}

        {loadState === 'success' && visible.length > 0 && (
          <>
            {/* Header row */}
            <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-void/6 dark:border-whisper/6 text-[10px] font-semibold uppercase tracking-wider text-void/30 dark:text-whisper/30">
              <div className="col-span-5">Title</div>
              <div className="col-span-2 hidden md:block">Category</div>
              <div className="col-span-2 hidden sm:block">Date</div>
              <div className="col-span-1 hidden sm:block">Views</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-1 text-right">Actions</div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-void/5 dark:divide-whisper/5">
              <AnimatePresence>
                {visible.map((it, i) => (
                  <motion.div
                    key={it.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ delay: i * 0.025 }}
                    className={[
                      'grid grid-cols-12 gap-4 px-5 py-4 items-center hover:bg-void/2 dark:hover:bg-whisper/2 transition-colors',
                      deleting ? 'opacity-40 pointer-events-none' : '',
                    ].join(' ')}
                  >
                    {/* Title */}
                    <div className="col-span-5 min-w-0">
                      <button
                        onClick={() => router.push(editItemUrl(it.id))}
                        className="text-sm font-medium text-void dark:text-whisper hover:text-crimson transition-colors line-clamp-1 text-left w-full cursor-pointer"
                      >
                        {it.title}
                      </button>
                      {it.excerpt && (
                        <p className="text-[11px] text-void/35 dark:text-whisper/35 mt-0.5 line-clamp-1">
                          {it.excerpt}
                        </p>
                      )}
                    </div>

                    {/* Category */}
                    <div className="col-span-2 hidden md:block">
                      {it.category ? (
                        <span className="text-[10px] text-void/50 dark:text-whisper/50 bg-void/6 dark:bg-whisper/6 px-2 py-0.5 rounded-md">
                          {it.category}
                        </span>
                      ) : (
                        <span className="text-[11px] text-void/20 dark:text-whisper/20">—</span>
                      )}
                    </div>

                    {/* Date */}
                    <div className="col-span-2 hidden sm:block text-[11px] text-void/40 dark:text-whisper/40">
                      {formatDate(it.created_at)}
                    </div>

                    {/* Views */}
                    <div className="col-span-1 hidden sm:block text-[11px] text-void/40 dark:text-whisper/40 font-mono">
                      {it.views.toLocaleString()}
                    </div>

                    {/* Status */}
                    <div className="col-span-1">
                      <StatusBadge status={it.status} />
                    </div>

                    {/* Actions */}
                    <div className="col-span-1 flex items-center justify-end gap-1">
                      <button
                        onClick={() => router.push(editItemUrl(it.id))}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-void/35 dark:text-whisper/35 hover:bg-void/8 dark:hover:bg-whisper/8 hover:text-void dark:hover:text-whisper transition-all cursor-pointer"
                        title="Edit"
                      >
                        {Icon.edit}
                      </button>
                      {it.status === 'published' && (
                        <a
                          href={`/${it.type}/${it.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-void/35 dark:text-whisper/35 hover:bg-void/8 dark:hover:bg-whisper/8 hover:text-void dark:hover:text-whisper transition-all"
                          title="View live"
                        >
                          {Icon.eye}
                        </a>
                      )}
                      <button
                        onClick={() => setConfirmId(it.id)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-void/25 dark:text-whisper/25 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-500 transition-all cursor-pointer"
                        title="Delete"
                      >
                        {Icon.trash}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>

      <ConfirmDialog
        open={!!confirmId}
        title={`Delete this ${singularLabel}?`}
        message="This will permanently delete the content and cannot be undone."
        confirmLabel="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setConfirmId(null)}
      />
    </div>
  )
}
