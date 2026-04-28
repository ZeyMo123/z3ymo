// ─────────────────────────────────────────────────────────────────
// app/api/admin/content/route.ts
//
// Handles Guides, Case Studies, and Documentation CRUD.
// POST /api/admin/content  → create new content item
// GET  /api/admin/content?type=guide  → list items by type
// ─────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/client'

// ─── GET: list content items ──────────────────────────────────

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const type  = searchParams.get('type')
  const limit = parseInt(searchParams.get('limit') ?? '50')

  if (!type || !['guide', 'case-study', 'doc'].includes(type)) {
    return NextResponse.json({ error: 'Invalid or missing type parameter.' }, { status: 400 })
  }

  try {
    const db = createAdminClient()
    const { data, error } = await db
      .from('content_items')
      .select('id, title, slug, excerpt, featured, published, published_at, read_time, type, category_id, views, downloads')
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
      read_time, featured, published,
      cta_type, cta_custom_headline, cta_custom_body,
      pdf_available,
    } = body

    // Validation
    if (!type || !['guide', 'case-study', 'doc'].includes(type))
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
        category_id:         category_id?.trim() || null,
        tags:                Array.isArray(tags)           ? tags           : [],
        key_takeaways:       Array.isArray(key_takeaways) ? key_takeaways : [],
        read_time:           Number(read_time) || 5,
        featured:            Boolean(featured),
        published:           Boolean(published),
        published_at:        published ? new Date().toISOString() : null,
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

    // If publishing for first time, set published_at
    if (updates.published && !updates.published_at) {
      updates.published_at = new Date().toISOString()
    }

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
