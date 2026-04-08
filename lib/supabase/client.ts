import { createClient } from '@supabase/supabase-js'

// ─── Database type ─────────────────────────────────────────────
// supabase-js v2 requires Views, Functions, Enums, CompositeTypes
// at schema level and Relationships + Update at table level.
// Without these the generic resolution collapses every Insert/Update
// type to `never`, breaking all insert/upsert/rpc calls.

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
          author_avatar:string | null
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
          id?:          string
          title:        string
          slug:         string
          excerpt:      string
          content:      string
          cover_image?: string | null
          cover_alt?:   string | null
          category_id?: string | null
          author_name?: string
          author_avatar?:string | null
          author_role?: string | null
          read_time?:   number
          featured?:    boolean
          published?:   boolean
          published_at?:string | null
          views?:       number
          created_at?:  string
          updated_at?:  string
        }
        Update: Partial<Database['public']['Tables']['posts']['Insert']>
        Relationships: []
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
          id?:        string
          name?:      string | null
          email?:     string | null
          message?:   string | null
          context?:   string | null
          channel?:   string
          status?:    string
          created_at?:string
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
