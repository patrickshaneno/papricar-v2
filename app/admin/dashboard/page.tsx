import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Sidebar from '@/components/admin/Sidebar'
import StatsCard from '@/components/admin/StatsCard'
import {
  TruckIcon,
  ChatBubbleLeftRightIcon,
  BookmarkIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'

export default async function AdminDashboard() {
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

  // Hole KPI-Daten
  const { count: vehiclesCount } = await supabase
    .from('vehicles')
    .select('*', { count: 'exact', head: true })

  const { count: savedVehiclesCount } = await supabase
    .from('saved_vehicles')
    .select('*', { count: 'exact', head: true })

  const { count: chatMessagesCount } = await supabase
    .from('chat_messages')
    .select('*', { count: 'exact', head: true })

  const { count: usersCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      
      <main className="flex-1 ml-64 px-6 py-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Willkommen im Admin-Bereich</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Fahrzeuge"
            value={vehiclesCount || 0}
            icon={<TruckIcon className="w-6 h-6 text-white" />}
            color="bg-blue-500"
          />
          <StatsCard
            title="Gespeicherte Fahrzeuge"
            value={savedVehiclesCount || 0}
            icon={<BookmarkIcon className="w-6 h-6 text-white" />}
            color="bg-green-500"
          />
          <StatsCard
            title="Chat-Nachrichten"
            value={chatMessagesCount || 0}
            icon={<ChatBubbleLeftRightIcon className="w-6 h-6 text-white" />}
            color="bg-purple-500"
          />
          <StatsCard
            title="Benutzer"
            value={usersCount || 0}
            icon={<UserGroupIcon className="w-6 h-6 text-white" />}
            color="bg-orange-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Hier können weitere Dashboard-Widgets hinzugefügt werden */}
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Aktuelle Aktivitäten</h2>
            <p className="text-gray-600">Hier werden die neuesten Aktivitäten angezeigt...</p>
          </div>
          
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Statistiken</h2>
            <p className="text-gray-600">Hier werden detaillierte Statistiken angezeigt...</p>
          </div>
        </div>
      </main>
    </div>
  )
} 