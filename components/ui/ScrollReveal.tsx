'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  once?: boolean
}

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-80px 0px' })

  const directions = {
    up:    { y: 32, x: 0 },
    down:  { y: -32, x: 0 },
    left:  { x: 32, y: 0 },
    right: { x: -32, y: 0 },
    none:  { x: 0, y: 0 },
  }

  const initial = { opacity: 0, ...directions[direction] }
  const animate = isInView
    ? { opacity: 1, x: 0, y: 0 }
    : initial

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
