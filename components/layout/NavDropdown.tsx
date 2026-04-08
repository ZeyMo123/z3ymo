'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import MegaMenu from './MegaMenu'
import { NAV_CONFIG } from '@/lib/data/nav.config'
import Link from 'next/link'

type Props = {
  label: string
}

export default function NavDropdown({ label }: Props) {
  const [open, setOpen] = useState(false)

  const handleEnter = () => setOpen(true)
  const handleLeave = () => setOpen(false)

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="relative"
    >
      <button
        className="
          px-3 py-1.5 rounded-lg text-sm
          text-void/60 dark:text-whisper/60
          hover:text-void dark:hover:text-whisper
          transition-colors
        "
      >
        {label}
      </button>

      <AnimatePresence>
        {open && (
          <MegaMenu>
            {label === 'Products' && <ProductsMenu />}
            {label === 'Solutions' && <SolutionsMenu />}
            {label === 'Services' && <ServicesMenu />}
            {label === 'AI Agents' && <AIMenu />}
          </MegaMenu>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ---------------- MENUS ---------------- */

function ProductsMenu() {
  return (
    <div className="grid grid-cols-2 gap-8">
      {/* Platforms */}
      <div>
        <p className="text-xs uppercase opacity-50 mb-3">Platforms</p>
        {NAV_CONFIG.products.platforms.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="block py-2 text-sm hover:text-[#C9A84C]"
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Z3ymo Products */}
      <div>
        <p className="text-xs uppercase opacity-50 mb-3">Z3ymo Products</p>
        {NAV_CONFIG.products.z3ymoProducts.map((item) => (
          <div key={item.name} className="flex justify-between py-2 text-sm">
            <span>{item.name}</span>
            <span className="text-xs opacity-50">{item.tag}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SolutionsMenu() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {NAV_CONFIG.solutions.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="
            p-3 rounded-xl
            hover:bg-void/5 dark:hover:bg-whisper/5
            transition
          "
        >
          <p className="text-sm font-medium">{item.name}</p>
          <p className="text-xs opacity-50">Built for your industry</p>
        </Link>
      ))}
    </div>
  )
}

function ServicesMenu() {
  return (
    <div className="grid grid-cols-3 gap-6 text-sm">
      <div>
        <p className="text-xs uppercase opacity-50 mb-3">Software</p>
        {NAV_CONFIG.services.software.map((item) => (
          <p key={item.name} className="py-1">{item.name}</p>
        ))}
      </div>

      <div>
        <p className="text-xs uppercase opacity-50 mb-3">AI</p>
        {NAV_CONFIG.services.ai.map((item) => (
          <p key={item.name} className="py-1">{item.name}</p>
        ))}
      </div>

      <div>
        <p className="text-xs uppercase opacity-50 mb-3">Consulting</p>
        {NAV_CONFIG.services.consulting.map((item) => (
          <p key={item.name} className="py-1">{item.name}</p>
        ))}
      </div>
    </div>
  )
}

function AIMenu() {
  return (
    <div className="space-y-4">
      {NAV_CONFIG.aiAgents.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="
            block p-3 rounded-xl
            hover:bg-void/5 dark:hover:bg-whisper/5
          "
        >
          <p className="text-sm font-medium">{item.name}</p>
          <p className="text-xs opacity-50">{item.desc}</p>
        </Link>
      ))}
    </div>
  )
}