'use server'

import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'

// ─── Admin client (bypasses RLS) ──────────────────────────────

function adminDB() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  )
}

// ─── Types ────────────────────────────────────────────────────

export interface AdminStats {
  published_posts:       number
  draft_posts:           number
  published_content:     number
  active_bookings:       number
  new_bookings_7d:       number
  waitlist_total:        number
  waitlist_7d:           number
  confirmed_subscribers: number
  new_contacts_7d:       number
  total_post_views:      number
}

export interface Post {
  id:           string
  title:        string
  slug:         string
  excerpt:      string
  content:      string
  cover_image:  string | null
  cover_alt:    string | null
  category_id:  string | null
  author_name:  string
  author_role:  string
  read_time:    number
  featured:     boolean
  published:    boolean
  published_at: string | null
  views:        number
  created_at:   string
  updated_at:   string
  categories?:  { name: string; slug: string; color: string } | null
}

export interface ContentItem {
  id:           string
  type:         'guide' | 'doc' | 'case-study'
  title:        string
  slug:         string
  excerpt:      string | null
  content:      string
  status:       'draft' | 'published' | 'archived'
  author_name:  string
  category:     string | null
  read_time:    number
  views:        number
  featured:     boolean
  published_at: string | null
  created_at:   string
  updated_at:   string
}

export interface Booking {
  id:              string
  business_type:   string
  build_goal:      string
  challenges:      string
  business_stage:  string
  budget:          string
  launch_timeline: string
  full_name:       string
  email:           string
  whatsapp:        string
  status:          string
  created_at:      string
  consultation_slots?: {
    date:       string
    start_time: string
    end_time:   string
    timezone:   string
  } | null
}

export interface WaitlistEntry {
  id:         string
  email:      string
  product:    string
  name:       string | null
  created_at: string
}

export interface Subscriber {
  id:         string
  email:      string
  confirmed:  boolean
  source:     string
  created_at: string
}

export interface Contact {
  id:         string
  name:       string | null
  email:      string | null
  message:    string | null
  context:    string | null
  created_at: string
}

// ─── Generic result type ──────────────────────────────────────

type Result<T> = { ok: true; data: T } | { ok: false; error: string }

function err(e: any): { ok: false; error: string } {
  console.error('[admin-action]', e)
  return { ok: false, error: e?.message ?? 'Something went wrong.' }
}

// ─────────────────────────────────────────────────────────────
// DASHBOARD STATS
// ─────────────────────────────────────────────────────────────

export async function getAdminStats(): Promise<Result<AdminStats>> {
  try {
    const db = adminDB()
    const { data, error } = await db.from('admin_stats').select('*').single()
    if (error) throw error
    return { ok: true, data: data as AdminStats }
  } catch (e) { return err(e) }
}

// ─────────────────────────────────────────────────────────────
// POSTS (blog)
// ─────────────────────────────────────────────────────────────

export async function getPosts(opts?: {
  published?: boolean
  limit?: number
  offset?: number
  search?: string
}): Promise<Result<Post[]>> {
  try {
    const db = adminDB()
    let q = db
      .from('posts')
      .select('*, categories(name, slug, color)')
      .order('created_at', { ascending: false })
      .limit(opts?.limit ?? 50)

    if (opts?.published !== undefined) q = q.eq('published', opts.published)
    if (opts?.search) q = q.ilike('title', `%${opts.search}%`)
    if (opts?.offset) q = q.range(opts.offset, (opts.offset + (opts.limit ?? 50)) - 1)

    const { data, error } = await q
    if (error) throw error
    return { ok: true, data: (data ?? []) as Post[] }
  } catch (e) { return err(e) }
}

export async function getPost(id: string): Promise<Result<Post>> {
  try {
    const { data, error } = await adminDB()
      .from('posts')
      .select('*, categories(name, slug, color)')
      .eq('id', id)
      .single()
    if (error) throw error
    return { ok: true, data: data as Post }
  } catch (e) { return err(e) }
}

export async function createPost(post: Partial<Post>): Promise<Result<Post>> {
  try {
    const { data, error } = await adminDB()
      .from('posts')
      .insert({
        title:       post.title ?? 'Untitled',
        slug:        post.slug  ?? `post-${Date.now()}`,
        excerpt:     post.excerpt ?? '',
        content:     post.content ?? '',
        author_name: post.author_name ?? 'Z3ymo Team',
        author_role: post.author_role ?? 'Editor',
        read_time:   post.read_time ?? 5,
        featured:    post.featured ?? false,
        published:   false,
        cover_image: post.cover_image ?? null,
        category_id: post.category_id ?? null,
      })
      .select()
      .single()
    if (error) throw error
    revalidatePath('/admin/blog')
    revalidatePath('/blog')
    return { ok: true, data: data as Post }
  } catch (e) { return err(e) }
}

export async function updatePost(id: string, updates: Partial<Post>): Promise<Result<Post>> {
  try {
    const payload: any = { ...updates }
    if (updates.published === true && !updates.published_at) {
      payload.published_at = new Date().toISOString()
    }
    const { data, error } = await adminDB()
      .from('posts')
      .update(payload)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    revalidatePath('/admin/blog')
    revalidatePath(`/blog/${data.slug}`)
    return { ok: true, data: data as Post }
  } catch (e) { return err(e) }
}

export async function deletePost(id: string): Promise<Result<{ id: string }>> {
  try {
    const { error } = await adminDB().from('posts').delete().eq('id', id)
    if (error) throw error
    revalidatePath('/admin/blog')
    revalidatePath('/blog')
    return { ok: true, data: { id } }
  } catch (e) { return err(e) }
}

// ─────────────────────────────────────────────────────────────
// CONTENT ITEMS (guides, docs, case-studies)
// ─────────────────────────────────────────────────────────────

export async function getContentItems(type?: ContentItem['type']): Promise<Result<ContentItem[]>> {
  try {
    let q = adminDB()
      .from('content_items')
      .select('*')
      .order('created_at', { ascending: false })
    if (type) q = q.eq('type', type)
    const { data, error } = await q
    if (error) throw error
    return { ok: true, data: (data ?? []) as ContentItem[] }
  } catch (e) { return err(e) }
}

export async function getContentItem(id: string): Promise<Result<ContentItem>> {
  try {
    const { data, error } = await adminDB()
      .from('content_items').select('*').eq('id', id).single()
    if (error) throw error
    return { ok: true, data: data as ContentItem }
  } catch (e) { return err(e) }
}

export async function upsertContentItem(
  item: Partial<ContentItem> & { type: ContentItem['type'] },
): Promise<Result<ContentItem>> {
  try {
    const payload: any = {
      ...item,
      slug: item.slug ?? `${item.type}-${Date.now()}`,
      updated_at: new Date().toISOString(),
    }
    if (payload.status === 'published' && !payload.published_at) {
      payload.published_at = new Date().toISOString()
    }
    const { data, error } = await adminDB()
      .from('content_items')
      .upsert(payload, { onConflict: 'id' })
      .select()
      .single()
    if (error) throw error
    revalidatePath('/admin/content')
    return { ok: true, data: data as ContentItem }
  } catch (e) { return err(e) }
}

export async function deleteContentItem(id: string): Promise<Result<{ id: string }>> {
  try {
    const { error } = await adminDB().from('content_items').delete().eq('id', id)
    if (error) throw error
    revalidatePath('/admin/content')
    return { ok: true, data: { id } }
  } catch (e) { return err(e) }
}

// ─────────────────────────────────────────────────────────────
// BOOKINGS
// ─────────────────────────────────────────────────────────────

export async function getBookings(opts?: {
  status?: string
  limit?: number
}): Promise<Result<Booking[]>> {
  try {
    let q = adminDB()
      .from('consultation_bookings')
      .select('*, consultation_slots(date, start_time, end_time, timezone)')
      .order('created_at', { ascending: false })
      .limit(opts?.limit ?? 100)
    if (opts?.status) q = q.eq('status', opts.status)
    const { data, error } = await q
    if (error) throw error
    return { ok: true, data: (data ?? []) as Booking[] }
  } catch (e) { return err(e) }
}

export async function updateBookingStatus(
  id: string,
  status: 'confirmed' | 'cancelled' | 'completed',
): Promise<Result<{ id: string; status: string }>> {
  try {
    const { error } = await adminDB()
      .from('consultation_bookings')
      .update({ status })
      .eq('id', id)
    if (error) throw error
    revalidatePath('/admin/bookings')
    return { ok: true, data: { id, status } }
  } catch (e) { return err(e) }
}

// ─────────────────────────────────────────────────────────────
// WAITLIST
// ─────────────────────────────────────────────────────────────

export async function getWaitlist(product?: string): Promise<Result<WaitlistEntry[]>> {
  try {
    let q = adminDB()
      .from('waitlist')
      .select('*')
      .order('created_at', { ascending: false })
    if (product) q = q.eq('product', product)
    const { data, error } = await q
    if (error) throw error
    return { ok: true, data: (data ?? []) as WaitlistEntry[] }
  } catch (e) { return err(e) }
}

// ─────────────────────────────────────────────────────────────
// SUBSCRIBERS
// ─────────────────────────────────────────────────────────────

export async function getSubscribers(): Promise<Result<Subscriber[]>> {
  try {
    const { data, error } = await adminDB()
      .from('subscribers')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return { ok: true, data: (data ?? []) as Subscriber[] }
  } catch (e) { return err(e) }
}

// ─────────────────────────────────────────────────────────────
// CONTACTS
// ─────────────────────────────────────────────────────────────

export async function getContacts(): Promise<Result<Contact[]>> {
  try {
    const { data, error } = await adminDB()
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return { ok: true, data: (data ?? []) as Contact[] }
  } catch (e) { return err(e) }
}

// ─────────────────────────────────────────────────────────────
// CATEGORIES (for post editor)
// ─────────────────────────────────────────────────────────────

export async function getCategories() {
  try {
    const { data, error } = await adminDB().from('categories').select('*').order('name')
    if (error) throw error
    return { ok: true as const, data: data ?? [] }
  } catch (e) { return err(e) }
}

// ─────────────────────────────────────────────────────────────
// AUTH CHECK
// ─────────────────────────────────────────────────────────────

export async function checkAdminPassword(password: string): Promise<boolean> {
  return password === process.env.ADMIN_PASSWORD
}
