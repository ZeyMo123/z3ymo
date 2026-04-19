'use client'

// ─────────────────────────────────────────────────────────────────
// app/admin/(dashboard)/blog/new/page.tsx
//
// Blog post creation page using Tiptap WYSIWYG editor.
// Fixes vs previous version:
//   • Error shown as a dismissible toast banner, not raw red text
//   • Category dropdown with all 6 Z3ymo categories
//   • Tags multi-input (comma-separated entry or chip entry)
//   • CTA custom headline + body text fields
//   • API target: POST /api/admin/posts (now exists)
// ─────────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter }                                 from 'next/navigation'
import dynamic                                       from 'next/dynamic'
import Link                                          from 'next/link'
import { AnimatePresence, motion }                   from 'framer-motion'

// Dynamic import — prevents SSR crash from Tiptap DOM APIs
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

// ─── Constants ────────────────────────────────────────────────

const LABEL_CLS = 'block text-xs font-semibold uppercase tracking-wider text-void/40 dark:text-whisper/40 mb-2'
const INPUT_CLS = 'w-full px-4 py-3 rounded-xl border border-void/10 dark:border-whisper/10 bg-transparent text-void dark:text-whisper text-sm placeholder:text-void/25 dark:placeholder:text-whisper/25 focus:outline-none focus:border-crimson/40 focus:ring-2 focus:ring-crimson/8 transition-all'

// All 6 Z3ymo categories (must match your Supabase categories table)
const CATEGORIES = [
  { id: '',            name: '— No category —', color: '' },
  { id: 'ee0c5361-2ec9-4c30-ad52-860de4e4a954', name: 'AI & Machine Learning',  color: '#C0392B' },
  { id: '04c320c0-434c-4aac-9c4e-ac337d2f84af', name: 'Software Development',   color: '#1B998B' },
  { id: 'dbb32c7a-37b9-41e4-ab6f-f1d80830f8a2', name:'Cybersecurity', color: '#C9A84C' },
  { id: '96d5b1b2-f8d3-4047-8064-13cc4391397c', name:'Business Tech', color: '#C0392B' },
  { id: '570ca3cf-523c-4649-902a-3d7b67e75279', name:'Social Media', color: '#1B998B' },
  { id: '3976a47c-6ef6-4389-b37b-a5ffa2c44995', name:'Modern Technologies', color: '#C9A84C' },
]

// CTA options with their badge labels
type CtaType = 'consultation' | 'services' | 'products' | 'pulse' | 'none'

const CTA_OPTIONS: { value: CtaType; label: string; desc: string }[] = [
  { value: 'consultation', label: 'Free Consultation', desc: 'Book a free call' },
  { value: 'services',     label: 'Services',          desc: 'Custom development' },
  { value: 'products',     label: 'Platforms',         desc: 'Z3ymo platforms' },
  { value: 'pulse',        label: 'Pulse Waitlist',    desc: 'WhatsApp AI agent' },
  { value: 'none',         label: 'No CTA',            desc: 'No sticky or inline CTA' },
]

// ─── Types ────────────────────────────────────────────────────

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
  read_time:           number
  featured:            boolean
  published:           boolean
  cta_type:            CtaType
  cta_custom_headline: string
  cta_custom_body:     string
}

const EMPTY: PostDraft = {
  title:               '',
  slug:                '',
  excerpt:             '',
  content:             '',
  cover_image:         '',
  cover_alt:           '',
  author_name:         'Z3ymo Team',
  category_id:         '',
  tags:                [],
  read_time:           5,
  featured:            false,
  published:           false,
  cta_type:            'consultation',
  cta_custom_headline: '',
  cta_custom_body:     '',
}

// ─── Helpers ──────────────────────────────────────────────────

function slugify(t: string) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function estimateReadTime(html: string) {
  const words = html.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

// ─── Sub-components ───────────────────────────────────────────

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={LABEL_CLS}>{label}</label>
      {children}
      {hint && <p className="text-[11px] text-void/30 dark:text-whisper/30 mt-1.5">{hint}</p>}
    </div>
  )
}

// ── Toggle switch ──

function Toggle({
  checked, onChange, label, sublabel,
}: { checked: boolean; onChange: () => void; label: string; sublabel?: string }) {
  return (
    <label className="flex items-center justify-between cursor-pointer" onClick={onChange}>
      <div>
        <p className="text-sm font-medium text-void dark:text-whisper">{label}</p>
        {sublabel && <p className="text-xs text-void/40 dark:text-whisper/40 mt-0.5">{sublabel}</p>}
      </div>
      <div className={[
        'relative w-10 h-[22px] rounded-full transition-colors duration-200 flex-shrink-0',
        checked ? 'bg-crimson' : 'bg-void/15 dark:bg-whisper/15',
      ].join(' ')}>
        <div className={[
          'absolute top-[3px] w-4 h-4 bg-white rounded-full shadow transition-transform duration-200',
          checked ? 'translate-x-[22px]' : 'translate-x-[3px]',
        ].join(' ')} />
      </div>
    </label>
  )
}

// ── Tags input ──

function TagsInput({
  tags, onChange,
}: { tags: string[]; onChange: (tags: string[]) => void }) {
  const [input, setInput] = useState('')

  const addTag = (raw: string) => {
    const cleaned = raw.trim().toLowerCase().replace(/\s+/g, '-')
    if (!cleaned || tags.includes(cleaned)) { setInput(''); return }
    onChange([...tags, cleaned])
    setInput('')
  }

  const removeTag = (tag: string) => onChange(tags.filter(t => t !== tag))

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag(input)
    }
    if (e.key === 'Backspace' && !input && tags.length) {
      removeTag(tags[tags.length - 1])
    }
  }

  return (
    <div className="min-h-[44px] w-full px-3 py-2 rounded-xl border border-void/10 dark:border-whisper/10
      bg-transparent focus-within:border-crimson/40 focus-within:ring-2 focus-within:ring-crimson/8
      transition-all flex flex-wrap gap-1.5 items-center">
      {tags.map(tag => (
        <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full
          bg-void/6 dark:bg-whisper/6 text-[11px] font-medium text-void/70 dark:text-whisper/70">
          {tag}
          <button type="button" onClick={() => removeTag(tag)}
            className="text-void/40 dark:text-whisper/40 hover:text-crimson transition-colors leading-none cursor-pointer">
            ×
          </button>
        </span>
      ))}
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        onBlur={() => input && addTag(input)}
        placeholder={tags.length ? '' : 'Add tags… (press Enter or comma)'}
        className="flex-1 min-w-[120px] bg-transparent text-sm text-void dark:text-whisper
          placeholder:text-void/25 dark:placeholder:text-whisper/25 focus:outline-none"
      />
    </div>
  )
}

// ── Error toast ──

function ErrorToast({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  // Auto-dismiss after 8s
  useEffect(() => {
    const t = setTimeout(onDismiss, 8000)
    return () => clearTimeout(t)
  }, [onDismiss])

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0,  scale: 1 }}
      exit={{   opacity: 0, y: 8,   scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 sm:px-0"
    >
      <div className="flex items-start gap-3 p-4 rounded-2xl border
        bg-white dark:bg-[#1A1A22]
        border-crimson/20 shadow-xl shadow-black/10">
        {/* Icon */}
        <div className="w-8 h-8 rounded-full bg-crimson/10 flex items-center justify-center flex-shrink-0 mt-0.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="#C0392B" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        {/* Message */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-void dark:text-whisper mb-0.5">
            Couldn't save post
          </p>
          <p className="text-xs text-void/55 dark:text-whisper/50 leading-relaxed break-words">
            {message}
          </p>
        </div>
        {/* Dismiss */}
        <button onClick={onDismiss}
          className="flex-shrink-0 text-void/30 dark:text-whisper/30 hover:text-void dark:hover:text-whisper transition-colors cursor-pointer mt-0.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────

export default function NewBlogPostPage() {
  const router = useRouter()
  const [draft,   setDraft]   = useState<PostDraft>(EMPTY)
  const [saving,  setSaving]  = useState(false)
  const [saved,   setSaved]   = useState(false)
  const [error,   setError]   = useState('')
  const [preview, setPreview] = useState(false)
  const savedTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Auto-slug from title (only while slug is still auto)
  const [slugEdited, setSlugEdited] = useState(false)
  useEffect(() => {
    if (!slugEdited && draft.title) {
      setDraft(d => ({ ...d, slug: slugify(d.title) }))
    }
  }, [draft.title, slugEdited])

  // Auto read-time from content
  useEffect(() => {
    if (draft.content) {
      setDraft(d => ({ ...d, read_time: estimateReadTime(d.content) }))
    }
  }, [draft.content])

  function update<K extends keyof PostDraft>(key: K, value: PostDraft[K]) {
    setDraft(d => ({ ...d, [key]: value }))
    setSaved(false)
    setError('')
  }

  const handleSave = useCallback(async (publish = false) => {
    if (!draft.title.trim())        { setError('Title is required before saving.'); return }
    if (!draft.slug.trim())         { setError('Slug is required.'); return }
    if (!draft.content || draft.content === '<p></p>') {
      setError('Content cannot be empty.'); return
    }

    setSaving(true)
    setError('')

    try {
      const payload: PostDraft = { ...draft, published: publish || draft.published }

      const res = await fetch('/api/admin/posts', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      })

      // Parse response — always read body before checking ok
      let json: any
      const text = await res.text()
      try { json = JSON.parse(text) } catch { json = { error: text } }

      if (!res.ok) {
        throw new Error(json?.error ?? `Server error ${res.status}`)
      }

      setSaved(true)
      savedTimer.current = setTimeout(() => {
        router.push(`/admin/blog`)
      }, 600)
    } catch (e: any) {
      setError(e?.message ?? 'Failed to save. Please try again.')
    } finally {
      setSaving(false)
    }
  }, [draft, router])

  // Cleanup timer on unmount
  useEffect(() => () => { if (savedTimer.current) clearTimeout(savedTimer.current) }, [])

  const selectedCategory = CATEGORIES.find(c => c.id === draft.category_id)

  return (
    <div className="min-h-screen bg-whisper dark:bg-void">

      {/* ── Top bar ──────────────────────────────────────────── */}
      <div className="sticky top-0 z-20 bg-whisper/95 dark:bg-void/95 backdrop-blur-xl
        border-b border-void/8 dark:border-whisper/8">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 min-w-0">
            <Link href="/admin/blog"
              className="flex items-center gap-1.5 text-sm text-void/50 dark:text-whisper/50 hover:text-void dark:hover:text-whisper transition-colors flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M19 12H5M12 5l-7 7 7 7"/>
              </svg>
              All posts
            </Link>
            <span className="text-void/20 dark:text-whisper/20 text-sm">·</span>
            <span className="text-sm font-medium text-void dark:text-whisper truncate">
              {draft.title || 'New post'}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Saved indicator */}
            <AnimatePresence>
              {saved && (
                <motion.span
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-1.5 text-xs font-medium text-emerald">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Saved
                </motion.span>
              )}
            </AnimatePresence>

            {/* Preview toggle */}
            <button onClick={() => setPreview(p => !p)}
              className={[
                'px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer',
                preview
                  ? 'bg-void/8 dark:bg-whisper/8 border-void/15 dark:border-whisper/15 text-void dark:text-whisper'
                  : 'border-void/10 dark:border-whisper/10 text-void/55 dark:text-whisper/55 hover:border-void/20 dark:hover:border-whisper/20',
              ].join(' ')}>
              {preview ? 'Edit' : 'Preview'}
            </button>

            {/* Save draft */}
            <button onClick={() => handleSave(false)} disabled={saving}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold border
                border-void/12 dark:border-whisper/12
                text-void/70 dark:text-whisper/70
                hover:bg-void/5 dark:hover:bg-whisper/5
                disabled:opacity-50 transition-all cursor-pointer">
              {saving ? (
                <span className="flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" className="animate-spin">
                    <path d="M21 12a9 9 0 11-6.219-8.56"/>
                  </svg>
                  Saving…
                </span>
              ) : 'Save draft'}
            </button>

            {/* Publish */}
            <button onClick={() => handleSave(true)} disabled={saving}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold
                bg-crimson text-white hover:bg-crimson/90
                disabled:opacity-50 transition-all cursor-pointer shadow-sm shadow-crimson/20">
              {saving ? 'Publishing…' : 'Publish'}
            </button>
          </div>
        </div>
      </div>

      {/* ── Main layout ──────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-8">

          {/* ── Left: title + editor ── */}
          <div className="space-y-6">

            {/* Title */}
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
                className={`${INPUT_CLS} resize-none`}
              />
              <div className="flex justify-end mt-1">
                <span className={`text-[11px] ${draft.excerpt.length > 200 ? 'text-crimson' : 'text-void/25 dark:text-whisper/25'}`}>
                  {draft.excerpt.length} / 250
                </span>
              </div>
            </Field>

            {/* Content */}
            <div>
              <label className={LABEL_CLS}>Content</label>
              {preview ? (
                <div
                  className="rounded-2xl border border-void/10 dark:border-whisper/10
                    bg-white dark:bg-[#0F0F16] p-8 min-h-[400px]
                    blog-content text-void/75 dark:text-whisper/75"
                  dangerouslySetInnerHTML={{ __html: draft.content }}
                />
              ) : (
                <RichEditor
                  value={draft.content}
                  onChange={html => update('content', html)}
                  placeholder="Start writing your post here…&#10;&#10;Tip: Select any text to see quick formatting options."
                />
              )}
            </div>
          </div>

          {/* ── Right sidebar ── */}
          <div className="space-y-4">

            {/* Status */}
            <div className="rounded-2xl border border-void/8 dark:border-whisper/8 p-4">
              <p className={LABEL_CLS}>Status</p>
              <div className="flex gap-2">
                {[{ v: false, l: 'Draft' }, { v: true, l: 'Published' }].map(opt => (
                  <button key={String(opt.v)} type="button"
                    onClick={() => update('published', opt.v)}
                    className={[
                      'flex-1 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border',
                      draft.published === opt.v
                        ? opt.v
                          ? 'bg-emerald/10 border-emerald/25 text-emerald'
                          : 'bg-void/8 dark:bg-whisper/8 border-void/15 dark:border-whisper/15 text-void dark:text-whisper'
                        : 'border-void/8 dark:border-whisper/8 text-void/40 dark:text-whisper/40',
                    ].join(' ')}>
                    {opt.l}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured */}
            <div className="rounded-2xl border border-void/8 dark:border-whisper/8 p-4">
              <Toggle
                checked={draft.featured}
                onChange={() => update('featured', !draft.featured)}
                label="Featured post"
                sublabel="Shown in the homepage slider"
              />
            </div>

            {/* Category */}
            <div className="rounded-2xl border border-void/8 dark:border-whisper/8 p-4">
              <Field label="Category">
                <div className="relative">
                  <select
                    value={draft.category_id}
                    onChange={e => update('category_id', e.target.value)}
                    className={`${INPUT_CLS} appearance-none pr-8 cursor-pointer`}
                  >
                    {CATEGORIES.map(cat => (
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
                {/* Category color preview */}
                {draft.category_id && selectedCategory?.color && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ background: selectedCategory.color }} />
                    <span className="text-[11px] text-void/45 dark:text-whisper/45">
                      {selectedCategory.name}
                    </span>
                  </div>
                )}
              </Field>
            </div>

            {/* Tags */}
            <div className="rounded-2xl border border-void/8 dark:border-whisper/8 p-4">
              <Field label="Tags" hint="Press Enter or comma to add a tag. Backspace to remove last.">
                <TagsInput tags={draft.tags} onChange={t => update('tags', t)} />
              </Field>
            </div>

            {/* Author */}
            <div className="rounded-2xl border border-void/8 dark:border-whisper/8 p-4">
              <Field label="Author name">
                <input type="text" value={draft.author_name}
                  onChange={e => update('author_name', e.target.value)}
                  className={INPUT_CLS} />
              </Field>
            </div>

            {/* Cover image */}
            <div className="rounded-2xl border border-void/8 dark:border-whisper/8 p-4 space-y-3">
              <Field label="Cover image URL">
                <input type="url" value={draft.cover_image}
                  onChange={e => update('cover_image', e.target.value)}
                  placeholder="https://res.cloudinary.com/dcnnwo1zx/…"
                  className={INPUT_CLS} />
              </Field>
              {draft.cover_image && (
                <div className="relative rounded-xl overflow-hidden aspect-video bg-void/4">
                  <img src={draft.cover_image} alt="Cover preview"
                    className="w-full h-full object-cover"
                    onError={e => {
                      (e.target as HTMLImageElement).style.display = 'none'
                    }} />
                </div>
              )}
              {!draft.cover_image && (
                <p className="text-[11px] text-void/35 dark:text-whisper/35 leading-relaxed">
                  No image? The post will use a branded placeholder. Upload via Cloudinary and paste the URL above.
                </p>
              )}
              <Field label="Alt text">
                <input type="text" value={draft.cover_alt}
                  onChange={e => update('cover_alt', e.target.value)}
                  placeholder="Describe the image for screen readers…"
                  className={INPUT_CLS} />
              </Field>
            </div>

            {/* Read time */}
            <div className="rounded-2xl border border-void/8 dark:border-whisper/8 p-4">
              <Field label="Read time (minutes)" hint="Auto-calculated from word count — adjust if needed.">
                <input type="number" value={draft.read_time} min={1} max={60}
                  onChange={e => update('read_time', parseInt(e.target.value) || 1)}
                  className={INPUT_CLS} />
              </Field>
            </div>

            {/* URL slug */}
            <div className="rounded-2xl border border-void/8 dark:border-whisper/8 p-4">
              <Field label="URL slug" hint="Auto-generated from title. Edit to override.">
                <input type="text" value={draft.slug}
                  onChange={e => {
                    setSlugEdited(true)
                    update('slug', slugify(e.target.value))
                  }}
                  placeholder="my-post-title"
                  className={INPUT_CLS} />
              </Field>
            </div>

            {/* CTA ─────────────────────────────────────────────── */}
            <div className="rounded-2xl border border-void/8 dark:border-whisper/8 p-4 space-y-4">
              <div>
                <p className={LABEL_CLS}>End-of-post CTA</p>
                <p className="text-xs text-void/40 dark:text-whisper/40 mb-3">
                  A sticky card that slides up as readers finish the article. Choose the offer type, then optionally customize the text shown.
                </p>
                <div className="space-y-2">
                  {CTA_OPTIONS.map(opt => (
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

              {/* Custom CTA text — only shown when a CTA type is selected */}
              {draft.cta_type !== 'none' && (
                <div className="space-y-3 pt-3 border-t border-void/8 dark:border-whisper/8">
                  <p className="text-[11px] font-semibold text-void/40 dark:text-whisper/40 uppercase tracking-wider">
                    Custom text (optional)
                  </p>
                  <p className="text-[11px] text-void/35 dark:text-whisper/35 -mt-1">
                    Override the default headline and body text for this CTA. Leave blank to use the default.
                  </p>
                  <div>
                    <label className="block text-[11px] font-medium text-void/45 dark:text-whisper/45 mb-1.5">
                      Headline
                    </label>
                    <input
                      type="text"
                      value={draft.cta_custom_headline}
                      onChange={e => update('cta_custom_headline', e.target.value)}
                      placeholder="e.g. Ready to build your idea?"
                      className={INPUT_CLS}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-void/45 dark:text-whisper/45 mb-1.5">
                      Body text
                    </label>
                    <textarea
                      value={draft.cta_custom_body}
                      onChange={e => update('cta_custom_body', e.target.value)}
                      placeholder="e.g. We can help you turn this idea into a working product. Book a free call."
                      rows={3}
                      className={`${INPUT_CLS} resize-none`}
                    />
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* ── Error toast ── */}
      <AnimatePresence>
        {error && <ErrorToast message={error} onDismiss={() => setError('')} />}
      </AnimatePresence>
    </div>
  )
}
