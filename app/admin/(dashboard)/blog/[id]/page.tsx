'use client'

// ─────────────────────────────────────────────────────────────────
// app/admin/(dashboard)/blog/[id]/page.tsx
//
// Edit an existing blog post.
// Full parity with blog/new/page.tsx:
//   Main col: title, excerpt, key takeaways, content (RichEditor)
//   Sidebar: status, featured, category, tags, author,
//            cover image + alt + preview, read time, slug, CTA
// ─────────────────────────────────────────────────────────────────

import { useEffect, useState, useCallback, useRef } from 'react'
import { useParams, useRouter }                      from 'next/navigation'
import dynamic                                       from 'next/dynamic'
import Link                                          from 'next/link'
import { AnimatePresence, motion }                   from 'framer-motion'
import { supabase }                                  from '@/lib/supabase/client'
import {
  LABEL, INPUT,
  Field, Toggle, TagsInput, KeyTakeawaysInput,
  ErrorToast, CtaSelector,
  type CtaType,
} from '@/components/admin/EditorShared'

// ─── Dynamic import — Tiptap must be client-only ──────────────

const RichEditor = dynamic(() => import('@/components/editor/RichEditor'), {
  ssr:     false,
  loading: () => (
    <div className="rounded-2xl border border-void/10 dark:border-whisper/10
      bg-white dark:bg-[#0F0F16] p-8 min-h-[480px] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-void/30 dark:text-whisper/30">
        <div className="w-8 h-8 rounded-full border-2 border-current border-t-transparent animate-spin" />
        <span className="text-sm">Loading editor…</span>
      </div>
    </div>
  ),
})

// ─── Types ────────────────────────────────────────────────────

interface Category { id: string; name: string; color: string }

interface PostDraft {
  title:               string
  slug:                string
  excerpt:             string
  content:             string
  cover_image:         string
  cover_alt:           string
  author_name:         string
  category_id:         string
  tags:                string[]
  key_takeaways:       string[]
  read_time:           number
  featured:            boolean
  published:           boolean
  cta_type:            CtaType
  cta_custom_headline: string
  cta_custom_body:     string
}

// ─── Helpers ──────────────────────────────────────────────────

function slugify(t: string) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function estimateReadTime(html: string) {
  const words = html.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

// ─── Page ─────────────────────────────────────────────────────

export default function EditBlogPostPage() {
  const { id }  = useParams<{ id: string }>()
  const router  = useRouter()

  // ── Fetch state ──
  type FetchState = 'loading' | 'error' | 'success'
  const [fetchState, setFetchState] = useState<FetchState>('loading')
  const [fetchError, setFetchError] = useState('')
  const [draft,      setDraft]      = useState<PostDraft | null>(null)
  const [categories, setCategories] = useState<Category[]>([])

  // ── Save state ──
  const [saving,     setSaving]     = useState(false)
  const [saved,      setSaved]      = useState(false)
  const [error,      setError]      = useState('')
  const [preview,    setPreview]    = useState(false)
  const [slugEdited, setSlugEdited] = useState(true) // in edit mode slug is always locked by default
  const savedTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ── Load post + categories ──
  useEffect(() => {
    async function load() {
      setFetchState('loading')
      const [postRes, catsRes] = await Promise.all([
        supabase.from('posts').select('*').eq('id', id).single(),
        supabase.from('categories').select('id, name, color').order('name'),
      ])

      if (postRes.error || !postRes.data) {
        setFetchError(postRes.error?.message ?? 'Post not found.')
        setFetchState('error')
        return
      }

      const p = postRes.data as any
      setDraft({
        title:               p.title               ?? '',
        slug:                p.slug                ?? '',
        excerpt:             p.excerpt             ?? '',
        content:             p.content             ?? '',
        cover_image:         p.cover_image         ?? '',
        cover_alt:           p.cover_alt           ?? '',
        author_name:         p.author_name         ?? 'Z3ymo Team',
        category_id:         p.category_id         ?? '',
        tags:                p.tags                ?? [],
        key_takeaways:       p.key_takeaways       ?? [],
        read_time:           p.read_time           ?? 5,
        featured:            p.featured            ?? false,
        published:           p.published           ?? false,
        cta_type:            p.cta_type            ?? 'consultation',
        cta_custom_headline: p.cta_custom_headline ?? '',
        cta_custom_body:     p.cta_custom_body     ?? '',
      })
      setCategories(catsRes.data ?? [])
      setFetchState('success')
    }
    load()
  }, [id])

  // ── Auto read-time from content ──
  useEffect(() => {
    if (draft?.content) {
      setDraft(d => d ? { ...d, read_time: estimateReadTime(d.content) } : d)
    }
  }, [draft?.content])

  function update<K extends keyof PostDraft>(key: K, value: PostDraft[K]) {
    setDraft(d => d ? { ...d, [key]: value } : d)
    setSaved(false)
    setError('')
  }

  const handleSave = useCallback(async (publish = false) => {
    if (!draft) return
    if (!draft.title.trim())   { setError('Title is required.'); return }
    if (!draft.slug.trim())    { setError('Slug is required.'); return }
    if (!draft.content || draft.content === '<p></p>') {
      setError('Content cannot be empty.'); return
    }

    setSaving(true)
    setError('')

    try {
      const payload = {
        id,
        ...draft,
        published: publish || draft.published,
      }

      const res  = await fetch('/api/admin/posts', {
        method:  'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      })
      const text = await res.text()
      let json: any
      try { json = JSON.parse(text) } catch { json = { error: text } }
      if (!res.ok) throw new Error(json?.error ?? `Error ${res.status}`)

      setSaved(true)
      savedTimer.current = setTimeout(() => router.push('/admin/blog'), 500)
    } catch (e: any) {
      setError(e.message ?? 'Save failed. Please try again.')
    } finally {
      setSaving(false)
    }
  }, [draft, id, router])

  useEffect(() => () => { if (savedTimer.current) clearTimeout(savedTimer.current) }, [])

  // ─── Loading state ───────────────────────────────────────────

  if (fetchState === 'loading') return (
    <div className="min-h-screen bg-whisper dark:bg-void flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-crimson/30 border-t-crimson animate-spin" />
        <p className="text-sm text-void/40 dark:text-whisper/40">Loading post…</p>
      </div>
    </div>
  )

  // ─── Error state ─────────────────────────────────────────────

  if (fetchState === 'error' || !draft) return (
    <div className="min-h-screen bg-whisper dark:bg-void flex items-center justify-center px-6">
      <div className="text-center">
        <div className="w-16 h-16 rounded-3xl bg-crimson/8 text-crimson flex items-center justify-center mx-auto mb-5">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <h2 className="font-display font-bold text-xl text-void dark:text-whisper mb-2">
          Couldn't load post
        </h2>
        <p className="text-sm text-void/50 dark:text-whisper/50 mb-6">{fetchError}</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 rounded-full bg-void dark:bg-whisper text-whisper dark:text-void text-sm font-semibold cursor-pointer hover:opacity-90 transition-opacity"
          >
            Retry
          </button>
          <Link href="/admin/blog"
            className="px-5 py-2.5 rounded-full border border-void/12 dark:border-whisper/12 text-sm text-void/60 dark:text-whisper/60 hover:border-void/25 transition-colors">
            Back to posts
          </Link>
        </div>
      </div>
    </div>
  )

  const selectedCat = categories.find(c => c.id === draft.category_id) ?? null

  // ─── Editor ──────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-whisper dark:bg-void">

      {/* ── Top bar ── */}
      <div className="sticky top-0 z-20 bg-whisper/95 dark:bg-void/95 backdrop-blur-xl
        border-b border-void/8 dark:border-whisper/8">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">

          <div className="flex items-center gap-2 min-w-0">
            <Link href="/admin/blog"
              className="flex items-center gap-1.5 text-sm text-void/50 dark:text-whisper/50 hover:text-void dark:hover:text-whisper transition-colors flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M19 12H5M12 5l-7 7 7 7"/>
              </svg>
              All posts
            </Link>
            <span className="text-void/20 dark:text-whisper/20">·</span>
            <span className="text-sm font-medium text-void dark:text-whisper truncate">
              Edit: {draft.title || 'Untitled'}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <AnimatePresence>
              {saved && (
                <motion.span
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-1.5 text-xs font-medium text-emerald"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Saved
                </motion.span>
              )}
            </AnimatePresence>

            <button
              onClick={() => setPreview(p => !p)}
              className={[
                'px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer',
                preview
                  ? 'bg-void/8 dark:bg-whisper/8 border-void/15 dark:border-whisper/15 text-void dark:text-whisper'
                  : 'border-void/10 dark:border-whisper/10 text-void/55 dark:text-whisper/55 hover:border-void/20 dark:hover:border-whisper/20',
              ].join(' ')}
            >
              {preview ? 'Edit' : 'Preview'}
            </button>

            <button
              onClick={() => handleSave(false)}
              disabled={saving}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-void/12 dark:border-whisper/12 text-void/70 dark:text-whisper/70 hover:bg-void/5 dark:hover:bg-whisper/5 disabled:opacity-50 transition-all cursor-pointer"
            >
              {saving ? (
                <span className="flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" className="animate-spin">
                    <path d="M21 12a9 9 0 11-6.219-8.56"/>
                  </svg>
                  Saving…
                </span>
              ) : 'Save'}
            </button>

            <button
              onClick={() => handleSave(true)}
              disabled={saving}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-crimson text-white hover:bg-crimson/90 disabled:opacity-50 transition-all cursor-pointer shadow-sm shadow-crimson/20"
            >
              {draft.published ? 'Update' : 'Publish'}
            </button>
          </div>
        </div>
      </div>

      {/* ── Main layout ── */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-8">

          {/* ── Left: title + key takeaways + editor ── */}
          <div className="space-y-6">

            {/* Title + slug preview */}
            <div>
              <textarea
                value={draft.title}
                onChange={e => update('title', e.target.value)}
                placeholder="Post title…"
                rows={2}
                className="w-full px-0 py-0 bg-transparent font-display font-bold
                  text-[clamp(1.6rem,4vw,2.4rem)] leading-tight
                  text-void dark:text-whisper
                  placeholder:text-void/18 dark:placeholder:text-whisper/18
                  focus:outline-none resize-none border-0"
              />
              {draft.slug && (
                <p className="text-xs text-void/30 dark:text-whisper/30 mt-1.5">
                  z3ymo.com/blog/<span className="text-crimson">{draft.slug}</span>
                </p>
              )}
            </div>

            {/* Excerpt */}
            <Field label="Excerpt" hint="Shown in blog listings and search results (150–200 chars recommended).">
              <textarea
                value={draft.excerpt}
                onChange={e => update('excerpt', e.target.value)}
                placeholder="A short description of what this post covers…"
                rows={2}
                maxLength={250}
                className={`${INPUT} resize-none`}
              />
              <div className="flex justify-end mt-1">
                <span className={`text-[11px] ${draft.excerpt.length > 200 ? 'text-crimson' : 'text-void/25 dark:text-whisper/25'}`}>
                  {draft.excerpt.length} / 250
                </span>
              </div>
            </Field>

            {/* Key Takeaways */}
            <Field
              label="Key Takeaways"
              hint="3–5 concrete outcomes the reader walks away with. Shown as a highlighted box before the content on the reading page."
            >
              <KeyTakeawaysInput
                items={draft.key_takeaways}
                onChange={v => update('key_takeaways', v)}
              />
            </Field>

            {/* Content editor */}
            <div>
              <label className={LABEL}>Content</label>
              {preview ? (
                <div
                  className="rounded-2xl border border-void/10 dark:border-whisper/10
                    bg-white dark:bg-[#0F0F16] p-8 min-h-[480px]
                    blog-content text-void/75 dark:text-whisper/75"
                  dangerouslySetInnerHTML={{ __html: draft.content }}
                />
              ) : (
                <RichEditor
                  value={draft.content}
                  onChange={html => update('content', html)}
                  placeholder="Edit your post content here…&#10;&#10;Tip: Select any text to see quick formatting options."
                />
              )}
            </div>
          </div>

          {/* ── Right sidebar ── */}
          <div className="space-y-4">

            {/* Status */}
            <div className="rounded-2xl border border-void/8 dark:border-whisper/8 p-4">
              <p className={LABEL}>Status</p>
              <div className="flex gap-2">
                {[{ v: false, l: 'Draft' }, { v: true, l: 'Published' }].map(opt => (
                  <button
                    key={String(opt.v)}
                    type="button"
                    onClick={() => update('published', opt.v)}
                    className={[
                      'flex-1 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border',
                      draft.published === opt.v
                        ? opt.v
                          ? 'bg-emerald/10 border-emerald/25 text-emerald'
                          : 'bg-void/8 dark:bg-whisper/8 border-void/15 dark:border-whisper/15 text-void dark:text-whisper'
                        : 'border-void/8 dark:border-whisper/8 text-void/40 dark:text-whisper/40',
                    ].join(' ')}
                  >
                    {opt.l}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured toggle */}
            <div className="rounded-2xl border border-void/8 dark:border-whisper/8 p-4">
              <Toggle
                checked={draft.featured}
                onChange={() => update('featured', !draft.featured)}
                label="Featured post"
                sublabel="Shown in the homepage blog slider"
              />
            </div>

            {/* Category */}
            <div className="rounded-2xl border border-void/8 dark:border-whisper/8 p-4">
              <Field label="Category">
                <div className="relative">
                  <select
                    value={draft.category_id}
                    onChange={e => update('category_id', e.target.value)}
                    className={`${INPUT} appearance-none pr-8 cursor-pointer`}
                  >
                    <option value="">— No category —</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-void/40 dark:text-whisper/40">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </div>
                </div>
                {selectedCat && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: selectedCat.color }} />
                    <span className="text-[11px] text-void/45 dark:text-whisper/45">{selectedCat.name}</span>
                  </div>
                )}
              </Field>
            </div>

            {/* Tags */}
            <div className="rounded-2xl border border-void/8 dark:border-whisper/8 p-4">
              <Field label="Tags" hint="Press Enter or comma to add. Backspace removes last.">
                <TagsInput
                  tags={draft.tags}
                  onChange={t => update('tags', t)}
                />
              </Field>
            </div>

            {/* Author */}
            <div className="rounded-2xl border border-void/8 dark:border-whisper/8 p-4">
              <Field label="Author name">
                <input
                  type="text"
                  value={draft.author_name}
                  onChange={e => update('author_name', e.target.value)}
                  className={INPUT}
                />
              </Field>
            </div>

            {/* Cover image */}
            <div className="rounded-2xl border border-void/8 dark:border-whisper/8 p-4 space-y-3">
              <Field label="Cover image URL">
                <input
                  type="url"
                  value={draft.cover_image}
                  onChange={e => update('cover_image', e.target.value)}
                  placeholder="https://res.cloudinary.com/dcnnwo1zx/…"
                  className={INPUT}
                />
              </Field>
              {draft.cover_image && (
                <div className="relative rounded-xl overflow-hidden aspect-video bg-void/4">
                  <img
                    src={draft.cover_image}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                  />
                </div>
              )}
              {!draft.cover_image && (
                <p className="text-[11px] text-void/35 dark:text-whisper/35 leading-relaxed">
                  No image set — post will use a branded placeholder. Upload to Cloudinary and paste the URL above.
                </p>
              )}
              <Field label="Alt text">
                <input
                  type="text"
                  value={draft.cover_alt}
                  onChange={e => update('cover_alt', e.target.value)}
                  placeholder="Describe the image for screen readers…"
                  className={INPUT}
                />
              </Field>
            </div>

            {/* Read time */}
            <div className="rounded-2xl border border-void/8 dark:border-whisper/8 p-4">
              <Field label="Read time (minutes)" hint="Auto-calculated from word count — adjust if needed.">
                <input
                  type="number"
                  value={draft.read_time}
                  min={1}
                  max={60}
                  onChange={e => update('read_time', parseInt(e.target.value) || 1)}
                  className={INPUT}
                />
              </Field>
            </div>

            {/* URL slug */}
            <div className="rounded-2xl border border-void/8 dark:border-whisper/8 p-4">
              <Field label="URL slug" hint="Changing the slug will break existing links to this post.">
                <input
                  type="text"
                  value={draft.slug}
                  onChange={e => {
                    setSlugEdited(true)
                    update('slug', slugify(e.target.value))
                  }}
                  placeholder="post-slug"
                  className={INPUT}
                />
              </Field>
            </div>

            {/* CTA */}
            <CtaSelector
              ctaType={draft.cta_type}
              onTypeChange={v => update('cta_type', v)}
              headline={draft.cta_custom_headline}
              onHeadlineChange={v => update('cta_custom_headline', v)}
              body={draft.cta_custom_body}
              onBodyChange={v => update('cta_custom_body', v)}
            />

          </div>
        </div>
      </div>

      {/* Error toast */}
      <AnimatePresence>
        {error && <ErrorToast message={error} onDismiss={() => setError('')} />}
      </AnimatePresence>
    </div>
  )
}
