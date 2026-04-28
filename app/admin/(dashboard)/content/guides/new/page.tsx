'use client'

// app/admin/(dashboard)/content/guides/new/page.tsx
// Mounts the shared ContentItemEditor in "new guide" mode.
// All sidebar fields, Tiptap toolbar, Key Takeaways, Tags, CTA,
// Cover image + alt, PDF toggle, Featured toggle — all via ContentItemEditor.

import ContentItemEditor from '@/components/admin/ContentItemEditor'

export default function NewGuidePage() {
  return <ContentItemEditor type="guide" />
}
