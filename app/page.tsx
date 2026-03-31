import type { Metadata } from 'next'
import FloatingNav      from '@/components/layout/FloatingNav'
import Footer           from '@/components/layout/Footer'
import HeroSlider       from '@/components/sections/HeroSlider'
import ValueProp        from '@/components/sections/ValueProp'
import ProductsForSale  from '@/components/sections/ProductsForSale'
import Services         from '@/components/sections/Services'
import PulseSpotlight   from '@/components/sections/PulseSpotlight'
import Portfolio        from '@/components/sections/Portfolio'
import TestimonialsSlider from '@/components/sections/TestimonialsSlider'
import BlogPreview      from '@/components/sections/BlogPreview'
import FinalCTA         from '@/components/sections/FinalCTA'

export const metadata: Metadata = {
  title: 'Z3ymo — Built different. By design.',
  description:
    "Africa's premium AI-native software company. World-class websites, mobile apps, AI agents, and digital products — from Tanzania to the world.",
}

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <FloatingNav />

      {/* 01 — Hero slider (replaces static Hero) */}
      <HeroSlider />

      {/* 02 — Value proposition */}
      <ValueProp />

      {/* 03 — Products for sale */}
      <ProductsForSale />

      {/* 04 — Services */}
      <Services />

      {/* 05 — Pulse AI spotlight */}
      <PulseSpotlight />

      {/* 06 — Portfolio */}
      <Portfolio />

      {/* 07 — Testimonials infinite slider */}
      <TestimonialsSlider />

      {/* 08 — Blog preview */}
      <BlogPreview />

      {/* 09 — Final CTA */}
      <FinalCTA />

      <Footer />
    </main>
  )
}
