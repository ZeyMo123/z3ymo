import ScrollReveal from '@/components/ui/ScrollReveal'

const METRICS = [
  { value: '20+',  label: 'Projects delivered' },
  { value: '7',    label: 'Industry platforms built' },
  { value: '5+',   label: 'Technologies mastered' },
  { value: '100%', label: 'Client satisfaction' },
]

const TECH = [
  { name: 'Next.js',    color: '#000', darkColor: '#fff' },
  { name: 'Supabase',   color: '#3FCF8E', darkColor: '#3FCF8E' },
  { name: 'OpenAI',     color: '#10A37F', darkColor: '#10A37F' },
  { name: 'Stripe',     color: '#635BFF', darkColor: '#7B73FF' },
  { name: 'Cloudflare', color: '#F38020', darkColor: '#F38020' },
  { name: 'React',      color: '#61DAFB', darkColor: '#61DAFB' },
  { name: 'TypeScript', color: '#3178C6', darkColor: '#4A90D9' },
  { name: 'Flutter',    color: '#02569B', darkColor: '#0475CE' },
]

export default function TrustMetrics() {
  return (
    <section className="py-16 px-6 border-y border-void/8 dark:border-whisper/8">
      <div className="max-w-6xl mx-auto">

        {/* Stats row */}
        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-14">
            {METRICS.map((m) => (
              <div key={m.label} className="text-center">
                <div className="font-display font-bold text-[clamp(2.2rem,4vw,3rem)] text-void dark:text-whisper mb-1">
                  {m.value}
                </div>
                <div className="text-xs text-void/40 dark:text-whisper/40 font-medium tracking-wide">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Tech logos — text-based, clean */}
        <ScrollReveal delay={0.1}>
          <p className="text-center text-xs font-medium tracking-[0.15em] uppercase text-void/30 dark:text-whisper/30 mb-7">
            Technologies we work with
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {TECH.map((t) => (
              <span
                key={t.name}
                className="font-display font-semibold text-sm transition-colors duration-150"
                style={{ color: `${t.color}` }}
              >
                {t.name}
              </span>
            ))}
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}
