import { createClient } from '@supabase/supabase-js'

// ─── Database type ─────────────────────────────────────────────
//
// supabase-js v2 infers join types from the Relationships array.
// Without a relationship entry for posts.category_id → categories.id,
// `.select('*, categories(...)')` returns SelectQueryError instead of
// the category row — which is exactly what caused the 4 type errors in
// queries.ts. The Relationships entry below tells the SDK that
// posts.category_id is a FK into categories.id so it can resolve the
// join and type `categories` correctly.
//
// Every table also needs Views, Functions, Enums, CompositeTypes at the
// schema level so supabase-js v2's generic resolution doesn't collapse
// Insert / Update types to `never`.

export type Database = {
  public: {
    Tables: {
      posts: {
        Row: {
          id:           string
          title:        string
          slug:         string
          excerpt:      string
          content:      string
          cover_image:  string | null
          cover_alt:    string | null
          category_id:  string | null
          author_name:  string
          author_avatar: string | null
          author_role:  string | null
          read_time:    number
          featured:     boolean
          published:    boolean
          published_at: string | null
          views:        number
          created_at:   string
          updated_at:   string
        }
        Insert: {
          id?:           string
          title:         string
          slug:          string
          excerpt:       string
          content:       string
          cover_image?:  string | null
          cover_alt?:    string | null
          category_id?:  string | null
          author_name?:  string
          author_avatar?: string | null
          author_role?:  string | null
          read_time?:    number
          featured?:     boolean
          published?:    boolean
          published_at?: string | null
          views?:        number
          created_at?:   string
          updated_at?:   string
        }
        Update: Partial<Database['public']['Tables']['posts']['Insert']>
        // ← This is the key fix: tells supabase-js that category_id is
        //   a FK into categories so `.select('*, categories(...)')` types
        //   correctly instead of returning SelectQueryError.
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
    }
    Views:     Record<string, never>
    Functions: {
      increment_views: {
        Args:    { post_id: string }
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
