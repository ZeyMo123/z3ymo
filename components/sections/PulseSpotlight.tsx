'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '@/components/ui/ScrollReveal'
import MagneticButton from '@/components/ui/MagneticButton'

const FEATURES = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
    title: 'Customer support',
    desc: '24/7 automated — in English & Swahili',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8"  y1="2" x2="8"  y2="6" />
        <line x1="3"  y1="10" x2="21" y2="10" />
      </svg>
    ),
    title: 'Booking & scheduling',
    desc: 'Auto-books appointments, sends reminders',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6"  y1="20" x2="6"  y2="14" />
      </svg>
    ),
    title: 'Sales analytics',
    desc: 'Weekly reports on customer behaviour',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    title: 'Lead capture',
    desc: 'Qualifies prospects, follows up automatically',
  },
]

const CHAT_MESSAGES = [
  { id: 1, from: 'user',  text: 'Hi! I need to book a haircut', delay: 0 },
  { id: 2, from: 'pulse', text: 'Hi! 👋 I\'m Pulse. When would you like to come in?', delay: 1400 },
  { id: 3, from: 'user',  text: 'Tomorrow at 2pm', delay: 2800 },
  { id: 4, from: 'pulse', text: 'Perfect! Booked for tomorrow at 2:00 PM ✅\nYou\'ll get a reminder an hour before.', delay: 4200 },
  { id: 5, from: 'user',  text: 'Amazing, thanks!', delay: 5600 },
]

function PhoneMockup() {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([])
  const [showTyping, setShowTyping] = useState(false)

  useEffect(() => {
    let mounted = true

    const showMessage = (index: number) => {
      if (!mounted) return
      if (CHAT_MESSAGES[index].from === 'pulse') {
        setShowTyping(true)
        setTimeout(() => {
          if (!mounted) return
          setShowTyping(false)
          setVisibleMessages(prev => [...prev, CHAT_MESSAGES[index].id])
          if (index + 1 < CHAT_MESSAGES.length) {
            setTimeout(() => showMessage(index + 1), CHAT_MESSAGES[index + 1].delay - CHAT_MESSAGES[index].delay)
          }
        }, 900)
      } else {
        setVisibleMessages(prev => [...prev, CHAT_MESSAGES[index].id])
        if (index + 1 < CHAT_MESSAGES.length) {
          setTimeout(() => showMessage(index + 1), CHAT_MESSAGES[index + 1].delay - CHAT_MESSAGES[index].delay)
        }
      }
    }

    // Start the animation sequence
    setTimeout(() => showMessage(0), 600)

    // Restart after full cycle
    const totalDuration = 9000
    const interval = setInterval(() => {
      if (!mounted) return
      setVisibleMessages([])
      setShowTyping(false)
      setTimeout(() => showMessage(0), 600)
    }, totalDuration)

    return () => {
      mounted = false
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="relative mx-auto w-[220px]">
      {/* Phone frame */}
      <div className="
        relative bg-[#111827] rounded-[32px] p-3
        border border-white/10
        shadow-[0_32px_80px_rgba(0,0,0,0.5)]
      ">
        {/* Status bar */}
        <div className="flex items-center justify-between px-2 py-1 mb-1">
          <span className="text-[9px] text-white/40">9:41</span>
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-white/20" />
            ))}
          </div>
        </div>

        {/* WhatsApp header */}
        <div className="flex items-center gap-2 px-2 py-2 border-b border-white/5 mb-2">
          <div className="w-7 h-7 rounded-full bg-emerald flex items-center justify-center">
            <span className="text-[9px] font-bold text-white">Z</span>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-white/90">Pulse by Z3ymo</div>
            <div className="text-[9px] text-emerald/70 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald inline-block" />
              Online
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="min-h-[220px] flex flex-col gap-2 px-1 pb-2 overflow-hidden">
          <AnimatePresence>
            {CHAT_MESSAGES.filter(m => visibleMessages.includes(m.id)).map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.25 }}
                className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`
                    text-[10px] px-2.5 py-1.5 rounded-2xl max-w-[150px]
                    leading-relaxed whitespace-pre-line
                    ${msg.from === 'user'
                      ? 'bg-emerald text-white rounded-tr-sm'
                      : 'bg-[#2A2A3D] text-white/80 rounded-tl-sm'}
                  `}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}

            {/* Typing indicator */}
            {showTyping && (
              <motion.div
                key="typing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-start"
              >
                <div className="bg-[#2A2A3D] px-3 py-2 rounded-2xl rounded-tl-sm flex gap-1 items-center">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-white/40 typing-dot"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input bar */}
        <div className="flex items-center gap-1.5 px-1 mt-1">
          <div className="flex-1 bg-[#2A2A3D] rounded-full px-3 py-1.5">
            <div className="text-[9px] text-white/20">Message</div>
          </div>
          <div className="w-6 h-6 rounded-full bg-emerald flex items-center justify-center flex-shrink-0">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
              <path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Ambient glow */}
      <div
        className="absolute -inset-6 -z-10 opacity-30 blur-2xl rounded-full"
        style={{ background: 'radial-gradient(circle, #1B998B 0%, transparent 70%)' }}
      />
    </div>
  )
}

export default function PulseSpotlight() {
  return (
    <section
      id="ai-agents"
      className="relative py-28 px-6 overflow-hidden grain"
      style={{ background: '#080810' }}
    >
      {/* Background grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(192,57,43,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(192,57,43,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Ambient lights */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #C0392B, transparent)' }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #1B998B, transparent)' }} />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — copy */}
          <div>
            <ScrollReveal>
              <p className="text-xs font-medium tracking-[0.18em] uppercase text-emerald/70 mb-4">
                Our AI product
              </p>
              <h2 className="font-display font-bold text-[clamp(2.5rem,6vw,4.5rem)] text-white leading-[0.95] mb-6">
                Meet
                <br />
                <span className="text-crimson">Z3ymo</span>
                <span className="text-white"> Pulse</span>
              </h2>
              <p className="text-base text-white/50 leading-relaxed mb-10 max-w-md">
                The WhatsApp AI agent built for African businesses. Automates customer support, bookings, and lead follow-up — 24/7, in English and Swahili.
              </p>
            </ScrollReveal>

            {/* Features grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {FEATURES.map((f, i) => (
                <ScrollReveal key={f.title} delay={i * 0.08}>
                  <div className="
                    p-4 rounded-2xl
                    bg-white/3 border border-white/8
                    hover:border-emerald/30 hover:bg-white/5
                    transition-all duration-200
                  ">
                    <div className="text-emerald/80 mb-2">{f.icon}</div>
                    <div className="text-sm font-medium text-white/80 mb-0.5">{f.title}</div>
                    <div className="text-xs text-white/35">{f.desc}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* CTAs */}
            <ScrollReveal delay={0.2}>
              <div className="flex flex-wrap gap-3">
                <MagneticButton href="#pulse-waitlist" variant="primary" size="md">
                  Join the waitlist
                </MagneticButton>
                <button className="
                  px-6 py-3 rounded-full text-sm font-medium
                  text-white/60 border border-white/15
                  hover:border-emerald/50 hover:text-emerald
                  transition-all duration-200 cursor-pointer
                ">
                  Book a demo →
                </button>
              </div>
            </ScrollReveal>

            {/* Pricing hint */}
            <ScrollReveal delay={0.25}>
              <p className="text-xs text-white/25 mt-5">
                Starting at $29/month · English & Swahili · Cancel anytime
              </p>
            </ScrollReveal>
          </div>

          {/* Right — Phone mockup */}
          <ScrollReveal direction="left" delay={0.15} className="flex justify-center lg:justify-end">
            <PhoneMockup />
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
