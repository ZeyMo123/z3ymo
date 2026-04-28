'use client'

// ─────────────────────────────────────────────────────────────────
// components/admin/ContentItemEditor.tsx
//
// Shared editor for Guides, Case Studies, and Documentation.
// Used in both "new" and "edit" admin pages.
//
// Props:
//   type     — 'guide' | 'case-study' | 'doc'
//   itemId   — undefined for new, UUID for edit
//   initial  — pre-populated data for edit mode
// ─────────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter }       from 'next/navigation'
import dynamic             from 'next/dynamic'
import Link                from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { supabase }        from '@/lib/supabase/client'
import type { ContentType } from '@/lib/supabase/client'
import {
  LABEL, INPUT,
  Field, Toggle, TagsInput, KeyTakeawaysInput,
  ErrorToast, CtaSelector,
  type CtaType,
} from '@/components/admin/EditorShared'

// ─── Dynamic import — Tiptap needs client-only ────────────────
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

// ─── Type config ──────────────────────────────────────────────

const TYPE_META: Record<ContentType, { label: string; backHref: string; hasCategories: boolean }> = {
  'guide':       { label: 'Guide',         backHref: '/admin/content/guides',       hasCategories: true  },
  'case-study':  { label: 'Case Study',    backHref: '/admin/content/case-studies', hasCategories: true  },
  'doc':         { label: 'Documentation', backHref: '/admin/content/docs',         hasCategories: false },
}

// ─── Types ────────────────────────────────────────────────────

interface Category { id: string; name: string; color: string }

export interface ContentDraft {
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
  status:              'draft' | 'published' | 'archived'
  cta_type:            CtaType
  cta_custom_headline: string
  cta_custom_body:     string
  pdf_available:       boolean
}

const EMPTY: ContentDraft = {
  title:'', slug:'', excerpt:'', content:'',
  cover_image:'', cover_alt:'', author_name:'Z3ymo Team',
  category_id:'', tags:[], key_takeaways:[], read_time:5,
  featured:false, status:'draft', cta_type:'consultation',
  cta_custom_headline:'', cta_custom_body:'', pdf_available:true,
}

// ─── Helpers ──────────────────────────────────────────────────

function slugify(t: string) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function estimateReadTime(html: string) {
  const words = html.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

// ─── Main component ───────────────────────────────────────────

interface ContentItemEditorProps {
  type:      ContentType
  itemId?:   string             // undefined = new, UUID = edit
  initial?:  Partial<ContentDraft>
}

export default function ContentItemEditor({ type, itemId, initial }: ContentItemEditorProps) {
  const router       = useRouter()
  const meta         = TYPE_META[type]
  const isEdit       = !!itemId

  const [draft,      setDraft]      = useState<ContentDraft>({ ...EMPTY, ...initial })
  const [saving,     setSaving]     = useState(false)
  const [saved,      setSaved]      = useState(false)
  const [error,      setError]      = useState('')
  const [preview,    setPreview]    = useState(false)
  const [slugEdited, setSlugEdited] = useState(isEdit)
  const [categories, setCategories] = useState<Category[]>([])
  const savedTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Fetch categories (only for types that have them)
  useEffect(() => {
    if (!meta.hasCategories) return
    supabase.from('categories').select('id, name, color').order('name')
      .then(({ data }) => setCategories(data ?? []))
  }, [meta.hasCategories])

  // Auto-slug
  useEffect(() => {
    if (!slugEdited && draft.title) {
      setDraft(d => ({ ...d, slug: slugify(d.title) }))
    }
  }, [draft.title, slugEdited])

  // Auto read-time
  useEffect(() => {
    if (draft.content) setDraft(d => ({ ...d, read_time: estimateReadTime(d.content) }))
  }, [draft.content])

  function update<K extends keyof ContentDraft>(key: K, value: ContentDraft[K]) {
    setDraft(d => ({ ...d, [key]: value }))
    setSaved(false); setError('')
  }

  const handleSave = useCallback(async (publish = false) => {
    if (!draft.title.trim()) { setError('Title is required.'); return }
    if (!draft.slug.trim())  { setError('Slug is required.'); return }
    if (!draft.content || draft.content === '<p></p>') { setError('Content cannot be empty.'); return }

    setSaving(true); setError('')

    try {
      const payload = {
        ...draft,
        type,
        // When clicking Publish, force status to 'published'
        status:      publish ? 'published' : draft.status,
        published_at: (publish || draft.status === 'published') ? new Date().toISOString() : null,
      }
      const url     = isEdit ? '/api/admin/content' : '/api/admin/content'
      const method  = isEdit ? 'PATCH' : 'POST'
      const body    = isEdit ? { id: itemId, ...payload } : payload

      const res  = await fetch(url, {
        method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
      })
      const text = await res.text()
      let json: any
      try { json = JSON.parse(text) } catch { json = { error: text } }
      if (!res.ok) throw new Error(json?.error ?? `Error ${res.status}`)

      setSaved(true)
      savedTimer.current = setTimeout(() => router.push(meta.backHref), 600)
    } catch (e: any) {
      setError(e.message ?? 'Save failed. Please try again.')
    } finally {
      setSaving(false)
    }
  }, [draft, type, isEdit, itemId, meta.backHref, router])

  useEffect(() => () => { if (savedTimer.current) clearTimeout(savedTimer.current) }, [])

  const selectedCat = categories.find(c => c.id === draft.category_id) ?? null

  // ─── Render ─────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-whisper dark:bg-void">

      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-whisper/95 dark:bg-void/95 backdrop-blur-xl border-b border-void/8 dark:border-whisper/8">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-0">
            <Link href={meta.backHref}
              className="flex items-center gap-1.5 text-sm text-void/50 dark:text-whisper/50 hover:text-void dark:hover:text-whisper transition-colors flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M19 12H5M12 5l-7 7 7 7"/>
              </svg>
              All {meta.label}s
            </Link>
            <span className="text-void/20 dark:text-whisper/20">·</span>
            <span className="text-sm font-medium text-void dark:text-whisper truncate">
              {isEdit ? 'Edit' : 'New'} {meta.label}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <AnimatePresence>
              {saved && (
                <motion.span initial={{ opacity:0, x:8 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0 }}
                  className="flex items-center gap-1.5 text-xs font-medium text-emerald">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Saved
                </motion.span>
              )}
            </AnimatePresence>

            <button onClick={() => setPreview(p => !p)}
              className={['px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer',
                preview ? 'bg-void/8 dark:bg-whisper/8 border-void/15 dark:border-whisper/15 text-void dark:text-whisper'
                        : 'border-void/10 dark:border-whisper/10 text-void/55 dark:text-whisper/55'].join(' ')}>
              {preview ? 'Edit' : 'Preview'}
            </button>

            <button onClick={() => handleSave(false)} disabled={saving}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-void/12 dark:border-whisper/12 text-void/70 dark:text-whisper/70 hover:bg-void/5 disabled:opacity-50 transition-all cursor-pointer">
              {saving ? 'Saving…' : 'Save draft'}
            </button>

            <button onClick={() => handleSave(true)} disabled={saving}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-crimson text-white hover:bg-crimson/90 disabled:opacity-50 transition-all cursor-pointer shadow-sm shadow-crimson/20">
              Publish
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-8">

          {/* Left: title + editor */}
          <div className="space-y-6">
            <div>
              <textarea value={draft.title} onChange={e => update('title', e.target.value)}
                placeholder={`${meta.label} title…`} rows={2}
                className="w-full px-0 py-0 bg-transparent font-display font-bold text-[clamp(1.6rem,4vw,2.4rem)] leading-tight text-void dark:text-whisper placeholder:text-void/18 dark:placeholder:text-whisper/18 focus:outline-none resize-none border-0" />
              {draft.slug && (
                <p className="text-xs text-void/30 dark:text-whisper/30 mt-1.5">
                  z3ymo.com/{type === 'guide' ? 'guides' : type === 'case-study' ? 'case-studies' : 'docs'}/<span className="text-crimson">{draft.slug}</span>
                </p>
              )}
            </div>

            <Field label="Excerpt" hint="Shown in collection pages and search results (150–200 chars).">
              <textarea value={draft.excerpt} onChange={e => update('excerpt', e.target.value)}
                placeholder="A short summary…" rows={2} maxLength={250}
                className={`${INPUT} resize-none`} />
            </Field>

            {/* Key takeaways — docs excluded */}
            {type !== 'doc' && (
              <Field label="Key Takeaways" hint="These appear in a highlighted box on the reading page. Add 3–5 concrete outcomes.">
                <KeyTakeawaysInput items={draft.key_takeaways} onChange={v => update('key_takeaways', v)} />
              </Field>
            )}

            <div>
              <label className={LABEL}>Content</label>
              {preview ? (
                <div className="rounded-2xl border border-void/10 dark:border-whisper/10
                  bg-white dark:bg-[#0F0F16] p-8 min-h-[400px]
                  blog-content text-void/75 dark:text-whisper/75"
                  dangerouslySetInnerHTML={{ __html: draft.content }} />
              ) : (
                <RichEditor value={draft.content} onChange={html => update('content', html)}
                  placeholder={
                    type === 'doc'
                      ? 'Start writing your documentation here…\n\nUse headings to structure sections. Code blocks work great for API examples.'
                      : `Start writing your ${type === 'guide' ? 'guide' : 'case study'} here…\n\nTip: Select any text to see quick formatting options.`
                  }
                />
              )}
            </div>
          </div>

          {/* Right: sidebar */}
          <div className="space-y-4">

            {/* Status — 3 states matching DB: draft | published | archived */}
            <div className="rounded-2xl border border-void/8 dark:border-whisper/8 p-4">
              <p className={LABEL}>Status</p>
              <div className="flex gap-2">
                {[
                  { v: 'draft'     as const, l: 'Draft'    },
                  { v: 'published' as const, l: 'Published'},
                  { v: 'archived'  as const, l: 'Archived' },
                ].map(opt => (
                  <button key={opt.v} type="button" onClick={() => update('status', opt.v)}
                    className={['flex-1 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border',
                      draft.status === opt.v
                        ? opt.v === 'published'
                          ? 'bg-emerald/10 border-emerald/25 text-emerald'
                          : opt.v === 'archived'
                            ? 'bg-void/8 dark:bg-whisper/8 border-void/15 dark:border-whisper/15 text-void/50 dark:text-whisper/50'
                            : 'bg-void/8 dark:bg-whisper/8 border-void/15 dark:border-whisper/15 text-void dark:text-whisper'
                        : 'border-void/8 dark:border-whisper/8 text-void/40 dark:text-whisper/40',
                    ].join(' ')}>
                    {opt.l}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured + PDF toggles */}
            <div className="rounded-2xl border border-void/8 dark:border-whisper/8 p-4 space-y-4">
              <Toggle checked={draft.featured} onChange={() => update('featured', !draft.featured)}
                label="Featured" sublabel={`Shown in homepage ${meta.label} section`} />
              <div className="border-t border-void/6 dark:border-whisper/6 pt-4">
                <Toggle checked={draft.pdf_available} onChange={() => update('pdf_available', !draft.pdf_available)}
                  label="PDF download" sublabel="Show email gate + PDF download button" />
              </div>
            </div>

            {/* Category — guides and case-studies only */}
            {meta.hasCategories && (
              <div className="rounded-2xl border border-void/8 dark:border-whisper/8 p-4">
                <Field label="Category">
                  <div className="relative">
                    <select value={draft.category_id} onChange={e => update('category_id', e.target.value)}
                      className={`${INPUT} appearance-none pr-8 cursor-pointer`}>
                      <option value="">— No category —</option>
                      {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-void/40 dark:text-whisper/40">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
                    </div>
                  </div>
                  {draft.category_id && selectedCat && (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: selectedCat.color }} />
                      <span className="text-[11px] text-void/45 dark:text-whisper/45">{selectedCat.name}</span>
                    </div>
                  )}
                </Field>
              </div>
            )}

            {/* Tags — guides and case-studies only, not docs */}
            {type !== 'doc' && (
              <div className="rounded-2xl border border-void/8 dark:border-whisper/8 p-4">
                <Field label="Tags" hint="Press Enter or comma to add. Backspace removes last.">
                  <TagsInput tags={draft.tags} onChange={t => update('tags', t)} />
                </Field>
              </div>
            )}

            {/* Author */}
            <div className="rounded-2xl border border-void/8 dark:border-whisper/8 p-4">
              <Field label="Author">
                <input type="text" value={draft.author_name} onChange={e => update('author_name', e.target.value)} className={INPUT} />
              </Field>
            </div>

            {/* Cover image */}
            <div className="rounded-2xl border border-void/8 dark:border-whisper/8 p-4 space-y-3">
              <Field label="Cover image URL">
                <input type="url" value={draft.cover_image} onChange={e => update('cover_image', e.target.value)}
                  placeholder="https://res.cloudinary.com/…" className={INPUT} />
              </Field>
              {draft.cover_image && (
                <div className="relative rounded-xl overflow-hidden aspect-video bg-void/4">
                  <img src={draft.cover_image} alt="Preview" className="w-full h-full object-cover"
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                </div>
              )}
              <Field label="Alt text">
                <input type="text" value={draft.cover_alt} onChange={e => update('cover_alt', e.target.value)}
                  placeholder="Describe the image…" className={INPUT} />
              </Field>
            </div>

            {/* Read time */}
            <div className="rounded-2xl border border-void/8 dark:border-whisper/8 p-4">
              <Field label="Read time (min)" hint="Auto-calculated from word count.">
                <input type="number" value={draft.read_time} min={1} max={120}
                  onChange={e => update('read_time', parseInt(e.target.value) || 1)} className={INPUT} />
              </Field>
            </div>

            {/* Slug */}
            <div className="rounded-2xl border border-void/8 dark:border-whisper/8 p-4">
              <Field label="URL slug">
                <input type="text" value={draft.slug}
                  onChange={e => { setSlugEdited(true); update('slug', slugify(e.target.value)) }}
                  placeholder="auto-generated-from-title" className={INPUT} />
              </Field>
            </div>

            {/* CTA — docs excluded */}
            {type !== 'doc' && (
              <CtaSelector
                ctaType={draft.cta_type}
                onTypeChange={v => update('cta_type', v)}
                headline={draft.cta_custom_headline}
                onHeadlineChange={v => update('cta_custom_headline', v)}
                body={draft.cta_custom_body}
                onBodyChange={v => update('cta_custom_body', v)}
              />
            )}
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
