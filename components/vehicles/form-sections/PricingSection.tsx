'use client'

import React from 'react'
import { VehicleFormData } from '@/types/vehicle'

interface PricingSectionProps {
  formData: VehicleFormData
  onChange: (field: keyof VehicleFormData, value: any) => void
}

export default function PricingSection({ formData, onChange }: PricingSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Preis (€)
        </label>
        <input
          type="number"
          id="price"
          value={formData.price}
          onChange={(e) => onChange('price', parseInt(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="vat" className="block text-sm font-medium text-gray-700">
          MwSt. (%)
        </label>
        <input
          type="number"
          id="vat"
          value={formData.vat}
          onChange={(e) => onChange('vat', parseInt(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="negotiable"
          checked={formData.negotiable}
          onChange={(e) => onChange('negotiable', e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
        />
        <label htmlFor="negotiable" className="ml-2 block text-sm text-gray-700">
          Preis verhandelbar
        </label>
      </div>
    </div>
  )
} 