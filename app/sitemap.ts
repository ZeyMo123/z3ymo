import { MetadataRoute } from 'next'
import { getAllPostSlugs } from '@/lib/supabase/queries'
import { getAllSolutionSlugs } from '@/lib/data/solutions'
import { getAllServiceSlugs } from '@/lib/data/services'
import { getAllPlatformSlugs } from '@/lib/data/platforms'

const BASE = 'https://z3ymo.com'
const now  = new Date()

function url(
  path:   string,
  priority:        number,
  changeFrequency: MetadataRoute.Sitemap[0]['changeFrequency'] = 'monthly',
): MetadataRoute.Sitemap[0] {
  return { url: `${BASE}${path}`, lastModified: now, changeFrequency, priority }
}

export const revalidate = 3600 // re-generate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  // ── Core pages ──────────────────────────────────────────────
  const core: MetadataRoute.Sitemap = [
    url('/',            1.0, 'weekly'),
    url('/about',       0.7),
    url('/blog',        0.9, 'daily'),
    url('/portfolio',   0.8),
    url('/investors',   0.6),
    url('/privacy',     0.3, 'yearly'),
    url('/terms',       0.3, 'yearly'),
  ]

  // ── Products ────────────────────────────────────────────────
  const platformSlugs  = getAllPlatformSlugs()
  const products: MetadataRoute.Sitemap = [
    url('/products',            0.9, 'weekly'),
    url('/products/platforms',  0.9, 'weekly'),
    ...platformSlugs.map((slug) => url(`/products/platforms/${slug}`, 0.85)),
    url('/ai-agents',           0.9, 'weekly'),
    url('/ai-agents/pulse',     0.95, 'weekly'),
  ]

  // ── Services ────────────────────────────────────────────────
  const serviceSlugs = getAllServiceSlugs()
  const services: MetadataRoute.Sitemap = [
    url('/services',                                            0.9),
    url('/services/consultation',                              0.85, 'weekly'),
    url('/services/consultation/bookfreeconsultation',         0.8,  'weekly'),
    ...serviceSlugs.map((slug) => url(`/services/${slug}`,    0.8)),
  ]

  // ── Solutions ───────────────────────────────────────────────
  const solutionSlugs = getAllSolutionSlugs()
  const solutions: MetadataRoute.Sitemap = [
    url('/solutions', 0.9, 'weekly'),
    ...solutionSlugs.map((slug) => url(`/solutions/${slug}`, 0.8)),
  ]

  // ── Blog posts (dynamic) ────────────────────────────────────
  let blogPosts: MetadataRoute.Sitemap = []
  try {
    const slugs = await getAllPostSlugs()
    blogPosts = slugs.map((slug) => url(`/blog/${slug}`, 0.7))
  } catch {
    console.warn('[Sitemap] Could not fetch blog slugs — skipping dynamic posts')
  }

  return [...core, ...products, ...services, ...solutions, ...blogPosts]
}
