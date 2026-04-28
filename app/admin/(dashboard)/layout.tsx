'use client'

// ─────────────────────────────────────────────────────────────────
// app/admin/(dashboard)/layout.tsx
//
// Dashboard shell: sticky sidebar + main content area.
// All content section links use the new dedicated routes:
//   /admin/content/guides        (NOT /admin/content/new?type=guide)
//   /admin/content/case-studies  (NOT /admin/content/new?type=case-study)
//   /admin/content/docs          (NOT /admin/content/new?type=doc)
// ─────────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react'
import Link                    from 'next/link'
import { usePathname }         from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Nav structure ────────────────────────────────────────────────

type NavItem = {
  label:   string
  href:    string
  icon:    React.ReactNode
  badge?:  string
}

type NavGroup = {
  title: string
  items: NavItem[]
}

function Icon({ d, size = 16 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  )
}

const NAV_GROUPS: NavGroup[] = [
  {
    title: 'Overview',
    items: [
      {
        label: 'Dashboard',
        href:  '/admin',
        icon:  <Icon d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />,
      },
      {
        label: 'Analytics',
        href:  '/admin/analytics',
        icon:  <Icon d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
      },
    ],
  },
  {
    title: 'Content',
    items: [
      {
        label: 'Blog Posts',
        href:  '/admin/blog',
        icon:  <Icon d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />,
      },
      {
        label: 'Guides',
        href:  '/admin/content/guides',
        icon:  <Icon d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />,
      },
      {
        label: 'Case Studies',
        href:  '/admin/content/case-studies',
        icon:  <Icon d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
      },
      {
        label: 'Documentation',
        href:  '/admin/content/docs',
        icon:  <Icon d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />,
      },
    ],
  },
  {
    title: 'Operations',
    items: [
      {
        label: 'Bookings',
        href:  '/admin/bookings',
        icon:  <Icon d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
      },
      {
        label: 'Contacts',
        href:  '/admin/contacts',
        icon:  <Icon d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
      },
      {
        label: 'Subscribers',
        href:  '/admin/subscribers',
        icon:  <Icon d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />,
      },
      {
        label: 'Waitlist',
        href:  '/admin/waitlist',
        icon:  <Icon d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
      },
    ],
  },
]

// ─── Sidebar link ─────────────────────────────────────────────────

function SideLink({ item, collapsed }: { item: NavItem; collapsed: boolean }) {
  const pathname = usePathname()

  // Active when pathname exactly matches OR is a sub-route
  const isActive = pathname === item.href ||
    (item.href !== '/admin' && pathname.startsWith(item.href + '/')) ||
    (item.href !== '/admin' && pathname === item.href)

  return (
    <Link
      href={item.href}
      title={collapsed ? item.label : undefined}
      className={[
        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group relative',
        isActive
          ? 'bg-crimson/8 text-crimson'
          : 'text-void/55 dark:text-whisper/55 hover:bg-void/5 dark:hover:bg-whisper/5 hover:text-void dark:hover:text-whisper',
      ].join(' ')}
    >
      {/* Active indicator bar */}
      {isActive && (
        <motion.div
          layoutId="sidebar-active"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-crimson rounded-full"
          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        />
      )}

      <span className={`flex-shrink-0 ${isActive ? 'text-crimson' : ''}`}>
        {item.icon}
      </span>

      {!collapsed && (
        <span className="truncate">{item.label}</span>
      )}

      {!collapsed && item.badge && (
        <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald/10 text-emerald">
          {item.badge}
        </span>
      )}
    </Link>
  )
}

// ─── Sidebar ──────────────────────────────────────────────────────

function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  return (
    <aside
      className={[
        'hidden lg:flex flex-col h-screen sticky top-0 border-r border-void/8 dark:border-whisper/8',
        'bg-whisper/60 dark:bg-void/60 backdrop-blur-xl transition-all duration-300 flex-shrink-0',
        collapsed ? 'w-[68px]' : 'w-[220px]',
      ].join(' ')}
    >
      {/* Logo row */}
      <div className="h-16 flex items-center justify-between px-3 border-b border-void/8 dark:border-whisper/8 flex-shrink-0">
        {!collapsed && (
          <Link href="/admin"
            className="font-display font-bold text-lg text-void dark:text-whisper hover:text-crimson transition-colors truncate">
            Z3ymo
          </Link>
        )}
        <button
          onClick={onToggle}
          className={[
            'w-8 h-8 flex items-center justify-center rounded-xl',
            'text-void/40 dark:text-whisper/40 hover:text-void dark:hover:text-whisper',
            'hover:bg-void/8 dark:hover:bg-whisper/8 transition-colors cursor-pointer flex-shrink-0',
            collapsed ? 'mx-auto' : '',
          ].join(' ')}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {collapsed
              ? <path d="M9 18l6-6-6-6" />
              : <path d="M15 18l-6-6 6-6" />
            }
          </svg>
        </button>
      </div>

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-6">
        {NAV_GROUPS.map(group => (
          <div key={group.title}>
            {!collapsed && (
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-void/25 dark:text-whisper/25 px-3 mb-1.5">
                {group.title}
              </p>
            )}
            <div className="space-y-0.5">
              {group.items.map(item => (
                <SideLink key={item.href} item={item} collapsed={collapsed} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-2 py-3 border-t border-void/8 dark:border-whisper/8 flex-shrink-0">
        <Link
          href="/"
          title={collapsed ? 'View site' : undefined}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-void/40 dark:text-whisper/40 hover:text-void dark:hover:text-whisper hover:bg-void/5 dark:hover:bg-whisper/5 transition-all"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
            <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          {!collapsed && <span>View site</span>}
        </Link>
      </div>
    </aside>
  )
}

// ─── Mobile top bar ────────────────────────────────────────────────

function MobileTopBar({ onOpen }: { onOpen: () => void }) {
  const pathname = usePathname()
  const allItems = NAV_GROUPS.flatMap(g => g.items)
  const current  = allItems.find(i =>
    pathname === i.href || (i.href !== '/admin' && pathname.startsWith(i.href))
  )

  return (
    <div className="lg:hidden sticky top-0 z-30 h-14 flex items-center justify-between px-4
      bg-whisper/95 dark:bg-void/95 backdrop-blur-xl
      border-b border-void/8 dark:border-whisper/8">
      <Link href="/admin"
        className="font-display font-bold text-lg text-void dark:text-whisper hover:text-crimson transition-colors">
        Z3ymo Admin
      </Link>

      <div className="flex items-center gap-2">
        {current && (
          <span className="text-sm text-void/50 dark:text-whisper/50 hidden sm:block">
            {current.label}
          </span>
        )}
        <button onClick={onOpen}
          className="w-9 h-9 flex items-center justify-center rounded-xl
            text-void/55 dark:text-whisper/55 hover:bg-void/8 dark:hover:bg-whisper/8
            transition-colors cursor-pointer">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6"  x2="21" y2="6"  />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  )
}

// ─── Mobile drawer ────────────────────────────────────────────────

function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname()

  // Close drawer on route change
  useEffect(() => { onClose() }, [pathname])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-void/30 dark:bg-void/50 backdrop-blur-sm lg:hidden"
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 340, damping: 34, mass: 0.9 }}
            className="fixed top-0 left-0 bottom-0 z-50 w-72 lg:hidden flex flex-col
              bg-whisper dark:bg-void shadow-2xl"
          >
            {/* Header */}
            <div className="h-14 flex items-center justify-between px-4
              border-b border-void/8 dark:border-whisper/8 flex-shrink-0">
              <Link href="/admin" onClick={onClose}
                className="font-display font-bold text-lg text-void dark:text-whisper">
                Z3ymo Admin
              </Link>
              <button onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-xl
                  text-void/40 hover:text-void dark:hover:text-whisper
                  hover:bg-void/8 dark:hover:bg-whisper/8 transition-colors cursor-pointer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6"  x2="6"  y2="18" />
                  <line x1="6"  y1="6"  x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-6">
              {NAV_GROUPS.map(group => (
                <div key={group.title}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-void/25 dark:text-whisper/25 px-3 mb-1.5">
                    {group.title}
                  </p>
                  <div className="space-y-0.5">
                    {group.items.map(item => (
                      <SideLink key={item.href} item={item} collapsed={false} />
                    ))}
                  </div>
                </div>
              ))}
            </nav>

            {/* Footer */}
            <div className="px-2 py-3 border-t border-void/8 dark:border-whisper/8 flex-shrink-0">
              <Link href="/" onClick={onClose}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm
                  text-void/40 dark:text-whisper/40 hover:text-void dark:hover:text-whisper
                  hover:bg-void/5 dark:hover:bg-whisper/5 transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                  <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View site
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ─── Layout ───────────────────────────────────────────────────────

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed,    setCollapsed]    = useState(false)
  const [mobileOpen,   setMobileOpen]   = useState(false)

  return (
    <div className="min-h-screen bg-whisper dark:bg-void flex">
      {/* Desktop sidebar */}
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />

      {/* Mobile drawer */}
      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        <MobileTopBar onOpen={() => setMobileOpen(true)} />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}
