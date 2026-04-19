'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ConsultationType } from '@/lib/data/consultation-packages'
import { getPackageById } from '@/lib/data/consultation-packages'

// ─── Payment method types ─────────────────────────────────────

type PaymentMethod = 'mobile-money' | 'local-bank' | 'card'

interface PaymentDetails {
  method:  PaymentMethod
  // Mobile money
  provider?: string
  phone?:    string
  // Bank
  bankName?: string
  reference?: string
  // Card
  cardName?:    string
  cardNumber?:  string
  cardExpiry?:  string
  cardCvc?:     string
}

// ─── SVG icons ────────────────────────────────────────────────

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <rect x="5" y="2" width="14" height="20" rx="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
)

const BankIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M8 10v11M12 10v11M16 10v11M20 10v11" />
  </svg>
)

const CardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <rect x="1" y="4" width="22" height="16" rx="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
)

const LockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
)

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
    className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

// ─── Field component ──────────────────────────────────────────

const FIELD_CLS = 'w-full px-4 py-3 rounded-xl border border-void/10 dark:border-whisper/10 bg-transparent text-void dark:text-whisper text-sm placeholder:text-void/30 dark:placeholder:text-whisper/30 focus:outline-none focus:border-crimson/40 focus:ring-2 focus:ring-crimson/8 transition-all'

function Field({
  label, children,
}: {
  label:    string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-void/40 dark:text-whisper/40 mb-2">
        {label}
      </label>
      {children}
    </div>
  )
}

// ─── Method selector tab ──────────────────────────────────────

function MethodTab({
  method, active, icon, label, subtitle, onClick,
}: {
  method:   PaymentMethod
  active:   boolean
  icon:     React.ReactNode
  label:    string
  subtitle: string
  onClick:  () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'flex items-start gap-3.5 p-4 rounded-2xl border text-left transition-all cursor-pointer',
        active
          ? 'border-crimson/30 bg-crimson/4'
          : 'border-void/8 dark:border-whisper/8 hover:border-void/16 dark:hover:border-whisper/16',
      ].join(' ')}
    >
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${active ? 'bg-crimson/12 text-crimson' : 'bg-void/5 dark:bg-whisper/5 text-void/45 dark:text-whisper/45'}`}>
        {icon}
      </div>
      <div>
        <div className={`text-sm font-semibold ${active ? 'text-crimson' : 'text-void/70 dark:text-whisper/70'}`}>
          {label}
        </div>
        <div className="text-xs text-void/40 dark:text-whisper/40 mt-0.5">{subtitle}</div>
      </div>
      {active && (
        <div className="ml-auto shrink-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="#C0392B" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      )}
    </button>
  )
}

// ─── Mobile money providers ───────────────────────────────────

const MOBILE_PROVIDERS = [
  { id: 'mpesa',    label: 'M-Pesa',    flag: 'KE/TZ' },
  { id: 'airtel',   label: 'Airtel Money', flag: 'TZ/UG' },
  { id: 'tigopesa', label: 'Tigo Pesa', flag: 'TZ' },
  { id: 'halopesa', label: 'HaloPesa',  flag: 'TZ' },
  { id: 'mtn',      label: 'MTN Money', flag: 'UG/RW' },
]

// ─── Main component ───────────────────────────────────────────

interface PaymentStepProps {
  consultationType: ConsultationType
  onComplete:       (details: PaymentDetails) => void
  onBack:           () => void
}

export default function PaymentStep({
  consultationType, onComplete, onBack,
}: PaymentStepProps) {
  const pkg = getPackageById(consultationType)

  const [method,      setMethod]      = useState<PaymentMethod | null>(null)
  const [details,     setDetails]     = useState<Partial<PaymentDetails>>({})
  const [error,       setError]       = useState('')
  const [processing,  setProcessing]  = useState(false)
  const [infoOpen,    setInfoOpen]    = useState(false)

  function update(patch: Partial<PaymentDetails>) {
    setDetails((d) => ({ ...d, ...patch }))
    setError('')
  }

  function validate(): boolean {
    if (!method) { setError('Please select a payment method.'); return false }

    if (method === 'mobile-money') {
      if (!details.provider) { setError('Please select your mobile money provider.'); return false }
      if (!details.phone?.trim()) { setError('Please enter your phone number.'); return false }
    }
    if (method === 'local-bank') {
      if (!details.bankName?.trim()) { setError('Please enter your bank name.'); return false }
    }
    if (method === 'card') {
      if (!details.cardName?.trim())   { setError('Please enter the name on the card.'); return false }
      if (!details.cardNumber?.trim()) { setError('Please enter the card number.'); return false }
      if (!details.cardExpiry?.trim()) { setError('Please enter the expiry date.'); return false }
      if (!details.cardCvc?.trim())    { setError('Please enter the CVC.'); return false }
    }
    return true
  }

  async function handleSubmit() {
    if (!validate()) return
    setProcessing(true)
    // Simulate processing — real payment gateway integration goes here
    await new Promise((r) => setTimeout(r, 1200))
    setProcessing(false)
    onComplete({ method: method!, ...details })
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-void/50 dark:text-whisper/50 hover:text-void dark:hover:text-whisper transition-colors cursor-pointer">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back
        </button>
        <div className="h-4 w-px bg-void/12 dark:bg-whisper/12" />
        <h2 className="font-display font-bold text-xl text-void dark:text-whisper">
          Complete payment
        </h2>
      </div>

      {/* Package summary */}
      <div className="flex items-center justify-between p-4 rounded-2xl mb-6"
        style={{ background: `${pkg.accent}06`, border: `1px solid ${pkg.accent}18` }}>
        <div>
          <div className="font-display font-semibold text-sm text-void dark:text-whisper">
            {pkg.title}
          </div>
          <div className="text-xs text-void/45 dark:text-whisper/45 mt-0.5">{pkg.duration}</div>
        </div>
        <div className="font-display font-bold text-lg" style={{ color: pkg.accent }}>
          {pkg.price}
        </div>
      </div>

      {/* Invoice note (collapsible) */}
      <button
        type="button"
        onClick={() => setInfoOpen(!infoOpen)}
        className="w-full flex items-center justify-between text-xs text-void/40 dark:text-whisper/40 mb-5 cursor-pointer hover:text-void/60 dark:hover:text-whisper/60 transition-colors"
      >
        <span className="flex items-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          How payment and invoicing works
        </span>
        <ChevronIcon open={infoOpen} />
      </button>

      <AnimatePresence>
        {infoOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-void/3 dark:bg-whisper/3 rounded-2xl p-4 mb-5 text-xs text-void/55 dark:text-whisper/55 space-y-2 leading-relaxed">
              <p>Your payment details are used to generate an invoice after your consultation is confirmed.</p>
              <p>If you also decide to proceed with a development project with Z3ymo, this consultation fee is applied toward your total project investment — it's not an extra cost.</p>
              <p className="flex items-center gap-1.5 text-void/40 dark:text-whisper/40">
                <LockIcon /> Your payment information is handled securely.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Method selection */}
      <p className="text-[11px] font-semibold uppercase tracking-wider text-void/35 dark:text-whisper/35 mb-3">
        Select payment method
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <MethodTab
          method="mobile-money" active={method === 'mobile-money'}
          icon={<PhoneIcon />}
          label="Mobile Money"
          subtitle="M-Pesa, Airtel, Tigo, Halo"
          onClick={() => { setMethod('mobile-money'); update({ method: 'mobile-money' }) }}
        />
        <MethodTab
          method="local-bank" active={method === 'local-bank'}
          icon={<BankIcon />}
          label="Local Bank"
          subtitle="East African bank transfer"
          onClick={() => { setMethod('local-bank'); update({ method: 'local-bank' }) }}
        />
        <MethodTab
          method="card" active={method === 'card'}
          icon={<CardIcon />}
          label="Card"
          subtitle="Visa, Mastercard — international"
          onClick={() => { setMethod('card'); update({ method: 'card' }) }}
        />
      </div>

      {/* Dynamic form per method */}
      <AnimatePresence mode="wait">
        {method === 'mobile-money' && (
          <motion.div key="mobile"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <Field label="Provider">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {MOBILE_PROVIDERS.map((p) => (
                  <button key={p.id} type="button"
                    onClick={() => update({ provider: p.id })}
                    className={[
                      'py-2.5 px-3 rounded-xl border text-sm transition-all cursor-pointer text-left',
                      details.provider === p.id
                        ? 'border-crimson/30 bg-crimson/6 text-crimson font-medium'
                        : 'border-void/8 dark:border-whisper/8 text-void/60 dark:text-whisper/60 hover:border-void/16 dark:hover:border-whisper/16',
                    ].join(' ')}>
                    <div className="font-medium">{p.label}</div>
                    <div className="text-[10px] opacity-60">{p.flag}</div>
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Phone number">
              <input type="tel" placeholder="+255 7XX XXX XXX"
                value={details.phone ?? ''}
                onChange={(e) => update({ phone: e.target.value })}
                className={FIELD_CLS} />
            </Field>
            <div className="text-xs text-void/40 dark:text-whisper/40 leading-relaxed p-3.5 rounded-xl bg-void/3 dark:bg-whisper/3">
              After booking, you'll receive a payment prompt on this number. The consultation will be confirmed once payment clears.
            </div>
          </motion.div>
        )}

        {method === 'local-bank' && (
          <motion.div key="bank"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* Our bank details */}
            <div className="p-4 rounded-2xl border border-void/8 dark:border-whisper/8 space-y-2 text-sm">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-void/30 dark:text-whisper/30 mb-3">
                Transfer to
              </p>
              {[
                { label: 'Account name',   value: 'Z3ymo Limited' },
                { label: 'Bank',           value: 'CRDB Bank Tanzania' },
                { label: 'Account number', value: '01J1234567890' },
                { label: 'Reference',      value: `CONSULT-${Date.now().toString(36).toUpperCase().slice(-6)}` },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between">
                  <span className="text-void/40 dark:text-whisper/40">{label}</span>
                  <span className="font-medium text-void dark:text-whisper">{value}</span>
                </div>
              ))}
            </div>
            <Field label="Your bank name">
              <input type="text" placeholder="e.g. NMB, CRDB, Equity"
                value={details.bankName ?? ''}
                onChange={(e) => update({ bankName: e.target.value })}
                className={FIELD_CLS} />
            </Field>
            <Field label="Transfer reference (optional)">
              <input type="text" placeholder="Transaction ID or reference number"
                value={details.reference ?? ''}
                onChange={(e) => update({ reference: e.target.value })}
                className={FIELD_CLS} />
            </Field>
            <div className="text-xs text-void/40 dark:text-whisper/40 p-3.5 rounded-xl bg-void/3 dark:bg-whisper/3">
              Make the transfer using the details above, then click Continue. We'll confirm once the transfer is received, usually within a few hours.
            </div>
          </motion.div>
        )}

        {method === 'card' && (
          <motion.div key="card"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 text-xs text-void/40 dark:text-whisper/40 mb-1">
              <LockIcon />
              Visa and Mastercard accepted · International cards supported
            </div>
            <Field label="Name on card">
              <input type="text" placeholder="Full name as shown on card"
                value={details.cardName ?? ''}
                onChange={(e) => update({ cardName: e.target.value })}
                autoComplete="cc-name" className={FIELD_CLS} />
            </Field>
            <Field label="Card number">
              <input type="text" placeholder="1234 5678 9012 3456"
                value={details.cardNumber ?? ''}
                onChange={(e) => update({ cardNumber: e.target.value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim() })}
                autoComplete="cc-number" inputMode="numeric" className={FIELD_CLS} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Expiry date">
                <input type="text" placeholder="MM / YY"
                  value={details.cardExpiry ?? ''}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, '').slice(0, 4)
                    update({ cardExpiry: v.length > 2 ? `${v.slice(0,2)} / ${v.slice(2)}` : v })
                  }}
                  autoComplete="cc-exp" inputMode="numeric" className={FIELD_CLS} />
              </Field>
              <Field label="CVC">
                <input type="text" placeholder="123"
                  value={details.cardCvc ?? ''}
                  onChange={(e) => update({ cardCvc: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                  autoComplete="cc-csc" inputMode="numeric" className={FIELD_CLS} />
              </Field>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error */}
      {error && (
        <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-crimson mt-4">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" />
          </svg>
          {error}
        </motion.div>
      )}

      {/* Submit */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={processing || !method}
        className="w-full mt-6 flex items-center justify-center gap-2.5 py-3.5 rounded-2xl bg-crimson text-white text-sm font-semibold disabled:opacity-50 hover:bg-crimson/90 active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-crimson/20"
      >
        {processing ? (
          <>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" className="animate-spin">
              <path d="M21 12a9 9 0 11-6.219-8.56" />
            </svg>
            Processing…
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Continue to choose a time slot
          </>
        )}
      </button>
    </div>
  )
}
