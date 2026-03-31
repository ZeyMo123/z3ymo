'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FloatingNav from '@/components/layout/FloatingNav'
import Footer from '@/components/layout/Footer'
import ScrollReveal from '@/components/ui/ScrollReveal'
import MagneticButton from '@/components/ui/MagneticButton'

const CATEGORIES = ['All', 'Web App', 'Mobile App', 'AI Agent', 'Website', 'SaaS']

const PROJECTS = [
  {
    id: 'salon-booking',
    title: 'Serenity Salon',
    category: 'Web App',
    type: 'Sample project',
    tagline: 'Online booking transforms a local salon',
    description: 'A full-stack booking platform for a Dar es Salaam salon — real-time availability, automated WhatsApp reminders, and a staff dashboard. Replaced a manual paper system.',
    accent: '#1B998B',
    stack: ['Next.js 16', 'Supabase', 'Twilio', 'Tailwind CSS'],
    metrics: [
      { label: 'More bookings', value: '3×' },
      { label: 'No-shows reduced', value: '60%' },
      { label: 'Build time', value: '3 weeks' },
    ],
    challenge: 'The salon owner was managing bookings via WhatsApp manually, leading to double-bookings and lost appointments.',
    solution: 'Built a web-based booking system with calendar sync and automatic WhatsApp reminders via Twilio — plus a simple admin dashboard.',
    details: ['Real-time availability calendar', 'Automated reminder at 24h and 1h', 'Staff schedule management', 'Monthly revenue reporting'],
  },
  {
    id: 'retailbot',
    title: 'RetailBot TZ',
    category: 'AI Agent',
    type: 'Sample project',
    tagline: 'AI handles 300 customer queries daily',
    description: 'A WhatsApp AI agent for a mid-size Dar es Salaam retailer. Handles product queries, order tracking, complaint logging, and escalates complex issues to human staff.',
    accent: '#C0392B',
    stack: ['Python', 'OpenAI GPT-4o', 'WhatsApp Business API', 'FastAPI', 'Supabase'],
    metrics: [
      { label: 'Queries automated', value: '300/day' },
      { label: 'Response time', value: '<5 sec' },
      { label: 'Staff hours saved', value: '40hrs/wk' },
    ],
    challenge: 'A retail team of 3 was spending 6+ hours per day answering the same product and order questions on WhatsApp.',
    solution: 'Trained a custom AI agent on the product catalogue and order system. The agent handles 85% of queries autonomously and passes complex ones to staff with full context.',
    details: ['Product catalogue search', 'Order status lookup', 'Complaint ticket creation', 'Automatic human escalation', 'Conversation analytics'],
  },
  {
    id: 'vanguard',
    title: 'Vanguard Creative',
    category: 'Website',
    type: 'Sample project',
    tagline: 'Premium agency site that converts',
    description: 'A conversion-focused agency website with animated case studies, a client portal teaser, and a multi-step contact flow that pre-qualifies leads before they reach sales.',
    accent: '#C9A84C',
    stack: ['Next.js 16', 'Framer Motion', 'TypeScript', 'Supabase'],
    metrics: [
      { label: 'Enquiry rate', value: '5×' },
      { label: 'Bounce rate drop', value: '42%' },
      { label: 'Build time', value: '2 weeks' },
    ],
    challenge: 'Their old WordPress site had a 78% bounce rate and generated 1–2 enquiries per month despite significant social media traffic.',
    solution: 'Redesigned from scratch with a clear value proposition, animated portfolio section, and a 3-step contact form that qualifies budget and timeline.',
    details: ['Animated project showcase', '3-step lead qualification form', 'Service pricing page', 'SEO-optimised blog', 'Lighthouse score 98'],
  },
  {
    id: 'healthtrack',
    title: 'HealthTrack Mobile',
    category: 'Mobile App',
    type: 'Sample project',
    tagline: 'Patient appointment management on Flutter',
    description: 'A Flutter mobile app for a private clinic — patients book appointments, receive results, and message their doctor. Staff manage schedules and medical notes.',
    accent: '#1B998B',
    stack: ['Flutter', 'Dart', 'Firebase', 'Supabase', 'Riverpod'],
    metrics: [
      { label: 'App rating', value: '4.8★' },
      { label: 'Monthly active users', value: '1,200+' },
      { label: 'Paperwork eliminated', value: '80%' },
    ],
    challenge: 'Patient records were on paper, appointments were over the phone, and results were sent via email — a fragmented and error-prone experience.',
    solution: 'A unified Flutter app connecting patients and staff. Integrates with their existing lab system for automatic result delivery.',
    details: ['Appointment booking & management', 'Secure medical record access', 'Doctor-patient messaging', 'Lab result delivery', 'Offline support'],
  },
  {
    id: 'shoplocal',
    title: 'ShopLocal Dashboard',
    category: 'SaaS',
    type: 'Sample project',
    tagline: 'Analytics SaaS for local retailers',
    description: 'A lightweight SaaS dashboard that aggregates WhatsApp sales, M-Pesa transactions, and social media mentions into one analytics view for small retailers.',
    accent: '#C0392B',
    stack: ['Next.js 16', 'NestJS', 'PostgreSQL', 'Chart.js', 'M-Pesa API'],
    metrics: [
      { label: 'Active subscribers', value: '45' },
      { label: 'MRR at launch', value: '$1,350' },
      { label: 'Churn rate', value: '4%' },
    ],
    challenge: 'Small retailers had sales data spread across WhatsApp, M-Pesa statements, and Instagram DMs with no unified view.',
    solution: 'A $29/month SaaS that aggregates all channels into one dashboard — daily revenue, top products, customer retention, and simple forecasting.',
    details: ['Multi-channel revenue aggregation', 'M-Pesa integration', 'WhatsApp sales tracking', 'Weekly email digest', 'Mobile-responsive'],
  },
  {
    id: 'portfolio-personal',
    title: 'Zawadi Portfolio',
    category: 'Website',
    type: 'Sample project',
    tagline: 'A designer\'s portfolio that gets interviews',
    description: 'A striking personal portfolio for a UX designer based in Nairobi — with case study deep-dives, a rotating availability banner, and integrated Calendly booking.',
    accent: '#C9A84C',
    stack: ['Next.js 16', 'Framer Motion', 'MDX', 'Tailwind CSS'],
    metrics: [
      { label: 'Interview requests', value: '8 in 30 days' },
      { label: 'Lighthouse score', value: '100' },
      { label: 'Build time', value: '1 week' },
    ],
    challenge: 'The designer had a Behance profile but no personal site — making it hard to tell a cohesive career story or get found on Google.',
    solution: 'Built a fast, animated personal site with MDX-powered case studies, a "currently available" status banner, and Calendly embed for instant bookings.',
    details: ['MDX case studies with images', 'Availability status banner', 'Calendly embed', 'Blog for thought leadership', 'SEO optimised'],
  },
]

/* ─── Case Study Modal ────────────────────────── */
function CaseStudyModal({ project, onClose }: { project: typeof PROJECTS[0]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-void/70 backdrop-blur-md"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        onClick={(e) => e.stopPropagation()}
        className="
          w-full max-w-2xl max-h-[90vh] overflow-y-auto
          bg-whisper dark:bg-void-800
          rounded-3xl
          border border-void/8 dark:border-whisper/8
          shadow-2xl shadow-void/20
        "
      >
        {/* Header */}
        <div className="sticky top-0 bg-whisper dark:bg-void-800 rounded-t-3xl px-8 pt-8 pb-6 border-b border-void/6 dark:border-whisper/6 z-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full mb-3 inline-block"
                style={{ background: `${project.accent}15`, color: project.accent }}>
                {project.category}
              </span>
              <h2 className="font-display font-bold text-2xl text-void dark:text-whisper">{project.title}</h2>
              <p className="text-sm font-medium mt-1" style={{ color: project.accent }}>{project.tagline}</p>
            </div>
            <button onClick={onClose} className="w-9 h-9 rounded-full border border-void/12 dark:border-whisper/12 flex items-center justify-center text-void/40 dark:text-whisper/40 hover:text-void dark:hover:text-whisper hover:border-void/25 dark:hover:border-whisper/25 transition-all flex-shrink-0 cursor-pointer">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          </div>
        </div>

        <div className="px-8 py-6 space-y-8">
          {/* Metrics */}
          <div className="grid grid-cols-3 gap-4">
            {project.metrics.map((m) => (
              <div key={m.label} className="text-center p-4 rounded-2xl bg-void/3 dark:bg-whisper/3 border border-void/6 dark:border-whisper/6">
                <div className="font-display font-bold text-2xl mb-1" style={{ color: project.accent }}>{m.value}</div>
                <div className="text-xs text-void/45 dark:text-whisper/45">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Challenge */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.12em] uppercase text-void/35 dark:text-whisper/35 mb-3">The challenge</h3>
            <p className="text-void/65 dark:text-whisper/65 text-sm leading-relaxed">{project.challenge}</p>
          </div>

          {/* Solution */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.12em] uppercase text-void/35 dark:text-whisper/35 mb-3">Our solution</h3>
            <p className="text-void/65 dark:text-whisper/65 text-sm leading-relaxed">{project.solution}</p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.12em] uppercase text-void/35 dark:text-whisper/35 mb-3">What we built</h3>
            <ul className="space-y-2">
              {project.details.map((d) => (
                <li key={d} className="flex items-center gap-2.5 text-sm text-void/60 dark:text-whisper/60">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ color: project.accent, flexShrink: 0 }}><polyline points="20 6 9 17 4 12" /></svg>
                  {d}
                </li>
              ))}
            </ul>
          </div>

          {/* Stack */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.12em] uppercase text-void/35 dark:text-whisper/35 mb-3">Tech stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((t) => (
                <span key={t} className="text-xs px-3 py-1 rounded-full border border-void/10 dark:border-whisper/10 text-void/50 dark:text-whisper/50">{t}</span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="pt-2">
            <MagneticButton href="/#contact" variant="primary" className="w-full justify-center">
              Build something like this →
            </MagneticButton>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Page ────────────────────────────────────── */
export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null)

  const filtered = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter)

  return (
    <main className="min-h-screen">
      <FloatingNav />

      {/* Header */}
      <section className="pt-36 pb-16 px-6 relative">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(27,153,139,0.05) 0%, transparent 70%)' }} />
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-void/40 dark:text-whisper/40 mb-4">Portfolio</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="font-display font-bold text-[clamp(2.5rem,6vw,5rem)] text-void dark:text-whisper leading-none">
                Work we&apos;re
                <br />
                <span className="text-void/30 dark:text-whisper/30">proud of</span>
              </h1>
            </div>
            <p className="text-void/50 dark:text-whisper/50 max-w-xs text-sm leading-relaxed">
              Sample projects demonstrating what we build — from AI agents to SaaS platforms. All built to production quality.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="px-6 mb-10">
        <div className="max-w-6xl mx-auto flex gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-150 cursor-pointer
                ${activeFilter === cat
                  ? 'bg-void dark:bg-whisper text-whisper dark:text-void border-transparent'
                  : 'bg-transparent text-void/50 dark:text-whisper/50 border-void/10 dark:border-whisper/10 hover:border-void/25 dark:hover:border-whisper/25'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="px-6 pb-28">
        <div className="max-w-6xl mx-auto">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                >
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="group w-full text-left block h-full cursor-pointer"
                  >
                    <div className="h-full rounded-2xl border border-void/8 dark:border-whisper/8 overflow-hidden hover:border-void/18 dark:hover:border-whisper/18 transition-all duration-200 bg-void/2 dark:bg-whisper/2 hover:bg-void/4 dark:hover:bg-whisper/4">
                      {/* Preview area */}
                      <div className="relative h-48 flex items-center justify-center overflow-hidden"
                        style={{ background: `linear-gradient(135deg, ${project.accent}10 0%, transparent 60%)` }}>
                        <div className="absolute inset-0 opacity-[0.03]"
                          style={{ backgroundImage: `linear-gradient(${project.accent} 1px, transparent 1px), linear-gradient(90deg, ${project.accent} 1px, transparent 1px)`, backgroundSize: '28px 28px' }} />
                        {/* Browser chrome */}
                        <div className="w-52 h-32 rounded-xl border border-void/10 dark:border-whisper/10 bg-whisper dark:bg-void-800 overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-300">
                          <div className="bg-void/5 dark:bg-whisper/5 px-3 py-2 flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-crimson/40" />
                            <div className="w-2 h-2 rounded-full bg-gold/40" />
                            <div className="w-2 h-2 rounded-full bg-emerald/40" />
                            <div className="flex-1 bg-void/5 dark:bg-whisper/5 rounded h-2 ml-1" />
                          </div>
                          <div className="p-3 flex items-center justify-center h-[calc(100%-2rem)]"
                            style={{ background: `${project.accent}06` }}>
                            <span className="font-display font-bold text-3xl opacity-20" style={{ color: project.accent }}>
                              {project.title.charAt(0)}
                            </span>
                          </div>
                        </div>

                        {/* Type badge */}
                        <div className="absolute top-3 right-3">
                          <span className="text-[10px] text-void/30 dark:text-whisper/30 bg-whisper/80 dark:bg-void/80 backdrop-blur-sm px-2 py-0.5 rounded-full">
                            {project.type}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                            style={{ background: `${project.accent}15`, color: project.accent }}>
                            {project.category}
                          </span>
                          <div className="flex gap-3 text-xs text-void/35 dark:text-whisper/35">
                            {project.metrics.slice(0, 1).map((m) => (
                              <span key={m.label} className="font-semibold" style={{ color: project.accent }}>
                                {m.value} {m.label.toLowerCase()}
                              </span>
                            ))}
                          </div>
                        </div>
                        <h3 className="font-display font-semibold text-lg text-void dark:text-whisper mb-1 group-hover:text-crimson transition-colors duration-200">
                          {project.title}
                        </h3>
                        <p className="text-sm text-void/50 dark:text-whisper/50 mb-4 line-clamp-2">{project.description}</p>
                        <div className="flex gap-1.5 flex-wrap">
                          {project.stack.slice(0, 3).map((t) => (
                            <span key={t} className="text-[10px] px-2 py-0.5 rounded-md border border-void/6 dark:border-whisper/6 text-void/35 dark:text-whisper/35">{t}</span>
                          ))}
                          {project.stack.length > 3 && (
                            <span className="text-[10px] px-2 py-0.5 rounded-md border border-void/6 dark:border-whisper/6 text-void/35 dark:text-whisper/35">+{project.stack.length - 3}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center border-t border-void/8 dark:border-whisper/8">
        <ScrollReveal className="max-w-xl mx-auto">
          <h2 className="font-display font-bold text-3xl text-void dark:text-whisper mb-4">
            Want something built?
          </h2>
          <p className="text-void/50 dark:text-whisper/50 mb-8">
            Start with a free consultation — we&apos;ll scope it, price it, and build it.
          </p>
          <MagneticButton href="/#contact" variant="primary" size="lg">
            Book a free consultation
          </MagneticButton>
        </ScrollReveal>
      </section>

      <Footer />

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <CaseStudyModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </main>
  )
}
