'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { Users, Building2, Car, Mail } from 'lucide-react'
import UsersTable from '@/app/components/admin/UsersTable'
import DealersTable from '@/app/components/admin/DealersTable'
import VehiclesTable from '@/app/components/admin/VehiclesTable'
import LeadsTable from '@/app/components/admin/LeadsTable'

interface KPI {
  label: string
  value: number
  icon: any
  color: string
}

interface User {
  id: string
  email: string
  role: string
  last_login: string
  is_active: boolean
}

interface Dealer {
  id: string
  company_name: string
  contact_person: string
  vehicle_count: number
  lead_count: number
  is_active: boolean
}

interface Vehicle {
  id: string
  brand: string
  model: string
  price: number
  status: string
  created_at: string
  dealer_id: string
  vehicle_type: string
}

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  company: string
  status: string
  created_at: string
  vehicle_id: string
  vehicle_brand: string
  vehicle_model: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [kpis, setKpis] = useState<KPI[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [dealers, setDealers] = useState<Dealer[]>([])
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [leads, setLeads] = useState<Lead[]>([])

  useEffect(() => {
    checkAdminAccess()
    fetchDashboardData()
  }, [])

  const checkAdminAccess = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      router.push('/')
      return
    }

    const { data: user } = await supabase
      .from('users')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (user?.role !== 'admin') {
      router.push('/')
      return
    }
  }

  const fetchDashboardData = async () => {
    try {
      // KPIs abrufen
      const [
        { count: totalUsers },
        { count: totalDealers },
        { count: totalVehicles },
        { count: activeVehicles },
        { count: newInquiries },
        { count: qualifiedLeads }
      ] = await Promise.all([
        supabase.from('users').select('*', { count: 'exact', head: true }),
        supabase.from('dealers').select('*', { count: 'exact', head: true }),
        supabase.from('vehicles').select('*', { count: 'exact', head: true }),
        supabase.from('vehicles').select('*', { count: 'exact', head: true }).eq('status', 'active'),
        supabase.from('leads').select('*', { count: 'exact', head: true }).gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
        supabase.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'qualified')
      ])

      setKpis([
        {
          label: 'Benutzer',
          value: totalUsers || 0,
          icon: Users,
          color: 'bg-blue-500'
        },
        {
          label: 'Händler',
          value: totalDealers || 0,
          icon: Building2,
          color: 'bg-green-500'
        },
        {
          label: 'Fahrzeuge',
          value: totalVehicles || 0,
          icon: Car,
          color: 'bg-purple-500'
        },
        {
          label: 'Aktive Fahrzeuge',
          value: activeVehicles || 0,
          icon: Car,
          color: 'bg-yellow-500'
        },
        {
          label: 'Neue Anfragen (7 Tage)',
          value: newInquiries || 0,
          icon: Mail,
          color: 'bg-red-500'
        },
        {
          label: 'Qualifizierte Leads',
          value: qualifiedLeads || 0,
          icon: Mail,
          color: 'bg-indigo-500'
        }
      ])

      // Benutzer abrufen
      const { data: usersData } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })
      
      setUsers(usersData || [])

      // Händler abrufen
      const { data: dealersData } = await supabase
        .from('dealers')
        .select('*')
        .order('created_at', { ascending: false })
      
      setDealers(dealersData || [])

      // Fahrzeuge abrufen
      const { data: vehiclesData } = await supabase
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false })
      
      setVehicles(vehiclesData || [])

      // Leads abrufen
      const { data: leadsData } = await supabase
        .from('leads')
        .select('*, vehicles(brand, model)')
        .order('created_at', { ascending: false })
      
      setLeads(leadsData?.map(lead => ({
        ...lead,
        vehicle_brand: lead.vehicles.brand,
        vehicle_model: lead.vehicles.model
      })) || [])

    } catch (error) {
      console.error('Fehler beim Abrufen der Dashboard-Daten:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        {/* Navigation */}
        <div className="bg-white shadow-sm rounded-lg mb-8">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {['dashboard', 'users', 'dealers', 'vehicles', 'leads'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab === 'dashboard' ? 'Dashboard' :
                 tab === 'users' ? 'Benutzer' :
                 tab === 'dealers' ? 'Händler' :
                 tab === 'vehicles' ? 'Fahrzeuge' : 'Leads'}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {activeTab === 'dashboard' && (
            <>
              {/* KPI Cards */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {kpis.map((kpi) => (
                  <div
                    key={kpi.label}
                    className="bg-white overflow-hidden shadow rounded-lg"
                  >
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 rounded-md p-3 ${kpi.color}`}>
                          <kpi.icon className="h-6 w-6 text-white" aria-hidden="true" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              {kpi.label}
                            </dt>
                            <dd className="text-lg font-semibold text-gray-900">
                              {kpi.value}
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'users' && (
            <UsersTable users={users} onUpdate={fetchDashboardData} />
          )}

          {activeTab === 'dealers' && (
            <DealersTable dealers={dealers} />
          )}

          {activeTab === 'vehicles' && (
            <VehiclesTable vehicles={vehicles} dealers={dealers} />
          )}

          {activeTab === 'leads' && (
            <LeadsTable leads={leads} />
          )}
        </div>
      </div>
    </div>
  )
} 