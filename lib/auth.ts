import { createClient } from '@supabase/supabase-js'
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

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

export async function signUp(
  email: string,
  password: string,
  profile: Partial<UserProfile>
) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: profile.role,
      },
    },
  })

  if (authError) throw authError
  if (!authData.user) throw new Error('No user data returned')

  // Erstelle Profil in der profiles Tabelle
  const { error: profileError } = await supabase
    .from('profiles')
    .insert([
      {
        user_id: authData.user.id,
        name: profile.name,
        role: profile.role,
        phone: profile.phone,
        ...(profile.role === 'dealer' && {
          company_name: (profile as DealerProfile).company_name,
          contact_person: (profile as DealerProfile).contact_person,
        }),
      },
    ])

  if (profileError) throw profileError

  return authData
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
    .eq('user_id', user.id)
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
      .finally(() => setLoading(false))

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const user = await getCurrentUser()
          setUser(user)
        } else {
          setUser(null)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return { user, loading }
} 