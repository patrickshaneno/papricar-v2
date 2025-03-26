import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import VehicleForm from '@/components/admin/VehicleForm'

export default async function NewVehiclePage() {
  const supabase = createServerComponentClient({ cookies })
  
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single()

  if (profile?.role !== 'dealer') {
    redirect('/')
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Neues Fahrzeug</h1>
        <p className="text-gray-600">Fügen Sie ein neues Fahrzeug zu Ihrem Bestand hinzu</p>
      </div>

      <div className="bg-white shadow rounded-xl overflow-hidden">
        <div className="p-6">
          <VehicleForm />
        </div>
      </div>
    </div>
  )
} 