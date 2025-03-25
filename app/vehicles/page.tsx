'use client'

import { useState } from 'react'
import VehicleCard from '@/components/VehicleCard'
import VehicleFilters from '@/components/VehicleFilters'

// Mock-Daten für Fahrzeuge
const mockVehicles = [
  {
    id: '1',
    image: '/images/vehicles/golf-gti.jpg',
    brand: 'Volkswagen',
    model: 'Golf',
    title: 'VW Golf GTI',
    vehicleId: 'GW1000',
    price: 45900,
    leasingRate: 299,
    dealer: {
      name: 'Auto Müller GmbH',
      logo: '/images/dealers/auto-mueller.png',
      address: 'Musterstraße 1, 10115 Berlin',
    },
    badges: {
      type: 'Neuwagen',
      deliveryDate: 'März 2024',
    },
    specs: {
      year: 2024,
      mileage: 0,
      power: 245,
      transmission: 'Automatik',
      fuel: 'Benzin',
    },
    consumption: {
      fuel: '7.2l/100km',
      co2: '164g CO2/km',
      efficiencyClass: 'C',
    },
  },
  {
    id: '2',
    image: '/images/vehicles/bmw-m3.jpg',
    brand: 'BMW',
    model: 'M3',
    title: 'BMW M3 Competition',
    vehicleId: 'BM2000',
    price: 89900,
    leasingRate: 599,
    dealer: {
      name: 'BMW Premium Selection',
      logo: '/images/dealers/bmw-premium.png',
      address: 'Premiumallee 10, 10117 Berlin',
    },
    badges: {
      type: 'Lagerwagen',
      deliveryDate: 'Sofort',
    },
    specs: {
      year: 2024,
      mileage: 100,
      power: 510,
      transmission: 'Automatik',
      fuel: 'Benzin',
    },
    consumption: {
      fuel: '10.2l/100km',
      co2: '234g CO2/km',
      efficiencyClass: 'D',
    },
  },
  {
    id: '3',
    image: '/images/vehicles/mercedes-eq.jpg',
    brand: 'Mercedes-Benz',
    model: 'EQS',
    title: 'Mercedes-Benz EQS 450+',
    vehicleId: 'MB3000',
    price: 109900,
    leasingRate: 799,
    dealer: {
      name: 'Mercedes-Benz Center',
      logo: '/images/dealers/mercedes-center.png',
      address: 'Luxusweg 5, 10119 Berlin',
    },
    badges: {
      type: 'Neuwagen',
      deliveryDate: 'April 2024',
    },
    specs: {
      year: 2024,
      mileage: 0,
      power: 333,
      transmission: 'Automatik',
      fuel: 'Elektro',
    },
    consumption: {
      fuel: '19.8 kWh/100km',
      co2: '0g CO2/km',
      efficiencyClass: 'A+',
    },
  },
]

export default function VehiclesPage() {
  const [filters, setFilters] = useState({})

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Alle Fahrzeuge
          </h1>
          <p className="text-xl text-gray-600">
            Wählen Sie aus tausenden geprüften Angeboten – sortiert nach Ihren
            Wünschen
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Desktop Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="lg:sticky lg:top-8">
              <VehicleFilters onFilterChange={setFilters} />
            </div>
          </div>

          {/* Vehicle Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} {...vehicle} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 