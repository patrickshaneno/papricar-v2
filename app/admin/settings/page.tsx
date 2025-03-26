import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import SettingsForm from '@/components/admin/SettingsForm'

export default async function SettingsPage() {
  const supabase = createServerComponentClient({ cookies })
  
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single()

  if (profile?.role !== 'dealer') {
    redirect('/')
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Einstellungen</h1>
        <p className="text-gray-600">Verwalten Sie Ihre Händler-Einstellungen</p>
      </div>

      <div className="bg-white shadow rounded-xl overflow-hidden">
        <div className="p-6">
          <SettingsForm profile={profile} email={session.user.email || ''} />
        </div>
      </div>
    </div>
  )
} 