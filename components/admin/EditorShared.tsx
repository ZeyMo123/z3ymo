'use client'

// ─────────────────────────────────────────────────────────────────
// components/admin/EditorShared.tsx
//
// Shared primitive components used by ALL admin content editors:
//   • blog/new/page.tsx
//   • blog/[id]/page.tsx
//   • components/admin/ContentItemEditor.tsx
//
// Exporting from one place means any UI fix applies everywhere.
// ─────────────────────────────────────────────────────────────────

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// ─── Style constants ──────────────────────────────────────────

export const LABEL = 'block text-xs font-semibold uppercase tracking-wider text-void/40 dark:text-whisper/40 mb-2'
export const INPUT = 'w-full px-4 py-3 rounded-xl border border-void/10 dark:border-whisper/10 bg-transparent text-void dark:text-whisper text-sm placeholder:text-void/25 dark:placeholder:text-whisper/25 focus:outline-none focus:border-crimson/40 focus:ring-2 focus:ring-crimson/8 transition-all'

// ─── Field wrapper ────────────────────────────────────────────

export function Field({
  label, hint, children,
}: {
  label:    string
  hint?:    string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className={LABEL}>{label}</label>
      {children}
      {hint && (
        <p className="text-[11px] text-void/30 dark:text-whisper/30 mt-1.5 leading-relaxed">
          {hint}
        </p>
      )}
    </div>
  )
}

// ─── Toggle switch ────────────────────────────────────────────

export function Toggle({
  checked, onChange, label, sublabel,
}: {
  checked:   boolean
  onChange:  () => void
  label:     string
  sublabel?: string
}) {
  return (
    <div className="flex items-center justify-between cursor-pointer" onClick={onChange}>
      <div>
        <p className="text-sm font-medium text-void dark:text-whisper">{label}</p>
        {sublabel && (
          <p className="text-xs text-void/40 dark:text-whisper/40 mt-0.5">{sublabel}</p>
        )}
      </div>
      <div className={[
        'relative w-10 h-[22px] rounded-full transition-colors duration-200 flex-shrink-0 ml-4',
        checked ? 'bg-crimson' : 'bg-void/15 dark:bg-whisper/15',
      ].join(' ')}>
        <div className={[
          'absolute top-[3px] w-4 h-4 bg-white rounded-full shadow transition-transform duration-200',
          checked ? 'translate-x-[22px]' : 'translate-x-[3px]',
        ].join(' ')} />
      </div>
    </div>
  )
}

// ─── Tags chip input ─────────────────────────────────────────
// Press Enter or comma to add. Backspace to remove last.

export function TagsInput({
  tags, onChange,
}: {
  tags:     string[]
  onChange: (tags: string[]) => void
}) {
  const [input, setInput] = useState('')

  const add = (raw: string) => {
    const cleaned = raw.trim().toLowerCase().replace(/\s+/g, '-')
    if (!cleaned || tags.includes(cleaned)) { setInput(''); return }
    onChange([...tags, cleaned])
    setInput('')
  }

  const remove = (tag: string) => onChange(tags.filter(t => t !== tag))

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add(input) }
    if (e.key === 'Backspace' && !input && tags.length) remove(tags[tags.length - 1])
  }

  return (
    <div className="min-h-[44px] w-full px-3 py-2 rounded-xl border border-void/10 dark:border-whisper/10
      bg-transparent focus-within:border-crimson/40 focus-within:ring-2 focus-within:ring-crimson/8
      transition-all flex flex-wrap gap-1.5 items-center">
      {tags.map(tag => (
        <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full
          bg-void/6 dark:bg-whisper/6 text-[11px] font-medium text-void/70 dark:text-whisper/70">
          {tag}
          <button
            type="button"
            onClick={() => remove(tag)}
            className="text-void/40 dark:text-whisper/40 hover:text-crimson transition-colors leading-none cursor-pointer"
          >
            ×
          </button>
        </span>
      ))}
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        onBlur={() => input && add(input)}
        placeholder={tags.length ? '' : 'Add tags… (Enter or comma)'}
        className="flex-1 min-w-[120px] bg-transparent text-sm text-void dark:text-whisper
          placeholder:text-void/25 dark:placeholder:text-whisper/25 focus:outline-none"
      />
    </div>
  )
}

// ─── Key Takeaways input ──────────────────────────────────────
// Ordered list of short insight bullet points.
// Enter on the input field adds a new item.
// Existing items are directly editable inline.

export function KeyTakeawaysInput({
  items, onChange,
}: {
  items:    string[]
  onChange: (v: string[]) => void
}) {
  const [input, setInput] = useState('')

  const add = () => {
    const c = input.trim()
    if (!c) return
    onChange([...items, c])
    setInput('')
  }

  const remove  = (i: number) => onChange(items.filter((_, idx) => idx !== i))
  const update  = (i: number, val: string) =>
    onChange(items.map((x, idx) => idx === i ? val : x))

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2 items-start">
          {/* Number badge */}
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald/10 text-emerald
            flex items-center justify-center text-[11px] font-bold mt-2.5">
            {i + 1}
          </span>
          <input
            value={item}
            onChange={e => update(i, e.target.value)}
            className={`${INPUT} flex-1`}
          />
          <button
            type="button"
            onClick={() => remove(i)}
            className="flex-shrink-0 px-3 py-2.5 rounded-xl border border-void/10 dark:border-whisper/10
              text-void/40 dark:text-whisper/40 hover:text-crimson hover:border-crimson/30
              transition-all cursor-pointer text-sm mt-0"
          >
            ×
          </button>
        </div>
      ))}

      {/* Add new */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), add())}
          placeholder="Add a key takeaway… (press Enter)"
          className={`${INPUT} flex-1`}
        />
        <button
          type="button"
          onClick={add}
          className="flex-shrink-0 px-4 py-2.5 rounded-xl border border-void/10 dark:border-whisper/10
            text-sm text-void/60 dark:text-whisper/60
            hover:border-void/25 dark:hover:border-whisper/25
            hover:text-void dark:hover:text-whisper
            transition-all cursor-pointer"
        >
          Add
        </button>
      </div>

      {items.length === 0 && (
        <p className="text-[11px] text-void/30 dark:text-whisper/30 pt-1">
          Add 3–5 concrete outcomes the reader will walk away with.
        </p>
      )}
    </div>
  )
}

// ─── Error toast ──────────────────────────────────────────────
// Slides up from the bottom. Auto-dismisses after 8s.

export function ErrorToast({
  message, onDismiss,
}: {
  message:   string
  onDismiss: () => void
}) {
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
        <div className="w-8 h-8 rounded-full bg-crimson/10 flex items-center justify-center flex-shrink-0 mt-0.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="#C0392B" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-void dark:text-whisper mb-0.5">
            Couldn't save
          </p>
          <p className="text-xs text-void/55 dark:text-whisper/50 leading-relaxed break-words">
            {message}
          </p>
        </div>
        <button
          onClick={onDismiss}
          className="flex-shrink-0 text-void/30 dark:text-whisper/30 hover:text-void dark:hover:text-whisper transition-colors cursor-pointer mt-0.5"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </motion.div>
  )
}

// ─── CTA options ──────────────────────────────────────────────

export type CtaType = 'consultation' | 'services' | 'products' | 'pulse' | 'none'

export const CTA_OPTIONS: { value: CtaType; label: string; desc: string }[] = [
  { value: 'consultation', label: 'Free Consultation', desc: 'Invite readers to book a free call' },
  { value: 'services',     label: 'Services',          desc: 'Promote custom development work' },
  { value: 'products',     label: 'Platforms',         desc: 'Showcase Z3ymo platform products' },
  { value: 'pulse',        label: 'Pulse Waitlist',    desc: 'Drive signups for Z3ymo Pulse' },
  { value: 'none',         label: 'No CTA',            desc: 'No sticky or inline CTA shown' },
]

// ─── CTA selector block ───────────────────────────────────────
// Full CTA picker: radio options + optional custom headline/body

export function CtaSelector({
  ctaType, onTypeChange,
  headline, onHeadlineChange,
  body, onBodyChange,
  excludeDoc = false,
}: {
  ctaType:          CtaType
  onTypeChange:     (v: CtaType) => void
  headline:         string
  onHeadlineChange: (v: string) => void
  body:             string
  onBodyChange:     (v: string) => void
  excludeDoc?:      boolean
}) {
  if (excludeDoc) return null

  return (
    <div className="rounded-2xl border border-void/8 dark:border-whisper/8 p-4 space-y-4">
      <div>
        <p className={LABEL}>End-of-post CTA</p>
        <p className="text-xs text-void/40 dark:text-whisper/40 mb-3">
          A sticky card that slides up as readers finish the article. Choose an offer, then optionally customize the text.
        </p>
        <div className="space-y-2">
          {CTA_OPTIONS.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onTypeChange(opt.value)}
              className={[
                'w-full flex items-start gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer',
                ctaType === opt.value
                  ? 'border-crimson/30 bg-crimson/4 dark:bg-crimson/6'
                  : 'border-void/8 dark:border-whisper/8 hover:border-void/14 dark:hover:border-whisper/14',
              ].join(' ')}
            >
              <div className={[
                'w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 mt-0.5 transition-colors',
                ctaType === opt.value
                  ? 'border-crimson bg-crimson'
                  : 'border-void/20 dark:border-whisper/20',
              ].join(' ')} />
              <div>
                <div className={`text-xs font-semibold ${ctaType === opt.value ? 'text-crimson' : 'text-void/70 dark:text-whisper/70'}`}>
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

      {/* Custom text — only when a CTA is selected */}
      {ctaType !== 'none' && (
        <div className="space-y-3 pt-3 border-t border-void/8 dark:border-whisper/8">
          <p className="text-[11px] font-semibold text-void/40 dark:text-whisper/40 uppercase tracking-wider">
            Custom text (optional)
          </p>
          <p className="text-[11px] text-void/35 dark:text-whisper/35 -mt-1">
            Leave blank to use the default text for the selected offer type.
          </p>
          <Field label="Headline">
            <input
              type="text"
              value={headline}
              onChange={e => onHeadlineChange(e.target.value)}
              placeholder="e.g. Ready to build this for your business?"
              className={INPUT}
            />
          </Field>
          <Field label="Body text">
            <textarea
              value={body}
              onChange={e => onBodyChange(e.target.value)}
              placeholder="e.g. We'll help you plan the right approach. Book a free call."
              rows={3}
              className={`${INPUT} resize-none`}
            />
          </Field>
        </div>
      )}
    </div>
  )
}
