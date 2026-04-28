// ─────────────────────────────────────────────────────────────────
// components/reader/ReadingLayout.tsx
//
// Shared reading-page shell for case-studies and docs.
// Handles: cover image, title, meta row, key takeaways (not docs),
//          HTML content, PDF download gate, end-of-post CTA (not docs),
//          tags (not docs), related links.
//
// Used by:
//   app/case-studies/[slug]/page.tsx  — full feature set
//   app/docs/[slug]/page.tsx          — no takeaways, no CTA, no tags
//
// Props mirror the content_items columns. Pass only what the page
// fetches — missing props default to null/undefined gracefully.
// ─────────────────────────────────────────────────────────────────

import Link              from 'next/link'
import KeyTakeaways      from '@/components/reader/KeyTakeaways'
import type { ContentType } from '@/lib/supabase/client'

// ─── Prose styles ─────────────────────────────────────────────

const PROSE = `
  .reader-content { line-height: 1.85; }
  .reader-content h1 { font-size: 1.875rem; font-weight: 700; margin: 2.5rem 0 1rem; line-height: 1.2; scroll-margin-top: 100px; }
  .reader-content h2 { font-size: 1.5rem;   font-weight: 700; margin: 2rem 0 0.75rem; line-height: 1.3; scroll-margin-top: 100px; }
  .reader-content h3 { font-size: 1.25rem;  font-weight: 600; margin: 1.5rem 0 0.5rem; line-height: 1.3; scroll-margin-top: 100px; }
  .reader-content p  { margin-bottom: 1.25rem; }
  .reader-content a  { color: #C0392B; text-decoration: underline; text-underline-offset: 3px; }
  .reader-content a:hover { opacity: 0.8; }
  .reader-content ul { list-style: disc;    padding-left: 1.75rem; margin-bottom: 1.25rem; }
  .reader-content ol { list-style: decimal; padding-left: 1.75rem; margin-bottom: 1.25rem; }
  .reader-content li { margin-bottom: 0.4rem; }
  .reader-content blockquote {
    border-left: 2px solid #C0392B; padding: 0.5rem 0 0.5rem 1.25rem;
    margin: 1.5rem 0; font-style: italic; color: rgba(10,10,15,0.55);
  }
  .dark .reader-content blockquote { color: rgba(240,238,248,0.5); }
  .reader-content pre {
    background: rgba(10,10,15,0.06); border-radius: 1rem;
    padding: 1.25rem 1.5rem; font-family: ui-monospace,monospace;
    font-size: 0.875em; overflow-x: auto; margin: 1.5rem 0;
  }
  .dark .reader-content pre { background: rgba(255,255,255,0.05); }
  .reader-content code:not(pre code) {
    background: rgba(192,57,43,0.08); color: #C0392B;
    padding: 0.15em 0.4em; border-radius: 0.3rem;
    font-size: 0.85em; font-family: ui-monospace,monospace;
  }
  .reader-content hr { border: none; border-top: 1px solid rgba(10,10,15,0.08); margin: 2.5rem 0; }
  .dark .reader-content hr { border-top-color: rgba(240,238,248,0.08); }
  .reader-content img { border-radius: 1rem; margin: 2rem 0; max-width: 100%; }
  .reader-content mark { background: rgba(201,168,76,0.22); padding: 0.05em 0.2em; border-radius: 0.2rem; }
  .reader-content strong { font-weight: 600; }
  .reader-content table { width:100%; border-collapse:collapse; margin:1.5rem 0; border-radius:0.75rem; overflow:hidden; }
  .reader-content th { background:rgba(10,10,15,0.04); font-weight:600; font-size:0.8rem; text-transform:uppercase; letter-spacing:0.05em; padding:0.75rem 1rem; text-align:left; }
  .reader-content td { padding:0.75rem 1rem; border-top:1px solid rgba(10,10,15,0.06); font-size:0.9rem; }
  .dark .reader-content th { background:rgba(255,255,255,0.04); }
  .dark .reader-content td { border-top-color:rgba(255,255,255,0.06); }
`

// ─── Helpers ──────────────────────────────────────────────────

function formatDate(iso: string | null): string {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

function backHref(type: ContentType): string {
  if (type === 'case-study') return '/case-studies'
  if (type === 'doc')        return '/docs'
  return '/guides'
}

function backLabel(type: ContentType): string {
  if (type === 'case-study') return 'All case studies'
  if (type === 'doc')        return 'Documentation'
  return 'All guides'
}

// ─── Accent colour per type ────────────────────────────────────

function accentColor(type: ContentType): string {
  if (type === 'case-study') return '#C0392B' // crimson
  if (type === 'doc')        return '#C9A84C' // gold
  return '#1B998B'                             // emerald
}

// ─── End-of-content CTA ───────────────────────────────────────

const CTA_DEFAULTS: Record<string, { headline: string; body: string; href: string; label: string }> = {
  consultation: {
    headline: 'Ready to build this for your business?',
    body:     'Book a free strategy call and we'll help you plan the right approach.',
    href:     '/services/consultation/bookfreeconsultation',
    label:    'Book free consultation',
  },
  services: {
    headline: 'Need a team to build this?',
    body:     'Explore our custom development services for African businesses.',
    href:     '/services',
    label:    'See our services',
  },
  products: {
    headline: 'Explore our platforms',
    body:     'Pre-built digital solutions designed for the African market.',
    href:     '/platforms',
    label:    'View platforms',
  },
  pulse: {
    headline: 'Automate your business with Pulse',
    body:     'Join the waitlist for Z3ymo Pulse — WhatsApp AI for African SMBs.',
    href:     '/products/pulse',
    label:    'Join the waitlist',
  },
}

function ContentCTA({
  ctaType, headline, body,
}: {
  ctaType:   string
  headline?: string | null
  body?:     string | null
}) {
  if (!ctaType || ctaType === 'none') return null
  const defaults = CTA_DEFAULTS[ctaType] ?? CTA_DEFAULTS.consultation
  const h = headline || defaults.headline
  const b = body     || defaults.body

  return (
    <div className="mt-12 rounded-2xl border border-crimson/15 bg-crimson/4 dark:bg-crimson/6 p-8 text-center">
      <h3 className="font-display font-bold text-xl text-void dark:text-whisper mb-3">{h}</h3>
      <p className="text-sm text-void/60 dark:text-whisper/55 mb-6 max-w-sm mx-auto leading-relaxed">{b}</p>
      <Link
        href={defaults.href}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-crimson text-white text-sm font-semibold hover:bg-crimson/90 transition-colors shadow-sm shadow-crimson/20"
      >
        {defaults.label}
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </Link>
    </div>
  )
}

// ─── Props ────────────────────────────────────────────────────

interface ReadingLayoutProps {
  // Content fields from content_items
  type:         ContentType
  title:        string
  excerpt?:     string | null
  content:      string
  cover_image?: string | null
  cover_alt?:   string | null
  author_name?: string | null
  published_at?: string | null
  read_time?:   number | null
  tags?:        string[]
  key_takeaways?: string[]
  cta_type?:    string | null
  cta_custom_headline?: string | null
  cta_custom_body?:     string | null
  pdf_available?: boolean
  // Category name (resolved from join)
  categoryName?: string | null
  categoryColor?: string | null
  // Children injected after content (e.g. related items)
  children?: React.ReactNode
}

// ─── Component ────────────────────────────────────────────────

export default function ReadingLayout({
  type,
  title,
  excerpt,
  content,
  cover_image,
  cover_alt,
  author_name,
  published_at,
  read_time,
  tags,
  key_takeaways,
  cta_type,
  cta_custom_headline,
  cta_custom_body,
  pdf_available,
  categoryName,
  categoryColor,
  children,
}: ReadingLayoutProps) {

  // Docs have a stripped-down reading experience:
  //   no takeaways, no CTA, no tags, gold accent
  const isDoc       = type === 'doc'
  const accent      = accentColor(type)
  const hasTakeaways = !isDoc && Array.isArray(key_takeaways) && key_takeaways.length > 0

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PROSE }} />

      <div className="pt-28 pb-24 px-6">
        <div className="max-w-2xl mx-auto">

          {/* ── Back link ── */}
          <Link
            href={backHref(type)}
            className="inline-flex items-center gap-2 text-sm text-void/40 dark:text-whisper/40 hover:text-void dark:hover:text-whisper transition-colors mb-10 group"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              className="group-hover:-translate-x-0.5 transition-transform">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            {backLabel(type)}
          </Link>

          {/* ── Category badge ── */}
          {categoryName && (
            <div className="mb-5">
              <span
                className="text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{ background: `${categoryColor ?? accent}12`, color: categoryColor ?? accent }}
              >
                {categoryName}
              </span>
            </div>
          )}

          {/* ── Docs section label ── */}
          {isDoc && (
            <div className="mb-5">
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{ background: `${accent}12`, color: accent }}>
                Documentation
              </span>
            </div>
          )}

          {/* ── Title ── */}
          <h1 className="font-display font-bold text-[clamp(1.75rem,4.5vw,2.75rem)] text-void dark:text-whisper leading-tight tracking-tight mb-5">
            {title}
          </h1>

          {/* ── Excerpt ── */}
          {excerpt && (
            <p className="text-base text-void/55 dark:text-whisper/50 leading-relaxed mb-6">
              {excerpt}
            </p>
          )}

          {/* ── Meta row ── */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-void/40 dark:text-whisper/40
            mb-10 pb-10 border-b border-void/8 dark:border-whisper/8">
            {author_name && <span>{author_name}</span>}
            {author_name && published_at && <span>·</span>}
            {published_at && <span>{formatDate(published_at)}</span>}
            {read_time && (
              <>
                <span>·</span>
                <span>{read_time} min read</span>
              </>
            )}
          </div>

          {/* ── Cover image ── */}
          {cover_image && (
            <img
              src={cover_image}
              alt={cover_alt ?? title}
              className="w-full rounded-2xl aspect-video object-cover mb-10"
            />
          )}

          {/* ── Key takeaways — not shown for docs ── */}
          {hasTakeaways && (
            <KeyTakeaways takeaways={key_takeaways!} />
          )}

          {/* ── HTML content ── */}
          <article
            className="reader-content text-void/75 dark:text-whisper/75"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* ── Tags — not shown for docs ── */}
          {!isDoc && tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-void/8 dark:border-whisper/8">
              {tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1.5 rounded-full bg-void/5 dark:bg-whisper/5
                    text-void/55 dark:text-whisper/50 border border-void/8 dark:border-whisper/8"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* ── End-of-content CTA — not shown for docs ── */}
          {!isDoc && cta_type && cta_type !== 'none' && (
            <ContentCTA
              ctaType={cta_type}
              headline={cta_custom_headline}
              body={cta_custom_body}
            />
          )}

          {/* ── Slot for related items or extra sections ── */}
          {children}

        </div>
      </div>
    </>
  )
}
