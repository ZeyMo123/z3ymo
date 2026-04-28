'use client'

// ─────────────────────────────────────────────────────────────────
// app/admin/(dashboard)/content/docs/[id]/page.tsx
//
// Edit an existing documentation page.
// 3-state: loading → error (with retry) → ContentItemEditor
//
// Docs differ from guides/case-studies:
//   ✗ No categories
//   ✗ No tags
//   ✗ No key takeaways
//   ✗ No end-of-post CTA
//   ✓ Title, excerpt, content (Tiptap), cover image + alt,
//     author, read time, slug, featured, PDF toggle, status
// ─────────────────────────────────────────────────────────────────

import { useEffect, useState } from 'react'
import { useParams }           from 'next/navigation'
import Link                    from 'next/link'
import { supabase }            from '@/lib/supabase/client'
import ContentItemEditor       from '@/components/admin/ContentItemEditor'

export default function EditDocPage() {
  const { id } = useParams<{ id: string }>()

  type State = 'loading' | 'error' | 'success'
  const [state,  setState]  = useState<State>('loading')
  const [data,   setData]   = useState<any>(null)
  const [errMsg, setErrMsg] = useState('')

  function load() {
    setState('loading')
    setErrMsg('')
    supabase.from('content_items').select('*').eq('id', id).single()
      .then(({ data: d, error: e }) => {
        if (e || !d) { setErrMsg(e?.message ?? 'Document not found.'); setState('error'); return }
        setData(d); setState('success')
      })
  }

  useEffect(() => { load() }, [id])

  if (state === 'loading') return (
    <div className="min-h-screen bg-whisper dark:bg-void flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-gold/30 border-t-gold animate-spin" />
        <p className="text-sm text-void/40 dark:text-whisper/40">Loading document…</p>
      </div>
    </div>
  )

  if (state === 'error') return (
    <div className="min-h-screen bg-whisper dark:bg-void flex items-center justify-center px-6">
      <div className="text-center">
        <div className="w-16 h-16 rounded-3xl bg-crimson/8 text-crimson flex items-center justify-center mx-auto mb-5">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <h2 className="font-display font-bold text-xl text-void dark:text-whisper mb-2">Couldn't load document</h2>
        <p className="text-sm text-void/50 dark:text-whisper/50 mb-6 max-w-xs mx-auto">{errMsg}</p>
        <div className="flex gap-3 justify-center">
          <button onClick={load} className="px-5 py-2.5 rounded-full bg-void dark:bg-whisper text-whisper dark:text-void text-sm font-semibold cursor-pointer hover:opacity-90 transition-opacity">Retry</button>
          <Link href="/admin/content/docs" className="px-5 py-2.5 rounded-full border border-void/12 dark:border-whisper/12 text-sm text-void/60 dark:text-whisper/60 hover:border-void/25 transition-colors">Back to docs</Link>
        </div>
      </div>
    </div>
  )

  return (
    <ContentItemEditor
      type="doc"
      itemId={id}
      initial={{
        title:               data.title       ?? '',
        slug:                data.slug        ?? '',
        excerpt:             data.excerpt     ?? '',
        content:             data.content     ?? '',
        cover_image:         data.cover_image ?? '',
        cover_alt:           data.cover_alt   ?? '',
        author_name:         data.author_name ?? 'Z3ymo Team',
        // Docs have no category, tags, key takeaways, or CTA
        category_id:         '',
        tags:                [],
        key_takeaways:       [],
        cta_type:            'none',
        cta_custom_headline: '',
        cta_custom_body:     '',
        // But they do have these:
        read_time:           data.read_time    ?? 5,
        featured:            data.featured     ?? false,
        status:              data.status    ?? 'draft',
        pdf_available:       data.pdf_available ?? true,
      }}
    />
  )
}
