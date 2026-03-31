import type { Metadata } from 'next'
import Link from 'next/link'
import FloatingNav from '@/components/layout/FloatingNav'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: '404 — Page not found',
  robots: { index: false },
}

const QUICK_LINKS = [
  { label: 'Homepage',      href: '/' },
  { label: 'Services',      href: '/services' },
  { label: 'Products',      href: '/products' },
  { label: 'AI Agents',     href: '/ai-agents' },
  { label: 'Blog',          href: '/blog' },
  { label: 'About',         href: '/about' },
  { label: 'Contact',       href: '/#contact' },
]

export default function NotFound() {
  return (
    <main className="min-h-screen">
      <FloatingNav />

      <div className="min-h-screen flex items-center justify-center px-6">

        {/* Background ambient */}
        <div
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(192,57,43,0.05) 0%, transparent 70%)',
          }}
        />

        <div className="relative max-w-2xl mx-auto text-center">

          {/* 404 number — large decorative */}
          <div className="relative mb-6">
            <span
              className="
                font-display font-bold
                text-[clamp(8rem,20vw,14rem)]
                leading-none
                text-void/5 dark:text-whisper/5
                select-none
                block
              "
            >
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="
                w-16 h-16 rounded-full
                border border-crimson/30
                bg-crimson/5
                flex items-center justify-center
              ">
                <svg
                  width="28" height="28" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor"
                  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                  className="text-crimson/60"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
            </div>
          </div>

          {/* Copy */}
          <h1 className="font-display font-bold text-3xl text-void dark:text-whisper mb-3">
            Page not found
          </h1>
          <p className="text-void/50 dark:text-whisper/50 mb-10 max-w-sm mx-auto">
            The page you&apos;re looking for doesn&apos;t exist — it may have moved or been removed.
          </p>

          {/* Primary action */}
          <Link
            href="/"
            className="
              inline-flex items-center gap-2
              px-7 py-3.5 rounded-full text-sm font-medium
              bg-crimson text-whisper
              hover:bg-crimson-400
              transition-colors duration-200
              shadow-[0_0_24px_rgba(192,57,43,0.25)]
              mb-12
            "
          >
            Back to homepage
          </Link>

          {/* Quick links */}
          <div className="border-t border-void/8 dark:border-whisper/8 pt-10">
            <p className="text-xs font-medium tracking-[0.14em] uppercase text-void/30 dark:text-whisper/30 mb-6">
              Or go to
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {QUICK_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="
                    px-4 py-2 rounded-full text-sm
                    border border-void/10 dark:border-whisper/10
                    text-void/50 dark:text-whisper/50
                    hover:border-crimson/40 hover:text-crimson
                    transition-colors duration-150
                  "
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
