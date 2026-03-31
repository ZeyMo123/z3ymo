import type { Metadata } from 'next'
import { Suspense } from 'react'
import FloatingNav from '@/components/layout/FloatingNav'
import Footer from '@/components/layout/Footer'
import BlogCard from '@/components/blog/BlogCard'
import BlogFilters from '@/components/blog/BlogFilters'
import { getPosts, getFeaturedPosts, getCategories } from '@/lib/supabase/queries'

export const metadata: Metadata = {
  title: 'Blog — Insights, guides & tech tips',
  description:
    'Expert guides on AI, software development, cybersecurity, social media, and tech for African businesses.',
}

export const revalidate = 3600 // ISR: re-generate every hour

interface BlogPageProps {
  searchParams: Promise<{ category?: string; page?: string }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  const categorySlug = params.category
  const page = Number(params.page ?? 1)

  const [featured, { posts, total, pages }, categories] = await Promise.all([
    !categorySlug ? getFeaturedPosts(1) : Promise.resolve([]),
    getPosts({ page, perPage: 9, categorySlug }),
    getCategories(),
  ])

  const featuredPost = featured[0]

  return (
    <main className="min-h-screen">
      <FloatingNav />

      {/* Hero header */}
      <section className="pt-36 pb-16 px-6 relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(192,57,43,0.06) 0%, transparent 70%)',
          }}
        />
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-4">
            Z3ymo blog
          </p>
          <h1 className="font-display font-bold text-[clamp(2.5rem,6vw,5rem)] text-void dark:text-whisper leading-none mb-4">
            Insights &
            <br />
            <span className="text-void/30 dark:text-whisper/30">ideas</span>
          </h1>
          <p className="text-lg text-void/50 dark:text-whisper/50 max-w-xl">
            AI, software development, cybersecurity, social media, and tech for African businesses.
          </p>
        </div>
      </section>

      {/* Category filter */}
      <Suspense>
        <BlogFilters categories={categories} active={categorySlug} />
      </Suspense>

      <div className="max-w-6xl mx-auto px-6 pb-24">

        {/* Featured post */}
        {featuredPost && !categorySlug && (
          <div className="mb-14">
            <p className="text-xs font-medium tracking-[0.14em] uppercase text-void/30 dark:text-whisper/30 mb-5">
              Featured
            </p>
            <BlogCard post={featuredPost} variant="featured" />
          </div>
        )}

        {/* Grid */}
        {posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            {/* Pagination */}
            {pages > 1 && (
              <Pagination current={page} total={pages} category={categorySlug} />
            )}
          </>
        ) : (
          <div className="text-center py-24">
            <p className="text-4xl mb-4">✦</p>
            <p className="text-void/40 dark:text-whisper/40">No articles yet in this category.</p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}

// ─── Pagination ────────────────────────────────
function Pagination({
  current,
  total,
  category,
}: {
  current: number
  total: number
  category?: string
}) {
  const buildHref = (p: number) => {
    const params = new URLSearchParams()
    if (category) params.set('category', category)
    if (p > 1) params.set('page', String(p))
    const qs = params.toString()
    return `/blog${qs ? `?${qs}` : ''}`
  }

  return (
    <div className="flex items-center justify-center gap-2">
      {current > 1 && (
        <a
          href={buildHref(current - 1)}
          className="
            px-4 py-2 rounded-xl text-sm
            border border-void/10 dark:border-whisper/10
            text-void/60 dark:text-whisper/60
            hover:border-crimson/50 hover:text-crimson
            transition-colors duration-150
          "
        >
          ← Previous
        </a>
      )}

      {Array.from({ length: total }, (_, i) => i + 1).map((p) => (
        <a
          key={p}
          href={buildHref(p)}
          className={`
            w-9 h-9 rounded-xl text-sm flex items-center justify-center
            border transition-colors duration-150
            ${p === current
              ? 'bg-crimson text-whisper border-crimson'
              : 'border-void/10 dark:border-whisper/10 text-void/60 dark:text-whisper/60 hover:border-crimson/40 hover:text-crimson'
            }
          `}
        >
          {p}
        </a>
      ))}

      {current < total && (
        <a
          href={buildHref(current + 1)}
          className="
            px-4 py-2 rounded-xl text-sm
            border border-void/10 dark:border-whisper/10
            text-void/60 dark:text-whisper/60
            hover:border-crimson/50 hover:text-crimson
            transition-colors duration-150
          "
        >
          Next →
        </a>
      )}
    </div>
  )
}
