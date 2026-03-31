'use client'

import { useRouter, usePathname } from 'next/navigation'
import { type Category } from '@/lib/supabase/client'

interface BlogFiltersProps {
  categories: Category[]
  active?: string
}

export default function BlogFilters({ categories, active }: BlogFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()

  const setFilter = (slug?: string) => {
    const params = new URLSearchParams()
    if (slug) params.set('category', slug)
    router.push(`${pathname}${params.toString() ? `?${params}` : ''}`)
  }

  return (
    <div className="max-w-6xl mx-auto px-6 mb-10">
      <div className="flex gap-2 flex-wrap">
        {/* All */}
        <button
          onClick={() => setFilter(undefined)}
          className={`
            px-4 py-2 rounded-full text-sm font-medium
            border transition-all duration-150 cursor-pointer
            ${!active
              ? 'bg-void dark:bg-whisper text-whisper dark:text-void border-transparent'
              : 'bg-transparent text-void/50 dark:text-whisper/50 border-void/10 dark:border-whisper/10 hover:border-void/25 dark:hover:border-whisper/25'
            }
          `}
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setFilter(cat.slug)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium
              border transition-all duration-150 cursor-pointer
              ${active === cat.slug
                ? 'border-transparent text-white'
                : 'bg-transparent text-void/50 dark:text-whisper/50 border-void/10 dark:border-whisper/10 hover:border-void/25 dark:hover:border-whisper/25'
              }
            `}
            style={active === cat.slug
              ? { background: cat.color, borderColor: cat.color }
              : {}
            }
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  )
}
