import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import FloatingNav from '@/components/layout/FloatingNav'
import Footer from '@/components/layout/Footer'
import PlatformHero from '@/components/platform/PlatformHero'
import {
  ProblemSection,
  FeaturesSection,
  AISection,
  IndustriesSection,
  AutomationSection,
  HowItWorksSection,
  ExamplePlatformSection,
  BenefitsSection,
  PlatformCTA,
} from '@/components/platform/PlatformSections'
import { getPlatformBySlug, getAllPlatformSlugs } from '@/lib/data/platforms'

/* ─── Generates /products/platforms/creator-os etc. at build time ── */
export function generateStaticParams() {
  return getAllPlatformSlugs().map((slug) => ({ slug }))
}

/* ─── SEO metadata per platform ─────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const p = getPlatformBySlug(slug)
  if (!p) return {}
  return {
    title:       `${p.name} — Z3ymo Platform`,
    description: p.subheadline,
    openGraph: {
      title:       `${p.name} by Z3ymo`,
      description: p.subheadline,
    },
  }
}

/* ─── Page ──────────────────────────────────────────────────────── */
export default async function PlatformPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const platform = getPlatformBySlug(slug)
  if (!platform) notFound()

  return (
    <main className="min-h-screen">
      <FloatingNav />

      <PlatformHero
        name={platform.name}
        headline={platform.headline}
        subheadline={platform.subheadline}
        accent={platform.accent}
        modules={platform.dashboardModules}
      />

      <ProblemSection
        headline={platform.problemHeadline}
        problems={platform.problems}
        accent={platform.accent}
      />

      <FeaturesSection
        headline={platform.solutionHeadline}
        features={platform.features}
        accent={platform.accent}
      />

      <AISection
        headline={platform.aiHeadline}
        insights={platform.aiInsights}
        accent={platform.accent}
      />

      <IndustriesSection
        industries={platform.industries}
        accent={platform.accent}
      />

      <AutomationSection
        automations={platform.automations}
        accent={platform.accent}
      />

      <HowItWorksSection accent={platform.accent} />

      <ExamplePlatformSection
        customerNav={platform.customerNav}
        adminNav={platform.adminNav}
        accent={platform.accent}
        name={platform.name}
      />

      <BenefitsSection
        benefits={platform.benefits}
        accent={platform.accent}
        name={platform.name}
      />

      <PlatformCTA
        headline={platform.finalCtaHeadline}
        text={platform.finalCtaText}
        accent={platform.accent}
      />

      <Footer />
    </main>
  )
}
