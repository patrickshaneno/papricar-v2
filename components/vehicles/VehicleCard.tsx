import Image from 'next/image'
import Link from 'next/link'

interface Vehicle {
  id: string
  brand: string
  model: string
  year: number
  mileage: number
  price: number
  description: string
  features: string[]
  images: string[]
  status: string
}

interface VehicleCardProps {
  vehicle: Vehicle
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(price)
  }

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('de-DE').format(mileage)
  }

  return (
    <Link href={`/vehicles/${vehicle.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-48">
          {vehicle.images && vehicle.images[0] ? (
            <Image
              src={vehicle.images[0]}
              alt={`${vehicle.brand} ${vehicle.model}`}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Kein Bild verfügbar</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {vehicle.brand} {vehicle.model}
          </h3>
          <p className="text-sm text-gray-500">
            {vehicle.year} • {formatMileage(vehicle.mileage)} km
          </p>
          <p className="mt-2 text-xl font-bold text-primary">
            {formatPrice(vehicle.price)}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {vehicle.features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
              >
                {feature}
              </span>
            ))}
            {vehicle.features.length > 3 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                +{vehicle.features.length - 3} weitere
              </span>
            )}
          </div>
          <div className="mt-4">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                vehicle.status === 'available'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {vehicle.status === 'available' ? 'Verfügbar' : 'Nicht verfügbar'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
} 