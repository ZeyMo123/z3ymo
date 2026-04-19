'use client'

// ─────────────────────────────────────────────────────────────────
// hooks/useFeaturedPosts.ts
//
// Client-side data hook for fetching featured blog posts.
// Handles all 3 states: loading | error | success.
// Exposes a refresh() function used for retry and pull-to-refresh.
// ─────────────────────────────────────────────────────────────────

import { useCallback, useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import type { Post } from '@/lib/supabase/client'

// ─── State type ────────────────────────────────────────────────

type Status = 'idle' | 'loading' | 'success' | 'error'

interface UseFeaturedPostsResult {
  posts:      Post[]
  status:     Status
  isLoading:  boolean
  isError:    boolean
  isEmpty:    boolean
  errorMsg:   string
  refresh:    () => void
  lastFetched:Date | null
}

// ─── Hook ─────────────────────────────────────────────────────

export function useFeaturedPosts(limit = 6): UseFeaturedPostsResult {
  const [posts,      setPosts]      = useState<Post[]>([])
  const [status,     setStatus]     = useState<Status>('idle')
  const [errorMsg,   setErrorMsg]   = useState('')
  const [lastFetched,setLastFetched]= useState<Date | null>(null)

  // Abort controller so we don't update state after unmount
  const abortRef = useRef<AbortController | null>(null)

  const fetch = useCallback(async () => {
    // Cancel any in-flight request
    abortRef.current?.abort()
    abortRef.current = new AbortController()

    setStatus('loading')
    setErrorMsg('')

    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          id, title, slug, excerpt,
          cover_image, cover_alt,
          author_name, author_avatar, author_role,
          read_time, featured, published,
          published_at, views, created_at,
          categories ( id, name, slug, color )
        `)
        .eq('published', true)
        .eq('featured', true)
        .order('published_at', { ascending: false })
        .limit(limit)

      if (abortRef.current.signal.aborted) return

      if (error) throw new Error(error.message)

      setPosts((data ?? []) as Post[])
      setStatus('success')
      setLastFetched(new Date())
    } catch (err: any) {
      if (abortRef.current?.signal.aborted) return
      setStatus('error')
      setErrorMsg(err?.message ?? 'Could not load posts. Check your connection.')
    }
  }, [limit])

  useEffect(() => {
    fetch()
    return () => { abortRef.current?.abort() }
  }, [fetch])

  return {
    posts,
    status,
    isLoading:  status === 'loading',
    isError:    status === 'error',
    isEmpty:    status === 'success' && posts.length === 0,
    errorMsg,
    refresh:    fetch,
    lastFetched,
  }
}
