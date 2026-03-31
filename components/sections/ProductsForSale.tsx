'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ui/ScrollReveal'
import GlassCard from '@/components/ui/GlassCard'
import ContactDrawer from '@/components/ui/ContactDrawer'
import Link from 'next/link'

const PRODUCTS = [
  {
    id: 'company-profile',
    name: 'Company profile site',
    tagline: 'Your brand, online — professionally.',
    price: 'From $200',
    desc: 'A polished, multi-page company website with services, team, contact, and SEO-ready structure.',
    tech: ['Next.js', 'Tailwind', 'PWA'],
    accent: '#C0392B',
    deliverable: '5–7 pages · Mobile-first · SEO ready',
  },
  {
    id: 'agency-website',
    name: 'Agency website',
    tagline: 'Convert visitors into clients.',
    price: 'From $350',
    desc: 'Conversion-optimized agency site with portfolio showcase, case studies, pricing, and client CTAs.',
    tech: ['Next.js', 'Framer Motion', 'TypeScript'],
    accent: '#1B998B',
    deliverable: '7–10 pages · Animated · Portfolio-ready',
  },
  {
    id: 'portfolio-site',
    name: 'Portfolio site',
    tagline: 'Stand out. Get hired.',
    price: 'From $150',
    desc: 'A striking personal portfolio for developers, designers, and creatives — with project showcases and a contact system.',
    tech: ['Next.js', 'MDX', 'Tailwind'],
    accent: '#C9A84C',
    deliverable: '4–6 pages · Dark mode · Blog ready',
  },
  {
    id: 'landing-page',
    name: 'Landing page',
    tagline: 'One page. One goal. Maximum conversions.',
    price: 'From $120',
    desc: 'A high-converting single-page site for product launches, campaigns, or lead generation.',
    tech: ['Next.js', 'A/B ready', 'Analytics'],
    accent: '#C0392B',
    deliverable: 'Single page · Fast as lightning · CTA focused',
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
