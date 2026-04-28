// ─────────────────────────────────────────────────────────────────
// app/api/admin/posts/route.ts
//
// Creates a new blog post in Supabase.
// Uses the service-role admin client so it bypasses RLS.
//
// If your posts table is missing any of the newer columns, run:
//   ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS cta_type        TEXT    DEFAULT 'consultation';
//   ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS tags            TEXT[]  DEFAULT '{}';
//   ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS cta_custom_headline TEXT;
//   ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS cta_custom_body TEXT;
// ─────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/client'

// ─── Validation ────────────────────────────────────────────────

function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
}

// ─── POST /api/admin/posts ─────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const {
      title,
      slug,
      excerpt,
      content,
      cover_image,
      cover_alt,
      author_name,
      category_id,
      read_time,
      featured,
      published,
      cta_type,
      cta_custom_headline,
      cta_custom_body,
      tags,
    } = body

    // ── Validation ──────────────────────────────────────────────
    if (!title?.trim())          return NextResponse.json({ error: 'Title is required.' },   { status: 400 })
    if (!slug?.trim())           return NextResponse.json({ error: 'Slug is required.' },    { status: 400 })
    if (!isValidSlug(slug))      return NextResponse.json({ error: 'Invalid slug format.' }, { status: 400 })
    if (!content?.trim() || content === '<p></p>')
                                 return NextResponse.json({ error: 'Content is required.' }, { status: 400 })

    const db = createAdminClient()

    // ── Check for duplicate slug ────────────────────────────────
    const { data: existing } = await db
      .from('posts')
      .select('id')
      .eq('slug', slug.trim())
      .maybeSingle()

    if (existing) {
      return NextResponse.json({ error: `A post with slug "${slug}" already exists. Choose a different title or edit the slug.` }, { status: 409 })
    }

    // ── Insert ──────────────────────────────────────────────────
    const { data, error } = await db
      .from('posts')
      .insert({
        title:        title.trim(),
        slug:         slug.trim(),
        excerpt:      excerpt?.trim() ?? '',
        content:      content,
        cover_image:  cover_image?.trim() || null,
        cover_alt:    cover_alt?.trim()   || null,
        author_name:  author_name?.trim() || 'Z3ymo Team',
        // Empty string → null for FK
        category_id:  category_id?.trim() || null,
        read_time:    Number(read_time) || 5,
        featured:     Boolean(featured),
        published:    Boolean(published),
        published_at: published ? new Date().toISOString() : null,
        views:        0,
        // Extended fields — require the ALTER TABLE above
        ...(cta_type           && { cta_type }),
        ...(cta_custom_headline && { cta_custom_headline }),
        ...(cta_custom_body     && { cta_custom_body }),
        ...(Array.isArray(tags) && tags.length && { tags }),
      })
      .select('id')
      .single()

    if (error) {
      console.error('[POST /api/admin/posts] Supabase error:', error)
      // Graceful unknown column degradation — retry without extended fields
      if (error.message?.includes('column') && error.message?.includes('does not exist')) {
        const { data: data2, error: error2 } = await db
          .from('posts')
          .insert({
            title:        title.trim(),
            slug:         slug.trim(),
            excerpt:      excerpt?.trim() ?? '',
            content:      content,
            cover_image:  cover_image?.trim() || null,
            cover_alt:    cover_alt?.trim()   || null,
            author_name:  author_name?.trim() || 'Z3ymo Team',
            category_id:  category_id?.trim() || null,
            read_time:    Number(read_time) || 5,
            featured:     Boolean(featured),
            published:    Boolean(published),
            published_at: published ? new Date().toISOString() : null,
            views:        0,
          })
          .select('id')
          .single()

        if (error2) throw new Error(error2.message)
        return NextResponse.json({ id: data2.id })
      }

      throw new Error(error.message)
    }

    return NextResponse.json({ id: data.id })
  } catch (err: any) {
    console.error('[POST /api/admin/posts]', err)
    return NextResponse.json(
      { error: err?.message ?? 'An unexpected error occurred. Please try again.' },
      { status: 500 },
    )
  }
}

// ─── PATCH /api/admin/posts — update existing post ────────────

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, ...updates } = body

    if (!id) return NextResponse.json({ error: 'Post ID is required.' }, { status: 400 })

    const db = createAdminClient()

    if (updates.published && !updates.published_at) {
      updates.published_at = new Date().toISOString()
    }

    const { data, error } = await db
      .from('posts')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select('id')
      .single()

    if (error) throw new Error(error.message)
    return NextResponse.json({ id: data.id })
  } catch (err: any) {
    console.error('[PATCH /api/admin/posts]', err)
    return NextResponse.json({ error: err?.message ?? 'Update failed.' }, { status: 500 })
  }
}
