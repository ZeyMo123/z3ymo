'use client'

// ─────────────────────────────────────────────────────────────────
// components/content/ContentCard.tsx
//
// Reusable card for Guides, Case Studies, and Documentation.
// Adapts labels, colors, and href path based on content type.
// ─────────────────────────────────────────────────────────────────

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { ContentItem, ContentType } from '@/lib/supabase/client'

// ─── Type config ──────────────────────────────────────────────

const TYPE_CONFIG: Record<ContentType, {
  label:     string
  color:     string
  basePath:  string
}> = {
  'guide':       { label: 'Guide',       color: '#1B998B', basePath: '/guides' },
  'case-study':  { label: 'Case Study',  color: '#C0392B', basePath: '/case-studies' },
  'doc':         { label: 'Docs',        color: '#C9A84C', basePath: '/docs' },
}

// ─── Helpers ──────────────────────────────────────────────────

function formatDate(iso: string | null): string {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}

// ─── Icons ────────────────────────────────────────────────────

const ClockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
)

const DownloadIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
)

const ArrowIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)

const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

// ─── Cover fallback ───────────────────────────────────────────

function CoverFallback({ color, type }: { color: string; type: ContentType }) {
  const labels: Record<ContentType, string> = {
    'guide': 'Guide', 'case-study': 'Case', 'doc': 'Docs',
  }
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${color}12 0%, ${color}05 100%)` }}>
      <span className="font-display font-bold text-6xl leading-none select-none"
        style={{ color, opacity: 0.07 }}>
        {labels[type]}
      </span>
      <div className="absolute bottom-0 left-0 right-0 h-[3px]"
        style={{ background: `linear-gradient(90deg, ${color}, ${color}40)` }} />
    </div>
  )
}

// ─── Props ────────────────────────────────────────────────────

interface ContentCardProps {
  item:       ContentItem
  compact?:   boolean
  className?: string
}

// ─── Component ────────────────────────────────────────────────

export default function ContentCard({ item, compact = false, className = '' }: ContentCardProps) {
  const config   = TYPE_CONFIG[item.type]
  const catColor = item.categories?.color ?? config.color
  const href     = `${config.basePath}/${item.slug}`

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      className={[
        'group flex flex-col h-full rounded-3xl border overflow-hidden',
        'bg-white dark:bg-white/[0.03]',
        'border-void/8 dark:border-white/8',
        'shadow-sm dark:shadow-none',
        'hover:shadow-lg dark:hover:shadow-[0_8px_32px_rgba(0,0,0,0.35)]',
        'transition-shadow duration-300',
        className,
      ].join(' ')}
    >
      {/* Cover */}
      <Link href={href} className="block flex-shrink-0" tabIndex={-1} aria-hidden="true">
        <div className={`relative w-full overflow-hidden bg-void/4 dark:bg-white/4 ${compact ? 'h-40' : 'h-48 sm:h-52'}`}>
          {item.cover_image ? (
            <img
              src={item.cover_image}
              alt={item.cover_alt ?? item.title}
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
              loading="lazy"
            />
          ) : (
            <CoverFallback color={config.color} type={item.type} />
          )}

          {/* PDF badge */}
          {item.pdf_available && (
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold
                bg-white/90 dark:bg-void/90 text-void/60 dark:text-whisper/60 backdrop-blur-sm">
                <DownloadIcon />
                PDF
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Body */}
      <div className={`flex flex-col flex-1 ${compact ? 'p-5' : 'p-6'}`}>

        {/* Badges row */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {/* Type badge */}
          <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full"
            style={{ background: `${config.color}12`, color: config.color }}>
            {config.label}
          </span>

          {/* Category badge */}
          {item.categories && (
            <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
              style={{ background: `${catColor}10`, color: catColor }}>
              {item.categories.name}
            </span>
          )}
        </div>

        {/* Title */}
        <Link href={href} className="group/title block mb-2.5 flex-1">
          <h3 className={[
            'font-display font-bold leading-tight',
            'text-void dark:text-white',
            'group-hover/title:text-crimson transition-colors duration-200',
            compact ? 'text-base' : 'text-lg',
          ].join(' ')}>
            {item.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className={[
          'text-void/50 dark:text-white/45 leading-relaxed mb-5 line-clamp-2',
          compact ? 'text-xs' : 'text-sm',
        ].join(' ')}>
          {item.excerpt}
        </p>

        {/* Key takeaways preview — guides/case-studies only */}
        {item.type !== 'doc' && item.key_takeaways?.length > 0 && !compact && (
          <div className="mb-5 p-3.5 rounded-xl bg-emerald/4 border border-emerald/12">
            <p className="text-[10px] font-bold uppercase tracking-wider text-emerald/70 mb-2">
              Key takeaways
            </p>
            <div className="space-y-1.5">
              {item.key_takeaways.slice(0, 2).map((t, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-void/60 dark:text-white/50">
                  <span className="w-4 h-4 rounded-full bg-emerald/15 flex items-center justify-center flex-shrink-0 mt-0.5 text-emerald">
                    <CheckIcon />
                  </span>
                  <span className="line-clamp-1">{t}</span>
                </div>
              ))}
              {item.key_takeaways.length > 2 && (
                <p className="text-[10px] text-void/35 dark:text-white/30 pl-6">
                  +{item.key_takeaways.length - 2} more inside
                </p>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-4
          border-t border-void/6 dark:border-white/6">
          <div className="flex items-center gap-2 text-[11px] text-void/35 dark:text-white/30">
            <ClockIcon />
            <span>{item.read_time} min read</span>
            {item.published_at && (
              <>
                <span>·</span>
                <span>{formatDate(item.published_at)}</span>
              </>
            )}
          </div>

          <Link href={href}
            className="flex items-center gap-1 text-[11px] font-semibold text-crimson
              opacity-0 group-hover:opacity-100 hover:gap-2 transition-all duration-200">
            {item.type === 'doc' ? 'Read docs' : 'Read'}
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
