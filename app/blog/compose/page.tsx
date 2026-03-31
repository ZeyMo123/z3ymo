'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase/client'

/* ─── Types ────────────────────────────────────── */
interface PostForm {
  title: string
  slug: string
  excerpt: string
  content: string
  author_name: string
  author_role: string
  read_time: number
  featured: boolean
  published: boolean
  category_id: string
  cover_image: string
  cover_alt: string
}

const EMPTY_FORM: PostForm = {
  title: '',
  slug: '',
  excerpt: '',
  content: `<LeadText>Start your article with an engaging opening paragraph here.</LeadText>

## First heading

Write your content here. You can use all standard Markdown plus Z3ymo custom components.

> A blockquote — great for highlighting key points.

<PullQuote author="Expert Name" role="Role">
  A pull quote that breaks out of the column. Use it for powerful statements.
</PullQuote>

![Image alt text](https://example.com/image.jpg "Optional caption")

<Callout type="tip">
  A tip callout — types: tip | info | warning | danger
</Callout>

## Second heading

Continue your article content here...

---

More content after the divider.

\`\`\`javascript
// Code block with syntax highlighting
const example = "Hello, Z3ymo!"
console.log(example)
\`\`\`
`,
  author_name: 'Z3ymo Team',
  author_role: 'Editor',
  read_time: 5,
  featured: false,
  published: false,
  category_id: '',
  cover_image: '',
  cover_alt: '',
}

/* ─── Slug generator ──────────────────────────── */
function toSlug(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

/* ─── Word count ──────────────────────────────── */
function wordCount(str: string) {
  return str.trim().split(/\s+/).filter(Boolean).length
}

/* ─── Toolbar button ─────────────────────────── */
function ToolbarBtn({
  label,
  title,
  onClick,
}: {
  label: string
  title: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className="
        px-2.5 py-1 rounded-md text-xs font-mono
        text-void/60 dark:text-whisper/60
        hover:text-void dark:hover:text-whisper
        hover:bg-void/6 dark:hover:bg-whisper/6
        border border-void/8 dark:border-whisper/8
        hover:border-void/20 dark:hover:border-whisper/20
        transition-all duration-100 cursor-pointer
      "
    >
      {label}
    </button>
  )
}

/* ─── MDX Preview ────────────────────────────── */
function Preview({ content, title, excerpt }: { content: string; title: string; excerpt: string }) {
  // Simple preview — renders MDX shortcodes as styled divs for visual feedback
  const renderPreview = (mdx: string) => {
    return mdx
      // Remove frontmatter
      .replace(/^---[\s\S]*?---\n/, '')
      // LeadText
      .replace(/<LeadText>([\s\S]*?)<\/LeadText>/g, '<p class="preview-lead">$1</p>')
      // PullQuote
      .replace(/<PullQuote[^>]*>([\s\S]*?)<\/PullQuote>/g, '<div class="preview-pullquote">$1</div>')
      // Callout
      .replace(/<Callout[^>]*>([\s\S]*?)<\/Callout>/g, '<div class="preview-callout">$1</div>')
      // Images with captions
      .replace(/!\[([^\]]*)\]\(([^)]+)\)\s*"([^"]+)"/g, '<figure><img src="$2" alt="$1" style="width:100%;border-radius:12px" /><figcaption>$3</figcaption></figure>')
      // Images without captions
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<figure><img src="$2" alt="$1" style="width:100%;border-radius:12px" /></figure>')
      // Headings
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
      // Bold & italic
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      // Blockquote
      .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
      // Horizontal rule
      .replace(/^---$/gm, '<hr />')
      // Code blocks (simplified)
      .replace(/```[\w]*\n([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
      // Inline code
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      // Paragraphs (basic — double newlines)
      .replace(/\n\n([^<\n])/g, '\n<p>$1')
      .replace(/([^>\n])\n\n/g, '$1</p>\n')
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <style>{`
        .preview-lead { font-size:1.15rem;line-height:1.8;color:rgba(10,10,15,.7);margin-bottom:1.5rem;font-weight:300; }
        .dark .preview-lead { color:rgba(240,238,248,.65); }
        .preview-pullquote { background:#0A0A0F;color:#F0EEF8;padding:2rem 2.5rem;border-radius:16px;margin:2rem -1.5rem;font-size:1.3rem;font-weight:600;line-height:1.35;letter-spacing:-.02em; }
        .preview-callout { background:rgba(27,153,139,.08);border:1px solid rgba(27,153,139,.25);border-radius:12px;padding:1rem 1.25rem;margin:1.5rem 0;font-size:.9rem;color:rgba(10,10,15,.7); }
        .dark .preview-callout { color:rgba(240,238,248,.65); }
        h1,h2,h3 { font-family:var(--font-display);letter-spacing:-.025em; }
        h2 { font-size:1.6rem;font-weight:600;margin-top:2.5rem;margin-bottom:.75rem;color:var(--color-void); }
        .dark h2 { color:var(--color-whisper); }
        h3 { font-size:1.25rem;font-weight:600;margin-top:1.75rem;margin-bottom:.5rem; }
        blockquote { border-left:3px solid #C0392B;padding:.5rem 1.25rem;margin:1.5rem 0;font-size:1.1rem;font-style:normal;font-weight:500;color:rgba(10,10,15,.75); }
        .dark blockquote { color:rgba(240,238,248,.75); }
        pre { background:#0A0A0F;color:#E0E0E0;padding:1.25rem 1.5rem;border-radius:12px;font-size:.85rem;overflow-x:auto;margin:1.5rem 0; }
        code { font-family:var(--font-mono);font-size:.875em;background:rgba(10,10,15,.06);color:#C0392B;padding:.15em .35em;border-radius:4px; }
        pre code { background:none;color:inherit;padding:0; }
        p { font-size:1rem;line-height:1.8;color:rgba(10,10,15,.65);margin-bottom:1.2rem; }
        .dark p { color:rgba(240,238,248,.6); }
        strong { font-weight:600;color:rgba(10,10,15,.85); }
        .dark strong { color:rgba(240,238,248,.85); }
        hr { border:none;border-top:1px solid rgba(10,10,15,.08);margin:2.5rem 0; }
        figcaption { text-align:center;font-size:.85rem;color:rgba(10,10,15,.4);margin-top:.5rem;font-style:italic; }
        img { display:block; }
      `}</style>

      {/* Article preview header */}
      {title && (
        <div className="mb-10 pb-8 border-b border-void/8 dark:border-whisper/8">
          <h1 className="font-display font-bold text-[2.2rem] text-void dark:text-whisper leading-tight mb-4 tracking-tight">{title}</h1>
          {excerpt && <p className="text-lg text-void/55 dark:text-whisper/55 leading-relaxed font-light">{excerpt}</p>}
        </div>
      )}

      {/* Rendered content */}
      <div dangerouslySetInnerHTML={{ __html: renderPreview(content) }} />
    </div>
  )
}

/* ─── Main Composer ───────────────────────────── */
export default function BlogComposePage() {
  const [form, setForm] = useState<PostForm>(EMPTY_FORM)
  const [activeTab, setActiveTab] = useState<'write' | 'preview' | 'meta'>('write')
  const [categories, setCategories] = useState<{ id: string; name: string; color: string }[]>([])
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [savedPosts, setSavedPosts] = useState<{ id: string; title: string; slug: string; published: boolean }[]>([])
  const [showSaved, setShowSaved] = useState(false)

  // Load categories and recent posts
  useEffect(() => {
    supabase.from('categories').select('id,name,color').then(({ data }) => {
      if (data) setCategories(data)
    })
    loadSavedPosts()
  }, [])

  const loadSavedPosts = async () => {
    const { data } = await supabase
      .from('posts')
      .select('id,title,slug,published')
      .order('created_at', { ascending: false })
      .limit(10)
    if (data) setSavedPosts(data)
  }

  // Auto-generate slug from title
  const handleTitleChange = (title: string) => {
    setForm((f) => ({
      ...f,
      title,
      slug: f.slug === toSlug(f.title) || f.slug === '' ? toSlug(title) : f.slug,
    }))
  }

  // Estimate read time from content
  useEffect(() => {
    const words = wordCount(form.content)
    setForm((f) => ({ ...f, read_time: Math.max(1, Math.round(words / 220)) }))
  }, [form.content])

  // Save to Supabase
  const handleSave = async (publish = false) => {
    if (!form.title || !form.slug || !form.content) {
      setMessage('Title, slug, and content are required.')
      return
    }

    setSaveStatus('saving')
    setMessage('')

    const payload = {
      ...form,
      published: publish || form.published,
      published_at: (publish || form.published) ? new Date().toISOString() : null,
      category_id: form.category_id || null,
    }

    const { error } = await supabase.from('posts').upsert(
      payload,
      { onConflict: 'slug' }
    )

    if (error) {
      setSaveStatus('error')
      setMessage(`Error: ${error.message}`)
    } else {
      setSaveStatus('saved')
      setMessage(publish ? 'Published successfully!' : 'Draft saved!')
      loadSavedPosts()
      setTimeout(() => setSaveStatus('idle'), 3000)
    }
  }

  // Insert MDX shortcodes at cursor
  const insertTemplate = useCallback((template: string) => {
    setForm((f) => ({ ...f, content: f.content + '\n\n' + template }))
  }, [])

  const SHORTCUTS = [
    { label: 'Lead', title: 'Insert LeadText', template: '<LeadText>Your opening paragraph here.</LeadText>' },
    { label: 'Pull', title: 'Insert PullQuote', template: '<PullQuote author="Name" role="Role">\n  Your pull quote here.\n</PullQuote>' },
    { label: 'Tip', title: 'Insert tip Callout', template: '<Callout type="tip">\n  Your tip here.\n</Callout>' },
    { label: 'Info', title: 'Insert info Callout', template: '<Callout type="info">\n  Your note here.\n</Callout>' },
    { label: 'Warn', title: 'Insert warning Callout', template: '<Callout type="warning">\n  Your warning here.\n</Callout>' },
    { label: 'Img', title: 'Insert image with caption', template: '![Alt text](https://example.com/image.jpg "Caption")' },
    { label: 'Code', title: 'Insert code block', template: '```javascript\n// Your code here\n```' },
    { label: 'H2', title: 'Insert h2 heading', template: '## Heading' },
    { label: 'HR', title: 'Insert divider', template: '---' },
    { label: 'Quote', title: 'Insert blockquote', template: '> Your quote here.' },
  ]

  return (
    <div className="min-h-screen bg-whisper dark:bg-void flex flex-col">

      {/* Top bar */}
      <div className="
        sticky top-0 z-30
        border-b border-void/8 dark:border-whisper/8
        bg-whisper/90 dark:bg-void/90 backdrop-blur-xl
        px-4 py-3 flex items-center gap-4
      ">
        <a href="/blog" className="text-sm font-medium text-void/50 dark:text-whisper/50 hover:text-void dark:hover:text-whisper transition-colors">
          ← Blog
        </a>
        <div className="w-px h-4 bg-void/15 dark:bg-whisper/15" />
        <span className="font-display font-semibold text-void dark:text-whisper text-sm">
          Compose
        </span>

        {/* Tabs */}
        <div className="flex gap-1 ml-auto">
          {(['write', 'preview', 'meta'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all duration-150 cursor-pointer
                ${activeTab === tab
                  ? 'bg-void dark:bg-whisper text-whisper dark:text-void'
                  : 'text-void/50 dark:text-whisper/50 hover:text-void dark:hover:text-whisper'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Status message */}
        <AnimatePresence>
          {message && (
            <motion.span
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className={`text-xs ${saveStatus === 'error' ? 'text-crimson' : 'text-emerald'}`}
            >
              {message}
            </motion.span>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => handleSave(false)}
            disabled={saveStatus === 'saving'}
            className="px-4 py-1.5 rounded-lg text-xs font-medium border border-void/15 dark:border-whisper/15 text-void/60 dark:text-whisper/60 hover:border-void/30 dark:hover:border-whisper/30 transition-all cursor-pointer disabled:opacity-40"
          >
            {saveStatus === 'saving' ? 'Saving…' : 'Save draft'}
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={saveStatus === 'saving'}
            className="px-4 py-1.5 rounded-lg text-xs font-medium bg-crimson text-white hover:bg-crimson-400 transition-colors cursor-pointer disabled:opacity-40"
          >
            Publish
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">

        {/* Title input — always visible */}
        <input
          type="text"
          value={form.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Post title…"
          className="
            w-full font-display font-bold text-[clamp(1.8rem,4vw,2.8rem)]
            tracking-tight leading-tight
            bg-transparent text-void dark:text-whisper
            placeholder:text-void/15 dark:placeholder:text-whisper/15
            border-none outline-none mb-3 resize-none
          "
        />

        <div className="flex items-center gap-3 mb-6 text-xs text-void/35 dark:text-whisper/35">
          <span>/{form.slug || 'your-slug'}</span>
          <span>·</span>
          <span>{wordCount(form.content)} words</span>
          <span>·</span>
          <span>{form.read_time} min read</span>
          {form.published && <span className="text-emerald font-medium">Published</span>}
          {!form.published && <span className="text-gold font-medium">Draft</span>}
        </div>

        <AnimatePresence mode="wait">

          {/* WRITE tab */}
          {activeTab === 'write' && (
            <motion.div key="write" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Toolbar */}
              <div className="flex gap-1.5 flex-wrap mb-3 pb-3 border-b border-void/8 dark:border-whisper/8">
                {SHORTCUTS.map((s) => (
                  <ToolbarBtn key={s.label} label={s.label} title={s.title} onClick={() => insertTemplate(s.template)} />
                ))}
              </div>

              <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="Write your MDX content here…"
                className="
                  w-full min-h-[60vh] font-mono text-sm
                  bg-transparent text-void/80 dark:text-whisper/80
                  placeholder:text-void/20 dark:placeholder:text-whisper/20
                  border-none outline-none resize-none leading-relaxed
                "
                spellCheck
              />
            </motion.div>
          )}

          {/* PREVIEW tab */}
          {activeTab === 'preview' && (
            <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="border border-void/8 dark:border-whisper/8 rounded-2xl overflow-hidden">
                <Preview content={form.content} title={form.title} excerpt={form.excerpt} />
              </div>
            </motion.div>
          )}

          {/* META tab */}
          {activeTab === 'meta' && (
            <motion.div key="meta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">

                <div className="md:col-span-2">
                  <label className="text-xs font-medium text-void/40 dark:text-whisper/40 mb-1.5 block">Excerpt (shown in cards & OG)</label>
                  <textarea
                    value={form.excerpt}
                    onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                    rows={3}
                    placeholder="A compelling one or two sentence summary of the article…"
                    className="w-full px-4 py-3 rounded-xl bg-void/4 dark:bg-whisper/4 border border-void/10 dark:border-whisper/10 text-void dark:text-whisper placeholder:text-void/25 dark:placeholder:text-whisper/25 text-sm focus:outline-none focus:border-crimson/40 transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-void/40 dark:text-whisper/40 mb-1.5 block">URL slug</label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: toSlug(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl bg-void/4 dark:bg-whisper/4 border border-void/10 dark:border-whisper/10 text-void dark:text-whisper text-sm font-mono focus:outline-none focus:border-crimson/40 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-void/40 dark:text-whisper/40 mb-1.5 block">Category</label>
                  <select
                    value={form.category_id}
                    onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-void/4 dark:bg-whisper/4 border border-void/10 dark:border-whisper/10 text-void dark:text-whisper text-sm focus:outline-none focus:border-crimson/40 transition-colors"
                  >
                    <option value="">No category</option>
                    {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-void/40 dark:text-whisper/40 mb-1.5 block">Author name</label>
                  <input type="text" value={form.author_name}
                    onChange={(e) => setForm({ ...form, author_name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-void/4 dark:bg-whisper/4 border border-void/10 dark:border-whisper/10 text-void dark:text-whisper text-sm focus:outline-none focus:border-crimson/40 transition-colors" />
                </div>

                <div>
                  <label className="text-xs font-medium text-void/40 dark:text-whisper/40 mb-1.5 block">Author role</label>
                  <input type="text" value={form.author_role}
                    onChange={(e) => setForm({ ...form, author_role: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-void/4 dark:bg-whisper/4 border border-void/10 dark:border-whisper/10 text-void dark:text-whisper text-sm focus:outline-none focus:border-crimson/40 transition-colors" />
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs font-medium text-void/40 dark:text-whisper/40 mb-1.5 block">Cover image URL</label>
                  <input type="url" value={form.cover_image} placeholder="https://..."
                    onChange={(e) => setForm({ ...form, cover_image: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-void/4 dark:bg-whisper/4 border border-void/10 dark:border-whisper/10 text-void dark:text-whisper text-sm focus:outline-none focus:border-crimson/40 transition-colors" />
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs font-medium text-void/40 dark:text-whisper/40 mb-1.5 block">Cover image alt / caption</label>
                  <input type="text" value={form.cover_alt} placeholder="Describe the image for accessibility and SEO"
                    onChange={(e) => setForm({ ...form, cover_alt: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-void/4 dark:bg-whisper/4 border border-void/10 dark:border-whisper/10 text-void dark:text-whisper text-sm focus:outline-none focus:border-crimson/40 transition-colors" />
                </div>

                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.featured}
                      onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                      className="w-4 h-4 accent-crimson" />
                    <span className="text-sm text-void/60 dark:text-whisper/60">Featured post</span>
                  </label>
                </div>
              </div>

              {/* Recent posts */}
              {savedPosts.length > 0 && (
                <div className="mt-10">
                  <button
                    onClick={() => setShowSaved(!showSaved)}
                    className="text-xs font-medium text-void/40 dark:text-whisper/40 hover:text-void dark:hover:text-whisper transition-colors cursor-pointer mb-3 flex items-center gap-2"
                  >
                    {showSaved ? '▼' : '▶'} Recent posts ({savedPosts.length})
                  </button>
                  <AnimatePresence>
                    {showSaved && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="space-y-2">
                          {savedPosts.map((p) => (
                            <div key={p.id} className="flex items-center justify-between px-4 py-3 rounded-xl border border-void/8 dark:border-whisper/8">
                              <span className="text-sm text-void/70 dark:text-whisper/70">{p.title}</span>
                              <div className="flex items-center gap-3">
                                <span className={`text-xs ${p.published ? 'text-emerald' : 'text-gold'}`}>
                                  {p.published ? 'Published' : 'Draft'}
                                </span>
                                <a href={`/blog/${p.slug}`} target="_blank" className="text-xs text-void/35 dark:text-whisper/35 hover:text-crimson transition-colors">View →</a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}
