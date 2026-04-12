'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { getWaitlist } from '@/lib/admin/actions'
import type { WaitlistEntry } from '@/lib/admin/actions'
import { PageHeader, FilterChip, ErrorState, EmptyState, LoadingState, Icon, DataTable } from '@/components/admin/ui'

const PRODUCTS = ['all', 'pulse', 'ebox', 'novel', 'salons']
const COLORS: Record<string,string> = { pulse: '#C0392B', ebox: '#1B998B', novel: '#C9A84C', salons: '#7C3AED' }

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function exportCSV(entries: WaitlistEntry[]) {
  const rows = [['Name','Email','Product','Date'], ...entries.map(e => [e.name ?? '', e.email, e.product, formatDate(e.created_at)])]
  const csv  = rows.map(r => r.map(v => `"${v}"`).join(',')).join('\n')
  const a    = document.createElement('a')
  a.href     = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`
  a.download = 'waitlist.csv'
  a.click()
}

export default function WaitlistPage() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([])
  const [state,   setState]   = useState<'loading'|'success'|'error'>('loading')
  const [filter,  setFilter]  = useState('all')

  const load = useCallback(async () => {
    setState('loading')
    const res = await getWaitlist()
    if (res.ok) { setEntries(res.data); setState('success') }
    else setState('error')
  }, [])

  useEffect(() => { load() }, [load])

  const visible = filter === 'all' ? entries : entries.filter(e => e.product === filter)
  const counts  = PRODUCTS.reduce((acc, p) => ({ ...acc, [p]: p === 'all' ? entries.length : entries.filter(e => e.product === p).length }), {} as Record<string,number>)

  return (
    <div className="max-w-4xl">
      <PageHeader title="Waitlist" subtitle="People who signed up for upcoming Z3ymo products"
        action={
          <button onClick={() => exportCSV(visible)} disabled={!visible.length}
            className="flex items-center gap-2 px-3 py-2 rounded-xl border border-void/10 dark:border-whisper/10 text-xs text-void/50 dark:text-whisper/50 hover:border-void/25 dark:hover:border-whisper/25 disabled:opacity-30 transition-all cursor-pointer">
            {Icon.download} Export CSV
          </button>
        }
      />

      {/* Product breakdown cards */}
      {state === 'success' && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {(['pulse','ebox','novel','salons'] as const).map(p => (
            <div key={p} className="bg-white dark:bg-gray-950 rounded-2xl border border-void/8 dark:border-whisper/8 p-4 cursor-pointer hover:border-void/20 dark:hover:border-whisper/20 transition-all"
              onClick={() => setFilter(filter === p ? 'all' : p)}>
              <div className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: COLORS[p] }}>{p}</div>
              <div className="font-display font-bold text-2xl text-void dark:text-whisper">{counts[p]}</div>
              <div className="text-[10px] text-void/35 dark:text-whisper/35">signups</div>
            </div>
          ))}
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-2 flex-wrap mb-5">
        {PRODUCTS.map(p => (
          <FilterChip key={p} label={`${p.charAt(0).toUpperCase()+p.slice(1)} (${counts[p] ?? 0})`} active={filter === p} onClick={() => setFilter(p)} />
        ))}
      </div>

      <div className="bg-white dark:bg-gray-950 rounded-2xl border border-void/8 dark:border-whisper/8 overflow-hidden">
        {state === 'loading' && <div className="p-5"><LoadingState message="Loading waitlist…" /></div>}
        {state === 'error'   && <ErrorState onRetry={load} />}
        {state === 'success' && visible.length === 0 && (
          <EmptyState icon="user" title="No entries" description="Waitlist signups will appear here." />
        )}

        {state === 'success' && visible.length > 0 && (
          <DataTable headers={['Name', 'Email', 'Product', 'Date']}>
            {visible.map((e, i) => (
              <motion.tr key={e.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}
                className="hover:bg-void/2 dark:hover:bg-whisper/2 transition-colors">
                <td className="px-5 py-3.5 text-sm text-void dark:text-whisper">{e.name ?? '—'}</td>
                <td className="px-5 py-3.5 text-sm text-void/65 dark:text-whisper/65 font-mono">{e.email}</td>
                <td className="px-5 py-3.5">
                  <span className="text-[10px] font-bold uppercase px-2 py-1 rounded-md" style={{ background: `${COLORS[e.product]}15`, color: COLORS[e.product] }}>{e.product}</span>
                </td>
                <td className="px-5 py-3.5 text-[11px] text-void/40 dark:text-whisper/40">{formatDate(e.created_at)}</td>
              </motion.tr>
            ))}
          </DataTable>
        )}
      </div>
    </div>
  )
}
