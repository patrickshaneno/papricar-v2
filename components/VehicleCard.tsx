import Image from 'next/image'
import Link from 'next/link'

interface VehicleCardProps {
  id: string
  image: string
  brand: string
  model: string
  title: string
  vehicleId: string
  price: number
  leasingRate: number
  dealer: {
    name: string
    logo: string
    address: string
  }
  badges: {
    type: string
    deliveryDate: string
  }
  specs: {
    year: number
    mileage: number
    power: number
    transmission: string
    fuel: string
  }
  consumption: {
    fuel: string
    co2: string
    efficiencyClass: string
  }
}

export default function VehicleCard({
  id,
  image,
  brand,
  model,
  title,
  vehicleId,
  price,
  leasingRate,
  dealer,
  badges,
  specs,
  consumption,
}: VehicleCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      {/* Image Container */}
      <div className="relative h-48">
        <Image
          src={image}
          alt={`${brand} ${model}`}
          fill
          className="object-cover"
        />
        <button className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
          <svg
            className="w-6 h-6 text-gray-600"
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

      {/* Content */}
      <div className="p-4">
        {/* Title & ID */}
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">ID: {vehicleId}</p>
        </div>

        {/* Badges */}
        <div className="flex gap-2 mb-4">
          <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
            {badges.type}
          </span>
          <span className="px-2 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
            Lieferung: {badges.deliveryDate}
          </span>
        </div>

        {/* Price & Leasing */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-500">Preis ab</p>
            <p className="text-xl font-bold text-gray-900">
              {price.toLocaleString('de-DE')} €
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Leasing ab</p>
            <p className="text-xl font-bold text-primary">
              {leasingRate.toLocaleString('de-DE')} €/Monat
            </p>
          </div>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
          <div>
            <span className="text-gray-500">Baujahr:</span>
            <span className="ml-1">{specs.year}</span>
          </div>
          <div>
            <span className="text-gray-500">Kilometer:</span>
            <span className="ml-1">{specs.mileage.toLocaleString('de-DE')} km</span>
          </div>
          <div>
            <span className="text-gray-500">Leistung:</span>
            <span className="ml-1">{specs.power} PS</span>
          </div>
          <div>
            <span className="text-gray-500">Getriebe:</span>
            <span className="ml-1">{specs.transmission}</span>
          </div>
        </div>

        {/* Dealer Info */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative w-8 h-8">
            <Image
              src={dealer.logo}
              alt={dealer.name}
              fill
              className="object-contain"
            />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{dealer.name}</p>
            <p className="text-xs text-gray-500">{dealer.address}</p>
          </div>
        </div>

        {/* Consumption */}
        <div className="flex justify-between text-xs text-gray-500">
          <span>{consumption.fuel}</span>
          <span>{consumption.co2}</span>
          <span>Effizienzklasse: {consumption.efficiencyClass}</span>
        </div>
      </div>
    </div>
  )
} 