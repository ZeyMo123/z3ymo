'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { getSubscribers } from '@/lib/admin/actions'
import type { Subscriber } from '@/lib/admin/actions'
import { PageHeader, StatusBadge, ErrorState, EmptyState, LoadingState, SearchInput, Icon, DataTable } from '@/components/admin/ui'

function formatDate(iso: string) { return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }

function exportCSV(rows: Subscriber[]) {
  const csv = [['Email','Confirmed','Source','Date'], ...rows.map(s => [s.email, String(s.confirmed), s.source, formatDate(s.created_at)])]
    .map(r => r.map(v => `"${v}"`).join(',')).join('\n')
  const a = document.createElement('a'); a.href = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`; a.download = 'subscribers.csv'; a.click()
}

export default function SubscribersPage() {
  const [subs,   setSubs]   = useState<Subscriber[]>([])
  const [state,  setState]  = useState<'loading'|'success'|'error'>('loading')
  const [search, setSearch] = useState('')

  const load = useCallback(async () => {
    setState('loading')
    const res = await getSubscribers()
    if (res.ok) { setSubs(res.data); setState('success') }
    else setState('error')
  }, [])

  useEffect(() => { load() }, [load])

  const visible  = subs.filter(s => !search || s.email.toLowerCase().includes(search.toLowerCase()))
  const confirmed = subs.filter(s => s.confirmed).length

  return (
    <div className="max-w-3xl">
      <PageHeader title="Email subscribers" subtitle={`${confirmed} confirmed of ${subs.length} total`}
        action={
          <button onClick={() => exportCSV(visible)} disabled={!visible.length}
            className="flex items-center gap-2 px-3 py-2 rounded-xl border border-void/10 dark:border-whisper/10 text-xs text-void/50 dark:text-whisper/50 hover:border-void/25 dark:hover:border-whisper/25 disabled:opacity-30 transition-all cursor-pointer">
            {Icon.download} Export CSV
          </button>
        }
      />

      <div className="mb-5 max-w-xs"><SearchInput value={search} onChange={setSearch} placeholder="Search by email…" /></div>

      <div className="bg-white dark:bg-gray-950 rounded-2xl border border-void/8 dark:border-whisper/8 overflow-hidden">
        {state === 'loading' && <div className="p-5"><LoadingState /></div>}
        {state === 'error'   && <ErrorState onRetry={load} />}
        {state === 'success' && visible.length === 0 && <EmptyState icon="mail" title="No subscribers" description="Email subscribers will appear here." />}

        {state === 'success' && visible.length > 0 && (
          <DataTable headers={['Email','Status','Source','Date']}>
            {visible.map((s, i) => (
              <motion.tr key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}
                className="hover:bg-void/2 dark:hover:bg-whisper/2 transition-colors">
                <td className="px-5 py-3.5 text-sm font-mono text-void/70 dark:text-whisper/70">{s.email}</td>
                <td className="px-5 py-3.5"><StatusBadge status={String(s.confirmed)} /></td>
                <td className="px-5 py-3.5 text-xs text-void/40 dark:text-whisper/40">{s.source}</td>
                <td className="px-5 py-3.5 text-xs text-void/40 dark:text-whisper/40">{formatDate(s.created_at)}</td>
              </motion.tr>
            ))}
          </DataTable>
        )}
      </div>
    </div>
  )
}
