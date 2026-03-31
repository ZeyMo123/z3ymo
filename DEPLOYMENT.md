# Z3ymo — Deployment Guide
## Vercel + Cloudflare + z3ymo.com

Complete step-by-step guide to take Z3ymo from local to live.

---

## Step 1 — Buy the domain

1. Go to **Cloudflare Registrar** (registrar.cloudflare.com)
2. Search `z3ymo.com`
3. Purchase (~$10/year — Cloudflare sells at cost, no markup)
4. Your domain automatically uses Cloudflare DNS — no extra setup needed

> **Why Cloudflare Registrar?** No markup pricing, automatic DDoS protection, free SSL, and 
> the DNS is already configured. One less thing to set up.

---

## Step 2 — Set up Supabase

1. Go to **supabase.com** → New project
2. Name it `z3ymo-production`
3. Choose a region close to Tanzania: **Europe (Frankfurt)** or **US East** (best latency for TZ)
4. Set a strong database password (save it securely)
5. Wait ~2 minutes for project to provision

### Run the schema
1. In Supabase dashboard → **SQL Editor**
2. Open `lib/supabase/schema.sql` from your project
3. Paste the entire file and click **Run**
4. Verify tables were created: Database → Tables

### Get your keys
From Supabase → Settings → API:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

---

## Step 3 — Set up Resend (email)

1. Go to **resend.com** → Sign up free
2. Create an API key: API Keys → Create API Key → Name: `z3ymo-production`
3. Add your domain: Domains → Add Domain → enter `z3ymo.com`
4. Resend shows you DNS records to add in Cloudflare

### Add Resend DNS records in Cloudflare
1. Cloudflare dashboard → z3ymo.com → DNS
2. Add each record Resend gives you (SPF, DKIM records)
3. Back in Resend → click Verify — should go green within minutes

---

## Step 4 — Deploy to Vercel

### Connect your repository
```bash
# If using Git (recommended):
git init
git add .
git commit -m "feat: Z3ymo initial build"

# Push to GitHub/GitLab/Bitbucket — your choice
# Then connect repo in Vercel dashboard
```

### OR deploy via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# In your z3ymo/ directory:
vercel

# Answer prompts:
# Set up and deploy? Y
# Which scope? Your account
# Link to existing project? N
# What's your project name? z3ymo
# In which directory is your code? ./
# Override settings? N
```

### Set environment variables in Vercel
Vercel dashboard → z3ymo project → Settings → Environment Variables

Add each variable from your `.env.local`:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxx.supabase.co` | All |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJ...` | All |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJ...` | Production only |
| `RESEND_API_KEY` | `re_...` | All |
| `RESEND_FROM_EMAIL` | `hello@z3ymo.com` | All |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `+255XXXXXXXXX` | All |
| `NEXT_PUBLIC_SITE_URL` | `https://z3ymo.com` | Production |

After adding variables: **Deployments → Redeploy**

---

## Step 5 — Connect custom domain

### In Vercel
1. Project → Settings → Domains
2. Add domain: `z3ymo.com`
3. Also add `www.z3ymo.com` (Vercel redirects www → apex automatically)
4. Vercel shows you DNS records to add

### In Cloudflare
1. DNS → Add record:
   ```
   Type: A
   Name: @
   Content: 76.76.21.21   (Vercel's IP — check Vercel for current value)
   Proxy: ON (orange cloud)
   ```
2. Add CNAME for www:
   ```
   Type: CNAME
   Name: www
   Content: cname.vercel-dns.com
   Proxy: ON
   ```

3. Wait 1–5 minutes → back in Vercel, the domain should show as valid with SSL

### Cloudflare SSL settings
Cloudflare → z3ymo.com → SSL/TLS:
- Mode: **Full (strict)**
- Always Use HTTPS: **ON**
- Min TLS version: **1.2**

---

## Step 6 — Performance configuration in Cloudflare

### Speed optimisations (free tier)
Cloudflare → Speed → Optimization:
- Auto Minify: ✅ JavaScript, CSS, HTML
- Brotli compression: ✅ On
- Rocket Loader: ❌ Off (conflicts with Next.js)

### Caching rules
Cloudflare → Caching → Configuration:
- Caching Level: Standard
- Browser Cache TTL: 1 hour

### Create a Page Rule for static assets:
```
URL pattern: z3ymo.com/_next/static/*
Settings:
  Cache Level: Cache Everything
  Edge Cache TTL: 1 month
  Browser Cache TTL: 1 month
```

---

## Step 7 — Enable Vercel Analytics

Vercel dashboard → z3ymo project → Analytics → Enable

This automatically adds Core Web Vitals monitoring, real user metrics, and a privacy-respecting analytics dashboard. **No code changes needed.**

---

## Step 8 — Post-deployment checklist

Run through these after going live:

### Technical ✅
- [ ] `https://z3ymo.com` loads without SSL warnings
- [ ] `https://www.z3ymo.com` redirects to `https://z3ymo.com`
- [ ] Dark mode toggle works
- [ ] Light mode looks correct
- [ ] Contact drawer opens → WhatsApp link works
- [ ] Newsletter signup returns success
- [ ] Blog at `/blog` loads
- [ ] `/blog/compose` accessible (add auth before sharing widely)
- [ ] `/sitemap.xml` returns valid XML
- [ ] `/robots.txt` returns correct content
- [ ] `/_next/static/` assets have long cache headers

### SEO ✅
- [ ] Google Search Console → Add property → `z3ymo.com`
- [ ] Submit sitemap: `https://z3ymo.com/sitemap.xml`
- [ ] Test OG image: developers.facebook.com/tools/debug
- [ ] Test Twitter card: cards-dev.twitter.com/validator
- [ ] PageSpeed Insights: pagespeed.web.dev → target 90+ on mobile

### PWA ✅
- [ ] On mobile Chrome → visit site → 3-dot menu → "Add to Home screen" appears
- [ ] Installed PWA opens without browser chrome
- [ ] Disconnect wifi → `/` still loads from cache
- [ ] Offline page shows at uncached routes

### Content ✅
- [ ] Replace `+255XXXXXXXXX` with real WhatsApp number throughout
- [ ] Replace `your@email.com` with real email
- [ ] Update social media links in Footer
- [ ] Publish first blog post via `/blog/compose`
- [ ] Add 3 portfolio items to homepage section

---

## Step 9 — First week tasks after launch

| Priority | Task |
|----------|------|
| 🔴 High | Share in Tanzanian business WhatsApp groups |
| 🔴 High | Post launch announcement on LinkedIn & Instagram |
| 🔴 High | DM 10 potential clients directly |
| 🟡 Medium | Write first blog post on Z3ymo Compose |
| 🟡 Medium | Set up Vercel → Resend webhook for email notifications |
| 🟡 Medium | Register Google Business Profile (Dar es Salaam) |
| 🟢 Nice | Set up Upwork/Fiverr profile linking to z3ymo.com |
| 🟢 Nice | Create LinkedIn company page for Z3ymo |

---

## Ongoing deployments

Every push to your main branch auto-deploys via Vercel.

```bash
# Daily development workflow
git add .
git commit -m "feat: description of change"
git push origin main
# → Vercel auto-deploys in ~60 seconds
# → Preview URL available immediately for testing
```

### Roll back if something breaks
Vercel dashboard → Deployments → click any previous deployment → **Promote to Production**

---

## Environment management

```
.env.local          # Local dev — never commit this
.env.local.example  # Template — commit this (no real values)
```

Vercel manages production env vars. Never put secrets in code.

---

## Costs at launch

| Service | Plan | Cost |
|---------|------|------|
| Vercel | Hobby (free) | $0/mo |
| Supabase | Free tier | $0/mo |
| Cloudflare | Free | $0/mo |
| Resend | Free (3K emails/mo) | $0/mo |
| Domain | z3ymo.com | ~$10/year |
| **Total** | | **~$0.83/mo** |

When you outgrow free tiers (real traffic, real revenue):
- Vercel Pro: $20/mo — needed for team + unlimited bandwidth
- Supabase Pro: $25/mo — needed for >500MB DB + daily backups
- Resend Pro: $20/mo — needed for >3K emails/month

You'll be making far more than this before hitting limits.

---

*Z3ymo — Built in Tanzania. Deployed to the world.* 🇹🇿
