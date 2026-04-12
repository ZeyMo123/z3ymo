'use client'

import { motion } from 'framer-motion'
import MagneticButton from '@/components/ui/MagneticButton'
import ContactDrawer from '@/components/ui/ContactDrawer'
import { useState } from 'react'

interface Props {
  name:        string
  headline:    string
  subheadline: string
  accent:      string
  modules:     string[]
}

export default function PlatformHero({ name, headline, subheadline, accent, modules }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <section className="relative pt-36 pb-24 px-6 overflow-hidden">
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 70% 60% at 50% 0%, ${accent}0A 0%, transparent 65%)` }}
        />
        {/* Subtle grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(${accent} 1px, transparent 1px), linear-gradient(90deg, ${accent} 1px, transparent 1px)`,
            backgroundSize: '72px 72px',
          }}
        />

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left — copy */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Platform badge */}
                <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border"
                  style={{ borderColor: `${accent}30`, background: `${accent}08` }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
                  <span className="text-xs font-semibold tracking-wide" style={{ color: accent }}>
                    {name}
                  </span>
                </div>

                <h1 className="font-display font-bold text-[clamp(2.2rem,5vw,3.8rem)] text-void dark:text-whisper leading-[1.05] tracking-tight mb-6">
                  {headline}
                </h1>

                <p className="text-base text-void/55 dark:text-whisper/55 leading-relaxed mb-10 max-w-lg">
                  {subheadline}
                </p>

                <div className="flex flex-wrap gap-3">
                  <MagneticButton onClick={() => setDrawerOpen(true)} variant="primary" size="lg">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="shrink-0">
                      <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />
                    </svg>
                    Book Free Consultation
                  </MagneticButton>
                  <a href="#features"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium border border-void/15 dark:border-whisper/15 text-void/60 dark:text-whisper/60 hover:border-void/30 dark:hover:border-whisper/30 transition-all">
                    Explore Features
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Right — dashboard preview */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative"
            >
              <DashboardPreview modules={modules} accent={accent} name={name} />
            </motion.div>
          </div>
        </div>
      </section>

      <ContactDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}

/* ─── Dashboard preview visual ──────────────────── */
function DashboardPreview({ modules, accent, name }: { modules: string[]; accent: string; name: string }) {
  return (
    <div className="relative">
      {/* Browser chrome */}
      <div
        className="rounded-2xl overflow-hidden shadow-2xl border border-void/10 dark:border-whisper/10"
        style={{ boxShadow: `0 32px 80px ${accent}20, 0 0 0 1px ${accent}10` }}
      >
        {/* Browser top bar */}
        <div className="bg-void/5 dark:bg-whisper/5 px-4 py-3 flex items-center gap-2 border-b border-void/6 dark:border-whisper/6">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-crimson/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-gold/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald/50" />
          </div>
          <div className="flex-1 mx-3 bg-void/8 dark:bg-whisper/8 rounded-md px-3 py-1">
            <span className="text-[10px] text-void/35 dark:text-whisper/35 font-mono">
              app.z3ymo.com/{name.toLowerCase().replace(/\s/g, '-')}
            </span>
          </div>
        </div>

        {/* Dashboard body */}
        <div className="bg-whisper/50 dark:bg-void-900 p-5" style={{ minHeight: 260 }}>
          {/* Sidebar + content */}
          <div className="flex gap-4 h-full">
            {/* Sidebar */}
            <div className="w-32 shrink-0">
              <div className="text-[9px] font-bold tracking-wider uppercase mb-2" style={{ color: accent, opacity: 0.7 }}>
                {name}
              </div>
              <div className="space-y-0.5">
                {modules.map((mod, i) => (
                  <div
                    key={mod}
                    className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[10px] font-medium transition-colors"
                    style={i === 0 ? { background: `${accent}15`, color: accent } : { color: 'rgba(10,10,15,0.4)' }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: i === 0 ? accent : 'currentColor', opacity: i === 0 ? 1 : 0.5 }} />
                    {mod}
                  </div>
                ))}
              </div>
            </div>

            {/* Main content area */}
            <div className="flex-1">
              {/* Stats row */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                {['Revenue', 'Active', 'Growth'].map((label, i) => (
                  <div key={label} className="rounded-xl p-2.5 bg-white/50 dark:bg-void/50 border border-void/6 dark:border-whisper/6">
                    <div className="text-[8px] text-void/40 dark:text-whisper/40 mb-1">{label}</div>
                    <div className="text-xs font-bold" style={{ color: accent }}>
                      {['$4.2K', '1,284', '+32%'][i]}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chart placeholder */}
              <div className="rounded-xl p-3 bg-white/50 dark:bg-void/50 border border-void/6 dark:border-whisper/6 mb-2">
                <div className="text-[8px] text-void/35 dark:text-whisper/35 mb-2">Performance</div>
                <div className="flex items-end gap-0.5 h-10">
                  {[35, 55, 40, 70, 60, 85, 75, 90, 65, 80, 95, 70].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm transition-all"
                      style={{ height: `${h}%`, background: `${accent}${i === 11 ? 'cc' : '40'}` }}
                    />
                  ))}
                </div>
              </div>

              {/* List placeholder */}
              <div className="space-y-1.5">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-white/50 dark:bg-void/50 border border-void/6 dark:border-whisper/6">
                    <div className="w-4 h-4 rounded-md shrink-0" style={{ background: `${accent}20` }} />
                    <div className="flex-1 h-1.5 rounded-full bg-void/8 dark:bg-whisper/8" style={{ width: `${70 - i * 15}%` }} />
                    <div className="w-6 h-1.5 rounded-full" style={{ background: `${accent}40` }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ambient glow under the preview */}
      <div
        className="absolute -inset-6 -z-10 opacity-20 blur-3xl rounded-3xl"
        style={{ background: `radial-gradient(circle, ${accent}, transparent)` }}
      />
    </div>
  )
}
