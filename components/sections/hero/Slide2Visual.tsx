'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ─── Device stages ───────────────────────────── */
type DeviceStage = 'desktop' | 'tablet' | 'mobile'

const STAGES: DeviceStage[] = ['desktop', 'tablet', 'mobile']
const STAGE_DURATION = 3200 // ms per stage

/* ─── Device dimensions ───────────────────────── */
const DEVICE_DIMS: Record<DeviceStage, { w: number; h: number; rx: number; label: string }> = {
  desktop: { w: 320, h: 200, rx: 10, label: 'Web App' },
  tablet:  { w: 220, h: 280, rx: 16, label: 'Tablet App' },
  mobile:  { w: 140, h: 270, rx: 28, label: 'Mobile App' },
}

/* ─── Screen contents ─────────────────────────── */
function DesktopContent() {
  const bars = [65, 85, 45, 92, 70, 55, 80, 38]
  return (
    <div className="w-full h-full bg-[#0d0d18] flex flex-col overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/8">
        <div className="flex gap-1.5">
          <div className="w-12 h-1.5 rounded-full bg-crimson/60" />
          <div className="w-8 h-1.5 rounded-full bg-white/10" />
          <div className="w-10 h-1.5 rounded-full bg-white/10" />
        </div>
        <div className="flex gap-1">
          <div className="w-4 h-1 rounded-full bg-emerald/50" />
          <div className="w-4 h-1 rounded-full bg-white/15" />
        </div>
      </div>

      {/* Sidebar + content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-10 border-r border-white/5 flex flex-col items-center gap-2 py-2">
          {["crimson", "emerald", "gold", "white"].map((color, i) => (
            <div key={i} className={`w-4 h-4 rounded-md ${i === 0 ? 'bg-crimson/50' : 'bg-white/8'}`} />
          ))}
        </div>
        {/* Main area */}
        <div className="flex-1 p-2 flex flex-col gap-2">
          {/* Stat row */}
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { label: 'Revenue', val: '$4.2K', color: '#C0392B' },
              { label: 'Users', val: '1,284', color: '#1B998B' },
              { label: 'Tasks', val: '94%', color: '#C9A84C' },
            ].map((s) => (
              <div key={s.label} className="bg-white/4 rounded-md p-1.5">
                <div className="text-[5px] text-white/40 mb-0.5">{s.label}</div>
                <div className="text-[8px] font-bold" style={{ color: s.color }}>{s.val}</div>
              </div>
            ))}
          </div>
          {/* Chart */}
          <div className="bg-white/3 rounded-md p-1.5 flex-1">
            <div className="flex items-end gap-0.5 h-full">
              {bars.map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    background: i % 3 === 0 ? '#C0392B' : i % 3 === 1 ? '#1B998B' : '#C9A84C',
                    opacity: 0.7,
                    height: `${h}%`,
                    transformOrigin: 'bottom',
                  }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: h / 100 }}
                  transition={{ delay: i * 0.06, duration: 0.5, ease: 'easeOut' }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TabletContent() {
  const apps = [
    { icon: '◈', name: 'Analytics', color: '#C0392B' },
    { icon: '◉', name: 'CRM', color: '#1B998B' },
    { icon: '✦', name: 'AI Chat', color: '#C9A84C' },
    { icon: '▣', name: 'Reports', color: '#C0392B' },
    { icon: '◇', name: 'Tasks', color: '#1B998B' },
    { icon: '⬡', name: 'Files', color: '#C9A84C' },
  ]
  return (
    <div className="w-full h-full bg-[#0d0d18] flex flex-col overflow-hidden">
      {/* Status bar */}
      <div className="flex justify-between items-center px-3 py-1.5 border-b border-white/5">
        <span className="text-[6px] text-white/40">9:41</span>
        <div className="flex gap-1">
          {[...Array(4)].map((_, i) => <div key={i} className={`w-1 rounded-full ${i < 3 ? 'bg-white/50' : 'bg-white/15'}`} style={{ height: `${5 + i}px` }} />)}
        </div>
      </div>
      <div className="px-3 py-2">
        <div className="text-[7px] font-bold text-white/70 mb-1">Good morning ✦</div>
        <div className="text-[6px] text-white/30">3 tasks pending</div>
      </div>
      {/* App grid */}
      <div className="grid grid-cols-3 gap-2 px-3 pb-3">
        {apps.map((app) => (
          <div key={app.name} className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg"
              style={{ background: `${app.color}20`, border: `1px solid ${app.color}30` }}>
              <span style={{ color: app.color, fontSize: '14px' }}>{app.icon}</span>
            </div>
            <span className="text-[6px] text-white/40">{app.name}</span>
          </div>
        ))}
      </div>
      {/* Recent activity */}
      <div className="px-3 flex-1">
        <div className="text-[6px] text-white/25 mb-1.5">Recent</div>
        {[
          { label: 'New order #284', color: '#1B998B' },
          { label: 'AI report ready', color: '#C9A84C' },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-1.5 mb-1.5">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: item.color }} />
            <span className="text-[6px] text-white/50">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function MobileContent() {
  return (
    <div className="w-full h-full bg-[#0d0d18] flex flex-col overflow-hidden">
      {/* Notch */}
      <div className="flex justify-center pt-2 pb-1">
        <div className="w-14 h-1.5 rounded-full bg-white/10" />
      </div>
      {/* Header */}
      <div className="px-3 py-1.5 flex items-center justify-between">
        <span className="text-[8px] font-bold text-white/80">Z3ymo</span>
        <div className="w-4 h-4 rounded-full bg-crimson/20 border border-crimson/30" />
      </div>
      {/* Hero card */}
      <div className="mx-2 rounded-xl p-2.5 mb-2" style={{ background: 'linear-gradient(135deg, rgba(192,57,43,0.25), rgba(27,153,139,0.15))' }}>
        <div className="text-[7px] text-white/50 mb-0.5">Today</div>
        <div className="text-[11px] font-bold text-white mb-1">3 updates</div>
        <div className="flex gap-1">
          {['#C0392B', '#1B998B', '#C9A84C'].map((c, i) => (
            <div key={i} className="flex-1 h-1 rounded-full" style={{ background: c, opacity: 0.6 }} />
          ))}
        </div>
      </div>
      {/* List */}
      {[
        { icon: '◈', label: 'New client enquiry', sub: '2 min ago', color: '#C0392B' },
        { icon: '✦', label: 'AI agent deployed', sub: '1 hr ago', color: '#1B998B' },
        { icon: '◉', label: 'Revenue: $1,240', sub: 'Today', color: '#C9A84C' },
      ].map((item, i) => (
        <div key={i} className="flex items-center gap-2 mx-2 mb-1.5">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs shrink-0"
            style={{ background: `${item.color}20` }}>
            <span style={{ color: item.color, fontSize: '9px' }}>{item.icon}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[7px] text-white/70 truncate">{item.label}</div>
            <div className="text-[6px] text-white/30">{item.sub}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ─── Device frame ────────────────────────────── */
function DeviceFrame({ stage, children }: { stage: DeviceStage; children: React.ReactNode }) {
  const d = DEVICE_DIMS[stage]

  return (
    <motion.div
      animate={{ width: d.w, height: d.h, borderRadius: d.rx + 8 }}
      transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
      className="relative overflow-hidden shadow-2xl"
      style={{
        background: '#0a0a0f',
        border: '2px solid rgba(240,238,248,0.1)',
        boxShadow: '0 0 60px rgba(192,57,43,0.15), 0 32px 64px rgba(0,0,0,0.5)',
      }}
    >
      {/* Notch/camera for tablet/mobile */}
      {(stage === 'tablet' || stage === 'mobile') && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-1.5 bg-[#0a0a0f] z-20 rounded-b-md" />
      )}

      {/* Screen content */}
      <motion.div
        key={stage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="w-full h-full"
      >
        {children}
      </motion.div>

      {/* Screen glare */}
      <div className="absolute inset-0 pointer-events-none rounded-inherit"
        style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%)' }} />
    </motion.div>
  )
}

/* ─── Main Component ──────────────────────────── */
export default function Slide2Visual({ isActive }: { isActive: boolean }) {
  const [stage, setStage] = useState<DeviceStage>('desktop')
  const [stageIdx, setStageIdx] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!isActive) return

    const advance = () => {
      setStageIdx((prev) => {
        const next = (prev + 1) % STAGES.length
        setStage(STAGES[next])
        return next
      })
    }

    timerRef.current = setInterval(advance, STAGE_DURATION)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [isActive])

  const currentDims = DEVICE_DIMS[stage]

  const screenContent: Record<DeviceStage, React.ReactNode> = {
    desktop: <DesktopContent />,
    tablet:  <TabletContent />,
    mobile:  <MobileContent />,
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center gap-6">
      {/* Stage indicator dots */}
      <div className="flex gap-2">
        {STAGES.map((s, i) => (
          <button
            key={s}
            onClick={() => { setStage(s); setStageIdx(i) }}
            className="transition-all duration-300 rounded-full cursor-pointer"
            style={{
              width: i === stageIdx ? 20 : 6,
              height: 6,
              background: i === stageIdx ? '#C0392B' : 'rgba(192,57,43,0.25)',
            }}
          />
        ))}
      </div>

      {/* Device */}
      <AnimatePresence mode="wait">
        <DeviceFrame key={stage} stage={stage}>
          {screenContent[stage]}
        </DeviceFrame>
      </AnimatePresence>

      {/* Stage label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={stage}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2"
        >
          <div className="w-4 h-px bg-crimson/50" />
          <span className="text-xs font-medium text-void/50 dark:text-whisper/50 tracking-wider uppercase">
            {currentDims.label}
          </span>
          <div className="w-4 h-px bg-crimson/50" />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
