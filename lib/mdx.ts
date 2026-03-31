import { compileMDX } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'

// MDX Components
import {
  BlogImage,
  BlockQuote,
  PullQuote,
  Callout,
  CodeBlock,
  Divider,
  LeadText,
  ArticleLink,
} from '@/components/mdx/MdxComponents'

const mdxComponents = {
  img:        BlogImage,
  blockquote: BlockQuote,
  PullQuote,
  Callout,
  pre:        CodeBlock,
  hr:         Divider,
  LeadText,
  a:          ArticleLink,
}

const prettyCodeOptions = {
  theme: {
    dark:  'one-dark-pro',
    light: 'github-light',
  },
  keepBackground: false,
  onVisitLine(node: any) {
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }]
    }
  },
  onVisitHighlightedLine(node: any) {
    node.properties.className.push('highlighted')
  },
}

export async function processMDX(content: string) {
  const { content: rendered, frontmatter } = await compileMDX({
    source: content,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, {
            behavior: 'wrap',
            properties: { className: ['heading-anchor'] },
          }],
          [rehypePrettyCode, prettyCodeOptions],
        ],
      },
    },
  })

  return { rendered, frontmatter }
}

// ─── Extract headings for Table of Contents ────
export function extractHeadings(content: string): { id: string; text: string; level: number }[] {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm
  const headings: { id: string; text: string; level: number }[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text  = match[2].trim()
    const id    = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')

    headings.push({ id, text, level })
  }

  return headings
}

// ─── Estimate reading time ────────────────────
export function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 220))
}
