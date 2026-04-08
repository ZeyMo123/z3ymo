'use client'

import { useEffect, useState, useCallback, useTransition } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { getPosts, deletePost } from '@/lib/admin/actions'
import type { Post } from '@/lib/admin/actions'
import {
  PageHeader, SearchInput, FilterChip, StatusBadge,
  ErrorState, EmptyState, LoadingState, ConfirmDialog, Icon,
} from '@/components/admin/ui'

type LoadState = 'loading' | 'success' | 'error'
type Filter    = 'all' | 'published' | 'draft'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function AdminBlogPage() {
  const [posts,     setPosts]     = useState<Post[]>([])
  const [loadState, setLoadState] = useState<LoadState>('loading')
  const [error,     setError]     = useState('')
  const [search,    setSearch]    = useState('')
  const [filter,    setFilter]    = useState<Filter>('all')
  const [deleting,  setDeleting]  = useState<string | null>(null)
  const [confirmId, setConfirmId] = useState<string | null>(null)
  const [, startTransition] = useTransition()

  const load = useCallback(async () => {
    setLoadState('loading')
    const res = await getPosts({ limit: 100 })
    if (res.ok) { setPosts(res.data); setLoadState('success') }
    else { setError(res.error); setLoadState('error') }
  }, [])

  useEffect(() => { load() }, [load])

  // Filter + search
  const visible = posts.filter((p) => {
    const matchStatus = filter === 'all' || (filter === 'published' ? p.published : !p.published)
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  const counts = {
    all:       posts.length,
    published: posts.filter(p => p.published).length,
    draft:     posts.filter(p => !p.published).length,
  }

  function handleDeleteConfirm() {
    if (!confirmId) return
    const id = confirmId
    setConfirmId(null)
    setDeleting(id)
    startTransition(async () => {
      await deletePost(id)
      setPosts(prev => prev.filter(p => p.id !== id))
      setDeleting(null)
    })
  }

  return (
    <div className="max-w-5xl">
      <PageHeader
        title="Blog posts"
        subtitle="Write, manage, and publish your content"
        action={
          <Link href="/admin/blog/new"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-crimson text-white text-sm font-semibold hover:bg-crimson/90 transition-colors">
            {Icon.plus} New post
          </Link>
        }
      />

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex-1 max-w-xs">
          <SearchInput value={search} onChange={setSearch} placeholder="Search posts…" />
        </div>
        <div className="flex gap-2">
          {(['all', 'published', 'draft'] as Filter[]).map((f) => (
            <FilterChip key={f} label={`${f.charAt(0).toUpperCase() + f.slice(1)} (${counts[f]})`}
              active={filter === f} onClick={() => setFilter(f)} />
          ))}
        </div>
      </div>

      {/* States */}
      <div className="bg-white dark:bg-gray-950 rounded-2xl border border-void/8 dark:border-whisper/8 overflow-hidden">
        {loadState === 'loading' && <div className="p-5"><LoadingState message="Loading posts…" /></div>}

        {loadState === 'error' && <ErrorState message={error} onRetry={load} />}

        {loadState === 'success' && visible.length === 0 && (
          <EmptyState
            icon="article"
            title={search ? 'No posts match your search' : 'No posts yet'}
            description={search ? 'Try a different search term.' : 'Start writing your first post.'}
            action={!search ? { label: 'New post', onClick: () => window.location.href = '/admin/blog/new' } : undefined}
          />
        )}

        {loadState === 'success' && visible.length > 0 && (
          <>
            {/* Table header */}
            <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-void/6 dark:border-whisper/6 text-[10px] font-semibold uppercase tracking-wider text-void/30 dark:text-whisper/30">
              <div className="col-span-5">Title</div>
              <div className="col-span-2 hidden md:block">Category</div>
              <div className="col-span-2 hidden sm:block">Date</div>
              <div className="col-span-1 hidden sm:block">Views</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-1 text-right">Actions</div>
            </div>

            <div className="divide-y divide-void/5 dark:divide-whisper/5">
              <AnimatePresence>
                {visible.map((post, i) => (
                  <motion.div key={post.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ delay: i * 0.02 }}
                    className={[
                      'grid grid-cols-12 gap-4 px-5 py-4 items-center hover:bg-void/2 dark:hover:bg-whisper/2 transition-colors',
                      deleting === post.id ? 'opacity-40 pointer-events-none' : '',
                    ].join(' ')}
                  >
                    {/* Title */}
                    <div className="col-span-5 min-w-0">
                      <Link href={`/admin/blog/${post.id}`}
                        className="text-sm font-medium text-void dark:text-whisper hover:text-crimson transition-colors line-clamp-1">
                        {post.title}
                      </Link>
                      <p className="text-[11px] text-void/35 dark:text-whisper/35 mt-0.5 line-clamp-1">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Category */}
                    <div className="col-span-2 hidden md:block">
                      {post.categories ? (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-md"
                          style={{ background: `${post.categories.color}15`, color: post.categories.color }}>
                          {post.categories.name}
                        </span>
                      ) : <span className="text-[11px] text-void/25 dark:text-whisper/25">—</span>}
                    </div>

                    {/* Date */}
                    <div className="col-span-2 hidden sm:block text-[11px] text-void/40 dark:text-whisper/40">
                      {formatDate(post.created_at)}
                    </div>

                    {/* Views */}
                    <div className="col-span-1 hidden sm:block text-[11px] text-void/40 dark:text-whisper/40 font-mono">
                      {post.views.toLocaleString()}
                    </div>

                    {/* Status */}
                    <div className="col-span-1">
                      <StatusBadge status={post.published ? 'published' : 'draft'} />
                    </div>

                    {/* Actions */}
                    <div className="col-span-1 flex items-center justify-end gap-1">
                      <Link href={`/admin/blog/${post.id}`}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-void/35 dark:text-whisper/35 hover:bg-void/8 dark:hover:bg-whisper/8 hover:text-void dark:hover:text-whisper transition-all">
                        {Icon.edit}
                      </Link>
                      {post.published && (
                        <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer"
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-void/35 dark:text-whisper/35 hover:bg-void/8 dark:hover:bg-whisper/8 hover:text-void dark:hover:text-whisper transition-all">
                          {Icon.eye}
                        </a>
                      )}
                      <button onClick={() => setConfirmId(post.id)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-void/25 dark:text-whisper/25 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-500 transition-all cursor-pointer">
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
        title="Delete post?"
        message="This will permanently delete the post and cannot be undone."
        confirmLabel="Delete post"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setConfirmId(null)}
      />
    </div>
  )
}
