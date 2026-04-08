'use client'

import { useEffect, useState, use } from 'react'
import { getPost } from '@/lib/admin/actions'
import ContentEditor from '@/components/admin/ContentEditor'
import { LoadingState, ErrorState } from '@/components/admin/ui'

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [post, setPost]   = useState<any>(null)
  const [state, setState] = useState<'loading' | 'error' | 'success'>('loading')

  useEffect(() => {
    getPost(id).then((res) => {
      if (res.ok) { setPost(res.data); setState('success') }
      else setState('error')
    })
  }, [id])

  if (state === 'loading') return <div className="p-6"><LoadingState /></div>
  if (state === 'error')   return <ErrorState title="Post not found" />
  return <ContentEditor mode="edit" initial={post} />
}
