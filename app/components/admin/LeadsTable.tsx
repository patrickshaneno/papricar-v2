import { useState } from 'react'
import { Mail, Phone, Building2, Filter } from 'lucide-react'
import DataTable from './DataTable'

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

interface LeadsTableProps {
  leads: Lead[]
}

export default function LeadsTable({ leads }: LeadsTableProps) {
  const [filters, setFilters] = useState({
    status: '',
    vehicle: ''
  })

  const filteredLeads = leads.filter(lead => {
    if (filters.status && lead.status !== filters.status) return false
    if (filters.vehicle && lead.vehicle_id !== filters.vehicle) return false
    return true
  })

  const columns = [
    {
      key: 'name' as keyof Lead,
      label: 'Kontakt',
      render: (lead: Lead) => (
        <div className="flex flex-col">
          <span className="font-medium">{lead.name}</span>
          <div className="flex items-center text-sm text-gray-500">
            <Mail className="h-4 w-4 mr-1" />
            <span>{lead.email}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Phone className="h-4 w-4 mr-1" />
            <span>{lead.phone}</span>
          </div>
        </div>
      )
    },
    {
      key: 'company' as keyof Lead,
      label: 'Firma',
      render: (lead: Lead) => (
        <div className="flex items-center">
          <Building2 className="h-5 w-5 text-gray-400 mr-2" />
          <span>{lead.company}</span>
        </div>
      )
    },
    {
      key: 'vehicle_brand' as keyof Lead,
      label: 'Fahrzeug',
      render: (lead: Lead) => (
        <span>{`${lead.vehicle_brand} ${lead.vehicle_model}`}</span>
      )
    },
    {
      key: 'status' as keyof Lead,
      label: 'Status',
      render: (lead: Lead) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          lead.status === 'new'
            ? 'bg-blue-100 text-blue-800'
            : lead.status === 'contacted'
            ? 'bg-yellow-100 text-yellow-800'
            : lead.status === 'qualified'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {lead.status === 'new' ? 'Neu' : lead.status === 'contacted' ? 'Kontaktiert' : lead.status === 'qualified' ? 'Qualifiziert' : 'Abgelehnt'}
        </span>
      )
    },
    {
      key: 'created_at' as keyof Lead,
      label: 'Eingegangen',
      render: (lead: Lead) => (
        <span>
          {new Date(lead.created_at).toLocaleDateString('de-DE')}
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <option value="new">Neu</option>
              <option value="contacted">Kontaktiert</option>
              <option value="qualified">Qualifiziert</option>
              <option value="rejected">Abgelehnt</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fahrzeug
            </label>
            <select
              value={filters.vehicle}
              onChange={(e) => setFilters(prev => ({ ...prev, vehicle: e.target.value }))}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
            >
              <option value="">Alle Fahrzeuge</option>
              {leads.map(lead => (
                <option key={lead.vehicle_id} value={lead.vehicle_id}>
                  {`${lead.vehicle_brand} ${lead.vehicle_model}`}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tabelle */}
      <DataTable
        columns={columns}
        data={filteredLeads}
        emptyMessage="Keine Leads gefunden"
      />
    </div>
  )
} 