'use client'

import Link from 'next/link'
import { NAV_CONFIG } from '@/lib/data/nav.config'

export default function MobileMenu({
  close,
}: {
  close: () => void
}) {
  return (
    <div className="p-4 space-y-4">
      {/* Solutions */}
      <div>
        <p className="text-xs uppercase opacity-50 mb-2">Solutions</p>
        {NAV_CONFIG.solutions.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={close}
            className="block py-2 text-sm"
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Platforms */}
      <div>
        <p className="text-xs uppercase opacity-50 mb-2">Platforms</p>
        {NAV_CONFIG.products.platforms.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={close}
            className="block py-2 text-sm"
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* CTA */}
      <button className="w-full py-3 rounded-xl bg-crimson text-white">
        Book Consultation
      </button>
    </div>
  )
}