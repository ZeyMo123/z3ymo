import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/client'

const VALID_PRODUCTS = ['pulse', 'ebox', 'novel', 'salons']

export async function POST(req: NextRequest) {
  try {
    const { email, product, name } = await req.json()

    if (!email?.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }
    if (!VALID_PRODUCTS.includes(product)) {
      return NextResponse.json({ error: 'Invalid product' }, { status: 400 })
    }

    const db = createAdminClient()
    const { error } = await db
      .from('waitlist')
      .upsert({ email: email.trim().toLowerCase(), product, name }, { onConflict: 'email,product' })

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Waitlist error:', err)
    return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 })
  }
}
