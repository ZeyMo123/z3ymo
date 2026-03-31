'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from '@/components/ui/ThemeToggle'
import ContactDrawer from '@/components/ui/ContactDrawer'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Services',  href: '/services' },
  { label: 'Products',  href: '/products' },
  { label: 'AI Agents', href: '/ai-agents' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blog',      href: '/blog' },
  { label: 'About',     href: '/about' },
]

export default function FloatingNav() {
  const [scrolled, setScrolled]     = useState(false)
  const [menuOpen, setMenuOpen]     = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close mobile menu on route change / ESC
  useEffect(() => {
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-40',
          'px-4 pt-4',
          'transition-all duration-300',
        )}
      >
        <nav
          className={cn(
            'max-w-6xl mx-auto rounded-2xl',
            'flex items-center justify-between',
            'px-5 py-3',
            'transition-all duration-300',
            scrolled
              ? 'bg-whisper/80 dark:bg-void-800/80 backdrop-blur-xl border border-void/8 dark:border-whisper/8 shadow-lg shadow-void/5'
              : 'bg-transparent',
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            className="
              font-display font-bold text-xl tracking-tight
              text-void dark:text-whisper
              hover:text-crimson dark:hover:text-crimson
              transition-colors duration-200
            "
          >
            Z3ymo
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="
                    px-3 py-1.5 rounded-lg text-sm
                    text-void/60 dark:text-whisper/60
                    hover:text-void dark:hover:text-whisper
                    hover:bg-void/5 dark:hover:bg-whisper/5
                    transition-colors duration-150
                  "
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right: theme + CTA */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            <button
              onClick={() => setDrawerOpen(true)}
              className="
                hidden md:inline-flex items-center
                px-5 py-2 rounded-full text-sm font-medium
                bg-crimson text-whisper
                hover:bg-crimson-400
                shadow-[0_0_20px_rgba(192,57,43,0.25)]
                hover:shadow-[0_0_32px_rgba(192,57,43,0.4)]
                transition-all duration-200
                cursor-pointer
              "
            >
              Book consultation
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="
                md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5
                rounded-xl bg-void/5 dark:bg-whisper/5
                border border-void/8 dark:border-whisper/8
                cursor-pointer
              "
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="w-4 h-0.5 bg-void dark:bg-whisper rounded-full block"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="w-4 h-0.5 bg-void dark:bg-whisper rounded-full block"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="w-4 h-0.5 bg-void dark:bg-whisper rounded-full block"
              />
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="
                md:hidden mt-2 max-w-6xl mx-auto
                rounded-2xl overflow-hidden
                bg-whisper dark:bg-void-800
                border border-void/8 dark:border-whisper/8
                backdrop-blur-xl
                shadow-xl shadow-void/10
              "
            >
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="
                      flex items-center px-6 py-3.5 text-sm
                      text-void/70 dark:text-whisper/70
                      hover:text-void dark:hover:text-whisper
                      hover:bg-void/5 dark:hover:bg-whisper/5
                      border-b border-void/5 dark:border-whisper/5
                      transition-colors duration-150
                    "
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="p-4">
                <button
                  onClick={() => { setMenuOpen(false); setDrawerOpen(true) }}
                  className="
                    w-full py-3 rounded-xl text-sm font-medium
                    bg-crimson text-whisper
                    hover:bg-crimson-400
                    transition-colors duration-150
                    cursor-pointer
                  "
                >
                  Book free consultation
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <ContactDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
