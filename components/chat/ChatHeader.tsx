'use client'

import Image from 'next/image'
import Link from 'next/link'

interface ChatHeaderProps {
  vehicleTitle: string
  dealerName: string
  dealerLogo: string
  vehicleImage: string
  vehicleId: string
}

export default function ChatHeader({
  vehicleTitle,
  dealerName,
  dealerLogo,
  vehicleImage,
  vehicleId,
}: ChatHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <Link
            href={`/vehicles/${vehicleId}`}
            className="relative h-12 w-12 rounded-lg overflow-hidden"
          >
            <Image
              src={vehicleImage}
              alt={vehicleTitle}
              fill
              className="object-cover"
            />
          </Link>
          <div>
            <h2 className="text-sm font-medium text-gray-900">{vehicleTitle}</h2>
            <div className="flex items-center space-x-2">
              <div className="relative h-4 w-4">
                <Image
                  src={dealerLogo}
                  alt={dealerName}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xs text-gray-500">{dealerName}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 