// ─────────────────────────────────────────────────────────────────
// app/api/content/pdf/route.ts
//
// POST /api/content/pdf  → validates email, returns success
// GET  /api/content/pdf?type=guide&slug=my-guide → redirects to
//      /{type}/{slug}?print=1 (browser handles PDF export)
//
// Note: pdf_access is tracked via the pdf_available boolean on
// content_items. There is no separate pdf_access table.
// ─────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'

// ─── POST: validate email gate ────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email?.includes('@'))
      return NextResponse.json({ error: 'Valid email required.' }, { status: 400 })

    // Email is valid — client can now show the download link.
    // To persist email capture, add the email to your subscribers table here.
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

  return NextResponse.redirect(new URL(`${prefix}/${slug}?print=1`, req.url))
}
