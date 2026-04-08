'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Nav structure ────────────────────────────────────────────

const NAV_SECTIONS = [
  {
    label: 'Overview',
    items: [
      {
        label: 'Dashboard',
        href:  '/admin',
        exact: true,
        icon:  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
      },
      {
        label: 'Analytics',
        href:  '/admin/analytics',
        icon:  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
      },
    ],
  },
  {
    label: 'Content',
    items: [
      {
        label: 'Blog posts',
        href:  '/admin/blog',
        icon:  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
      },
      {
        label: 'Guides',
        href:  '/admin/content/guides',
        icon:  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>,
      },
      {
        label: 'Case studies',
        href:  '/admin/content/case-studies',
        icon:  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
      },
      {
        label: 'Documentation',
        href:  '/admin/content/docs',
        icon:  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>,
      },
    ],
  },
  {
    label: 'Customers',
    items: [
      {
        label: 'Bookings',
        href:  '/admin/bookings',
        icon:  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
      },
      {
        label: 'Waitlist',
        href:  '/admin/waitlist',
        icon:  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
      },
      {
        label: 'Subscribers',
        href:  '/admin/subscribers',
        icon:  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
      },
      {
        label: 'Contacts',
        href:  '/admin/contacts',
        icon:  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
      },
    ],
  },
]

// ─── Nav link ─────────────────────────────────────────────────

function NavItem({
  item, onClick,
}: {
  item:    { label: string; href: string; exact?: boolean; icon: React.ReactNode }
  onClick?: () => void
}) {
  const pathname = usePathname()
  const active   = item.exact ? pathname === item.href : pathname.startsWith(item.href)

  return (
    <Link href={item.href} onClick={onClick}
      className={[
        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-100 relative',
        active
          ? 'bg-crimson/8 text-crimson'
          : 'text-void/55 dark:text-whisper/55 hover:bg-void/5 dark:hover:bg-whisper/5 hover:text-void dark:hover:text-whisper',
      ].join(' ')}
    >
      <span className="flex-shrink-0">{item.icon}</span>
      <span className="flex-1">{item.label}</span>
      {active && (
        <motion.div layoutId="admin-nav-indicator"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full bg-crimson"
          transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
      )}
    </Link>
  )
}

// ─── Sidebar ──────────────────────────────────────────────────

function Sidebar({ onNavClick }: { onNavClick?: () => void }) {
  const router = useRouter()

  function handleSignOut() {
    document.cookie = 'z3ymo_admin=; max-age=0; path=/admin'
    router.push('/admin/login')
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-950">
      {/* Logo */}
      <div className="h-14 flex items-center gap-3 px-5 border-b border-void/6 dark:border-whisper/6 flex-shrink-0">
        <div className="w-7 h-7 rounded-lg bg-crimson flex items-center justify-center flex-shrink-0">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="white" stroke="none">
            <rect x="2" y="3" width="8" height="8" rx="1"/><rect x="14" y="3" width="8" height="8" rx="1"/>
            <rect x="14" y="14" width="8" height="8" rx="1"/><rect x="2" y="14" width="8" height="8" rx="1"/>
          </svg>
        </div>
        <div>
          <span className="font-display font-bold text-sm text-void dark:text-whisper">Z3ymo</span>
          <span className="text-[10px] text-void/35 dark:text-whisper/35 ml-1.5 font-medium">Admin</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-5">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-void/30 dark:text-whisper/30 px-3 mb-1.5">
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <NavItem key={item.href} item={item} onClick={onNavClick} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-void/6 dark:border-whisper/6 flex-shrink-0">
        <a href="/" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-void/50 dark:text-whisper/50 hover:bg-void/5 dark:hover:bg-whisper/5 hover:text-void dark:hover:text-whisper transition-colors mb-0.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          View website
        </a>
        <button onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-void/45 dark:text-whisper/45 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Sign out
        </button>
      </div>
    </div>
  )
}

// ─── Layout ───────────────────────────────────────────────────

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  // Close sidebar on route change
  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={[
        'fixed top-0 left-0 bottom-0 z-40 w-56 border-r border-void/8 dark:border-whisper/8',
        'transition-transform duration-200 ease-out',
        mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      ].join(' ')}>
        <Sidebar onNavClick={() => setMobileOpen(false)} />
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col lg:ml-56 min-h-0">

        {/* Top bar */}
        <header className="h-14 flex items-center gap-4 px-5 bg-white dark:bg-gray-950 border-b border-void/6 dark:border-whisper/6 flex-shrink-0">
          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-void/5 dark:hover:bg-whisper/5 text-void/50 dark:text-whisper/50 transition-colors cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>

          {/* Breadcrumb */}
          <div className="flex-1 flex items-center gap-1.5 text-xs text-void/40 dark:text-whisper/40">
            <span>z3ymo.com</span>
            <span>/</span>
            <span className="text-void/70 dark:text-whisper/70 font-medium capitalize">
              {pathname.split('/').filter(Boolean).slice(1).join(' / ') || 'Dashboard'}
            </span>
          </div>

          {/* Quick actions */}
          <div className="flex items-center gap-2">
            <Link href="/admin/blog/new"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-crimson text-white text-xs font-semibold hover:bg-crimson/90 transition-colors">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              New post
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-5 sm:p-6">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}
