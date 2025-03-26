'use client'

import React from 'react';
import { UseFormRegister, FieldErrors, Control } from 'react-hook-form';
import { VehicleFormData } from '@/types/vehicle';

interface ConsumptionSectionProps {
  register: UseFormRegister<VehicleFormData>;
  errors: FieldErrors<VehicleFormData>;
  control: Control<VehicleFormData>;
  fuelType: string;
}

export default function ConsumptionSection({ register, errors, control, fuelType }: ConsumptionSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="fuelConsumption" className="block text-sm font-medium text-gray-700">
          Kraftstoffverbrauch (l/100km)
        </label>
        <input
          type="number"
          id="fuelConsumption"
          {...register('fuel_consumption')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
        />
        {errors.fuel_consumption && (
          <p className="mt-1 text-sm text-red-600">{errors.fuel_consumption.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="co2Emissions" className="block text-sm font-medium text-gray-700">
          CO₂-Emissionen (g/km)
        </label>
        <input
          type="number"
          id="co2Emissions"
          {...register('co2_emissions')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
        />
        {errors.co2_emissions && (
          <p className="mt-1 text-sm text-red-600">{errors.co2_emissions.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="emissionClass" className="block text-sm font-medium text-gray-700">
          Schadstoffklasse
        </label>
        <select
          id="emissionClass"
          {...register('emission_class')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
        >
          <option value="euro6">Euro 6</option>
          <option value="euro5">Euro 5</option>
          <option value="euro4">Euro 4</option>
          <option value="euro3">Euro 3</option>
          <option value="euro2">Euro 2</option>
          <option value="euro1">Euro 1</option>
        </select>
        {errors.emission_class && (
          <p className="mt-1 text-sm text-red-600">{errors.emission_class.message}</p>
        )}
      </div>
    </div>
  );
} 