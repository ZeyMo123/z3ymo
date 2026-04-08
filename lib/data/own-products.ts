export type ProductStatus = 'live' | 'waitlist' | 'coming-soon'

export interface OwnProduct {
  id:          string
  name:        string
  tagline:     string
  description: string
  status:      ProductStatus
  statusLabel: string
  accent:      string
  href:        string
  features:    string[]
}

export const OWN_PRODUCTS: OwnProduct[] = [
  {
    id:          'pulse',
    name:        'Z3ymo Pulse',
    tagline:     'WhatsApp AI agent for African SMBs',
    description: 'An intelligent agent that monitors your competitors and delivers weekly insights. Automates customer support, bookings, and lead follow-up — 24/7, in English and Swahili.',
    status:      'waitlist',
    statusLabel: 'Waitlist open',
    accent:      '#C0392B',
    href:        '/ai-agents/pulse',
    features:    ['24/7 WhatsApp AI support', 'Competitor intelligence', 'Booking automation', 'Lead qualification', 'English & Swahili'],
  },
  {
    id:          'ebox',
    name:        'EBox',
    tagline:     'Business review & discovery system',
    description: 'A verified business review platform for Tanzania and East Africa — helping customers find the best local businesses and helping businesses build trust through authentic reviews.',
    status:      'coming-soon',
    statusLabel: 'Coming soon',
    accent:      '#1B998B',
    href:        '/products',
    features:    ['Verified business reviews', 'Business discovery', 'Local search', 'Review management', 'Analytics for businesses'],
  },
  {
    id:          'salon-marketplace',
    name:        'Salon Marketplace',
    tagline:     'Book any salon, anywhere in Tanzania',
    description: 'A marketplace that connects customers with salons across Tanzania — browse, compare, and book beauty appointments in seconds.',
    status:      'coming-soon',
    statusLabel: 'Coming soon',
    accent:      '#C9A84C',
    href:        '/products',
    features:    ['Salon discovery', 'Real-time booking', 'Stylist profiles', 'Reviews & ratings', 'Mobile-first app'],
  },
  {
    id:          'novel',
    name:        'Novel Platform',
    tagline:     'Writing & reading ecosystem for Africa',
    description: 'A serialized novel writing and reading platform built for African writers and readers — offline-first, in multiple languages, with direct writer monetization.',
    status:      'coming-soon',
    statusLabel: 'Coming soon',
    accent:      '#C0392B',
    href:        '/products',
    features:    ['Serialized publishing', 'Offline reading', 'Writer monetization', 'Multi-language support', 'Community features'],
  },
]

// Status badge styling
export const STATUS_STYLES: Record<ProductStatus, { bg: string; text: string; dot: string }> = {
  'live':         { bg: 'bg-emerald/10', text: 'text-emerald', dot: 'bg-emerald' },
  'waitlist':     { bg: 'bg-crimson/10', text: 'text-crimson', dot: 'bg-crimson' },
  'coming-soon':  { bg: 'bg-void/8 dark:bg-whisper/8', text: 'text-void/50 dark:text-whisper/50', dot: 'bg-void/30 dark:bg-whisper/30' },
}
