'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CldImage } from 'next-cloudinary'
import { GridOverlay, GlowOrb, SystemArchBar } from '@/components/ui/VisualPrimitives'

// ─── Footer data ──────────────────────────────────────────────

const FOOTER_LINKS = {
  Products: [
    { label: 'Platforms overview',  href: '/products/platforms' },
    { label: 'CreatorOS',           href: '/products/platforms/creator-os' },
    { label: 'CommerceOS',          href: '/products/platforms/commerce-os' },
    { label: 'BeautyOS',            href: '/products/platforms/beauty-os' },
    { label: 'Z3ymo Pulse',         href: '/ai-agents/pulse' },
  ],
  Solutions: [
    { label: 'All solutions',       href: '/solutions' },
    { label: 'Creators & Coaches',  href: '/solutions/creators' },
    { label: 'Fashion brands',      href: '/solutions/fashion' },
    { label: 'Beauty businesses',   href: '/solutions/beauty' },
    { label: 'Restaurants',         href: '/solutions/food' },
  ],
  Services: [
    { label: 'All services',        href: '/services' },
    { label: 'Web & mobile apps',   href: '/services/web-mobile' },
    { label: 'AI agent development',href: '/services/ai-agents' },
    { label: 'Tech consultation',   href: '/services/tech-consultation' },
    { label: 'Product strategy',    href: '/services/product-strategy' },
  ],
  Company: [
    { label: 'About Z3ymo',         href: '/about' },
    { label: 'Blog',                href: '/blog' },
    { label: 'Portfolio',           href: '/portfolio' },
    { label: 'Investors',           href: '/investors' },
    { label: 'Privacy policy',      href: '/privacy' },
  ],
}

// ─── Component ────────────────────────────────────────────────

export default function Footer() {
  const year = new Date().getFullYear()
  const [bgError, setBgError] = useState(false)

  return (
    <footer className="relative overflow-hidden bg-[#08080C]">

      {/* ── Cloudinary background image ── */}
      <div className="absolute inset-0 pointer-events-none">
        {!bgError && (
          <CldImage
            src="/footer-background_mwtzsl"
            fill
            alt=""
            className="object-cover object-top opacity-[1]"
            sizes="100vw"
            
            priority={false}
            onError={() => setBgError(true)}
          />
        )}
        {/* Gradient overlay: dark top fade, very dark bottom */}
        <div className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, #08080C 0%, rgba(8,8,12,0.55) 40%, rgba(8,8,12,0.8) 75%, #08080C 100%)',
          }} />
      </div>

      {/* Grid overlay */}
      <GridOverlay opacity={0.025} />

      {/* Glow orbs */}
      <GlowOrb color="#C0392B" x="15%" y="30%" size="45%" intensity={0.06} />
      <GlowOrb color="#1B998B" x="80%" y="60%" size="40%" intensity={0.05} />

      {/* ── Content ── */}
      <div className="relative z-10">

        {/* System architecture bar — top decoration */}
        <div className="border-b border-white/5 py-5 px-6">
          <SystemArchBar className="max-w-3xl mx-auto" />
        </div>

        {/* Main footer body */}
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">

            {/* Brand column */}
            <div>
              <Link href="/"
                className="font-display font-bold text-2xl text-white tracking-tight hover:text-crimson transition-colors inline-block mb-4">
                Z3ymo
              </Link>
              <p className="text-sm text-white/40 leading-relaxed max-w-60 mb-6">
                The platform engineering partner for modern businesses across Africa and beyond.
              </p>

              {/* Consultation CTA */}
              <Link href="/services/consultation"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-crimson text-white text-xs font-semibold hover:bg-crimson/90 hover:shadow-[0_0_24px_rgba(192,57,43,0.35)] transition-all shadow-md shadow-crimson/20">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />
                </svg>
                Book Consultation
              </Link>
            </div>

            {/* Link columns */}
            {(Object.entries(FOOTER_LINKS) as [string, typeof FOOTER_LINKS.Products][]).map(([group, links]) => (
              <div key={group}>
                <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-white/25 mb-4">
                  {group}
                </p>
                <ul className="space-y-2.5">
                  {links.map(({ label, href }) => (
                    <li key={href}>
                      <Link href={href}
                        className="text-sm text-white/45 hover:text-white/80 transition-colors">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/6 px-6 py-5">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/25">
              © {year} Z3ymo. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <Link href="/privacy"
                className="text-xs text-white/25 hover:text-white/50 transition-colors">
                Privacy
              </Link>
              <Link href="/terms"
                className="text-xs text-white/25 hover:text-white/50 transition-colors">
                Terms
              </Link>
              <Link href="/investors"
                className="text-xs text-white/25 hover:text-white/50 transition-colors">
                Investors
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
