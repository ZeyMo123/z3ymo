import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Offline — Z3ymo',
  robots: { index: false },
}

export default function OfflinePage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md text-center">

        {/* Icon */}
        <div className="
          w-20 h-20 rounded-full mx-auto mb-8
          bg-void/5 dark:bg-whisper/5
          border border-void/10 dark:border-whisper/10
          flex items-center justify-center
        ">
          <svg
            width="32" height="32" viewBox="0 0 24 24"
            fill="none" stroke="currentColor"
            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            className="text-void/30 dark:text-whisper/30"
          >
            <line x1="1" y1="1" x2="23" y2="23" />
            <path d="M16.72 11.06A10.94 10.94 0 0119 12.55M5 12.55a10.94 10.94 0 015.17-2.39M10.71 5.05A16 16 0 0122.56 9M1.42 9a15.91 15.91 0 014.7-2.88M8.53 16.11a6 6 0 016.95 0M12 20h.01" />
          </svg>
        </div>

        {/* Logo */}
        <p className="font-display font-bold text-3xl text-void dark:text-whisper mb-2">
          Z3ymo
        </p>

        <h1 className="font-display font-semibold text-xl text-void/80 dark:text-whisper/80 mb-3">
          You&apos;re offline
        </h1>
        <p className="text-void/50 dark:text-whisper/50 text-sm leading-relaxed mb-8">
          It looks like your internet connection is unavailable.
          Check your connection and try again — we&apos;ll be here when you&apos;re back.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="
              px-6 py-3 rounded-full text-sm font-medium
              bg-crimson text-whisper
              hover:bg-crimson-400
              transition-colors duration-150
              cursor-pointer
            "
          >
            Try again
          </button>
          <Link
            href="/"
            className="
              px-6 py-3 rounded-full text-sm font-medium
              border border-void/12 dark:border-whisper/12
              text-void/60 dark:text-whisper/60
              hover:border-void/25 dark:hover:border-whisper/25
              transition-colors duration-150
            "
          >
            Go home
          </Link>
        </div>

        {/* Contact options */}
        <div className="mt-10 pt-8 border-t border-void/8 dark:border-whisper/8">
          <p className="text-xs text-void/35 dark:text-whisper/35 mb-4">
            Need to reach us? You can also contact us via:
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://wa.me/+255XXXXXXXXX"
              className="text-xs text-emerald hover:underline"
            >
              WhatsApp
            </a>
            <a
              href="mailto:hello@z3ymo.com"
              className="text-xs text-void/40 dark:text-whisper/40 hover:text-void dark:hover:text-whisper transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
