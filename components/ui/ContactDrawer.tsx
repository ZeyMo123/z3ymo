'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

interface ContactDrawerProps {
  open: boolean
  onClose: () => void
  context?: string
}

const CONTACT = {
  whatsapp: {
    number: '+255XXXXXXXXX',
    baseUrl: 'https://wa.me/',
  },
  phone:  '+255 XXX XXX XXX',
  email:  'hello@z3ymo.com',
}

export default function ContactDrawer({ open, onClose, context }: ContactDrawerProps) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const waMessage = context
    ? `Hi Z3ymo! I'm interested in ${context} and would like a free consultation.`
    : `Hi Z3ymo! I'd like to book a free consultation.`

  const waUrl = `${CONTACT.whatsapp.baseUrl}${CONTACT.whatsapp.number}?text=${encodeURIComponent(waMessage)}`

  const channels = [
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      description: 'Fastest response — chat now',
      href: waUrl,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      color: 'bg-emerald/10 text-emerald hover:bg-emerald/20 border-emerald/20',
    },
    {
      id: 'phone',
      label: 'Phone call',
      description: CONTACT.phone,
      href: `tel:${CONTACT.phone.replace(/\s/g, '')}`,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.8 10.18 19.79 19.79 0 01.73 1.56 2 2 0 012.7 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.85 7.8A16 16 0 0016.2 17.15l1.16-1.16a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
        </svg>
      ),
      color: 'bg-gold/10 text-gold hover:bg-gold/20 border-gold/20',
    },
    {
      id: 'email',
      label: 'Send email',
      description: CONTACT.email,
      href: `mailto:${CONTACT.email}?subject=Free Consultation Request`,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      color: 'bg-crimson/10 text-crimson hover:bg-crimson/20 border-crimson/20',
    },
  ]

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-void/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="
              fixed bottom-0 left-0 right-0 z-50
              bg-whisper dark:bg-surface
              rounded-t-3xl p-6 pb-10
              border-t border-void/8 dark:border-whisper/8
              max-w-lg mx-auto
            "
          >
            {/* Handle */}
            <div className="w-10 h-1 rounded-full bg-void/20 dark:bg-whisper/20 mx-auto mb-6" />

            {/* Header */}
            <div className="mb-6">
              <h3 className="font-display text-xl font-semibold text-void dark:text-whisper mb-1">
                Get in touch
              </h3>
              <p className="text-sm text-void/50 dark:text-whisper/50">
                We reply within a few hours. Free consultation — no commitment.
              </p>
            </div>

            {/* Channels */}
            <div className="flex flex-col gap-3">
              {channels.map((ch, i) => (
                <motion.a
                  key={ch.id}
                  href={ch.href}
                  target={ch.id === 'whatsapp' ? '_blank' : undefined}
                  rel={ch.id === 'whatsapp' ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className={`
                    flex items-center gap-4 p-4 rounded-2xl
                    border transition-colors duration-150
                    ${ch.color}
                  `}
                >
                  <div className="flex-shrink-0">{ch.icon}</div>
                  <div>
                    <div className="font-medium text-sm">{ch.label}</div>
                    <div className="text-xs opacity-70 mt-0.5">{ch.description}</div>
                  </div>
                  <svg
                    width="16" height="16" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"
                    className="ml-auto opacity-50"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </motion.a>
              ))}
            </div>

            {/* Footer note */}
            <p className="text-center text-xs text-void/30 dark:text-whisper/30 mt-5">
              Based in Dar es Salaam, Tanzania · Available worldwide
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
