'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-whisper dark:bg-void">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Icon */}
          <div className="w-16 h-16 rounded-3xl bg-void/6 dark:bg-whisper/6 flex items-center justify-center mx-auto mb-8">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
              className="text-void/40 dark:text-whisper/40">
              <line x1="1" y1="1" x2="23" y2="23" />
              <path d="M16.72 11.06A10.94 10.94 0 0119 12.55M5 12.55a10.94 10.94 0 015.17-2.39M10.71 5.05A16 16 0 0122.56 9M1.42 9a15.91 15.91 0 014.7-2.88M8.53 16.11a6 6 0 016.95 0M12 20h.01" />
            </svg>
          </div>

          <h1 className="font-display font-bold text-2xl text-void dark:text-whisper mb-3">
            You're offline
          </h1>
          <p className="text-void/50 dark:text-whisper/50 text-sm leading-relaxed mb-8">
            It looks like you've lost your internet connection. Check your connection and try again.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 rounded-full bg-crimson text-white text-sm font-semibold hover:bg-crimson/90 transition-colors cursor-pointer"
            >
              Try again
            </button>
            <Link
              href="/"
              className="px-6 py-3 rounded-full border border-void/15 dark:border-whisper/15 text-sm text-void/60 dark:text-whisper/60 hover:border-void/30 dark:hover:border-whisper/30 transition-all"
            >
              Go home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
