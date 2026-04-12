'use client'

import { useEffect, useState, useCallback, useTransition } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  fetchAvailableSlots,
  submitConsultationBooking,
  type ConsultationSlot,
  type ConsultationFormData,
} from '@/lib/consultation-actions'

// ─── Helpers ──────────────────────────────────────────────────

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const DAY_ABBRS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function formatTime(time: string): string {
  const [h, m] = time.split(':').map(Number)
  const ampm  = h >= 12 ? 'PM' : 'AM'
  const hour  = h % 12 || 12
  return `${hour}:${String(m).padStart(2, '0')} ${ampm}`
}

function formatDateLong(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
}

// Group slots by date
function groupByDate(slots: ConsultationSlot[]): Record<string, ConsultationSlot[]> {
  return slots.reduce<Record<string, ConsultationSlot[]>>((acc, slot) => {
    if (!acc[slot.date]) acc[slot.date] = []
    acc[slot.date].push(slot)
    return acc
  }, {})
}

// Build calendar grid (6×7) for a given month
function buildCalendarGrid(year: number, month: number): (number | null)[] {
  const firstDay  = new Date(year, month - 1, 1).getDay()  // 0=Sun
  const daysInMon = new Date(year, month, 0).getDate()
  const grid: (number | null)[] = Array(firstDay).fill(null)
  for (let d = 1; d <= daysInMon; d++) grid.push(d)
  while (grid.length % 7 !== 0) grid.push(null)
  return grid
}

// ─── Loading skeleton ─────────────────────────────────────────

function CalendarSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="h-5 w-32 bg-void/8 dark:bg-whisper/8 rounded-full" />
        <div className="flex gap-2">
          <div className="h-8 w-8 bg-void/8 dark:bg-whisper/8 rounded-xl" />
          <div className="h-8 w-8 bg-void/8 dark:bg-whisper/8 rounded-xl" />
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAY_ABBRS.map(d => <div key={d} className="h-3 rounded bg-void/6 dark:bg-whisper/6" />)}
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {Array(35).fill(0).map((_, i) => (
          <div key={i} className="aspect-square rounded-xl bg-void/5 dark:bg-whisper/5" />
        ))}
      </div>
    </div>
  )
}

// ─── Error state ──────────────────────────────────────────────

function CalendarError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
      <div className="w-12 h-12 rounded-2xl bg-crimson/8 flex items-center justify-center">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C0392B" strokeWidth="1.8" strokeLinecap="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <div>
        <p className="font-semibold text-void dark:text-whisper mb-1">Could not load available slots</p>
        <p className="text-sm text-void/50 dark:text-whisper/50">Please check your connection and try again.</p>
      </div>
      <button onClick={onRetry}
        className="px-5 py-2.5 rounded-full bg-crimson text-white text-sm font-medium hover:bg-crimson/90 transition-colors cursor-pointer">
        Try again
      </button>
    </div>
  )
}

// ─── Empty state ──────────────────────────────────────────────

function CalendarEmpty({ onNextMonth }: { onNextMonth: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
      <div className="w-12 h-12 rounded-2xl bg-void/5 dark:bg-whisper/5 flex items-center justify-center">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
          className="text-void/40 dark:text-whisper/40">
          <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />
        </svg>
      </div>
      <div>
        <p className="font-semibold text-void dark:text-whisper mb-1">No slots available this month</p>
        <p className="text-sm text-void/50 dark:text-whisper/50">Check the next month for open consultation times.</p>
      </div>
      <button onClick={onNextMonth}
        className="px-5 py-2.5 rounded-full border border-void/15 dark:border-whisper/15 text-sm text-void/60 dark:text-whisper/60 hover:border-void/30 dark:hover:border-whisper/30 transition-all cursor-pointer">
        View next month →
      </button>
    </div>
  )
}

// ─── Slot time pill ───────────────────────────────────────────

function SlotPill({
  slot, selected, onSelect,
}: {
  slot:     ConsultationSlot
  selected: boolean
  onSelect: (slot: ConsultationSlot) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(slot)}
      className={[
        'w-full py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer border',
        selected
          ? 'bg-crimson text-white border-crimson shadow-md shadow-crimson/25'
          : 'bg-void/3 dark:bg-whisper/3 border-void/10 dark:border-whisper/10 text-void/65 dark:text-whisper/65 hover:border-crimson/40 hover:text-crimson',
      ].join(' ')}
    >
      {formatTime(slot.start_time)}
    </button>
  )
}

// ─── Main calendar ────────────────────────────────────────────

type LoadState = 'loading' | 'success' | 'error'

interface Props {
  formData:   ConsultationFormData
  onBooked:   (bookingId: string, slot: ConsultationSlot) => void
  onBack:     () => void
}

export default function BookingCalendar({ formData, onBooked, onBack }: Props) {
  const today     = new Date()
  const [year,    setYear]    = useState(today.getFullYear())
  const [month,   setMonth]   = useState(today.getMonth() + 1)  // 1-based
  const [slots,   setSlots]   = useState<ConsultationSlot[]>([])
  const [loadState, setLoadState] = useState<LoadState>('loading')
  const [errorMsg, setErrorMsg]   = useState('')
  const [selectedDate, setSelectedDate]  = useState<string | null>(null)
  const [selectedSlot, setSelectedSlot]  = useState<ConsultationSlot | null>(null)
  const [bookingError, setBookingError]  = useState('')
  const [isBooking, startBooking] = useTransition()

  // ── Fetch slots ──
  const loadSlots = useCallback(async () => {
    setLoadState('loading')
    setSelectedDate(null)
    setSelectedSlot(null)
    setErrorMsg('')
    const result = await fetchAvailableSlots(year, month)
    if (result.ok) {
      setSlots(result.slots)
      setLoadState('success')
    } else {
      setErrorMsg(result.error)
      setLoadState('error')
    }
  }, [year, month])

  useEffect(() => { loadSlots() }, [loadSlots])

  // ── Month navigation ──
  function prevMonth() {
    const isPast = year === today.getFullYear() && month <= today.getMonth() + 1
    if (isPast) return
    if (month === 1) { setYear(y => y - 1); setMonth(12) }
    else setMonth(m => m - 1)
  }

  function nextMonth() {
    if (month === 12) { setYear(y => y + 1); setMonth(1) }
    else setMonth(m => m + 1)
  }

  // ── Book slot ──
  function handleBook() {
    if (!selectedSlot) return
    setBookingError('')
    startBooking(async () => {
      const result = await submitConsultationBooking(formData, selectedSlot.id)
      if (result.ok) {
        onBooked(result.bookingId, result.slot)
      } else {
        setBookingError(result.error)
        // Reload slots to reflect any that were just taken
        loadSlots()
      }
    })
  }

  // ── Calendar grid data ──
  const slotsByDate = groupByDate(slots)
  const grid        = buildCalendarGrid(year, month)
  const datesWithSlots = new Set(Object.keys(slotsByDate))
  const todayStr    = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  const isPrevDisabled = year === today.getFullYear() && month <= today.getMonth() + 1
  const slotCount = slots.length

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-void/50 dark:text-whisper/50 hover:text-void dark:hover:text-whisper transition-colors cursor-pointer"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back
        </button>
        <div className="h-4 w-px bg-void/12 dark:bg-whisper/12" />
        <h2 className="font-display font-bold text-xl text-void dark:text-whisper">
          Choose a time
        </h2>
      </div>

      {/* States */}
      {loadState === 'loading' && <CalendarSkeleton />}
      {loadState === 'error'   && <CalendarError onRetry={loadSlots} />}

      {loadState === 'success' && (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">

          {/* ── Calendar panel ── */}
          <div>
            {/* Month navigation */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <span className="font-display font-bold text-lg text-void dark:text-whisper">
                  {MONTH_NAMES[month - 1]} {year}
                </span>
                {loadState === 'success' && (
                  <span className="ml-2 text-xs text-void/35 dark:text-whisper/35">
                    {slotCount} {slotCount === 1 ? 'slot' : 'slots'} available
                  </span>
                )}
              </div>
              <div className="flex gap-1.5">
                <button
                  onClick={prevMonth}
                  disabled={isPrevDisabled}
                  className="w-8 h-8 rounded-xl flex items-center justify-center border border-void/10 dark:border-whisper/10 text-void/40 dark:text-whisper/40 hover:border-void/25 dark:hover:border-whisper/25 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={nextMonth}
                  className="w-8 h-8 rounded-xl flex items-center justify-center border border-void/10 dark:border-whisper/10 text-void/40 dark:text-whisper/40 hover:border-void/25 dark:hover:border-whisper/25 transition-all cursor-pointer"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {DAY_ABBRS.map((d) => (
                <div key={d} className="text-center text-[10px] font-semibold uppercase tracking-wider text-void/30 dark:text-whisper/30 py-1">
                  {d}
                </div>
              ))}
            </div>

            {/* Day cells */}
            {slots.length === 0
              ? <CalendarEmpty onNextMonth={nextMonth} />
              : (
                <div className="grid grid-cols-7 gap-1.5">
                  {grid.map((day, idx) => {
                    if (!day) {
                      return <div key={`empty-${idx}`} className="aspect-square" />
                    }

                    const dateStr    = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                    const hasSlots   = datesWithSlots.has(dateStr)
                    const isToday    = dateStr === todayStr
                    const isPast     = dateStr < todayStr
                    const isSelected = dateStr === selectedDate

                    return (
                      <button
                        key={dateStr}
                        type="button"
                        disabled={!hasSlots || isPast}
                        onClick={() => {
                          setSelectedDate(dateStr)
                          setSelectedSlot(null)
                          setBookingError('')
                        }}
                        className={[
                          'aspect-square rounded-xl flex flex-col items-center justify-center text-xs font-medium transition-all duration-150 relative',
                          isSelected
                            ? 'bg-crimson text-white shadow-md shadow-crimson/25'
                            : hasSlots && !isPast
                              ? 'bg-void/4 dark:bg-whisper/4 text-void/80 dark:text-whisper/80 hover:bg-crimson/8 hover:text-crimson border border-void/8 dark:border-whisper/8 hover:border-crimson/25 cursor-pointer'
                              : 'text-void/20 dark:text-whisper/20 cursor-not-allowed',
                        ].join(' ')}
                      >
                        {day}
                        {/* Slot count dot */}
                        {hasSlots && !isPast && !isSelected && (
                          <span className="absolute bottom-1 w-1 h-1 rounded-full bg-crimson" />
                        )}
                        {isToday && !isSelected && (
                          <span className="absolute top-1 right-1 w-1 h-1 rounded-full bg-gold" />
                        )}
                      </button>
                    )
                  })}
                </div>
              )
            }

            {/* Legend */}
            <div className="flex gap-5 mt-4 text-xs text-void/35 dark:text-whisper/35">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-crimson inline-block" />
                Slots available
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
                Today
              </span>
            </div>
          </div>

          {/* ── Slot panel ── */}
          <div>
            <AnimatePresence mode="wait">
              {!selectedDate ? (
                <motion.div
                  key="prompt"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full min-h-50 text-center"
                >
                  <div className="w-12 h-12 rounded-2xl bg-void/5 dark:bg-whisper/5 flex items-center justify-center mb-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
                      className="text-void/30 dark:text-whisper/30">
                      <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />
                    </svg>
                  </div>
                  <p className="text-sm text-void/40 dark:text-whisper/40">
                    Select a date to see available times
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={selectedDate}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-void/35 dark:text-whisper/35 mb-1">
                      Available times
                    </p>
                    <p className="font-display font-semibold text-void dark:text-whisper">
                      {formatDateLong(selectedDate)}
                    </p>
                    <p className="text-xs text-void/35 dark:text-whisper/35 mt-0.5">
                      All times in EAT (UTC+3)
                    </p>
                  </div>

                  <div className="space-y-2 mb-6">
                    {(slotsByDate[selectedDate] ?? []).map((slot) => (
                      <SlotPill
                        key={slot.id}
                        slot={slot}
                        selected={selectedSlot?.id === slot.id}
                        onSelect={setSelectedSlot}
                      />
                    ))}
                  </div>

                  {/* Confirm button */}
                  <AnimatePresence>
                    {selectedSlot && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                      >
                        {/* Summary */}
                        <div className="px-4 py-3 rounded-2xl bg-crimson/5 border border-crimson/15 mb-4 text-sm">
                          <div className="font-semibold text-void dark:text-whisper mb-0.5">
                            {formatDateLong(selectedDate)}
                          </div>
                          <div className="text-void/55 dark:text-whisper/55 text-xs">
                            {formatTime(selectedSlot.start_time)} – {formatTime(selectedSlot.end_time)} EAT
                          </div>
                        </div>

                        {bookingError && (
                          <div className="flex items-start gap-2 text-sm text-crimson mb-3">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="shrink-0 mt-0.5">
                              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" />
                            </svg>
                            {bookingError}
                          </div>
                        )}

                        <button
                          onClick={handleBook}
                          disabled={isBooking}
                          className="w-full py-3.5 rounded-2xl bg-crimson text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-crimson/90 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-crimson/25"
                        >
                          {isBooking ? (
                            <>
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin">
                                <path d="M21 12a9 9 0 11-6.219-8.56" />
                              </svg>
                              Confirming…
                            </>
                          ) : (
                            <>
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                              Confirm consultation
                            </>
                          )}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  )
}
