import ScrollReveal from '@/components/ui/ScrollReveal'
import Link from 'next/link'

const POSTS = [
  {
    slug: 'ai-agents-africa-customer-service',
    category: 'AI',
    categoryColor: '#C0392B',
    title: 'How AI agents are transforming customer service for African businesses',
    excerpt: 'WhatsApp is the default OS of African business. Here\'s how AI agents are automating it.',
    readTime: '5 min read',
    date: 'Jan 2025',
  },
  {
    slug: 'why-your-business-needs-a-website-2025',
    category: 'Business Tech',
    categoryColor: '#1B998B',
    title: 'Why every Tanzanian business needs a website in 2025',
    excerpt: 'A website isn\'t a luxury anymore — it\'s your most important employee. Here\'s why.',
    readTime: '4 min read',
    date: 'Jan 2025',
  },
  {
    slug: '5-cybersecurity-mistakes-small-businesses',
    category: 'Cybersecurity',
    categoryColor: '#C9A84C',
    title: '5 cybersecurity mistakes small businesses make (and how to fix them)',
    excerpt: 'You don\'t need to be a tech giant to get hacked. These simple fixes can protect you.',
    readTime: '6 min read',
    date: 'Dec 2024',
  },
]

export default function BlogPreview() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <ScrollReveal>
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-4">
              From the blog
            </p>
            <h2 className="font-display font-bold text-[clamp(2rem,5vw,3.5rem)] text-void dark:text-whisper">
              Insights & guides
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <Link
              href="/blog"
              className="
                inline-flex items-center gap-2 text-sm
                text-void/40 dark:text-whisper/40
                hover:text-crimson transition-colors duration-200
              "
            >
              Read all articles
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </ScrollReveal>
        </div>

        {/* Post cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {POSTS.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 0.08}>
              <Link href={`/blog/${post.slug}`} className="block group h-full">
                <article className="
                  h-full p-7 rounded-2xl
                  bg-transparent
                  border border-void/8 dark:border-whisper/8
                  hover:border-void/16 dark:hover:border-whisper/16
                  hover:bg-void/2 dark:hover:bg-whisper/2
                  transition-all duration-200
                ">
                  {/* Category */}
                  <span
                    className="text-[11px] font-semibold px-3 py-1 rounded-full"
                    style={{
                      background: `${post.categoryColor}15`,
                      color: post.categoryColor,
                    }}
                  >
                    {post.category}
                  </span>

                  <h3 className="
                    font-display font-semibold text-lg
                    text-void dark:text-whisper
                    mt-4 mb-3 leading-snug
                    group-hover:text-crimson dark:group-hover:text-crimson
                    transition-colors duration-200
                    text-balance
                  ">
                    {post.title}
                  </h3>

                  <p className="text-sm text-void/50 dark:text-whisper/50 leading-relaxed mb-6">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs text-void/30 dark:text-whisper/30">
                    <span>{post.readTime}</span>
                    <span>{post.date}</span>
                  </div>
                </article>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
