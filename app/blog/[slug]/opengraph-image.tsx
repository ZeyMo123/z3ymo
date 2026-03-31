import { ImageResponse } from 'next/og'
import { getPostBySlug } from '@/lib/supabase/queries'

export const runtime = 'edge'
export const size    = { width: 1200, height: 630 }
export const contentType = 'image/png'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function BlogOgImage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  const title    = post?.title    ?? 'Z3ymo Blog'
  const excerpt  = post?.excerpt  ?? 'Insights on AI, software development, and tech for Africa.'
  const author   = post?.author_name ?? 'Z3ymo Team'
  const readTime = post?.read_time   ?? 5
  const category = (post as any)?.categories

  const categoryColor = category?.color ?? '#C0392B'
  const categoryName  = category?.name  ?? 'Z3ymo Blog'

  // Truncate long titles for layout
  const displayTitle = title.length > 70
    ? title.slice(0, 67) + '...'
    : title
  const displayExcerpt = excerpt.length > 120
    ? excerpt.slice(0, 117) + '...'
    : excerpt

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#0A0A0F',
          padding: '60px 72px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ambient bg glow based on category color */}
        <div
          style={{
            position: 'absolute',
            top: -80,
            right: -80,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${categoryColor}20 0%, transparent 70%)`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -100,
            left: -60,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(27,153,139,0.12) 0%, transparent 70%)',
          }}
        />

        {/* Subtle grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(240,238,248,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(240,238,248,0.015) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Header — logo + site name */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 48,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <span
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: '#F0EEF8',
              letterSpacing: '-0.03em',
            }}
          >
            Z3ymo
          </span>

          {/* Category pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: `${categoryColor}18`,
              border: `1px solid ${categoryColor}40`,
              borderRadius: 100,
              padding: '8px 18px',
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: categoryColor,
              }}
            />
            <span
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: categoryColor,
                letterSpacing: '0.06em',
              }}
            >
              {categoryName.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Main content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Title */}
          <div
            style={{
              fontSize: displayTitle.length > 50 ? 52 : 62,
              fontWeight: 800,
              color: '#F0EEF8',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              marginBottom: 20,
            }}
          >
            {displayTitle}
          </div>

          {/* Excerpt */}
          <div
            style={{
              fontSize: 20,
              color: 'rgba(240,238,248,0.45)',
              lineHeight: 1.5,
              fontWeight: 400,
            }}
          >
            {displayExcerpt}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 28,
            borderTop: '1px solid rgba(240,238,248,0.08)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Author */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {/* Avatar circle */}
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: `${categoryColor}25`,
                border: `2px solid ${categoryColor}40`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                fontWeight: 700,
                color: categoryColor,
              }}
            >
              {author.charAt(0)}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: '#F0EEF8' }}>
                {author}
              </span>
              <span style={{ fontSize: 13, color: 'rgba(240,238,248,0.35)' }}>
                z3ymo.com/blog
              </span>
            </div>
          </div>

          {/* Read time */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(240,238,248,0.05)',
              border: '1px solid rgba(240,238,248,0.1)',
              borderRadius: 100,
              padding: '8px 18px',
            }}
          >
            <span style={{ fontSize: 14, color: 'rgba(240,238,248,0.5)' }}>
              {readTime} min read
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
