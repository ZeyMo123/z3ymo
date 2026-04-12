import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

/* ═══════════════════════════════════════════════
   BlogImage — full-bleed images with optional captions
   Usage: ![Alt text](url "Optional caption")
   ═══════════════════════════════════════════════ */
export function BlogImage({
  src,
  alt,
  title,
  width,
  height,
}: {
  src: string
  alt: string
  title?: string
  width?: number
  height?: number
}) {
  return (
    <figure className="my-10 -mx-4 sm:-mx-8 md:-mx-16">
      <div className="relative w-full overflow-hidden rounded-2xl bg-void/5 dark:bg-whisper/5 aspect-video">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        />
      </div>
      {(title || alt) && (
        <figcaption className="mt-3 text-center text-sm text-void/40 dark:text-whisper/40 italic px-4">
          {title ?? alt}
        </figcaption>
      )}
    </figure>
  )
}

/* ═══════════════════════════════════════════════
   BlockQuote — styled editorial blockquote
   Usage: > Your quote here
   ═══════════════════════════════════════════════ */
export function BlockQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote
      className="
        relative my-10 pl-6 pr-4 py-2
        border-l-4 border-crimson
        not-italic
      "
    >
      {/* Decorative large quote mark */}
      <span
        aria-hidden="true"
        className="
          absolute -top-2 -left-1
          font-display font-bold text-[5rem] leading-none
          text-crimson/10 dark:text-crimson/15
          select-none pointer-events-none
        "
      >
        &ldquo;
      </span>
      <div className="relative text-xl font-medium text-void/80 dark:text-whisper/80 leading-relaxed font-display">
        {children}
      </div>
    </blockquote>
  )
}

/* ═══════════════════════════════════════════════
   PullQuote — large feature quote, breaks out of column
   Usage: <PullQuote>Quote text here</PullQuote>
   ═══════════════════════════════════════════════ */
export function PullQuote({
  children,
  author,
  role,
}: {
  children: React.ReactNode
  author?: string
  role?: string
}) {
  return (
    <aside
      className="
        my-12 -mx-4 sm:-mx-8 md:-mx-16
        px-8 md:px-16 py-12
        bg-void dark:bg-surface
        relative overflow-hidden
      "
    >
      {/* Background accent */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 80% at 0% 50%, rgba(192,57,43,0.08) 0%, transparent 60%)',
        }}
      />

      {/* Quote marks */}
      <div
        aria-hidden="true"
        className="
          absolute top-4 left-8
          font-display font-bold text-[8rem] leading-none
          text-crimson/20 select-none pointer-events-none
        "
      >
        &ldquo;
      </div>

      <div className="relative max-w-3xl mx-auto">
        <p className="
          font-display font-semibold
          text-[clamp(1.4rem,3vw,2rem)]
          text-whisper leading-[1.3]
          tracking-[-0.02em]
          text-balance
        ">
          {children}
        </p>

        {author && (
          <div className="mt-6 flex items-center gap-3">
            <div className="w-8 h-0.5 bg-crimson" />
            <div>
              <span className="text-sm font-medium text-whisper/80">{author}</span>
              {role && (
                <span className="text-sm text-whisper/40 ml-2">— {role}</span>
              )}
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

/* ═══════════════════════════════════════════════
   Callout — info / warning / tip boxes
   Usage: <Callout type="tip">Content here</Callout>
   ═══════════════════════════════════════════════ */
type CalloutType = 'info' | 'warning' | 'tip' | 'danger'

const calloutStyles: Record<CalloutType, {
  bg: string; border: string; icon: string; iconColor: string; label: string
}> = {
  tip: {
    bg: 'bg-emerald/5 dark:bg-emerald/8',
    border: 'border-emerald/30',
    icon: '✦',
    iconColor: 'text-emerald',
    label: 'Pro tip',
  },
  info: {
    bg: 'bg-void/4 dark:bg-whisper/4',
    border: 'border-void/15 dark:border-whisper/15',
    icon: '◈',
    iconColor: 'text-gold',
    label: 'Note',
  },
  warning: {
    bg: 'bg-gold/5 dark:bg-gold/8',
    border: 'border-gold/30',
    icon: '▲',
    iconColor: 'text-gold',
    label: 'Warning',
  },
  danger: {
    bg: 'bg-crimson/5 dark:bg-crimson/8',
    border: 'border-crimson/30',
    icon: '✕',
    iconColor: 'text-crimson',
    label: 'Important',
  },
}

export function Callout({
  type = 'info',
  title,
  children,
}: {
  type?: CalloutType
  title?: string
  children: React.ReactNode
}) {
  const s = calloutStyles[type]
  return (
    <div className={cn(
      'my-8 p-5 rounded-2xl border',
      s.bg, s.border,
    )}>
      <div className="flex items-start gap-3">
        <span className={cn('text-lg leading-none mt-0.5 shrink-0', s.iconColor)}>
          {s.icon}
        </span>
        <div>
          <p className={cn('text-sm font-semibold mb-1', s.iconColor)}>
            {title ?? s.label}
          </p>
          <div className="text-sm text-void/70 dark:text-whisper/70 leading-relaxed [&>p]:mb-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   CodeBlock — syntax-highlighted code with copy button
   Wraps <pre> from rehype-pretty-code
   ═══════════════════════════════════════════════ */
export function CodeBlock(props: React.HTMLAttributes<HTMLPreElement>) {
  return (
    <div className="group relative my-8">
      <pre
        {...props}
        className={cn(
          'rounded-2xl overflow-x-auto',
          'p-6 text-sm leading-relaxed',
          'bg-void dark:bg-void-800',
          'border border-void/0 dark:border-whisper/8',
          '[&>code]:bg-transparent [&>code]:p-0',
          '[&_.highlighted]:bg-whisper/5 [&_.highlighted]:-mx-6 [&_.highlighted]:px-6 [&_.highlighted]:border-l-2 [&_.highlighted]:border-crimson',
          props.className,
        )}
      />
    </div>
  )
}

/* ═══════════════════════════════════════════════
   Divider — styled horizontal rule
   Usage: ---
   ═══════════════════════════════════════════════ */
export function Divider() {
  return (
    <div className="my-12 flex items-center gap-4" aria-hidden="true">
      <div className="flex-1 h-px bg-void/8 dark:bg-whisper/8" />
      <div className="flex gap-1.5">
        <span className="w-1 h-1 rounded-full bg-crimson/40" />
        <span className="w-1 h-1 rounded-full bg-crimson/70" />
        <span className="w-1 h-1 rounded-full bg-crimson/40" />
      </div>
      <div className="flex-1 h-px bg-void/8 dark:bg-whisper/8" />
    </div>
  )
}

/* ═══════════════════════════════════════════════
   LeadText — large opening paragraph for articles
   Usage: <LeadText>First paragraph of article</LeadText>
   ═══════════════════════════════════════════════ */
export function LeadText({ children }: { children: React.ReactNode }) {
  return (
    <p className="
      text-[1.2rem] leading-[1.75]
      text-void/75 dark:text-whisper/75
      font-light mb-8
      [&+p]:mt-0
    ">
      {children}
    </p>
  )
}

/* ═══════════════════════════════════════════════
   ArticleLink — styled links inside article content
   ═══════════════════════════════════════════════ */
export function ArticleLink({
  href,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isExternal = href?.startsWith('http')
  const Component = isExternal ? 'a' : Link

  return (
    <Component
      href={href ?? '#'}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="
        text-crimson underline decoration-crimson/30
        underline-offset-2
        hover:decoration-crimson
        transition-all duration-150
      "
      {...props}
    >
      {children}
      {isExternal && (
        <svg
          width="10" height="10" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
          className="inline ml-0.5 mb-0.5 opacity-50"
        >
          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      )}
    </Component>
  )
}
