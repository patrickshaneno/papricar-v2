import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'
import { TEST_ACCOUNTS, getRedirectPath } from './test-accounts'

export const supabase = createClientComponentClient<Database>()

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

export const redirectToLogin = () => {
  window.location.href = '/login'
}

export const handleTestLogin = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    // Prüfe, ob es sich um ein Testkonto handelt
    const isTestUser = Object.values(TEST_ACCOUNTS).some(
      account => account.email === email
    )

    if (isTestUser) {
      const testAccount = Object.values(TEST_ACCOUNTS).find(
        account => account.email === email
      )
      
      if (testAccount) {
        // Setze die Rolle in der profiles-Tabelle
        await supabase
          .from('profiles')
          .upsert({
            id: data.user.id,
            role: testAccount.role,
            updated_at: new Date().toISOString(),
          })

        // Weiterleitung basierend auf der Rolle
        window.location.href = getRedirectPath(testAccount.role)
        return
      }
    }

    // Standard-Weiterleitung für normale Benutzer
    window.location.href = '/vehicles'
  } catch (error) {
    console.error('Login error:', error)
    throw error
  }
} 