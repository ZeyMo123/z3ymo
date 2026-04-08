import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import FloatingNav from '@/components/layout/FloatingNav'
import Footer from '@/components/layout/Footer'
import {
  ServiceHero,
  ProblemSection,
  SolutionSection,
  CapabilitiesSection,
  DeliverablesSection,
  UseCasesSection,
  WorkflowSection,
  TechSection,
  WhySection,
  CaseExampleSection,
  ComparisonSection,
  ServiceCTA,
} from '@/components/services/ServiceSections'
import {
  getServiceBySlug,
  getAllServiceSlugs,
  isConsulting,
} from '@/lib/data/services'

// ─── Build all 6 pages at compile time ───────────────────────

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }))
}

// ─── Per-page SEO ─────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const s = getServiceBySlug(slug)
  if (!s) return {}
  return {
    title:       `${s.name} — Z3ymo Services`,
    description: s.subheadline,
    openGraph: {
      title:       `${s.name} by Z3ymo`,
      description: s.subheadline,
    },
  }
}

// ─── Page ─────────────────────────────────────────────────────

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const s = getServiceBySlug(slug)
  if (!s) notFound()

  const consulting = isConsulting(s)

  return (
    <main className="min-h-screen">
      <FloatingNav />

      {/* 1 — Hero */}
      <ServiceHero
        tagline={s.tagline}
        headline={s.headline}
        subheadline={s.subheadline}
        accent={s.accent}
        secondaryCta={s.secondaryCta}
        secondaryHref={s.secondaryHref}
      />

      {/* 2 — Problem */}
      <ProblemSection
        headline={s.problemHeadline}
        painPoints={s.painPoints}
        accent={s.accent}
      />

      {/* 3 — Solution */}
      <SolutionSection
        headline={s.solutionHeadline}
        message={s.solutionMessage}
        deliverables={s.deliverables}
        accent={s.accent}
      />

      {/* 4 — Capabilities (software/AI) OR Deliverables (consulting) */}
      {consulting ? (
        <DeliverablesSection
          headline={s.deliverablesHeadline}
          blocks={s.deliverableBlocks}
          accent={s.accent}
        />
      ) : (
        <CapabilitiesSection
          headline={s.capabilitiesHeadline}
          capabilities={s.capabilities}
          accent={s.accent}
        />
      )}

      {/* 5 — Use cases */}
      <UseCasesSection
        headline={s.useCasesHeadline}
        useCases={s.useCases}
        accent={s.accent}
      />

      {/* 6 — Workflow */}
      <WorkflowSection
        headline={s.workflowHeadline}
        steps={s.workflowSteps}
        accent={s.accent}
      />

      {/* 7 — Tech approach (software/AI) OR Why it matters (consulting) */}
      {consulting ? (
        <WhySection
          headline={s.whyHeadline}
          message={s.whyMessage}
          accent={s.accent}
        />
      ) : (
        <TechSection
          headline={s.techHeadline}
          message={s.techMessage}
          techPoints={s.techPoints}
          accent={s.accent}
        />
      )}

      {/* 8 — Case example */}
      <CaseExampleSection
        caseExample={s.caseExample}
        accent={s.accent}
      />

      {/* 9 — Comparison */}
      <ComparisonSection
        title={s.comparisonTitle}
        leftLabel={s.leftLabel}
        leftItems={s.leftItems}
        rightLabel={s.rightLabel}
        rightItems={s.rightItems}
        accent={s.accent}
      />

      {/* 10 — CTA */}
      <ServiceCTA
        headline={s.ctaHeadline}
        text={s.ctaText}
        accent={s.accent}
      />

      <Footer />
    </main>
  )
}
