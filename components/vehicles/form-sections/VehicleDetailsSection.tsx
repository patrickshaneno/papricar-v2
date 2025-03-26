'use client';

import React from 'react';
import { UseFormRegister, FieldErrors, Control, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { VehicleFormData } from '@/types/vehicle';

interface VehicleDetailsSectionProps {
  register: UseFormRegister<VehicleFormData>;
  errors: FieldErrors<VehicleFormData>;
  control: Control<VehicleFormData>;
  watch: UseFormWatch<VehicleFormData>;
  setValue: UseFormSetValue<VehicleFormData>;
}

export default function VehicleDetailsSection({ register, errors, control, watch, setValue }: VehicleDetailsSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
          Fahrzeugtyp
        </label>
        <select
          id="type"
          {...register('type')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
        >
          <option value="new">Neu</option>
          <option value="stock">Lager</option>
          <option value="dayregistration">Tageszulassung</option>
          <option value="yearold">Jahreswagen</option>
        </select>
        {errors.type && (
          <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
          Marke
        </label>
        <input
          type="text"
          id="brand"
          {...register('brand')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
        />
        {errors.brand && (
          <p className="mt-1 text-sm text-red-600">{errors.brand.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="model" className="block text-sm font-medium text-gray-700">
          Modell
        </label>
        <input
          type="text"
          id="model"
          {...register('model')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
        />
        {errors.model && (
          <p className="mt-1 text-sm text-red-600">{errors.model.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Titel
        </label>
        <input
          type="text"
          id="title"
          {...register('title')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="vin" className="block text-sm font-medium text-gray-700">
          Fahrgestellnummer (VIN)
        </label>
        <input
          type="text"
          id="vin"
          {...register('vin')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
        />
        {errors.vin && (
          <p className="mt-1 text-sm text-red-600">{errors.vin.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700">
            Baujahr
          </label>
          <input
            type="number"
            id="year"
            {...register('year', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
          />
          {errors.year && (
            <p className="mt-1 text-sm text-red-600">{errors.year.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="mileage" className="block text-sm font-medium text-gray-700">
            Kilometerstand
          </label>
          <input
            type="number"
            id="mileage"
            {...register('mileage', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
          />
          {errors.mileage && (
            <p className="mt-1 text-sm text-red-600">{errors.mileage.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="delivery_month" className="block text-sm font-medium text-gray-700">
            Liefermonat
          </label>
          <input
            type="number"
            id="delivery_month"
            {...register('delivery_month', { valueAsNumber: true })}
            min="1"
            max="12"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
          />
          {errors.delivery_month && (
            <p className="mt-1 text-sm text-red-600">{errors.delivery_month.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="delivery_year" className="block text-sm font-medium text-gray-700">
            Lieferjahr
          </label>
          <input
            type="number"
            id="delivery_year"
            {...register('delivery_year', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
          />
          {errors.delivery_year && (
            <p className="mt-1 text-sm text-red-600">{errors.delivery_year.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="exterior_color" className="block text-sm font-medium text-gray-700">
            Außenfarbe
          </label>
          <input
            type="text"
            id="exterior_color"
            {...register('exterior_color')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
          />
          {errors.exterior_color && (
            <p className="mt-1 text-sm text-red-600">{errors.exterior_color.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="exterior_color_text" className="block text-sm font-medium text-gray-700">
            Außenfarbe (Text)
          </label>
          <input
            type="text"
            id="exterior_color_text"
            {...register('exterior_color_text')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
          />
          {errors.exterior_color_text && (
            <p className="mt-1 text-sm text-red-600">{errors.exterior_color_text.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="interior_color" className="block text-sm font-medium text-gray-700">
            Innenfarbe
          </label>
          <input
            type="text"
            id="interior_color"
            {...register('interior_color')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
          />
          {errors.interior_color && (
            <p className="mt-1 text-sm text-red-600">{errors.interior_color.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="interior_color_text" className="block text-sm font-medium text-gray-700">
            Innenfarbe (Text)
          </label>
          <input
            type="text"
            id="interior_color_text"
            {...register('interior_color_text')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
          />
          {errors.interior_color_text && (
            <p className="mt-1 text-sm text-red-600">{errors.interior_color_text.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="body_type" className="block text-sm font-medium text-gray-700">
            Karosserieform
          </label>
          <select
            id="body_type"
            {...register('body_type')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
          >
            <option value="limousine">Limousine</option>
            <option value="kombi">Kombi</option>
            <option value="suv">SUV</option>
            <option value="coupe">Coupé</option>
            <option value="cabrio">Cabriolet</option>
            <option value="van">Van</option>
          </select>
          {errors.body_type && (
            <p className="mt-1 text-sm text-red-600">{errors.body_type.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="transmission" className="block text-sm font-medium text-gray-700">
            Getriebe
          </label>
          <select
            id="transmission"
            {...register('transmission')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
          >
            <option value="manual">Schaltgetriebe</option>
            <option value="automatic">Automatik</option>
          </select>
          {errors.transmission && (
            <p className="mt-1 text-sm text-red-600">{errors.transmission.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="fuel_type" className="block text-sm font-medium text-gray-700">
            Kraftstoffart
          </label>
          <select
            id="fuel_type"
            {...register('fuel_type')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
          >
            <option value="petrol">Benzin</option>
            <option value="diesel">Diesel</option>
            <option value="electric">Elektro</option>
            <option value="hybrid_petrol">Hybrid (Benzin)</option>
            <option value="hybrid_diesel">Hybrid (Diesel)</option>
          </select>
          {errors.fuel_type && (
            <p className="mt-1 text-sm text-red-600">{errors.fuel_type.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="power_ps" className="block text-sm font-medium text-gray-700">
              Leistung (PS)
            </label>
            <input
              type="number"
              id="power_ps"
              {...register('power_ps', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
            />
            {errors.power_ps && (
              <p className="mt-1 text-sm text-red-600">{errors.power_ps.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="power_kw" className="block text-sm font-medium text-gray-700">
              Leistung (kW)
            </label>
            <input
              type="number"
              id="power_kw"
              {...register('power_kw', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
            />
            {errors.power_kw && (
              <p className="mt-1 text-sm text-red-600">{errors.power_kw.message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 