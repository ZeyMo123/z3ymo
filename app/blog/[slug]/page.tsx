import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import FloatingNav from '@/components/layout/FloatingNav'
import Footer from '@/components/layout/Footer'
import BlogCTA, { InlineBlogCTA } from '@/components/blog/BlogCTA'
import ReadingProgress from '@/components/blog/ReadingProgress'
import {
  getPostBySlug,
  getAllPostSlugs,
  incrementViews,
  getRelatedPosts,
} from '@/lib/supabase/queries'

// ─── Static params ────────────────────────────────────────────

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

// ─── Metadata ─────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return {
    title:       `${post.title} — Z3ymo Blog`,
    description: post.excerpt,
    openGraph: {
      title:       post.title,
      description: post.excerpt,
      type:        'article',
      images:      post.cover_image ? [post.cover_image] : [],
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

// ─── Blog prose styles ────────────────────────────────────────
// These styles apply to the raw HTML from Tiptap.
// Scoped under .blog-content to avoid leaking globally.

const BLOG_STYLES = `
  .blog-content { line-height: 1.8; }
  .blog-content h1 { font-size: 2rem; font-weight: 700; margin: 2.5rem 0 1rem; line-height: 1.2; }
  .blog-content h2 { font-size: 1.5rem; font-weight: 700; margin: 2rem 0 0.75rem; line-height: 1.3; }
  .blog-content h3 { font-size: 1.25rem; font-weight: 600; margin: 1.5rem 0 0.5rem; line-height: 1.3; }
  .blog-content p  { margin-bottom: 1.25rem; }
  .blog-content a  { color: #C0392B; text-decoration: underline; text-underline-offset: 3px; }
  .blog-content a:hover { opacity: 0.8; }
  .blog-content ul { list-style: disc; padding-left: 1.75rem; margin-bottom: 1.25rem; }
  .blog-content ol { list-style: decimal; padding-left: 1.75rem; margin-bottom: 1.25rem; }
  .blog-content li { margin-bottom: 0.4rem; }
  .blog-content blockquote {
    border-left: 2px solid #C0392B;
    padding: 0.5rem 0 0.5rem 1.25rem;
    margin: 1.5rem 0;
    font-style: italic;
    color: rgba(10,10,15,0.55);
  }
  .dark .blog-content blockquote { color: rgba(240,238,248,0.5); }
  .blog-content pre {
    background: rgba(10,10,15,0.06);
    border-radius: 1rem;
    padding: 1.25rem 1.5rem;
    font-family: ui-monospace, monospace;
    font-size: 0.875em;
    overflow-x: auto;
    margin: 1.5rem 0;
  }
  .dark .blog-content pre { background: rgba(255,255,255,0.05); }
  .blog-content code:not(pre code) {
    background: rgba(192,57,43,0.08);
    color: #C0392B;
    padding: 0.15em 0.4em;
    border-radius: 0.3rem;
    font-size: 0.85em;
    font-family: ui-monospace, monospace;
  }
  .blog-content hr {
    border: none;
    border-top: 1px solid rgba(10,10,15,0.08);
    margin: 2.5rem 0;
  }
  .dark .blog-content hr { border-top-color: rgba(240,238,248,0.08); }
  .blog-content img { border-radius: 1rem; margin: 2rem 0; max-width: 100%; }
  .blog-content mark { background: rgba(201,168,76,0.22); padding: 0.05em 0.2em; border-radius: 0.2rem; }
  .blog-content strong { font-weight: 600; }
  .blog-content em { font-style: italic; }
  .blog-content u  { text-decoration: underline; text-underline-offset: 3px; }
`

// ─── Page ─────────────────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  incrementViews(post.id).catch(() => {})

  const related = await getRelatedPosts(post.id, post.category_id).catch(() => [])

  // Read CTA type from post metadata (stored in DB as cta_type field)
  const ctaType = (post as any).cta_type ?? 'consultation'

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: BLOG_STYLES }} />

      <main className="min-h-screen bg-whisper dark:bg-void">
        <FloatingNav />

        {/* Reading progress bar */}
        <ReadingProgress />

        <div className="pt-28 pb-24 px-6">
          <div className="max-w-2xl mx-auto">

            {/* ── Back ── */}
            <Link href="/blog"
              className="inline-flex items-center gap-2 text-sm text-void/40 dark:text-whisper/40 hover:text-void dark:hover:text-whisper transition-colors mb-10 group">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                className="group-hover:-translate-x-0.5 transition-transform">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              All posts
            </Link>

            {/* ── Category ── */}
            {post.categories && (
              <div className="mb-5">
                <span className="text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{ background: `${post.categories.color}12`, color: post.categories.color }}>
                  {post.categories.name}
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
                className="w-full rounded-2xl aspect-video object-cover mb-12"
              />
            )}

            {/* ── HTML Content from Tiptap ── */}
            <article
              className="blog-content text-void/75 dark:text-whisper/75"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* ── Inline CTA at end of article ── */}
            {ctaType !== 'none' && <InlineBlogCTA type={ctaType} />}
          </div>
        </div>

        {/* ── Related posts ── */}
        {related.length > 0 && (
          <section className="py-14 px-6 border-t border-void/8 dark:border-whisper/8">
            <div className="max-w-2xl mx-auto">
              <h2 className="font-display font-bold text-xl text-void dark:text-whisper mb-6">
                Related posts
              </h2>
              <div className="space-y-3">
                {related.map((r) => (
                  <Link key={r.id} href={`/blog/${r.slug}`}
                    className="flex items-start gap-4 group p-4 rounded-2xl hover:bg-void/4 dark:hover:bg-whisper/4 transition-colors">
                    {r.cover_image && (
                      <img src={r.cover_image} alt={r.cover_alt ?? r.title}
                        className="w-20 h-14 rounded-xl object-cover flex-shrink-0" />
                    )}
                    <div>
                      <div className="font-medium text-void dark:text-whisper group-hover:text-crimson transition-colors text-sm">
                        {r.title}
                      </div>
                      <div className="text-xs text-void/40 dark:text-whisper/40 mt-1">
                        {r.read_time} min read
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <Footer />
      </main>

      {/* ── Sticky CTA — slides up after 60% scroll ── */}
      {ctaType !== 'none' && <BlogCTA type={ctaType} />}
    </>
  )
}
