'use server'

import { createClient } from '@supabase/supabase-js'

// Admin client — bypasses RLS for atomic slot booking
function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  )
}

// Public client — used for read-only queries
function getPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}

/* ─── Types ─────────────────────────────────────────────────── */

export interface ConsultationSlot {
  id:         string
  date:       string   // 'YYYY-MM-DD'
  start_time: string   // 'HH:MM'
  end_time:   string   // 'HH:MM'
  timezone:   string
  is_booked:  boolean
}

export interface ConsultationFormData {
  businessType:   string
  buildGoal:      string
  challenges:     string
  businessStage:  string
  budget:         string
  launchTimeline: string
  fullName:       string
  email:          string
  whatsapp:       string
}

export type FetchSlotsResult =
  | { ok: true;  slots: ConsultationSlot[] }
  | { ok: false; error: string }

export type BookResult =
  | { ok: true;  bookingId: string; slot: ConsultationSlot }
  | { ok: false; error: string }

/* ─── Fetch available slots ─────────────────────────────────── */

export async function fetchAvailableSlots(
  year:  number,
  month: number,  // 1-based
): Promise<FetchSlotsResult> {
  try {
    const db = getPublicClient()

    // Build date range for the requested month
    const from = `${year}-${String(month).padStart(2, '0')}-01`
    const toDate = new Date(year, month, 0)  // last day of month
    const to   = `${year}-${String(month).padStart(2, '0')}-${String(toDate.getDate()).padStart(2, '0')}`

    const { data, error } = await db
      .from('consultation_slots')
      .select('id, date, start_time, end_time, timezone, is_booked')
      .gte('date', from)
      .lte('date', to)
      .eq('is_booked', false)
      .order('date', { ascending: true })
      .order('start_time', { ascending: true })

    if (error) throw error

    return { ok: true, slots: data as ConsultationSlot[] }
  } catch (err: any) {
    console.error('[fetchAvailableSlots]', err)
    return { ok: false, error: err?.message ?? 'Failed to load available slots.' }
  }
}

/* ─── Submit form + book slot (atomic) ─────────────────────── */

export async function submitConsultationBooking(
  formData: ConsultationFormData,
  slotId:   string,
): Promise<BookResult> {
  const db = getAdminClient()

  try {
    // 1. Re-check slot is still available (race condition guard)
    const { data: slot, error: slotError } = await db
      .from('consultation_slots')
      .select('*')
      .eq('id', slotId)
      .eq('is_booked', false)
      .single()

    if (slotError || !slot) {
      return {
        ok:    false,
        error: 'This slot was just booked by someone else. Please choose a different time.',
      }
    }

    // 2. Insert the booking record
    const { data: booking, error: bookingError } = await db
      .from('consultation_bookings')
      .insert({
        business_type:   formData.businessType,
        build_goal:      formData.buildGoal,
        challenges:      formData.challenges,
        business_stage:  formData.businessStage,
        budget:          formData.budget,
        launch_timeline: formData.launchTimeline,
        full_name:       formData.fullName,
        email:           formData.email,
        whatsapp:        formData.whatsapp,
        slot_id:         slotId,
        status:          'confirmed',
      })
      .select()
      .single()

    if (bookingError || !booking) {
      console.error('[submitConsultationBooking] booking insert failed', bookingError)
      return { ok: false, error: 'Could not save your booking. Please try again.' }
    }

    // 3. Mark slot as booked using atomic DB function
    const { error: fnError } = await db.rpc('book_consultation_slot', {
      p_slot_id:    slotId,
      p_booking_id: booking.id,
    })

    if (fnError) {
      // Slot was snatched between steps 1 and 3 — clean up the booking
      await db.from('consultation_bookings').delete().eq('id', booking.id)
      return {
        ok:    false,
        error: 'This slot was just taken. Please pick another time.',
      }
    }

    return { ok: true, bookingId: booking.id, slot: slot as ConsultationSlot }
  } catch (err: any) {
    console.error('[submitConsultationBooking]', err)
    return { ok: false, error: err?.message ?? 'Something went wrong. Please try again.' }
  }
}

/* ─── Seed helper — call this from a one-time script ────────── */
// Run: node scripts/seed-slots.mjs
// Or call manually from the Supabase SQL editor.
