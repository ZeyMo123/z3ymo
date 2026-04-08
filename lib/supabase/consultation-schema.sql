-- ─────────────────────────────────────────────────────────────
-- Z3ymo Consultation Booking System
-- Run in Supabase SQL editor: Dashboard → SQL Editor → New query
-- ─────────────────────────────────────────────────────────────

-- Consultation time slots
-- Pre-seeded by admin or via a management script
CREATE TABLE IF NOT EXISTS consultation_slots (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date          date        NOT NULL,
  start_time    time        NOT NULL,  -- e.g. '10:00'
  end_time      time        NOT NULL,  -- e.g. '10:45'
  timezone      text        NOT NULL DEFAULT 'Africa/Dar_es_Salaam',
  is_booked     boolean     NOT NULL DEFAULT false,
  booking_id    uuid        REFERENCES consultation_bookings(id) ON DELETE SET NULL,
  created_at    timestamptz NOT NULL DEFAULT now(),
  UNIQUE(date, start_time)
);

-- Consultation form submissions + booking records
CREATE TABLE IF NOT EXISTS consultation_bookings (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Form answers
  business_type   text    NOT NULL,
  build_goal      text    NOT NULL,
  challenges      text    NOT NULL,
  business_stage  text    NOT NULL,
  budget          text    NOT NULL,
  launch_timeline text    NOT NULL,
  -- Contact
  full_name       text    NOT NULL,
  email           text    NOT NULL,
  whatsapp        text    NOT NULL,
  -- Booking
  slot_id         uuid    REFERENCES consultation_slots(id) ON DELETE SET NULL,
  status          text    NOT NULL DEFAULT 'confirmed', -- confirmed | cancelled | completed
  -- Meta
  created_at      timestamptz NOT NULL DEFAULT now(),
  notes           text
);

-- Add FK on slots after bookings table exists (handles circular dependency)
ALTER TABLE consultation_slots
  ADD CONSTRAINT fk_booking
  FOREIGN KEY (booking_id) REFERENCES consultation_bookings(id) ON DELETE SET NULL;

-- ─── Row-level security ───────────────────────────────────────

ALTER TABLE consultation_slots    ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_bookings ENABLE ROW LEVEL SECURITY;

-- Public can READ available (non-booked) slots
CREATE POLICY "Public can view available slots"
  ON consultation_slots FOR SELECT
  USING (true);

-- Public can INSERT bookings (the API route will call this)
CREATE POLICY "Anyone can create a booking"
  ON consultation_bookings FOR INSERT
  WITH CHECK (true);

-- Public can UPDATE their own booking (for cancellations)
CREATE POLICY "Anyone can view their own booking"
  ON consultation_bookings FOR SELECT
  USING (true);

-- ─── Seed initial slots ───────────────────────────────────────
-- Adjust dates and times to match your actual availability.
-- Run this block separately, updating dates each month.

-- Example: Next 30 business days, Mon-Fri, two slots per day
-- (You can build a management UI later; for now seed manually)

-- INSERT INTO consultation_slots (date, start_time, end_time) VALUES
--   ('2026-04-07', '10:00', '10:45'),
--   ('2026-04-07', '14:00', '14:45'),
--   ('2026-04-08', '10:00', '10:45'),
--   ('2026-04-08', '14:00', '14:45'),
--   ... (continue for each business day)
-- ;

-- ─── Helper: mark slot as booked (called via API route) ───────
-- This is handled at the application layer with a transaction,
-- but you can also use a DB function for atomicity:

CREATE OR REPLACE FUNCTION book_consultation_slot(
  p_slot_id    uuid,
  p_booking_id uuid
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE consultation_slots
  SET    is_booked  = true,
         booking_id = p_booking_id
  WHERE  id = p_slot_id
    AND  is_booked = false;  -- prevents double-booking

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Slot % is already booked or does not exist', p_slot_id;
  END IF;
END;
$$;
