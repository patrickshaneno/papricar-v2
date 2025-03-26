'use client';

import React from 'react';
import { VehicleFormData, Transmission, FuelType } from '@/types/vehicle';

interface VehicleDetailsSectionProps {
  formData: VehicleFormData;
  onChange: (field: keyof VehicleFormData, value: any) => void;
}

export default function VehicleDetailsSection({ formData, onChange }: VehicleDetailsSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
          Marke
        </label>
        <input
          type="text"
          id="brand"
          value={formData.brand}
          onChange={(e) => onChange('brand', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="model" className="block text-sm font-medium text-gray-700">
          Modell
        </label>
        <input
          type="text"
          id="model"
          value={formData.model}
          onChange={(e) => onChange('model', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="year" className="block text-sm font-medium text-gray-700">
          Baujahr
        </label>
        <input
          type="number"
          id="year"
          value={formData.year}
          onChange={(e) => onChange('year', parseInt(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="mileage" className="block text-sm font-medium text-gray-700">
          Kilometerstand
        </label>
        <input
          type="number"
          id="mileage"
          value={formData.mileage}
          onChange={(e) => onChange('mileage', parseInt(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="transmission" className="block text-sm font-medium text-gray-700">
          Getriebe
        </label>
        <select
          id="transmission"
          value={formData.transmission}
          onChange={(e) => onChange('transmission', e.target.value as Transmission)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
        >
          <option value="manual">Manuell</option>
          <option value="automatic">Automatisch</option>
        </select>
      </div>

      <div>
        <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700">
          Kraftstoff
        </label>
        <select
          id="fuelType"
          value={formData.fuel_type}
          onChange={(e) => onChange('fuel_type', e.target.value as FuelType)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
        >
          <option value="petrol">Benzin</option>
          <option value="diesel">Diesel</option>
          <option value="electric">Elektrisch</option>
          <option value="hybrid_petrol">Hybrid (Benzin)</option>
          <option value="hybrid_diesel">Hybrid (Diesel)</option>
        </select>
      </div>
    </div>
  );
} 