'use client'

// ─────────────────────────────────────────────────────────────────
// hooks/useContentItems.ts
//
// Fetches published content_items by type.
// Matches the actual DB schema:
//   ✓  .eq('status', 'published')   — NOT .eq('published', true)
//   ✓  category_id                  — UUID FK to categories
//   ✓  cover_image / cover_alt      — columns added via ALTER TABLE
// ─────────────────────────────────────────────────────────────────

import { useCallback, useEffect, useState } from 'react'
import { supabase }                          from '@/lib/supabase/client'
import type { ContentItem, ContentType }     from '@/lib/supabase/client'

// ─── Options ──────────────────────────────────────────────────

interface UseContentItemsOptions {
  type:          ContentType
  featuredOnly?: boolean
  categoryId?:   string       // UUID FK matching categories.id
  limit?:        number
  search?:       string
}

// ─── Return shape ─────────────────────────────────────────────

export interface UseContentItemsResult {
  items:     ContentItem[]
  isLoading: boolean
  isError:   boolean
  isEmpty:   boolean
  errorMsg:  string
  refresh:   () => void
}

// ─── Hook ─────────────────────────────────────────────────────

export function useContentItems({
  type,
  featuredOnly = false,
  categoryId,
  limit        = 20,
  search       = '',
}: UseContentItemsOptions): UseContentItemsResult {

  const [items,     setItems]     = useState<ContentItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError,   setIsError]   = useState(false)
  const [errorMsg,  setErrorMsg]  = useState('')

  const fetch = useCallback(async () => {
    setIsLoading(true)
    setIsError(false)
    setErrorMsg('')

    try {
      let query = supabase
        .from('content_items')
        .select(`
          id, title, slug, excerpt, type,
          cover_image, cover_alt,
          author_name, read_time,
          featured, status, published_at,
          category_id, views, key_takeaways,
          pdf_available,
          categories ( id, name, slug, color )
        `)
        .eq('type', type)
        // ✓ Correct: status column, not published boolean
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(limit)

      if (featuredOnly)  query = (query as any).eq('featured', true)
      if (categoryId)    query = (query as any).eq('category_id', categoryId)
      if (search.trim()) query = (query as any).ilike('title', `%${search.trim()}%`)

      const { data, error } = await query

      if (error) throw error

      setItems((data ?? []) as unknown as ContentItem[])
    } catch (e: any) {
      setIsError(true)
      setErrorMsg(e?.message ?? 'Failed to load content.')
      setItems([])
    } finally {
      setIsLoading(false)
    }
  }, [type, featuredOnly, categoryId, limit, search])

  useEffect(() => { fetch() }, [fetch])

  return {
    items,
    isLoading,
    isError,
    isEmpty:  !isLoading && !isError && items.length === 0,
    errorMsg,
    refresh:  fetch,
  }
}
