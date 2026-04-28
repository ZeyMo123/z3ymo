import type { Metadata } from 'next'
import { Suspense } from 'react'
import FloatingNav from '@/components/layout/FloatingNav'
import Footer from '@/components/layout/Footer'
import ContentCollection from '@/components/content/ContentCollection'

export const metadata: Metadata = {
  title:       'Case Studies — Z3ymo',
  description: 'Real projects, real results. How businesses across Africa used technology to grow — documented in detail.',
}

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen">
      <FloatingNav />
      <Suspense fallback={
        <div className="min-h-screen bg-whisper dark:bg-void pt-32 px-6">
          <div className="max-w-5xl mx-auto space-y-4 animate-pulse">
            <div className="h-5 w-28 rounded-full bg-void/6 dark:bg-white/6" />
            <div className="h-12 w-72 rounded-xl bg-void/6 dark:bg-white/6" />
          </div>
        </div>
      }>
        <ContentCollection type="case-study" />
      </Suspense>
      <Footer />
    </main>
  )
}
