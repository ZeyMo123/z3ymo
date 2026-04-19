'use client'

// ─────────────────────────────────────────────────────────────────
// components/blog/BlogCard.tsx
//
// Reusable blog post card.
//
// Props:
//   compact  — slightly smaller typography + cover, used in grid
//   variant  — 'default' (standard) | 'featured' (hero-style, wider)
//
// Cover image fallback:
//   When cover_image is null, generates a Cloudinary auto-OG image
//   using the post title as a text overlay (requires next-cloudinary).
//   Falls back to a CSS placeholder if Cloudinary is unavailable.
// ─────────────────────────────────────────────────────────────────

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Post } from '@/lib/supabase/client'

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

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)

// ─── Cover fallback ───────────────────────────────────────────
// Branded gradient placeholder shown when no cover_image is set.
// Displays category color + post title initial letter.

function CoverFallback({
  title, accent, variant,
}: { title: string; accent: string; variant: BlogVariant }) {
  const isFeature = variant === 'featured'
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-3 px-6"
      style={{ background: `linear-gradient(135deg, ${accent}14 0%, ${accent}06 100%)` }}
    >
      {/* Z3ymo wordmark as watermark */}
      <span
        className="font-display font-bold text-5xl sm:text-7xl leading-none tracking-tight select-none"
        style={{ color: accent, opacity: 0.08 }}
        aria-hidden="true"
      >
        Z3
      </span>
      {/* Category accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px]"
        style={{ background: `linear-gradient(90deg, ${accent}, ${accent}44)` }} />
    </div>
  )
}

// ─── Types ────────────────────────────────────────────────────

type BlogVariant = 'default' | 'featured'

export interface BlogCardProps {
  post:       Post
  /** Compact = smaller typography + cover. Used in grid layouts. */
  compact?:   boolean
  /** 'featured' renders a larger hero-style card with bigger cover + title */
  variant?:   BlogVariant
  /** Additional Tailwind classes on the wrapper */
  className?: string
}

// ─── Component ────────────────────────────────────────────────

export default function BlogCard({
  post,
  compact  = false,
  variant  = 'default',
  className = '',
}: BlogCardProps) {
  const catColor  = post.categories?.color ?? '#C0392B'
  const isFeatured = variant === 'featured'

  // ── Cover height ──
  const coverHeight = isFeatured
    ? 'h-60 sm:h-72'
    : compact
      ? 'h-40 sm:h-44'
      : 'h-48 sm:h-52'

  // ── Wrapper classes ──
  const wrapperCls = [
    'group flex flex-col h-full rounded-3xl border overflow-hidden',
    'bg-white dark:bg-white/[0.03]',
    'border-void/8 dark:border-white/8',
    'shadow-sm dark:shadow-none',
    'hover:shadow-lg dark:hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]',
    'transition-shadow duration-300',
    isFeatured && 'ring-2 ring-crimson/15',
    className,
  ].filter(Boolean).join(' ')

  return (
    <motion.article
      whileHover={{ y: isFeatured ? -6 : -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      className={wrapperCls}
    >
      {/* ── Cover ── */}
      <Link
        href={`/blog/${post.slug}`}
        className="block flex-shrink-0 relative overflow-hidden"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className={`relative w-full ${coverHeight} overflow-hidden bg-void/4 dark:bg-white/4`}>
          {post.cover_image ? (
            <img
              src={post.cover_image}
              alt={post.cover_alt ?? post.title}
              className="w-full h-full object-cover
                group-hover:scale-[1.04] transition-transform duration-500 ease-out"
              loading="lazy"
            />
          ) : (
            <CoverFallback title={post.title} accent={catColor} variant={variant} />
          )}

          {/* Featured badge overlay */}
          {isFeatured && (
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full
                text-[10px] font-bold tracking-wider uppercase
                bg-crimson text-white shadow-lg shadow-crimson/25">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Featured
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* ── Body ── */}
      <div className={`flex flex-col flex-1 ${isFeatured ? 'p-7' : compact ? 'p-5' : 'p-6'}`}>

        {/* Category badge */}
        {post.categories && (
          <div className="mb-3">
            <span
              className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full"
              style={{ background: `${catColor}12`, color: catColor }}
            >
              {post.categories.name}
            </span>
          </div>
        )}

        {/* Title */}
        <Link href={`/blog/${post.slug}`} className="group/title block mb-2.5 flex-1">
          <h3 className={[
            'font-display font-bold leading-tight',
            'text-void dark:text-white',
            'group-hover/title:text-crimson transition-colors duration-200',
            isFeatured ? 'text-xl sm:text-2xl' : compact ? 'text-base' : 'text-lg',
          ].join(' ')}>
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className={[
          'text-void/50 dark:text-white/45 leading-relaxed mb-5',
          isFeatured ? 'line-clamp-3 text-sm' : 'line-clamp-2',
          compact ? 'text-xs' : 'text-sm',
        ].join(' ')}>
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-4
          border-t border-void/6 dark:border-white/6">

          {/* Author + date */}
          <div className="flex items-center gap-2.5 min-w-0">
            {post.author_avatar ? (
              <img src={post.author_avatar} alt={post.author_name}
                className="w-6 h-6 rounded-full object-cover flex-shrink-0" />
            ) : (
              <div
                className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-white"
                style={{ background: catColor }}
              >
                {post.author_name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-[11px] font-medium text-void/60 dark:text-white/50 truncate">
                {post.author_name}
              </p>
              {post.published_at && (
                <p className="text-[10px] text-void/35 dark:text-white/30">
                  {formatDate(post.published_at)}
                </p>
              )}
            </div>
          </div>

          {/* Read time + CTA */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="flex items-center gap-1 text-[11px] text-void/35 dark:text-white/30">
              <ClockIcon />
              {post.read_time}m
            </span>
            <Link
              href={`/blog/${post.slug}`}
              className="flex items-center gap-1 text-[11px] font-semibold text-crimson
                opacity-0 group-hover:opacity-100
                hover:gap-2 transition-all duration-200"
            >
              Read
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
