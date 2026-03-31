'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import MagneticButton from '@/components/ui/MagneticButton'
import ContactDrawer from '@/components/ui/ContactDrawer'

interface Particle {
  x: number; y: number
  vx: number; vy: number
  size: number
  color: string
  opacity: number
  opacityDir: number
}

const COLORS = ['#C0392B', '#1B998B', '#C9A84C']

export default function Hero() {
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const particles   = useRef<Particle[]>([])
  const mouse       = useRef({ x: -9999, y: -9999 })
  const rafRef      = useRef<number>(0)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const initParticles = useCallback((w: number, h: number) => {
    const count = Math.min(70, Math.floor((w * h) / 14000))
    particles.current = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 1.8 + 0.6,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      opacity: Math.random() * 0.35 + 0.05,
      opacityDir: Math.random() > 0.5 ? 1 : -1,
    }))
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      initParticles(canvas.width, canvas.height)
    }
    resize()

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('resize', resize, { passive: true })
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    const draw = () => {
      const { width: W, height: H } = canvas
      ctx.clearRect(0, 0, W, H)

      const ps = particles.current
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i]

        // Mouse repulsion
        const dx = p.x - mouse.current.x
        const dy = p.y - mouse.current.y
        const dist = Math.hypot(dx, dy)
        if (dist < 130 && dist > 0) {
          const force = ((130 - dist) / 130) * 0.04
          p.vx += (dx / dist) * force
          p.vy += (dy / dist) * force
        }

        // Damping
        p.vx *= 0.98
        p.vy *= 0.98

        // Speed cap
        const spd = Math.hypot(p.vx, p.vy)
        if (spd > 1.5) { p.vx = (p.vx / spd) * 1.5; p.vy = (p.vy / spd) * 1.5 }

        p.x += p.vx
        p.y += p.vy

        // Wrap around edges
        if (p.x < -10) p.x = W + 10
        if (p.x > W + 10) p.x = -10
        if (p.y < -10) p.y = H + 10
        if (p.y > H + 10) p.y = -10

        // Opacity pulse
        p.opacity += 0.002 * p.opacityDir
        if (p.opacity > 0.45 || p.opacity < 0.04) p.opacityDir *= -1

        // Draw dot
        const alpha = Math.round(p.opacity * 255).toString(16).padStart(2, '0')
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color + alpha
        ctx.fill()

        // Draw connections to nearby particles
        for (let j = i + 1; j < ps.length; j++) {
          const p2 = ps[j]
          const cx = p.x - p2.x
          const cy = p.y - p2.y
          const cd = Math.hypot(cx, cy)
          if (cd < 110) {
            const lineOpacity = (1 - cd / 110) * 0.06
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(201,168,76,${lineOpacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [initParticles])

  const headlineWords = [
    { text: 'Built', delay: 0.35 },
    { text: 'different.', delay: 0.5 },
  ]

  const stats = [
    { value: '20+', label: 'Projects' },
    { value: '15+', label: 'Clients' },
    { value: '3',   label: 'Countries' },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* Radial ambient light */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 20% 50%, rgba(192,57,43,0.06) 0%, transparent 70%),
            radial-gradient(ellipse 60% 50% at 80% 50%, rgba(27,153,139,0.06) 0%, transparent 70%)
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center mt-20">

        {/* Eyebrow label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="
            inline-flex items-center gap-2
            text-xs font-medium tracking-[0.18em] uppercase
            text-void/50 dark:text-whisper/40
            mb-8
          "
        >
          <span className="w-8 h-px bg-emerald block" />
          Africa&apos;s premium AI-native software company
          <span className="w-8 h-px bg-emerald block" />
        </motion.p>

        {/* Headline — word by word */}
        <h1 className="
          font-display font-bold
          text-[clamp(3.5rem,10vw,8rem)]
          leading-[0.9] tracking-[-0.04em]
          text-void dark:text-whisper
          mb-4
        ">
          {headlineWords.map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 48, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 0.75,
                delay: w.delay,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block mr-[0.2em]"
            >
              {w.text}
            </motion.span>
          ))}
          <br />
          <motion.span
            initial={{ opacity: 0, y: 48, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.75, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block shimmer-text"
          >
            By design.
          </motion.span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.9 }}
          className="
            text-[clamp(1rem,2.5vw,1.2rem)]
            text-void/55 dark:text-whisper/55
            max-w-2xl mx-auto mb-10
            leading-relaxed font-light
          "
        >
          We build world-class websites, mobile apps, and AI agents —
          priced for African reality, quality for global standards.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton
            onClick={() => setDrawerOpen(true)}
            variant="primary"
            size="lg"
          >
            Book free consultation
          </MagneticButton>

          <MagneticButton href="#portfolio" variant="secondary" size="lg">
            See our work
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </MagneticButton>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="
            flex items-center justify-center
            gap-6 sm:gap-12 mt-16
          "
        >
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-0.5">
              <span className="font-display font-bold text-2xl text-void dark:text-whisper">
                {s.value}
              </span>
              <span className="text-xs tracking-wide text-void/40 dark:text-whisper/40 uppercase">
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-void/30 dark:text-whisper/30">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="
            w-5 h-8 rounded-full
            border border-void/15 dark:border-whisper/15
            flex items-start justify-center pt-1.5
          "
        >
          <div className="w-1 h-2 rounded-full bg-crimson" />
        </motion.div>
      </motion.div>

      <ContactDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </section>
  )
}
