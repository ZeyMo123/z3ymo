/**
 * Slot seeder — run once per month to populate available consultation slots.
 *
 * Usage:
 *   SUPABASE_URL=https://xxx.supabase.co \
 *   SUPABASE_SERVICE_KEY=eyJ... \
 *   node scripts/seed-slots.mjs
 *
 * Config: edit SLOTS_PER_DAY and AVAILABLE_TIMES below.
 */

import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
)

// ─── Config ──────────────────────────────────────────────────
const DAYS_AHEAD        = 60         // seed 60 days from today
const SKIP_WEEKENDS     = true       // Mon–Fri only
const TIMEZONE          = 'Africa/Dar_es_Salaam'

// Available slots per day: [ startTime, endTime ]
const AVAILABLE_TIMES = [
  ['10:00', '10:45'],
  ['11:00', '11:45'],
  ['14:00', '14:45'],
  ['15:00', '15:45'],
]

// Days to explicitly block (yyyy-mm-dd) — holidays, trips, etc.
const BLOCKED_DATES = [
  // '2026-04-18',
]
console.log('URL:', process.env.SUPABASE_URL)
// ─── Generate dates ───────────────────────────────────────────
function addDays(date, n) {
  const d = new Date(date)
  d.setDate(d.getDate() + n)
  return d
}

function formatDate(date) {
  return date.toISOString().slice(0, 10)
}

const today  = new Date()
const rows   = []

for (let i = 1; i <= DAYS_AHEAD; i++) {
  const date    = addDays(today, i)
  const dow     = date.getDay()            // 0 = Sun, 6 = Sat
  const dateStr = formatDate(date)

  if (SKIP_WEEKENDS && (dow === 0 || dow === 6)) continue
  if (BLOCKED_DATES.includes(dateStr)) continue

  for (const [start, end] of AVAILABLE_TIMES) {
    rows.push({
      date:       dateStr,
      start_time: start,
      end_time:   end,
      timezone:   TIMEZONE,
      is_booked:  false,
    })
  }
}

// ─── Insert (upsert to avoid duplicates) ─────────────────────
console.log(`Seeding ${rows.length} slots across ${DAYS_AHEAD} days…`)

const { data, error } = await supabase
  .from('consultation_slots')
  .upsert(rows, { onConflict: 'date,start_time', ignoreDuplicates: true })

if (error) {
  console.error('❌ Seed failed:', error.message)
  process.exit(1)
}

console.log(`✓ Done. ${rows.length} slots seeded.`)
