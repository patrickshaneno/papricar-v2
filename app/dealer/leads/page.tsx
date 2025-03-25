'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Inquiry, getDealerInquiries, markInquiryAsRead } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { calculateVehicleScore, getMarketPrice, getOriginalPrice } from '@/lib/vehicleScore'
import VehicleScoreDisplay from '@/components/VehicleScore'

// Mock-Daten für Entwicklung
const mockInquiries: Inquiry[] = [
  {
    id: '1',
    dealer_id: 'dealer-1',
    vehicle_id: 'vehicle-1',
    vehicle_title: 'BMW M3 Competition',
    customer_name: 'Max Mustermann',
    customer_email: 'max@example.com',
    customer_phone: '+49 123 456789',
    kaufinteresse: 'Leasing',
    inzahlungnahme: true,
    interest_confirmed: true,
    created_at: '2024-03-20T10:00:00Z',
    is_read: false,
  },
  {
    id: '2',
    dealer_id: 'dealer-1',
    vehicle_id: 'vehicle-2',
    vehicle_title: 'Mercedes-Benz C63 AMG',
    customer_name: 'Anna Schmidt',
    customer_email: 'anna@example.com',
    customer_phone: '+49 987 654321',
    kaufinteresse: 'Finanzierung',
    inzahlungnahme: false,
    interest_confirmed: false,
    created_at: '2024-03-19T15:30:00Z',
    is_read: true,
  },
]

export default function LeadsPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const router = useRouter()

  useEffect(() => {
    const loadInquiries = async () => {
      try {
        // In Produktion: const data = await getDealerInquiries('dealer-1')
        setInquiries(mockInquiries)
      } catch (error) {
        console.error('Error loading inquiries:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadInquiries()
  }, [])

  const handleChatClick = async (inquiry: Inquiry) => {
    try {
      if (!inquiry.is_read) {
        await markInquiryAsRead(inquiry.id)
        setInquiries(inquiries.map(i => 
          i.id === inquiry.id ? { ...i, is_read: true } : i
        ))
      }
      router.push(`/chat/${inquiry.vehicle_id}`)
    } catch (error) {
      console.error('Error marking inquiry as read:', error)
    }
  }

  const getStatusBadge = (inquiry: Inquiry) => {
    if (!inquiry.is_read) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          Neu
        </span>
      )
    }
    if (inquiry.interest_confirmed) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Qualifiziert
        </span>
      )
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        Nicht qualifiziert
      </span>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
        <div className="text-sm text-gray-500">
          {inquiries.length} Anfragen insgesamt
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : inquiries.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Keine Leads vorhanden</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fahrzeug
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kunde
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Interesse
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Inzahlungnahme
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aktionen
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {inquiries.map((inquiry) => (
                  <tr
                    key={inquiry.id}
                    className={`${
                      !inquiry.is_read ? 'bg-blue-50' : ''
                    } hover:bg-gray-50`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {inquiry.vehicle_title}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {inquiry.vehicle_id}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {inquiry.customer_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {inquiry.customer_email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {inquiry.kaufinteresse}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {inquiry.inzahlungnahme ? 'Ja' : 'Nein'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(inquiry)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleChatClick(inquiry)}
                        className="text-primary hover:text-primary/80 font-medium"
                      >
                        Zum Chat
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden">
            <div className="divide-y divide-gray-200">
              {inquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  className={`p-4 ${
                    !inquiry.is_read ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {inquiry.vehicle_title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        ID: {inquiry.vehicle_id}
                      </p>
                    </div>
                    {getStatusBadge(inquiry)}
                  </div>
                  <div className="space-y-1 text-sm">
                    <p className="text-gray-900">
                      <span className="font-medium">Kunde:</span>{' '}
                      {inquiry.customer_name}
                    </p>
                    <p className="text-gray-500">{inquiry.customer_email}</p>
                    <p className="text-gray-900">
                      <span className="font-medium">Interesse:</span>{' '}
                      {inquiry.kaufinteresse}
                    </p>
                    <p className="text-gray-900">
                      <span className="font-medium">Inzahlungnahme:</span>{' '}
                      {inquiry.inzahlungnahme ? 'Ja' : 'Nein'}
                    </p>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={() => handleChatClick(inquiry)}
                      className="text-primary hover:text-primary/80 font-medium text-sm"
                    >
                      Zum Chat
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Inquiry Details Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Details zur Anfrage
                </h2>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Fahrzeug
                  </h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedInquiry.vehicle_title}
                  </p>
                  <p className="text-sm text-gray-500">
                    ID: {selectedInquiry.vehicle_id}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Kundeninformationen
                  </h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedInquiry.customer_name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {selectedInquiry.customer_email}
                  </p>
                  <p className="text-sm text-gray-500">
                    {selectedInquiry.customer_phone}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Kaufinteresse
                  </h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedInquiry.kaufinteresse}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Inzahlungnahme
                  </h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedInquiry.inzahlungnahme ? 'Ja' : 'Nein'}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Status
                  </h3>
                  <div className="mt-1">{getStatusBadge(selectedInquiry)}</div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    PAPRICAR Score
                  </h3>
                  <div className="mt-2">
                    <VehicleScoreDisplay
                      score={calculateVehicleScore(
                        getOriginalPrice(selectedInquiry.vehicle_id),
                        95000, // Mock aktueller Preis
                        getMarketPrice(selectedInquiry.vehicle_id)
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Schließen
                </button>
                <button
                  onClick={() => {
                    // Mock: Kundenprofil speichern
                    alert('Kundenprofil wurde gespeichert')
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90"
                >
                  Kundenprofil speichern
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 