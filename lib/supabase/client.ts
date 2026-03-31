import { createClient } from '@supabase/supabase-js'

export type Database = {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string
          content: string
          cover_image: string | null
          cover_alt: string | null
          category_id: string | null
          author_name: string
          author_avatar: string | null
          author_role: string | null
          read_time: number
          featured: boolean
          published: boolean
          published_at: string | null
          views: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['posts']['Row'], 'id' | 'created_at' | 'updated_at' | 'views'>
        Update: Partial<Database['public']['Tables']['posts']['Insert']>
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          color: string
          description: string | null
          created_at: string
        }
      }
      subscribers: {
        Row: {
          id: string
          email: string
          confirmed: boolean
          source: string | null
          created_at: string
        }
        Insert: { email: string; source?: string }
      }
      contacts: {
        Row: {
          id: string
          name: string | null
          email: string | null
          message: string | null
          context: string | null
          channel: string
          status: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['contacts']['Row'], 'id' | 'created_at' | 'status'>
      }
      waitlist: {
        Row: {
          id: string
          email: string
          product: string
          name: string | null
          created_at: string
        }
        Insert: { email: string; product: string; name?: string }
      }
    }
  }
}

// ─── Post with category joined ─────────────────
export type Post = Database['public']['Tables']['posts']['Row'] & {
  categories?: Database['public']['Tables']['categories']['Row'] | null
}

export type Category = Database['public']['Tables']['categories']['Row']

// ─── Browser client (for client components) ────
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

// ─── Server client (for server components / API routes) ────
export function createServerClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: { persistSession: false },
    }
  )
}

// ─── Admin client (for write operations in API routes) ────
export function createAdminClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: { persistSession: false, autoRefreshToken: false },
    }
  )
}
