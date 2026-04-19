// ─────────────────────────────────────────────────────────────────
// lib/data/consultation-packages.ts
// Single source of truth for all consultation package content.
// Used by: ConsultationPackages section, hub page, booking pages.
// ─────────────────────────────────────────────────────────────────

export type ConsultationType = 'free' | 'tech' | 'strategy'

export interface ConsultationPackage {
  id:              ConsultationType
  label:           string        // card pill: "Start Here" | "Most Popular" | "For Serious Projects"
  title:           string
  tagline:         string
  price:           string        // "$0" | "$100 – $300" | "$300 – $1,500+"
  priceNote:       string
  duration:        string
  explanation:     string        // one-line summary
  purpose:         string        // "Turn confusion into a clear plan"
  feelingTitle:    string        // "By the end of this call, you'll feel:"
  feelings:        string[]
  includes:        string[]
  notIncludes?:    string[]      // only for Free
  deliverable?:    string        // tangible output for paid tiers
  bestFor:         string[]
  positioning:     string        // italic quote
  trustLine?:      string        // "If you decide to build..." — paid only
  cta:             string        // button label
  href:            string        // where the CTA goes
  accent:          string        // hex color
  requiresPayment: boolean
}

// ─── Packages ─────────────────────────────────────────────────

export const CONSULTATION_PACKAGES: ConsultationPackage[] = [
  // ── 1. Free ───────────────────────────────────────────────
  {
    id:          'free',
    label:       'Start Here',
    title:       'Free Consultation',
    tagline:     'Clarity before commitment',
    price:       '$0',
    priceNote:   'Free · Always',
    duration:    '20–30 min',
    explanation: 'A short call to understand your business and help you decide your next step — without overthinking or guessing.',
    purpose:     'Understand your situation and guide you clearly',
    feelingTitle: 'By the end of this call, you\'ll feel:',
    feelings: [
      'Less confused about where to start',
      'More clear on the right direction to take',
      'More confident about your next move',
    ],
    includes: [
      '20–30 minute conversation',
      'We listen to your idea or business',
      'We identify where you\'re stuck',
      'We point you in the right direction',
    ],
    notIncludes: [
      'No deep system design',
      'No full strategy session',
      'No technical breakdown',
    ],
    bestFor: [
      'You\'re exploring an idea',
      'You feel stuck or unsure',
      'You don\'t know what you actually need yet',
    ],
    positioning:     'This is a starting point — to help you think clearly before making any decisions.',
    cta:             'Book Free Call',
    href:            '/services/consultation/bookfreeconsultation',
    accent:          '#1B998B',
    requiresPayment: false,
  },

  // ── 2. Tech Consultation ──────────────────────────────────
  {
    id:          'tech',
    label:       'Most Popular',
    title:       'Tech Consultation',
    tagline:     'Plan your system clearly',
    price:       '$100 – $300',
    priceNote:   'One-time session',
    duration:    '60–90 min',
    explanation: 'A focused session where we break down your idea and show you exactly what needs to be built — and what doesn\'t.',
    purpose:     'Turn confusion into a clear, actionable plan',
    feelingTitle: 'By the end of this session, you\'ll have:',
    feelings: [
      'A clear understanding of what you need',
      'No more guessing or overthinking',
      'Confidence to move forward without wasting money',
    ],
    includes: [
      'We break down your idea into something structured',
      'We identify the essential features (not everything)',
      'We explain how your system should work, in simple terms',
      'We highlight what you should avoid building',
    ],
    deliverable: 'A simple, clear written summary — what to build, what to skip, and how to approach it.',
    bestFor: [
      'You\'re ready to build something',
      'You don\'t want to waste money on the wrong solution',
      'You\'ve been confused by too many options or tools',
    ],
    positioning:  'For when you want clarity before you invest — so you don\'t build the wrong thing.',
    trustLine:    'If you decide to build with Z3ymo, this session becomes part of your project investment — not an extra cost.',
    cta:          'Book Tech Consultation',
    href:         '/services/consultation/book?type=tech',
    accent:       '#C9A84C',
    requiresPayment: true,
  },

  // ── 3. Product Strategy ───────────────────────────────────
  {
    id:          'strategy',
    label:       'For Serious Projects',
    title:       'Product Strategy',
    tagline:     'Define your product direction',
    price:       '$300 – $1,500+',
    priceNote:   'Depth & complexity-based',
    duration:    '2–3 hours',
    explanation: 'A deeper session where we help you shape your idea into something that people will actually use and pay for.',
    purpose:     'Make sure what you build actually works in the real world',
    feelingTitle: 'By the end, you\'ll have:',
    feelings: [
      'A clear product direction',
      'A strong understanding of your users',
      'A focused plan instead of scattered ideas',
    ],
    includes: [
      'We refine your idea into something practical',
      'We identify who it\'s really for',
      'We define what matters most (and remove what doesn\'t)',
      'We shape how your product should feel and function',
    ],
    deliverable: 'A structured product plan: clear priorities, what to build first, and a roadmap you can actually follow.',
    bestFor: [
      'You want to build something serious',
      'You\'re not 100% sure your idea will work yet',
      'You want to avoid building something people don\'t use',
    ],
    positioning:  'For when you don\'t just want to build — you want to build something that works.',
    trustLine:    'If we move forward together with development, this becomes part of your project investment — not an extra cost.',
    cta:          'Move Strategically',
    href:         '/services/consultation/book?type=strategy',
    accent:       '#C0392B',
    requiresPayment: true,
  },
]

// ─── Decision helper paths ─────────────────────────────────────

export const DECISION_PATHS = [
  {
    thought:  '"I just need guidance on where to start"',
    action:   'Start with Free Consultation',
    type:     'free' as ConsultationType,
    href:     '/services/consultation/bookfreeconsultation',
    accent:   '#1B998B',
  },
  {
    thought:  '"I want to build something but I\'m not sure how"',
    action:   'Choose Tech Consultation',
    type:     'tech' as ConsultationType,
    href:     '/services/consultation/book?type=tech',
    accent:   '#C9A84C',
  },
  {
    thought:  '"I want to get this right from the very beginning"',
    action:   'Go with Product Strategy',
    type:     'strategy' as ConsultationType,
    href:     '/services/consultation/book?type=strategy',
    accent:   '#C0392B',
  },
]

// ─── Form configuration per type ──────────────────────────────
// Controls which extra questions appear in QualificationForm

export interface FormConfig {
  badgeText:       string
  badgeColor:      string
  extraQuestions:  boolean   // tech/strategy get deeper questions
  paymentRequired: boolean
  budgetLabel:     string
  qualifyQuestion: boolean   // "Are you ready to invest?"
}

export const FORM_CONFIG: Record<ConsultationType, FormConfig> = {
  free: {
    badgeText:       'Free consultation · No commitment',
    badgeColor:      '#C0392B',
    extraQuestions:  false,
    paymentRequired: false,
    budgetLabel:     'What is your estimated budget for this project?',
    qualifyQuestion: false,
  },
  tech: {
    badgeText:       'Plan your system clearly',
    badgeColor:      '#C9A84C',
    extraQuestions:  true,
    paymentRequired: true,
    budgetLabel:     'What level of investment are you considering for this project?',
    qualifyQuestion: true,
  },
  strategy: {
    badgeText:       'Define your product direction',
    badgeColor:      '#C0392B',
    extraQuestions:  true,
    paymentRequired: true,
    budgetLabel:     'What level of investment are you considering for this project?',
    qualifyQuestion: true,
  },
}

// ─── Helper ────────────────────────────────────────────────────

export function getPackageById(id: ConsultationType): ConsultationPackage {
  return CONSULTATION_PACKAGES.find((p) => p.id === id) ?? CONSULTATION_PACKAGES[0]
}
