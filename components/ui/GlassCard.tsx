'use client'

import { useRef, useState } from 'react'
import { motion, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  tilt?: boolean
  accent?: 'crimson' | 'emerald' | 'gold' | 'none'
  onClick?: () => void
}

export default function GlassCard({
  children,
  className,
  tilt = false,
  accent = 'none',
  onClick,
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const rotX = useSpring(0, { stiffness: 150, damping: 20 })
  const rotY = useSpring(0, { stiffness: 150, damping: 20 })
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 })

  const accentBorders = {
    crimson: 'border-t-crimson/40',
    emerald: 'border-t-emerald/40',
    gold:    'border-t-gold/40',
    none:    '',
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!tilt || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width  - 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5
    rotX.set(-y * 8)
    rotY.set(x * 8)
    setGlowPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top)  / rect.height) * 100,
    })
  }

  const handleMouseLeave = () => {
    rotX.set(0)
    rotY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={tilt ? { rotateX: rotX, rotateY: rotY, transformPerspective: 1000 } : {}}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={tilt ? { scale: 1.01 } : {}}
      className={cn(
        'relative rounded-2xl overflow-hidden',
        'glass',
        'border border-t-2',
        accentBorders[accent],
        'border-void/8 dark:border-whisper/8',
        onClick && 'cursor-pointer',
        className,
      )}
    >
      {/* Inner glow on hover */}
      {tilt && (
        <div
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
          style={{
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(192,57,43,0.08) 0%, transparent 60%)`,
          }}
        />
      )}
      {children}
    </motion.div>
  )
}
