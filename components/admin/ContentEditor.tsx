'use client'

import { useState, useEffect, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { updatePost, createPost, getCategories } from '@/lib/admin/actions'
import type { Post } from '@/lib/admin/actions'
import { Icon } from '@/components/admin/ui'

// ─── Slugify helper ───────────────────────────────────────────

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

// ─── Word / reading time counter ─────────────────────────────

function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length
}

function estimateReadTime(text: string) {
  return Math.max(1, Math.round(countWords(text) / 200))
}

// ─── Field ────────────────────────────────────────────────────

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold uppercase tracking-wider text-void/45 dark:text-whisper/45">
        {label}
      </label>
      {hint && <p className="text-[11px] text-void/35 dark:text-whisper/35">{hint}</p>}
      {children}
    </div>
  )
}

const INPUT_CLS = 'w-full px-4 py-3 rounded-xl border border-void/10 dark:border-whisper/10 bg-transparent text-void dark:text-whisper text-sm placeholder:text-void/30 dark:placeholder:text-whisper/30 focus:outline-none focus:border-crimson/40 focus:ring-2 focus:ring-crimson/8 transition-all'

// ─── Toolbar buttons for MDX ──────────────────────────────────

const MDX_TOOLS = [
  { label: '**B**', insert: '**bold**' },
  { label: '_I_',  insert: '_italic_' },
  { label: 'H2',   insert: '\n## Heading\n' },
  { label: 'H3',   insert: '\n### Heading\n' },
  { label: '—',    insert: '\n---\n' },
  { label: '• ',   insert: '\n- Item\n' },
  { label: '1.',   insert: '\n1. Item\n' },
  { label: '`c`',  insert: '`code`' },
  { label: '```',  insert: '\n```typescript\ncode\n```\n' },
  { label: '> ',   insert: '\n> Blockquote\n' },
  { label: '[L]',  insert: '[Link text](https://example.com)' },
]

// ─── Main editor ──────────────────────────────────────────────

interface Props {
  initial?: Partial<Post>
  mode:     'new' | 'edit'
}

export default function ContentEditor({ initial = {}, mode }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  // Form state
  const [title,       setTitle]       = useState(initial.title       ?? '')
  const [slug,        setSlug]        = useState(initial.slug        ?? '')
  const [excerpt,     setExcerpt]     = useState(initial.excerpt     ?? '')
  const [content,     setContent]     = useState(initial.content     ?? '')
  const [coverImage,  setCoverImage]  = useState(initial.cover_image ?? '')
  const [coverAlt,    setCoverAlt]    = useState(initial.cover_alt   ?? '')
  const [categoryId,  setCategoryId]  = useState(initial.category_id ?? '')
  const [authorName,  setAuthorName]  = useState(initial.author_name ?? 'Z3ymo Team')
  const [authorRole,  setAuthorRole]  = useState(initial.author_role ?? 'Editor')
  const [featured,    setFeatured]    = useState(initial.featured    ?? false)
  const [published,   setPublished]   = useState(initial.published   ?? false)
  const [readTime,    setReadTime]    = useState(initial.read_time   ?? 5)

  const [categories,  setCategories]  = useState<any[]>([])
  const [saveError,   setSaveError]   = useState('')
  const [lastSaved,   setLastSaved]   = useState<Date | null>(null)
  const [preview,     setPreview]     = useState(false)

  // Auto-generate slug from title (new posts only)
  useEffect(() => {
    if (mode === 'new' && title) setSlug(slugify(title))
  }, [title, mode])

  // Auto-update reading time
  useEffect(() => {
    setReadTime(estimateReadTime(content))
  }, [content])

  // Load categories
  useEffect(() => {
    getCategories().then((r) => { if (r.ok) setCategories(r.data) })
  }, [])

  function insertMarkdown(insert: string) {
    setContent((prev) => prev + insert)
  }

  function save(publishOverride?: boolean) {
    setSaveError('')
    const shouldPublish = publishOverride ?? published

    startTransition(async () => {
      const payload = {
        title, slug, excerpt, content, cover_image: coverImage || null,
        cover_alt: coverAlt || null, category_id: categoryId || null,
        author_name: authorName, author_role: authorRole,
        read_time: readTime, featured, published: shouldPublish,
      }

      const res = mode === 'new'
        ? await createPost(payload)
        : await updatePost(initial.id!, payload)

      if (res.ok) {
        setLastSaved(new Date())
        setPublished(shouldPublish)
        if (mode === 'new') router.push(`/admin/blog/${res.data.id}`)
      } else {
        setSaveError(res.error)
      }
    })
  }

  const wordCount = countWords(content)

  return (
    <div className="max-w-5xl">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6 pb-5 border-b border-void/8 dark:border-whisper/8">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push('/admin/blog')}
            className="flex items-center gap-1.5 text-sm text-void/45 dark:text-whisper/45 hover:text-void dark:hover:text-whisper transition-colors cursor-pointer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            Posts
          </button>
          <span className="text-void/20 dark:text-whisper/20">/</span>
          <span className="text-sm text-void/70 dark:text-whisper/70 font-medium">
            {mode === 'new' ? 'New post' : (title || 'Edit post')}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Meta info */}
          <div className="hidden sm:flex items-center gap-3 text-[11px] text-void/35 dark:text-whisper/35 mr-2">
            <span>{wordCount.toLocaleString()} words</span>
            <span>·</span>
            <span>{readTime} min read</span>
            {lastSaved && <>
              <span>·</span>
              <span>Saved {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </>}
          </div>

          {/* Preview toggle */}
          <button onClick={() => setPreview(!preview)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-void/10 dark:border-whisper/10 text-xs text-void/50 dark:text-whisper/50 hover:border-void/25 dark:hover:border-whisper/25 transition-all cursor-pointer">
            {Icon.eye} {preview ? 'Editor' : 'Preview'}
          </button>

          {/* Save draft */}
          <button onClick={() => save(false)}
            disabled={isPending || !title}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-void/10 dark:border-whisper/10 text-xs font-medium text-void/60 dark:text-whisper/60 hover:border-void/25 dark:hover:border-whisper/25 disabled:opacity-40 transition-all cursor-pointer">
            {isPending ? Icon.spinner : Icon.edit} Save draft
          </button>

          {/* Publish */}
          <button onClick={() => save(true)}
            disabled={isPending || !title || !content}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-crimson text-white text-xs font-semibold hover:bg-crimson/90 disabled:opacity-40 transition-all cursor-pointer">
            {isPending ? Icon.spinner : Icon.check} {published ? 'Update' : 'Publish'}
          </button>
        </div>
      </div>

      {saveError && (
        <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2.5 text-sm text-red-600 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 px-4 py-3 rounded-xl mb-5">
          {Icon.alert} {saveError}
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">

        {/* ── Editor ── */}
        <div className="space-y-5">

          {/* Title */}
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title…"
            rows={2}
            className="w-full text-2xl sm:text-3xl font-display font-bold text-void dark:text-whisper placeholder:text-void/20 dark:placeholder:text-whisper/20 bg-transparent border-0 outline-none resize-none leading-tight"
          />

          {/* Slug */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-void/30 dark:text-whisper/30">z3ymo.com/blog/</span>
            <input value={slug} onChange={(e) => setSlug(slugify(e.target.value))}
              className="flex-1 bg-void/4 dark:bg-whisper/4 rounded-lg px-3 py-1.5 text-void/60 dark:text-whisper/60 border-0 outline-none focus:bg-void/8 dark:focus:bg-whisper/8 transition-colors font-mono" />
          </div>

          {/* MDX toolbar */}
          {!preview && (
            <div className="flex flex-wrap gap-1.5 p-2 bg-void/3 dark:bg-whisper/3 rounded-xl border border-void/8 dark:border-whisper/8">
              {MDX_TOOLS.map((t) => (
                <button key={t.label} onClick={() => insertMarkdown(t.insert)}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-mono text-void/55 dark:text-whisper/55 hover:bg-void/8 dark:hover:bg-whisper/8 hover:text-void dark:hover:text-whisper transition-colors cursor-pointer">
                  {t.label}
                </button>
              ))}
            </div>
          )}

          {/* Content */}
          {preview ? (
            <div className="min-h-125 p-6 rounded-2xl border border-void/8 dark:border-whisper/8 bg-white dark:bg-gray-950 prose prose-sm dark:prose-invert max-w-none">
              <pre className="whitespace-pre-wrap text-sm text-void/70 dark:text-whisper/70 font-sans leading-relaxed">{content || 'Nothing to preview yet…'}</pre>
            </div>
          ) : (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your MDX content here…

## Getting started

Use markdown formatting. Code blocks, **bold**, _italic_, and more.

```typescript
const example = 'code block'
```"
              className="w-full min-h-130 px-5 py-4 rounded-2xl border border-void/8 dark:border-whisper/8 bg-white dark:bg-gray-950 text-void dark:text-whisper text-sm font-mono leading-relaxed placeholder:text-void/25 dark:placeholder:text-whisper/25 focus:outline-none focus:border-crimson/30 focus:ring-2 focus:ring-crimson/8 transition-all resize-y"
            />
          )}

          {/* Excerpt */}
          <Field label="Excerpt" hint="Shown on the blog listing page and in SEO descriptions.">
            <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)}
              rows={3} placeholder="A brief summary of this post…"
              className={`${INPUT_CLS} resize-none`} />
          </Field>
        </div>

        {/* ── Sidebar ── */}
        <div className="space-y-5">

          {/* Publish settings */}
          <div className="bg-white dark:bg-gray-950 rounded-2xl border border-void/8 dark:border-whisper/8 p-5 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-void/40 dark:text-whisper/40">Publish</h3>

            <div className="flex items-center justify-between">
              <span className="text-sm text-void/70 dark:text-whisper/70">Status</span>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${published ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400' : 'bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400'}`}>
                {published ? 'Published' : 'Draft'}
              </span>
            </div>

            {/* Featured toggle */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-void/70 dark:text-whisper/70">Featured</span>
              <button type="button" onClick={() => setFeatured(!featured)}
                className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${featured ? 'bg-crimson' : 'bg-void/15 dark:bg-whisper/15'}`}>
                <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${featured ? 'translate-x-5' : ''}`} />
              </button>
            </div>
          </div>

          {/* Category */}
          <div className="bg-white dark:bg-gray-950 rounded-2xl border border-void/8 dark:border-whisper/8 p-5 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-void/40 dark:text-whisper/40">Category</h3>
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}
              className={INPUT_CLS}>
              <option value="">No category</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          {/* Author */}
          <div className="bg-white dark:bg-gray-950 rounded-2xl border border-void/8 dark:border-whisper/8 p-5 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-void/40 dark:text-whisper/40">Author</h3>
            <input value={authorName} onChange={(e) => setAuthorName(e.target.value)} placeholder="Author name" className={INPUT_CLS} />
            <input value={authorRole} onChange={(e) => setAuthorRole(e.target.value)} placeholder="Role / title" className={INPUT_CLS} />
          </div>

          {/* Cover image */}
          <div className="bg-white dark:bg-gray-950 rounded-2xl border border-void/8 dark:border-whisper/8 p-5 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-void/40 dark:text-whisper/40">Cover image</h3>
            <input value={coverImage} onChange={(e) => setCoverImage(e.target.value)} placeholder="https://…" className={INPUT_CLS} />
            <input value={coverAlt} onChange={(e) => setCoverAlt(e.target.value)} placeholder="Alt text" className={INPUT_CLS} />
            {coverImage && (
              <img src={coverImage} alt={coverAlt} className="w-full rounded-xl object-cover aspect-video" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
