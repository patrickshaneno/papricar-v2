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
        <label htmlFor="consumption" className="block text-sm font-medium text-gray-700">
          Verbrauch (l/100km)
        </label>
        <input
          type="number"
          id="consumption"
          value={formData.consumption}
          onChange={(e) => onChange('consumption', parseFloat(e.target.value))}
          step="0.1"
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
        <label htmlFor="power" className="block text-sm font-medium text-gray-700">
          Leistung (PS)
        </label>
        <input
          type="number"
          id="power"
          value={formData.power}
          onChange={(e) => onChange('power', parseInt(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="displacement" className="block text-sm font-medium text-gray-700">
          Hubraum (cm³)
        </label>
        <input
          type="number"
          id="displacement"
          value={formData.displacement}
          onChange={(e) => onChange('displacement', parseInt(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
        />
      </div>
    </div>
  );
} 