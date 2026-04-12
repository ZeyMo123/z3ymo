'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

// ─── SVG Icons ────────────────────────────────────────────────

export const Icon = {
  spinner:     <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>,
  alert:       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  refresh:     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>,
  inbox:       <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/></svg>,
  search:      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  plus:        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  edit:        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  trash:       <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>,
  eye:         <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  check:       <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>,
  x:           <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  chevronUp:   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="18 15 12 9 6 15"/></svg>,
  chevronDown: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>,
  calendar:    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  user:        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  mail:        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  phone:       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.71 19.79 19.79 0 01.22 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.72-.72a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.89z"/></svg>,
  filter:      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  download:    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  article:     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  whatsapp:    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>,
  trending:    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  layers:      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
} as const

export type IconKey = keyof typeof Icon

// ─── LoadingState ─────────────────────────────────────────────

export function LoadingState({ message = 'Loading…', rows = 5 }: { message?: string; rows?: number }) {
  return (
    <div className="animate-pulse">
      {/* Skeleton rows */}
      <div className="space-y-3 p-1">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="h-9 w-9 rounded-xl bg-void/6 dark:bg-whisper/6 shrink-0" />
            <div className="flex-1 space-y-1.5">
              <div className="h-3 rounded-full bg-void/6 dark:bg-whisper/6"
                style={{ width: `${70 - (i % 3) * 10}%` }} />
              <div className="h-2.5 rounded-full bg-void/4 dark:bg-whisper/4"
                style={{ width: `${50 - (i % 3) * 8}%` }} />
            </div>
            <div className="h-6 w-16 rounded-full bg-void/4 dark:bg-whisper/4" />
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-void/30 dark:text-whisper/30 mt-6">{message}</p>
    </div>
  )
}

// ─── ErrorState ───────────────────────────────────────────────

export function ErrorState({
  title   = 'Failed to load',
  message = 'Something went wrong. Please try again.',
  onRetry,
}: {
  title?:   string
  message?: string
  onRetry?: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 gap-4 text-center"
    >
      <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-950/20 flex items-center justify-center text-red-500">
        {Icon.alert}
      </div>
      <div>
        <p className="font-semibold text-void dark:text-whisper mb-1">{title}</p>
        <p className="text-sm text-void/50 dark:text-whisper/50 max-w-xs">{message}</p>
      </div>
      {onRetry && (
        <button onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-void/6 dark:bg-whisper/6 text-sm text-void/70 dark:text-whisper/70 hover:bg-void/10 dark:hover:bg-whisper/10 transition-colors cursor-pointer">
          {Icon.refresh} Try again
        </button>
      )}
    </motion.div>
  )
}

// ─── EmptyState ───────────────────────────────────────────────

export function EmptyState({
  title,
  description,
  action,
  icon = 'inbox',
}: {
  title:        string
  description:  string
  action?:      { label: string; onClick: () => void }
  icon?:        IconKey
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 gap-3 text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-void/5 dark:bg-whisper/5 flex items-center justify-center text-void/25 dark:text-whisper/25">
        <span className="scale-150">{Icon[icon]}</span>
      </div>
      <p className="font-semibold text-void dark:text-whisper">{title}</p>
      <p className="text-sm text-void/50 dark:text-whisper/50 max-w-xs leading-relaxed">{description}</p>
      {action && (
        <button onClick={action.onClick}
          className="mt-2 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-crimson text-white text-sm font-medium hover:bg-crimson/90 transition-colors cursor-pointer">
          {Icon.plus} {action.label}
        </button>
      )}
    </motion.div>
  )
}

// ─── StatsCard ────────────────────────────────────────────────

export function StatsCard({
  label, value, sub, icon, accent = '#C0392B', loading,
}: {
  label:    string
  value:    string | number
  sub?:     string
  icon:     React.ReactNode
  accent?:  string
  loading?: boolean
}) {
  return (
    <div className="bg-white dark:bg-void-900 rounded-2xl border border-void/8 dark:border-whisper/8 p-5">
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-medium text-void/40 dark:text-whisper/40 uppercase tracking-wider">{label}</p>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: `${accent}12`, color: accent }}>
          {icon}
        </div>
      </div>
      {loading
        ? <div className="h-8 w-20 rounded-lg bg-void/6 dark:bg-whisper/6 animate-pulse" />
        : (
          <div className="flex items-baseline gap-2">
            <span className="font-display font-bold text-2xl text-void dark:text-whisper">{value}</span>
            {sub && <span className="text-xs text-void/40 dark:text-whisper/40">{sub}</span>}
          </div>
        )
      }
    </div>
  )
}

// ─── StatusBadge ──────────────────────────────────────────────

const STATUS_MAP: Record<string, { bg: string; text: string; label: string }> = {
  published:  { bg: 'bg-emerald-50 dark:bg-emerald-950/20', text: 'text-emerald-600 dark:text-emerald-400', label: 'Published' },
  draft:      { bg: 'bg-amber-50 dark:bg-amber-950/20',    text: 'text-amber-600 dark:text-amber-400',    label: 'Draft' },
  archived:   { bg: 'bg-void/6 dark:bg-whisper/6',          text: 'text-void/50 dark:text-whisper/50',     label: 'Archived' },
  confirmed:  { bg: 'bg-emerald-50 dark:bg-emerald-950/20', text: 'text-emerald-600 dark:text-emerald-400', label: 'Confirmed' },
  cancelled:  { bg: 'bg-red-50 dark:bg-red-950/20',         text: 'text-red-600 dark:text-red-400',        label: 'Cancelled' },
  completed:  { bg: 'bg-blue-50 dark:bg-blue-950/20',       text: 'text-blue-600 dark:text-blue-400',      label: 'Completed' },
  pulse:      { bg: 'bg-crimson/8',                          text: 'text-crimson',                          label: 'Pulse' },
  ebox:       { bg: 'bg-emerald/8',                          text: 'text-emerald',                          label: 'EBox' },
  novel:      { bg: 'bg-gold/8',                             text: 'text-gold',                             label: 'Novel' },
  salons:     { bg: 'bg-purple-50 dark:bg-purple-950/20',   text: 'text-purple-600 dark:text-purple-400',  label: 'Salons' },
  true:       { bg: 'bg-emerald-50 dark:bg-emerald-950/20', text: 'text-emerald-600 dark:text-emerald-400', label: 'Active' },
  false:      { bg: 'bg-void/6 dark:bg-whisper/6',          text: 'text-void/50 dark:text-whisper/50',     label: 'Unconfirmed' },
}

export function StatusBadge({ status }: { status: string }) {
  const s = STATUS_MAP[status] ?? STATUS_MAP['draft']
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold ${s.bg} ${s.text}`}>
      {s.label}
    </span>
  )
}

// ─── PageHeader ───────────────────────────────────────────────

export function PageHeader({
  title, subtitle, action, breadcrumb,
}: {
  title:       string
  subtitle?:   string
  action?:     React.ReactNode
  breadcrumb?: string
}) {
  return (
    <div className="flex items-start justify-between mb-7">
      <div>
        {breadcrumb && (
          <p className="text-xs text-void/35 dark:text-whisper/35 mb-1 font-medium">{breadcrumb}</p>
        )}
        <h1 className="font-display font-bold text-2xl text-void dark:text-whisper">{title}</h1>
        {subtitle && <p className="text-sm text-void/45 dark:text-whisper/45 mt-1">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

// ─── SearchInput ──────────────────────────────────────────────

export function SearchInput({
  value, onChange, placeholder = 'Search…',
}: {
  value:       string
  onChange:    (v: string) => void
  placeholder?: string
}) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-void/35 dark:text-whisper/35">
        {Icon.search}
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-void/10 dark:border-whisper/10 bg-white dark:bg-void-900 text-void dark:text-whisper placeholder:text-void/30 dark:placeholder:text-whisper/30 focus:outline-none focus:border-crimson/40 focus:ring-2 focus:ring-crimson/8 transition-all"
      />
    </div>
  )
}

// ─── FilterChip ───────────────────────────────────────────────

export function FilterChip({
  label, active, onClick,
}: {
  label:   string
  active:  boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer border',
        active
          ? 'bg-void dark:bg-whisper text-whisper dark:text-void border-transparent'
          : 'border-void/10 dark:border-whisper/10 text-void/55 dark:text-whisper/55 hover:border-void/25 dark:hover:border-whisper/25',
      ].join(' ')}
    >
      {label}
    </button>
  )
}

// ─── ConfirmDialog ────────────────────────────────────────────

export function ConfirmDialog({
  open, title, message, confirmLabel = 'Delete', onConfirm, onCancel, danger = true,
}: {
  open:          boolean
  title:         string
  message:       string
  confirmLabel?: string
  onConfirm:     () => void
  onCancel:      () => void
  danger?:       boolean
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-void/40 backdrop-blur-sm" onClick={onCancel} />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="relative bg-white dark:bg-void-900 rounded-2xl border border-void/10 dark:border-whisper/10 p-6 max-w-sm w-full shadow-2xl"
          >
            <h3 className="font-display font-bold text-void dark:text-whisper mb-2">{title}</h3>
            <p className="text-sm text-void/55 dark:text-whisper/55 mb-6 leading-relaxed">{message}</p>
            <div className="flex gap-3">
              <button onClick={onCancel}
                className="flex-1 py-2.5 rounded-xl border border-void/10 dark:border-whisper/10 text-sm text-void/60 dark:text-whisper/60 hover:border-void/25 dark:hover:border-whisper/25 transition-all cursor-pointer">
                Cancel
              </button>
              <button onClick={onConfirm}
                className={[
                  'flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all cursor-pointer',
                  danger ? 'bg-red-600 hover:bg-red-700' : 'bg-crimson hover:bg-crimson/90',
                ].join(' ')}>
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Table wrapper ────────────────────────────────────────────

export function DataTable({
  headers, children, className = '',
}: {
  headers:    string[]
  children:   React.ReactNode
  className?: string
}) {
  return (
    <div className={`overflow-x-auto rounded-2xl border border-void/8 dark:border-whisper/8 ${className}`}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-void/6 dark:border-whisper/6 bg-void/2 dark:bg-whisper/2">
            {headers.map((h) => (
              <th key={h} className="text-left px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-void/35 dark:text-whisper/35">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-void/5 dark:divide-whisper/5">
          {children}
        </tbody>
      </table>
    </div>
  )
}
