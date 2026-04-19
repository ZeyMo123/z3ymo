'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CONSULTATION_PACKAGES, DECISION_PATHS } from '@/lib/data/consultation-packages'

// ─── SVG icons ────────────────────────────────────────────────

const CheckIcon = ({ color }: { color: string }) => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2.5" strokeLinecap="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const XIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
    className="opacity-25">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const ClockIcon = ({ color }: { color: string }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const ArrowRight = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

const ZapIcon = ({ color }: { color: string }) => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2.5" strokeLinecap="round">
    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)

// ─── Individual package card ───────────────────────────────────

function PackageCard({
  pkg,
  index,
  featured = false,
  dark = false,
}: {
  pkg:       typeof CONSULTATION_PACKAGES[0]
  index:     number
  featured?: boolean
  dark?:     boolean
}) {
  const [hovered, setHovered] = useState(false)

  const borderColor = hovered
    ? (featured
        ? `${pkg.accent}70`
        : dark ? 'rgba(255,255,255,0.14)' : 'rgba(10,10,15,0.15)')
    : (featured
        ? `${pkg.accent}45`
        : dark ? 'rgba(255,255,255,0.07)' : 'rgba(10,10,15,0.08)')

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
      whileHover={{ scale: 1.015, y: -4 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        boxShadow: featured
          ? `0 0 48px ${pkg.accent}22, 0 4px 24px rgba(0,0,0,0.35)`
          : dark ? '0 4px 24px rgba(0,0,0,0.35)' : '0 2px 16px rgba(0,0,0,0.08)',
      }}
      className={[
        'relative flex flex-col rounded-3xl overflow-hidden',
        'backdrop-blur-xl transition-all duration-300',
        dark ? 'bg-white/[0.03]' : 'bg-white dark:bg-white/[0.03]',
      ].join(' ')}
    >
      {/* Border overlay — driven by hover state, no style tags needed */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-3xl border pointer-events-none transition-colors duration-300"
        style={{ borderColor }}
      />

      {/* Accent top bar */}
      <div className="h-[3px] w-full flex-shrink-0"
        style={{ background: `linear-gradient(90deg, ${pkg.accent}, ${pkg.accent}40)` }} />

      {/* Inner glow for featured */}
      {featured && (
        <div className="absolute inset-0 pointer-events-none rounded-3xl"
          style={{ background: `radial-gradient(ellipse 80% 40% at 50% 0%, ${pkg.accent}10 0%, transparent 60%)` }} />
      )}

      <div className="flex flex-col flex-1 p-7 relative z-10">

        {/* Label + title + price */}
        <div className="mb-5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase mb-4"
            style={{ background: `${pkg.accent}15`, color: pkg.accent }}>
            {pkg.id === 'free' && <ZapIcon color={pkg.accent} />}
            {pkg.label}
          </div>

          <h3 className={`font-display font-bold text-xl mb-1 ${dark ? 'text-white' : 'text-void dark:text-white'}`}>
            {pkg.title}
          </h3>
          <p className={`text-sm mb-4 leading-relaxed ${dark ? 'text-white/45' : 'text-void/50 dark:text-white/45'}`}>
            {pkg.explanation}
          </p>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="font-display font-bold text-[1.6rem] leading-none"
              style={{ color: pkg.accent }}>
              {pkg.price}
            </span>
            <span className={`text-xs ${dark ? 'text-white/30' : 'text-void/30 dark:text-white/30'}`}>
              {pkg.priceNote}
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs"
            style={{ color: `${pkg.accent}90` }}>
            <ClockIcon color={pkg.accent} />
            {pkg.duration}
          </div>
        </div>

        {/* Divider */}
        <div className={`h-px mb-5 ${dark ? 'bg-white/[0.07]' : 'bg-void/[0.07] dark:bg-white/[0.07]'}`} />

        {/* Includes */}
        <div className="mb-5 flex-1">
          <p className={`text-[10px] font-semibold uppercase tracking-wider mb-3 ${dark ? 'text-white/25' : 'text-void/25 dark:text-white/25'}`}>
            What's included
          </p>
          <div className="space-y-2.5">
            {pkg.includes.map((item) => (
              <div key={item} className="flex items-start gap-2.5 text-sm">
                <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: `${pkg.accent}14` }}>
                  <CheckIcon color={pkg.accent} />
                </div>
                <span className={dark ? 'text-white/60' : 'text-void/60 dark:text-white/60'}>
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Not included (free tier) */}
          {pkg.notIncludes && (
            <div className="mt-4 space-y-2">
              <p className={`text-[10px] font-semibold uppercase tracking-wider mb-2 ${dark ? 'text-white/18' : 'text-void/18 dark:text-white/18'}`}>
                Not included
              </p>
              {pkg.notIncludes.map((item) => (
                <div key={item} className="flex items-start gap-2.5 text-xs">
                  <div className="flex-shrink-0 mt-0.5"><XIcon /></div>
                  <span className={dark ? 'text-white/30' : 'text-void/30 dark:text-white/30'}>{item}</span>
                </div>
              ))}
            </div>
          )}

          {/* Deliverable */}
          {pkg.deliverable && (
            <div className="mt-4 p-3.5 rounded-xl"
              style={{ background: `${pkg.accent}08`, border: `1px solid ${pkg.accent}18` }}>
              <p className="text-[10px] font-semibold uppercase tracking-wider mb-1.5"
                style={{ color: `${pkg.accent}cc` }}>
                Deliverable
              </p>
              <p className={`text-xs leading-relaxed ${dark ? 'text-white/50' : 'text-void/55 dark:text-white/50'}`}>
                {pkg.deliverable}
              </p>
            </div>
          )}
        </div>

        {/* Trust line */}
        {pkg.trustLine && (
          <p className={`text-xs italic leading-relaxed mb-5 border-l-2 pl-3 ${dark ? 'text-white/35' : 'text-void/35 dark:text-white/35'}`}
            style={{ borderColor: `${pkg.accent}35` }}>
            {pkg.trustLine}
          </p>
        )}

        {/* CTA button */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
          <Link href={pkg.href}
            className="flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-200"
            style={{
              background:  pkg.requiresPayment
                ? `linear-gradient(135deg, ${pkg.accent}, ${pkg.accent}cc)`
                : `${pkg.accent}14`,
              color:        pkg.requiresPayment ? '#ffffff' : pkg.accent,
              boxShadow:    pkg.requiresPayment ? `0 4px 20px ${pkg.accent}35` : 'none',
            }}>
            {pkg.cta}
            <ArrowRight />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}

// ─── Decision helper ───────────────────────────────────────────

function DecisionHelper({ dark = false }: { dark?: boolean }) {
  return (
    <div className={[
      'mt-14 rounded-3xl border p-7 sm:p-8',
      dark
        ? 'border-white/[0.07] bg-white/[0.025] backdrop-blur-xl'
        : 'border-void/8 dark:border-white/[0.07] bg-void/[0.015] dark:bg-white/[0.025] backdrop-blur-xl',
    ].join(' ')}>
      <div className="text-center mb-7">
        <h3 className={`font-display font-bold text-xl mb-2 ${dark ? 'text-white' : 'text-void dark:text-white'}`}>
          Not sure which one to choose?
        </h3>
        <p className={`text-sm ${dark ? 'text-white/45' : 'text-void/50 dark:text-white/45'}`}>
          Start with the free consultation. We'll listen and guide you to the right next step.
        </p>
      </div>

      <div className="space-y-3 mb-7">
        {DECISION_PATHS.map((path) => (
          <Link key={path.type} href={path.href}
            className={[
              'flex items-center justify-between gap-4 p-4 rounded-2xl border transition-all group',
              dark
                ? 'border-white/[0.06] hover:border-white/12 bg-white/[0.02] hover:bg-white/[0.035]'
                : 'border-void/8 dark:border-white/[0.06] hover:border-void/16 dark:hover:border-white/12 bg-white dark:bg-white/[0.02]',
            ].join(' ')}>
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                style={{ background: path.accent }} />
              <div>
                <p className={`text-sm italic mb-0.5 ${dark ? 'text-white/40' : 'text-void/40 dark:text-white/40'}`}>
                  If you're thinking: {path.thought}
                </p>
                <p className="text-sm font-semibold" style={{ color: path.accent }}>
                  → {path.action}
                </p>
              </div>
            </div>
            <span className={`flex-shrink-0 transition-colors group-hover:text-crimson ${dark ? 'text-white/18' : 'text-void/18 dark:text-white/18'}`}>
              <ArrowRight />
            </span>
          </Link>
        ))}
      </div>

      <div className={`text-center pt-5 border-t ${dark ? 'border-white/[0.07]' : 'border-void/8 dark:border-white/[0.07]'}`}>
        <p className={`text-xs mb-4 ${dark ? 'text-white/35' : 'text-void/35 dark:text-white/35'}`}>
          Still unsure? The free call costs nothing and commits you to nothing.
        </p>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="inline-block">
          <Link href="/services/consultation/bookfreeconsultation"
            className={[
              'inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all',
              dark
                ? 'bg-white text-[#0B0B0F] hover:bg-white/90'
                : 'bg-void dark:bg-white text-whisper dark:text-[#0B0B0F] hover:opacity-90',
            ].join(' ')}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />
            </svg>
            Book Free Consultation
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

// ─── Main section component ────────────────────────────────────

interface ConsultationPackagesProps {
  showHeader?:        boolean
  showDecisionHelper?: boolean
  className?:         string
  /** Dark mode — used on dark-background pages like consultation hub */
  dark?:              boolean
}

export default function ConsultationPackages({
  showHeader         = true,
  showDecisionHelper = true,
  className          = 'py-24 px-6',
  dark               = false,
}: ConsultationPackagesProps) {
  return (
    <section className={className} id="consultation-packages">
      <div className="max-w-6xl mx-auto">

        {showHeader && (
          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-xs font-medium tracking-[0.2em] uppercase mb-4 ${dark ? 'text-white/35' : 'text-void/40 dark:text-white/35'}`}>
              Consultation packages
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.07 }}
              className={`font-display font-bold text-[clamp(2rem,4.5vw,3rem)] mb-3 ${dark ? 'text-white' : 'text-void dark:text-white'}`}>
              Choose your starting point
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 }}
              className={`max-w-xl mx-auto text-sm leading-relaxed ${dark ? 'text-white/45' : 'text-void/50 dark:text-white/45'}`}>
              Every engagement starts with a conversation. Choose the level that matches where you are right now.
            </motion.p>
          </div>
        )}

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CONSULTATION_PACKAGES.map((pkg, i) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              index={i}
              featured={pkg.id === 'tech'}
              dark={dark}
            />
          ))}
        </div>

        {showDecisionHelper && <DecisionHelper dark={dark} />}
      </div>
    </section>
  )
}
