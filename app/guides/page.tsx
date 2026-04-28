import type { Metadata } from 'next'
import { Suspense } from 'react'
import FloatingNav from '@/components/layout/FloatingNav'
import Footer from '@/components/layout/Footer'
import ContentCollection from '@/components/content/ContentCollection'

export const metadata: Metadata = {
  title:       'Guides — Z3ymo',
  description: 'Step-by-step guides on AI, software development, cybersecurity, and building technology-driven businesses in Africa.',
}

// Skeleton for the Suspense fallback
function CollectionSkeleton() {
  return (
    <div className="min-h-screen bg-whisper dark:bg-void">
      <div className="pt-32 pb-12 px-6">
        <div className="max-w-5xl mx-auto space-y-4 animate-pulse">
          <div className="h-5 w-24 rounded-full bg-void/6 dark:bg-white/6" />
          <div className="h-12 w-64 rounded-xl bg-void/6 dark:bg-white/6" />
          <div className="h-4 w-96 rounded-lg bg-void/4 dark:bg-white/4" />
        </div>
      </div>
    </div>
  )
}

export default function GuidesPage() {
  return (
    <main className="min-h-screen">
      <FloatingNav />
      <Suspense fallback={<CollectionSkeleton />}>
        <ContentCollection type="guide" />
      </Suspense>
      <Footer />
    </main>
  )
}
