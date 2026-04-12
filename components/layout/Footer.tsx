import Link from 'next/link'

const FOOTER_LINKS = {
  company: [
    { label: 'About',      href: '/about' },
    { label: 'Portfolio',  href: '/portfolio' },
    { label: 'Blog',       href: '/blog' },
    { label: 'Investors',  href: '/investors' },
    { label: 'Careers',    href: '/careers' },
  ],
  services: [
    { label: 'Web & Mobile apps', href: '/services' },
    { label: 'AI agent development', href: '/services' },
    { label: 'Custom software',   href: '/services' },
    { label: 'Tech consultation', href: '/services' },
  ],
  products: [
    { label: 'Products for sale', href: '/products' },
    { label: 'Z3ymo Pulse',       href: '/ai-agents/pulse' },
    { label: 'EBox',              href: '/products/ebox' },
    { label: 'Novel app',         href: '/products/novel' },
    { label: 'Salons marketplace',href: '/products/salons' },
  ],
}

const SOCIAL = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/z3ymo',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'X (Twitter)',
    href: 'https://x.com/z3ymo',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/z3ymo',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com/@z3ymo',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.31 6.31 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.23 8.23 0 004.84 1.55V6.79a4.85 4.85 0 01-1.07-.1z" />
      </svg>
    ),
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#080810] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-8">

        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="font-display font-bold text-2xl text-white/90 hover:text-crimson transition-colors duration-200 inline-block mb-3"
            >
              Z3ymo
            </Link>
            <p className="text-sm text-white/30 leading-relaxed mb-6 max-w-45">
              Africa&apos;s premium AI-native software company — built in Tanzania, serving the world.
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="
                    w-8 h-8 rounded-lg flex items-center justify-center
                    text-white/30 hover:text-white
                    bg-white/5 hover:bg-white/10
                    border border-white/8 hover:border-white/20
                    transition-all duration-150
                  "
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.14em] uppercase text-white/30 mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/40 hover:text-white transition-colors duration-150"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.14em] uppercase text-white/30 mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.services.map((l, i) => (
                <li key={i}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/40 hover:text-white transition-colors duration-150"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.14em] uppercase text-white/30 mb-5">
              Products
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.products.map((l, i) => (
                <li key={i}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/40 hover:text-white transition-colors duration-150"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="
          pt-8 border-t border-white/5
          flex flex-col sm:flex-row items-center justify-between gap-4
          text-xs text-white/25
        ">
          <div className="flex items-center gap-1.5">
            <span>© {year} Z3ymo.</span>
            <span className="text-white/15">·</span>
            <span className="flex items-center gap-1 text-crimson/50">
              Made in Tanzania
              <span>🇹🇿</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white/50 transition-colors duration-150">
              Privacy policy
            </Link>
            <Link href="/terms" className="hover:text-white/50 transition-colors duration-150">
              Terms of service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
