'use client'

import React from 'react'
import { UseFormRegister, FieldErrors, Control } from 'react-hook-form'
import { VehicleFormData } from '@/types/vehicle'

interface PricingSectionProps {
  register: UseFormRegister<VehicleFormData>
  errors: FieldErrors<VehicleFormData>
  control: Control<VehicleFormData>
  vehicleType: string
}

export default function PricingSection({ register, errors, control, vehicleType }: PricingSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Preis (€)
        </label>
        <input
          type="number"
          id="price"
          {...register('price')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
        />
        {errors.price && (
          <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="vat" className="block text-sm font-medium text-gray-700">
          MwSt. (%)
        </label>
        <input
          type="number"
          id="vat"
          {...register('vat')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
        />
        {errors.vat && (
          <p className="mt-1 text-sm text-red-600">{errors.vat.message}</p>
        )}
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="negotiable"
          {...register('negotiable')}
          className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
        />
        <label htmlFor="negotiable" className="ml-2 block text-sm text-gray-700">
          Preis verhandelbar
        </label>
      </div>
    </div>
  )
} 