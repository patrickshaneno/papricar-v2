export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          user_id: string
          name: string
          role: 'user' | 'dealer'
          phone: string | null
          company_name: string | null
          contact_person: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          name: string
          role: 'user' | 'dealer'
          phone?: string | null
          company_name?: string | null
          contact_person?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          name?: string
          role?: 'user' | 'dealer'
          phone?: string | null
          company_name?: string | null
          contact_person?: string | null
          created_at?: string
          updated_at?: string
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
  }
} 