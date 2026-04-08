import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import FloatingNav from '@/components/layout/FloatingNav'
import Footer from '@/components/layout/Footer'
import {
  SolutionHero,
  PainSection,
  SolutionSection,
  FeaturesSection,
  UseCasesSection,
  WorkflowSection,
  AISection,
  CaseStudySection,
  ComparisonSection,
  SolutionCTA,
} from '@/components/solutions/SolutionSections'
import { SOLUTIONS, getSolutionBySlug, getAllSolutionSlugs } from '@/lib/data/solutions'

// ─── Static params — builds all 9 pages at build time ─────────

export function generateStaticParams() {
  return getAllSolutionSlugs().map((slug) => ({ slug }))
}

// ─── Per-page SEO metadata ─────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const s = getSolutionBySlug(slug)
  if (!s) return {}

  return {
    title:       `${s.industry} Solutions — Z3ymo`,
    description: s.subheadline,
    openGraph: {
      title:       `${s.industry} — Z3ymo Solutions`,
      description: s.subheadline,
    },
  }
}

// ─── Page ──────────────────────────────────────────────────────

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const s = getSolutionBySlug(slug)

  if (!s) notFound()

  return (
    <main className="min-h-screen">
      <FloatingNav />

      {/* 1. Hero */}
      <SolutionHero
        headline={s.headline}
        subheadline={s.subheadline}
        accent={s.accent}
        platformName={s.platformName}
        platformSlug={s.platformSlug}
        industry={s.industry}
      />

      {/* 2. Pain */}
      <PainSection
        headline={s.painHeadline}
        points={s.painPoints}
        accent={s.accent}
      />

      {/* 3. Solution */}
      <SolutionSection
        headline={s.solutionHeadline}
        message={s.solutionMessage}
        capabilities={s.capabilities}
        accent={s.accent}
      />

      {/* 4. Platform features */}
      <FeaturesSection
        platformName={s.platformName}
        platformSlug={s.platformSlug}
        desc={s.platformDesc}
        features={s.features}
        accent={s.accent}
      />

      {/* 5. Use cases */}
      <UseCasesSection
        headline={s.useCaseHeadline}
        useCases={s.useCases}
        accent={s.accent}
      />

      {/* 6. Workflow */}
      <WorkflowSection
        headline={s.workflowHeadline}
        steps={s.workflowSteps}
        accent={s.accent}
      />

      {/* 7. AI layer */}
      <AISection
        headline={s.aiHeadline}
        message={s.aiMessage}
        examples={s.aiExamples}
        accent={s.accent}
      />

      {/* 8. Case study */}
      <CaseStudySection
        caseStudy={s.caseStudy}
        accent={s.accent}
      />

      {/* 9. Comparison */}
      <ComparisonSection
        title={s.comparisonTitle}
        without={s.without}
        withZ3ymo={s.with}
        accent={s.accent}
      />

      {/* 10. Final CTA */}
      <SolutionCTA
        headline={s.ctaHeadline}
        text={s.ctaText}
        accent={s.accent}
      />

      <Footer />
    </main>
  )
}
