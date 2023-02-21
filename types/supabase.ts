export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          available_credits: number | null
          avatar_url: string | null
          full_name: string | null
          id: string
          total_purchased_credits: number | null
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          available_credits?: number | null
          avatar_url?: string | null
          full_name?: string | null
          id: string
          total_purchased_credits?: number | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          available_credits?: number | null
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          total_purchased_credits?: number | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
