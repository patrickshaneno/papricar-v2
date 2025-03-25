import { useState } from 'react'
import { Car, Filter } from 'lucide-react'
import DataTable from './DataTable'

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

interface VehiclesTableProps {
  vehicles: Vehicle[]
  dealers: Array<{ id: string; company_name: string }>
}

export default function VehiclesTable({ vehicles, dealers }: VehiclesTableProps) {
  const [filters, setFilters] = useState({
    dealer: '',
    status: '',
    type: ''
  })

  const filteredVehicles = vehicles.filter(vehicle => {
    if (filters.dealer && vehicle.dealer_id !== filters.dealer) return false
    if (filters.status && vehicle.status !== filters.status) return false
    if (filters.type && vehicle.vehicle_type !== filters.type) return false
    return true
  })

  const columns = [
    {
      key: 'brand' as keyof Vehicle,
      label: 'Fahrzeug',
      render: (vehicle: Vehicle) => (
        <div className="flex items-center">
          <Car className="h-5 w-5 text-gray-400 mr-2" />
          <span>{`${vehicle.brand} ${vehicle.model}`}</span>
        </div>
      )
    },
    {
      key: 'price' as keyof Vehicle,
      label: 'Preis',
      render: (vehicle: Vehicle) => (
        <span className="font-medium">
          {new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR'
          }).format(vehicle.price)}
        </span>
      )
    },
    {
      key: 'status' as keyof Vehicle,
      label: 'Status',
      render: (vehicle: Vehicle) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          vehicle.status === 'active'
            ? 'bg-green-100 text-green-800'
            : vehicle.status === 'draft'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {vehicle.status === 'active' ? 'Aktiv' : vehicle.status === 'draft' ? 'Entwurf' : 'Inaktiv'}
        </span>
      )
    },
    {
      key: 'created_at' as keyof Vehicle,
      label: 'Hochgeladen',
      render: (vehicle: Vehicle) => (
        <span>
          {new Date(vehicle.created_at).toLocaleDateString('de-DE')}
        </span>
      )
    }
  ]

  return (
    <div className="space-y-4">
      {/* Filter */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center mb-4">
          <Filter className="h-5 w-5 text-gray-400 mr-2" />
          <h3 className="text-sm font-medium text-gray-700">Filter</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Händler
            </label>
            <select
              value={filters.dealer}
              onChange={(e) => setFilters(prev => ({ ...prev, dealer: e.target.value }))}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
            >
              <option value="">Alle Händler</option>
              {dealers.map(dealer => (
                <option key={dealer.id} value={dealer.id}>
                  {dealer.company_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
            >
              <option value="">Alle Status</option>
              <option value="active">Aktiv</option>
              <option value="draft">Entwurf</option>
              <option value="inactive">Inaktiv</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fahrzeugart
            </label>
            <select
              value={filters.type}
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
            >
              <option value="">Alle Arten</option>
              <option value="car">Pkw</option>
              <option value="van">Van</option>
              <option value="suv">SUV</option>
              <option value="truck">Lkw</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabelle */}
      <DataTable
        columns={columns}
        data={filteredVehicles}
        emptyMessage="Keine Fahrzeuge gefunden"
      />
    </div>
  )
} 