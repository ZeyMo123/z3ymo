'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import QualificationForm from './QualificationForm'
import BookingCalendar from './BookingCalendar'
import type { ConsultationFormData, ConsultationSlot } from '@/lib/consultation-actions'

type Step = 'form' | 'calendar'

export default function ConsultationFunnel() {
  const router = useRouter()
  const [step,     setStep]    = useState<Step>('form')
  const [formData, setFormData] = useState<ConsultationFormData | null>(null)

  function handleFormComplete(data: ConsultationFormData) {
    setFormData(data)
    setStep('calendar')
  }

  function handleBooked(bookingId: string, slot: ConsultationSlot) {
    // Encode summary in URL so confirmation page is a static page
    const params = new URLSearchParams({
      id:    bookingId,
      date:  slot.date,
      start: slot.start_time,
      end:   slot.end_time,
      tz:    slot.timezone,
      name:  formData?.fullName ?? '',
    })
    router.push(`/services/consultation/bookfreeconsultation/confirmed?${params.toString()}`)
  }

  const slideVariants = {
    enter:  { x: 40, opacity: 0 },
    center: { x: 0,  opacity: 1 },
    exit:   { x: -40, opacity: 0 },
  }

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {step === 'form' && (
          <motion.div
            key="form"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <QualificationForm onComplete={handleFormComplete} />
          </motion.div>
        )}

        {step === 'calendar' && formData && (
          <motion.div
            key="calendar"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <BookingCalendar
              formData={formData}
              onBooked={handleBooked}
              onBack={() => setStep('form')}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
