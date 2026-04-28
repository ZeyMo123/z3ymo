import { createClient } from '@supabase/supabase-js'

// ─── Database type ─────────────────────────────────────────────

export type Database = {
  public: {
    Tables: {

      // ── posts ───────────────────────────────────────────────
      posts: {
        Row: {
          id:            string
          title:         string
          slug:          string
          excerpt:       string
          content:       string
          cover_image:   string | null
          cover_alt:     string | null
          category_id:   string | null
          author_name:   string
          author_avatar: string | null
          author_role:   string | null
          read_time:     number
          featured:      boolean
          published:     boolean
          published_at:  string | null
          views:         number
          created_at:    string
          updated_at:    string
          // Added via ALTER TABLE
          key_takeaways:       string[]
          tags:                string[]
          cta_type:            string | null
          cta_custom_headline: string | null
          cta_custom_body:     string | null
        }
        Insert: {
          id?:            string
          title:          string
          slug:           string
          excerpt:        string
          content:        string
          cover_image?:   string | null
          cover_alt?:     string | null
          category_id?:   string | null
          author_name?:   string
          author_avatar?: string | null
          author_role?:   string | null
          read_time?:     number
          featured?:      boolean
          published?:     boolean
          published_at?:  string | null
          views?:         number
          created_at?:    string
          updated_at?:    string
          key_takeaways?:       string[]
          tags?:                string[]
          cta_type?:            string | null
          cta_custom_headline?: string | null
          cta_custom_body?:     string | null
        }
        Update: Partial<Database['public']['Tables']['posts']['Insert']>
        Relationships: [
          {
            foreignKeyName:     'posts_category_id_fkey'
            columns:            ['category_id']
            isOneToOne:         false
            referencedRelation: 'categories'
            referencedColumns:  ['id']
          },
        ]
      }

      // ── categories ──────────────────────────────────────────
      categories: {
        Row: {
          id:          string
          name:        string
          slug:        string
          color:       string
          description: string | null
          created_at:  string
        }
        Insert: {
          id?:          string
          name:         string
          slug:         string
          color?:       string
          description?: string | null
          created_at?:  string
        }
        Update: Partial<Database['public']['Tables']['categories']['Insert']>
        Relationships: []
      }

      // ── content_items ────────────────────────────────────────
      // Guides, case studies, and docs all live in this table.
      // Uses `status` (not `published: boolean`) matching the DB CHECK.
      // `pdf_available` is a boolean column here — there is NO separate
      // pdf_access table.
      content_items: {
        Row: {
          id:           string
          type:         'guide' | 'case-study' | 'doc'
          title:        string
          slug:         string
          excerpt:      string | null
          content:      string
          status:       'draft' | 'published' | 'archived'
          author_name:  string
          category_id:  string | null
          cover_image:  string | null
          cover_alt:    string | null
          read_time:    number
          featured:     boolean
          published_at: string | null
          views:        number
          created_at:   string
          updated_at:   string
          // Added via ALTER TABLE
          key_takeaways:       string[]
          tags:                string[]
          cta_type:            string | null
          cta_custom_headline: string | null
          cta_custom_body:     string | null
          pdf_available:       boolean
        }
        Insert: {
          id?:          string
          type:         'guide' | 'case-study' | 'doc'
          title:        string
          slug:         string
          excerpt?:     string | null
          content?:     string
          status?:      'draft' | 'published' | 'archived'
          author_name?: string
          category_id?: string | null
          cover_image?: string | null
          cover_alt?:   string | null
          read_time?:   number
          featured?:    boolean
          published_at?: string | null
          views?:       number
          created_at?:  string
          updated_at?:  string
          key_takeaways?:       string[]
          tags?:                string[]
          cta_type?:            string | null
          cta_custom_headline?: string | null
          cta_custom_body?:     string | null
          pdf_available?:       boolean
        }
        Update: Partial<Database['public']['Tables']['content_items']['Insert']>
        Relationships: [
          {
            foreignKeyName:     'content_items_category_id_fkey'
            columns:            ['category_id']
            isOneToOne:         false
            referencedRelation: 'categories'
            referencedColumns:  ['id']
          },
        ]
      }

      // ── subscribers ─────────────────────────────────────────
      subscribers: {
        Row: {
          id:         string
          email:      string
          confirmed:  boolean
          source:     string | null
          created_at: string
        }
        Insert: {
          id?:         string
          email:       string
          confirmed?:  boolean
          source?:     string | null
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['subscribers']['Insert']>
        Relationships: []
      }

      // ── contacts ────────────────────────────────────────────
      contacts: {
        Row: {
          id:         string
          name:       string | null
          email:      string | null
          message:    string | null
          context:    string | null
          channel:    string
          status:     string
          created_at: string
        }
        Insert: {
          id?:         string
          name?:       string | null
          email?:      string | null
          message?:    string | null
          context?:    string | null
          channel?:    string
          status?:     string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['contacts']['Insert']>
        Relationships: []
      }

      // ── waitlist ────────────────────────────────────────────
      waitlist: {
        Row: {
          id:         string
          email:      string
          product:    string
          name:       string | null
          created_at: string
        }
        Insert: {
          id?:         string
          email:       string
          product:     string
          name?:       string | null
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['waitlist']['Insert']>
        Relationships: []
      }

      // ── consultation_slots ──────────────────────────────────
      consultation_slots: {
        Row: {
          id:         string
          date:       string
          start_time: string
          end_time:   string
          timezone:   string
          is_booked:  boolean
          booking_id: string | null
          created_at: string
        }
        Insert: {
          id?:         string
          date:        string
          start_time:  string
          end_time:    string
          timezone?:   string
          is_booked?:  boolean
          booking_id?: string | null
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['consultation_slots']['Insert']>
        Relationships: []
      }

      // ── consultation_bookings ───────────────────────────────
      consultation_bookings: {
        Row: {
          id:              string
          business_type:   string
          build_goal:      string
          challenges:      string
          business_stage:  string
          budget:          string
          launch_timeline: string
          full_name:       string
          email:           string
          whatsapp:        string
          slot_id:         string | null
          status:          string
          created_at:      string
          notes:           string | null
        }
        Insert: {
          id?:              string
          business_type:    string
          build_goal:       string
          challenges:       string
          business_stage:   string
          budget:           string
          launch_timeline:  string
          full_name:        string
          email:            string
          whatsapp:         string
          slot_id?:         string | null
          status?:          string
          created_at?:      string
          notes?:           string | null
        }
        Update: Partial<Database['public']['Tables']['consultation_bookings']['Insert']>
        Relationships: []
      }

    }   // ← Tables closes here — all tables are inside
    Views:     Record<string, never>
    Functions: {
      increment_post_views: {
        Args:    { post_id: string }
        Returns: undefined
      }
      increment_content_views: {
        Args:    { item_id: string }
        Returns: undefined
      }
      book_consultation_slot: {
        Args:    { p_slot_id: string; p_booking_id: string }
        Returns: undefined
      }
    }
    Enums:          Record<string, never>
    CompositeTypes: Record<string, never>
  }
}

// ─── Derived types ─────────────────────────────────────────────

export type Post = Database['public']['Tables']['posts']['Row'] & {
  categories?: Database['public']['Tables']['categories']['Row'] | null
}

export type Category = Database['public']['Tables']['categories']['Row']

export type ContentItem = Database['public']['Tables']['content_items']['Row'] & {
  categories?: Database['public']['Tables']['categories']['Row'] | null
}

export type ContentType = 'guide' | 'case-study' | 'doc'

// ─── Clients ───────────────────────────────────────────────────

/** Browser client — for client components */
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

/** Server client — for server components and API reads */
export function createServerClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } },
  )
}

/** Admin client — for write operations that bypass RLS */
export function createAdminClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  )
}
