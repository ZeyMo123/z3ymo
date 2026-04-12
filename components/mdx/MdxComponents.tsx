// ─────────────────────────────────────────────────────────────────
// components/mdx/MdxComponents.tsx
//
// Custom HTML element overrides for MDX content.
// Passed as `components` to <MDXRemote components={MdxComponents} />
// Works identically in next-mdx-remote v5 and v6.
// ─────────────────────────────────────────────────────────────────

import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'

export const MdxComponents: MDXComponents = {
  // ── Headings ─────────────────────────────────────────────────
  h1: ({ children, ...props }) => (
    <h1 className="font-display font-bold text-3xl text-void dark:text-whisper mt-12 mb-5 leading-tight" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 className="font-display font-bold text-2xl text-void dark:text-whisper mt-10 mb-4 leading-tight" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="font-display font-semibold text-xl text-void dark:text-whisper mt-8 mb-3" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 className="font-display font-semibold text-lg text-void dark:text-whisper mt-6 mb-2" {...props}>
      {children}
    </h4>
  ),

  // ── Body text ─────────────────────────────────────────────────
  p: ({ children, ...props }) => (
    <p className="text-void/70 dark:text-whisper/70 leading-[1.8] mb-5 text-base" {...props}>
      {children}
    </p>
  ),

  // ── Links ─────────────────────────────────────────────────────
  a: ({ href = '#', children, ...props }) => {
    const isExternal = href.startsWith('http')
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer"
          className="text-crimson hover:underline underline-offset-2" {...props}>
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className="text-crimson hover:underline underline-offset-2" {...props}>
        {children}
      </Link>
    )
  },

  // ── Lists ─────────────────────────────────────────────────────
  ul: ({ children, ...props }) => (
    <ul className="list-none mb-5 space-y-2" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="list-decimal list-inside mb-5 space-y-2 text-void/70 dark:text-whisper/70" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="flex items-start gap-3 text-void/70 dark:text-whisper/70 text-base leading-relaxed" {...props}>
      <span className="w-1.5 h-1.5 rounded-full bg-crimson flex-shrink-0 mt-2.5" />
      <span>{children}</span>
    </li>
  ),

  // ── Blockquote ────────────────────────────────────────────────
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-2 border-crimson pl-5 my-6 italic text-void/60 dark:text-whisper/60"
      {...props}
    >
      {children}
    </blockquote>
  ),

  // ── Code ─────────────────────────────────────────────────────
  code: ({ children, ...props }) => (
    <code
      className="font-mono text-[0.85em] px-1.5 py-0.5 rounded-md bg-void/6 dark:bg-whisper/6 text-crimson"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }) => (
    <pre
      className="font-mono text-sm rounded-2xl bg-void dark:bg-whisper/6 text-whisper dark:text-void/80 p-5 overflow-x-auto mb-6 leading-relaxed"
      {...props}
    >
      {children}
    </pre>
  ),

  // ── Horizontal rule ───────────────────────────────────────────
  hr: () => (
    <hr className="border-0 border-t border-void/10 dark:border-whisper/10 my-10" />
  ),

  // ── Images ───────────────────────────────────────────────────
  img: ({ src, alt, ...props }) => (
    <figure className="my-8">
      <img
        src={src}
        alt={alt ?? ''}
        className="w-full rounded-2xl object-cover"
        {...props}
      />
      {alt && (
        <figcaption className="text-center text-xs text-void/35 dark:text-whisper/35 mt-3">
          {alt}
        </figcaption>
      )}
    </figure>
  ),

  // ── Tables ───────────────────────────────────────────────────
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto my-6 rounded-2xl border border-void/8 dark:border-whisper/8">
      <table className="w-full text-sm" {...props}>{children}</table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-void/3 dark:bg-whisper/3 border-b border-void/8 dark:border-whisper/8" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }) => (
    <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-void/40 dark:text-whisper/40" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="px-4 py-3 text-void/65 dark:text-whisper/65 border-t border-void/5 dark:border-whisper/5" {...props}>
      {children}
    </td>
  ),

  // ── Strong / Em ───────────────────────────────────────────────
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-void dark:text-whisper" {...props}>{children}</strong>
  ),
  em: ({ children, ...props }) => (
    <em className="italic text-void/80 dark:text-whisper/80" {...props}>{children}</em>
  ),
}
