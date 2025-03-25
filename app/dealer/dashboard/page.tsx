'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { Vehicle, VehicleStatus } from '@/types/vehicle'
import { Car, Download, Star, MessageSquare, CheckCircle, Percent } from 'lucide-react'

interface DashboardStats {
  totalVehicles: number
  activeVehicles: number
  savedVehicles: number
  newInquiries: number
  soldVehicles: number
  averageDiscount: number
}

interface Inquiry {
  id: string
  customer_name: string
  vehicle_title: string
  created_at: string
  vehicle_id: string
}

export default function DealerDashboard() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (userError || !user) {
          router.push('/login')
          return
        }

        // Fetch vehicles
        const { data: vehiclesData, error: vehiclesError } = await supabase
          .from('vehicles')
          .select('*')
          .eq('dealer_id', user.id)
          .order('created_at', { ascending: false })

        if (vehiclesError) throw vehiclesError

        // Calculate stats
        const activeVehicles = vehiclesData.filter(v => v.status === 'active')
        const soldVehicles = vehiclesData.filter(v => v.status === 'sold')
        
        const stats: DashboardStats = {
          totalVehicles: vehiclesData.length,
          activeVehicles: activeVehicles.length,
          savedVehicles: 0, // TODO: Implement saved vehicles count
          newInquiries: 0, // TODO: Implement new inquiries count
          soldVehicles: soldVehicles.length,
          averageDiscount: activeVehicles.reduce((acc, v) => acc + (v.cash_discount || 0), 0) / activeVehicles.length || 0
        }

        // Fetch recent inquiries
        const { data: inquiriesData, error: inquiriesError } = await supabase
          .from('inquiries')
          .select('*')
          .eq('interest_confirmed', true)
          .eq('dealer_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5)

        if (inquiriesError) throw inquiriesError

        setVehicles(vehiclesData)
        setStats(stats)
        setInquiries(inquiriesData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten')
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [supabase, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-purple-500 border-t-transparent"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Fehler: {error}</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <Car className="h-8 w-8 text-purple-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Gesamtfahrzeuge</p>
              <p className="text-2xl font-semibold">{stats?.totalVehicles || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <Star className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Aktive Fahrzeuge</p>
              <p className="text-2xl font-semibold">{stats?.activeVehicles || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <Download className="h-8 w-8 text-orange-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Gespeicherte Fahrzeuge</p>
              <p className="text-2xl font-semibold">{stats?.savedVehicles || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <MessageSquare className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Neue Anfragen (7 Tage)</p>
              <p className="text-2xl font-semibold">{stats?.newInquiries || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Verkaufte Fahrzeuge</p>
              <p className="text-2xl font-semibold">{stats?.soldVehicles || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <Percent className="h-8 w-8 text-purple-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Durchschnittlicher Rabatt</p>
              <p className="text-2xl font-semibold">{stats?.averageDiscount.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Vehicle Table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Fahrzeugbestand</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fahrzeug
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Art
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Preis
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Erstzulassung
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Letzte Änderung
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aktionen
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {vehicles.map((vehicle) => (
                    <tr key={vehicle.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{vehicle.title}</div>
                        <div className="text-sm text-gray-500">{vehicle.brand} {vehicle.model}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          vehicle.status === 'active' ? 'bg-green-100 text-green-800' :
                          vehicle.status === 'sold' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {vehicle.status === 'active' ? 'Aktiv' :
                           vehicle.status === 'sold' ? 'Verkauft' : 'Entwurf'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {vehicle.type === 'new' ? 'Neuwagen' :
                         vehicle.type === 'stock' ? 'Bestand' :
                         vehicle.type === 'dayregistration' ? 'Tageszulassung' : 'Jahreswagen'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Intl.NumberFormat('de-DE', {
                          style: 'currency',
                          currency: 'EUR'
                        }).format(vehicle.price)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {vehicle.registration_date ? new Date(vehicle.registration_date).toLocaleDateString('de-DE') : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(vehicle.updated_at).toLocaleDateString('de-DE')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => router.push(`/dealer/vehicles/${vehicle.id}/edit`)}
                          className="text-purple-600 hover:text-purple-900"
                        >
                          Bearbeiten
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Letzte Anfragen</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {inquiries.map((inquiry) => (
                  <div key={inquiry.id} className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{inquiry.customer_name}</p>
                      <p className="text-sm text-gray-500">{inquiry.vehicle_title}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(inquiry.created_at).toLocaleDateString('de-DE')}
                      </p>
                    </div>
                    <button
                      onClick={() => router.push(`/chat/${inquiry.vehicle_id}`)}
                      className="ml-4 text-purple-600 hover:text-purple-900"
                    >
                      Zum Chat
                    </button>
                  </div>
                ))}
                {inquiries.length === 0 && (
                  <p className="text-sm text-gray-500">Keine Anfragen vorhanden</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 