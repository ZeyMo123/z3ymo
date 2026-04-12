import type { Metadata } from 'next'
import { notFound }      from 'next/navigation'
import Link              from 'next/link'
import { MDXRemote }     from 'next-mdx-remote/rsc'   // ← v6 RSC import
import FloatingNav       from '@/components/layout/FloatingNav'
import Footer            from '@/components/layout/Footer'
import { MdxComponents } from '@/components/mdx/MdxComponents'
import { mdxOptions }    from '@/lib/mdx'
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

// ─── Page ─────────────────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  // Fire-and-forget view increment (non-blocking)
  incrementViews(post.id).catch(() => {})

  const related = await getRelatedPosts(post.id, post.category_id).catch(() => [])

  return (
    <main className="min-h-screen">
      <FloatingNav />

      {/* ── Header ───────────────────────────────────────────── */}
      <article className="pt-32 pb-20 px-6">
        <div className="max-w-2xl mx-auto">

          {/* Back */}
          <Link href="/blog"
            className="inline-flex items-center gap-2 text-sm text-void/45 dark:text-whisper/45 hover:text-void dark:hover:text-whisper transition-colors mb-10 group">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              className="transition-transform group-hover:-translate-x-0.5">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            All posts
          </Link>

          {/* Category */}
          {post.categories && (
            <div className="mb-5">
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{ background: `${post.categories.color}12`, color: post.categories.color }}>
                {post.categories.name}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="font-display font-bold text-[clamp(2rem,5vw,3.2rem)] text-void dark:text-whisper leading-tight tracking-tight mb-5">
            {post.title}
          </h1>

          {/* Meta row */}
          <div className="flex items-center gap-4 text-sm text-void/40 dark:text-whisper/40 mb-10 pb-10 border-b border-void/8 dark:border-whisper/8">
            <span>{post.author_name}</span>
            <span>·</span>
            <span>{formatDate(post.published_at)}</span>
            <span>·</span>
            <span>{post.read_time} min read</span>
          </div>

          {/* Cover image */}
          {post.cover_image && (
            <img
              src={post.cover_image}
              alt={post.cover_alt ?? post.title}
              className="w-full rounded-2xl aspect-video object-cover mb-12"
            />
          )}

          {/* ── MDX Content — v6 RSC API ──────────────────────
              No serialize() needed. MDXRemote accepts the raw
              markdown/MDX string and compiles on the server.     */}
          <div className="prose prose-void dark:prose-invert max-w-none">
            <MDXRemote
              source={post.content}
              components={MdxComponents}
              options={mdxOptions}
            />
          </div>
        </div>
      </article>

      {/* ── Related posts ────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="py-16 px-6 border-t border-void/8 dark:border-whisper/8">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display font-bold text-xl text-void dark:text-whisper mb-6">
              Related posts
            </h2>
            <div className="space-y-4">
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
  )
}
