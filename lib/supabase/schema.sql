-- ═══════════════════════════════════════════════
-- Z3ymo — Supabase Database Schema
-- Run this in the Supabase SQL Editor
-- ═══════════════════════════════════════════════

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─── Categories ───────────────────────────────
create table public.categories (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null unique,
  slug        text not null unique,
  color       text not null default '#C0392B',
  description text,
  created_at  timestamptz default now()
);

-- Seed categories
insert into public.categories (name, slug, color, description) values
  ('AI & Machine Learning', 'ai',             '#C0392B', 'Artificial intelligence, LLMs, AI agents and automation'),
  ('Software Development',  'software-dev',   '#1B998B', 'Web, mobile, and backend development guides'),
  ('Cybersecurity',         'cybersecurity',  '#C9A84C', 'Security practices, threats and protection'),
  ('Business Tech',         'business-tech',  '#C0392B', 'Technology for business growth in Africa'),
  ('Social Media',          'social-media',   '#1B998B', 'Social media strategy and growth'),
  ('Modern Technologies',   'modern-tech',    '#C9A84C', 'Emerging tech trends and innovations');

-- ─── Blog Posts ───────────────────────────────
create table public.posts (
  id            uuid primary key default uuid_generate_v4(),
  title         text not null,
  slug          text not null unique,
  excerpt       text not null,
  content       text not null,            -- MDX content
  cover_image   text,                     -- URL
  cover_alt     text,
  category_id   uuid references public.categories(id) on delete set null,
  author_name   text not null default 'Z3ymo Team',
  author_avatar text,
  author_role   text default 'Editor',
  read_time     integer not null default 5, -- minutes
  featured      boolean default false,
  published     boolean default false,
  published_at  timestamptz,
  views         integer default 0,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger posts_updated_at
  before update on public.posts
  for each row execute function update_updated_at();

-- ─── Post Tags ────────────────────────────────
create table public.tags (
  id   uuid primary key default uuid_generate_v4(),
  name text not null unique,
  slug text not null unique
);

create table public.post_tags (
  post_id uuid references public.posts(id) on delete cascade,
  tag_id  uuid references public.tags(id)  on delete cascade,
  primary key (post_id, tag_id)
);

-- ─── Newsletter Subscribers ───────────────────
create table public.subscribers (
  id         uuid primary key default uuid_generate_v4(),
  email      text not null unique,
  confirmed  boolean default false,
  source     text default 'website',
  created_at timestamptz default now()
);

-- ─── Contact Enquiries ────────────────────────
create table public.contacts (
  id         uuid primary key default uuid_generate_v4(),
  name       text,
  email      text,
  message    text,
  context    text,                  -- which product/service they asked about
  channel    text default 'form',   -- form | whatsapp | email | phone
  status     text default 'new',   -- new | read | replied | closed
  created_at timestamptz default now()
);

-- ─── Product Waitlist ─────────────────────────
create table public.waitlist (
  id         uuid primary key default uuid_generate_v4(),
  email      text not null,
  product    text not null,         -- pulse | ebox | novel | salons
  name       text,
  created_at timestamptz default now(),
  unique(email, product)
);

-- ─── Row Level Security ───────────────────────
alter table public.categories  enable row level security;
alter table public.posts        enable row level security;
alter table public.tags         enable row level security;
alter table public.post_tags    enable row level security;
alter table public.subscribers  enable row level security;
alter table public.contacts     enable row level security;
alter table public.waitlist     enable row level security;

-- Public can READ published posts and categories
create policy "Public read categories"
  on public.categories for select using (true);

create policy "Public read published posts"
  on public.posts for select
  using (published = true);

create policy "Public read tags"
  on public.tags for select using (true);

create policy "Public read post_tags"
  on public.post_tags for select using (true);

-- Public can INSERT subscribers, contacts, waitlist
create policy "Public subscribe"
  on public.subscribers for insert
  with check (true);

create policy "Public contact"
  on public.contacts for insert
  with check (true);

create policy "Public join waitlist"
  on public.waitlist for insert
  with check (true);

-- ─── Indexes for performance ──────────────────
create index posts_slug_idx       on public.posts(slug);
create index posts_category_idx   on public.posts(category_id);
create index posts_published_idx  on public.posts(published, published_at desc);
create index posts_featured_idx   on public.posts(featured) where featured = true;
create index subscribers_email_idx on public.subscribers(email);

-- ─── Sample Posts (for development) ──────────
-- Uncomment and run to seed sample data

/*
insert into public.posts
  (title, slug, excerpt, content, cover_image, category_id, author_name, author_role, read_time, featured, published, published_at)
values (
  'How AI agents are transforming customer service for African businesses',
  'ai-agents-africa-customer-service',
  'WhatsApp is the default OS of African business. Here''s how AI agents are automating it and what it means for your bottom line.',
  '## The WhatsApp revolution

African businesses live on WhatsApp. It''s not a channel — it''s the operating system of commerce here...

> "The businesses that automate WhatsApp first will win the next decade of African commerce."

![A business owner checking WhatsApp messages on their phone](/images/blog/whatsapp-business.jpg)

## What AI agents actually do

...',
  '/images/blog/ai-agents-cover.jpg',
  (select id from public.categories where slug = 'ai'),
  'Z3ymo Team',
  'Founder',
  5,
  true,
  true,
  now() - interval '2 days'
);
*/
