'use client'

import { useRef, useState } from 'react'
import { motion, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface MagneticButtonProps {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit'
  size?: 'sm' | 'md' | 'lg'
}

export default function MagneticButton({
  children,
  onClick,
  href,
  variant = 'primary',
  className,
  disabled,
  type = 'button',
  size = 'md',
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useSpring(0, { stiffness: 200, damping: 20 })
  const y = useSpring(0, { stiffness: 200, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * 0.35)
    y.set((e.clientY - cy) * 0.35)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  const sizes = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-7 py-3.5 text-sm',
    lg: 'px-9 py-4 text-base',
  }

  const variants = {
    primary: cn(
      'bg-crimson text-whisper border-transparent',
      'hover:bg-crimson-400',
      'shadow-[0_0_24px_rgba(192,57,43,0.3)]',
      'hover:shadow-[0_0_40px_rgba(192,57,43,0.5)]',
    ),
    secondary: cn(
      'bg-transparent text-void dark:text-whisper',
      'border border-void/20 dark:border-whisper/20',
      'hover:border-crimson/60 hover:text-crimson',
    ),
    ghost: cn(
      'bg-transparent text-whisper/70',
      'border-transparent',
      'hover:text-whisper hover:bg-whisper/5',
    ),
  }

  const baseClass = cn(
    'relative inline-flex items-center justify-center gap-2',
    'font-medium rounded-full cursor-pointer',
    'transition-colors duration-200',
    'outline-none focus-visible:ring-2 focus-visible:ring-crimson',
    'disabled:opacity-40 disabled:cursor-not-allowed',
    sizes[size],
    variants[variant],
    className,
  )

  const motionProps = {
    style: { x, y },
    onMouseMove: handleMouseMove,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: handleMouseLeave,
    whileTap: { scale: 0.97 },
  }

  if (href) {
    return (
      <motion.span {...motionProps} className="inline-block">
        <Link href={href} className={baseClass}>
          {children}
        </Link>
      </motion.span>
    )
  }

  return (
    <motion.button
      {...motionProps}
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClass}
    >
      {children}
    </motion.button>
  )
}
