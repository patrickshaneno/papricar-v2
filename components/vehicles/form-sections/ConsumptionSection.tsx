'use client'

import React from 'react';
import { VehicleFormData } from '@/types/vehicle';

interface ConsumptionSectionProps {
  formData: VehicleFormData;
  onChange: (field: keyof VehicleFormData, value: any) => void;
}

export default function ConsumptionSection({ formData, onChange }: ConsumptionSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="fuelConsumption" className="block text-sm font-medium text-gray-700">
          Kraftstoffverbrauch (l/100km)
        </label>
        <input
          type="number"
          id="fuelConsumption"
          value={formData.fuel_consumption}
          onChange={(e) => onChange('fuel_consumption', parseFloat(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="co2Emissions" className="block text-sm font-medium text-gray-700">
          CO₂-Emissionen (g/km)
        </label>
        <input
          type="number"
          id="co2Emissions"
          value={formData.co2_emissions}
          onChange={(e) => onChange('co2_emissions', parseInt(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="emissionClass" className="block text-sm font-medium text-gray-700">
          Schadstoffklasse
        </label>
        <select
          id="emissionClass"
          value={formData.emission_class}
          onChange={(e) => onChange('emission_class', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
        >
          <option value="euro6">Euro 6</option>
          <option value="euro5">Euro 5</option>
          <option value="euro4">Euro 4</option>
          <option value="euro3">Euro 3</option>
          <option value="euro2">Euro 2</option>
          <option value="euro1">Euro 1</option>
        </select>
      </div>
    </div>
  );
} 