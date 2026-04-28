import type { Metadata }    from 'next'
import { notFound }         from 'next/navigation'
import Link                 from 'next/link'
import { Suspense }         from 'react'
import FloatingNav          from '@/components/layout/FloatingNav'
import Footer               from '@/components/layout/Footer'
import BlogCTA, { InlineBlogCTA } from '@/components/blog/BlogCTA'
import ReadingProgress      from '@/components/blog/ReadingProgress'
import KeyTakeaways         from '@/components/reader/KeyTakeaways'
import { createServerClient } from '@/lib/supabase/client'

// ─── Static params ────────────────────────────────────────────

export async function generateStaticParams() {
  const db = createServerClient()
  const { data } = await db
    .from('posts')
    .select('slug')
    .eq('published', true)
  return (data ?? []).map((d: { slug: string }) => ({ slug: d.slug }))
}

// ─── Metadata ─────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const db = createServerClient()
  const { data } = await db
    .from('posts')
    .select('title, excerpt, cover_image')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (!data) return {}
  return {
    title:       `${data.title} — Z3ymo Blog`,
    description: data.excerpt,
    openGraph: {
      title:       data.title,
      description: data.excerpt,
      type:        'article',
      images:      data.cover_image ? [data.cover_image] : [],
    },
  }
}

// ─── Helpers ──────────────────────────────────────────────────

function formatDate(iso: string | null): string {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

// ─── Prose styles ─────────────────────────────────────────────

const BLOG_STYLES = `
  .blog-content { line-height: 1.85; }
  .blog-content h1 { font-size: 2rem; font-weight: 700; margin: 2.5rem 0 1rem; line-height: 1.2; scroll-margin-top: 100px; }
  .blog-content h2 { font-size: 1.5rem; font-weight: 700; margin: 2rem 0 0.75rem; line-height: 1.3; scroll-margin-top: 100px; }
  .blog-content h3 { font-size: 1.25rem; font-weight: 600; margin: 1.5rem 0 0.5rem; line-height: 1.3; scroll-margin-top: 100px; }
  .blog-content p  { margin-bottom: 1.25rem; }
  .blog-content a  { color: #C0392B; text-decoration: underline; text-underline-offset: 3px; }
  .blog-content a:hover { opacity: 0.8; }
  .blog-content ul { list-style: disc;    padding-left: 1.75rem; margin-bottom: 1.25rem; }
  .blog-content ol { list-style: decimal; padding-left: 1.75rem; margin-bottom: 1.25rem; }
  .blog-content li { margin-bottom: 0.4rem; }
  .blog-content blockquote {
    border-left: 2px solid #C0392B; padding: 0.5rem 0 0.5rem 1.25rem;
    margin: 1.5rem 0; font-style: italic; color: rgba(10,10,15,0.55);
  }
  .dark .blog-content blockquote { color: rgba(240,238,248,0.5); }
  .blog-content pre {
    background: rgba(10,10,15,0.06); border-radius: 1rem;
    padding: 1.25rem 1.5rem; font-family: ui-monospace,monospace;
    font-size: 0.875em; overflow-x: auto; margin: 1.5rem 0;
  }
  .dark .blog-content pre { background: rgba(255,255,255,0.05); }
  .blog-content code:not(pre code) {
    background: rgba(192,57,43,0.08); color: #C0392B;
    padding: 0.15em 0.4em; border-radius: 0.3rem;
    font-size: 0.85em; font-family: ui-monospace,monospace;
  }
  .blog-content hr { border: none; border-top: 1px solid rgba(10,10,15,0.08); margin: 2.5rem 0; }
  .dark .blog-content hr { border-top-color: rgba(240,238,248,0.08); }
  .blog-content img { border-radius: 1rem; margin: 2rem 0; max-width: 100%; }
  .blog-content mark { background: rgba(201,168,76,0.22); padding: 0.05em 0.2em; border-radius: 0.2rem; }
  .blog-content strong { font-weight: 600; }
  .blog-content em { font-style: italic; }
  .blog-content u  { text-decoration: underline; text-underline-offset: 3px; }
  .blog-content table { width:100%; border-collapse:collapse; margin:1.5rem 0; border-radius:0.75rem; overflow:hidden; }
  .blog-content th { background:rgba(10,10,15,0.04); font-weight:600; font-size:0.8rem; text-transform:uppercase; letter-spacing:0.05em; padding:0.75rem 1rem; text-align:left; }
  .blog-content td { padding:0.75rem 1rem; border-top:1px solid rgba(10,10,15,0.06); font-size:0.9rem; }
  .dark .blog-content th { background:rgba(255,255,255,0.04); }
  .dark .blog-content td { border-top-color:rgba(255,255,255,0.06); }
`

// ─── Page ─────────────────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const db       = createServerClient()

  // Fetch the full post — including key_takeaways, cta fields, tags
  const { data: post, error } = await db
    .from('posts')
    .select(`
      id, title, slug, excerpt, content,
      cover_image, cover_alt,
      author_name, author_avatar,
      read_time, published_at, views,
      key_takeaways,
      cta_type, cta_custom_headline, cta_custom_body,
      category_id,
      categories ( id, name, slug, color )
    `)
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error || !post) notFound()

  // Increment views — fire and forget
  db.rpc('increment_post_views', { post_id: post.id }).catch(() => {})

  // Derive CTA type
  const ctaType       = (post as any).cta_type            ?? 'consultation'
  const ctaHeadline   = (post as any).cta_custom_headline ?? undefined
  const ctaBody       = (post as any).cta_custom_body     ?? undefined
  const keyTakeaways  = (post as any).key_takeaways       ?? []
  const hasTakeaways  = Array.isArray(keyTakeaways) && keyTakeaways.length > 0
  const categories    = (post as any).categories

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: BLOG_STYLES }} />

      <main className="min-h-screen bg-whisper dark:bg-void">
        <FloatingNav />
        <ReadingProgress />

        <div className="pt-28 pb-24 px-6">
          <div className="max-w-2xl mx-auto">

            {/* ── Back ── */}
            <Link href="/blog"
              className="inline-flex items-center gap-2 text-sm text-void/40 dark:text-whisper/40 hover:text-void dark:hover:text-whisper transition-colors mb-10 group">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                className="group-hover:-translate-x-0.5 transition-transform">
                <path d="M19 12H5M12 5l-7 7 7 7"/>
              </svg>
              All posts
            </Link>

            {/* ── Category ── */}
            {categories && (
              <div className="mb-5">
                <span className="text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{ background: `${categories.color}12`, color: categories.color }}>
                  {categories.name}
                </span>
              </div>
            )}

            {/* ── Title ── */}
            <h1 className="font-display font-bold text-[clamp(2rem,5vw,3rem)] text-void dark:text-whisper leading-tight tracking-tight mb-5">
              {post.title}
            </h1>

            {/* ── Meta ── */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-void/40 dark:text-whisper/40 mb-10 pb-10 border-b border-void/8 dark:border-whisper/8">
              <span>{post.author_name}</span>
              <span>·</span>
              <span>{formatDate(post.published_at)}</span>
              <span>·</span>
              <span>{post.read_time} min read</span>
            </div>

            {/* ── Cover image ── */}
            {post.cover_image && (
              <img
                src={post.cover_image}
                alt={post.cover_alt ?? post.title}
                className="w-full rounded-2xl aspect-video object-cover mb-10"
              />
            )}

            {/* ── Key Takeaways ──
                Shown BEFORE the article body so readers know exactly
                what they'll learn before investing time reading.
                Stored in posts.key_takeaways TEXT[] column.
                Written in the editor's "Key Takeaways" field.       */}
            {hasTakeaways && (
              <div className="mb-10">
                <KeyTakeaways takeaways={keyTakeaways} />
              </div>
            )}

            {/* ── HTML content ── */}
            <article
              className="blog-content text-void/75 dark:text-whisper/75"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* ── Inline CTA at end of article ── */}
            {ctaType !== 'none' && (
              <InlineBlogCTA
                type={ctaType}
                headline={ctaHeadline}
                body={ctaBody}
              />
            )}
          </div>
        </div>

        <Footer />
      </main>

      {/* ── Sticky CTA — slides up after 60% scroll ── */}
      {ctaType !== 'none' && (
        <BlogCTA
          type={ctaType}
          headline={ctaHeadline}
          body={ctaBody}
        />
      )}
    </>
  )
}
