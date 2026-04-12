// ─── Icon path constants ──────────────────────────────────────
// All paths are SVG path `d` attributes for 24×24 viewBox

export const SOL_ICONS = {
  star:       'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
  cart:       'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
  calendar:   'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  users:      'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
  chart:      'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  bolt:       'M13 10V3L4 14h7v7l9-11h-7z',
  brain:      'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2',
  delivery:   'M9 17a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0zM1 1h4l2.68 13.39a2 2 0 001.98 1.61h9.72a2 2 0 001.98-1.61L23 6H6',
  package:    'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
  payment:    'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
  phone:      'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
  book:       'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.75 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  check:      'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  grid:       'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',
  settings:   'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
  tag:        'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z',
  bell:       'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
} as const

export type SolIconKey = keyof typeof SOL_ICONS

// ─── Types ────────────────────────────────────────────────────

export interface SolutionFeature {
  title:    string
  desc:     string
  icon:     SolIconKey
}

export interface UseCase {
  title:    string
  points:   string[]
}

export interface WorkflowStep {
  label: string
}

export interface CaseStudy {
  title:    string
  problem:  string
  solution: string
  outcome:  string
}

export interface Solution {
  slug:             string
  industry:         string           // nav label
  headline:         string
  subheadline:      string
  accent:           string
  platformName:     string
  platformSlug:     string

  // Pain section
  painHeadline:     string
  painPoints:       string[]

  // Solution section
  solutionHeadline: string
  solutionMessage:  string
  capabilities:     string[]

  // Platform section
  platformDesc:     string
  features:         SolutionFeature[]

  // Use cases
  useCaseHeadline:  string
  useCases:         UseCase[]

  // Workflow
  workflowHeadline: string
  workflowSteps:    WorkflowStep[]

  // AI
  aiHeadline:       string
  aiMessage:        string
  aiExamples:       string[]

  // Case study
  caseStudy:        CaseStudy

  // Comparison
  comparisonTitle:  string
  without:          string[]
  with:             string[]

  // Final CTA
  ctaHeadline:      string
  ctaText:          string

  // Overview card data
  cardDesc:         string
  perfectFor:       string[]
  cardCapabilities: string[]
}

// ─── Solution definitions ─────────────────────────────────────

export const SOLUTIONS: Solution[] = [
  // 1. Creators & Coaches
  {
    slug:             'creators',
    industry:         'Creators & Coaches',
    headline:         'Turn your audience into a scalable business',
    subheadline:      'Z3ymo builds AI-powered platforms for creators and coaches to sell content, manage clients, automate workflows, and grow without burning out.',
    accent:           '#C0392B',
    platformName:     'CreatorOS',
    platformSlug:     'creator-os',

    painHeadline:     'Growing as a creator shouldn\'t feel chaotic',
    painPoints: [
      'You\'re juggling content, clients, messages, and payments across too many platforms',
      'Your audience is growing — but your systems are not keeping up',
      'You\'re losing potential sales because your offers are scattered',
      'You spend hours managing things that should be automated',
      'You want to scale, but everything still depends on you being online',
    ],

    solutionHeadline: 'A complete system built for creators and coaches',
    solutionMessage:  'We don\'t just build websites. We design intelligent platforms that turn your audience into a structured, scalable business.',
    capabilities: [
      'Sell courses, digital products, and coaching sessions',
      'Manage clients and communication in one place',
      'Automate onboarding, follow-ups, and content delivery',
      'Track performance with built-in analytics',
      'Integrate AI to assist with content and decision-making',
    ],

    platformDesc: 'CreatorOS is Z3ymo\'s platform designed specifically for creators and coaches — combining content, commerce, and automation into one system.',
    features: [
      { title: 'Content hub',       desc: 'Store, organize, and deliver your content — courses, guides, and media — in one place.',           icon: 'book' },
      { title: 'Sales engine',      desc: 'Sell courses, consultations, and digital products with a seamless checkout experience.',             icon: 'cart' },
      { title: 'Client management', desc: 'Track clients, sessions, and communication in a single organized dashboard.',                       icon: 'users' },
      { title: 'Scheduling system', desc: 'Bookings, calendar management, and automated appointment reminders.',                               icon: 'calendar' },
      { title: 'AI insights',       desc: 'Understand your audience and performance to make smarter decisions about content and offers.',       icon: 'brain' },
    ],

    useCaseHeadline: 'Built for creators like you',
    useCases: [
      { title: 'Content creator',    points: ['Monetize audience with courses and digital products', 'Centralize brand, offers, and engagement'] },
      { title: 'Coach / consultant', points: ['Manage clients, sessions, and payments', 'Automate scheduling and follow-ups'] },
      { title: 'Educator',           points: ['Deliver structured learning experiences', 'Track student progress and engagement'] },
      { title: 'Influencer',         points: ['Turn followers into paying customers', 'Sell merchandise, memberships, and access'] },
    ],

    workflowHeadline: 'From audience to business — simplified',
    workflowSteps: [
      { label: 'Audience discovers you' },
      { label: 'They enter your platform' },
      { label: 'They explore your offers' },
      { label: 'They purchase or book' },
      { label: 'System manages delivery and follow-up' },
      { label: 'You focus on growth' },
    ],

    aiHeadline: 'Enhanced with intelligent systems',
    aiMessage:  'Z3ymo integrates AI where it matters — not as hype, but as leverage.',
    aiExamples: [
      'Content performance insights',
      'Smart recommendations for offers',
      'Automated audience follow-ups',
      'Behavior analysis and segmentation',
    ],

    caseStudy: {
      title:    'Creator Coaching Platform',
      problem:  'Scattered tools, lost leads, and no unified system for managing clients and content',
      solution: 'Unified CreatorOS platform consolidating courses, bookings, and client communication',
      outcome:  'Structured offers, improved conversions, and hours saved weekly on manual work',
    },

    comparisonTitle: 'Without vs With Z3ymo',
    without: ['Multiple disconnected tools', 'Manual client management', 'Scattered offers and content', 'Lost revenue from poor systems'],
    with:    ['One unified creator platform', 'Automated client workflows', 'Structured offers and delivery', 'Scalable, predictable growth'],

    ctaHeadline: 'Let\'s design your creator platform',
    ctaText:     'Tell us about your audience, your offers, and your goals — we\'ll help you build the system that scales it.',

    cardDesc:         'The all-in-one platform for creators, coaches, and digital educators.',
    perfectFor:       ['Personal brands', 'Coaches & consultants', 'Online educators', 'Content creators'],
    cardCapabilities: ['Portfolio websites', 'Selling courses', 'Booking consultations', 'Managing digital content'],
  },

  // 2. Fashion & Clothing
  {
    slug:             'fashion',
    industry:         'Fashion & Clothing Brands',
    headline:         'Turn your brand into a high-converting online store',
    subheadline:      'Z3ymo builds AI-powered commerce platforms for fashion brands to showcase products, manage orders, and scale sales with a premium customer experience.',
    accent:           '#1B998B',
    platformName:     'CommerceOS',
    platformSlug:     'commerce-os',

    painHeadline:     'Running a fashion brand shouldn\'t feel this messy',
    painPoints: [
      'You\'re selling through Instagram, WhatsApp, and DMs — not a real system',
      'Orders get lost, delayed, or confused without a central hub',
      'Your brand looks good… but your store experience doesn\'t match it',
      'You manually track inventory, payments, and deliveries',
      'Scaling feels impossible because everything depends on you',
    ],

    solutionHeadline: 'A commerce system built for modern fashion brands',
    solutionMessage:  'We don\'t just build online stores. We design high-performance commerce platforms that match your brand\'s identity and scale your operations.',
    capabilities: [
      'Beautiful storefront tailored to your brand identity',
      'Product catalog with size, color, and variant management',
      'Automated order and inventory management',
      'Payment integration — local and global',
      'Customer experience optimization from browse to purchase',
    ],

    platformDesc: 'CommerceOS is Z3ymo\'s platform for product-based businesses — built to combine branding, selling, and operations into one system.',
    features: [
      { title: 'Storefront experience', desc: 'Modern, mobile-first product browsing with a premium look that matches your brand.',   icon: 'star' },
      { title: 'Product management',    desc: 'Variants, pricing, stock tracking, and collections all in one organized dashboard.',   icon: 'tag' },
      { title: 'Order system',          desc: 'Track orders, statuses, and fulfillment — no more lost orders in chat threads.',       icon: 'package' },
      { title: 'Payment integration',   desc: 'Support for local and global payment methods — frictionless checkout every time.',    icon: 'payment' },
      { title: 'Customer insights',     desc: 'Understand buying patterns and behavior to improve your marketing and offers.',        icon: 'chart' },
    ],

    useCaseHeadline: 'Built for fashion brands like yours',
    useCases: [
      { title: 'Clothing brands',   points: ['Manage collections, sizes, and seasonal drops', 'Run structured online and offline sales'] },
      { title: 'Streetwear brands', points: ['Limited drops and hype-driven releases', 'Inventory control for high-demand items'] },
      { title: 'Luxury fashion',    points: ['Premium design and high-end customer experience', 'Detailed product presentation'] },
      { title: 'Boutiques',         points: ['Hybrid online and in-store selling', 'Personalized customer relationships'] },
    ],

    workflowHeadline: 'From product to purchase — simplified',
    workflowSteps: [
      { label: 'Customer discovers your brand' },
      { label: 'They browse your store' },
      { label: 'They select products' },
      { label: 'They checkout seamlessly' },
      { label: 'Order is processed automatically' },
      { label: 'You manage and scale easily' },
    ],

    aiHeadline: 'Smarter commerce, without the complexity',
    aiMessage:  'Z3ymo integrates intelligent systems to improve how your store performs — quietly, but powerfully.',
    aiExamples: [
      'Product performance insights',
      'Customer behavior and buying patterns',
      'Smart product recommendations',
      'Sales trend analysis by category',
    ],

    caseStudy: {
      title:    'Online Clothing Brand',
      problem:  'Managing orders manually through WhatsApp with no real storefront or inventory system',
      solution: 'Full CommerceOS store with product catalog, inventory management, and automated order processing',
      outcome:  'Smoother sales operations, better customer experience, and time saved weekly on manual work',
    },

    comparisonTitle: 'Without vs With Z3ymo',
    without: ['Orders in DMs and chat threads', 'Manual inventory tracking', 'No real storefront or system', 'Poor and inconsistent customer experience'],
    with:    ['Structured online fashion store', 'Automated inventory and orders', 'Premium brand experience', 'Scalable and reliable operations'],

    ctaHeadline: 'Let\'s build your fashion commerce system',
    ctaText:     'Tell us about your products, your brand, and your vision — we\'ll help you build a store that actually sells.',

    cardDesc:         'Modern commerce for fashion brands — from boutiques to streetwear.',
    perfectFor:       ['Clothing brands', 'Fashion startups', 'Online boutiques', 'Streetwear labels'],
    cardCapabilities: ['Product catalogs', 'Inventory management', 'Online stores', 'Sales analytics'],
  },

  // 3. Beauty & Cosmetics
  {
    slug:             'beauty',
    industry:         'Beauty & Cosmetics Businesses',
    headline:         'Turn your beauty business into a seamless client experience',
    subheadline:      'Z3ymo builds intelligent booking and client management systems for beauty businesses — helping you attract, organize, and retain clients with a premium, stress-free experience.',
    accent:           '#C9A84C',
    platformName:     'BeautyOS',
    platformSlug:     'beauty-os',

    painHeadline:     'Running a beauty business shouldn\'t feel this overwhelming',
    painPoints: [
      'Bookings come through WhatsApp, calls, and DMs — scattered everywhere',
      'Clients cancel, reschedule, or disappear without a structured system',
      'You spend more time managing messages than actually serving clients',
      'No clear system for tracking client preferences or service history',
      'Growth feels limited because everything depends on you being available',
    ],

    solutionHeadline: 'A client experience system built for beauty businesses',
    solutionMessage:  'We don\'t just manage bookings. We design structured client journeys that make your business feel organized, professional, and easy to trust.',
    capabilities: [
      'Smart booking system with service and time selection',
      'Automated confirmations and appointment reminders',
      'Client profiles with full service history',
      'Schedule and availability management',
      'Centralized operations in one clean dashboard',
    ],

    platformDesc: 'BeautyOS is Z3ymo\'s platform for service-based beauty businesses — combining booking, client management, and experience design into one system.',
    features: [
      { title: 'Booking experience',       desc: 'Simple, mobile-first appointment booking that clients can use anytime.',                 icon: 'calendar' },
      { title: 'Client management',         desc: 'Profiles, service history, and client preferences — all organized and accessible.',    icon: 'users' },
      { title: 'Schedule control',          desc: 'Manage your availability, time slots, staff, and workload from one dashboard.',        icon: 'settings' },
      { title: 'Reminders & notifications', desc: 'Automated messages that reduce no-shows and keep clients informed.',                  icon: 'bell' },
      { title: 'Business insights',         desc: 'Track bookings, revenue trends, and service performance to make better decisions.',   icon: 'chart' },
    ],

    useCaseHeadline: 'Built for beauty businesses like yours',
    useCases: [
      { title: 'Beauty salons',          points: ['Manage multiple services and staff', 'Track client bookings and history'] },
      { title: 'Makeup artists',         points: ['Handle event and session bookings', 'Automate confirmations and reminders'] },
      { title: 'Nail & lash technicians', points: ['Organize repeat clients and schedules', 'Reduce no-shows with automated messages'] },
      { title: 'Freelance beauticians',  points: ['Run a structured independent business', 'Build a professional client experience'] },
    ],

    workflowHeadline: 'From booking to service — simplified',
    workflowSteps: [
      { label: 'Client discovers your business' },
      { label: 'They book a service online' },
      { label: 'They receive instant confirmation' },
      { label: 'You manage your schedule clearly' },
      { label: 'Client arrives prepared' },
      { label: 'You deliver the service without stress' },
    ],

    aiHeadline: 'Smarter operations, quietly working in the background',
    aiMessage:  'Z3ymo enhances your system with intelligent tools that improve efficiency without adding complexity.',
    aiExamples: [
      'Booking pattern and peak time insights',
      'Client behavior and retention tracking',
      'Smart reminder timing optimization',
      'Service performance and revenue analysis',
    ],

    caseStudy: {
      title:    'Independent Makeup Artist',
      problem:  'Managing all bookings through WhatsApp with no structured system or client records',
      solution: 'Structured BeautyOS booking system with client profiles and automated reminders',
      outcome:  'Organized schedule, fewer no-shows, and a professional experience that retained more clients',
    },

    comparisonTitle: 'Without vs With Z3ymo',
    without: ['Bookings in chat threads', 'Manual schedule coordination', 'Missed or confused appointments', 'No client tracking or history'],
    with:    ['Structured booking system', 'Automated confirmations and reminders', 'Clear schedule management', 'Organized client profiles and data'],

    ctaHeadline: 'Let\'s build your beauty business system',
    ctaText:     'Tell us how you serve your clients — we\'ll help you create a system that keeps everything organized and running smoothly.',

    cardDesc:         'Intelligent booking and client management for salons and beauty professionals.',
    perfectFor:       ['Beauty brands', 'Skincare companies', 'Makeup artists', 'Beauty salons'],
    cardCapabilities: ['Product sales', 'Appointment bookings', 'Customer loyalty tracking'],
  },

  // 4. Restaurants & Catering
  {
    slug:             'food',
    industry:         'Restaurants & Catering Services',
    headline:         'Turn your food business into a smooth ordering and service system',
    subheadline:      'Z3ymo builds intelligent ordering and operations platforms for restaurants and catering brands — helping you manage orders, serve customers efficiently, and scale without chaos.',
    accent:           '#C0392B',
    platformName:     'FoodOS',
    platformSlug:     'food-os',

    painHeadline:     'Running a food business shouldn\'t feel this chaotic',
    painPoints: [
      'Orders come through calls, WhatsApp, and walk-ins — completely unstructured',
      'Mistakes happen with orders, quantities, or delivery details regularly',
      'Staff rely on memory or manual notes during busy service hours',
      'Peak hours become stressful and disorganized without a clear system',
      'Scaling becomes difficult without a reliable operational foundation',
    ],

    solutionHeadline: 'A system built for modern food businesses',
    solutionMessage:  'We don\'t just digitize your menu. We create structured ordering and operational systems that make your business faster, clearer, and easier to manage.',
    capabilities: [
      'Digital menu with categories, items, and photos',
      'Structured order management and tracking',
      'Delivery and pickup coordination',
      'Centralized order flow across all channels',
      'Simplified operations during peak service hours',
    ],

    platformDesc: 'FoodOS is Z3ymo\'s platform for restaurants and catering brands — combining ordering, operations, and customer experience into one system.',
    features: [
      { title: 'Digital menu',        desc: 'Clean, mobile-first menu browsing with categories, photos, and clear descriptions.',           icon: 'book' },
      { title: 'Order management',    desc: 'Track all incoming orders in real time — no more confused tickets or lost requests.',          icon: 'grid' },
      { title: 'Delivery & pickup',   desc: 'Organize fulfillment clearly — delivery zones, pickup windows, and logistics coordination.',  icon: 'delivery' },
      { title: 'Payment integration', desc: 'Support for local and digital payment methods — fast, simple, and reliable checkout.',        icon: 'payment' },
      { title: 'Business insights',   desc: 'Monitor order patterns, demand trends, and peak hours to optimize your operations.',          icon: 'chart' },
    ],

    useCaseHeadline: 'Built for food businesses like yours',
    useCases: [
      { title: 'Restaurants',       points: ['Manage dine-in, takeaway, and delivery orders', 'Real-time order tracking for kitchen staff'] },
      { title: 'Catering services', points: ['Handle bulk and event-based orders', 'Manage complex multi-item catering requests'] },
      { title: 'Cloud kitchens',    points: ['Operate fully digital ordering systems', 'Optimize delivery-first operations'] },
      { title: 'Fast food brands',  points: ['Streamline high-volume orders efficiently', 'Reduce errors during peak hours'] },
    ],

    workflowHeadline: 'From order to delivery — simplified',
    workflowSteps: [
      { label: 'Customer views your menu' },
      { label: 'They place an order' },
      { label: 'Order is received instantly' },
      { label: 'You prepare with clear details' },
      { label: 'Delivery or pickup is coordinated' },
      { label: 'Customer receives their order smoothly' },
    ],

    aiHeadline: 'Smarter operations, without added complexity',
    aiMessage:  'Z3ymo enhances your system with intelligent tools that improve how your business runs behind the scenes.',
    aiExamples: [
      'Order pattern and demand insights',
      'Peak hour analysis and preparation alerts',
      'Customer preferences and repeat order tracking',
      'Menu performance and profitability analysis',
    ],

    caseStudy: {
      title:    'Local Restaurant',
      problem:  'Managing all orders through phone calls and WhatsApp with frequent mistakes during busy hours',
      solution: 'Structured FoodOS ordering system with centralized order management and kitchen dashboard',
      outcome:  'Fewer order errors, faster service, and a significantly more organized operation',
    },

    comparisonTitle: 'Without vs With Z3ymo',
    without: ['Orders from multiple scattered channels', 'Manual tracking and paper notes', 'Frequent errors during peak hours', 'Disorganized and stressful operations'],
    with:    ['Centralized ordering system', 'Real-time order tracking', 'Clear process from order to delivery', 'Smooth, manageable operations'],

    ctaHeadline: 'Let\'s build your food business system',
    ctaText:     'Tell us how you serve your customers — we\'ll help you create a system that keeps orders organized and operations running smoothly.',

    cardDesc:         'Ordering and operations platform for restaurants, catering, and food entrepreneurs.',
    perfectFor:       ['Restaurants', 'Catering companies', 'Food startups', 'Chefs selling cooking courses'],
    cardCapabilities: ['Online food ordering', 'Reservations', 'Catering bookings', 'Cooking courses'],
  },

  // 5. Home Decor
  {
    slug:             'home-decor',
    industry:         'Home Decor Businesses',
    headline:         'Turn your home decor business into a refined shopping experience',
    subheadline:      'Z3ymo builds intelligent commerce systems for home decor brands — helping you showcase products beautifully, manage orders, and deliver a seamless buying experience.',
    accent:           '#1B998B',
    platformName:     'CommerceOS',
    platformSlug:     'commerce-os',

    painHeadline:     'Selling home decor shouldn\'t feel this scattered',
    painPoints: [
      'Products are shared through Instagram and chats — not a structured store',
      'Customers ask questions but don\'t complete purchases without a clear system',
      'Managing orders, availability, and delivery is entirely manual',
      'Your brand looks good… but the buying experience feels incomplete',
      'Growth is limited because there\'s no central operational system',
    ],

    solutionHeadline: 'A commerce system designed for visual brands',
    solutionMessage:  'We don\'t just list your products. We create structured shopping experiences that match the quality and aesthetic of your brand.',
    capabilities: [
      'Beautiful product catalog with styled collections',
      'Organized order and inventory management',
      'Seamless, frictionless checkout experience',
      'Delivery and fulfillment coordination',
      'Centralized operations from one dashboard',
    ],

    platformDesc: 'CommerceOS is Z3ymo\'s platform for product-based businesses — built to combine product presentation, selling, and operations into one system.',
    features: [
      { title: 'Storefront experience', desc: 'Clean, image-focused browsing experience that lets your products tell their story.',       icon: 'star' },
      { title: 'Product management',    desc: 'Collections, categories, variations, and stock tracking all in one organized system.',    icon: 'tag' },
      { title: 'Order system',          desc: 'Track and manage all purchases from placement to fulfillment without manual work.',        icon: 'package' },
      { title: 'Payment integration',   desc: 'Support for local and global payment methods — simple and reliable checkout every time.', icon: 'payment' },
      { title: 'Customer insights',     desc: 'Understand buying behavior and preferences to refine your offerings and marketing.',      icon: 'chart' },
    ],

    useCaseHeadline: 'Built for home decor businesses like yours',
    useCases: [
      { title: 'Home decor brands',    points: ['Showcase collections and styled environments', 'Tell visual stories through product presentation'] },
      { title: 'Furniture sellers',    points: ['Manage large product catalogs and variations', 'Handle complex delivery and fulfillment'] },
      { title: 'Interior decor shops', points: ['Combine online and in-store experiences', 'Manage showroom and digital inventory'] },
      { title: 'Independent sellers',  points: ['Run a structured business from anywhere', 'Build a professional brand presence online'] },
    ],

    workflowHeadline: 'From browsing to purchase — simplified',
    workflowSteps: [
      { label: 'Customer discovers your brand' },
      { label: 'They explore your products' },
      { label: 'They select items' },
      { label: 'They checkout smoothly' },
      { label: 'Order is processed clearly' },
      { label: 'You manage fulfillment with ease' },
    ],

    aiHeadline: 'Smarter commerce, working quietly in the background',
    aiMessage:  'Z3ymo enhances your store with intelligent tools that improve performance without complicating your workflow.',
    aiExamples: [
      'Product performance and popularity insights',
      'Customer browsing behavior and preferences',
      'Smart complementary product suggestions',
      'Sales trend analysis by collection',
    ],

    caseStudy: {
      title:    'Home Decor Brand',
      problem:  'Selling products through Instagram and WhatsApp with no structured store or inventory system',
      solution: 'Full CommerceOS storefront with product collections, inventory tracking, and automated order management',
      outcome:  'Clearer shopping experience, smoother operations, and a professional brand presence',
    },

    comparisonTitle: 'Without vs With Z3ymo',
    without: ['Products shared in chat threads', 'Manual order tracking', 'No structured store', 'Inconsistent customer experience'],
    with:    ['Clean, branded online storefront', 'Organized order system', 'Centralized operations', 'Smooth and consistent buying experience'],

    ctaHeadline: 'Let\'s build your home decor commerce system',
    ctaText:     'Tell us about your products and your brand — we\'ll help you create a system that presents and sells them clearly.',

    cardDesc:         'Commerce platform for furniture, interior decor, and home accessories brands.',
    perfectFor:       ['Furniture brands', 'Interior decor stores', 'Home accessories businesses'],
    cardCapabilities: ['Product catalogs', 'Online shopping', 'Inventory management'],
  },

  // 6. Electronics
  {
    slug:             'electronics',
    industry:         'Electronics Businesses',
    headline:         'Turn your electronics business into a structured online store',
    subheadline:      'Z3ymo builds intelligent commerce systems for electronics businesses — helping you showcase products clearly, manage inventory, and handle orders with precision.',
    accent:           '#C9A84C',
    platformName:     'CommerceOS',
    platformSlug:     'commerce-os',

    painHeadline:     'Selling electronics shouldn\'t feel this disorganized',
    painPoints: [
      'Products are shared through WhatsApp and social media without a structured system',
      'Customers keep asking the same questions about specs and availability',
      'Managing stock manually leads to confusion or accidental overselling',
      'Orders, payments, and deliveries are handled separately and inconsistently',
      'Trust is harder to build without a clear and professional system',
    ],

    solutionHeadline: 'A commerce system built for product clarity and control',
    solutionMessage:  'We don\'t just display your products. We create structured systems that make it easy for customers to understand, choose, and buy with confidence.',
    capabilities: [
      'Organized product catalog with detailed specifications',
      'Inventory and stock level management',
      'Structured order processing and tracking',
      'Payment and delivery coordination',
      'Centralized operations from one dashboard',
    ],

    platformDesc: 'CommerceOS is Z3ymo\'s platform for product-based businesses — combining product display, selling, and operations into one system.',
    features: [
      { title: 'Storefront experience', desc: 'Clear, structured browsing with detailed product specs and comparison support.',           icon: 'grid' },
      { title: 'Product management',    desc: 'Variants, specifications, pricing, and real-time stock tracking in one system.',         icon: 'tag' },
      { title: 'Order system',          desc: 'Manage orders and fulfillment clearly — no more lost or confused purchases.',             icon: 'package' },
      { title: 'Payment integration',   desc: 'Support for local and global payment methods with fast, secure checkout.',              icon: 'payment' },
      { title: 'Customer insights',     desc: 'Track purchasing behavior and demand patterns to optimize your product mix.',            icon: 'chart' },
    ],

    useCaseHeadline: 'Built for electronics businesses like yours',
    useCases: [
      { title: 'Phone & gadget stores', points: ['Showcase devices with full specifications', 'Manage variants, colors, and storage options'] },
      { title: 'Accessory sellers',     points: ['Manage multiple product variations clearly', 'Handle high-volume repeat purchases'] },
      { title: 'Electronics retailers', points: ['Track inventory and daily sales', 'Operate multiple product categories efficiently'] },
      { title: 'Independent sellers',   points: ['Run a structured online store', 'Build trust through a professional presence'] },
    ],

    workflowHeadline: 'From product discovery to purchase — simplified',
    workflowSteps: [
      { label: 'Customer discovers your store' },
      { label: 'They browse products with clear details' },
      { label: 'They select what they need' },
      { label: 'They checkout smoothly' },
      { label: 'Order is processed and tracked' },
      { label: 'You manage fulfillment with clarity' },
    ],

    aiHeadline: 'Smarter commerce, without added complexity',
    aiMessage:  'Z3ymo integrates intelligent tools to improve how your store performs — quietly in the background.',
    aiExamples: [
      'Product demand and popularity insights',
      'Customer behavior and repeat purchase tracking',
      'Smart product recommendation engine',
      'Sales trend and inventory forecast analysis',
    ],

    caseStudy: {
      title:    'Electronics Store',
      problem:  'Selling through chat with no structured product catalog, no inventory control, and manual order handling',
      solution: 'Full CommerceOS store with detailed product catalog, inventory management, and automated order processing',
      outcome:  'Clearer operations, improved customer trust, and reduced time spent on manual coordination',
    },

    comparisonTitle: 'Without vs With Z3ymo',
    without: ['Products shared in chat threads', 'Manual stock tracking', 'Repetitive customer questions', 'Unstructured and unreliable operations'],
    with:    ['Structured online store', 'Clear inventory management', 'Organized order processing', 'Reliable and professional customer experience'],

    ctaHeadline: 'Let\'s build your electronics commerce system',
    ctaText:     'Tell us about your products and operations — we\'ll help you create a system that keeps everything clear, organized, and scalable.',

    cardDesc:         'Structured commerce for electronics retailers, gadget stores, and tech brands.',
    perfectFor:       ['Electronics retailers', 'Gadget stores', 'Tech product brands'],
    cardCapabilities: ['Product catalogs', 'Inventory tracking', 'Product comparisons'],
  },

  // 7. Online Stores
  {
    slug:             'ecommerce',
    industry:         'Online Stores',
    headline:         'Turn your business into a structured online store',
    subheadline:      'Z3ymo builds intelligent commerce systems for online businesses — helping you sell products, manage operations, and scale with a clear, reliable system.',
    accent:           '#C0392B',
    platformName:     'CommerceOS',
    platformSlug:     'commerce-os',

    painHeadline:     'Running an online store shouldn\'t feel this scattered',
    painPoints: [
      'You sell through multiple channels without a central system',
      'Orders, payments, and deliveries are managed separately',
      'Customers ask questions instead of buying directly from a store',
      'Tracking inventory and orders is manual and error-prone',
      'Growth feels limited because operations are not structured or scalable',
    ],

    solutionHeadline: 'A commerce system built for growing online businesses',
    solutionMessage:  'We don\'t just help you sell online. We create structured systems that bring clarity to your operations and make it easier for customers to buy.',
    capabilities: [
      'Multi-category product catalog',
      'Centralized order management',
      'Inventory tracking and control',
      'Integrated payment systems',
      'Organized business operations from one place',
    ],

    platformDesc: 'CommerceOS is Z3ymo\'s platform for online stores — combining product management, selling, and operations into one system.',
    features: [
      { title: 'Storefront experience', desc: 'Clean, easy-to-navigate shopping interface that works beautifully on any device.',      icon: 'star' },
      { title: 'Product management',    desc: 'Categories, pricing, variants, and stock tracking all organized in one system.',       icon: 'tag' },
      { title: 'Order system',          desc: 'Manage and track all orders in one place — from placement to fulfilment.',             icon: 'package' },
      { title: 'Payment integration',   desc: 'Support for local and global payment methods with simple, reliable checkout.',        icon: 'payment' },
      { title: 'Customer insights',     desc: 'Understand buying behavior and product performance to make better decisions.',         icon: 'chart' },
    ],

    useCaseHeadline: 'Built for online businesses like yours',
    useCases: [
      { title: 'General online stores',    points: ['Sell multiple product categories in one place', 'Manage all orders from a single dashboard'] },
      { title: 'Resellers & dropshippers', points: ['Manage products without complexity', 'Automate order flow and fulfillment'] },
      { title: 'Multi-product brands',     points: ['Organize growing product catalogs', 'Scale operations as inventory expands'] },
      { title: 'Independent sellers',      points: ['Build a structured online business', 'Create a professional buying experience'] },
    ],

    workflowHeadline: 'From product to purchase — simplified',
    workflowSteps: [
      { label: 'Customer discovers your store' },
      { label: 'They browse products' },
      { label: 'They select items' },
      { label: 'They checkout easily' },
      { label: 'Order is processed automatically' },
      { label: 'You manage and fulfill efficiently' },
    ],

    aiHeadline: 'Smarter commerce, without complexity',
    aiMessage:  'Z3ymo enhances your system with intelligent tools that improve performance and decision-making behind the scenes.',
    aiExamples: [
      'Sales and product performance insights',
      'Customer behavior and repeat purchase tracking',
      'Smart product recommendations',
      'Performance trends and demand forecasting',
    ],

    caseStudy: {
      title:    'General Online Store',
      problem:  'Selling through multiple channels with no central system, manual order tracking, and no inventory control',
      solution: 'Centralized CommerceOS store with unified product catalog and automated order management',
      outcome:  'Clearer operations, smoother customer experience, and a solid foundation for scaling',
    },

    comparisonTitle: 'Without vs With Z3ymo',
    without: ['Scattered sales channels', 'Manual and error-prone processes', 'Confusing operations', 'Limited scalability'],
    with:    ['Centralized online store', 'Automated order workflows', 'Clear and organized operations', 'Scalable system ready to grow'],

    ctaHeadline: 'Let\'s build your online store system',
    ctaText:     'Tell us about your products and goals — we\'ll help you create a system that keeps everything organized and ready to scale.',

    cardDesc:         'Flexible commerce platform for any online business — general stores, resellers, and multi-product brands.',
    perfectFor:       ['Online stores', 'Resellers', 'Multi-product brands', 'Digital entrepreneurs'],
    cardCapabilities: ['Multi-category stores', 'Order management', 'Inventory control'],
  },

  // 8. Service Businesses
  {
    slug:             'services',
    industry:         'Service Businesses',
    headline:         'Turn your service business into a structured system',
    subheadline:      'Z3ymo builds intelligent systems for service businesses — helping you manage bookings, clients, and operations with clarity and control.',
    accent:           '#1B998B',
    platformName:     'ServiceOS',
    platformSlug:     'service-os',

    painHeadline:     'Running a service business shouldn\'t feel this unstructured',
    painPoints: [
      'Clients book through calls, messages, and different platforms — scattered and unorganized',
      'Managing schedules manually leads to confusion, overlaps, and missed appointments',
      'You spend too much time coordinating instead of actually delivering the service',
      'No clear system for tracking clients, appointments, or service history',
      'Growth feels limited because everything depends on your direct involvement',
    ],

    solutionHeadline: 'A system built for service-based businesses',
    solutionMessage:  'We don\'t just organize your bookings. We create structured systems that make your business easier to run and more reliable for your clients.',
    capabilities: [
      'Service-based booking and scheduling system',
      'Schedule and availability management',
      'Client tracking and full service history',
      'Automated confirmations and reminders',
      'Centralized operations from one dashboard',
    ],

    platformDesc: 'ServiceOS is Z3ymo\'s platform for service businesses — combining booking, client management, and operations into one system.',
    features: [
      { title: 'Booking system',    desc: 'Simple appointment scheduling that clients can use directly — any time, any device.',        icon: 'calendar' },
      { title: 'Client management', desc: 'Track every client — history, preferences, communication, and service records.',            icon: 'users' },
      { title: 'Schedule control',  desc: 'Manage your availability, time slots, and workload from a clean dashboard.',                icon: 'settings' },
      { title: 'Notifications',     desc: 'Automated confirmations and reminders that reduce no-shows and keep clients informed.',     icon: 'bell' },
      { title: 'Business insights', desc: 'Monitor booking patterns, client retention, and revenue trends to grow with confidence.',   icon: 'chart' },
    ],

    useCaseHeadline: 'Built for service businesses like yours',
    useCases: [
      { title: 'Consultants & coaches', points: ['Manage client sessions and communication', 'Automate scheduling and follow-ups'] },
      { title: 'Repair & tech services', points: ['Organize service requests and schedules', 'Track job status and completion'] },
      { title: 'Cleaning services',     points: ['Handle recurring and one-time bookings', 'Manage staff schedules and assignments'] },
      { title: 'Freelancers',           points: ['Run structured client-based operations', 'Build a professional service presence'] },
    ],

    workflowHeadline: 'From booking to service delivery — simplified',
    workflowSteps: [
      { label: 'Client discovers your service' },
      { label: 'They book an appointment online' },
      { label: 'They receive instant confirmation' },
      { label: 'You manage your schedule clearly' },
      { label: 'Service is delivered smoothly' },
      { label: 'Client relationship continues' },
    ],

    aiHeadline: 'Smarter operations, working quietly',
    aiMessage:  'Z3ymo enhances your system with intelligent tools that improve how your business runs behind the scenes.',
    aiExamples: [
      'Booking pattern and demand insights',
      'Client retention and behavior tracking',
      'Smart reminder timing optimization',
      'Service performance and revenue trends',
    ],

    caseStudy: {
      title:    'Service Provider',
      problem:  'Managing bookings manually across calls and chat messages with frequent scheduling conflicts',
      solution: 'Structured ServiceOS system with online booking, client profiles, and automated reminders',
      outcome:  'Clearer schedule management, fewer missed appointments, and a more professional client experience',
    },

    comparisonTitle: 'Without vs With Z3ymo',
    without: ['Bookings in chats and calls', 'Manual scheduling with overlaps', 'No structured client system', 'Growth limited by manual operations'],
    with:    ['Centralized booking system', 'Automated scheduling and reminders', 'Organized client management', 'Structured and scalable operations'],

    ctaHeadline: 'Let\'s build your service business system',
    ctaText:     'Tell us how you serve your clients — we\'ll help you create a system that keeps everything organized and running smoothly.',

    cardDesc:         'Booking and client management for consultants, technicians, and all service professionals.',
    perfectFor:       ['Consultants', 'Repair services', 'Tutors', 'Wellness professionals'],
    cardCapabilities: ['Appointment scheduling', 'Client management', 'Payments and invoicing'],
  },

  // 9. Digital Entrepreneurs
  {
    slug:             'digital',
    industry:         'Digital Entrepreneurs',
    headline:         'Turn your digital business into a structured system',
    subheadline:      'Z3ymo builds intelligent platforms for digital entrepreneurs — helping you sell, manage clients, and run your business with clarity and control.',
    accent:           '#C9A84C',
    platformName:     'CreatorOS',
    platformSlug:     'creator-os',

    painHeadline:     'Running a digital business shouldn\'t feel this scattered',
    painPoints: [
      'You use multiple tools for selling, content, and client communication',
      'Customers message you instead of buying directly through a structured system',
      'Delivering products or services to clients is inconsistent and manual',
      'No clear system for managing clients, orders, or business performance',
      'Growth feels unstable because there\'s no solid operational foundation',
    ],

    solutionHeadline: 'A system built for digital businesses',
    solutionMessage:  'We don\'t just give you tools. We create structured systems that connect your offers, sales, and client experience into one flow.',
    capabilities: [
      'Digital product and service selling',
      'Structured client and order management',
      'Automated product delivery and workflows',
      'Centralized business operations',
      'Scalable infrastructure for growth',
    ],

    platformDesc: 'CreatorOS is Z3ymo\'s platform for digital entrepreneurs — combining selling, delivery, and client management into one system.',
    features: [
      { title: 'Offer management',  desc: 'Sell digital products, services, and packages easily from one organized dashboard.',          icon: 'tag' },
      { title: 'Sales flow',        desc: 'Simple, structured checkout experience that converts visitors into paying customers.',       icon: 'cart' },
      { title: 'Client management', desc: 'Track buyers, clients, and all interactions in one organized and searchable system.',        icon: 'users' },
      { title: 'Delivery system',   desc: 'Automate product or service delivery so clients receive what they paid for instantly.',      icon: 'bolt' },
      { title: 'Performance insights', desc: 'Monitor sales, revenue, and client behavior to make smarter growth decisions.',          icon: 'chart' },
    ],

    useCaseHeadline: 'Built for digital entrepreneurs like you',
    useCases: [
      { title: 'Coaches & consultants', points: ['Manage sessions, clients, and coaching offers', 'Automate scheduling and follow-ups'] },
      { title: 'Course creators',       points: ['Sell and deliver digital courses', 'Track student progress and engagement'] },
      { title: 'Content creators',      points: ['Turn audience into structured income', 'Centralize all offers and subscriptions'] },
      { title: 'Freelancers',           points: ['Organize services and client workflow', 'Bill and deliver professionally'] },
    ],

    workflowHeadline: 'From offer to delivery — simplified',
    workflowSteps: [
      { label: 'Audience discovers your offer' },
      { label: 'They purchase or book' },
      { label: 'Payment is processed' },
      { label: 'Product or service is delivered' },
      { label: 'Client is managed within your system' },
      { label: 'You scale with clarity' },
    ],

    aiHeadline: 'Smarter systems, working in the background',
    aiMessage:  'Z3ymo enhances your business with intelligent tools that improve performance without adding complexity.',
    aiExamples: [
      'Sales performance and funnel insights',
      'Customer behavior and lifetime value tracking',
      'Offer optimization and pricing suggestions',
      'Trend analysis for content and products',
    ],

    caseStudy: {
      title:    'Digital Creator',
      problem:  'Using multiple tools with no unified system — inconsistent delivery and no visibility into business performance',
      solution: 'CreatorOS unified system bringing offers, sales, delivery, and client management into one platform',
      outcome:  'Smoother sales operations, organized client management, and a scalable business foundation',
    },

    comparisonTitle: 'Without vs With Z3ymo',
    without: ['Multiple disconnected tools', 'Manual processes and delivery', 'Inconsistent client experience', 'Unclear business operations'],
    with:    ['One unified digital system', 'Automated workflows and delivery', 'Structured client experience', 'Clear, scalable operations'],

    ctaHeadline: 'Let\'s build your digital business system',
    ctaText:     'Tell us about your offers and workflow — we\'ll help you create a system that connects everything and supports your growth.',

    cardDesc:         'Unified platforms for digital product sellers, course creators, and online entrepreneurs.',
    perfectFor:       ['Digital product sellers', 'Membership communities', 'Online platform founders'],
    cardCapabilities: ['Digital product sales', 'Marketplace platforms', 'Membership systems'],
  },
]

// ─── Helpers ──────────────────────────────────────────────────

export function getSolutionBySlug(slug: string): Solution | undefined {
  return SOLUTIONS.find((s) => s.slug === slug)
}

export function getAllSolutionSlugs(): string[] {
  return SOLUTIONS.map((s) => s.slug)
}
