import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/client'

export async function POST(req: NextRequest) {
  try {
    const { email, source } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    const db = createAdminClient()
    const { error } = await db
      .from('subscribers')
      .upsert({ email: email.trim().toLowerCase(), source: source ?? 'website' }, { onConflict: 'email' })

    if (error) throw error

    // In production: trigger a welcome email via Resend here

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Subscribe error:', err)
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
  }
}
