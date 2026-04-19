'use client'

// ─────────────────────────────────────────────────────────────────
// components/editor/RichEditor.tsx
//
// npm install @tiptap/react @tiptap/pm @tiptap/starter-kit \
//   @tiptap/extension-link @tiptap/extension-placeholder \
//   @tiptap/extension-underline @tiptap/extension-text-align \
//   @tiptap/extension-highlight @tiptap/extension-character-count \
//   @tiptap/extension-image @tiptap/extension-bubble-menu \
//   @tiptap/extension-floating-menu
//
// Fixes applied vs previous version:
//   1. BubbleMenu/FloatingMenu are Extensions, not JSX components in
//      newer Tiptap — replaced with a custom selection popup built on
//      editor selection events + React state + getBoundingClientRect.
//   2. extendMarkToWordBoundary() removed — does not exist in v2 latest.
//   3. setContent(html, false) → setContent(html, { emitUpdate: false })
//   4. All Toolbar/SelectionBubble props typed as Editor (not Editor|null)
//      and guarded with early-return before the editor is ready.
// ─────────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from 'react'
import { useEditor, EditorContent, type Editor } from '@tiptap/react'
import StarterKit     from '@tiptap/starter-kit'
import Link           from '@tiptap/extension-link'
import Underline      from '@tiptap/extension-underline'
import Placeholder    from '@tiptap/extension-placeholder'
import TextAlign      from '@tiptap/extension-text-align'
import Highlight      from '@tiptap/extension-highlight'
import CharacterCount from '@tiptap/extension-character-count'
import Image          from '@tiptap/extension-image'

// ─── SVG icon set ─────────────────────────────────────────────

const B        = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z"/><path d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z"/></svg>
const It       = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></svg>
const Un       = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 3v7a6 6 0 006 6 6 6 0 006-6V3"/><line x1="4" y1="21" x2="20" y2="21"/></svg>
const St       = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="12" x2="6" y2="12"/><path d="M7 7c0-1.7 1.3-3 3-3h4a3 3 0 013 3v0a3 3 0 01-3 3h-4"/><path d="M17 17c0 1.7-1.3 3-3 3h-4a3 3 0 01-3-3v0"/></svg>
const Lnk      = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
const UnLnk    = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/><line x1="2" y1="2" x2="22" y2="22"/></svg>
const H1       = () => <svg width="16" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M4 12h8M4 5v14M12 5v14M17 5v14M21 9l-4-4"/></svg>
const H2       = () => <svg width="16" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M4 12h8M4 5v14M12 5v14M17 5h3.5a2 2 0 010 4H17l4 5"/></svg>
const H3       = () => <svg width="16" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M4 12h8M4 5v14M12 5v14M17 5h3a2 2 0 010 4h-3m3 0a2 2 0 010 4h-3"/></svg>
const UL       = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="3" cy="6" r="1.5" fill="currentColor"/><circle cx="3" cy="12" r="1.5" fill="currentColor"/><circle cx="3" cy="18" r="1.5" fill="currentColor"/></svg>
const OL       = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><path d="M4 6h1v4M4 10h2M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>
const Quot     = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>
const Cod      = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
const Img      = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
const HR       = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
const Mk       = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
const AlL      = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="18" y2="18"/></svg>
const AlC      = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
const Undo     = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13"/></svg>
const Redo     = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 7v6h-6"/><path d="M3 17a9 9 0 019-9 9 9 0 016 2.3l3 2.7"/></svg>

// ─── Toolbar button ────────────────────────────────────────────

function Btn({
  onClick, active = false, title, children, disabled = false,
}: {
  onClick:   () => void
  active?:   boolean
  title:     string
  children:  React.ReactNode
  disabled?: boolean
}) {
  return (
    <button
      type="button" title={title} disabled={disabled} onClick={onClick}
      className={[
        'flex items-center justify-center w-8 h-8 rounded-lg transition-all cursor-pointer',
        'hover:bg-void/8 dark:hover:bg-whisper/8',
        active   ? 'bg-crimson/10 text-crimson' : 'text-void/55 dark:text-whisper/55',
        disabled ? 'opacity-30 cursor-not-allowed' : '',
      ].join(' ')}
    >
      {children}
    </button>
  )
}

const Sep = () => <div className="w-px h-5 bg-void/10 dark:bg-whisper/10 mx-0.5" />

// ─── Link dialog ───────────────────────────────────────────────

function LinkDialog({
  initial, onSubmit, onClose,
}: {
  initial:  string
  onSubmit: (url: string) => void
  onClose:  () => void
}) {
  const [url, setUrl] = useState(initial)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-void/30 backdrop-blur-sm"
      onClick={onClose}>
      <div className="bg-whisper dark:bg-[#1A1A22] rounded-2xl border border-void/12 dark:border-whisper/10 p-6 w-full max-w-sm shadow-2xl"
        onClick={e => e.stopPropagation()}>
        <h3 className="font-display font-semibold text-base text-void dark:text-whisper mb-4">Insert link</h3>
        <input
          autoFocus type="url" value={url} onChange={e => setUrl(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && url && onSubmit(url)}
          placeholder="https://example.com"
          className="w-full px-4 py-3 rounded-xl border border-void/12 dark:border-whisper/12 bg-transparent text-void dark:text-whisper text-sm placeholder:text-void/30 dark:placeholder:text-whisper/30 focus:outline-none focus:border-crimson/40 mb-4"
        />
        <div className="flex gap-2">
          <button type="button" onClick={() => url && onSubmit(url)} disabled={!url}
            className="flex-1 py-2.5 rounded-xl bg-crimson text-white text-sm font-semibold disabled:opacity-40 hover:bg-crimson/90 transition-colors cursor-pointer">
            Insert link
          </button>
          <button type="button" onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-void/12 dark:border-whisper/12 text-sm text-void/60 dark:text-whisper/60 hover:bg-void/5 transition-colors cursor-pointer">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Image dialog ──────────────────────────────────────────────

function ImageDialog({ onSubmit, onClose }: {
  onSubmit: (src: string, alt: string) => void
  onClose:  () => void
}) {
  const [src, setSrc] = useState('')
  const [alt, setAlt] = useState('')
  const IC = 'w-full px-4 py-3 rounded-xl border border-void/12 dark:border-whisper/12 bg-transparent text-void dark:text-whisper text-sm placeholder:text-void/30 dark:placeholder:text-whisper/30 focus:outline-none focus:border-crimson/40'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-void/30 backdrop-blur-sm"
      onClick={onClose}>
      <div className="bg-whisper dark:bg-[#1A1A22] rounded-2xl border border-void/12 dark:border-whisper/10 p-6 w-full max-w-sm shadow-2xl"
        onClick={e => e.stopPropagation()}>
        <h3 className="font-display font-semibold text-base text-void dark:text-whisper mb-4">Insert image</h3>
        <div className="space-y-3">
          <input autoFocus type="url" value={src} onChange={e => setSrc(e.target.value)} placeholder="Image URL" className={IC} />
          <input type="text" value={alt} onChange={e => setAlt(e.target.value)} placeholder="Alt text" className={IC} />
        </div>
        <div className="flex gap-2 mt-4">
          <button type="button" onClick={() => src && onSubmit(src, alt)} disabled={!src}
            className="flex-1 py-2.5 rounded-xl bg-crimson text-white text-sm font-semibold disabled:opacity-40 hover:bg-crimson/90 transition-colors cursor-pointer">
            Insert image
          </button>
          <button type="button" onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-void/12 dark:border-whisper/12 text-sm text-void/60 dark:text-whisper/60 hover:bg-void/5 transition-colors cursor-pointer">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Toolbar ───────────────────────────────────────────────────
// Accepts Editor (never null) — caller guards before rendering.

function Toolbar({ editor }: { editor: Editor }) {
  const [linkOpen,  setLinkOpen]  = useState(false)
  const [imageOpen, setImageOpen] = useState(false)

  const applyLink = (url: string) => {
    // FIX: extendMarkToWordBoundary removed — just setLink directly
    editor.chain().focus().setLink({ href: url, target: '_blank', rel: 'noopener noreferrer' }).run()
    setLinkOpen(false)
  }

  const applyImage = (src: string, alt: string) => {
    editor.chain().focus().setImage({ src, alt }).run()
    setImageOpen(false)
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-void/8 dark:border-whisper/8 bg-whisper dark:bg-[#111118] rounded-t-2xl sticky top-0 z-10">

        {/* Headings */}
        <Btn title="Heading 1" active={editor.isActive('heading', { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}><H1 /></Btn>
        <Btn title="Heading 2" active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><H2 /></Btn>
        <Btn title="Heading 3" active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><H3 /></Btn>
        <Sep />

        {/* Inline */}
        <Btn title="Bold (Ctrl+B)"      active={editor.isActive('bold')}       onClick={() => editor.chain().focus().toggleBold().run()}><B /></Btn>
        <Btn title="Italic (Ctrl+I)"    active={editor.isActive('italic')}     onClick={() => editor.chain().focus().toggleItalic().run()}><It /></Btn>
        <Btn title="Underline (Ctrl+U)" active={editor.isActive('underline')}  onClick={() => editor.chain().focus().toggleUnderline().run()}><Un /></Btn>
        <Btn title="Strikethrough"      active={editor.isActive('strike')}     onClick={() => editor.chain().focus().toggleStrike().run()}><St /></Btn>
        <Btn title="Highlight"          active={editor.isActive('highlight')}  onClick={() => editor.chain().focus().toggleHighlight().run()}><Mk /></Btn>
        <Sep />

        {/* Link */}
        <Btn title="Insert link"  active={editor.isActive('link')}          onClick={() => setLinkOpen(true)}><Lnk /></Btn>
        <Btn title="Remove link"  disabled={!editor.isActive('link')}       onClick={() => editor.chain().focus().unsetLink().run()}><UnLnk /></Btn>
        <Sep />

        {/* Blocks */}
        <Btn title="Bullet list"   active={editor.isActive('bulletList')}  onClick={() => editor.chain().focus().toggleBulletList().run()}><UL /></Btn>
        <Btn title="Numbered list" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}><OL /></Btn>
        <Btn title="Blockquote"    active={editor.isActive('blockquote')}  onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quot /></Btn>
        <Btn title="Code block"    active={editor.isActive('codeBlock')}   onClick={() => editor.chain().focus().toggleCodeBlock().run()}><Cod /></Btn>
        <Sep />

        {/* Alignment */}
        <Btn title="Align left"   active={editor.isActive({ textAlign: 'left' })}   onClick={() => editor.chain().focus().setTextAlign('left').run()}><AlL /></Btn>
        <Btn title="Align center" active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()}><AlC /></Btn>
        <Sep />

        {/* Insert */}
        <Btn title="Insert image"    onClick={() => setImageOpen(true)}><Img /></Btn>
        <Btn title="Insert divider"  onClick={() => editor.chain().focus().setHorizontalRule().run()}><HR /></Btn>
        <Sep />

        {/* Undo / Redo */}
        <Btn title="Undo (Ctrl+Z)"        disabled={!editor.can().undo()} onClick={() => editor.chain().focus().undo().run()}><Undo /></Btn>
        <Btn title="Redo (Ctrl+Shift+Z)"  disabled={!editor.can().redo()} onClick={() => editor.chain().focus().redo().run()}><Redo /></Btn>

        {/* Word count */}
        <div className="ml-auto text-xs text-void/30 dark:text-whisper/30 pr-2 tabular-nums">
          {(editor.storage.characterCount as any)?.words?.() ?? 0} words
        </div>
      </div>

      {linkOpen  && <LinkDialog  initial={editor.getAttributes('link').href ?? ''} onSubmit={applyLink}  onClose={() => setLinkOpen(false)} />}
      {imageOpen && <ImageDialog onSubmit={applyImage} onClose={() => setImageOpen(false)} />}
    </>
  )
}

// ─── Custom selection bubble ───────────────────────────────────
// FIX: BubbleMenu from @tiptap/extension-bubble-menu is an Extension
// (not a JSX component). We build our own using editor selection events
// + getBoundingClientRect so it works with any Tiptap version.

interface BubblePos { top: number; left: number }

function SelectionBubble({ editor }: { editor: Editor }) {
  const [pos,      setPos]      = useState<BubblePos | null>(null)
  const [linkOpen, setLinkOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const update = () => {
      const { state, view } = editor
      const { selection }   = state

      // Show only when there is a non-empty text selection
      if (selection.empty || !view.hasFocus()) {
        setPos(null)
        return
      }

      // Get screen coordinates of the selection
      const { from, to } = selection
      const start = view.coordsAtPos(from)
      const end   = view.coordsAtPos(to)

      const editorEl = view.dom.closest('.z3ymo-editor') as HTMLElement | null
      if (!editorEl) { setPos(null); return }

      const box = editorEl.getBoundingClientRect()

      // Centre horizontally over the selection, position above it
      const midX   = (start.left + end.left) / 2 - box.left
      const top    = start.top - box.top - 52   // 52 = bubble height + gap

      setPos({ top, left: midX })
    }

    editor.on('selectionUpdate', update)
    editor.on('focus',           update)
    editor.on('blur',            () => setPos(null))

    return () => {
      editor.off('selectionUpdate', update)
      editor.off('focus',           update)
      editor.off('blur',            () => setPos(null))
    }
  }, [editor])

  const applyLink = (url: string) => {
    editor.chain().focus().setLink({ href: url, target: '_blank' }).run()
    setLinkOpen(false)
  }

  if (!pos) return null

  return (
    <>
      <div
        ref={ref}
        className="absolute z-30 flex items-center gap-0.5 px-1.5 py-1.5 rounded-xl bg-void dark:bg-[#1A1A22] border border-white/10 shadow-xl"
        style={{ top: pos.top, left: pos.left, transform: 'translateX(-50%)' }}
        // Prevent editor blur when clicking bubble buttons
        onMouseDown={e => e.preventDefault()}
      >
        {[
          { title: 'Bold',      active: editor.isActive('bold'),      icon: <B />,  action: () => editor.chain().focus().toggleBold().run() },
          { title: 'Italic',    active: editor.isActive('italic'),    icon: <It />, action: () => editor.chain().focus().toggleItalic().run() },
          { title: 'Underline', active: editor.isActive('underline'), icon: <Un />, action: () => editor.chain().focus().toggleUnderline().run() },
          { title: 'Highlight', active: editor.isActive('highlight'), icon: <Mk />, action: () => editor.chain().focus().toggleHighlight().run() },
        ].map(item => (
          <button key={item.title} type="button" title={item.title} onClick={item.action}
            className={[
              'flex items-center justify-center w-7 h-7 rounded-lg transition-colors cursor-pointer',
              item.active ? 'bg-crimson text-white' : 'text-white/70 hover:bg-white/10',
            ].join(' ')}>
            {item.icon}
          </button>
        ))}

        <div className="w-px h-4 bg-white/15 mx-0.5" />

        {/* Heading shortcuts */}
        {([1, 2, 3] as const).map(level => (
          <button key={level} type="button" title={`Heading ${level}`}
            onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
            className={[
              'flex items-center justify-center w-7 h-7 rounded-lg text-[11px] font-bold transition-colors cursor-pointer',
              editor.isActive('heading', { level }) ? 'bg-crimson text-white' : 'text-white/70 hover:bg-white/10',
            ].join(' ')}>
            H{level}
          </button>
        ))}

        <div className="w-px h-4 bg-white/15 mx-0.5" />

        {/* Link */}
        <button type="button" title="Link" onClick={() => setLinkOpen(true)}
          className={[
            'flex items-center justify-center w-7 h-7 rounded-lg transition-colors cursor-pointer',
            editor.isActive('link') ? 'bg-crimson text-white' : 'text-white/70 hover:bg-white/10',
          ].join(' ')}>
          <Lnk />
        </button>
        {editor.isActive('link') && (
          <button type="button" title="Remove link" onClick={() => editor.chain().focus().unsetLink().run()}
            className="flex items-center justify-center w-7 h-7 rounded-lg text-white/70 hover:bg-white/10 transition-colors cursor-pointer">
            <UnLnk />
          </button>
        )}
      </div>

      {linkOpen && (
        <LinkDialog
          initial={editor.getAttributes('link').href ?? ''}
          onSubmit={applyLink}
          onClose={() => setLinkOpen(false)}
        />
      )}
    </>
  )
}

// ─── Main editor component ─────────────────────────────────────

interface RichEditorProps {
  value:        string
  onChange:     (html: string) => void
  placeholder?: string
  minHeight?:   string
}

export default function RichEditor({
  value,
  onChange,
  placeholder = 'Start writing here…\n\nSelect any text to see quick formatting options, or use the toolbar above.',
  minHeight   = '480px',
}: RichEditorProps) {

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Underline,
      Highlight.configure({ multicolor: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      CharacterCount,
      Placeholder.configure({ placeholder }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class:  'text-crimson underline underline-offset-2 hover:opacity-80 transition-opacity',
          target: '_blank',
          rel:    'noopener noreferrer',
        },
      }),
      Image.configure({
        HTMLAttributes: { class: 'rounded-2xl w-full max-w-full' },
      }),
    ],
    content:  value || '',
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: { class: 'focus:outline-none' },
    },
    immediatelyRender: false,  // avoids SSR hydration mismatch
  })

  // Sync external value without triggering onUpdate
  useEffect(() => {
    if (!editor || editor.isDestroyed) return
    const current = editor.getHTML()
    if (value !== current) {
      // FIX: second param is SetContentOptions, not boolean
      editor.commands.setContent(value || '', { emitUpdate: false } as any)
    }
  }, [value, editor])

  // Guard: don't render toolbar/bubble until editor is ready
  const ready = !!editor

  return (
    <>
      <style>{`
        .z3ymo-editor .ProseMirror {
          min-height: ${minHeight};
          padding: 1.5rem;
          color: inherit;
          line-height: 1.8;
        }
        .z3ymo-editor .ProseMirror h1 { font-size:1.875rem; font-weight:700; margin:1.5rem 0 0.75rem; line-height:1.2; }
        .z3ymo-editor .ProseMirror h2 { font-size:1.5rem;   font-weight:700; margin:1.25rem 0 0.6rem; line-height:1.3; }
        .z3ymo-editor .ProseMirror h3 { font-size:1.25rem;  font-weight:600; margin:1rem 0 0.5rem;   line-height:1.3; }
        .z3ymo-editor .ProseMirror p  { margin-bottom:0.875rem; }
        .z3ymo-editor .ProseMirror ul { list-style:disc;    padding-left:1.5rem; margin-bottom:0.875rem; }
        .z3ymo-editor .ProseMirror ol { list-style:decimal; padding-left:1.5rem; margin-bottom:0.875rem; }
        .z3ymo-editor .ProseMirror li { margin-bottom:0.25rem; }
        .z3ymo-editor .ProseMirror blockquote {
          border-left:2px solid #C0392B; padding:0.25rem 0 0.25rem 1rem;
          margin:1rem 0; font-style:italic; opacity:0.65;
        }
        .z3ymo-editor .ProseMirror pre {
          background:rgba(10,10,15,0.06); border-radius:0.75rem;
          padding:1rem 1.25rem; font-family:ui-monospace,monospace;
          font-size:0.85em; margin:1rem 0; overflow-x:auto;
        }
        .dark .z3ymo-editor .ProseMirror pre { background:rgba(255,255,255,0.05); }
        .z3ymo-editor .ProseMirror code:not(pre code) {
          background:rgba(192,57,43,0.08); color:#C0392B;
          padding:0.15em 0.4em; border-radius:0.3rem;
          font-size:0.85em; font-family:ui-monospace,monospace;
        }
        .z3ymo-editor .ProseMirror hr { border:none; border-top:1px solid rgba(10,10,15,0.1); margin:2rem 0; }
        .dark .z3ymo-editor .ProseMirror hr { border-top-color:rgba(240,238,248,0.1); }
        .z3ymo-editor .ProseMirror mark { background:rgba(201,168,76,0.25); padding:0.05em 0.2em; border-radius:0.2rem; }
        .z3ymo-editor .ProseMirror img { margin:1.5rem 0; }
        .z3ymo-editor .ProseMirror p.is-editor-empty:first-child::before {
          content:attr(data-placeholder);
          float:left; color:rgba(10,10,15,0.22); pointer-events:none; height:0; white-space:pre-line;
        }
        .dark .z3ymo-editor .ProseMirror p.is-editor-empty:first-child::before {
          color:rgba(240,238,248,0.18);
        }
        .z3ymo-editor .ProseMirror:focus-visible { outline:none; }
      `}</style>

      <div className="z3ymo-editor relative rounded-2xl border border-void/10 dark:border-whisper/10 overflow-hidden bg-white dark:bg-[#0F0F16]">
        {/* Toolbar — only rendered when editor is ready (Editor, not null) */}
        {ready && <Toolbar editor={editor} />}

        {/* Editor content + selection bubble */}
        <div className="relative">
          <EditorContent editor={editor} />
          {/* Selection bubble — only rendered when editor ready */}
          {ready && <SelectionBubble editor={editor} />}
        </div>
      </div>
    </>
  )
}
