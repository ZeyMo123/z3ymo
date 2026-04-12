'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ─── Conversation script ─────────────────────── */
const CONVERSATION = [
  {
    from: 'user',
    text: "I need to automate my business with AI 🚀",
    delay: 800,
  },
  {
    from: 'pulse',
    text: "Hi! 👋 I'm Pulse by Z3ymo.\n\nTell me — what kind of business do you run?",
    delay: 2200,
    typing: 1000,
  },
  {
    from: 'user',
    text: "I run a retail chain. 5 locations in Dar es Salaam.",
    delay: 1800,
  },
  {
    from: 'pulse',
    text: "Perfect. I can build your AI agent to handle:\n• Customer support 24/7\n• Inventory alerts\n• Sales reporting\n• WhatsApp order tracking\n\nWhat's your monthly budget?",
    delay: 2500,
    typing: 1200,
  },
  {
    from: 'user',
    text: "Around Tsh 800K–1.2M per month",
    delay: 1800,
  },
  {
    from: 'pulse',
    text: "That works perfectly. Based on your needs, here's what we'll build 👇",
    delay: 1800,
    typing: 900,
  },
  {
    from: 'card',
    delay: 1200,
  },
]

/* ─── Feature proposal card ───────────────────── */
function ProposalCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.34, 1.1, 0.64, 1] }}
      className="mx-2 rounded-2xl overflow-hidden"
      style={{ background: 'linear-gradient(135deg, rgba(192,57,43,0.2), rgba(27,153,139,0.15))', border: '1px solid rgba(192,57,43,0.3)' }}
    >
      <div className="px-3 py-2.5">
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-4 h-4 rounded-full bg-crimson/20 flex items-center justify-center">
            <span style={{ fontSize: '8px', color: '#C0392B' }}>✦</span>
          </div>
          <span className="text-[9px] font-bold text-white/90">Z3ymo Retail Agent</span>
          <span className="ml-auto text-[8px] font-semibold text-emerald">$79/mo</span>
        </div>
        {[
          { icon: '◈', feat: 'Customer support', detail: 'WhatsApp, 24/7' },
          { icon: '◉', feat: 'Inventory alerts', detail: 'Auto-reorder' },
          { icon: '✦', feat: 'Sales analytics', detail: 'Daily reports' },
        ].map((f) => (
          <div key={f.feat} className="flex items-center gap-1.5 mb-1">
            <span style={{ color: '#1B998B', fontSize: '7px' }}>{f.icon}</span>
            <span className="text-[8px] text-white/70">{f.feat}</span>
            <span className="ml-auto text-[7px] text-white/30">{f.detail}</span>
          </div>
        ))}
        <div className="mt-2 pt-2 border-t border-white/8 flex gap-1.5">
          <div className="flex-1 text-center py-1 rounded-lg text-[8px] font-medium bg-crimson/80 text-white cursor-pointer">
            Confirm
          </div>
          <div className="flex-1 text-center py-1 rounded-lg text-[8px] text-white/50 border border-white/10 cursor-pointer">
            Adjust
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Message bubble ──────────────────────────── */
function MessageBubble({ msg }: { msg: typeof CONVERSATION[0] }) {
  if (msg.from === 'card') return <ProposalCard />

  const isUser = msg.from === 'user'
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: [0.34, 1.1, 0.64, 1] }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mx-2`}
    >
      {!isUser && (
        <div className="w-5 h-5 rounded-full bg-crimson/20 flex items-center justify-center mr-1.5 shrink-0 mt-auto mb-0.5">
          <span style={{ color: '#C0392B', fontSize: '7px', fontWeight: 700 }}>Z</span>
        </div>
      )}
      <div
        className="text-[10px] leading-normal px-2.5 py-2 rounded-2xl max-w-42.5 whitespace-pre-line"
        style={{
          background: isUser
            ? 'rgba(27,153,139,0.85)'
            : 'rgba(42,42,61,0.95)',
          color: isUser ? '#fff' : 'rgba(240,238,248,0.85)',
          borderBottomRightRadius: isUser ? 4 : 16,
          borderBottomLeftRadius: isUser ? 16 : 4,
        }}
      >
        {msg.text}
      </div>
    </motion.div>
  )
}

/* ─── Typing indicator ────────────────────────── */
function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center gap-1.5 mx-2 justify-start"
    >
      <div className="w-5 h-5 rounded-full bg-crimson/20 flex items-center justify-center shrink-0">
        <span style={{ color: '#C0392B', fontSize: '7px', fontWeight: 700 }}>Z</span>
      </div>
      <div className="bg-surface px-3 py-2 rounded-2xl rounded-bl-sm flex gap-1 items-center">
        {[0, 1, 2].map((i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/40 typing-dot"
            style={{ animationDelay: `${i * 0.2}s` }} />
        ))}
      </div>
    </motion.div>
  )
}

/* ─── Main component ──────────────────────────── */
export default function Slide3Visual({ isActive }: { isActive: boolean }) {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([])
  const [showTyping, setShowTyping] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(-1)
  const scrollRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const clearTimers = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
  }

  const reset = () => {
    clearTimers()
    setVisibleMessages([])
    setShowTyping(false)
    setCurrentIndex(-1)
  }

  const showNext = (idx: number) => {
    if (idx >= CONVERSATION.length) {
      // Restart after pause
      timerRef.current = setTimeout(() => reset(), 4000)
      return
    }

    const msg = CONVERSATION[idx]

    if (msg.from === 'pulse' && msg.typing) {
      setShowTyping(true)
      timerRef.current = setTimeout(() => {
        setShowTyping(false)
        setVisibleMessages((prev) => [...prev, idx])
        setCurrentIndex(idx)
        timerRef.current = setTimeout(() => showNext(idx + 1), msg.delay)
      }, msg.typing)
    } else {
      timerRef.current = setTimeout(() => {
        setVisibleMessages((prev) => [...prev, idx])
        setCurrentIndex(idx)
        timerRef.current = setTimeout(() => showNext(idx + 1), CONVERSATION[idx + 1]?.delay ?? 1000)
      }, msg.delay)
    }
  }

  useEffect(() => {
    if (!isActive) { reset(); return }
    timerRef.current = setTimeout(() => showNext(0), 500)
    return clearTimers
  }, [isActive])

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [visibleMessages, showTyping])

  // Restart when done
  useEffect(() => {
    if (currentIndex === CONVERSATION.length - 1) {
      timerRef.current = setTimeout(() => { reset(); setTimeout(() => showNext(0), 600) }, 4000)
    }
  }, [currentIndex])

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Phone frame */}
      <div className="relative w-55">
        <div className="rounded-[32px] overflow-hidden shadow-2xl"
          style={{
            background: '#0d0d18',
            border: '2px solid rgba(240,238,248,0.1)',
            boxShadow: '0 0 60px rgba(27,153,139,0.12), 0 40px 80px rgba(0,0,0,0.5)',
          }}
        >
          {/* Status bar */}
          <div className="flex justify-between items-center px-4 py-2">
            <span className="text-[8px] text-white/30">9:41</span>
            <div className="w-14 h-1.5 rounded-full bg-black/60" />
            <div className="flex gap-1 items-center">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-0.5 rounded-full bg-white/30" style={{ height: `${6 + i * 2}px` }} />
              ))}
            </div>
          </div>

          {/* Chat header */}
          <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5">
            <div className="w-7 h-7 rounded-full bg-crimson/20 border border-crimson/30 flex items-center justify-center shrink-0">
              <span style={{ fontSize: '9px', fontWeight: 700, color: '#C0392B' }}>Z</span>
            </div>
            <div>
              <div className="text-[10px] font-semibold text-white/90">Pulse by Z3ymo</div>
              <div className="text-[8px] text-emerald flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald inline-block" />
                AI Agent
              </div>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex flex-col gap-2 py-3 overflow-hidden"
            style={{ minHeight: 280, maxHeight: 280 }}
          >
            <AnimatePresence initial={false}>
              {CONVERSATION.map((msg, i) =>
                visibleMessages.includes(i) ? (
                  <MessageBubble key={i} msg={msg} />
                ) : null
              )}
              {showTyping && <TypingIndicator key="typing" />}
            </AnimatePresence>
          </div>

          {/* Input bar */}
          <div className="flex items-center gap-2 px-2 py-2 border-t border-white/5">
            <div className="flex-1 bg-white/5 rounded-full px-3 py-1.5">
              <span className="text-[8px] text-white/20">Message Pulse...</span>
            </div>
            <div className="w-6 h-6 rounded-full bg-crimson flex items-center justify-center shrink-0">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                <path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Ambient glow */}
        <div className="absolute -inset-8 -z-10 opacity-15 blur-3xl rounded-full"
          style={{ background: 'radial-gradient(circle, #1B998B, transparent)' }} />
      </div>
    </div>
  )
}
