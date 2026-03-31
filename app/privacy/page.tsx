import type { Metadata } from 'next'
import FloatingNav from '@/components/layout/FloatingNav'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Z3ymo collects, uses, and protects your personal data.',
}

const LAST_UPDATED = 'January 2025'

const SECTIONS = [
  {
    title: 'Information we collect',
    content: `We collect information you provide directly — such as your name, email address, and message when you contact us or subscribe to our newsletter. We also collect basic usage data such as pages visited and time on site through privacy-respecting analytics. We do not sell your data to any third party, ever.`,
  },
  {
    title: 'How we use your information',
    content: `We use the information you provide to respond to enquiries, send the newsletter you subscribed to, and improve our services. We may use anonymised, aggregated data to understand how visitors use our website. We will never use your data for purposes other than those you consented to.`,
  },
  {
    title: 'Data storage & security',
    content: `Your data is stored securely in Supabase (PostgreSQL) hosted in secure data centres. We use industry-standard encryption for data in transit (TLS) and at rest. We implement strict access controls and review our security practices regularly.`,
  },
  {
    title: 'Cookies',
    content: `We use minimal, privacy-first cookies. These include a session cookie for theme preference (light/dark mode) and basic analytics (Vercel Analytics, which is privacy-compliant and does not use tracking cookies). We do not use advertising or third-party tracking cookies.`,
  },
  {
    title: 'Third-party services',
    content: `We use Supabase for data storage, Vercel for hosting and analytics, and Resend for transactional email. Each of these services maintains their own privacy policies. We have selected services that prioritise user privacy and data security.`,
  },
  {
    title: 'Your rights',
    content: `You have the right to access, correct, or delete your personal data at any time. To make a request, email us at privacy@z3ymo.com. We will respond within 30 days. You may unsubscribe from our newsletter at any time using the link in any email we send.`,
  },
  {
    title: 'Contact us',
    content: `For any privacy-related questions or concerns, contact us at privacy@z3ymo.com. Our mailing address is Z3ymo, Dar es Salaam, Tanzania.`,
  },
]

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <FloatingNav />

      <div className="max-w-3xl mx-auto px-6 pt-36 pb-24">
        <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-4">
          Legal
        </p>
        <h1 className="font-display font-bold text-[clamp(2rem,5vw,3.5rem)] text-void dark:text-whisper mb-3">
          Privacy policy
        </h1>
        <p className="text-sm text-void/40 dark:text-whisper/40 mb-14">
          Last updated: {LAST_UPDATED}
        </p>

        <p className="text-base text-void/60 dark:text-whisper/60 leading-relaxed mb-12">
          Z3ymo (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is committed to protecting
          your privacy. This policy explains how we collect, use, and safeguard your information
          when you visit z3ymo.com or use our services.
        </p>

        <div className="space-y-12">
          {SECTIONS.map((section, i) => (
            <div key={i} className="border-t border-void/8 dark:border-whisper/8 pt-10">
              <h2 className="font-display font-semibold text-xl text-void dark:text-whisper mb-4">
                {section.title}
              </h2>
              <p className="text-void/60 dark:text-whisper/60 leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  )
}
