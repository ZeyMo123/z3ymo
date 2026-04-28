// ─────────────────────────────────────────────────────────────────
// app/api/content/pdf/route.ts
//
// POST /api/content/pdf  → Records email access, returns success
// GET  /api/content/pdf?type=guide&slug=my-guide → Redirects to
//      a print-ready HTML page the browser can save as PDF
//
// Full server-side PDF generation (puppeteer) requires a separate
// service. For now we redirect to a print-friendly reading page
// at /{type}/{slug}?print=1 and let the browser handle PDF export.
// This is the correct approach for Next.js Edge/Vercel without
// a dedicated rendering server.
// ─────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/client'

// ─── POST: record email gate ──────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const { email, contentId, contentType, contentSlug } = await req.json()

    if (!email?.includes('@'))
      return NextResponse.json({ error: 'Valid email required.' }, { status: 400 })

    const db = createAdminClient()

    // Record access
    await db.from('pdf_access').insert({
      content_id:   contentId,
      email:        email.trim().toLowerCase(),
      content_type: contentType,
      content_slug: contentSlug,
    })

    // Increment download counter
    await db.rpc('increment_content_downloads', { item_id: contentId })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? 'Failed.' }, { status: 500 })
  }
}

// ─── GET: serve print-ready redirect ─────────────────────────

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type')
  const slug = searchParams.get('slug')

  if (!type || !slug)
    return NextResponse.json({ error: 'type and slug required.' }, { status: 400 })

  const prefix = type === 'guide'
    ? '/guides'
    : type === 'case-study'
      ? '/case-studies'
      : '/docs'

  // Redirect to the reading page with ?print=1 query param.
  // The reading page detects this and applies print styles + triggers window.print()
  return NextResponse.redirect(new URL(`${prefix}/${slug}?print=1`, req.url))
}
