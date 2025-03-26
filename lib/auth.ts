import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/types/supabase'
import { useState, useEffect } from 'react'

export type UserRole = 'user' | 'dealer'

export interface UserProfile {
  id: string
  email: string
  name: string
  role: UserRole
  phone?: string
}

export interface DealerProfile extends UserProfile {
  company_name: string
  contact_person: string
}

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export { supabase }

export async function signUp(
  email: string,
  password: string,
  profile: Partial<UserProfile>
) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: profile.role || 'user',
        name: profile.name,
        phone: profile.phone,
      },
    },
  })

  if (error) throw error
  return data
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error) throw error
  if (!user) return null

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (profileError) throw profileError

  return {
    ...user,
    ...profile,
  }
}

export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession()
  if (error) throw error
  return session
}

export function useAuth() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return { user, loading }
} 