'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth'
import { supabase } from '@/lib/auth'
import VehicleCard from '@/components/vehicles/VehicleCard'
import SaveButton from '@/components/vehicles/SaveButton'
import Link from 'next/link'

export default function SavedVehiclesPage() {
  const { user, loading } = useAuth()
  const [savedVehicles, setSavedVehicles] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchSavedVehicles()
    } else {
      setIsLoading(false)
    }
  }, [user])

  const fetchSavedVehicles = async () => {
    try {
      const { data, error } = await supabase
        .from('saved_vehicles')
        .select(`
          id,
          vehicle:vehicle_id (
            id,
            brand,
            model,
            year,
            mileage,
            price,
            description,
            features,
            images,
            status
          )
        `)
        .eq('user_id', user?.id)
        .eq('role', 'user')
        .order('created_at', { ascending: false })

      if (error) throw error

      setSavedVehicles(data.map(item => item.vehicle))
    } catch (error) {
      console.error('Error fetching saved vehicles:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Bitte anmelden
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Melden Sie sich an, um Ihre gespeicherten Fahrzeuge zu sehen.
            </p>
          </div>
          <div className="mt-8 space-y-6">
            <Link
              href="/login"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Jetzt anmelden
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (savedVehicles.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Keine gespeicherten Fahrzeuge
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Sie haben noch keine Fahrzeuge gespeichert.
            </p>
          </div>
          <div className="mt-8 space-y-6">
            <Link
              href="/vehicles"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Zum Marktplatz
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
          Meine gespeicherten Fahrzeuge
        </h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {savedVehicles.map((vehicle) => (
            <div key={vehicle.id} className="relative">
              <div className="absolute top-2 right-2 z-10">
                <SaveButton vehicleId={vehicle.id} />
              </div>
              <VehicleCard vehicle={vehicle} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 