import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lhrtlvnpslkjjqcofryx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxocnRsdm5wc2xrampxY29mcnl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2MTQ5NjksImV4cCI6MjA3MjE5MDk2OX0.5QOfkT0OdSSNE9H-sz24xiPY9kEvawLw3ZILqF4AzEk'

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
