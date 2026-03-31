'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function usePWA() {
  const [isInstallable, setIsInstallable] = useState(false)
  const [isOffline, setIsOffline]         = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => console.log('[SW] Registered:', reg.scope))
        .catch((err) => console.error('[SW] Registration failed:', err))
    }

    // Install prompt
    const onBeforeInstall = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsInstallable(true)
    }
    window.addEventListener('beforeinstallprompt', onBeforeInstall)

    // Online/offline
    const onOffline = () => setIsOffline(true)
    const onOnline  = () => setIsOffline(false)
    window.addEventListener('offline', onOffline)
    window.addEventListener('online',  onOnline)
    setIsOffline(!navigator.onLine)

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall)
      window.removeEventListener('offline', onOffline)
      window.removeEventListener('online',  onOnline)
    }
  }, [])

  const install = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setIsInstallable(false)
      setDeferredPrompt(null)
    }
  }

  return { isInstallable, isOffline, install }
}

// ─── Offline banner component ──────────────────
export function OfflineBanner() {
  const { isOffline } = usePWA()

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ y: -48, opacity: 0 }}
          animate={{ y: 0,   opacity: 1 }}
          exit={{   y: -48, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="
            fixed top-0 left-0 right-0 z-50
            bg-gold/90 backdrop-blur-sm
            text-void text-center text-xs font-medium py-2 px-4
          "
        >
          You&apos;re offline — some content may be unavailable
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Install app button component ─────────────
export function InstallAppButton() {
  const { isInstallable, install } = usePWA()

  return (
    <AnimatePresence>
      {isInstallable && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{   opacity: 0, scale: 0.9 }}
          onClick={install}
          className="
            fixed bottom-6 right-6 z-40
            flex items-center gap-2
            px-4 py-3 rounded-2xl
            bg-void dark:bg-whisper
            text-whisper dark:text-void
            text-sm font-medium
            shadow-xl shadow-void/20
            border border-void/10 dark:border-whisper/10
            cursor-pointer
          "
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Install Z3ymo app
        </motion.button>
      )}
    </AnimatePresence>
  )
}
