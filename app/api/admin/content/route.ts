// ─────────────────────────────────────────────────────────────────
// app/api/admin/content/route.ts
//
// Handles Guides, Case Studies, and Documentation CRUD.
// GET   /api/admin/content?type=guide  → list items by type
// POST  /api/admin/content             → create new content item
// PATCH /api/admin/content             → update existing item
// ─────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient }         from '@/lib/supabase/client'
import type { ContentType }          from '@/lib/supabase/client'

const VALID_TYPES: ContentType[] = ['guide', 'case-study', 'doc']

// ─── GET: list content items ──────────────────────────────────

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const limit = parseInt(searchParams.get('limit') ?? '50')

  const rawType = searchParams.get('type')
  if (!rawType || !VALID_TYPES.includes(rawType as ContentType)) {
    return NextResponse.json({ error: 'Invalid or missing type parameter.' }, { status: 400 })
  }
  const type = rawType as ContentType

  try {
    const db = createAdminClient()
    const { data, error } = await db
      .from('content_items')
      // ✓ 'status' not 'published', no 'downloads' column
      .select('id, title, slug, excerpt, featured, status, published_at, read_time, type, category_id, views')
      .eq('type', type)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw new Error(error.message)
    return NextResponse.json({ items: data ?? [] })
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? 'Failed to fetch.' }, { status: 500 })
  }
}

// ─── POST: create content item ────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const {
      type, title, slug, excerpt, content,
      cover_image, cover_alt, author_name,
      category_id, tags, key_takeaways,
      read_time, featured,
      // ✓ 'status' replaces the old 'published' boolean
      status,
      cta_type, cta_custom_headline, cta_custom_body,
      pdf_available,
    } = body

    // Validation
    if (!type || !VALID_TYPES.includes(type))
      return NextResponse.json({ error: 'Invalid content type.' }, { status: 400 })
    if (!title?.trim())
      return NextResponse.json({ error: 'Title is required.' }, { status: 400 })
    if (!slug?.trim())
      return NextResponse.json({ error: 'Slug is required.' }, { status: 400 })
    if (!content?.trim() || content === '<p></p>')
      return NextResponse.json({ error: 'Content cannot be empty.' }, { status: 400 })

    const db = createAdminClient()

    // Check duplicate slug + type
    const { data: existing } = await db
      .from('content_items')
      .select('id')
      .eq('type', type)
      .eq('slug', slug.trim())
      .maybeSingle()

    if (existing)
      return NextResponse.json({ error: `A ${type} with this slug already exists.` }, { status: 409 })

    // ✓ Use 'status' column — 'draft' | 'published' | 'archived'
    const resolvedStatus = ['draft', 'published', 'archived'].includes(status) ? status : 'draft'
    const isPublished    = resolvedStatus === 'published'

    const { data, error } = await db
      .from('content_items')
      .insert({
        type,
        title:               title.trim(),
        slug:                slug.trim(),
        excerpt:             excerpt?.trim() ?? '',
        content,
        cover_image:         cover_image?.trim() || null,
        cover_alt:           cover_alt?.trim()   || null,
        author_name:         author_name?.trim() || 'Z3ymo Team',
        category_id:         category_id         || null,
        tags:                Array.isArray(tags)           ? tags           : [],
        key_takeaways:       Array.isArray(key_takeaways) ? key_takeaways : [],
        read_time:           Number(read_time) || 5,
        featured:            Boolean(featured),
        // ✓ status instead of published boolean
        status:              resolvedStatus,
        published_at:        isPublished ? new Date().toISOString() : null,
        cta_type:            cta_type ?? 'consultation',
        cta_custom_headline: cta_custom_headline || null,
        cta_custom_body:     cta_custom_body     || null,
        pdf_available:       pdf_available !== false,
      })
      .select('id')
      .single()

    if (error) throw new Error(error.message)
    return NextResponse.json({ id: data.id })
  } catch (err: any) {
    console.error('[POST /api/admin/content]', err)
    return NextResponse.json({ error: err.message ?? 'Server error.' }, { status: 500 })
  }
}

// ─── PATCH: update content item ───────────────────────────────

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, ...updates } = body

    if (!id) return NextResponse.json({ error: 'ID is required.' }, { status: 400 })

    const db = createAdminClient()

    // ✓ Check status, not published boolean
    // Set published_at when transitioning to 'published' for the first time
    if (updates.status === 'published' && !updates.published_at) {
      updates.published_at = new Date().toISOString()
    }

    // ✓ Strip any stale 'published' boolean that might come from old clients
    delete updates.published

    const { data, error } = await db
      .from('content_items')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select('id')
      .single()

    if (error) throw new Error(error.message)
    return NextResponse.json({ id: data.id })
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? 'Update failed.' }, { status: 500 })
  }
}