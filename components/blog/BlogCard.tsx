import Image from 'next/image'
import Link from 'next/link'
import { type Post } from '@/lib/supabase/client'

interface BlogCardProps {
  post: Post
  variant?: 'default' | 'featured' | 'compact'
}

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  }).format(new Date(dateStr))
}

export default function BlogCard({ post, variant = 'default' }: BlogCardProps) {
  const category = (post as any).categories
  const date = post.published_at ?? post.created_at

  if (variant === 'featured') {
    return (
      <Link href={`/blog/${post.slug}`} className="group block">
        <article className="
          grid grid-cols-1 md:grid-cols-2 gap-0
          rounded-2xl overflow-hidden
          border border-void/8 dark:border-whisper/8
          hover:border-void/16 dark:hover:border-whisper/16
          transition-all duration-300
          bg-void/2 dark:bg-whisper/2
        ">
          {/* Image */}
          <div className="relative aspect-4/3 md:aspect-auto overflow-hidden bg-void/5 dark:bg-whisper/5">
            {post.cover_image ? (
              <Image
                src={post.cover_image}
                alt={post.cover_alt ?? post.title}
                fill
                className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: `${category?.color ?? '#C0392B'}08` }}
              >
                <span
                  className="font-display font-bold text-7xl opacity-20"
                  style={{ color: category?.color ?? '#C0392B' }}
                >
                  {post.title.charAt(0)}
                </span>
              </div>
            )}

            {/* Category overlay */}
            {category && (
              <div className="absolute top-4 left-4">
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm"
                  style={{
                    background: `${category.color}22`,
                    color: category.color,
                    border: `1px solid ${category.color}40`,
                  }}
                >
                  {category.name}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-8 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs text-void/40 dark:text-whisper/40 mb-4">
              <span>{formatDate(date!)}</span>
              <span>·</span>
              <span>{post.read_time} min read</span>
            </div>

            <h2 className="
              font-display font-semibold text-2xl
              text-void dark:text-whisper
              leading-snug mb-3
              group-hover:text-crimson dark:group-hover:text-crimson
              transition-colors duration-200
              text-balance
            ">
              {post.title}
            </h2>

            <p className="text-sm text-void/55 dark:text-whisper/55 leading-relaxed mb-6">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-3 mt-auto">
              <div className="w-8 h-8 rounded-full bg-crimson/20 flex items-center justify-center text-xs font-bold text-crimson">
                {post.author_name.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-medium text-void dark:text-whisper">{post.author_name}</div>
                {post.author_role && (
                  <div className="text-xs text-void/40 dark:text-whisper/40">{post.author_role}</div>
                )}
              </div>
            </div>
          </div>
        </article>
      </Link>
    )
  }

  if (variant === 'compact') {
    return (
      <Link href={`/blog/${post.slug}`} className="group flex gap-4 items-start">
        <div className="
          shrink-0 w-16 h-16 rounded-xl overflow-hidden
          bg-void/5 dark:bg-whisper/5
          relative
        ">
          {post.cover_image ? (
            <Image src={post.cover_image} alt={post.title} fill className="object-cover" sizes="64px" />
          ) : (
            <div className="w-full h-full flex items-center justify-center"
              style={{ background: `${category?.color ?? '#C0392B'}12` }}>
              <span className="font-display font-bold text-xl opacity-40"
                style={{ color: category?.color ?? '#C0392B' }}>
                {post.title.charAt(0)}
              </span>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="
            text-sm font-medium text-void dark:text-whisper
            group-hover:text-crimson dark:group-hover:text-crimson
            transition-colors duration-150 line-clamp-2 leading-snug mb-1
          ">
            {post.title}
          </h4>
          <span className="text-xs text-void/35 dark:text-whisper/35">
            {post.read_time} min · {formatDate(date!)}
          </span>
        </div>
      </Link>
    )
  }

  // Default card
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article className="
        h-full rounded-2xl overflow-hidden
        border border-void/8 dark:border-whisper/8
        hover:border-void/16 dark:hover:border-whisper/16
        transition-all duration-200
        bg-void/2 dark:bg-whisper/2
        hover:bg-void/4 dark:hover:bg-whisper/4
      ">
        {/* Cover image */}
        <div className="relative aspect-video overflow-hidden bg-void/5 dark:bg-whisper/5">
          {post.cover_image ? (
            <Image
              src={post.cover_image}
              alt={post.cover_alt ?? post.title}
              fill
              className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: `${category?.color ?? '#C0392B'}08` }}
            >
              <span
                className="font-display font-bold text-6xl opacity-15"
                style={{ color: category?.color ?? '#C0392B' }}
              >
                {post.title.charAt(0)}
              </span>
            </div>
          )}

          {category && (
            <div className="absolute top-3 left-3">
              <span
                className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                style={{
                  background: `${category.color}20`,
                  color: category.color,
                  border: `1px solid ${category.color}35`,
                  backdropFilter: 'blur(8px)',
                }}
              >
                {category.name}
              </span>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="flex items-center gap-2 text-xs text-void/35 dark:text-whisper/35 mb-3">
            <span>{formatDate(date!)}</span>
            <span>·</span>
            <span>{post.read_time} min read</span>
          </div>

          <h3 className="
            font-display font-semibold text-lg
            text-void dark:text-whisper
            leading-snug mb-2
            group-hover:text-crimson dark:group-hover:text-crimson
            transition-colors duration-200
            line-clamp-2 text-balance
          ">
            {post.title}
          </h3>

          <p className="text-sm text-void/50 dark:text-whisper/50 leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>
        </div>
      </article>
    </Link>
  )
}
