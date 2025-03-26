'use client'

import React from 'react'
import { Control, UseFormRegister, FieldErrors } from 'react-hook-form'
import { VehicleFormData, VehicleType } from '@/types/vehicle'

interface PricingSectionProps {
  register: UseFormRegister<VehicleFormData>
  errors: FieldErrors<VehicleFormData>
  control: Control<VehicleFormData>
  vehicleType: VehicleType
  formData: VehicleFormData
  onChange: (field: keyof VehicleFormData, value: any) => void
}

export default function PricingSection({
  register,
  errors,
  control,
  vehicleType,
  formData,
  onChange
}: PricingSectionProps) {
  const isNewVehicle = vehicleType === 'new'

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Preis & Rabatte
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fahrzeugpreis */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Fahrzeugpreis brutto
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="relative">
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">€</span>
                </div>
                <input
                  type="number"
                  step="0.01"
                  {...register('price', {
                    required: 'Preis ist erforderlich',
                    min: { value: 0, message: 'Preis muss positiv sein' }
                  })}
                  className="block w-full pl-7 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  aria-describedby="price-tooltip"
                  value={formData.price}
                  onChange={(e) => onChange('price', parseInt(e.target.value))}
                />
              </div>
              <div
                id="price-tooltip"
                className="absolute z-10 invisible group-hover:visible bg-gray-900 text-white text-xs rounded py-1 px-2 right-0 bottom-full left-0 sm:left-auto sm:right-0"
                role="tooltip"
              >
                Pflichtangabe gemäß §1 PAngV
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Preis inkl. 19 % Mehrwertsteuer
            </p>
            {isNewVehicle && (
              <p className="text-sm text-gray-500 italic">
                Unverbindlich
              </p>
            )}
            {errors.price && (
              <p className="text-sm text-red-600">
                {errors.price.message}
              </p>
            )}
          </div>

          {/* Leasingrate */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Leasingrate
            </label>
            <div className="relative">
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">€</span>
                </div>
                <input
                  type="number"
                  step="0.01"
                  {...register('leasing_rate', {
                    min: { value: 0, message: 'Rate muss positiv sein' }
                  })}
                  className="block w-full pl-7 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  value={formData.leasing_rate}
                  onChange={(e) => onChange('leasing_rate', parseInt(e.target.value))}
                />
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Unverbindliche Beispielrate
            </p>
            {isNewVehicle && (
              <p className="text-sm text-gray-500 italic">
                Unverbindlich
              </p>
            )}
            {errors.leasing_rate && (
              <p className="text-sm text-red-600">
                {errors.leasing_rate.message}
              </p>
            )}
          </div>

          {/* Rabatte */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Rabatt Barkauf
            </label>
            <div className="relative">
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">%</span>
                </div>
                <input
                  type="number"
                  step="0.01"
                  {...register('cash_discount', {
                    min: { value: 0, message: 'Rabatt muss positiv sein' },
                    max: { value: 100, message: 'Rabatt darf nicht über 100% liegen' }
                  })}
                  className="block w-full pr-7 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  aria-describedby="cash-discount-tooltip"
                  value={formData.cash_discount}
                  onChange={(e) => onChange('cash_discount', parseInt(e.target.value))}
                />
              </div>
              <div
                id="cash-discount-tooltip"
                className="absolute z-10 invisible group-hover:visible bg-gray-900 text-white text-xs rounded py-1 px-2 right-0 bottom-full left-0 sm:left-auto sm:right-0"
                role="tooltip"
              >
                Einmalzahlung nach Abzug aller Rabatte
              </div>
            </div>
            {errors.cash_discount && (
              <p className="text-sm text-red-600">
                {errors.cash_discount.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Rabatt Finanzierung
            </label>
            <div className="relative">
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">%</span>
                </div>
                <input
                  type="number"
                  step="0.01"
                  {...register('financing_discount', {
                    min: { value: 0, message: 'Rabatt muss positiv sein' },
                    max: { value: 100, message: 'Rabatt darf nicht über 100% liegen' }
                  })}
                  className="block w-full pr-7 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  aria-describedby="financing-discount-tooltip"
                  value={formData.financing_discount}
                  onChange={(e) => onChange('financing_discount', parseInt(e.target.value))}
                />
              </div>
              <div
                id="financing-discount-tooltip"
                className="absolute z-10 invisible group-hover:visible bg-gray-900 text-white text-xs rounded py-1 px-2 right-0 bottom-full left-0 sm:left-auto sm:right-0"
                role="tooltip"
              >
                Rabatt bei Finanzierung über Händlerpartner
              </div>
            </div>
            {errors.financing_discount && (
              <p className="text-sm text-red-600">
                {errors.financing_discount.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Rabatt Leasing
            </label>
            <div className="relative">
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">%</span>
                </div>
                <input
                  type="number"
                  step="0.01"
                  {...register('leasing_discount', {
                    min: { value: 0, message: 'Rabatt muss positiv sein' },
                    max: { value: 100, message: 'Rabatt darf nicht über 100% liegen' }
                  })}
                  className="block w-full pr-7 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  aria-describedby="leasing-discount-tooltip"
                  value={formData.leasing_discount}
                  onChange={(e) => onChange('leasing_discount', parseInt(e.target.value))}
                />
              </div>
              <div
                id="leasing-discount-tooltip"
                className="absolute z-10 invisible group-hover:visible bg-gray-900 text-white text-xs rounded py-1 px-2 right-0 bottom-full left-0 sm:left-auto sm:right-0"
                role="tooltip"
              >
                Rabatt bei Leasingangebot mit 48 Monaten Laufzeit
              </div>
            </div>
            {errors.leasing_discount && (
              <p className="text-sm text-red-600">
                {errors.leasing_discount.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 