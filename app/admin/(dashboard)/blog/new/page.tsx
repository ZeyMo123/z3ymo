'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import Link from 'next/link'

// ─── Dynamic import avoids SSR issues with Tiptap DOM APIs ────
const RichEditor = dynamic(() => import('@/components/editor/RichEditor'), {
  ssr:     false,
  loading: () => (
    <div className="rounded-2xl border border-void/10 dark:border-whisper/10 bg-white dark:bg-[#0F0F16] p-8 min-h-[480px] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-void/30 dark:text-whisper/30">
        <div className="w-8 h-8 rounded-full border-2 border-current border-t-transparent animate-spin" />
        <span className="text-sm">Loading editor…</span>
      </div>
    </div>
  ),
})

// ─── Types ────────────────────────────────────────────────────

type CtaType = 'consultation' | 'services' | 'products' | 'pulse' | 'none'

interface PostDraft {
  title:       string
  slug:        string
  excerpt:     string
  content:     string   // HTML from Tiptap
  cover_image: string
  cover_alt:   string
  author_name: string
  category_id: string
  read_time:   number
  featured:    boolean
  published:   boolean
  cta_type:    CtaType
}

const EMPTY_DRAFT: PostDraft = {
  title:       '',
  slug:        '',
  excerpt:     '',
  content:     '',
  cover_image: '',
  cover_alt:   '',
  author_name: 'Z3ymo Team',
  category_id: '',
  read_time:   5,
  featured:    false,
  published:   false,
  cta_type:    'consultation',
}

// ─── Helpers ──────────────────────────────────────────────────

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function estimateReadTime(html: string): number {
  const text  = html.replace(/<[^>]+>/g, ' ')
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

// ─── Field components ─────────────────────────────────────────

const LABEL_CLS = 'block text-xs font-semibold uppercase tracking-wider text-void/40 dark:text-whisper/40 mb-2'
const INPUT_CLS = 'w-full px-4 py-3 rounded-xl border border-void/10 dark:border-whisper/10 bg-transparent text-void dark:text-whisper text-sm placeholder:text-void/25 dark:placeholder:text-whisper/25 focus:outline-none focus:border-crimson/40 focus:ring-2 focus:ring-crimson/8 transition-all'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={LABEL_CLS}>{label}</label>
      {children}
    </div>
  )
}

const CTA_OPTIONS: { value: CtaType; label: string; desc: string }[] = [
  { value: 'consultation', label: 'Free Consultation', desc: 'Invite readers to book a free call' },
  { value: 'services',     label: 'Services',          desc: 'Promote custom development work' },
  { value: 'products',     label: 'Platforms',         desc: 'Showcase Z3ymo platform products' },
  { value: 'pulse',        label: 'Pulse Waitlist',    desc: 'Drive signups for Z3ymo Pulse' },
  { value: 'none',         label: 'No CTA',            desc: 'No sticky or inline CTA' },
]

// ─── Page ─────────────────────────────────────────────────────

export default function NewBlogPostPage() {
  const router = useRouter()

  const [draft,   setDraft]   = useState<PostDraft>(EMPTY_DRAFT)
  const [saving,  setSaving]  = useState(false)
  const [saved,   setSaved]   = useState(false)
  const [error,   setError]   = useState('')
  const [preview, setPreview] = useState(false)

  // Auto-generate slug from title
  useEffect(() => {
    if (draft.title) {
      setDraft((d) => ({
        ...d,
        slug: slugify(d.title),
      }))
    }
  }, [draft.title])

  // Auto-estimate read time from content
  useEffect(() => {
    if (draft.content) {
      setDraft((d) => ({ ...d, read_time: estimateReadTime(d.content) }))
    }
  }, [draft.content])

  function update<K extends keyof PostDraft>(key: K, value: PostDraft[K]) {
    setDraft((d) => ({ ...d, [key]: value }))
    setSaved(false)
    setError('')
  }

  const handleSave = useCallback(async (publish = false) => {
    if (!draft.title.trim()) { setError('Title is required.'); return }
    if (!draft.content || draft.content === '<p></p>') { setError('Content cannot be empty.'); return }

    setSaving(true)
    setError('')

    try {
      const payload = { ...draft, published: publish || draft.published }
      const res = await fetch('/api/admin/posts', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      })

      if (!res.ok) throw new Error(await res.text())

      const { id } = await res.json()
      setSaved(true)
      setTimeout(() => router.push(`/admin/blog/${id}`), 500)
    } catch (e: any) {
      setError(e.message ?? 'Failed to save post.')
    } finally {
      setSaving(false)
    }
  }, [draft, router])

  return (
    <div className="min-h-screen bg-whisper dark:bg-void">

      {/* ── Top bar ──────────────────────────────────────── */}
      <div className="sticky top-0 z-20 bg-whisper/95 dark:bg-void/95 backdrop-blur-xl border-b border-void/8 dark:border-whisper/8">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/admin/blog"
              className="flex items-center gap-1.5 text-sm text-void/50 dark:text-whisper/50 hover:text-void dark:hover:text-whisper transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
              All posts
            </Link>
            <span className="text-void/20 dark:text-whisper/20">·</span>
            <span className="text-sm font-medium text-void dark:text-whisper">New post</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Save status */}
            {saved && (
              <span className="text-xs text-emerald font-medium flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                Saved
              </span>
            )}
            {error && <span className="text-xs text-crimson font-medium">{error}</span>}

            <button onClick={() => setPreview(!preview)}
              className={[
                'px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer',
                preview
                  ? 'bg-void/8 dark:bg-whisper/8 border-void/15 dark:border-whisper/15 text-void dark:text-whisper'
                  : 'border-void/10 dark:border-whisper/10 text-void/55 dark:text-whisper/55 hover:border-void/20 dark:hover:border-whisper/20',
              ].join(' ')}>
              {preview ? 'Edit' : 'Preview'}
            </button>

            <button onClick={() => handleSave(false)} disabled={saving}
              className="px-4 py-2 rounded-xl text-xs font-semibold border border-void/12 dark:border-whisper/12 text-void/70 dark:text-whisper/70 hover:bg-void/5 dark:hover:bg-whisper/5 disabled:opacity-50 transition-all cursor-pointer">
              {saving ? 'Saving…' : 'Save draft'}
            </button>

            <button onClick={() => handleSave(true)} disabled={saving}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-crimson text-white hover:bg-crimson/90 disabled:opacity-50 transition-all cursor-pointer shadow-sm shadow-crimson/20">
              {saving ? 'Publishing…' : 'Publish'}
            </button>
          </div>
        </div>
      </div>

      {/* ── Content area ─────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-8">

          {/* ── Main: title + editor ── */}
          <div className="space-y-5">
            {/* Title */}
            <div>
              <textarea
                value={draft.title}
                onChange={(e) => update('title', e.target.value)}
                placeholder="Post title…"
                rows={2}
                className="w-full px-0 py-0 bg-transparent text-void dark:text-whisper font-display font-bold text-[clamp(1.6rem,4vw,2.4rem)] leading-tight placeholder:text-void/20 dark:placeholder:text-whisper/20 focus:outline-none resize-none border-0"
              />
              {draft.slug && (
                <p className="text-xs text-void/30 dark:text-whisper/30 mt-1">
                  /blog/<span className="text-crimson">{draft.slug}</span>
                </p>
              )}
            </div>

            {/* Excerpt */}
            <Field label="Excerpt (shown in blog listings & SEO)">
              <textarea
                value={draft.excerpt}
                onChange={(e) => update('excerpt', e.target.value)}
                placeholder="A short description of what this post covers…"
                rows={2}
                className={`${INPUT_CLS} resize-none`}
              />
            </Field>

            {/* Rich editor */}
            <div>
              <label className={LABEL_CLS}>Content</label>
              {preview ? (
                <div
                  className="rounded-2xl border border-void/10 dark:border-whisper/10 bg-white dark:bg-[#0F0F16] p-8 prose prose-void dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: draft.content }}
                />
              ) : (
                <RichEditor
                  value={draft.content}
                  onChange={(html) => update('content', html)}
                  placeholder="Start writing your post here…&#10;&#10;Select any text to see quick formatting options. Use the toolbar for headings, lists, links, and more."
                />
              )}
            </div>
          </div>

          {/* ── Sidebar: settings ── */}
          <div className="space-y-4">

            {/* Publish status */}
            <div className="rounded-2xl border border-void/8 dark:border-whisper/8 p-4">
              <p className={LABEL_CLS}>Status</p>
              <div className="flex gap-2">
                {[
                  { value: false, label: 'Draft' },
                  { value: true,  label: 'Published' },
                ].map((opt) => (
                  <button key={String(opt.value)} type="button"
                    onClick={() => update('published', opt.value)}
                    className={[
                      'flex-1 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border',
                      draft.published === opt.value
                        ? opt.value
                          ? 'bg-emerald/10 border-emerald/25 text-emerald'
                          : 'bg-void/8 dark:bg-whisper/8 border-void/15 dark:border-whisper/15 text-void dark:text-whisper'
                        : 'border-void/8 dark:border-whisper/8 text-void/40 dark:text-whisper/40 hover:border-void/15 dark:hover:border-whisper/15',
                    ].join(' ')}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured */}
            <div className="rounded-2xl border border-void/8 dark:border-whisper/8 p-4">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="text-sm font-medium text-void dark:text-whisper">Featured post</p>
                  <p className="text-xs text-void/40 dark:text-whisper/40 mt-0.5">Shown at top of blog listing</p>
                </div>
                <div
                  onClick={() => update('featured', !draft.featured)}
                  className={[
                    'relative w-10 h-5.5 rounded-full transition-colors cursor-pointer',
                    draft.featured ? 'bg-crimson' : 'bg-void/15 dark:bg-whisper/15',
                  ].join(' ')}>
                  <div className={[
                    'absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform',
                    draft.featured ? 'translate-x-5' : 'translate-x-0.5',
                  ].join(' ')} />
                </div>
              </label>
            </div>

            {/* Author */}
            <div className="rounded-2xl border border-void/8 dark:border-whisper/8 p-4 space-y-3">
              <Field label="Author name">
                <input type="text" value={draft.author_name}
                  onChange={(e) => update('author_name', e.target.value)}
                  className={INPUT_CLS} />
              </Field>
            </div>

            {/* Cover image */}
            <div className="rounded-2xl border border-void/8 dark:border-whisper/8 p-4 space-y-3">
              <Field label="Cover image URL">
                <input type="url" value={draft.cover_image}
                  onChange={(e) => update('cover_image', e.target.value)}
                  placeholder="https://res.cloudinary.com/…"
                  className={INPUT_CLS} />
              </Field>
              {draft.cover_image && (
                <img src={draft.cover_image} alt="Preview"
                  className="w-full aspect-video object-cover rounded-xl" />
              )}
              <Field label="Alt text">
                <input type="text" value={draft.cover_alt}
                  onChange={(e) => update('cover_alt', e.target.value)}
                  placeholder="Describe the image…"
                  className={INPUT_CLS} />
              </Field>
            </div>

            {/* Read time */}
            <div className="rounded-2xl border border-void/8 dark:border-whisper/8 p-4">
              <Field label="Read time (minutes)">
                <input type="number" value={draft.read_time} min={1} max={60}
                  onChange={(e) => update('read_time', parseInt(e.target.value) || 1)}
                  className={INPUT_CLS} />
              </Field>
              <p className="text-xs text-void/30 dark:text-whisper/30 mt-1.5">
                Auto-calculated from content — adjust if needed
              </p>
            </div>

            {/* CTA type */}
            <div className="rounded-2xl border border-void/8 dark:border-whisper/8 p-4">
              <p className={LABEL_CLS}>End-of-post CTA</p>
              <p className="text-xs text-void/40 dark:text-whisper/40 mb-3">
                A sticky card that slides up as readers finish the article.
              </p>
              <div className="space-y-2">
                {CTA_OPTIONS.map((opt) => (
                  <button key={opt.value} type="button"
                    onClick={() => update('cta_type', opt.value)}
                    className={[
                      'w-full flex items-start gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer',
                      draft.cta_type === opt.value
                        ? 'border-crimson/30 bg-crimson/4 dark:bg-crimson/6'
                        : 'border-void/8 dark:border-whisper/8 hover:border-void/14 dark:hover:border-whisper/14',
                    ].join(' ')}>
                    <div className={[
                      'w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 mt-0.5 transition-colors',
                      draft.cta_type === opt.value
                        ? 'border-crimson bg-crimson'
                        : 'border-void/20 dark:border-whisper/20',
                    ].join(' ')} />
                    <div>
                      <div className={`text-xs font-semibold ${draft.cta_type === opt.value ? 'text-crimson' : 'text-void/70 dark:text-whisper/70'}`}>
                        {opt.label}
                      </div>
                      <div className="text-[10px] text-void/35 dark:text-whisper/35 mt-0.5">
                        {opt.desc}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Slug override */}
            <div className="rounded-2xl border border-void/8 dark:border-whisper/8 p-4">
              <Field label="URL slug">
                <input type="text" value={draft.slug}
                  onChange={(e) => update('slug', slugify(e.target.value))}
                  placeholder="auto-generated-from-title"
                  className={INPUT_CLS} />
              </Field>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
