'use client'

import { Control, UseFormRegister, FieldErrors } from 'react-hook-form'
import { VehicleFormData } from '@/types/vehicle'
import { FuelType } from '@/types/vehicle'

interface ConsumptionSectionProps {
  register: UseFormRegister<VehicleFormData>
  errors: FieldErrors<VehicleFormData>
  control: Control<VehicleFormData>
  fuelType: FuelType
}

export default function ConsumptionSection({
  register,
  errors,
  control,
  fuelType
}: ConsumptionSectionProps) {
  if (!fuelType) {
    return (
      <div className="text-center py-8 text-gray-500">
        Bitte wählen Sie zuerst eine Kraftstoffart aus.
      </div>
    )
  }

  const isHybrid = fuelType === 'hybrid_petrol' || fuelType === 'hybrid_diesel'
  const isElectric = fuelType === 'electric'
  const isPetrolOrDiesel = fuelType === 'petrol' || fuelType === 'diesel'

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Verbrauchswerte & rechtliche Angaben
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Benzin/Diesel Felder */}
          {(isPetrolOrDiesel || isHybrid) && (
            <>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Kraftstoffverbrauch kombiniert (l/100 km)
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    {...register('fuel_consumption_combined', {
                      required: 'Verbrauch ist erforderlich',
                      min: { value: 0, message: 'Verbrauch muss positiv sein' }
                    })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                    aria-describedby="fuel-consumption-tooltip"
                  />
                  <div
                    id="fuel-consumption-tooltip"
                    className="absolute z-10 invisible group-hover:visible bg-gray-900 text-white text-xs rounded py-1 px-2 right-0 bottom-full left-0 sm:left-auto sm:right-0"
                    role="tooltip"
                  >
                    Verbrauch und Emissionen laut WLTP
                  </div>
                </div>
                {errors.fuel_consumption_combined && (
                  <p className="text-sm text-red-600">
                    {errors.fuel_consumption_combined.message}
                  </p>
                )}
              </div>

              {isHybrid && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Verbrauch bei entladener Batterie (l/100 km)
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      {...register('fuel_consumption_battery_empty', {
                        required: 'Verbrauch ist erforderlich',
                        min: { value: 0, message: 'Verbrauch muss positiv sein' }
                      })}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                      aria-describedby="battery-empty-tooltip"
                    />
                    <div
                      id="battery-empty-tooltip"
                      className="absolute z-10 invisible group-hover:visible bg-gray-900 text-white text-xs rounded py-1 px-2 right-0 bottom-full left-0 sm:left-auto sm:right-0"
                      role="tooltip"
                    >
                      Verbrauch bei entladener Batterie nach WLTP
                    </div>
                  </div>
                  {errors.fuel_consumption_battery_empty && (
                    <p className="text-sm text-red-600">
                      {errors.fuel_consumption_battery_empty.message}
                    </p>
                  )}
                </div>
              )}
            </>
          )}

          {/* Elektro/Hybrid Felder */}
          {(isElectric || isHybrid) && (
            <>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Elektrischer Verbrauch kombiniert (kWh/100 km)
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    {...register('electric_consumption_combined', {
                      required: 'Verbrauch ist erforderlich',
                      min: { value: 0, message: 'Verbrauch muss positiv sein' }
                    })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                    aria-describedby="electric-consumption-tooltip"
                  />
                  <div
                    id="electric-consumption-tooltip"
                    className="absolute z-10 invisible group-hover:visible bg-gray-900 text-white text-xs rounded py-1 px-2 right-0 bottom-full left-0 sm:left-auto sm:right-0"
                    role="tooltip"
                  >
                    {isElectric
                      ? 'Elektrischer Verbrauch nach WLTP inkl. Ladeverluste'
                      : 'Elektrischer Verbrauch im kombinierten Betrieb'}
                  </div>
                </div>
                {errors.electric_consumption_combined && (
                  <p className="text-sm text-red-600">
                    {errors.electric_consumption_combined.message}
                  </p>
                )}
              </div>

              {isHybrid && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Elektrischer Verbrauch bei entladener Batterie (kWh/100 km)
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      {...register('electric_consumption_battery_empty', {
                        required: 'Verbrauch ist erforderlich',
                        min: { value: 0, message: 'Verbrauch muss positiv sein' }
                      })}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                      aria-describedby="battery-empty-electric-tooltip"
                    />
                    <div
                      id="battery-empty-electric-tooltip"
                      className="absolute z-10 invisible group-hover:visible bg-gray-900 text-white text-xs rounded py-1 px-2 right-0 bottom-full left-0 sm:left-auto sm:right-0"
                      role="tooltip"
                    >
                      Elektrischer Verbrauch bei entladener Batterie nach WLTP
                    </div>
                  </div>
                  {errors.electric_consumption_battery_empty && (
                    <p className="text-sm text-red-600">
                      {errors.electric_consumption_battery_empty.message}
                    </p>
                  )}
                </div>
              )}
            </>
          )}

          {/* CO₂-Emissionen (für alle) */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              CO₂-Emissionen (g/km)
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="number"
              {...register('co2_emissions', {
                required: 'CO₂-Emissionen sind erforderlich',
                min: { value: 0, message: 'Emissionen müssen positiv sein' }
              })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
            />
            {errors.co2_emissions && (
              <p className="text-sm text-red-600">
                {errors.co2_emissions.message}
              </p>
            )}
          </div>

          {/* CO₂-Klasse (für alle) */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              CO₂-Klasse
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              {...register('co2_class', {
                required: 'CO₂-Klasse ist erforderlich'
              })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
            >
              <option value="">Bitte wählen</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
              <option value="G">G</option>
            </select>
            {errors.co2_class && (
              <p className="text-sm text-red-600">
                {errors.co2_class.message}
              </p>
            )}
          </div>

          {/* CO₂-Klasse bei entladener Batterie (nur Hybrid) */}
          {isHybrid && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                CO₂-Klasse bei entladener Batterie
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                {...register('co2_class_battery_empty', {
                  required: 'CO₂-Klasse ist erforderlich'
                })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
              >
                <option value="">Bitte wählen</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
                <option value="G">G</option>
              </select>
              {errors.co2_class_battery_empty && (
                <p className="text-sm text-red-600">
                  {errors.co2_class_battery_empty.message}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 