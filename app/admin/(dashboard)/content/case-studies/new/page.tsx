'use client'

// app/admin/(dashboard)/content/case-studies/new/page.tsx
// Mounts the shared ContentItemEditor in "new case study" mode.

import ContentItemEditor from '@/components/admin/ContentItemEditor'

export default function NewCaseStudyPage() {
  return <ContentItemEditor type="case-study" />
}
