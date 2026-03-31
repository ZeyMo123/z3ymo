import type { Metadata } from 'next'
import FloatingNav from '@/components/layout/FloatingNav'
import Footer from '@/components/layout/Footer'
import ProductsForSale from '@/components/sections/ProductsForSale'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Products — Ready-made software & our own products',
  description:
    'Browse Z3ymo\'s ready-made websites and digital products for sale. Also discover our own products: Pulse AI, EBox, Novel App, and Salons Marketplace.',
}

const OWN_PRODUCTS = [
  {
    id: 'pulse',
    name: 'Z3ymo Pulse',
    tagline: 'WhatsApp AI agent for African businesses',
    description:
      'Automate customer support, bookings, and lead follow-up 24/7 — natively on WhatsApp. In English and Swahili.',
    status: 'waitlist',
    accent: '#C0392B',
    href: '/ai-agents/pulse',
    features: ['24/7 customer support', 'Appointment booking', 'Lead capture', 'Analytics dashboard'],
  },
  {
    id: 'ebox',
    name: 'EBox',
    tagline: 'Business review system for Tanzania & Africa',
    description:
      'Help your customers find and trust local businesses. A TripAdvisor-style platform built for the African market.',
    status: 'coming-soon',
    accent: '#1B998B',
    href: '/products/ebox',
    features: ['Verified reviews', 'Business profiles', 'Analytics', 'Mobile app'],
  },
  {
    id: 'novel',
    name: 'Novel App',
    tagline: 'Write and read African stories',
    description:
      'A platform for African writers to publish serialised novels and for readers to discover local stories.',
    status: 'coming-soon',
    accent: '#C9A84C',
    href: '/products/novel',
    features: ['Serialised publishing', 'Offline reading', 'Multiple languages', 'Revenue for writers'],
  },
  {
    id: 'salons',
    name: 'Salons Marketplace',
    tagline: 'Book salons across Tanzania',
    description:
      'Discover, compare, and book salons and beauty services — reviews, pricing, and instant booking in one app.',
    status: 'coming-soon',
    accent: '#C0392B',
    href: '/products/salons',
    features: ['Instant booking', 'Verified salons', 'Stylist profiles', 'Mobile-first'],
  },
]

const statusLabels: Record<string, { label: string; color: string }> = {
  live:         { label: 'Live',         color: '#1B998B' },
  waitlist:     { label: 'Join waitlist', color: '#C0392B' },
  'coming-soon':{ label: 'Coming soon',  color: '#C9A84C' },
}

export default function ProductsPage() {
  return (
    <main className="min-h-screen">
      <FloatingNav />

      {/* Header */}
      <section className="pt-36 pb-16 px-6 relative">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(201,168,76,0.05) 0%, transparent 70%)',
          }}
        />
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-4">
            Products
          </p>
          <h1 className="font-display font-bold text-[clamp(2.5rem,6vw,5rem)] text-void dark:text-whisper leading-none mb-4">
            Software built
            <br />
            <span className="text-void/30 dark:text-whisper/30">to last</span>
          </h1>
          <p className="text-lg text-void/50 dark:text-whisper/50 max-w-xl">
            Ready-made products you can buy today — and our own growing ecosystem of SaaS platforms.
          </p>
        </div>
      </section>

      {/* Products for sale */}
      <ProductsForSale />

      {/* Own products */}
      <section className="py-24 px-6" style={{
        background: 'radial-gradient(ellipse 70% 40% at 50% 50%, rgba(27,153,139,0.04) 0%, transparent 70%)'
      }}>
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="mb-14">
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-4">
              Our own products
            </p>
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)] text-void dark:text-whisper">
              The Z3ymo ecosystem
            </h2>
            <p className="text-void/50 dark:text-whisper/50 mt-3 max-w-lg">
              We don&apos;t just build for clients — we build products the world needs.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OWN_PRODUCTS.map((product, i) => {
              const status = statusLabels[product.status]
              return (
                <ScrollReveal key={product.id} delay={i * 0.08}>
                  <div className="
                    group h-full p-8 rounded-2xl
                    border border-void/8 dark:border-whisper/8
                    hover:border-void/16 dark:hover:border-whisper/16
                    transition-all duration-200
                    bg-void/2 dark:bg-whisper/2
                    relative overflow-hidden
                  ">
                    {/* Accent line */}
                    <div
                      className="absolute top-0 left-0 right-0 h-0.5"
                      style={{ background: `linear-gradient(90deg, ${product.accent}, transparent)` }}
                    />

                    <div className="flex items-start justify-between mb-5">
                      <div>
                        <h3 className="font-display font-bold text-2xl text-void dark:text-whisper mb-1">
                          {product.name}
                        </h3>
                        <p className="text-sm font-medium" style={{ color: product.accent }}>
                          {product.tagline}
                        </p>
                      </div>
                      <span
                        className="text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0"
                        style={{
                          background: `${status.color}15`,
                          color: status.color,
                          border: `1px solid ${status.color}30`,
                        }}
                      >
                        {status.label}
                      </span>
                    </div>

                    <p className="text-sm text-void/55 dark:text-whisper/55 leading-relaxed mb-5">
                      {product.description}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {product.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-void/50 dark:text-whisper/50">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                            style={{ color: product.accent }}>
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          {f}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={product.href}
                      className="
                        inline-flex items-center gap-1.5 text-sm font-medium
                        transition-all duration-150 group-hover:gap-2.5
                      "
                      style={{ color: product.accent }}
                    >
                      Learn more
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
