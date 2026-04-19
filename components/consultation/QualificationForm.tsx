'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ConsultationFormData } from '@/lib/consultation-actions'
import type { ConsultationType } from '@/lib/data/consultation-packages'
import { FORM_CONFIG } from '@/lib/data/consultation-packages'

// ─── Extended form data (includes readiness for paid tiers) ───

export interface ExtendedFormData extends ConsultationFormData {
  readyToInvest?: string
}

// ─── Step definitions ─────────────────────────────────────────

interface FormStep {
  id:      string
  question: string
  hint?:    string
  type:    'options' | 'textarea' | 'contact'
  options?: Array<{ value: string; label: string }>
}

function buildSteps(type: ConsultationType): FormStep[] {
  const config = FORM_CONFIG[type]
  const isPaid = type !== 'free'

  return [
    {
      id:       'businessType',
      question: 'What type of business do you run?',
      hint:     'Select the option that best describes you.',
      type:     'options',
      options: [
        { value: 'creator',     label: 'Creator / coach' },
        { value: 'ecommerce',   label: 'Online store' },
        { value: 'beauty',      label: 'Beauty / salon' },
        { value: 'fashion',     label: 'Fashion brand' },
        { value: 'food',        label: 'Restaurant / catering' },
        { value: 'service',     label: 'Service business' },
        { value: 'marketplace', label: 'Marketplace / platform' },
        { value: 'other',       label: 'Other' },
      ],
    },
    {
      id:       'buildGoal',
      question: 'What do you want to build?',
      type:     'options',
      options: [
        { value: 'ecommerce',    label: 'E-commerce platform' },
        { value: 'booking',      label: 'Booking platform' },
        { value: 'creator',      label: 'Creator platform' },
        { value: 'marketplace',  label: 'Marketplace' },
        { value: 'ai-agent',     label: 'AI agent / automation' },
        { value: 'custom',       label: 'Custom software' },
        { value: 'unsure',       label: 'Not sure yet' },
      ],
    },
    {
      id:       'challenges',
      question: isPaid
        ? 'Describe your current situation and what you want to achieve'
        : 'What challenges are you facing?',
      hint:     isPaid
        ? 'Be specific — this is the core of our session preparation.'
        : 'Be as specific as you can — this helps us prepare the right recommendations.',
      type:     'textarea',
    },
    {
      id:       'businessStage',
      question: 'What stage is your business at?',
      type:     'options',
      options: [
        { value: 'idea',        label: 'Idea stage' },
        { value: 'early',       label: 'Early stage' },
        { value: 'growing',     label: 'Growing business' },
        { value: 'established', label: 'Established company' },
      ],
    },
    {
      id:       'budget',
      question: config.budgetLabel,
      hint:     'This helps us recommend the right approach and level of investment.',
      type:     'options',
      options: [
        { value: 'under-1k',  label: 'Under $1K' },
        { value: '1k-5k',     label: '$1K – $5K' },
        { value: '5k-20k',    label: '$5K – $20K' },
        { value: '20k-plus',  label: '$20K+' },
        { value: 'unknown',   label: "I'm not sure yet" },
      ],
    },
    // Readiness qualifier — paid tiers only
    ...(config.qualifyQuestion
      ? [{
          id:       'readyToInvest',
          question: 'Are you ready to invest in building this solution if it\'s the right fit?',
          hint:     'This helps us understand how to best prepare for our session.',
          type:     'options' as const,
          options: [
            { value: 'yes',        label: 'Yes — ready to move forward' },
            { value: 'maybe',      label: 'Maybe — depends on the direction' },
            { value: 'exploring',  label: 'Just exploring for now' },
          ],
        }]
      : []
    ),
    {
      id:       'launchTimeline',
      question: 'When do you want to launch?',
      type:     'options',
      options: [
        { value: 'immediately', label: 'As soon as possible' },
        { value: '3-months',    label: 'Within 3 months' },
        { value: '6-months',    label: 'Within 6 months' },
        { value: 'exploring',   label: 'Just exploring for now' },
      ],
    },
    {
      id:       'contact',
      question: 'Last step — where should we reach you?',
      hint:     'Your details are only used to confirm and prepare for your consultation.',
      type:     'contact',
    },
  ]
}

// ─── Sub-components ───────────────────────────────────────────

function OptionCard({
  value, label, selected, onClick,
}: {
  value:    string
  label:    string
  selected: boolean
  onClick:  () => void
}) {
  return (
    <button type="button" onClick={onClick}
      className={[
        'flex items-center gap-3 w-full px-4 py-3.5 rounded-2xl border-2 text-left transition-all duration-150 cursor-pointer',
        selected
          ? 'border-crimson bg-crimson/5 dark:bg-crimson/8'
          : 'border-void/10 dark:border-whisper/10 hover:border-void/25 dark:hover:border-whisper/25 bg-void/2 dark:bg-whisper/2',
      ].join(' ')}
    >
      <span className={`text-sm font-medium transition-colors ${selected ? 'text-crimson' : 'text-void/70 dark:text-whisper/70'}`}>
        {label}
      </span>
      {selected && (
        <svg className="ml-auto shrink-0" width="14" height="14" viewBox="0 0 24 24"
          fill="none" stroke="#C0392B" strokeWidth="2.5" strokeLinecap="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </button>
  )
}

function ProgressDots({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={[
          'rounded-full transition-all duration-300',
          i < current  ? 'w-6 h-1.5 bg-crimson'
          : i === current ? 'w-4 h-1.5 bg-crimson/50'
          : 'w-1.5 h-1.5 bg-void/15 dark:bg-whisper/15',
        ].join(' ')} />
      ))}
    </div>
  )
}

// ─── Field component ──────────────────────────────────────────

const INPUT_CLS = 'w-full px-5 py-3.5 rounded-2xl border border-void/12 dark:border-whisper/12 bg-transparent text-void dark:text-whisper text-sm placeholder:text-void/30 dark:placeholder:text-whisper/30 focus:outline-none focus:border-crimson/50 focus:ring-2 focus:ring-crimson/10 transition-all'

// ─── Main component ───────────────────────────────────────────

interface Props {
  onComplete:        (data: ConsultationFormData) => void
  consultationType?: ConsultationType
}

const EMPTY: ExtendedFormData = {
  businessType:   '',
  buildGoal:      '',
  challenges:     '',
  businessStage:  '',
  budget:         '',
  launchTimeline: '',
  fullName:       '',
  email:          '',
  whatsapp:       '',
  readyToInvest:  '',
}

export default function QualificationForm({
  onComplete,
  consultationType = 'free',
}: Props) {
  const STEPS = buildSteps(consultationType)

  const [currentStep, setCurrentStep] = useState(0)
  const [data,        setData]        = useState<ExtendedFormData>(EMPTY)
  const [error,       setError]       = useState('')
  const [direction,   setDirection]   = useState(1)

  const step   = STEPS[currentStep]
  const isLast = currentStep === STEPS.length - 1

  function getValue(stepId: string): string {
    if (stepId === 'contact') return data.fullName
    return (data as any)[stepId] ?? ''
  }

  function validate(): boolean {
    setError('')
    if (step.type === 'contact') {
      if (!data.fullName.trim()) { setError('Please enter your full name.'); return false }
      if (!data.email.trim() || !data.email.includes('@')) { setError('Please enter a valid email address.'); return false }
      if (!data.whatsapp.trim()) { setError('Please enter your WhatsApp number.'); return false }
      return true
    }
    if (step.type === 'options' && !getValue(step.id)) {
      setError('Please select an option to continue.')
      return false
    }
    if (step.type === 'textarea' && !data.challenges.trim()) {
      setError('Please describe your situation — this helps us prepare for the call.')
      return false
    }
    return true
  }

  function handleNext() {
    if (!validate()) return
    if (isLast) { onComplete(data); return }
    setDirection(1)
    setCurrentStep((s) => s + 1)
  }

  function handleBack() {
    setError('')
    setDirection(-1)
    setCurrentStep((s) => Math.max(0, s - 1))
  }

  function setOption(field: string, value: string) {
    setData((d) => ({ ...d, [field]: value }))
    setError('')
    setTimeout(() => {
      setDirection(1)
      setCurrentStep((s) => Math.min(STEPS.length - 1, s + 1))
    }, 220)
  }

  const variants = {
    enter:  (d: number) => ({ x: d > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (d: number) => ({ x: d > 0 ? -40 : 40, opacity: 0 }),
  }

  const progress = (currentStep / (STEPS.length - 1)) * 100

  return (
    <div>
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <ProgressDots total={STEPS.length} current={currentStep} />
          <span className="text-xs text-void/35 dark:text-whisper/35 font-medium">
            {currentStep + 1} of {STEPS.length}
          </span>
        </div>
        <div className="h-0.5 bg-void/8 dark:bg-whisper/8 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-crimson rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentStep}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-2">
            <h3 className="font-display font-bold text-xl text-void dark:text-whisper mb-1">
              {step.question}
            </h3>
            {step.hint && (
              <p className="text-sm text-void/45 dark:text-whisper/45">{step.hint}</p>
            )}
          </div>

          {/* Options */}
          {step.type === 'options' && step.options && (
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {step.options.map((opt) => (
                <OptionCard
                  key={opt.value}
                  value={opt.value}
                  label={opt.label}
                  selected={getValue(step.id) === opt.value}
                  onClick={() => setOption(step.id, opt.value)}
                />
              ))}
            </div>
          )}

          {/* Textarea */}
          {step.type === 'textarea' && (
            <div className="mt-5">
              <textarea
                value={data.challenges}
                onChange={(e) => setData((d) => ({ ...d, challenges: e.target.value }))}
                rows={6}
                placeholder={
                  consultationType !== 'free'
                    ? 'e.g. We run a growing salon business, manage bookings through WhatsApp, and want a professional system with client records, automated reminders, and online payments…'
                    : 'e.g. We manage bookings over WhatsApp — it\'s chaotic and we lose customers...'
                }
                className={`${INPUT_CLS} resize-none leading-relaxed`}
              />
              <p className="text-xs text-void/35 dark:text-whisper/35 mt-2">
                {data.challenges.length} characters
                {consultationType !== 'free' && ' — the more detail, the better we can prepare'}
              </p>
            </div>
          )}

          {/* Contact */}
          {step.type === 'contact' && (
            <div className="mt-5 space-y-4">
              {([
                { field: 'fullName', label: 'Full name',       type: 'text',  placeholder: 'Amina Hassan' },
                { field: 'email',    label: 'Email address',   type: 'email', placeholder: 'amina@yourbusiness.com' },
                { field: 'whatsapp', label: 'WhatsApp number', type: 'tel',   placeholder: '+255 712 345 678' },
              ] as const).map(({ field, label, type, placeholder }) => (
                <div key={field}>
                  <label className="block text-xs font-semibold text-void/50 dark:text-whisper/50 uppercase tracking-wider mb-2">
                    {label}
                  </label>
                  <input type={type} value={data[field]} placeholder={placeholder}
                    onChange={(e) => setData((d) => ({ ...d, [field]: e.target.value }))}
                    className={INPUT_CLS} />
                </div>
              ))}
              <p className="text-xs text-void/35 dark:text-whisper/35 pt-1">
                Your information is only used to confirm and prepare for your consultation.
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Error */}
      {error && (
        <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex items-center gap-2.5 text-sm text-crimson">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" />
          </svg>
          {error}
        </motion.div>
      )}

      {/* Nav buttons for non-option steps */}
      {(step.type === 'textarea' || step.type === 'contact') && (
        <div className="flex items-center justify-between mt-8">
          <button type="button" onClick={handleBack}
            className="flex items-center gap-2 text-sm text-void/50 dark:text-whisper/50 hover:text-void dark:hover:text-whisper transition-colors cursor-pointer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back
          </button>
          <button type="button" onClick={handleNext}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-crimson text-white text-sm font-semibold hover:bg-crimson/90 active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-crimson/25">
            {isLast ? (
              consultationType === 'free' ? 'Choose a time slot' : 'Continue to payment'
            ) : 'Continue'}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Back button for option steps */}
      {step.type === 'options' && currentStep > 0 && (
        <div className="mt-6">
          <button type="button" onClick={handleBack}
            className="flex items-center gap-2 text-sm text-void/40 dark:text-whisper/40 hover:text-void dark:hover:text-whisper transition-colors cursor-pointer">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Go back
          </button>
        </div>
      )}
    </div>
  )
}
