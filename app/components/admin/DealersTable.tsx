import Link from 'next/link'
import { Store, MessageSquare } from 'lucide-react'
import DataTable from './DataTable'

interface Dealer {
  id: string
  company_name: string
  contact_person: string
  vehicle_count: number
  lead_count: number
  is_active: boolean
}

interface DealersTableProps {
  dealers: Dealer[]
}

export default function DealersTable({ dealers }: DealersTableProps) {
  const columns = [
    {
      key: 'company_name' as keyof Dealer,
      label: 'Firma',
      render: (dealer: Dealer) => (
        <div className="flex items-center">
          <Store className="h-5 w-5 text-gray-400 mr-2" />
          <span>{dealer.company_name}</span>
        </div>
      )
    },
    {
      key: 'contact_person' as keyof Dealer,
      label: 'Ansprechpartner'
    },
    {
      key: 'vehicle_count' as keyof Dealer,
      label: 'Fahrzeuge',
      render: (dealer: Dealer) => (
        <span className="font-medium">{dealer.vehicle_count}</span>
      )
    },
    {
      key: 'lead_count' as keyof Dealer,
      label: 'Leads',
      render: (dealer: Dealer) => (
        <div className="flex items-center">
          <MessageSquare className="h-4 w-4 text-gray-400 mr-1" />
          <span className="font-medium">{dealer.lead_count}</span>
        </div>
      )
    },
    {
      key: 'is_active' as keyof Dealer,
      label: 'Status',
      render: (dealer: Dealer) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          dealer.is_active
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {dealer.is_active ? 'Aktiv' : 'Inaktiv'}
        </span>
      )
    },
    {
      key: 'id' as keyof Dealer,
      label: 'Aktionen',
      render: (dealer: Dealer) => (
        <Link
          href={`/dealer/${dealer.id}`}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Profil ansehen
        </Link>
      )
    }
  ]

  return (
    <DataTable
      columns={columns}
      data={dealers}
      emptyMessage="Keine Händler gefunden"
    />
  )
} 