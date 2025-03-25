import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Message {
  id: string
  vehicle_id: string
  sender_id: string
  recipient_id: string
  content: string
  created_at: string
  is_read: boolean
}

export interface ChatUser {
  id: string
  name: string
  role: 'user' | 'dealer'
}

export interface CannedMessage {
  id: string
  dealer_id: string
  title: string
  content: string
  created_at: string
  updated_at: string
}

export interface Inquiry {
  id: string
  dealer_id: string
  vehicle_id: string
  vehicle_title: string
  customer_name: string
  customer_email: string
  customer_phone: string
  kaufinteresse: 'Leasing' | 'Finanzierung' | 'Barkauf' | 'Probefahrt'
  inzahlungnahme: boolean
  interest_confirmed: boolean
  created_at: string
  is_read: boolean
}

export async function getDealerInquiries(dealerId: string) {
  const { data, error } = await supabase
    .from('inquiries')
    .select('*')
    .eq('dealer_id', dealerId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Inquiry[]
}

export async function markInquiryAsRead(inquiryId: string) {
  const { error } = await supabase
    .from('inquiries')
    .update({ is_read: true })
    .eq('id', inquiryId)

  if (error) throw error
} 