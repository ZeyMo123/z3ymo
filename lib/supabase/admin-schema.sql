-- ─────────────────────────────────────────────────────────────────
-- Z3ymo Admin — Additional Schema
-- Run AFTER the main schema.sql
-- ─────────────────────────────────────────────────────────────────

-- Content items (guides, docs, case-studies)
CREATE TABLE IF NOT EXISTS public.content_items (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type         text NOT NULL CHECK (type IN ('guide', 'doc', 'case-study')),
  title        text NOT NULL,
  slug         text NOT NULL,
  excerpt      text,
  content      text NOT NULL DEFAULT '',   -- MDX
  status       text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  author_name  text NOT NULL DEFAULT 'Z3ymo Team',
  category     text,
  read_time    integer DEFAULT 5,
  views        integer DEFAULT 0,
  featured     boolean DEFAULT false,
  published_at timestamptz,
  created_at   timestamptz DEFAULT now(),
  updated_at   timestamptz DEFAULT now(),
  UNIQUE(type, slug)
);

-- Auto-update updated_at
CREATE TRIGGER content_items_updated_at
  BEFORE UPDATE ON public.content_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Add missing column to posts if needed
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS
  content_type text NOT NULL DEFAULT 'blog' CHECK (content_type IN ('blog', 'guide', 'doc', 'case-study'));

-- ─── RLS ──────────────────────────────────────────────────────────
ALTER TABLE public.content_items ENABLE ROW LEVEL SECURITY;

-- Public can read published content
CREATE POLICY "Public reads published content"
  ON public.content_items FOR SELECT USING (status = 'published');

-- Service role can do everything (admin uses service key)
CREATE POLICY "Service role full access on content_items"
  ON public.content_items FOR ALL USING (auth.role() = 'service_role');

-- Same for posts
CREATE POLICY "Service role full access on posts"
  ON public.posts FOR ALL USING (auth.role() = 'service_role');

-- ─── Dashboard stats view ──────────────────────────────────────────
CREATE OR REPLACE VIEW public.admin_stats AS
SELECT
  (SELECT COUNT(*) FROM public.posts WHERE published = true)                  AS published_posts,
  (SELECT COUNT(*) FROM public.posts WHERE published = false)                 AS draft_posts,
  (SELECT COUNT(*) FROM public.content_items WHERE status = 'published')      AS published_content,
  (SELECT COUNT(*) FROM public.consultation_bookings WHERE status = 'confirmed') AS active_bookings,
  (SELECT COUNT(*) FROM public.consultation_bookings
   WHERE created_at >= NOW() - INTERVAL '7 days')                             AS new_bookings_7d,
  (SELECT COUNT(*) FROM public.waitlist)                                       AS waitlist_total,
  (SELECT COUNT(*) FROM public.waitlist
   WHERE created_at >= NOW() - INTERVAL '7 days')                             AS waitlist_7d,
  (SELECT COUNT(*) FROM public.subscribers WHERE confirmed = true)             AS confirmed_subscribers,
  (SELECT COUNT(*) FROM public.contacts
   WHERE created_at >= NOW() - INTERVAL '7 days')                             AS new_contacts_7d,
  (SELECT COALESCE(SUM(views), 0) FROM public.posts)                          AS total_post_views;
