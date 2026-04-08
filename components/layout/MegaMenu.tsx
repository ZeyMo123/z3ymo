'use client'

import { motion } from 'framer-motion'

export default function MegaMenu({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="
        absolute top-full left-1/2 -translate-x-1/2 mt-3
        w-230 max-w-[95vw]
        rounded-2xl
        bg-whisper dark:bg-void-800
        border border-void/8 dark:border-whisper/8
        backdrop-blur-xl
        shadow-xl shadow-void/10
        p-6
        z-50
      "
    >
      {children}
    </motion.div>
  )
}