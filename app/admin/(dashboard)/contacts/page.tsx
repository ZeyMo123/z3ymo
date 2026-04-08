'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { getContacts } from '@/lib/admin/actions'
import type { Contact } from '@/lib/admin/actions'
import { PageHeader, ErrorState, EmptyState, LoadingState, SearchInput, Icon } from '@/components/admin/ui'

function formatDate(iso: string) { return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [state,    setState]    = useState<'loading'|'success'|'error'>('loading')
  const [search,   setSearch]   = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)

  const load = useCallback(async () => {
    setState('loading')
    const res = await getContacts()
    if (res.ok) { setContacts(res.data); setState('success') }
    else setState('error')
  }, [])

  useEffect(() => { load() }, [load])

  const visible = contacts.filter(c => !search || (c.name ?? '').toLowerCase().includes(search.toLowerCase()) || (c.email ?? '').toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="max-w-3xl">
      <PageHeader title="Contact messages" subtitle={`${contacts.length} total messages`}
        action={<button onClick={load} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-void/10 dark:border-whisper/10 text-xs text-void/50 dark:text-whisper/50 hover:border-void/25 dark:hover:border-whisper/25 transition-all cursor-pointer">{Icon.refresh} Refresh</button>}
      />

      <div className="mb-5 max-w-xs"><SearchInput value={search} onChange={setSearch} placeholder="Search contacts…" /></div>

      <div className="bg-white dark:bg-gray-950 rounded-2xl border border-void/8 dark:border-whisper/8 overflow-hidden">
        {state === 'loading' && <div className="p-5"><LoadingState /></div>}
        {state === 'error'   && <ErrorState onRetry={load} />}
        {state === 'success' && visible.length === 0 && <EmptyState icon="inbox" title="No messages" description="Contact form submissions will appear here." />}

        {state === 'success' && visible.length > 0 && (
          <div className="divide-y divide-void/5 dark:divide-whisper/5">
            {visible.map((c, i) => (
              <motion.div key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}>
                <div className="flex items-center gap-3 px-5 py-4 hover:bg-void/2 dark:hover:bg-whisper/2 transition-colors cursor-pointer" onClick={() => setExpanded(expanded === c.id ? null : c.id)}>
                  <div className="w-9 h-9 rounded-xl bg-void/5 dark:bg-whisper/5 flex items-center justify-center text-void/35 dark:text-whisper/35 flex-shrink-0">{Icon.user}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-void dark:text-whisper">{c.name ?? 'Anonymous'}</div>
                    <div className="text-xs text-void/40 dark:text-whisper/40">{c.email} · {formatDate(c.created_at)}</div>
                  </div>
                  {c.context && <span className="text-[10px] px-2 py-0.5 rounded-md bg-crimson/8 text-crimson hidden sm:block">{c.context}</span>}
                  <span className="text-void/20 dark:text-whisper/20">{expanded === c.id ? Icon.chevronUp : Icon.chevronDown}</span>
                </div>
                {expanded === c.id && (
                  <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} className="overflow-hidden">
                    <div className="px-5 pb-5 border-t border-void/5 dark:border-whisper/5 pt-3 space-y-3">
                      <p className="text-sm text-void/65 dark:text-whisper/65 leading-relaxed">{c.message}</p>
                      {c.email && (
                        <a href={`mailto:${c.email}`} className="inline-flex items-center gap-2 text-xs text-crimson hover:underline">{Icon.mail} Reply to {c.email}</a>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
