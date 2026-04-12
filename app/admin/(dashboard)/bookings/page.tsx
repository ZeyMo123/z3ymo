'use client'

import { useEffect, useState, useCallback, useTransition } from 'react'
import { motion } from 'framer-motion'
import { getBookings, updateBookingStatus } from '@/lib/admin/actions'
import type { Booking } from '@/lib/admin/actions'
import { PageHeader, SearchInput, FilterChip, StatusBadge, ErrorState, EmptyState, LoadingState, ConfirmDialog, Icon } from '@/components/admin/ui'

type Filter = 'all' | 'confirmed' | 'completed' | 'cancelled'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
function formatTime(t: string) {
  const [h, m] = t.split(':').map(Number)
  return `${h % 12 || 12}:${String(m).padStart(2,'0')} ${h >= 12 ? 'PM' : 'AM'}`
}

const BUDGET_LABELS: Record<string,string> = { 'under-1k': '<$1K', '1k-5k': '$1K–5K', '5k-20k': '$5K–20K', '20k-plus': '$20K+', unknown: '?' }
const STAGE_LABELS:  Record<string,string> = { idea: 'Idea', early: 'Early', growing: 'Growing', established: 'Established' }

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [state, setState]       = useState<'loading'|'success'|'error'>('loading')
  const [search, setSearch]     = useState('')
  const [filter, setFilter]     = useState<Filter>('all')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [updating, startUpdate] = useTransition()
  const [confirmAction, setConfirmAction] = useState<{id: string; status: 'completed'|'cancelled'} | null>(null)

  const load = useCallback(async () => {
    setState('loading')
    const res = await getBookings({ limit: 200 })
    if (res.ok) { setBookings(res.data); setState('success') }
    else setState('error')
  }, [])

  useEffect(() => { load() }, [load])

  const visible = bookings.filter(b => {
    const matchF = filter === 'all' || b.status === filter
    const matchS = !search || b.full_name.toLowerCase().includes(search.toLowerCase()) || b.email.toLowerCase().includes(search.toLowerCase())
    return matchF && matchS
  })

  const counts = { all: bookings.length, confirmed: bookings.filter(b=>b.status==='confirmed').length, completed: bookings.filter(b=>b.status==='completed').length, cancelled: bookings.filter(b=>b.status==='cancelled').length }

  function handleAction() {
    if (!confirmAction) return
    const { id, status } = confirmAction
    setConfirmAction(null)
    startUpdate(async () => {
      await updateBookingStatus(id, status)
      setBookings(prev => prev.map(b => b.id === id ? {...b, status} : b))
    })
  }

  return (
    <div className="max-w-5xl">
      <PageHeader title="Consultation bookings" subtitle="All consultation requests and their status"
        action={
          <button onClick={load} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-void/10 dark:border-whisper/10 text-xs text-void/50 dark:text-whisper/50 hover:border-void/25 dark:hover:border-whisper/25 transition-all cursor-pointer">
            {Icon.refresh} Refresh
          </button>
        }
      />

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex-1 max-w-xs"><SearchInput value={search} onChange={setSearch} placeholder="Search by name or email…" /></div>
        <div className="flex gap-2 flex-wrap">
          {(['all','confirmed','completed','cancelled'] as Filter[]).map(f => (
            <FilterChip key={f} label={`${f.charAt(0).toUpperCase()+f.slice(1)} (${counts[f]})`} active={filter===f} onClick={() => setFilter(f)} />
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-950 rounded-2xl border border-void/8 dark:border-whisper/8 overflow-hidden">
        {state === 'loading' && <div className="p-5"><LoadingState message="Loading bookings…" /></div>}
        {state === 'error'   && <ErrorState onRetry={load} />}
        {state === 'success' && visible.length === 0 && (
          <EmptyState icon="calendar" title="No bookings found" description="Bookings will appear here when people complete the consultation funnel." />
        )}

        {state === 'success' && visible.length > 0 && (
          <div className="divide-y divide-void/5 dark:divide-whisper/5">
            {visible.map((b, i) => (
              <motion.div key={b.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}>
                {/* Row */}
                <div className="flex items-center gap-4 px-5 py-4 hover:bg-void/2 dark:hover:bg-whisper/2 transition-colors cursor-pointer"
                  onClick={() => setExpanded(expanded === b.id ? null : b.id)}>
                  <div className="w-9 h-9 rounded-xl bg-crimson/8 flex items-center justify-center text-crimson shrink-0">
                    {Icon.user}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-void dark:text-whisper">{b.full_name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-void/6 dark:bg-whisper/6 text-void/40 dark:text-whisper/40">
                        {BUDGET_LABELS[b.budget] ?? b.budget}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-void/6 dark:bg-whisper/6 text-void/40 dark:text-whisper/40">
                        {STAGE_LABELS[b.business_stage] ?? b.business_stage}
                      </span>
                    </div>
                    <div className="text-xs text-void/40 dark:text-whisper/40 mt-0.5">
                      {b.email} · {b.business_type}
                      {b.consultation_slots && ` · ${b.consultation_slots.date} ${formatTime(b.consultation_slots.start_time)}`}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <StatusBadge status={b.status} />
                    <span className="text-void/20 dark:text-whisper/20">
                      {expanded === b.id ? Icon.chevronUp : Icon.chevronDown}
                    </span>
                  </div>
                </div>

                {/* Expanded detail */}
                {expanded === b.id && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="px-5 pb-5 pt-2 grid grid-cols-1 sm:grid-cols-2 gap-5 border-t border-void/5 dark:border-whisper/5">
                      {/* Left: form answers */}
                      <div className="space-y-3">
                        {[
                          { label: 'Business type',  value: b.business_type },
                          { label: 'Build goal',     value: b.build_goal },
                          { label: 'Launch timeline',value: b.launch_timeline },
                          { label: 'Challenges',     value: b.challenges },
                        ].map(row => (
                          <div key={row.label}>
                            <div className="text-[10px] font-semibold uppercase tracking-wider text-void/30 dark:text-whisper/30 mb-0.5">{row.label}</div>
                            <div className="text-sm text-void/65 dark:text-whisper/65">{row.value}</div>
                          </div>
                        ))}
                      </div>
                      {/* Right: contact + actions */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <a href={`mailto:${b.email}`} className="flex items-center gap-2 text-sm text-void/60 dark:text-whisper/60 hover:text-crimson transition-colors">
                            {Icon.mail} {b.email}
                          </a>
                          <a href={`https://wa.me/${b.whatsapp.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-void/60 dark:text-whisper/60 hover:text-emerald transition-colors">
                            {Icon.whatsapp} {b.whatsapp}
                          </a>
                        </div>
                        <div className="text-xs text-void/30 dark:text-whisper/30">Booked {formatDate(b.created_at)}</div>
                        {/* Actions */}
                        {b.status === 'confirmed' && (
                          <div className="flex gap-2">
                            <button onClick={() => setConfirmAction({id: b.id, status: 'completed'})}
                              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald/8 text-emerald text-xs font-semibold hover:bg-emerald/15 transition-colors cursor-pointer">
                              {Icon.check} Mark completed
                            </button>
                            <button onClick={() => setConfirmAction({id: b.id, status: 'cancelled'})}
                              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-50 dark:bg-red-950/20 text-red-500 text-xs font-semibold hover:bg-red-100 dark:hover:bg-red-950/30 transition-colors cursor-pointer">
                              {Icon.x} Cancel
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={!!confirmAction}
        title={confirmAction?.status === 'completed' ? 'Mark as completed?' : 'Cancel this booking?'}
        message={confirmAction?.status === 'completed' ? 'This will mark the consultation as completed.' : 'This will cancel the consultation booking.'}
        confirmLabel={confirmAction?.status === 'completed' ? 'Mark completed' : 'Cancel booking'}
        danger={confirmAction?.status === 'cancelled'}
        onConfirm={handleAction}
        onCancel={() => setConfirmAction(null)}
      />
    </div>
  )
}
