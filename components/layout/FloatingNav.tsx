'use client'

import {
  useState, useEffect, useRef, useCallback,
} from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion, type Variants } from 'framer-motion'
import ThemeToggle from '@/components/ui/ThemeToggle'
import MagneticButton from '@/components/ui/MagneticButton'
import ContactDrawer from '@/components/ui/ContactDrawer'

// ─── Nav data ─────────────────────────────────────────────────

const PLATFORMS = [
  { name: 'CreatorOS',  desc: 'For creators, coaches & consultants',    href: '/products/platforms/creator-os',  tag: '' },
  { name: 'CommerceOS', desc: 'E-commerce for modern brands',            href: '/products/platforms/commerce-os', tag: '' },
  { name: 'BeautyOS',   desc: 'Booking & management for salons & spas',  href: '/products/platforms/beauty-os',   tag: '' },
  { name: 'FoodOS',     desc: 'Ordering & operations for restaurants',    href: '/products/platforms/food-os',     tag: '' },
  { name: 'MarketOS',   desc: 'Marketplace builder platform',             href: '/products/platforms/market-os',   tag: 'New' },
  { name: 'ServiceOS',  desc: 'Client portal for service businesses',     href: '/products/platforms/service-os',  tag: '' },
  { name: 'EventOS',    desc: 'Ticketing & event management',             href: '/products/platforms/event-os',    tag: '' },
]

const OWN_PRODUCTS = [
  { name: 'Z3ymo Pulse',       desc: 'WhatsApp AI agent for SMBs',        href: '/ai-agents/pulse', tag: 'Waitlist' },
  { name: 'EBox',              desc: 'Business review & discovery system', href: '/products',        tag: 'Coming soon' },
  { name: 'Salon Marketplace', desc: 'Book any salon, anywhere',           href: '/products',        tag: 'Coming soon' },
  { name: 'Novel Platform',    desc: 'African writers & readers',           href: '/products',        tag: 'Coming soon' },
]

const SOLUTIONS = [
  { name: 'Creators & Coaches',            href: '/solutions/creators' },
  { name: 'Fashion & Clothing Brands',     href: '/solutions/fashion' },
  { name: 'Beauty & Cosmetics Businesses', href: '/solutions/beauty' },
  { name: 'Restaurants & Catering',        href: '/solutions/food' },
  { name: 'Home Decor Businesses',         href: '/solutions/home-decor' },
  { name: 'Electronics Businesses',        href: '/solutions/electronics' },
  { name: 'Online Stores',                 href: '/solutions/ecommerce' },
  { name: 'Service Businesses',            href: '/solutions/services' },
  { name: 'Digital Entrepreneurs',         href: '/solutions/digital' },
]

const SERVICES_NAV = [
  {
    category: 'Software Development',
    items: [
      { name: 'Web & Mobile Applications',   href: '/services/web-mobile' },
      { name: 'Custom Software Development', href: '/services/custom-software' },
    ],
  },
  {
    category: 'AI Development',
    items: [
      { name: 'AI Agent Development',   href: '/services/ai-agents' },
      { name: 'AI Business Automation', href: '/services/ai-automation' },
    ],
  },
  {
    category: 'Consulting',
    items: [
      { name: 'Tech Consultation', href: '/services/tech-consultation' },
      { name: 'Product Strategy',  href: '/services/product-strategy' },
    ],
  },
]

const AI_AGENTS_NAV = [
  { name: 'AI Agent Development',    desc: 'Agents built for your specific workflows',  href: '/services/ai-agents' },
  { name: 'AI Business Automation',  desc: 'End-to-end workflow automation with AI',    href: '/services/ai-automation' },
  { name: 'Z3ymo Pulse',            desc: 'WhatsApp AI for African SMBs — join waitlist', href: '/ai-agents/pulse', tag: 'Waitlist' },
]

// Combined Resources megamenu — 3 column groups
const RESOURCES_COLS = [
  {
    group: 'Content & Credibility',
    items: [
      { name: 'Blog',          desc: 'Insights on AI, software, and business', href: '/blog' },
      { name: 'Case Studies',  desc: 'Real projects and outcomes',              href: '/portfolio' },
      { name: 'Guides',        desc: 'Step-by-step guides and tutorials',       href: '/blog?category=guides' },
      { name: 'Documentation', desc: 'Pulse API and platform docs',             href: '/docs' },
    ],
  },
  {
    group: 'Company',
    items: [
      { name: 'About Z3ymo', desc: 'Who we are and what we believe', href: '/about' },
      { name: 'Vision',      desc: 'Where we\'re building toward',   href: '/about#vision' },
      { name: 'Careers',     desc: 'Join the Z3ymo team',            href: '/about#careers' },
    ],
  },
  {
    group: 'Contacts',
    items: [
      { name: 'Contact Us',         desc: 'Get in touch with our team',   href: '/#contact' },
      { name: 'Get Help & Support', desc: 'Help with products and services', href: '/#contact' },
      { name: 'Become a Partner',   desc: 'Invest or partner with Z3ymo', href: '/investors' },
    ],
  },
]

// ─── Animation variants ────────────────────────────────────────

// cubic-bezier tuple typed so TypeScript accepts it as Easing
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const MEGA_VARIANTS: Variants = {
  hidden: {
    opacity:   0,
    y:         -6,
    scaleY:    0.97,
    transformOrigin: 'top center',
  },
  visible: {
    opacity:  1,
    y:        0,
    scaleY:   1,
    transition: { duration: 0.22, ease: EASE },
  },
  exit: {
    opacity:  0,
    y:        -4,
    scaleY:   0.98,
    transition: { duration: 0.16, ease: EASE },
  },
}

const STAGGER: Variants = {
  visible: { transition: { staggerChildren: 0.038, delayChildren: 0.05 } },
}

const ITEM_V: Variants = {
  hidden:  { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.2, ease: EASE } },
}

const ACCORDION_V: Variants = {
  hidden:  { height: 0, opacity: 0 },
  visible: {
    height:  'auto',
    opacity: 1,
    transition: {
      height:  { duration: 0.28, ease: EASE },
      opacity: { duration: 0.18, delay: 0.04 },
    },
  },
  exit: {
    height:  0,
    opacity: 0,
    transition: {
      height:  { duration: 0.22, ease: EASE },
      opacity: { duration: 0.12 },
    },
  },
}

const MOBILE_ITEM_V: Variants = {
  hidden:  { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x:       0,
    transition: { duration: 0.2, delay: i * 0.04, ease: EASE },
  }),
}

// ─── Tag badge ────────────────────────────────────────────────

function Tag({ label }: { label: string }) {
  const cls =
    label === 'Waitlist'
      ? 'bg-emerald/10 text-emerald'
      : label === 'New'
        ? 'bg-crimson/10 text-crimson'
        : 'bg-void/8 dark:bg-whisper/8 text-void/35 dark:text-whisper/35'
  return (
    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ml-2 shrink-0 ${cls}`}>
      {label}
    </span>
  )
}

// ─── Mega menu panels ─────────────────────────────────────────

function ProductsMenu({ reduced }: { reduced: boolean }) {
  const [showOwn, setShowOwn] = useState(false)
  const list = showOwn ? OWN_PRODUCTS : PLATFORMS

  return (
    <div className="grid grid-cols-2 gap-0 min-w-150">
      <div className="border-r border-void/8 dark:border-whisper/8 pr-6">
        {/* Tab toggle */}
        <div className="flex mb-4 border border-void/10 dark:border-whisper/10 rounded-xl overflow-hidden">
          {['Ready-to-Customize', 'Z3ymo Products'].map((label, i) => (
            <button key={label} onClick={() => setShowOwn(i === 1)}
              className={[
                'flex-1 text-xs font-medium py-2 px-3 transition-colors cursor-pointer',
                (i === 0 ? !showOwn : showOwn)
                  ? 'bg-void dark:bg-whisper text-whisper dark:text-void'
                  : 'text-void/50 dark:text-whisper/50 hover:text-void dark:hover:text-whisper',
              ].join(' ')}>
              {label}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={showOwn ? 'own' : 'plat'}
            variants={reduced ? undefined : STAGGER}
            initial="hidden" animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.08 } }}>
            {list.map((p) => (
              <motion.div key={p.name} variants={reduced ? undefined : ITEM_V}>
                <Link href={p.href}
                  className="flex items-start justify-between group py-1.5 px-2 rounded-xl hover:bg-void/4 dark:hover:bg-whisper/4 transition-colors">
                  <div>
                    <div className="text-sm font-medium text-void dark:text-whisper group-hover:text-crimson transition-colors">{p.name}</div>
                    <div className="text-xs text-void/40 dark:text-whisper/40">{p.desc}</div>
                  </div>
                  {p.tag && <Tag label={p.tag} />}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div variants={reduced ? undefined : STAGGER} initial="hidden" animate="visible"
        className="pl-6 flex flex-col justify-between">
        <div>
          <motion.p variants={ITEM_V}
            className="text-[10px] font-semibold tracking-[0.15em] uppercase text-void/30 dark:text-whisper/30 mb-3">
            Featured
          </motion.p>
          <motion.div variants={ITEM_V}
            className="rounded-2xl bg-void/3 dark:bg-whisper/3 border border-void/8 dark:border-whisper/8 p-4">
            <div className="text-sm font-bold text-void dark:text-whisper mb-1">Z3ymo Pulse</div>
            <div className="text-xs text-void/55 dark:text-whisper/55 leading-relaxed mb-3">
              WhatsApp AI agent for African SMBs. Automates support, bookings, and lead capture — 24/7.
            </div>
            <Link href="/ai-agents/pulse" className="text-xs font-medium text-crimson hover:underline">Join waitlist →</Link>
          </motion.div>
        </div>
        <motion.div variants={ITEM_V}>
          <Link href="/products" className="text-xs text-void/40 dark:text-whisper/40 hover:text-crimson transition-colors mt-4 inline-block">
            View all platforms →
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

function SolutionsMenu({ reduced }: { reduced: boolean }) {
  return (
    <div className="min-w-95">
      <motion.p variants={ITEM_V} initial="hidden" animate="visible"
        className="text-[10px] font-semibold tracking-[0.15em] uppercase text-void/30 dark:text-whisper/30 mb-3">
        Industry solutions
      </motion.p>
      <motion.div variants={reduced ? undefined : STAGGER} initial="hidden" animate="visible"
        className="grid grid-cols-2 gap-x-4 gap-y-0">
        {SOLUTIONS.map((s) => (
          <motion.div key={s.name} variants={reduced ? undefined : ITEM_V}>
            <Link href={s.href}
              className="block text-sm py-1.5 px-2 rounded-xl text-void/65 dark:text-whisper/65 hover:text-crimson hover:bg-void/4 dark:hover:bg-whisper/4 transition-colors">
              {s.name}
            </Link>
          </motion.div>
        ))}
      </motion.div>
      <motion.div variants={ITEM_V} initial="hidden" animate="visible"
        className="mt-4 pt-3 border-t border-void/8 dark:border-whisper/8">
        <p className="text-xs text-void/40 dark:text-whisper/40">
          Don't see your industry?{' '}
          <Link href="/services" className="text-crimson hover:underline">Tell us what you need →</Link>
        </p>
      </motion.div>
    </div>
  )
}

function ServicesMenu({ reduced }: { reduced: boolean }) {
  return (
    <div className="min-w-120">
      <div className="grid grid-cols-3 gap-6">
        {SERVICES_NAV.map((cat) => (
          <motion.div key={cat.category} variants={reduced ? undefined : STAGGER} initial="hidden" animate="visible">
            <motion.p variants={ITEM_V}
              className="text-[10px] font-semibold tracking-[0.12em] uppercase text-void/30 dark:text-whisper/30 mb-2">
              {cat.category}
            </motion.p>
            {cat.items.map((item) => (
              <motion.div key={item.name} variants={reduced ? undefined : ITEM_V}>
                <Link href={item.href}
                  className="block text-sm py-1.5 px-2 rounded-lg text-void/65 dark:text-whisper/65 hover:text-crimson hover:bg-void/4 dark:hover:bg-whisper/4 transition-colors">
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ))}
      </div>
      <motion.div variants={ITEM_V} initial="hidden" animate="visible"
        className="mt-5 pt-3 border-t border-void/8 dark:border-whisper/8 flex items-center justify-between">
        <p className="text-xs text-void/40 dark:text-whisper/40">All custom work starts with a free consultation.</p>
        <Link href="/services" className="text-xs text-crimson hover:underline font-medium">View all services →</Link>
      </motion.div>
    </div>
  )
}

function AIAgentsMenu({ reduced }: { reduced: boolean }) {
  return (
    <motion.div variants={reduced ? undefined : STAGGER} initial="hidden" animate="visible"
      className="min-w-100">
      <motion.p variants={ITEM_V}
        className="text-[10px] font-semibold tracking-[0.15em] uppercase text-void/30 dark:text-whisper/30 mb-3">
        AI capabilities
      </motion.p>
      <div className="space-y-1">
        {AI_AGENTS_NAV.map((item) => (
          <motion.div key={item.name} variants={reduced ? undefined : ITEM_V}>
            <Link href={item.href}
              className="flex items-start justify-between group py-2.5 px-3 rounded-xl hover:bg-void/4 dark:hover:bg-whisper/4 transition-colors">
              <div>
                <div className="text-sm font-medium text-void dark:text-whisper group-hover:text-crimson transition-colors">{item.name}</div>
                <div className="text-xs text-void/40 dark:text-whisper/40 mt-0.5">{item.desc}</div>
              </div>
              {'tag' in item && item.tag && <Tag label={item.tag} />}
            </Link>
          </motion.div>
        ))}
      </div>
      <motion.div variants={ITEM_V} className="mt-4 pt-3 border-t border-void/8 dark:border-whisper/8">
        <Link href="/ai-agents/pulse"
          className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-crimson px-4 py-2 rounded-full hover:bg-crimson/90 transition-colors">
          Join Pulse waitlist →
        </Link>
      </motion.div>
    </motion.div>
  )
}

// Combined Resources menu
function ResourcesMenu({ reduced }: { reduced: boolean }) {
  return (
    <div className="min-w-155">
      <div className="grid grid-cols-3 gap-8">
        {RESOURCES_COLS.map((col) => (
          <motion.div key={col.group} variants={reduced ? undefined : STAGGER} initial="hidden" animate="visible">
            <motion.p variants={ITEM_V}
              className="text-[10px] font-semibold tracking-[0.14em] uppercase text-void/30 dark:text-whisper/30 mb-3">
              {col.group}
            </motion.p>
            {col.items.map((item) => (
              <motion.div key={item.name} variants={reduced ? undefined : ITEM_V}>
                <Link href={item.href}
                  className="group block py-2 px-2 rounded-xl hover:bg-void/4 dark:hover:bg-whisper/4 transition-colors">
                  <div className="text-sm font-medium text-void dark:text-whisper group-hover:text-crimson transition-colors leading-snug">
                    {item.name}
                  </div>
                  <div className="text-[11px] text-void/40 dark:text-whisper/40 leading-snug mt-0.5">
                    {item.desc}
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ─── Types ────────────────────────────────────────────────────

type MenuKey = 'Products' | 'Solutions' | 'Services' | 'AI Agents' | 'Resources'
const MENU_KEYS: MenuKey[] = ['Products', 'Solutions', 'Services', 'AI Agents', 'Resources']

// ─── Desktop nav button with layoutId underline ───────────────

function NavButton({
  label, isActive, onEnter, onLeave, onClick,
}: {
  label:    MenuKey
  isActive: boolean
  onEnter:  () => void
  onLeave:  () => void
  onClick:  () => void
}) {
  return (
    <button
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
      className={[
        'relative px-3 py-2 rounded-xl text-sm font-medium transition-colors duration-150 cursor-pointer flex items-center gap-1',
        isActive
          ? 'text-void dark:text-whisper'
          : 'text-void/60 dark:text-whisper/60 hover:text-void dark:hover:text-whisper',
      ].join(' ')}
    >
      {/* Hover/active bg */}
      {isActive && (
        <motion.div
          layoutId="nav-pill"
          className="absolute inset-0 rounded-xl bg-void/5 dark:bg-whisper/5"
          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        />
      )}
      <span className="relative z-10">{label}</span>
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
        className={`relative z-10 transition-transform duration-200 opacity-40 ${isActive ? 'rotate-180' : ''}`}>
        <polyline points="6 9 12 15 18 9" />
      </svg>
      {/* Underline indicator */}
      {isActive && (
        <motion.div
          layoutId="nav-underline"
          className="absolute bottom-0.5 left-3 right-3 h-px rounded-full bg-crimson"
          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        />
      )}
    </button>
  )
}

// ─── Mobile accordion section ─────────────────────────────────

function MobileSection({
  label, isOpen, onToggle, children,
}: {
  label:    string
  isOpen:   boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div className="border-b border-void/6 dark:border-whisper/6 last:border-0">
      <button onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-sm font-semibold text-void/75 dark:text-whisper/75 cursor-pointer">
        {label}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
          className={`transition-transform duration-250 ease-out ${isOpen ? 'rotate-180 text-crimson' : ''}`}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div variants={ACCORDION_V} initial="hidden" animate="visible" exit="exit"
            className="overflow-hidden">
            <div className="pb-4 space-y-0.5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Mobile link item ─────────────────────────────────────────

function MobileItem({
  name, desc, href, tag, index, onClose,
}: {
  name:     string
  desc?:    string
  href:     string
  tag?:     string
  index:    number
  onClose:  () => void
}) {
  return (
    <motion.div custom={index} variants={MOBILE_ITEM_V} initial="hidden" animate="visible">
      <Link href={href} onClick={onClose}
        className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-void/5 dark:hover:bg-whisper/5 transition-colors group">
        <div>
          <div className="text-sm text-void/75 dark:text-whisper/75 group-hover:text-crimson transition-colors font-medium leading-snug">
            {name}
          </div>
          {desc && (
            <div className="text-[11px] text-void/35 dark:text-whisper/35 mt-0.5 leading-snug">{desc}</div>
          )}
        </div>
        {tag && <Tag label={tag} />}
      </Link>
    </motion.div>
  )
}

// ─── Main component ───────────────────────────────────────────

export default function FloatingNav() {
  const [activeMenu,    setActiveMenu]    = useState<MenuKey | null>(null)
  const [scrolled,      setScrolled]      = useState(false)
  const [drawerOpen,    setDrawerOpen]    = useState(false)
  const [mobileOpen,    setMobileOpen]    = useState(false)
  const [mobileSection, setMobileSection] = useState<string | null>(null)

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const navRef     = useRef<HTMLElement>(null)
  const reduced    = useReducedMotion() ?? false

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Click-outside closes desktop menu
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setActiveMenu(null)
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  // Body scroll lock when mobile open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Close mobile on wide screen
  useEffect(() => {
    const h = () => { if (window.innerWidth >= 1024) setMobileOpen(false) }
    window.addEventListener('resize', h, { passive: true })
    return () => window.removeEventListener('resize', h)
  }, [])

  const openMenu     = useCallback((key: MenuKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setActiveMenu(key)
  }, [])
  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 130)
  }, [])
  const cancelClose   = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }, [])
  const closeMobile   = useCallback(() => {
    setMobileOpen(false)
    setMobileSection(null)
  }, [])
  const toggleSection = (label: string) =>
    setMobileSection((prev) => (prev === label ? null : label))

  function renderMegaMenu(key: MenuKey) {
    switch (key) {
      case 'Products':    return <ProductsMenu  reduced={reduced} />
      case 'Solutions':   return <SolutionsMenu reduced={reduced} />
      case 'Services':    return <ServicesMenu  reduced={reduced} />
      case 'AI Agents':   return <AIAgentsMenu  reduced={reduced} />
      case 'Resources':   return <ResourcesMenu reduced={reduced} />
    }
  }

  const glassy = scrolled || !!activeMenu

  return (
    <>
      <header
        ref={navRef}
        className={[
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          glassy
            ? 'bg-whisper/93 dark:bg-void/93 backdrop-blur-xl border-b border-void/8 dark:border-whisper/8 shadow-sm'
            : 'bg-transparent',
        ].join(' ')}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="flex items-center h-16 gap-4">

            {/* Logo */}
            <Link href="/" onClick={() => { setActiveMenu(null); closeMobile() }}
              className="font-display font-bold text-xl text-void dark:text-whisper tracking-tight shrink-0 hover:text-crimson transition-colors duration-150">
              Z3ymo
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5 flex-1">
              {MENU_KEYS.map((key) => (
                <NavButton
                  key={key}
                  label={key}
                  isActive={activeMenu === key}
                  onEnter={() => openMenu(key)}
                  onLeave={scheduleClose}
                  onClick={() => setActiveMenu(activeMenu === key ? null : key)}
                />
              ))}
            </nav>

            {/* Right */}
            <div className="flex items-center gap-2 ml-auto shrink-0">
              <ThemeToggle />
              <MagneticButton
                onClick={() => setDrawerOpen(true)}
                variant="primary" size="sm"
                className="hidden sm:inline-flex">
                Book Consultation
              </MagneticButton>

              {/* Animated hamburger */}
              <motion.button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.25 rounded-xl text-void/65 dark:text-whisper/65 hover:bg-void/8 dark:hover:bg-whisper/8 transition-colors cursor-pointer"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                <motion.span
                  className="block w-5 h-[1.5px] bg-current rounded-full origin-center"
                  animate={mobileOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.span
                  className="block w-5 h-[1.5px] bg-current rounded-full"
                  animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.15 }}
                />
                <motion.span
                  className="block w-5 h-[1.5px] bg-current rounded-full origin-center"
                  animate={mobileOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Desktop mega menu */}
        <AnimatePresence>
          {activeMenu && (
            <motion.div
              key={activeMenu}
              variants={reduced ? undefined : MEGA_VARIANTS}
              initial="hidden" animate="visible" exit="exit"
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
              className="absolute top-full left-0 right-0 border-t border-void/8 dark:border-whisper/8 bg-whisper/97 dark:bg-void/97 backdrop-blur-2xl shadow-xl shadow-void/6"
            >
              <div className="max-w-7xl mx-auto px-6 py-6">
                {renderMegaMenu(activeMenu)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile overlay + slide-in drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Blurred backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMobile}
              className="fixed inset-0 z-40 bg-void/25 dark:bg-void/50 backdrop-blur-sm lg:hidden"
            />

            {/* Slide-in panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 340, damping: 34, mass: 0.9 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm lg:hidden flex flex-col bg-whisper dark:bg-void shadow-2xl"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 h-16 border-b border-void/8 dark:border-whisper/8 shrink-0">
                <Link href="/" onClick={closeMobile}
                  className="font-display font-bold text-lg text-void dark:text-whisper hover:text-crimson transition-colors">
                  Z3ymo
                </Link>
                <button onClick={closeMobile}
                  className="w-9 h-9 flex items-center justify-center rounded-xl text-void/50 dark:text-whisper/50 hover:bg-void/8 dark:hover:bg-whisper/8 transition-colors cursor-pointer"
                  aria-label="Close">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Scrollable accordion body */}
              <div className="flex-1 overflow-y-auto px-4 py-2">

                {/* Products */}
                <MobileSection label="Products" isOpen={mobileSection === 'Products'} onToggle={() => toggleSection('Products')}>
                  <div className="pt-1">
                    <p className="text-[10px] font-semibold tracking-wider uppercase text-void/30 dark:text-whisper/30 px-3 mb-1">Platforms</p>
                    {PLATFORMS.map((p, i) => (
                      <MobileItem key={p.name} name={p.name} desc={p.desc} href={p.href} tag={p.tag || undefined} index={i} onClose={closeMobile} />
                    ))}
                    <p className="text-[10px] font-semibold tracking-wider uppercase text-void/30 dark:text-whisper/30 px-3 mt-3 mb-1">Z3ymo Products</p>
                    {OWN_PRODUCTS.map((p, i) => (
                      <MobileItem key={p.name} name={p.name} desc={p.desc} href={p.href} tag={p.tag || undefined} index={PLATFORMS.length + i} onClose={closeMobile} />
                    ))}
                  </div>
                </MobileSection>

                {/* Solutions */}
                <MobileSection label="Solutions" isOpen={mobileSection === 'Solutions'} onToggle={() => toggleSection('Solutions')}>
                  {SOLUTIONS.map((s, i) => (
                    <MobileItem key={s.name} name={s.name} href={s.href} index={i} onClose={closeMobile} />
                  ))}
                </MobileSection>

                {/* Services */}
                <MobileSection label="Services" isOpen={mobileSection === 'Services'} onToggle={() => toggleSection('Services')}>
                  {SERVICES_NAV.map((cat) => (
                    <div key={cat.category} className="mb-2">
                      <p className="text-[10px] font-semibold tracking-wider uppercase text-void/30 dark:text-whisper/30 px-3 mb-1">{cat.category}</p>
                      {cat.items.map((item, i) => (
                        <MobileItem key={item.name} name={item.name} href={item.href} index={i} onClose={closeMobile} />
                      ))}
                    </div>
                  ))}
                </MobileSection>

                {/* AI Agents */}
                <MobileSection label="AI Agents" isOpen={mobileSection === 'AI Agents'} onToggle={() => toggleSection('AI Agents')}>
                  {AI_AGENTS_NAV.map((item, i) => (
                    <MobileItem key={item.name} name={item.name} desc={item.desc} href={item.href} tag={'tag' in item ? item.tag : undefined} index={i} onClose={closeMobile} />
                  ))}
                </MobileSection>

                {/* Resources (combined) */}
                <MobileSection label="Resources" isOpen={mobileSection === 'Resources'} onToggle={() => toggleSection('Resources')}>
                  {RESOURCES_COLS.map((col) => (
                    <div key={col.group} className="mb-3">
                      <p className="text-[10px] font-semibold tracking-wider uppercase text-void/30 dark:text-whisper/30 px-3 mb-1">{col.group}</p>
                      {col.items.map((item, i) => (
                        <MobileItem key={item.name} name={item.name} desc={item.desc} href={item.href} index={i} onClose={closeMobile} />
                      ))}
                    </div>
                  ))}
                </MobileSection>
              </div>

              {/* Sticky footer CTA */}
              <div className="shrink-0 border-t border-void/8 dark:border-whisper/8 px-4 py-4 space-y-2.5">
                <MagneticButton
                  onClick={() => { closeMobile(); setDrawerOpen(true) }}
                  variant="primary"
                  className="w-full justify-center">
                  Book Free Consultation
                </MagneticButton>
                <Link href="/solutions" onClick={closeMobile}
                  className="block text-center text-sm text-void/45 dark:text-whisper/45 hover:text-void dark:hover:text-whisper transition-colors py-1.5">
                  Explore industry solutions →
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ContactDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
