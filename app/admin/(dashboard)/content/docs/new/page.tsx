'use client'

// app/admin/(dashboard)/content/docs/new/page.tsx
// Mounts the shared ContentItemEditor in "new documentation" mode.
// Docs: no categories, no tags, no CTA, no key takeaways.
// Has: title, excerpt, content (Tiptap), cover image + alt,
//      author, read time, slug, featured, PDF toggle, status.

import ContentItemEditor from '@/components/admin/ContentItemEditor'

export default function NewDocPage() {
  return <ContentItemEditor type="doc" />
}
