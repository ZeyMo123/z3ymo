// ─────────────────────────────────────────────────────────────────
// Z3ymo Services Data
// Single source of truth for all service pages
// ─────────────────────────────────────────────────────────────────

// ─── Icon paths (SVG `d` attributes, 24×24 viewBox) ─────────────

export const SVC_ICONS = {
  code:        'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
  mobile:      'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
  brain:       'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2',
  zap:         'M13 10V3L4 14h7v7l9-11h-7z',
  settings:    'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
  chart:       'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  users:       'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
  shield:      'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  plug:        'M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4',
  stack:       'M5 12H3l9-9 9 9h-2M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7',
  layers:      'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  refresh:     'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
  target:      'M3 12a9 9 0 1018 0 9 9 0 00-18 0m6 0a3 3 0 106 0 3 3 0 00-6 0m3-9v3m0 12v3m9-9h-3M6 12H3',
  lightbulb:   'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  check:       'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  arrow:       'M5 12h14M12 5l7 7-7 7',
  database:    'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4',
  cpu:         'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18',
  map:         'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
  compass:     'M12 22a10 10 0 100-20 10 10 0 000 20zM16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z',
} as const

export type SvcIconKey = keyof typeof SVC_ICONS

// ─── Types ────────────────────────────────────────────────────────

export interface ServiceCapability {
  title: string
  desc:  string
  icon:  SvcIconKey
}

export interface ServiceUseCase {
  title:  string
  points: string[]
}

export interface ServiceCaseExample {
  title:    string
  problem:  string
  solution: string
  outcome:  string
}

export interface ServiceWorkflowStep {
  label: string
}

// Standard service page (Software + AI pages)
export interface ServicePage {
  slug:            string
  name:            string
  tagline:         string
  headline:        string
  subheadline:     string
  accent:          string
  secondaryCta:    string
  secondaryHref:   string

  // Problem
  problemHeadline: string
  painPoints:      string[]

  // Solution
  solutionHeadline: string
  solutionMessage:  string
  deliverables:     string[]

  // Capabilities
  capabilitiesHeadline: string
  capabilities:         ServiceCapability[]

  // Use cases
  useCasesHeadline: string
  useCases:         ServiceUseCase[]

  // Workflow
  workflowHeadline: string
  workflowSteps:    ServiceWorkflowStep[]

  // Tech/Positioning
  techHeadline:  string
  techMessage:   string
  techPoints:    string[]

  // Case example
  caseExample: ServiceCaseExample

  // Comparison
  comparisonTitle: string
  leftLabel:       string
  leftItems:       string[]
  rightLabel:      string
  rightItems:      string[]

  // CTA
  ctaHeadline: string
  ctaText:     string
}

// Consulting pages have "What You Get" + "Why It Matters" instead of Capabilities + Tech
export interface ConsultingPage extends Omit<ServicePage,
  'capabilitiesHeadline' | 'capabilities' | 'techHeadline' | 'techMessage' | 'techPoints'
> {
  isConsulting:          true
  deliverablesHeadline:  string   // "What you walk away with"
  deliverableBlocks:     ServiceCapability[]
  whyHeadline:           string
  whyMessage:            string
}

export type AnyServicePage = ServicePage | ConsultingPage

export function isConsulting(s: AnyServicePage): s is ConsultingPage {
  return (s as ConsultingPage).isConsulting === true
}

// ─── Service definitions ──────────────────────────────────────────

export const SERVICE_PAGES: AnyServicePage[] = [
  // ── 1. Web & Mobile Applications ──────────────────────────────
  {
    slug:          'web-mobile',
    name:          'Web & Mobile Applications',
    tagline:       'Software Development',
    headline:      'Build web and mobile applications that actually support your business',
    subheadline:   'We design and develop custom web and mobile applications that help you manage operations, serve users, and scale with clarity.',
    accent:        '#C0392B',
    secondaryCta:  'See related solutions',
    secondaryHref: '/solutions',

    problemHeadline: 'Most applications don\'t solve the real business problem',
    painPoints: [
      'You have an idea, but no clear structure for how to build it properly',
      'Off-the-shelf tools don\'t match your unique business workflows',
      'Systems feel disconnected and difficult to manage day to day',
      'Poor user experience leads to low adoption and frustrated users',
      'Scaling becomes difficult without the right technical foundation',
    ],

    solutionHeadline: 'Applications designed around your business',
    solutionMessage:  'We don\'t just build apps. We design systems that align with how your business actually works — from user experience to backend operations.',
    deliverables: [
      'Custom web applications — admin panels, platforms, and dashboards',
      'Mobile applications for both iOS and Android',
      'User-focused interface and experience design',
      'Scalable backend systems and APIs',
      'Integration with your existing tools and third-party services',
    ],

    capabilitiesHeadline: 'What your application can include',
    capabilities: [
      { title: 'User experience (UI/UX)',   desc: 'Clean, intuitive interfaces designed for real-world usage and adoption.',              icon: 'lightbulb' },
      { title: 'Business logic',            desc: 'Custom workflows and rules tailored to exactly how your operations work.',             icon: 'settings' },
      { title: 'Dashboard & admin systems', desc: 'Manage users, data, and business processes from a clear, centralized interface.',      icon: 'chart' },
      { title: 'Integrations',              desc: 'Payments, messaging services, third-party APIs, and the tools you already use.',       icon: 'plug' },
      { title: 'Performance & scalability', desc: 'Built from day one to handle real usage and grow smoothly over time.',                 icon: 'zap' },
    ],

    useCasesHeadline: 'Applications we commonly build',
    useCases: [
      { title: 'Business platforms',      points: ['Internal systems to manage operations and teams', 'Custom dashboards for data and reporting'] },
      { title: 'Customer-facing apps',    points: ['Booking, ordering, or service platforms', 'Client portals and self-service systems'] },
      { title: 'Marketplaces',            points: ['Connect buyers and sellers in one platform', 'Multi-vendor catalog and transaction systems'] },
      { title: 'On-demand services',      points: ['Real-time service-based mobile applications', 'Delivery, scheduling, and live tracking'] },
    ],

    workflowHeadline: 'From idea to working application',
    workflowSteps: [
      { label: 'Understand your business and goals' },
      { label: 'Define system structure and features' },
      { label: 'Design user experience and interfaces' },
      { label: 'Develop the application' },
      { label: 'Test and refine' },
      { label: 'Launch and support' },
    ],

    techHeadline: 'Built with the right technology for your needs',
    techMessage:  'We choose technologies based on your business requirements — ensuring performance, flexibility, and long-term scalability.',
    techPoints: [
      'Modern web frameworks optimized for performance',
      'Native and cross-platform mobile development',
      'Secure backend systems and infrastructure',
      'Cloud-based deployment and scaling',
    ],

    caseExample: {
      title:    'Service Platform',
      problem:  'Manual operations scattered across emails, WhatsApp, and spreadsheets with no unified system',
      solution: 'Custom web and mobile application with centralized booking, client management, and reporting',
      outcome:  'Centralized system, improved team efficiency, and a professional experience for clients',
    },

    comparisonTitle: 'Custom system vs off-the-shelf tools',
    leftLabel:   'Off-the-shelf tools',
    leftItems:   ['Limited flexibility', 'Generic workflows that don\'t fit', 'Multiple disconnected tools', 'Hard to scale or customize'],
    rightLabel:  'Custom application (Z3ymo)',
    rightItems:  ['Built for your exact needs', 'Unified, coherent system', 'Aligned with your operations', 'Scalable from day one'],

    ctaHeadline: 'Let\'s build your application',
    ctaText:     'Tell us what you want to create — we\'ll help you design and build a system that works for your business.',
  },

  // ── 2. Custom Software Development ────────────────────────────
  {
    slug:          'custom-software',
    name:          'Custom Software Development',
    tagline:       'Software Development',
    headline:      'Build software designed specifically for your business',
    subheadline:   'Z3ymo develops custom software systems tailored to your operations — helping you replace manual processes, connect workflows, and scale with clarity.',
    accent:        '#1B998B',
    secondaryCta:  'See related solutions',
    secondaryHref: '/solutions',

    problemHeadline: 'Generic tools don\'t fit how your business actually works',
    painPoints: [
      'You rely on multiple tools that don\'t fully connect with each other',
      'Manual processes are slowing down your team and costing time daily',
      'Your workflows are unique, but your tools force you to adapt to them',
      'Data is scattered across systems with no single source of truth',
      'Scaling becomes impossible without a unified operational foundation',
    ],

    solutionHeadline: 'Software built around your exact workflows',
    solutionMessage:  'We don\'t adapt your business to software. We build software that adapts to your business.',
    deliverables: [
      'Custom business systems — web, mobile, or desktop',
      'Workflow automation and structured process design',
      'Centralized data and operations in one platform',
      'Integration with existing tools and external platforms',
      'Scalable architecture designed for long-term growth',
    ],

    capabilitiesHeadline: 'What your custom software can include',
    capabilities: [
      { title: 'Workflow automation',   desc: 'Replace manual steps with structured, reliable automated processes.',                  icon: 'zap' },
      { title: 'Centralized systems',   desc: 'Bring all operations into one platform — no more juggling between tools.',             icon: 'layers' },
      { title: 'Role-based access',     desc: 'Different permission levels for teams, managers, and administrators.',                  icon: 'shield' },
      { title: 'Integrations',          desc: 'Connect payments, APIs, and the third-party tools already in your workflow.',          icon: 'plug' },
      { title: 'Data & reporting',      desc: 'Track business performance and make informed decisions with clear analytics.',          icon: 'chart' },
    ],

    useCasesHeadline: 'Systems we commonly build',
    useCases: [
      { title: 'Internal business systems',     points: ['Manage operations, teams, and daily processes', 'Replace spreadsheets and manual workflows'] },
      { title: 'CRM & client management',       points: ['Track leads, clients, and all interactions', 'Automate follow-ups and pipeline management'] },
      { title: 'Order & operations platforms',  points: ['Handle workflows from request to completion', 'Full visibility across fulfilment stages'] },
      { title: 'Industry-specific systems',     points: ['Tailored solutions for unique business models', 'Built around your exact operational logic'] },
    ],

    workflowHeadline: 'From complexity to clarity',
    workflowSteps: [
      { label: 'Understand your workflows and challenges' },
      { label: 'Map system structure and requirements' },
      { label: 'Design the software architecture' },
      { label: 'Develop and integrate features' },
      { label: 'Test and refine' },
      { label: 'Deploy and support' },
    ],

    techHeadline: 'Built for reliability and long-term use',
    techMessage:  'We design systems with the right technologies to ensure performance, security, and scalability — based on your business requirements, not trends.',
    techPoints: [
      'Secure, well-structured backend architecture',
      'Scalable cloud infrastructure and deployment',
      'Modern frameworks chosen for your specific needs',
      'API-based integrations for flexibility',
    ],

    caseExample: {
      title:    'Operations Management System',
      problem:  'Multiple tools, manual data entry, and disconnected workflows causing daily inefficiency',
      solution: 'Unified custom software platform consolidating all operations, tracking, and reporting',
      outcome:  'Streamlined operations, better team coordination, and complete operational visibility',
    },

    comparisonTitle: 'Generic tools vs custom software',
    leftLabel:   'Generic tools',
    leftItems:   ['Limited customization', 'Disconnected workflows', 'Constant workarounds required', 'Scaling challenges as you grow'],
    rightLabel:  'Custom software (Z3ymo)',
    rightItems:  ['Built for your exact needs', 'Unified, coherent system', 'Efficient workflows by design', 'Scalable foundation from day one'],

    ctaHeadline: 'Let\'s build your custom system',
    ctaText:     'Tell us how your business works — we\'ll help you design and build software that supports it fully.',
  },

  // ── 3. AI Agent Development ────────────────────────────────────
  {
    slug:          'ai-agents',
    name:          'AI Agent Development',
    tagline:       'AI Development',
    headline:      'Build AI agents that handle real business tasks',
    subheadline:   'Z3ymo develops AI agents that automate workflows, handle interactions, and support your operations — working alongside your existing business systems.',
    accent:        '#C9A84C',
    secondaryCta:  'Explore AI solutions',
    secondaryHref: '/solutions',

    problemHeadline: 'Most businesses don\'t know how to use AI effectively',
    painPoints: [
      'You\'ve heard about AI, but don\'t know where it actually fits your business',
      'Manual and repetitive tasks consume too much of your team\'s time',
      'Customer interactions are handled inconsistently across your team',
      'Existing tools don\'t automate enough of your actual day-to-day work',
      'AI tools feel disconnected from your real operational workflow',
    ],

    solutionHeadline: 'AI agents designed for your business workflows',
    solutionMessage:  'We don\'t build generic AI tools. We create AI agents that are trained and structured to handle specific tasks within your business.',
    deliverables: [
      'Task-specific AI agents built for your operations',
      'Workflow-integrated automation that runs continuously',
      'AI for customer interaction, support, and qualification',
      'Data-aware and context-driven decision systems',
      'Integration with your existing platforms and tools',
    ],

    capabilitiesHeadline: 'What your AI agent can do',
    capabilities: [
      { title: 'Customer interaction',  desc: 'Respond to inquiries, qualify leads, and guide users through your offers.',              icon: 'users' },
      { title: 'Task automation',       desc: 'Handle repetitive business processes without manual intervention.',                      icon: 'zap' },
      { title: 'Data processing',       desc: 'Analyze, organize, and extract useful information from business data.',                 icon: 'database' },
      { title: 'Internal assistance',   desc: 'Support your team with daily operations, lookups, and structured decisions.',           icon: 'brain' },
      { title: 'System integration',    desc: 'Work within your existing tools and platforms — not as a separate product.',            icon: 'plug' },
    ],

    useCasesHeadline: 'AI agents we commonly build',
    useCases: [
      { title: 'Customer support agents', points: ['Handle FAQs, inquiries, and common requests automatically', 'Escalate complex issues to your team intelligently'] },
      { title: 'Sales assistants',        points: ['Guide customers through offers and decisions', 'Qualify leads and capture contact information'] },
      { title: 'Operations assistants',   points: ['Automate internal workflows and task routing', 'Assist staff with lookups and structured processes'] },
      { title: 'Content & data agents',   points: ['Process, generate, or organize business information', 'Summarize, extract, and classify data automatically'] },
    ],

    workflowHeadline: 'From task to working AI agent',
    workflowSteps: [
      { label: 'Understand your workflow and task requirements' },
      { label: 'Define what the AI agent should handle' },
      { label: 'Design agent logic and behavior' },
      { label: 'Develop and integrate the agent' },
      { label: 'Test and refine performance' },
      { label: 'Deploy and monitor' },
    ],

    techHeadline: 'Built to work reliably in real environments',
    techMessage:  'We design AI agents with the right models, structure, and integrations to ensure consistent, useful performance within your business context.',
    techPoints: [
      'Context-aware processing tuned to your business',
      'Integration with APIs, platforms, and existing tools',
      'Secure and controlled interaction boundaries',
      'Scalable deployment across your channels',
    ],

    caseExample: {
      title:    'Customer Support Agent',
      problem:  'Repetitive customer inquiries consuming hours of team time daily with inconsistent responses',
      solution: 'AI agent trained on business knowledge, integrated into the communication channel',
      outcome:  'Faster response times, reduced workload, and consistent customer experience',
    },

    comparisonTitle: 'Basic AI tools vs AI agents',
    leftLabel:   'Basic AI tools',
    leftItems:   ['Standalone usage outside your workflow', 'Not connected to your systems', 'Manual input required every time', 'Limited real business impact'],
    rightLabel:  'AI agents (Z3ymo)',
    rightItems:  ['Integrated into your existing systems', 'Task-specific and automated', 'Continuous operation without manual input', 'Real operational value daily'],

    ctaHeadline: 'Let\'s build your AI agent',
    ctaText:     'Tell us what tasks you want to automate — we\'ll help you design an AI agent that fits into your business.',
  },

  // ── 4. AI Business Automation ─────────────────────────────────
  {
    slug:          'ai-automation',
    name:          'AI Business Automation',
    tagline:       'AI Development',
    headline:      'Automate your business workflows with AI',
    subheadline:   'Z3ymo designs AI-powered automation systems that streamline your operations — reducing manual work, improving efficiency, and helping your business run more smoothly.',
    accent:        '#C0392B',
    secondaryCta:  'Explore AI solutions',
    secondaryHref: '/solutions',

    problemHeadline: 'Most businesses rely on too many manual processes',
    painPoints: [
      'Repetitive tasks consume significant time every single day',
      'Processes depend heavily on individual people being available',
      'Errors happen regularly due to manual handling and coordination',
      'Tools are disconnected, requiring constant manual coordination',
      'Scaling becomes impossible without a strong automation foundation',
    ],

    solutionHeadline: 'Automation systems designed for how your business works',
    solutionMessage:  'We don\'t just automate isolated tasks. We design connected systems where your processes run smoothly from start to finish.',
    deliverables: [
      'End-to-end workflow automation across your operations',
      'AI-powered decision support within your processes',
      'Integration across all your tools and systems',
      'Reduced manual intervention at every stage',
      'Scalable operational processes built for growth',
    ],

    capabilitiesHeadline: 'What your automation system can handle',
    capabilities: [
      { title: 'Process automation',       desc: 'Automate entire repetitive workflows — from trigger to completion.',                  icon: 'refresh' },
      { title: 'Data flow management',     desc: 'Move and synchronize data across systems without manual transfer.',                  icon: 'database' },
      { title: 'Decision support',         desc: 'Use AI to assist with structured operational decisions in real time.',               icon: 'brain' },
      { title: 'Cross-system integration', desc: 'Connect all your tools into one unified, coherent operational flow.',               icon: 'layers' },
      { title: 'Monitoring & optimization',desc: 'Track automation performance and improve processes continuously over time.',         icon: 'chart' },
    ],

    useCasesHeadline: 'Automation systems we commonly build',
    useCases: [
      { title: 'Sales & lead workflows',        points: ['Capture, qualify, and manage leads automatically', 'Automated follow-up sequences and pipeline movement'] },
      { title: 'Customer onboarding systems',   points: ['Guide new clients through structured onboarding processes', 'Automated welcome sequences, document collection, setup'] },
      { title: 'Order & operations automation', points: ['Handle workflows from request to completion automatically', 'Real-time status updates and fulfilment coordination'] },
      { title: 'Internal process automation',   points: ['Streamline repetitive internal tasks and approvals', 'Reduce bottlenecks and dependency on individual team members'] },
    ],

    workflowHeadline: 'From manual process to automated system',
    workflowSteps: [
      { label: 'Understand your current processes' },
      { label: 'Identify automation opportunities' },
      { label: 'Design workflow structure' },
      { label: 'Develop and integrate automation' },
      { label: 'Test and refine' },
      { label: 'Deploy and monitor' },
    ],

    techHeadline: 'Built to integrate and scale',
    techMessage:  'We use the right tools, AI models, and integrations to ensure your automation system works reliably within your business environment.',
    techPoints: [
      'API integrations across all your platforms',
      'Workflow engines for complex process logic',
      'AI-enhanced decision-making at key steps',
      'Scalable infrastructure that grows with you',
    ],

    caseExample: {
      title:    'Lead Management System',
      problem:  'Manual lead tracking, inconsistent follow-ups, and deals falling through the cracks',
      solution: 'Automated lead workflow with AI qualification, routing, and follow-up sequences',
      outcome:  'Faster response times, more consistent handling, and higher conversion rate',
    },

    comparisonTitle: 'Manual processes vs automated systems',
    leftLabel:   'Manual processes',
    leftItems:   ['Time-consuming and repetitive daily', 'Error-prone from human handling', 'Dependent on specific people being available', 'Very hard to scale effectively'],
    rightLabel:  'AI automation (Z3ymo)',
    rightItems:  ['Efficient and consistent workflows', 'Reliable execution every time', 'Runs without constant human input', 'Scales smoothly with your business'],

    ctaHeadline: 'Let\'s automate your business',
    ctaText:     'Tell us how your business runs today — we\'ll help you design a system that runs more efficiently.',
  },

  // ── 5. Tech Consultation (Consulting page) ─────────────────────
  {
    slug:          'tech-consultation',
    name:          'Tech Consultation',
    tagline:       'Consulting',
    headline:      'Get clear on what to build — and how to build it',
    subheadline:   'Z3ymo provides structured tech consultation to help you make the right decisions before investing in development — reducing risk and improving outcomes.',
    accent:        '#1B998B',
    secondaryCta:  'Explore product strategy',
    secondaryHref: '/services/product-strategy',
    isConsulting:  true as const,

    problemHeadline: 'Building without clarity is expensive',
    painPoints: [
      'You have an idea but don\'t know how to structure it into a real system',
      'You\'re unsure which features you actually need versus nice-to-haves',
      'You risk wasting significant money building the wrong solution',
      'Developers build what you say — not always what you actually need',
      'You feel uncertain about technical decisions and their consequences',
    ],

    solutionHeadline: 'Clarity before commitment',
    solutionMessage:  'We don\'t start with development. We start by understanding your business, then defining the right system to build.',
    deliverables: [
      'Defining your product or system clearly before any development',
      'Identifying the right features and their correct priority',
      'Choosing the right technical approach for your situation',
      'Structuring workflows and the user experience properly',
      'Avoiding unnecessary complexity that slows you down',
    ],

    deliverablesHeadline: 'What you walk away with',
    deliverableBlocks: [
      { title: 'System clarity',      desc: 'A clear, shared understanding of exactly what needs to be built and why.',           icon: 'target' },
      { title: 'Feature definition',  desc: 'Prioritized features grounded in real business needs — not assumptions.',            icon: 'lightbulb' },
      { title: 'Technical direction', desc: 'Guidance on how the system should be built, what stack, and what to avoid.',        icon: 'compass' },
      { title: 'Workflow structure',  desc: 'How users and internal processes will interact with the system day to day.',        icon: 'map' },
      { title: 'Next steps plan',     desc: 'A clear, actionable direction for development or next phase of implementation.',   icon: 'arrow' },
    ],

    useCasesHeadline: 'When this is useful',
    useCases: [
      { title: 'Early-stage ideas',    points: ['You want to validate and properly structure your concept', 'You need clarity before talking to developers'] },
      { title: 'Before development',   points: ['You want to avoid costly mistakes and misdirection', 'You need a solid brief and technical requirements'] },
      { title: 'System redesign',      points: ['Your current setup isn\'t working as expected', 'You need to understand what to fix and how'] },
      { title: 'Scaling decisions',    points: ['You need clarity before expanding or adding features', 'You want a technical roadmap for the next phase'] },
    ],

    workflowHeadline: 'A structured consultation process',
    workflowSteps: [
      { label: 'Understand your idea or business' },
      { label: 'Identify goals and challenges' },
      { label: 'Define system structure' },
      { label: 'Clarify features and priorities' },
      { label: 'Provide recommendations and next steps' },
    ],

    whyHeadline: 'Why consultation matters',
    whyMessage:  'Most problems in software development don\'t come from coding. They come from unclear thinking at the start. Getting this right saves you time, money, and months of frustration.',

    caseExample: {
      title:    'Startup Product',
      problem:  'Unclear product structure, feature overload, and no technical direction to guide development',
      solution: 'Structured consultation session mapping out the right system, feature priorities, and approach',
      outcome:  'Defined system, clear development roadmap, and confidence to move forward correctly',
    },

    comparisonTitle: 'Building directly vs consulting first',
    leftLabel:   'Without consultation',
    leftItems:   ['Unclear requirements from the start', 'Wasted development time on wrong features', 'Costly and disruptive changes mid-build', 'Confusion and misalignment throughout'],
    rightLabel:  'With Z3ymo consultation',
    rightItems:  ['Clear direction before any code is written', 'Focused development on what matters', 'Significantly reduced risk of mistakes', 'Better outcomes and smoother execution'],

    ctaHeadline: 'Start with clarity',
    ctaText:     'Tell us what you\'re thinking — we\'ll help you define it properly before you build.',
  },

  // ── 6. Product Strategy (Consulting page) ─────────────────────
  {
    slug:          'product-strategy',
    name:          'Product Strategy',
    tagline:       'Consulting',
    headline:      'Build products with a clear strategy behind them',
    subheadline:   'Z3ymo helps you define, structure, and position your product — so you\'re not just building something, but building something that works.',
    accent:        '#C9A84C',
    secondaryCta:  'Explore tech consultation',
    secondaryHref: '/services/tech-consultation',
    isConsulting:  true as const,

    problemHeadline: 'Most products fail before they\'re even built',
    painPoints: [
      'You have an idea, but you\'re not sure it will work in the real market',
      'Features are added without a clear strategic direction guiding them',
      'The product doesn\'t connect well enough with the people it\'s for',
      'You\'re building without clear positioning in a competitive space',
      'Time and money are being spent without real validation or direction',
    ],

    solutionHeadline: 'Strategy before execution',
    solutionMessage:  'We don\'t start with features. We start with understanding your users, your value, and how your product should function in the real world.',
    deliverables: [
      'Defining your product concept with clarity and precision',
      'Identifying the right target users and their real needs',
      'Structuring features around genuine value — not assumptions',
      'Positioning your product effectively in its market',
      'Aligning your business goals with your product design decisions',
    ],

    deliverablesHeadline: 'What you walk away with',
    deliverableBlocks: [
      { title: 'Product clarity',    desc: 'A clear, precise definition of what you\'re building, for whom, and why it matters.',  icon: 'target' },
      { title: 'User focus',         desc: 'A deep understanding of who the product is for and what they actually need.',          icon: 'users' },
      { title: 'Feature direction',  desc: 'Prioritized features grounded in user value — not assumptions or wish lists.',        icon: 'lightbulb' },
      { title: 'Positioning',        desc: 'How your product stands out in its market and why users will choose it.',             icon: 'compass' },
      { title: 'Execution plan',     desc: 'Clear, actionable next steps for building and launching with confidence.',            icon: 'map' },
    ],

    useCasesHeadline: 'When this is useful',
    useCases: [
      { title: 'New product ideas',     points: ['You want to validate and shape your concept properly', 'You need to understand if and how it will work'] },
      { title: 'Early-stage startups',  points: ['You need strategic direction before building anything', 'You want to avoid wasting early resources on the wrong path'] },
      { title: 'Existing products',     points: ['Your product isn\'t performing as expected', 'You need to understand why and what to change'] },
      { title: 'Expansion plans',       points: ['You want to introduce new features or enter new markets', 'You need a strategy to guide that expansion'] },
    ],

    workflowHeadline: 'A structured product strategy process',
    workflowSteps: [
      { label: 'Understand your idea and goals' },
      { label: 'Identify users and their real problems' },
      { label: 'Define product structure and features' },
      { label: 'Clarify positioning and unique value' },
      { label: 'Create a clear execution plan' },
    ],

    whyHeadline: 'Why strategy matters',
    whyMessage:  'Building a product without strategy often leads to wasted effort and missed market fit. Clear strategy ensures your product solves the right problem, for the right people, in the right way.',

    caseExample: {
      title:    'Startup Product',
      problem:  'Unclear positioning, feature overload, and no clear understanding of the target user',
      solution: 'Structured product strategy session producing a focused concept and clear direction',
      outcome:  'Focused product with strong positioning and a clear roadmap ready for development',
    },

    comparisonTitle: 'Building without strategy vs building with strategy',
    leftLabel:   'Without strategy',
    leftItems:   ['Feature-driven decisions with no clear logic', 'Unclear direction that shifts constantly', 'Weak product-market fit and poor adoption', 'Wasted resources on the wrong things'],
    rightLabel:  'With Z3ymo strategy',
    rightItems:  ['Clear product direction from day one', 'User-focused design decisions', 'Strong market positioning', 'Efficient execution focused on what matters'],

    ctaHeadline: 'Start with the right product strategy',
    ctaText:     'Tell us about your idea — we\'ll help you shape it into something that works.',
  },
]

// ─── Helpers ──────────────────────────────────────────────────────

export function getServiceBySlug(slug: string): AnyServicePage | undefined {
  return SERVICE_PAGES.find((s) => s.slug === slug)
}

export function getAllServiceSlugs(): string[] {
  return SERVICE_PAGES.map((s) => s.slug)
}

// Overview page data ─────────────────────────────────────────────

export interface ServicePillar {
  title:    string
  tagline:  string
  desc:     string
  icon:     SvcIconKey
  accent:   string
  href:     string
  services: string[]
}

export const SERVICE_PILLARS: ServicePillar[] = [
  {
    title:   'Software Development',
    tagline: 'Build the systems your business runs on',
    desc:    'Custom web and mobile applications, business platforms, and scalable systems — built precisely for how your business operates.',
    icon:    'code',
    accent:  '#C0392B',
    href:    '/services/web-mobile',
    services: [
      'Web & mobile applications',
      'Custom business platforms',
      'Scalable, performance-focused systems',
    ],
  },
  {
    title:   'AI Development',
    tagline: 'Add intelligence to how your business operates',
    desc:    'AI agents that automate tasks and AI-powered workflows that streamline your operations — built for real business outcomes, not hype.',
    icon:    'brain',
    accent:  '#1B998B',
    href:    '/services/ai-agents',
    services: [
      'AI agents for automation',
      'AI-powered workflows',
      'Business process optimization',
    ],
  },
  {
    title:   'Consulting',
    tagline: 'Make the right technical and product decisions',
    desc:    'Structured guidance that helps you define what to build, how to build it, and what strategy will make it work — before you invest.',
    icon:    'compass',
    accent:  '#C9A84C',
    href:    '/services/tech-consultation',
    services: [
      'Tech consultation',
      'Product strategy',
      'System architecture planning',
    ],
  },
]

export const DECISION_PATHS = [
  {
    condition: 'If you need a system or platform',
    service:   'Software Development',
    href:      '/services/web-mobile',
    accent:    '#C0392B',
    icon:      'code' as SvcIconKey,
  },
  {
    condition: 'If you want automation or AI capabilities',
    service:   'AI Development',
    href:      '/services/ai-agents',
    accent:    '#1B998B',
    icon:      'brain' as SvcIconKey,
  },
  {
    condition: 'If you\'re planning or unsure what to build',
    service:   'Consulting',
    href:      '/services/tech-consultation',
    accent:    '#C9A84C',
    icon:      'compass' as SvcIconKey,
  },
]

export const HOW_WE_WORK = [
  {
    num:   '01',
    title: 'Understand',
    desc:  'We learn your business, goals, and challenges — before we recommend anything.',
    icon:  'users' as SvcIconKey,
  },
  {
    num:   '02',
    title: 'Design',
    desc:  'We define the right system, flow, and structure based on what you actually need.',
    icon:  'lightbulb' as SvcIconKey,
  },
  {
    num:   '03',
    title: 'Build',
    desc:  'We develop your solution with clarity, precision, and attention to your operations.',
    icon:  'code' as SvcIconKey,
  },
  {
    num:   '04',
    title: 'Support',
    desc:  'We help you refine, scale, and improve as your business evolves.',
    icon:  'refresh' as SvcIconKey,
  },
]

export const INDUSTRIES_SERVED = [
  { label: 'Online stores',          href: '/solutions/ecommerce' },
  { label: 'Service businesses',     href: '/solutions/services' },
  { label: 'Digital entrepreneurs',  href: '/solutions/digital' },
  { label: 'Restaurants & food',     href: '/solutions/food' },
  { label: 'Beauty & wellness',      href: '/solutions/beauty' },
  { label: 'Electronics & retail',   href: '/solutions/electronics' },
]

export const WHY_REASONS = [
  { text: 'Systems, not just projects — we think in outcomes',   icon: 'stack'    as SvcIconKey },
  { text: 'Designed for clarity, scalability, and real use',     icon: 'target'   as SvcIconKey },
  { text: 'Built with both business and technology in mind',     icon: 'layers'   as SvcIconKey },
  { text: 'Long-term thinking, not quick fixes',                 icon: 'shield'   as SvcIconKey },
]
