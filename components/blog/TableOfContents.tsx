'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface Heading {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  headings: Heading[]
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
            break
          }
        }
      },
      { rootMargin: '-20% 0% -70% 0%' }
    )

    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length < 3) return null

  return (
    <nav aria-label="Table of contents" className="sticky top-28">
      <p className="text-xs font-semibold tracking-[0.14em] uppercase text-void/40 dark:text-whisper/40 mb-4">
        Contents
      </p>
      <ul className="space-y-1">
        {headings.map(({ id, text, level }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={cn(
                'block text-sm leading-snug py-1',
                'transition-colors duration-150',
                level === 3 && 'pl-3',
                active === id
                  ? 'text-crimson font-medium'
                  : 'text-void/40 dark:text-whisper/40 hover:text-void dark:hover:text-whisper',
              )}
            >
              {active === id && (
                <span className="inline-block w-1 h-1 rounded-full bg-crimson mr-2 mb-0.5" />
              )}
              {text}
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-8 pt-6 border-t border-void/8 dark:border-whisper/8">
        <p className="text-xs font-semibold tracking-[0.14em] uppercase text-void/30 dark:text-whisper/30 mb-3">
          Share
        </p>
        <div className="flex gap-2">
          {['X', 'LinkedIn', 'Copy link'].map((s) => (
            <button
              key={s}
              className="
                text-xs px-3 py-1.5 rounded-lg
                border border-void/10 dark:border-whisper/10
                text-void/40 dark:text-whisper/40
                hover:border-crimson/40 hover:text-crimson
                transition-colors duration-150 cursor-pointer
              "
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
