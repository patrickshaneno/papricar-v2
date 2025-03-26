'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { Users, Building2, Car, Mail } from 'lucide-react'
import UsersTable from '@/app/components/admin/UsersTable'
import DealersTable from '@/app/components/admin/DealersTable'
import VehiclesTable from '@/app/components/admin/VehiclesTable'
import LeadsTable from '@/app/components/admin/LeadsTable'
import Container from '@/components/ui/Container'
import { supabase } from '@/lib/supabase'

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
    const checkAccess = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        router.push('/login')
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single()

      if (profile?.role !== 'dealer') {
        router.push('/')
        return
      }
    }

    checkAccess()
  }, [router])

  useEffect(() => {
    fetchDashboardData()
  }, [])

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
    <Container>
      <div className="pt-24 pb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Hier können weitere Dashboard-Widgets hinzugefügt werden */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Willkommen im Admin-Bereich</h2>
            <p className="text-gray-600">
              Hier finden Sie alle wichtigen Funktionen für die Verwaltung Ihrer Fahrzeuge und Anfragen.
            </p>
          </div>
        </div>
      </div>
    </Container>
  )
} 