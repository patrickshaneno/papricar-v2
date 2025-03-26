'use client'

import React from 'react'
import { UseFormRegister, FieldErrors, Control } from 'react-hook-form'
import { VehicleFormData } from '@/types/vehicle'

interface ManagementSectionProps {
  register: UseFormRegister<VehicleFormData>
  errors: FieldErrors<VehicleFormData>
  control: Control<VehicleFormData>
  isLoading?: boolean
  onDuplicate: () => void
  onMarkAsSold: () => void
}

const VEHICLE_STATUSES = [
  { value: 'draft', label: 'Entwurf' },
  { value: 'active', label: 'Aktiv' },
  { value: 'sold', label: 'Verkauft' }
] as const

export default function ManagementSection({ register, errors, control, isLoading, onDuplicate, onMarkAsSold }: ManagementSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="dealerId" className="block text-sm font-medium text-gray-700">
          Händler ID
        </label>
        <input
          type="text"
          id="dealerId"
          {...register('dealer_id')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
        />
        {errors.dealer_id && (
          <p className="mt-1 text-sm text-red-600">{errors.dealer_id.message}</p>
        )}
      </div>

      <div className="flex space-x-4">
        <button
          type="button"
          onClick={onDuplicate}
          disabled={isLoading}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          Duplizieren
        </button>
        <button
          type="button"
          onClick={onMarkAsSold}
          disabled={isLoading}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Als verkauft markieren
        </button>
      </div>
    </div>
  )
} 