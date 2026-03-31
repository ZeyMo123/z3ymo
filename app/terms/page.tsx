import type { Metadata } from 'next'
import FloatingNav from '@/components/layout/FloatingNav'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms governing use of Z3ymo services and products.',
}

const LAST_UPDATED = 'January 2025'

const SECTIONS = [
  {
    title: 'Acceptance of terms',
    content: `By accessing z3ymo.com or engaging Z3ymo services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our website or services. We may update these terms periodically — continued use constitutes acceptance of any changes.`,
  },
  {
    title: 'Services',
    content: `Z3ymo provides software development services, ready-made digital products, AI agent development, and technology consultation. All services are provided on a project basis or subscription basis as agreed in writing. Scope, deliverables, timeline, and pricing will be defined in a separate project agreement for custom work.`,
  },
  {
    title: 'Intellectual property',
    content: `Upon full payment, clients receive full ownership of custom-built deliverables including source code, designs, and documentation. Z3ymo retains the right to display the work in our portfolio unless otherwise agreed in writing. Our brand, website content, and pre-existing tools and frameworks remain the property of Z3ymo.`,
  },
  {
    title: 'Payment',
    content: `Custom project fees are agreed before work begins. We typically require a 50% deposit before project start with the remainder due on delivery. Ready-made products are payable in full before delivery. All prices are in USD unless otherwise stated. Payments are non-refundable once work has commenced except where we fail to deliver agreed scope.`,
  },
  {
    title: 'Warranties & limitations',
    content: `We warrant that our work will be performed professionally and to a high standard. We provide bug fixes at no charge for 30 days after delivery. Beyond this, support is available on a retainer or per-incident basis. We are not liable for indirect, incidental, or consequential damages. Our total liability is limited to the amount paid for the specific service in question.`,
  },
  {
    title: 'Governing law',
    content: `These terms are governed by the laws of Tanzania. Any disputes shall first be attempted to be resolved through good-faith negotiation. If unresolved, disputes shall be subject to the jurisdiction of the courts of Dar es Salaam, Tanzania.`,
  },
  {
    title: 'Contact',
    content: `For any questions about these terms, contact us at legal@z3ymo.com. Z3ymo, Dar es Salaam, Tanzania.`,
  },
]

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <FloatingNav />

      <div className="max-w-3xl mx-auto px-6 pt-36 pb-24">
        <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-4">
          Legal
        </p>
        <h1 className="font-display font-bold text-[clamp(2rem,5vw,3.5rem)] text-void dark:text-whisper mb-3">
          Terms of service
        </h1>
        <p className="text-sm text-void/40 dark:text-whisper/40 mb-14">
          Last updated: {LAST_UPDATED}
        </p>

        <p className="text-base text-void/60 dark:text-whisper/60 leading-relaxed mb-12">
          Please read these terms carefully before using Z3ymo services. These terms create a
          legally binding agreement between you and Z3ymo.
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
