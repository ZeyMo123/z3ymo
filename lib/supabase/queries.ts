import { createServerClient, type Post, type Category } from './client'

const POST_SELECT = `
  *,
  categories (
    id, name, slug, color
  )
`

// ─── Get all published posts (with pagination) ─
export async function getPosts({
  page = 1,
  perPage = 9,
  categorySlug,
  featured,
}: {
  page?: number
  perPage?: number
  categorySlug?: string
  featured?: boolean
} = {}) {
  const db = createServerClient()
  const from = (page - 1) * perPage
  const to = from + perPage - 1

  let query = db
    .from('posts')
    .select(POST_SELECT, { count: 'exact' })
    .eq('published', true)
    .order('published_at', { ascending: false })
    .range(from, to)

  if (categorySlug) {
    const { data: cat } = await db
      .from('categories')
      .select('id')
      .eq('slug', categorySlug)
      .single<{ id: string }>()
    if (cat) query = query.eq('category_id', cat.id)
  }

  if (featured !== undefined) {
    query = query.eq('featured', featured)
  }

  const { data, count, error } = await query
  if (error) throw error

  return {
    posts: (data ?? []) as Post[],
    total: count ?? 0,
    pages: Math.ceil((count ?? 0) / perPage),
  }
}

// ─── Get single post by slug ───────────────────
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const db = createServerClient()
  const { data, error } = await db
    .from('posts')
    .select(POST_SELECT)
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error || !data) return null
  return data as Post
}

// ─── Get related posts (same category, exclude current) ─
export async function getRelatedPosts(postId: string, categoryId: string | null, limit = 3): Promise<Post[]> {
  const db = createServerClient()
  let query = db
    .from('posts')
    .select(POST_SELECT)
    .eq('published', true)
    .neq('id', postId)
    .order('published_at', { ascending: false })
    .limit(limit)

  if (categoryId) {
    query = query.eq('category_id', categoryId)
  }

  const { data } = await query
  return (data ?? []) as Post[]
}

// ─── Get featured posts ────────────────────────
export async function getFeaturedPosts(limit = 3): Promise<Post[]> {
  const db = createServerClient()
  const { data } = await db
    .from('posts')
    .select(POST_SELECT)
    .eq('published', true)
    .eq('featured', true)
    .order('published_at', { ascending: false })
    .limit(limit)

  return (data ?? []) as Post[]
}

// ─── Get all categories ────────────────────────
export async function getCategories(): Promise<Category[]> {
  const db = createServerClient()
  const { data } = await db
    .from('categories')
    .select('*')
    .order('name')

  return data ?? []
}

// ─── Get latest posts (for homepage blog preview) ─
export async function getLatestPosts(limit = 3): Promise<Post[]> {
  const { posts } = await getPosts({ page: 1, perPage: limit })
  return posts
}

// ─── Increment view count ──────────────────────
export async function incrementViews(postId: string) {
  const db = createServerClient()
  await db.rpc('increment_views', { post_id: postId })
}

// ─── Subscribe to newsletter ───────────────────
export async function subscribeEmail(email: string, source = 'website') {
  const db = createServerClient()
  const { error } = await db
    .from('subscribers')
    .upsert({ email, source }, { onConflict: 'email' })

  if (error) throw error
  return { success: true }
}

// ─── Submit contact enquiry ────────────────────
export async function submitContact(data: {
  name?: string
  email?: string
  message?: string
  context?: string
  channel?: string
}) {
  const db = createServerClient()
  const { error } = await db.from('contacts').insert(data)
  if (error) throw error
  return { success: true }
}

// ─── Join product waitlist ─────────────────────
export async function joinWaitlist(email: string, product: string, name?: string) {
  const db = createServerClient()
  const { error } = await db
    .from('waitlist')
    .upsert({ email, product, name }, { onConflict: 'email,product' })

  if (error) throw error
  return { success: true }
}

// ─── Get all post slugs (for sitemap + ISR) ────
export async function getAllPostSlugs(): Promise<string[]> {
  const db = createServerClient()
  const { data } = await db
    .from('posts')
    .select('slug')
    .eq('published', true)

  return (data ?? []).map((p: { slug: string }) => p.slug)
}
