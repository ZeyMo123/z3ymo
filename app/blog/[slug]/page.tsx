import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import FloatingNav from '@/components/layout/FloatingNav'
import Footer from '@/components/layout/Footer'
import TableOfContents from '@/components/blog/TableOfContents'
import BlogCard from '@/components/blog/BlogCard'
import { getPostBySlug, getRelatedPosts, getAllPostSlugs } from '@/lib/supabase/queries'
import { processMDX, extractHeadings } from '@/lib/mdx'

export const revalidate = 3600

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: 'Article not found' }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.published_at ?? undefined,
      authors: [post.author_name],
      images: post.cover_image ? [post.cover_image] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.cover_image ? [post.cover_image] : [],
    },
  }
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  }).format(new Date(dateStr))
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const category = (post as any).categories
  const [{ rendered }, related] = await Promise.all([
    processMDX(post.content),
    getRelatedPosts(post.id, post.category_id, 3),
  ])

  const headings = extractHeadings(post.content)
  const publishDate = post.published_at ?? post.created_at

  return (
    <main className="min-h-screen">
      <FloatingNav />

      {/* Article header */}
      <header className="pt-32 pb-0 px-6">
        <div className="max-w-3xl mx-auto">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-void/35 dark:text-whisper/35 mb-8">
            <Link href="/blog" className="hover:text-void dark:hover:text-whisper transition-colors">
              Blog
            </Link>
            {category && (
              <>
                <span>/</span>
                <Link
                  href={`/blog?category=${category.slug}`}
                  className="hover:text-void dark:hover:text-whisper transition-colors"
                  style={{ color: category.color }}
                >
                  {category.name}
                </Link>
              </>
            )}
          </nav>

          {/* Category pill */}
          {category && (
            <span
              className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-6"
              style={{
                background: `${category.color}15`,
                color: category.color,
                border: `1px solid ${category.color}30`,
              }}
            >
              {category.name}
            </span>
          )}

          {/* Title */}
          <h1 className="
            font-display font-bold
            text-[clamp(2rem,5vw,3.25rem)]
            text-void dark:text-whisper
            leading-[1.1] tracking-[-0.03em]
            mb-6 text-balance
          ">
            {post.title}
          </h1>

          {/* Excerpt / lead */}
          <p className="
            text-lg text-void/60 dark:text-whisper/60
            leading-relaxed mb-8 font-light
          ">
            {post.excerpt}
          </p>

          {/* Meta row */}
          <div className="
            flex flex-wrap items-center gap-5 pb-8
            border-b border-void/8 dark:border-whisper/8
          ">
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-crimson/20 flex items-center justify-center">
                {post.author_avatar ? (
                  <Image src={post.author_avatar} alt={post.author_name} width={40} height={40} className="rounded-full" />
                ) : (
                  <span className="text-sm font-bold text-crimson">
                    {post.author_name.charAt(0)}
                  </span>
                )}
              </div>
              <div>
                <div className="text-sm font-medium text-void dark:text-whisper">{post.author_name}</div>
                {post.author_role && (
                  <div className="text-xs text-void/40 dark:text-whisper/40">{post.author_role}</div>
                )}
              </div>
            </div>

            <div className="h-4 w-px bg-void/15 dark:bg-whisper/15" />

            <div className="text-sm text-void/40 dark:text-whisper/40">
              {formatDate(publishDate!)}
            </div>

            <div className="h-4 w-px bg-void/15 dark:bg-whisper/15" />

            <div className="flex items-center gap-1.5 text-sm text-void/40 dark:text-whisper/40">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {post.read_time} min read
            </div>
          </div>
        </div>
      </header>

      {/* Cover image */}
      {post.cover_image && (
        <div className="max-w-5xl mx-auto px-6 mt-10">
          <div className="relative aspect-21/9 rounded-2xl overflow-hidden bg-void/5 dark:bg-whisper/5">
            <Image
              src={post.cover_image}
              alt={post.cover_alt ?? post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
          {post.cover_alt && (
            <p className="text-center text-sm text-void/35 dark:text-whisper/35 mt-3 italic">
              {post.cover_alt}
            </p>
          )}
        </div>
      )}

      {/* Article body with sidebar */}
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-16 items-start">

          {/* MDX Content */}
          <article className="
            prose-article
            min-w-0
            [&_.heading-anchor]:no-underline
            [&_.heading-anchor:hover]:text-crimson
            max-w-none
          ">
            {rendered}
          </article>

          {/* Sidebar ToC */}
          <aside className="hidden lg:block">
            <TableOfContents headings={headings} />
          </aside>
        </div>
      </div>

      {/* Article footer — tags & share */}
      <div className="max-w-3xl mx-auto px-6 pb-16">
        <div className="pt-10 border-t border-void/8 dark:border-whisper/8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-crimson/15 flex items-center justify-center">
                <span className="font-bold text-lg text-crimson">
                  {post.author_name.charAt(0)}
                </span>
              </div>
              <div>
                <div className="font-medium text-void dark:text-whisper text-sm">
                  Written by {post.author_name}
                </div>
                <div className="text-xs text-void/40 dark:text-whisper/40 mt-0.5">
                  {post.author_role ?? 'Z3ymo Team'}
                </div>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/#contact"
              className="
                inline-flex items-center gap-2
                px-5 py-2.5 rounded-full text-sm font-medium
                bg-crimson text-whisper
                hover:bg-crimson-400
                transition-colors duration-150
                shadow-[0_0_20px_rgba(192,57,43,0.2)]
              "
            >
              Work with us
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <p className="text-xs font-medium tracking-[0.14em] uppercase text-void/35 dark:text-whisper/35 mb-6">
            More from Z3ymo
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((p) => (
              <BlogCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
