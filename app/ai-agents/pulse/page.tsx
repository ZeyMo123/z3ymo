'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FloatingNav from '@/components/layout/FloatingNav'
import Footer from '@/components/layout/Footer'
import ScrollReveal from '@/components/ui/ScrollReveal'
import MagneticButton from '@/components/ui/MagneticButton'
import GlassCard from '@/components/ui/GlassCard'

/* ─── Data ────────────────────────────────────── */
const FEATURES = [
  {
    title: 'WhatsApp-native',
    desc: 'Works where your customers already are. No app downloads, no new logins.',
    icon: '◈', color: '#1B998B',
  },
  {
    title: '24/7 availability',
    desc: 'Never miss a customer message — even at 3am on a Sunday.',
    icon: '◈', color: '#C0392B',
  },
  {
    title: 'English & Swahili',
    desc: 'Switches language automatically based on how your customer writes.',
    icon: '◈', color: '#C9A84C',
  },
  {
    title: 'Smart booking',
    desc: 'Checks your calendar, books appointments, and sends reminders automatically.',
    icon: '◈', color: '#1B998B',
  },
  {
    title: 'Lead qualification',
    desc: 'Asks the right questions, collects info, and hands warm leads to you.',
    icon: '◈', color: '#C0392B',
  },
  {
    title: 'Weekly analytics',
    desc: 'See top questions, peak times, customer sentiment, and response metrics.',
    icon: '◈', color: '#C9A84C',
  },
]

const TIERS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 29,
    period: 'month',
    desc: 'Perfect for solo businesses',
    features: [
      '1 WhatsApp number',
      'Up to 500 conversations/mo',
      'Customer support automation',
      'English language',
      'Email support',
    ],
    cta: 'Join waitlist',
    featured: false,
  },
  {
    id: 'business',
    name: 'Business',
    price: 79,
    period: 'month',
    desc: 'For growing SMBs',
    features: [
      '3 WhatsApp numbers',
      'Up to 2,000 conversations/mo',
      'Support + booking + lead capture',
      'English & Swahili',
      'Analytics dashboard',
      'Priority support',
    ],
    cta: 'Join waitlist',
    featured: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 199,
    period: 'month',
    desc: 'For teams and agencies',
    features: [
      'Unlimited WhatsApp numbers',
      'Unlimited conversations',
      'Custom AI training on your data',
      'All languages',
      'Full integrations (CRM, ERP)',
      'Dedicated account manager',
      'White-label option',
    ],
    cta: 'Contact us',
    featured: false,
  },
]

const FAQS = [
  {
    q: 'How quickly can Pulse be set up?',
    a: 'Most businesses are live within 24–48 hours. You provide your business info, FAQs, and any specific rules — we handle the rest.',
  },
  {
    q: 'Does my customer need to download anything?',
    a: 'No. Pulse works entirely within WhatsApp. Your customers just message your existing WhatsApp number and the AI responds — completely transparent.',
  },
  {
    q: 'What happens when Pulse can\'t answer something?',
    a: 'You define escalation rules. When Pulse is unsure or when a customer requests a human, it smoothly hands the conversation to you with full context.',
  },
  {
    q: 'Can Pulse work in my language?',
    a: 'Pulse currently supports English and Swahili natively. Additional languages (French, Arabic, Portuguese) are on our roadmap for 2025.',
  },
  {
    q: 'Is my customer data safe?',
    a: 'Yes. All conversations are encrypted in transit and at rest. We are GDPR-aware and never share your customer data with third parties.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Absolutely. No contracts, no lock-in. Cancel with 30 days notice and we\'ll export all your data.',
  },
]

const CHAT_SEQUENCES = {
  support: [
    { from: 'user', text: 'Niambie kuhusu huduma zenu' },
    { from: 'ai', text: 'Habari! 👋 Tunauza bidhaa za nguo za kiswahili, viatu na mapambo.\n\nUnataka habari zaidi kuhusu nini?' },
    { from: 'user', text: 'Bei za viatu?' },
    { from: 'ai', text: 'Viatu vyetu vina bei kati ya Tsh 25,000 hadi 180,000 kulingana na aina.\n\nTuma picha ya unatakayo nikupelekee bei sahihi! 📸' },
  ],
  booking: [
    { from: 'user', text: 'I need to book a haircut' },
    { from: 'ai', text: 'Hi! 👋 Happy to help you book.\n\nWhich service would you like?\n• Haircut — 45min\n• Cut & style — 1hr\n• Full package — 2hrs' },
    { from: 'user', text: 'Cut and style please' },
    { from: 'ai', text: 'Perfect! When works for you?\n\nAvailable slots tomorrow:\n⏰ 10:00 AM\n⏰ 2:00 PM\n⏰ 4:30 PM' },
    { from: 'user', text: '2pm' },
    { from: 'ai', text: '✅ Booked!\n\nCut & style — Tomorrow 2:00 PM\nYou\'ll get a reminder 1 hour before. See you then!' },
  ],
}

/* ─── Chat Demo Component ─────────────────────── */
function ChatDemo() {
  const [activeTab, setActiveTab] = useState<'support' | 'booking'>('booking')
  const [visibleCount, setVisibleCount] = useState(0)
  const [showTyping, setShowTyping] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const messages = CHAT_SEQUENCES[activeTab]

  const resetAndPlay = (tab: 'support' | 'booking') => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setVisibleCount(0)
    setShowTyping(false)
    setActiveTab(tab)
  }

  useEffect(() => {
    if (visibleCount >= messages.length) return
    const msg = messages[visibleCount]
    const delay = msg.from === 'ai' ? 800 : 500

    timerRef.current = setTimeout(() => {
      if (msg.from === 'ai') {
        setShowTyping(true)
        setTimeout(() => {
          setShowTyping(false)
          setVisibleCount((c) => c + 1)
        }, 1100)
      } else {
        setVisibleCount((c) => c + 1)
      }
    }, delay)

    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [visibleCount, messages, activeTab])

  // Auto-restart
  useEffect(() => {
    if (visibleCount < messages.length) return
    timerRef.current = setTimeout(() => resetAndPlay(activeTab), 4000)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [visibleCount, messages.length, activeTab])

  return (
    <div className="relative">
      {/* Tab switcher */}
      <div className="flex gap-2 mb-4">
        {(['booking', 'support'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => resetAndPlay(tab)}
            className={`text-xs px-4 py-1.5 rounded-full border transition-all duration-150 cursor-pointer capitalize
              ${activeTab === tab
                ? 'bg-crimson text-white border-crimson'
                : 'border-white/15 text-white/40 hover:text-white/70'
              }`}
          >
            {tab === 'booking' ? 'Booking demo' : 'Swahili support demo'}
          </button>
        ))}
      </div>

      {/* Phone frame */}
      <div className="w-75 bg-[#111827] rounded-[32px] p-3 border border-white/8 shadow-2xl mx-auto">
        {/* Status bar */}
        <div className="flex justify-between px-3 py-1 mb-1">
          <span className="text-[9px] text-white/30">9:41</span>
          <div className="flex gap-1 items-center">
            {[...Array(3)].map((_, i) => <div key={i} className="w-1 h-1 rounded-full bg-white/20" />)}
          </div>
        </div>

        {/* WhatsApp header */}
        <div className="flex items-center gap-2.5 px-3 py-2 border-b border-white/5 mb-3">
          <div className="w-8 h-8 rounded-full bg-emerald flex items-center justify-center">
            <span className="text-[10px] font-bold text-white">P</span>
          </div>
          <div>
            <div className="text-[12px] font-semibold text-white/90">Pulse AI</div>
            <div className="text-[9px] text-emerald flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald inline-block" />
              Online
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="min-h-65 flex flex-col gap-2 px-2 pb-3">
          <AnimatePresence initial={false}>
            {messages.slice(0, visibleCount).map((msg, i) => (
              <motion.div
                key={`${activeTab}-${i}`}
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.22 }}
                className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`text-[11px] px-3 py-2 rounded-2xl max-w-55 leading-normal whitespace-pre-line
                  ${msg.from === 'user'
                    ? 'bg-emerald text-white rounded-tr-sm'
                    : 'bg-surface text-white/80 rounded-tl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}

            {showTyping && (
              <motion.div
                key="typing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-start"
              >
                <div className="bg-surface px-3.5 py-2.5 rounded-2xl rounded-tl-sm flex gap-1 items-center">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/40 typing-dot"
                      style={{ animationDelay: `${i * 0.2}s` }} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input */}
        <div className="flex gap-2 px-2 mt-1">
          <div className="flex-1 bg-surface rounded-full px-3 py-2">
            <div className="text-[9px] text-white/20">Message</div>
          </div>
          <div className="w-7 h-7 rounded-full bg-emerald flex items-center justify-center shrink-0">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z" /></svg>
          </div>
        </div>
      </div>

      {/* Glow */}
      <div className="absolute -inset-8 -z-10 opacity-20 blur-3xl rounded-full"
        style={{ background: 'radial-gradient(circle, #1B998B, transparent)' }} />
    </div>
  )
}

/* ─── Waitlist Form ───────────────────────────── */
function WaitlistForm() {
  const [form, setForm] = useState({ name: '', email: '', tier: 'business', business: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.email.includes('@')) return
    setStatus('loading')

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, product: 'pulse', name: form.name }),
      })
      if (!res.ok) throw new Error()
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-16 h-16 rounded-full bg-emerald/15 border border-emerald/30 flex items-center justify-center mx-auto mb-5">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1B998B" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
        <h3 className="font-display font-bold text-2xl text-white mb-2">You&apos;re on the list!</h3>
        <p className="text-white/50 text-sm max-w-sm mx-auto">
          We&apos;ll reach out when Pulse is ready for you. Expected launch: Q2 2025.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-white/40 mb-1.5 block">Your name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. Amina Hassan"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-crimson/50 transition-colors"
          />
        </div>
        <div>
          <label className="text-xs text-white/40 mb-1.5 block">Email address <span className="text-crimson">*</span></label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="hello@yourbusiness.com"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-crimson/50 transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="text-xs text-white/40 mb-1.5 block">Interested tier</label>
        <div className="grid grid-cols-3 gap-2">
          {TIERS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setForm({ ...form, tier: t.id })}
              className={`py-2.5 rounded-xl text-sm border transition-all duration-150 cursor-pointer
                ${form.tier === t.id
                  ? 'bg-crimson/20 border-crimson/50 text-crimson font-medium'
                  : 'bg-white/3 border-white/10 text-white/50 hover:border-white/20'
                }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs text-white/40 mb-1.5 block">What kind of business? (optional)</label>
        <input
          type="text"
          value={form.business}
          onChange={(e) => setForm({ ...form, business: e.target.value })}
          placeholder="e.g. Salon in Dar es Salaam"
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-crimson/50 transition-colors"
        />
      </div>

      {status === 'error' && (
        <p className="text-crimson text-sm">Something went wrong — please try again or email us at hello@z3ymo.com.</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading' || !form.email}
        className="w-full py-4 rounded-xl font-medium text-sm bg-crimson text-white hover:bg-crimson-400 transition-colors duration-150 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Joining...' : 'Join the Pulse waitlist →'}
      </button>

      <p className="text-center text-xs text-white/25">
        No payment required. We&apos;ll contact you before launch.
      </p>
    </form>
  )
}

/* ─── FAQ Accordion ───────────────────────────── */
function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="space-y-0">
      {FAQS.map((faq, i) => (
        <div key={i} className="border-b border-void/8 dark:border-whisper/8">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between py-5 text-left cursor-pointer group"
          >
            <span className="text-sm font-medium text-void dark:text-whisper group-hover:text-crimson transition-colors">
              {faq.q}
            </span>
            <motion.span
              animate={{ rotate: open === i ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-void/30 dark:text-whisper/30 text-xl shrink-0 ml-4"
            >
              +
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <p className="text-sm text-void/55 dark:text-whisper/55 leading-relaxed pb-5">
                  {faq.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

/* ─── Page ────────────────────────────────────── */
export default function PulsePage() {
  return (
    <main className="min-h-screen">
      <FloatingNav />

      {/* Hero — dark island */}
      <section className="relative min-h-screen flex items-center px-6 overflow-hidden"
        style={{ background: '#07070D' }}>
        {/* Grid */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{ backgroundImage: 'linear-gradient(rgba(192,57,43,1) 1px, transparent 1px), linear-gradient(90deg, rgba(192,57,43,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        {/* Glows */}
        <div aria-hidden="true" className="absolute top-0 left-0 w-150 h-150 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #C0392B, transparent)', filter: 'blur(80px)' }} />
        <div aria-hidden="true" className="absolute bottom-0 right-0 w-125 h-125 rounded-full opacity-8 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #1B998B, transparent)', filter: 'blur(80px)' }} />

        <div className="max-w-6xl mx-auto w-full pt-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Copy */}
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
                <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-crimson/25 bg-crimson/8">
                  <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-pulse" />
                  <span className="text-xs font-medium text-crimson/80 tracking-wide">Waitlist open — launching Q2 2025</span>
                </div>
                <h1 className="font-display font-bold text-[clamp(3rem,8vw,6rem)] text-white leading-[0.92] tracking-tight mb-6">
                  Z3ymo
                  <br />
                  <span className="text-crimson">Pulse</span>
                </h1>
                <p className="text-lg text-white/50 leading-relaxed mb-3 max-w-lg">
                  The WhatsApp AI agent built for African businesses. Automate customer support, bookings, and lead capture — 24/7, in English and Swahili.
                </p>
                <p className="text-sm text-white/30 mb-10">Starting at <span className="text-white/60 font-medium">$29/month</span> · No setup fees · Cancel anytime</p>

                <div className="flex flex-wrap gap-3">
                  <a href="#waitlist"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium bg-crimson text-white hover:bg-crimson-400 transition-colors shadow-[0_0_32px_rgba(192,57,43,0.3)]">
                    Join the waitlist
                  </a>
                  <a href="#pricing"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium border border-white/15 text-white/60 hover:text-white hover:border-white/30 transition-all">
                    See pricing
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Demo */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex justify-center lg:justify-end"
            >
              <ChatDemo />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="mb-14 text-center">
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-4">Features</p>
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)] text-void dark:text-whisper">
              Everything your business needs
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 0.06}>
                <div className="p-7 rounded-2xl border border-void/8 dark:border-whisper/8 bg-void/2 dark:bg-whisper/2 h-full hover:border-void/16 dark:hover:border-whisper/16 transition-colors duration-200">
                  <span className="text-2xl mb-4 block" style={{ color: f.color }}>{f.icon}</span>
                  <h3 className="font-display font-semibold text-lg text-void dark:text-whisper mb-2">{f.title}</h3>
                  <p className="text-sm text-void/55 dark:text-whisper/55 leading-relaxed">{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(192,57,43,0.04) 0%, transparent 70%)' }}>
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-4">Pricing</p>
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)] text-void dark:text-whisper mb-3">
              Simple, transparent pricing
            </h2>
            <p className="text-void/50 dark:text-whisper/50">All plans include a 14-day free trial. No credit card required.</p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TIERS.map((tier, i) => (
              <ScrollReveal key={tier.id} delay={i * 0.08}>
                <div className={`relative h-full p-8 rounded-2xl border transition-all duration-200
                  ${tier.featured
                    ? 'border-crimson/40 bg-crimson/3'
                    : 'border-void/8 dark:border-whisper/8 bg-void/2 dark:bg-whisper/2'
                  }`}>
                  {tier.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="text-xs font-semibold px-4 py-1 rounded-full bg-crimson text-white">Most popular</span>
                    </div>
                  )}
                  <div className="mb-1 text-sm font-medium text-void dark:text-whisper">{tier.name}</div>
                  <div className="text-xs text-void/40 dark:text-whisper/40 mb-5">{tier.desc}</div>
                  <div className="mb-6">
                    <span className="font-display font-bold text-4xl text-void dark:text-whisper">${tier.price}</span>
                    <span className="text-void/40 dark:text-whisper/40 text-sm">/{tier.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-void/60 dark:text-whisper/60">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1B998B" strokeWidth="2.5" strokeLinecap="round" className="shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12" /></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="#waitlist" className={`block w-full py-3 rounded-xl text-sm font-medium text-center transition-all duration-150 cursor-pointer
                    ${tier.featured
                      ? 'bg-crimson text-white hover:bg-crimson-400'
                      : 'border border-void/12 dark:border-whisper/12 text-void/70 dark:text-whisper/70 hover:border-crimson/40 hover:text-crimson'
                    }`}>
                    {tier.cta}
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="py-24 px-6" style={{ background: '#07070D' }}>
        <div className="max-w-2xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-crimson/70 mb-4">Early access</p>
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)] text-white mb-3">
              Join the waitlist
            </h2>
            <p className="text-white/40 max-w-sm mx-auto">
              Be first to get access when Pulse launches. Waitlist members get 3 months free on annual plans.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="p-8 rounded-2xl border border-white/8 bg-white/2">
              <WaitlistForm />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal className="mb-12">
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-4">FAQ</p>
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)] text-void dark:text-whisper">
              Questions answered
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <FAQ />
          </ScrollReveal>
          <ScrollReveal delay={0.15} className="mt-10 text-center">
            <p className="text-sm text-void/40 dark:text-whisper/40">
              Still have questions?{' '}
              <a href="https://wa.me/+255XXXXXXXXX" target="_blank" rel="noopener noreferrer" className="text-emerald hover:underline">
                Message us on WhatsApp →
              </a>
            </p>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
