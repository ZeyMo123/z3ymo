'use client'

// ─────────────────────────────────────────────────────────────────
// components/blog/BlogCard.tsx
//
// Reusable blog post card. Used in the homepage slider and the
// full blog listing page. Handles missing images gracefully.
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

// ─── Image placeholder ────────────────────────────────────────

function CoverPlaceholder({ color }: { color?: string | null }) {
  const accent = color ?? '#C0392B'
  return (
    <div className="w-full h-full flex items-center justify-center"
      style={{ background: `linear-gradient(135deg, ${accent}12, ${accent}06)` }}>
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
        stroke={accent} strokeWidth="1" strokeLinecap="round" opacity="0.3">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────

interface BlogCardProps {
  post:      Post
  /** Compact = slightly smaller, used in grid. Default = full for slider */
  compact?:  boolean
  variant?: 'default' | 'featured'
  /** Extra classes for the wrapper */
  className?: string
}

export default function BlogCard({ post, compact = false, className = '' }: BlogCardProps) {
  const catColor = post.categories?.color ?? '#C0392B'

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      className={[
        'group flex flex-col h-full rounded-3xl border overflow-hidden bg-white dark:bg-white/[0.03]',
        'border-void/8 dark:border-white/8',
        'shadow-sm dark:shadow-none',
        'hover:shadow-md dark:hover:shadow-[0_4px_24px_rgba(0,0,0,0.35)]',
        'transition-shadow duration-300',
        className,
      ].join(' ')}
    >
      {/* Cover */}
      <Link href={`/blog/${post.slug}`} className="block flex-shrink-0" tabIndex={-1} aria-hidden="true">
        <div className={`w-full overflow-hidden bg-void/4 dark:bg-white/4 ${compact ? 'h-44' : 'h-52 sm:h-56'}`}>
          {post.cover_image ? (
            <img
              src={post.cover_image}
              alt={post.cover_alt ?? post.title}
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
              loading="lazy"
            />
          ) : (
            <CoverPlaceholder color={catColor} />
          )}
        </div>
      </Link>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6">

        {/* Category */}
        {post.categories && (
          <div className="mb-3">
            <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full"
              style={{ background: `${catColor}12`, color: catColor }}>
              {post.categories.name}
            </span>
          </div>
        )}

        {/* Title */}
        <Link href={`/blog/${post.slug}`} className="group/title block mb-2 flex-1">
          <h3 className={[
            'font-display font-bold leading-tight',
            'text-void dark:text-white',
            'group-hover/title:text-crimson transition-colors duration-200',
            compact ? 'text-base' : 'text-lg',
          ].join(' ')}>
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className={[
          'text-void/50 dark:text-white/45 leading-relaxed mb-5',
          'line-clamp-2',
          compact ? 'text-xs' : 'text-sm',
        ].join(' ')}>
          {post.excerpt}
        </p>

        {/* Footer row */}
        <div className="flex items-center justify-between mt-auto pt-4
          border-t border-void/6 dark:border-white/6">

          {/* Author + date */}
          <div className="flex items-center gap-2.5 min-w-0">
            {post.author_avatar ? (
              <img src={post.author_avatar} alt={post.author_name}
                className="w-6 h-6 rounded-full object-cover flex-shrink-0"/>
            ) : (
              <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-white"
                style={{ background: catColor }}>
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
            <Link href={`/blog/${post.slug}`}
              className="flex items-center gap-1 text-[11px] font-semibold text-crimson
                hover:gap-2 transition-all duration-200 opacity-0 group-hover:opacity-100">
              Read
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
