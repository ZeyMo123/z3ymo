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
    .eq('type', 'case-study')
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
    .eq('type', 'case-study')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (!data) return {}
  return {
    title:       `${data.title} — Z3ymo Case Studies`,
    // ✓ null → undefined
    description: data.excerpt ?? undefined,
    openGraph: {
      title:       data.title,
      description: data.excerpt ?? undefined,
      type:        'article',
      images:      data.cover_image ? [data.cover_image] : [],
    },
  }
}

// ─── Page ─────────────────────────────────────────────────────

export default async function CaseStudyReadingPage({
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
      tags, key_takeaways, featured,
      cta_type, cta_custom_headline, cta_custom_body,
      pdf_available, status,
      category_id,
      categories ( id, name, slug, color )
    `)
    .eq('type', 'case-study')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error || !data) notFound()

  // ✓ void — not .catch()
  void db.rpc('increment_content_views', { item_id: data.id })

  const cat = (data as any).categories as { name: string; color: string } | null

  return (
    <main className="min-h-screen bg-whisper dark:bg-void">
      <FloatingNav />
      <ReadingProgress />

      {/* ✓ Individual props — not item={data} */}
      <ReadingLayout
        type="case-study"
        title={data.title}
        excerpt={data.excerpt}
        content={data.content}
        cover_image={data.cover_image}
        cover_alt={data.cover_alt}
        author_name={data.author_name}
        published_at={data.published_at}
        read_time={data.read_time}
        tags={(data as any).tags ?? []}
        key_takeaways={(data as any).key_takeaways ?? []}
        cta_type={(data as any).cta_type}
        cta_custom_headline={(data as any).cta_custom_headline}
        cta_custom_body={(data as any).cta_custom_body}
        pdf_available={(data as any).pdf_available}
        categoryName={cat?.name ?? null}
        categoryColor={cat?.color ?? null}
      />

      <Footer />
    </main>
  )
}
