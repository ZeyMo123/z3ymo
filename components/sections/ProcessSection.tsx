import ScrollReveal from '@/components/ui/ScrollReveal'

const STEPS = [
  {
    num: '01',
    title: 'Consultation',
    desc: 'Understanding your business, goals, and the exact problem we\'re solving — before a single line of code is written.',
    accent: '#C0392B',
  },
  {
    num: '02',
    title: 'Architecture',
    desc: 'Designing the system, choosing the right technology stack, and mapping out how every piece connects.',
    accent: '#1B998B',
  },
  {
    num: '03',
    title: 'Development',
    desc: 'Building your platform with modern tools, regular demos, and clear communication throughout.',
    accent: '#C9A84C',
  },
  {
    num: '04',
    title: 'Launch & Iteration',
    desc: 'Deploying to production and improving continuously — fixing issues fast, shipping new features when needed.',
    accent: '#C0392B',
  },
]

export default function ProcessSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <ScrollReveal className="mb-16">
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-4">
            How we work
          </p>
          <h2 className="font-display font-bold text-[clamp(2rem,4.5vw,3rem)] text-void dark:text-whisper">
            How we build software
          </h2>
        </ScrollReveal>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
          {STEPS.map((step, i) => (
            <ScrollReveal key={step.num} delay={i * 0.09}>
              <div className="relative group">
                {/* Connector line between steps (desktop) */}
                {i < STEPS.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="hidden lg:block absolute top-8 left-[calc(50%+24px)] right-0 h-px bg-void/10 dark:bg-whisper/10 z-0"
                  />
                )}

                <div className="relative z-10 pr-6 pb-10 lg:pb-0">
                  {/* Number pill */}
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-200 group-hover:scale-105"
                    style={{ background: `${step.accent}12`, border: `1px solid ${step.accent}25` }}
                  >
                    <span
                      className="font-display font-bold text-sm"
                      style={{ color: step.accent }}
                    >
                      {step.num}
                    </span>
                  </div>

                  <h3 className="font-display font-semibold text-lg text-void dark:text-whisper mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-void/55 dark:text-whisper/55 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Mobile connector */}
                {i < STEPS.length - 1 && (
                  <div className="lg:hidden absolute left-6 bottom-0 top-12 w-px bg-void/10 dark:bg-whisper/10" />
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
