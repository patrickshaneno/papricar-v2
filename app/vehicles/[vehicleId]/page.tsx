'use client'

import { useState } from 'react'
import Image from 'next/image'
import VehicleGallery from '@/components/VehicleGallery'
import InquiryModal from '@/components/InquiryModal'

// Mock-Daten für ein Beispielfahrzeug
const mockVehicle = {
  id: '1',
  brand: 'BMW',
  model: 'X5',
  variant: 'xDrive40i',
  title: 'M Sportpaket - Head-Up - Panorama',
  vehicleId: 'GW1000',
  images: [
    {
      url: '/images/vehicles/bmw-x5-1.jpg',
      alt: 'BMW X5 Frontansicht',
    },
    {
      url: '/images/vehicles/bmw-x5-2.jpg',
      alt: 'BMW X5 Seitenansicht',
    },
    {
      url: '/images/vehicles/bmw-x5-3.jpg',
      alt: 'BMW X5 Heckansicht',
    },
    {
      url: '/images/vehicles/bmw-x5-4.jpg',
      alt: 'BMW X5 Innenraum',
    },
    {
      url: '/images/vehicles/bmw-x5-5.jpg',
      alt: 'BMW X5 Detail',
    },
  ],
  price: 89900,
  leasingRate: 699,
  dealer: {
    name: 'BMW Premium Selection',
    logo: '/images/dealers/bmw-premium.png',
    address: 'Premiumallee 10, 10117 Berlin',
    phone: '+49 30 123456789',
    isVerified: true,
  },
  badges: {
    type: 'Neuwagen',
    deliveryDate: 'Mai 2024',
  },
  specs: {
    year: 2024,
    mileage: 0,
    firstRegistration: null,
    transmission: 'Automatik',
    fuel: 'Benzin',
    power: {
      ps: 340,
      kw: 250,
    },
    bodyType: 'SUV',
    exteriorColor: {
      name: 'Mineralweiß Metallic',
      code: 'A96',
    },
    interiorColor: {
      name: 'Leder Dakota Schwarz',
      code: 'LCSW',
    },
  },
  features: [
    'M Sportpaket',
    'Head-Up Display',
    'Panorama-Glasdach',
    'Driving Assistant Professional',
    'Laserlicht',
    'Harman/Kardon Surround Sound',
    'Live Cockpit Professional',
    'Gestiksteuerung',
    'Komfortzugang',
    'Soft-Close-Automatik',
    'Sitzheizung vorne und hinten',
    'Sitzbelüftung vorne',
    'Ambientes Licht',
    '21" M Leichtmetallräder',
    'Adaptives M Fahrwerk',
  ],
  consumption: {
    fuel: '8.5-7.9',
    co2: '194-180',
    efficiencyClass: 'B',
  },
}

export default function VehicleDetailPage() {
  const [isSaved, setIsSaved] = useState(false)
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Section 1: Fahrzeugübersicht */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {mockVehicle.brand} {mockVehicle.model} {mockVehicle.variant}
              </h1>
              <p className="text-xl text-gray-600 mt-2">{mockVehicle.title}</p>
              <p className="text-sm text-gray-500 mt-1">
                ID: {mockVehicle.vehicleId}
              </p>
              <div className="flex gap-2 mt-4">
                <span className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
                  {mockVehicle.badges.type}
                </span>
                <span className="px-3 py-1 text-sm font-medium bg-accent/10 text-accent rounded-full">
                  Lieferung: {mockVehicle.badges.deliveryDate}
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsSaved(!isSaved)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg
                className={`w-8 h-8 ${
                  isSaved ? 'text-red-500 fill-current' : 'text-gray-400'
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-4 mt-6">
            <div className="relative w-12 h-12">
              <Image
                src={mockVehicle.dealer.logo}
                alt={mockVehicle.dealer.name}
                fill
                className="object-contain rounded-full"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium text-gray-900">
                  {mockVehicle.dealer.name}
                </p>
                {mockVehicle.dealer.isVerified && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                    Verifiziert
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500">{mockVehicle.dealer.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Galerie */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <VehicleGallery images={mockVehicle.images} />
      </div>

      {/* Section 3: Preis & Leasingrate */}
      <div className="bg-white shadow-sm mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-gray-500">Preis</p>
              <p className="text-3xl font-bold text-gray-900">
                ab {mockVehicle.price.toLocaleString('de-DE')} €
              </p>
              <p className="text-sm text-gray-500">inkl. 19% MwSt.</p>
            </div>
            <div className="mt-4 md:mt-0 md:text-right">
              <p className="text-sm text-gray-500">Leasingrate</p>
              <p className="text-3xl font-bold text-primary">
                ab {mockVehicle.leasingRate} € / Monat
              </p>
              <p className="text-sm text-gray-500">inkl. 19% MwSt.</p>
            </div>
          </div>
          <button
            onClick={() => setIsInquiryModalOpen(true)}
            className="w-full md:w-auto mt-6 px-8 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors"
          >
            Anfrage senden
          </button>
        </div>
      </div>

      {/* Section 4: Fahrzeugdetails */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Fahrzeugdetails
        </h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-500">Modelljahr</p>
              <p className="font-medium">{mockVehicle.specs.year}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Kilometerstand</p>
              <p className="font-medium">
                {mockVehicle.specs.mileage.toLocaleString('de-DE')} km
              </p>
            </div>
            {mockVehicle.specs.firstRegistration && (
              <div>
                <p className="text-sm text-gray-500">Erstzulassung</p>
                <p className="font-medium">
                  {mockVehicle.specs.firstRegistration}
                </p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-500">Getriebe</p>
              <p className="font-medium">{mockVehicle.specs.transmission}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Kraftstoffart</p>
              <p className="font-medium">{mockVehicle.specs.fuel}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Leistung</p>
              <p className="font-medium">
                {mockVehicle.specs.power.ps} PS ({mockVehicle.specs.power.kw} kW)
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Karosserieform</p>
              <p className="font-medium">{mockVehicle.specs.bodyType}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Farbe außen</p>
              <p className="font-medium">
                {mockVehicle.specs.exteriorColor.name}{' '}
                <span className="text-sm text-gray-500">
                  ({mockVehicle.specs.exteriorColor.code})
                </span>
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Farbe innen</p>
              <p className="font-medium">
                {mockVehicle.specs.interiorColor.name}{' '}
                <span className="text-sm text-gray-500">
                  ({mockVehicle.specs.interiorColor.code})
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 5: Ausstattung */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Ausstattung</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockVehicle.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-primary flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 6: Verbrauchs- & Emissionsdaten */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-100 rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4">
            Verbrauchs- & Emissionsdaten
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              Kraftstoffverbrauch kombiniert: {mockVehicle.consumption.fuel} l/100
              km
            </p>
            <p>CO₂-Emissionen kombiniert: {mockVehicle.consumption.co2} g/km</p>
            <p>CO₂-Effizienzklasse: {mockVehicle.consumption.efficiencyClass}</p>
          </div>
        </div>
      </div>

      {/* Section 7: Händlerinfo */}
      <div className="bg-white shadow-sm mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-start gap-6">
            <div className="relative w-16 h-16 flex-shrink-0">
              <Image
                src={mockVehicle.dealer.logo}
                alt={mockVehicle.dealer.name}
                fill
                className="object-contain rounded-full"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-gray-900">
                  {mockVehicle.dealer.name}
                </h3>
                {mockVehicle.dealer.isVerified && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                    Verifiziert
                  </span>
                )}
              </div>
              <p className="text-gray-600 mt-1">{mockVehicle.dealer.address}</p>
              {mockVehicle.dealer.phone && (
                <p className="text-gray-600 mt-1">{mockVehicle.dealer.phone}</p>
              )}
              <button className="mt-4 px-4 py-2 border border-primary text-primary font-medium rounded-md hover:bg-primary/5 transition-colors">
                Händler abonnieren
              </button>
            </div>
          </div>
        </div>
      </div>

      <InquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        vehicleId={mockVehicle.id}
        vehicleType={mockVehicle.badges.type === 'Neuwagen' ? 'new' : 'used'}
      />
    </div>
  )
} 