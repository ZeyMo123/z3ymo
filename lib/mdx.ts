// ─────────────────────────────────────────────────────────────────
// lib/mdx.ts — next-mdx-remote v6 helper
//
// v6 breaking change:
//   REMOVED: serialize(source) + <MDXRemote {...props} /> (client hydration)
//   ADDED:   <MDXRemote source={rawString} /> from 'next-mdx-remote/rsc'
//            Works as a React Server Component — no serialisation step needed.
//
// Usage in a server component / page:
//   import { MDXRemote } from 'next-mdx-remote/rsc'
//   import { mdxComponents, mdxOptions } from '@/lib/mdx'
//
//   <MDXRemote
//     source={post.content}
//     components={mdxComponents}
//     options={mdxOptions}
//   />
// ─────────────────────────────────────────────────────────────────

import type { MDXRemoteProps } from 'next-mdx-remote/rsc'
import type { ComponentPropsWithoutRef } from 'react'
import { MdxComponents } from '@/components/mdx/MdxComponents'

// ─── remark / rehype plugins ──────────────────────────────────
// Install if not already present:
//   npm i rehype-slug rehype-autolink-headings rehype-pretty-code remark-gfm

// Options passed to <MDXRemote options={mdxOptions} />
export const mdxOptions: MDXRemoteProps['options'] = {
  mdxOptions: {
    remarkPlugins: [
      // remark-gfm adds tables, strikethrough, task lists
      // Uncomment once package is installed:
      // (await import('remark-gfm')).default,
    ],
    rehypePlugins: [
      // rehype-slug adds id attrs to headings (required for ToC links)
      // rehype-autolink-headings makes headings linkable
      // rehype-pretty-code for syntax highlighting
      // Uncomment once packages are installed:
      // (await import('rehype-slug')).default,
    ],
  },
}

// ─── MDX component map ────────────────────────────────────────
// Maps HTML elements to custom styled React components.
// Passed as `components` prop to <MDXRemote />.
export { MdxComponents as mdxComponents }

// ─── Reading time estimate ────────────────────────────────────
export function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

// ─── Plain-text excerpt ───────────────────────────────────────
// Strips MDX/Markdown syntax for use in meta descriptions.
export function extractExcerpt(content: string, maxLength = 160): string {
  return content
    .replace(/```[\s\S]*?```/g, '')   // remove code blocks
    .replace(/#{1,6}\s/g, '')          // remove headings
    .replace(/[*_~`[\]()>]/g, '')      // remove markdown chars
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength)
}
