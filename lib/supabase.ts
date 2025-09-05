import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for contact messages
export interface ContactMessage {
  id?: number
  name: string
  email: string
  phone: string
  company: string
  service: string
  message: string
  created_at?: string
  status?: 'new' | 'read' | 'replied'
}
