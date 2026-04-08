'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ui/ScrollReveal'
import GlassCard from '@/components/ui/GlassCard'
import ContactDrawer from '@/components/ui/ContactDrawer'
import Link from 'next/link'

const PRODUCTS = [
  {
    id: 'creator-os',
    name: 'CreatorOS',
    tagline: 'The platform for creators, coaches & consultants.',
    price: 'From $1,200',
    desc: 'Sell courses, manage bookings, sell digital products, and grow your audience — all from one platform built for modern creators.',
    tech: ['Next.js', 'Supabase', 'Stripe'],
    accent: '#C0392B',
    deliverable: 'Course selling · Bookings · Digital products · Analytics',
    industries: ['Coaches', 'Educators', 'Consultants', 'Influencers'],
    features: ['Course & membership system', 'Consultation booking', 'Digital product store', 'AI audience analytics'],
  },
  {
    id: 'commerce-os',
    name: 'CommerceOS',
    tagline: 'E-commerce for modern product brands.',
    price: 'From $1,500',
    desc: 'A full-featured online store with inventory, orders, payments, and AI-powered sales insights — your Shopify alternative with real control.',
    tech: ['Next.js', 'Supabase', 'Stripe', 'OpenAI'],
    accent: '#1B998B',
    deliverable: 'Online store · Order management · AI insights · Marketing',
    industries: ['Clothing', 'Cosmetics', 'Skincare', 'Digital stores'],
    features: ['Product & inventory management', 'Order processing & tracking', 'Customer database & CRM', 'AI sales analytics'],
  },
  {
    id: 'beauty-os',
    name: 'BeautyOS',
    tagline: 'Smart booking & management for salons and spas.',
    price: 'From $900',
    desc: 'End-to-end platform for beauty businesses — from appointment booking and staff scheduling to payments and customer loyalty.',
    tech: ['Next.js', 'Supabase', 'WhatsApp API'],
    accent: '#C9A84C',
    deliverable: 'Booking system · Staff scheduling · Loyalty · Reminders',
    industries: ['Hair salons', 'Nail salons', 'Spas', 'Beauty clinics'],
    features: ['Online booking & calendar', 'Staff schedule management', 'WhatsApp reminders', 'AI demand prediction'],
  },
  {
    id: 'food-os',
    name: 'FoodOS',
    tagline: 'Ordering, reservations & operations for restaurants.',
    price: 'From $1,200',
    desc: 'A complete restaurant platform — online ordering, table reservations, kitchen management, and customer loyalty, all in one system.',
    tech: ['Next.js', 'Supabase', 'Stripe'],
    accent: '#C0392B',
    deliverable: 'Online ordering · Reservations · Kitchen dashboard · Loyalty',
    industries: ['Restaurants', 'Cafés', 'Catering', 'Food delivery'],
    features: ['Online menu & ordering', 'Table reservation system', 'Kitchen display dashboard', 'AI peak hour predictions'],
  },
]

export default function ProductsForSale() {
  const [selected, setSelected] = useState<string | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleEnquire = (productName: string) => {
    setSelected(productName)
    setDrawerOpen(true)
  }

  return (
    <section id="products" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <ScrollReveal>
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-4">
              Ready-made software
            </p>
            <h2 className="font-display font-bold text-[clamp(2rem,5vw,3.5rem)] text-void dark:text-whisper">
              Yours today.
              <br />
              <span className="text-void/40 dark:text-whisper/30">No waiting. No custom build.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p className="text-sm text-void/50 dark:text-whisper/50 max-w-xs text-balance leading-relaxed">
              Every product includes a free consultation before purchase — so it&apos;s always the right fit.
            </p>
          </ScrollReveal>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {PRODUCTS.map((product, i) => (
            <ScrollReveal key={product.id} delay={i * 0.08}>
              <GlassCard tilt className="group h-full card-depth card-shimmer card-interactive">
                {/* Accent top bar */}
                <div
                  className="h-0.5 w-full"
                  style={{ background: `linear-gradient(90deg, ${product.accent}, transparent)` }}
                />

                <div className="p-7">
                  {/* Price badge */}
                  <div className="flex items-start justify-between mb-4">
                    <span
                      className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={{
                        background: `${product.accent}18`,
                        color: product.accent,
                        border: `1px solid ${product.accent}30`,
                      }}
                    >
                      {product.price}
                    </span>
                    <div className="flex gap-1.5">
                      {product.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-void/5 dark:bg-whisper/5 text-void/40 dark:text-whisper/40 border border-void/8 dark:border-whisper/8"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h3 className="font-display font-semibold text-lg text-void dark:text-whisper mb-1">
                    {product.name}
                  </h3>
                  <p className="text-xs font-medium mb-3" style={{ color: product.accent }}>
                    {product.tagline}
                  </p>
                  <p className="text-sm text-void/55 dark:text-whisper/55 leading-relaxed mb-4">
                    {product.desc}
                  </p>

                  {/* Deliverable */}
                  <div className="
                    flex items-center gap-2 text-xs
                    text-void/40 dark:text-whisper/40
                    border-t border-void/8 dark:border-whisper/8
                    pt-4 mb-5
                  ">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {product.deliverable}
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => handleEnquire(product.name)}
                    className="
                      w-full py-2.5 rounded-xl text-sm font-medium
                      border transition-all duration-200
                      cursor-pointer
                      text-void/70 dark:text-whisper/70
                      border-void/12 dark:border-whisper/12
                      hover:border-crimson/50 hover:text-crimson
                      dark:hover:border-crimson/50 dark:hover:text-crimson
                    "
                  >
                    Enquire now →
                  </button>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom link */}
        <ScrollReveal delay={0.2} className="text-center mt-10">
          <Link
            href="/products"
            className="
              inline-flex items-center gap-2 text-sm
              text-void/40 dark:text-whisper/40
              hover:text-crimson transition-colors duration-200
            "
          >
            View all products
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </ScrollReveal>
      </div>

      <ContactDrawer
        open={drawerOpen}
        onClose={() => { setDrawerOpen(false); setSelected(null) }}
        context={selected ?? undefined}
      />
    </section>
  )
}
