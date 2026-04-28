import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { createServerClient } from '@/lib/supabase/client'
import type { ContentItem } from '@/lib/supabase/client'
import ReadingLayout from '@/components/reader/ReadingLayout'
import ReadingProgress from '@/components/blog/ReadingProgress'
import FloatingNav from '@/components/layout/FloatingNav'
import Footer from '@/components/layout/Footer'

// ─── Static params ────────────────────────────────────────────

export async function generateStaticParams() {
  const db = createServerClient()
  const { data } = await db
    .from('content_items')
    .select('slug')
    .eq('type', 'guide')
    .eq('status', 'published')
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
    .from('content_items')
    .select('title, excerpt, cover_image')
    .eq('slug', slug).eq('type', 'guide').single()

  if (!data) return { title: 'Guide — Z3ymo' }
  return {
    title:       `${data.title} — Z3ymo Guides`,
    description: data.excerpt,
    openGraph: {
      title:       data.title,
      description: data.excerpt,
      type:        'article',
      images:      data.cover_image ? [data.cover_image] : [],
    },
  }
}

// ─── Page ─────────────────────────────────────────────────────

export default async function GuideReadPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const db = createServerClient()

  const { data, error } = await db
    .from('content_items')
    .select(`
      *,
      categories ( id, name, slug, color )
    `)
    .eq('slug', slug)
    .eq('type', 'guide')
    .eq('status', 'published')
    .single()

  if (error || !data) notFound()

  // Increment views (non-blocking)
  db.rpc('increment_content_views', { item_id: data.id }).catch(() => {})

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-whisper dark:bg-void flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-crimson/25 border-t-crimson animate-spin" />
      </div>
    }>
      <FloatingNav />
      <ReadingProgress />
      <ReadingLayout item={data as ContentItem} />
      <Footer />
    </Suspense>
  )
}
