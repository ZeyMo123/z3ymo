import type { Metadata } from 'next'
import FloatingNav        from '@/components/layout/FloatingNav'
import Footer             from '@/components/layout/Footer'
import HeroSlider         from '@/components/sections/HeroSlider'
import TrustMetrics       from '@/components/sections/TrustMetrics'
import ValueProp          from '@/components/sections/ValueProp'
import ProductsForSale    from '@/components/sections/ProductsForSale'
import Services           from '@/components/sections/Services'
import ProcessSection     from '@/components/sections/ProcessSection'
import PulseSpotlight     from '@/components/sections/PulseSpotlight'
import Portfolio          from '@/components/sections/Portfolio'
import TestimonialsSlider from '@/components/sections/TestimonialsSlider'
import BlogPreview        from '@/components/sections/BlogPreview'
import GuidesPreview      from '@/components/sections/GuidesPreview'
import CaseStudiesPreview from '@/components/sections/CaseStudiesPreview'
import FinalCTA           from '@/components/sections/FinalCTA'

export const metadata: Metadata = {
  title: 'Z3ymo — AI-powered software company building intelligent digital platforms.',
  description:
    'Z3ymo designs and builds AI-powered web apps, mobile platforms, and automation systems. Ready-made software platforms and custom development for real businesses.',
}

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <FloatingNav />

      {/* 01 — Hero slider */}
      <HeroSlider />

      {/* 02 — Trust metrics (stats + tech logos) */}
      <TrustMetrics />

      {/* 03 — Value proposition */}
      <ValueProp />

      {/* 04 — Software platforms for sale */}
      <ProductsForSale />

      {/* 05 — Services */}
      <Services />

      {/* 06 — Development process */}
      <ProcessSection />

      {/* 07 — Pulse AI spotlight */}
      <PulseSpotlight />

      {/* 08 — Case Studies */}
      <Portfolio />

      <CaseStudiesPreview />

      {/* 09 — Testimonials infinite slider */}
      <TestimonialsSlider />

      {/* 10 — Blog preview */}
      <BlogPreview />
      <GuidesPreview />

      {/* 11 — Final CTA */}
      <FinalCTA />

      <Footer />
    </main>
  )
}