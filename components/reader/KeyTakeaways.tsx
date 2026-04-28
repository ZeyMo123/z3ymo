'use client'

// ─────────────────────────────────────────────────────────────────
// components/reader/KeyTakeaways.tsx
//
// Renders a highlighted box of key takeaways before article content.
// Shown on: blog, guides, and case-study reading pages.
// NOT shown on: docs (API reference has no takeaways).
//
// Props:
//   takeaways: string[]   — array from posts.key_takeaways or
//                           content_items.key_takeaways (TEXT[] column)
// ─────────────────────────────────────────────────────────────────

interface KeyTakeawaysProps {
  takeaways: string[]
}

export default function KeyTakeaways({ takeaways }: KeyTakeawaysProps) {
  if (!takeaways || takeaways.length === 0) return null

  return (
    <div className="rounded-2xl border border-emerald/20 bg-emerald/4 dark:bg-emerald/6 p-6 my-8">

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-xl bg-emerald/12 flex items-center justify-center flex-shrink-0">
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="#1B998B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-emerald">
            Key Takeaways
          </p>
          <p className="text-[11px] text-void/40 dark:text-whisper/40 mt-0.5">
            What you'll walk away with
          </p>
        </div>
      </div>

      {/* Takeaway list */}
      <ol className="space-y-3">
        {takeaways.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            {/* Numbered badge */}
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald/15 text-emerald
              flex items-center justify-center text-[10px] font-bold mt-0.5 leading-none">
              {i + 1}
            </span>
            <span className="text-sm text-void/80 dark:text-whisper/80 leading-relaxed">
              {item}
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}
