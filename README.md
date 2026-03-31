# Z3ymo — Built different. By design.

Africa's premium AI-native software company website — a Next.js 16 PWA with Crimson, Emerald, and Gold branding.

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.1 (App Router, React Compiler) |
| Language | TypeScript 5.7 |
| Styling | Tailwind CSS v4 (CSS-first config) |
| Animations | Framer Motion 12 |
| Fonts | Syne (display) + DM Sans (body) |
| Database | Supabase (PostgreSQL) |
| Email | Resend |
| Hosting | Vercel |
| CDN/DNS | Cloudflare |
| Theme | next-themes (light/dark, system-aware) |

## Color palette

| Name | Hex | Usage |
|---|---|---|
| Deep Void | `#0A0A0F` | Dark bg, footer |
| Midnight Surface | `#2A2A3D` | Cards, overlays |
| Whisper | `#F0EEF8` | Light bg |
| Crimson | `#C0392B` | Primary accent, CTAs |
| Emerald Teal | `#1B998B` | Secondary accent |
| Aged Gold | `#C9A84C` | Tertiary accent |

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.local.example .env.local
# Fill in your Supabase and Resend keys

# 3. Start development server
npm run dev

# 4. Open http://localhost:3000
```

## Project structure

```
z3ymo/
├── app/
│   ├── globals.css          # Tailwind v4 design tokens + animations
│   ├── fonts.ts             # Syne + DM Sans font config
│   ├── layout.tsx           # Root layout with ThemeProvider + SEO
│   └── page.tsx             # Homepage — assembles all sections
├── components/
│   ├── layout/
│   │   ├── FloatingNav.tsx  # Sticky nav with blur on scroll + mobile menu
│   │   └── Footer.tsx       # Dark footer with 4-column grid
│   ├── sections/
│   │   ├── Hero.tsx         # Canvas particle field + staggered headline
│   │   ├── ValueProp.tsx    # 3 glass pillar cards
│   │   ├── ProductsForSale.tsx  # Tilt cards + ContactDrawer
│   │   ├── Services.tsx     # Alternating editorial rows
│   │   ├── PulseSpotlight.tsx   # Dark island + animated phone mockup
│   │   ├── Portfolio.tsx    # Case study cards + outcome metrics
│   │   ├── SocialProof.tsx  # CountUp metrics + testimonials
│   │   ├── BlogPreview.tsx  # 3 latest blog posts
│   │   └── FinalCTA.tsx     # Gradient bg + newsletter form
│   └── ui/
│       ├── ThemeProvider.tsx    # next-themes wrapper
│       ├── ThemeToggle.tsx      # Animated sun/moon toggle
│       ├── MagneticButton.tsx   # Cursor-magnetic CTA button
│       ├── GlassCard.tsx        # Frosted glass with 3D tilt
│       ├── ContactDrawer.tsx    # WhatsApp/phone/email drawer
│       └── ScrollReveal.tsx     # IntersectionObserver fade-up
├── lib/
│   └── utils.ts             # cn() class merger
└── public/
    ├── manifest.json        # PWA manifest
    └── robots.txt           # SEO robots
```

## Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# then redeploy for production
```

## Week 2 additions

### New files
```
app/
├── about/page.tsx               # Founder story, values, timeline
├── blog/page.tsx                # Blog index with category filters + pagination
├── blog/[slug]/page.tsx         # Full article with ToC sidebar, rich MDX
├── blog/[slug]/opengraph-image  # Dynamic per-post OG images
├── products/page.tsx            # Products for sale + own products
├── services/page.tsx            # Services, process, pricing
├── privacy/page.tsx             # Privacy policy
├── terms/page.tsx               # Terms of service
├── offline/page.tsx             # PWA offline fallback
├── not-found.tsx                # Branded 404 page
├── opengraph-image.tsx          # Default OG image (edge rendered)
├── sitemap.ts                   # Dynamic sitemap (static + blog posts)
├── robots.ts                    # Robots via Metadata API
└── api/
    ├── subscribe/route.ts       # Newsletter subscribe → Supabase
    ├── contact/route.ts         # Contact form → Supabase + Resend
    └── waitlist/route.ts        # Product waitlist → Supabase

components/
├── blog/
│   ├── BlogCard.tsx             # default | featured | compact variants
│   ├── BlogFilters.tsx          # Client-side category filter tabs
│   └── TableOfContents.tsx      # Sticky ToC with active section tracking
└── mdx/
    └── MdxComponents.tsx        # BlogImage, BlockQuote, PullQuote,
                                 # Callout, CodeBlock, Divider, LeadText

lib/
├── mdx.ts                       # MDX processor with rehype-pretty-code
├── pwa.tsx                      # Service worker hook + OfflineBanner + Install button
└── supabase/
    ├── client.ts                # Type-safe Supabase clients (browser/server/admin)
    ├── queries.ts               # All data fetching functions
    └── schema.sql               # Complete DB schema — run in Supabase SQL editor

public/
└── sw.js                        # Service worker (cache-first + stale-while-revalidate)
```

### Supabase setup
1. Create a project at supabase.com
2. Go to SQL Editor → run `lib/supabase/schema.sql`
3. Copy your project URL and anon key into `.env.local`
4. Copy your service role key into `.env.local`

### Writing blog posts (MDX)
Posts are stored in Supabase as MDX strings. Available components in your content:

```mdx
<LeadText>Opening paragraph — renders larger.</LeadText>

Regular paragraph text here.

> A blockquote renders with a crimson left border and large quote mark.

<PullQuote author="Name" role="Role">
  A full-width pull quote that breaks out of the column.
</PullQuote>

![Alt text](https://url.com/image.jpg "Optional caption shown below image")

<Callout type="tip">A tip callout box — types: tip | info | warning | danger</Callout>

```javascript
// Code block with syntax highlighting via Shiki
const hello = "world"
```

---  (renders as a crimson dot divider)
```

### PWA install
The service worker (`public/sw.js`) is manually registered via `lib/pwa.tsx`.
An install banner appears automatically when the browser fires `beforeinstallprompt`.
An offline banner appears when the user loses connectivity.

## Z3ymo product roadmap

1. **Now** — Company website (this repo)
2. **Month 4–6** — Z3ymo Pulse (WhatsApp AI SaaS)
3. **Month 9–10** — EBox (Business review system)
4. **Month 10–11** — Salons Marketplace
5. **Month 12+** — Novel Writing & Reading App

---

*Built in Tanzania. Made for the world.* 🇹🇿
