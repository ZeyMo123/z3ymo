// ─── SVG icon paths ───────────────────────────────────────────────────────
// Used across all platform pages and cards

export type PlatformId =
  | 'creator-os'
  | 'commerce-os'
  | 'beauty-os'
  | 'food-os'
  | 'market-os'
  | 'service-os'
  | 'event-os'

export interface PlatformFeature {
  title:    string
  desc:     string
  iconPath: string  // SVG path data for the feature icon
}

export interface PlatformStep {
  num:   string
  title: string
  desc:  string
}

export interface Platform {
  id:          PlatformId
  name:        string
  tagline:     string          // Short card tagline
  headline:    string          // Hero headline
  subheadline: string          // Hero subheadline
  description: string          // Section description
  accent:      string          // Brand color for this platform
  price:       string
  slug:        string          // URL slug
  industries:  string[]        // Who uses it
  dashboardModules: string[]   // Preview labels for dashboard visual
  problemHeadline: string
  problems:    string[]
  solutionHeadline: string
  features:    PlatformFeature[]
  aiHeadline:  string
  aiInsights:  string[]
  automations: string[]
  customerNav: string[]        // Example customer-facing pages
  adminNav:    string[]        // Example admin pages
  benefits: Array<{ title: string; desc: string }>
  finalCtaHeadline: string
  finalCtaText:     string
  keyFeatures:      string[]   // Short list for card hover reveal
}

// ─── Icon paths ────────────────────────────────────────────────────────────

export const ICONS = {
  courses:     'M12 14l9-5-9-5-9 5 9 5zM12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
  store:       'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
  calendar:    'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  users:       'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
  chart:       'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  payment:     'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
  bolt:        'M13 10V3L4 14h7v7l9-11h-7z',
  star:        'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
  grid:        'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',
  ticket:      'M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z',
  inventory:   'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
  ai:          'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2',
  map:         'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z',
  book:        'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.75 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  tag:         'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z',
  fork:        'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17',
  tools:       'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
} as const

// ─── Platform definitions ──────────────────────────────────────────────────

export const PLATFORMS: Platform[] = [
  {
    id:          'creator-os',
    name:        'CreatorOS',
    tagline:     'The all-in-one platform for creators who want to build real businesses.',
    headline:    'The all-in-one platform for creators who want to build real businesses.',
    subheadline: 'CreatorOS helps you showcase your brand, sell digital products, manage consultations, and understand your audience — all in one powerful system.',
    description: 'Start with a system already designed for creators — then customize it to fit your exact brand and business model.',
    accent:      '#C0392B',
    price:       'From $1,200',
    slug:        'creator-os',
    industries:  ['Coaches', 'Consultants', 'Educators', 'Influencers', 'Digital entrepreneurs'],
    dashboardModules: ['Portfolio', 'Courses', 'Consultations', 'Content Library', 'Analytics'],
    problemHeadline: 'Creators are forced to juggle too many tools',
    problems: [
      'Link-in-bio tools that show nothing meaningful',
      'Separate course platforms with high commissions',
      'Disconnected booking tools for consultations',
      'Email marketing in yet another app',
      'No unified view of audience or revenue',
    ],
    solutionHeadline: 'One platform for your entire creator business',
    features: [
      {
        title:    'Personal brand website',
        desc:     'A beautiful platform where your audience can explore your brand, story, and everything you offer.',
        iconPath: ICONS.star,
      },
      {
        title:    'Digital product sales',
        desc:     'Sell courses, guides, templates, and memberships — all managed in one place with direct payouts.',
        iconPath: ICONS.courses,
      },
      {
        title:    'Consultation booking',
        desc:     'Let followers book paid sessions directly on your platform — no third-party tools needed.',
        iconPath: ICONS.calendar,
      },
      {
        title:    'Content library',
        desc:     'Organize content ideas, assets, and references. Gate premium content for members.',
        iconPath: ICONS.book,
      },
      {
        title:    'Audience analytics',
        desc:     'Understand your followers and customers — who they are, what they buy, and how they engage.',
        iconPath: ICONS.chart,
      },
    ],
    aiHeadline: 'Smart insights that help you grow',
    aiInsights: [
      'Your most engaging content formats',
      'Best-selling products and pricing patterns',
      'Most valuable audience segments',
      'Optimal publishing times and frequency',
    ],
    automations: [
      'Course enrollment confirmations',
      'Booking reminders and follow-ups',
      'New subscriber welcome sequences',
      'Product launch notifications',
    ],
    customerNav: ['Home', 'About', 'Courses', 'Consultations', 'Resources', 'Community'],
    adminNav:    ['Dashboard', 'Products', 'Bookings', 'Audience', 'Content', 'Analytics'],
    benefits: [
      { title: 'Own your platform',       desc: 'No algorithm dependency. Your audience, your data, your rules.' },
      { title: 'Sell directly',           desc: 'Keep more of your revenue — no platform commissions eating into your income.' },
      { title: 'Build deeper relationships', desc: 'Your audience interacts with your brand directly, not through a third-party app.' },
    ],
    finalCtaHeadline: 'Build the platform your audience deserves',
    finalCtaText:     'Tell us about your creator business and we will design the right system for you.',
    keyFeatures: ['Course selling', 'Consultation booking', 'Digital product store', 'Audience analytics', 'Content library'],
  },

  {
    id:          'commerce-os',
    name:        'CommerceOS',
    tagline:     'Modern e-commerce built for growing product brands.',
    headline:    'The commerce platform built for modern product brands',
    subheadline: 'CommerceOS powers online stores with advanced tools for product management, customer experiences, automation, and intelligent analytics.',
    description: 'A full-featured commerce infrastructure — not just a store builder, but a complete system for running a product business.',
    accent:      '#1B998B',
    price:       'From $1,500',
    slug:        'commerce-os',
    industries:  ['Fashion & clothing', 'Cosmetics & beauty', 'Electronics', 'Home décor', 'Kitchen appliances', 'Digital products'],
    dashboardModules: ['Products', 'Orders', 'Customers', 'Inventory', 'Marketing', 'Analytics'],
    problemHeadline: 'Most online stores are built on tools that were never designed for growth',
    problems: [
      'Rigid templates that limit your brand identity',
      'Limited customization as your catalog grows',
      'Disconnected tools for inventory, orders, and marketing',
      'Weak analytics that hide what actually drives sales',
      'Manual operations that eat hours every week',
    ],
    solutionHeadline: 'A powerful platform for serious online brands',
    features: [
      {
        title:    'Product management',
        desc:     'Manage large product catalogs with variants, categories, inventory tracking, and bulk operations.',
        iconPath: ICONS.inventory,
      },
      {
        title:    'Order & fulfillment',
        desc:     'Track and process orders smoothly — order dashboard, shipping management, and status tracking.',
        iconPath: ICONS.store,
      },
      {
        title:    'Customer intelligence',
        desc:     'Understand who buys from you — purchase history, customer segments, and loyalty insights.',
        iconPath: ICONS.users,
      },
      {
        title:    'Marketing tools',
        desc:     'Built-in promotions, campaigns, and discount systems to drive repeat purchases.',
        iconPath: ICONS.bolt,
      },
      {
        title:    'Revenue analytics',
        desc:     'Deep insights into what sells, when it sells, and who buys — so you make better decisions.',
        iconPath: ICONS.chart,
      },
    ],
    aiHeadline: 'Intelligence that helps your store grow',
    aiInsights: [
      'Top-performing products and seasonal trends',
      'Customer behavior and purchase patterns',
      'Inventory restock predictions',
      'Pricing optimization suggestions',
    ],
    automations: [
      'Order confirmation and shipping notifications',
      'Low inventory restock alerts',
      'Abandoned cart recovery',
      'Customer follow-up and review requests',
    ],
    customerNav: ['Home', 'Shop', 'Collections', 'About', 'Customer account', 'Support'],
    adminNav:    ['Orders', 'Products', 'Customers', 'Analytics', 'Marketing', 'Inventory'],
    benefits: [
      { title: 'Own your commerce infrastructure', desc: 'More flexibility than template platforms — built for your brand, not a generic store.' },
      { title: 'Designed for growth',              desc: 'Built to handle increasing product catalogs, traffic, and customer bases.' },
      { title: 'Smart insights',                   desc: 'Understand your sales and customers better than any dashboard you\'ve seen.' },
      { title: 'Tailored to your brand',           desc: 'The system adapts to your operations — not the other way around.' },
    ],
    finalCtaHeadline: 'Build the commerce platform your brand deserves',
    finalCtaText:     'Tell us about your business and we\'ll design the right commerce system for you.',
    keyFeatures: ['Product & inventory management', 'Order processing', 'Customer CRM', 'AI sales analytics', 'Marketing tools'],
  },

  {
    id:          'beauty-os',
    name:        'BeautyOS',
    tagline:     'Smart booking & management for salons and beauty businesses.',
    headline:    'The intelligent platform for modern salons and beauty businesses',
    subheadline: 'BeautyOS helps salons manage bookings, staff schedules, customers, and payments — all in one powerful system.',
    description: 'End-to-end platform for beauty businesses — from appointment booking and staff scheduling to payments and customer loyalty.',
    accent:      '#C9A84C',
    price:       'From $900',
    slug:        'beauty-os',
    industries:  ['Hair salons', 'Nail studios', 'Spas', 'Beauty clinics', 'Barbershops'],
    dashboardModules: ['Appointments', 'Staff', 'Customers', 'Payments', 'Services', 'Analytics'],
    problemHeadline: 'Most salons still manage their business manually',
    problems: [
      'Missed bookings from WhatsApp and phone calls',
      'Double appointments and scheduling conflicts',
      'Poor customer tracking — no history or preferences',
      'No automated reminders leading to no-shows',
      'Weak marketing and no loyalty programs',
    ],
    solutionHeadline: 'A complete management platform for your salon',
    features: [
      {
        title:    'Appointment booking',
        desc:     'Clients book online anytime — service selection, calendar management, and instant confirmations.',
        iconPath: ICONS.calendar,
      },
      {
        title:    'Staff scheduling',
        desc:     'Manage employee availability, shifts, and service assignments in one organized view.',
        iconPath: ICONS.users,
      },
      {
        title:    'Customer profiles',
        desc:     'Track visit history, favorite services, and contact info for every client.',
        iconPath: ICONS.star,
      },
      {
        title:    'Payment management',
        desc:     'Handle service payments, invoices, packages, and financial tracking seamlessly.',
        iconPath: ICONS.payment,
      },
      {
        title:    'Loyalty programs',
        desc:     'Reward repeat clients with points, packages, and membership tiers to drive retention.',
        iconPath: ICONS.tag,
      },
    ],
    aiHeadline: 'Smart insights for growing salons',
    aiInsights: [
      'Busiest days and peak booking hours',
      'Most popular services by season',
      'Loyal customers and churn risk signals',
      'Revenue per staff member analysis',
    ],
    automations: [
      'Appointment reminders 24h and 1h before',
      'Cancellation and rebooking notifications',
      'Marketing campaigns for quiet periods',
      'Loyalty reward notifications',
    ],
    customerNav: ['Home', 'Services', 'Book appointment', 'Our team', 'Contact'],
    adminNav:    ['Appointments', 'Staff', 'Customers', 'Reports', 'Payments', 'Services'],
    benefits: [
      { title: 'Simplify operations',         desc: 'Everything managed in one system — no more notebooks and WhatsApp juggling.' },
      { title: 'Improve customer experience', desc: 'Clients can book easily, get reminders, and feel valued.' },
      { title: 'Grow your revenue',           desc: 'Better insights lead to better scheduling, services, and marketing decisions.' },
      { title: 'Save time',                   desc: 'Automation handles reminders, notifications, and follow-ups for you.' },
    ],
    finalCtaHeadline: 'Modernize your salon business',
    finalCtaText:     'Tell us about your salon and we\'ll design the right system for you.',
    keyFeatures: ['Online booking', 'Staff scheduling', 'WhatsApp reminders', 'Customer loyalty', 'AI demand prediction'],
  },

  {
    id:          'food-os',
    name:        'FoodOS',
    tagline:     'The platform for modern food businesses — meals, catering, and cooking courses.',
    headline:    'The platform for modern food businesses',
    subheadline: 'FoodOS helps restaurants, catering services, and food entrepreneurs manage orders, bookings, menus, and online cooking courses — all in one intelligent platform.',
    description: 'One system for your entire food business — whether you sell meals, run events, or teach cooking.',
    accent:      '#C0392B',
    price:       'From $1,200',
    slug:        'food-os',
    industries:  ['Restaurants', 'Catering businesses', 'Online food brands', 'Cooking schools', 'Personal chefs'],
    dashboardModules: ['Orders', 'Menu', 'Reservations', 'Courses', 'Customers', 'Analytics'],
    problemHeadline: 'Most food businesses operate with disconnected tools',
    problems: [
      'Manual order management leading to errors',
      'Messy WhatsApp bookings for catering events',
      'No centralized customer data or history',
      'No system for selling courses or recipes online',
      'Difficult menu updates across platforms',
    ],
    solutionHeadline: 'One system for your entire food business',
    features: [
      {
        title:    'Online ordering',
        desc:     'Customers place orders directly — food menu, order tracking, and delivery coordination.',
        iconPath: ICONS.fork,
      },
      {
        title:    'Table reservations',
        desc:     'Manage reservations, table availability, and guest records in a clean calendar view.',
        iconPath: ICONS.calendar,
      },
      {
        title:    'Catering bookings',
        desc:     'Allow clients to request catering for weddings, corporate events, and private parties.',
        iconPath: ICONS.users,
      },
      {
        title:    'Cooking courses',
        desc:     'Sell cooking classes, recipe tutorials, and chef training sessions to a global audience.',
        iconPath: ICONS.book,
      },
      {
        title:    'Digital recipe products',
        desc:     'Sell recipe ebooks, cooking guides, and meal plans as digital products.',
        iconPath: ICONS.tag,
      },
    ],
    aiHeadline: 'Smart insights for food entrepreneurs',
    aiInsights: [
      'Best-selling dishes and most profitable menu items',
      'Peak order times and demand patterns',
      'Popular cooking courses and content',
      'Customer lifetime value and repeat order rates',
    ],
    automations: [
      'Order notifications and delivery updates',
      'Reservation confirmations and reminders',
      'Course enrollment emails',
      'Customer follow-ups and review requests',
    ],
    customerNav: ['Home', 'Menu', 'Order online', 'Cooking courses', 'Catering', 'Contact'],
    adminNav:    ['Orders', 'Reservations', 'Courses', 'Customers', 'Analytics', 'Menu'],
    benefits: [
      { title: 'Multiple revenue streams', desc: 'Sell meals, catering services, and cooking courses from one platform.' },
      { title: 'Organized operations',     desc: 'Everything from orders to courses managed in one place.' },
      { title: 'Customer relationships',   desc: 'Understand and reward your most loyal customers.' },
      { title: 'Intelligent insights',     desc: 'Make better menu and marketing decisions with real data.' },
    ],
    finalCtaHeadline: 'Build the platform your food business deserves',
    finalCtaText:     'Tell us about your food business and we\'ll design the right system for you.',
    keyFeatures: ['Online ordering', 'Table reservations', 'Catering bookings', 'Cooking courses', 'AI insights'],
  },

  {
    id:          'market-os',
    name:        'MarketOS',
    tagline:     'Launch your own marketplace platform — built for multi-vendor commerce.',
    headline:    'Launch your own marketplace platform',
    subheadline: 'MarketOS helps entrepreneurs build multi-vendor marketplaces where sellers list products or services and customers buy in one seamless platform.',
    description: 'The ready-made marketplace infrastructure — built for founders who want to launch without months of development.',
    accent:      '#1B998B',
    price:       'From $2,000',
    slug:        'market-os',
    industries:  ['Product marketplaces', 'Service marketplaces', 'Experience marketplaces', 'Local community marketplaces'],
    dashboardModules: ['Vendors', 'Products', 'Orders', 'Commissions', 'Customers', 'Analytics'],
    problemHeadline: 'Launching a marketplace is complex',
    problems: [
      'Managing multiple sellers and their inventories',
      'Handling orders and fulfillment across vendors',
      'Tracking commissions and vendor payouts',
      'Building a trusted customer experience',
      'Building from scratch can take 12+ months',
    ],
    solutionHeadline: 'The ready-made marketplace platform',
    features: [
      {
        title:    'Vendor management',
        desc:     'Vendors onboard, create profiles, and manage their own listings — with your oversight.',
        iconPath: ICONS.users,
      },
      {
        title:    'Product & service listings',
        desc:     'Vendors list physical products, digital products, services, or experiences — all in one catalog.',
        iconPath: ICONS.grid,
      },
      {
        title:    'Order management',
        desc:     'Track all marketplace orders — status, vendor fulfillment, and customer communication.',
        iconPath: ICONS.store,
      },
      {
        title:    'Commission system',
        desc:     'Define vendor commissions, platform fees, and payout rules — your revenue model, automated.',
        iconPath: ICONS.payment,
      },
      {
        title:    'Vendor dashboards',
        desc:     'Each vendor manages their own listings, orders, revenue, and performance independently.',
        iconPath: ICONS.chart,
      },
    ],
    aiHeadline: 'Understand what drives your marketplace',
    aiInsights: [
      'Best-selling products and top vendors',
      'Highest revenue categories and trends',
      'Buyer behavior and purchase patterns',
      'Fraud detection signals and risk flags',
    ],
    automations: [
      'Vendor approval and onboarding workflows',
      'Order and payment confirmation notifications',
      'Commission calculation and payout processing',
      'Vendor performance tracking and alerts',
    ],
    customerNav: ['Home', 'Categories', 'Vendors', 'Products', 'Sell on marketplace', 'Contact'],
    adminNav:    ['Vendors', 'Orders', 'Commissions', 'Customers', 'Analytics', 'Settings'],
    benefits: [
      { title: 'Faster launch',         desc: 'Avoid months of development — start with a proven marketplace foundation.' },
      { title: 'Scalable business model', desc: 'Earn commissions from vendors as your marketplace grows.' },
      { title: 'Organized operations',  desc: 'Manage your marketplace, vendors, and orders efficiently.' },
      { title: 'Intelligent insights',  desc: 'Understand what drives revenue and which vendors to grow.' },
    ],
    finalCtaHeadline: "Build the marketplace you've been imagining",
    finalCtaText:     "Tell us your idea and we will design the platform to power your marketplace.",
    keyFeatures: ['Vendor onboarding', 'Commission system', 'Multi-vendor orders', 'AI marketplace insights', 'Vendor dashboards'],
  },

  {
    id:          'service-os',
    name:        'ServiceOS',
    tagline:     'Run your entire service business from one platform.',
    headline:    'Run your entire service business in one platform',
    subheadline: 'ServiceOS helps service businesses manage bookings, clients, payments, and operations — powered by intelligent insights that help you grow.',
    description: 'ServiceOS brings bookings, customers, and business insights together — so you can focus on delivering great work.',
    accent:      '#C9A84C',
    price:       'From $900',
    slug:        'service-os',
    industries:  ['Consultants', 'Coaches', 'Repair services', 'Wellness professionals', 'Tutors', 'Fitness trainers'],
    dashboardModules: ['Appointments', 'Clients', 'Services', 'Payments', 'Analytics', 'Automation'],
    problemHeadline: 'Most service businesses operate with scattered tools',
    problems: [
      'Managing bookings manually through phone and email',
      'Losing track of client information and history',
      'Payment confusion and late invoice follow-ups',
      'Missed appointments with no reminder system',
      'No insights about business performance',
    ],
    solutionHeadline: 'One platform to manage your service business',
    features: [
      {
        title:    'Appointment scheduling',
        desc:     'Clients book appointments online — service selection, calendar management, and automated confirmations.',
        iconPath: ICONS.calendar,
      },
      {
        title:    'Client management',
        desc:     'Every client has a profile — service history, preferences, communication records, and payment history.',
        iconPath: ICONS.users,
      },
      {
        title:    'Service catalog',
        desc:     'List all your services with custom pricing, duration, and availability per offering.',
        iconPath: ICONS.tools,
      },
      {
        title:    'Payments & invoices',
        desc:     'Online payments, invoicing, payment tracking, and service packages — all in one place.',
        iconPath: ICONS.payment,
      },
      {
        title:    'Business analytics',
        desc:     'Most popular services, peak booking hours, repeat customers, and revenue trends at a glance.',
        iconPath: ICONS.chart,
      },
    ],
    aiHeadline: 'Understand how your business is performing',
    aiInsights: [
      'Most popular services and pricing patterns',
      'Peak booking hours and availability gaps',
      'Repeat customers and churn risk',
      'Revenue trends and seasonal patterns',
    ],
    automations: [
      'Booking confirmations and appointment reminders',
      'Follow-up messages after service completion',
      'Payment notifications and invoice reminders',
      'Rebooking nudges for lapsed clients',
    ],
    customerNav: ['Home', 'Services', 'Book appointment', 'Packages', 'Contact'],
    adminNav:    ['Appointments', 'Clients', 'Services', 'Payments', 'Analytics'],
    benefits: [
      { title: 'Organized bookings',            desc: 'Manage all appointments in one place — no more spreadsheets.' },
      { title: 'Stronger client relationships', desc: 'Track every interaction and deliver personalized service.' },
      { title: 'Automated operations',          desc: 'Reduce manual work — let the system handle reminders and follow-ups.' },
      { title: 'Intelligent insights',          desc: 'Understand what drives your business and where to grow.' },
    ],
    finalCtaHeadline: 'Build the system your service business deserves',
    finalCtaText:     "Tell us about your business and we will design the right platform for you.",
    keyFeatures: ['Online booking', 'Client profiles', 'Service catalog', 'Payments & invoicing', 'AI business insights'],
  },

  {
    id:          'event-os',
    name:        'EventOS',
    tagline:     'Manage and grow your events with one powerful platform.',
    headline:    'Manage and grow your events with one powerful platform',
    subheadline: 'EventOS helps organizers manage registrations, tickets, schedules, and attendees — powered by intelligent insights that help events grow.',
    description: 'From event creation to post-event analysis — EventOS manages the full lifecycle of every event you run.',
    accent:      '#C0392B',
    price:       'From $1,200',
    slug:        'event-os',
    industries:  ['Business conferences', 'Training workshops', 'Community events', 'Festivals', 'Professional seminars'],
    dashboardModules: ['Events', 'Tickets', 'Attendees', 'Schedule', 'Analytics', 'Automation'],
    problemHeadline: 'Running events involves too many moving parts',
    problems: [
      'Managing attendee registrations across tools',
      'Handling ticket sales and inventory manually',
      'Tracking event schedules and speaker sessions',
      'Organizing attendee information for check-in',
      'No unified way to measure event success',
    ],
    solutionHeadline: 'One platform for the entire event lifecycle',
    features: [
      {
        title:    'Event creation',
        desc:     'Create conferences, workshops, seminars, and festivals — with location, schedule, speakers, and ticket types.',
        iconPath: ICONS.map,
      },
      {
        title:    'Ticketing system',
        desc:     'Multiple ticket tiers, early-bird pricing, limited capacity, and digital ticket delivery.',
        iconPath: ICONS.ticket,
      },
      {
        title:    'Attendee management',
        desc:     'Full attendee profiles — contact details, ticket type, session participation, and check-in status.',
        iconPath: ICONS.users,
      },
      {
        title:    'Schedule management',
        desc:     'Manage speaker sessions, workshops, networking blocks, and training modules — attendees see it all.',
        iconPath: ICONS.calendar,
      },
      {
        title:    'Event analytics',
        desc:     'Ticket sales trends, attendee engagement, popular sessions, and peak registration periods.',
        iconPath: ICONS.chart,
      },
    ],
    aiHeadline: 'Understand what makes your events successful',
    aiInsights: [
      'Ticket sales trends and optimal pricing',
      'Attendee engagement and popular sessions',
      'Peak registration periods for marketing',
      'Attendance prediction for capacity planning',
    ],
    automations: [
      'Registration confirmations and ticket delivery',
      'Reminder emails before the event',
      'Schedule and session update notifications',
      'Post-event feedback requests',
    ],
    customerNav: ['Home', 'Events', 'Tickets', 'Schedule', 'Speakers', 'Contact'],
    adminNav:    ['Events', 'Tickets', 'Attendees', 'Schedule', 'Analytics', 'Settings'],
    benefits: [
      { title: 'Simplified event management', desc: 'Manage everything — tickets, attendees, schedules — in one platform.' },
      { title: 'Better attendee experience',  desc: 'Make registration and event participation easy and professional.' },
      { title: 'Organized operations',        desc: 'Track events, attendees, and revenue without spreadsheets.' },
      { title: 'Intelligent insights',        desc: 'Understand what makes events successful and apply it to the next one.' },
    ],
    finalCtaHeadline: 'Build the platform your events deserve',
    finalCtaText:     "Tell us about your event idea and we will design the right platform for you.",
    keyFeatures: ['Event creation', 'Ticketing system', 'Attendee management', 'Schedule management', 'AI event insights'],
  },
]

// ─── Helper: get platform by slug ─────────────────────────────────────────
export function getPlatformBySlug(slug: string): Platform | undefined {
  return PLATFORMS.find((p) => p.slug === slug)
}

// ─── Helper: get all platform slugs (for static params) ───────────────────
export function getAllPlatformSlugs(): string[] {
  return PLATFORMS.map((p) => p.slug)
}
