import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/client'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, message, context, channel = 'form' } = body

    const db = createAdminClient()
    const { error } = await db.from('contacts').insert({
      name, email, message, context, channel,
    })

    if (error) throw error

    // In production: send notification email via Resend
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'Z3ymo <noreply@z3ymo.com>',
    //   to: 'hello@z3ymo.com',
    //   subject: `New enquiry: ${context ?? 'General'}`,
    //   html: `<p>From: ${name} (${email})</p><p>${message}</p>`,
    // })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact error:', err)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
