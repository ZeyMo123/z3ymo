'use client'

import { Suspense, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import FloatingNav from '@/components/layout/FloatingNav'
import Footer from '@/components/layout/Footer'
import QualificationForm from '@/components/consultation/QualificationForm'
import PaymentStep from '@/components/consultation/PaymentStep'
import BookingCalendar from '@/components/consultation/BookingCalendar'
import { GridOverlay, GlowOrb } from '@/components/ui/VisualPrimitives'
import { getPackageById, FORM_CONFIG } from '@/lib/data/consultation-packages'
import type { ConsultationType } from '@/lib/data/consultation-packages'
import type { ConsultationFormData, ConsultationSlot } from '@/lib/consultation-actions'

// ─── Step types ───────────────────────────────────────────────

type Step = 'form' | 'payment' | 'calendar'

// ─── Progress indicator ───────────────────────────────────────

function ProgressBar({ step, type }: { step: Step; type: ConsultationType }) {
  const steps: Step[] = ['form', 'payment', 'calendar']
  const current = steps.indexOf(step)

  const labels: Record<Step, string> = {
    form:     'Your details',
    payment:  'Payment',
    calendar: 'Choose a time',
  }

  return (
    <div className="flex items-center gap-2 mb-8">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-2 flex-1">
          <div className="flex items-center gap-2">
            <div className={[
              'w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all duration-300',
              i < current
                ? 'bg-emerald-500 border-emerald-500 text-white'
                : i === current
                  ? 'border-crimson text-crimson bg-crimson/8'
                  : 'border-void/15 dark:border-whisper/15 text-void/25 dark:text-whisper/25',
            ].join(' ')}>
              {i < current ? (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                i + 1
              )}
            </div>
            <span className={`text-xs font-medium hidden sm:block ${
              i === current ? 'text-void dark:text-whisper' : 'text-void/35 dark:text-whisper/35'
            }`}>
              {labels[s]}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className="flex-1 h-px mx-2"
              style={{ background: i < current ? '#1B998B' : 'rgba(10,10,15,0.08)' }} />
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Slide variants ───────────────────────────────────────────

const SLIDE = {
  enter:  { x: 40, opacity: 0 },
  center: { x: 0,  opacity: 1 },
  exit:   { x: -40, opacity: 0 },
}

// ─── Inner component (needs useSearchParams) ──────────────────

function PaidBookingInner() {
  const params  = useSearchParams()
  const router  = useRouter()
  const rawType = params.get('type') ?? 'tech'
  const type    = (rawType === 'strategy' ? 'strategy' : 'tech') as ConsultationType

  const pkg    = getPackageById(type)
  const config = FORM_CONFIG[type]

  const [step,      setStep]      = useState<Step>('form')
  const [formData,  setFormData]  = useState<ConsultationFormData | null>(null)
  const [direction, setDirection] = useState(1)

  function goForward(next: Step) {
    setDirection(1)
    setStep(next)
  }
  function goBack(prev: Step) {
    setDirection(-1)
    setStep(prev)
  }

  function handleFormComplete(data: ConsultationFormData) {
    setFormData(data)
    goForward('payment')
  }

  function handlePaymentComplete() {
    goForward('calendar')
  }

  function handleBooked(bookingId: string, slot: ConsultationSlot) {
    const p = new URLSearchParams({
      id:    bookingId,
      date:  slot.date,
      start: slot.start_time,
      end:   slot.end_time,
      tz:    slot.timezone,
      name:  formData?.fullName ?? '',
      type,
    })
    router.push(`/services/consultation/bookfreeconsultation/confirmed?${p}`)
  }

  const slideVariants = {
    enter:  (d: number) => ({ x: d > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (d: number) => ({ x: d > 0 ? -40 : 40, opacity: 0 }),
  }

  return (
    <main className="min-h-screen bg-[#0B0B0F]">
      <FloatingNav />

      {/* Focus mode visual layer */}
      <div className="fixed inset-0 pointer-events-none">
        <GridOverlay opacity={0.028} />
        <GlowOrb color="#C0392B" x="20%" y="30%" size="50%" intensity={0.06} />
        <GlowOrb color="#1B998B" x="80%" y="70%" size="45%" intensity={0.05} />
      </div>

      <section className="relative pt-32 pb-24 px-6 z-10">
        <div className="max-w-5xl mx-auto">

          {/* Page header */}
          <div className="mb-8">
            <a href="/services/consultation"
              className="inline-flex items-center gap-2 text-sm text-void/45 dark:text-whisper/45 hover:text-void dark:hover:text-whisper transition-colors mb-6 group">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                className="transition-transform group-hover:-translate-x-0.5">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Consultation options
            </a>

            {/* Type badge */}
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full border"
              style={{ borderColor: `${pkg.accent}30`, background: `${pkg.accent}08` }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: pkg.accent }} />
              <span className="text-xs font-semibold tracking-wide" style={{ color: pkg.accent }}>
                {config.badgeText}
              </span>
            </div>

            <h1 className="font-display font-bold text-[clamp(2rem,4vw,3rem)] text-void dark:text-whisper mb-2">
              {pkg.title}
            </h1>
            <p className="text-sm text-void/50 dark:text-whisper/50 max-w-lg leading-relaxed">
              {pkg.explanation} This short process helps us understand your needs before we speak.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">

            {/* Main card — dark glass */}
            <div className="bg-white/[0.04] dark:bg-white/[0.04] rounded-3xl border border-white/[0.08] backdrop-blur-xl p-8 shadow-[0_4px_40px_rgba(0,0,0,0.5)]">
              <ProgressBar step={step} type={type} />

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={step}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                >
                  {step === 'form' && (
                    <QualificationForm
                      onComplete={handleFormComplete}
                      consultationType={type}
                    />
                  )}
                  {step === 'payment' && (
                    <PaymentStep
                      consultationType={type}
                      onComplete={handlePaymentComplete}
                      onBack={() => goBack('form')}
                    />
                  )}
                  {step === 'calendar' && formData && (
                    <BookingCalendar
                      formData={formData}
                      onBooked={handleBooked}
                      onBack={() => goBack('payment')}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Sidebar */}
            <div className="space-y-5 lg:sticky lg:top-24">

              {/* Package summary */}
              <div className="rounded-2xl border p-6"
                style={{ borderColor: `${pkg.accent}22`, background: `${pkg.accent}04` }}>
                <div className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: pkg.accent }}>
                  {pkg.label}
                </div>
                <div className="font-display font-bold text-2xl text-void dark:text-whisper mb-1">
                  {pkg.price}
                </div>
                <div className="text-xs text-void/40 dark:text-whisper/40 mb-4">{pkg.duration}</div>

                {pkg.deliverable && (
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-void/30 dark:text-whisper/30 mb-2">
                      What you get
                    </div>
                    <p className="text-xs text-void/55 dark:text-whisper/55 leading-relaxed">
                      {pkg.deliverable}
                    </p>
                  </div>
                )}
              </div>

              {/* Trust line */}
              {pkg.trustLine && (
                <div className="rounded-2xl border border-void/8 dark:border-whisper/8 p-5">
                  <p className="text-xs text-void/50 dark:text-whisper/50 leading-relaxed italic">
                    {pkg.trustLine}
                  </p>
                </div>
              )}

              {/* Positioning */}
              <div className="rounded-2xl border border-void/8 dark:border-whisper/8 p-5">
                <p className="text-xs text-void/40 dark:text-whisper/40 leading-relaxed italic">
                  "{pkg.positioning}"
                </p>
              </div>

              {/* Not this? */}
              <div className="text-center pt-2">
                <p className="text-xs text-void/30 dark:text-whisper/30 mb-2">
                  Looking for a different option?
                </p>
                <a href="/services/consultation"
                  className="text-xs text-crimson hover:underline">
                  View all consultation packages →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

// ─── Page wrapper with Suspense ───────────────────────────────

export default function PaidBookingPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-crimson/25 border-t-crimson animate-spin" />
          <p className="text-sm text-void/40 dark:text-whisper/40">Loading…</p>
        </div>
      </main>
    }>
      <PaidBookingInner />
    </Suspense>
  )
}
