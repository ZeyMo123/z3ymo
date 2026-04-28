import type { Metadata }      from 'next'
import { notFound }           from 'next/navigation'
import { createServerClient } from '@/lib/supabase/client'
import FloatingNav            from '@/components/layout/FloatingNav'
import Footer                 from '@/components/layout/Footer'
import ReadingProgress        from '@/components/blog/ReadingProgress'
import ReadingLayout          from '@/components/reader/ReadingLayout'

// ─── Static params ────────────────────────────────────────────

export async function generateStaticParams() {
  const db = createServerClient()
  const { data } = await db
    .from('content_items')
    .select('slug')
    .eq('type', 'doc')
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
    .select('title, excerpt')
    .eq('type', 'doc')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (!data) return {}
  return {
    title:       `${data.title} — Z3ymo Docs`,
    // ✓ null → undefined
    description: data.excerpt ?? undefined,
  }
}

// ─── Page ─────────────────────────────────────────────────────

export default async function DocReadingPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const db       = createServerClient()

  const { data, error } = await db
    .from('content_items')
    .select(`
      id, type, title, slug, excerpt, content,
      cover_image, cover_alt,
      author_name, published_at, read_time,
      pdf_available, status
    `)
    .eq('type', 'doc')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error || !data) notFound()

  // ✓ void — not .catch()
  void db.rpc('increment_content_views', { item_id: data.id })

  return (
    <main className="min-h-screen bg-whisper dark:bg-void">
      <FloatingNav />
      <ReadingProgress />

      {/* ✓ Individual props — docs get no tags, CTA, takeaways, or category */}
      <ReadingLayout
        type="doc"
        title={data.title}
        excerpt={data.excerpt}
        content={data.content}
        cover_image={data.cover_image}
        cover_alt={data.cover_alt}
        author_name={data.author_name}
        published_at={data.published_at}
        read_time={data.read_time}
        pdf_available={(data as any).pdf_available}
      />

      <Footer />
    </main>
  )
}
