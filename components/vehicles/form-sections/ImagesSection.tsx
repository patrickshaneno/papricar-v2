'use client'

import React from 'react'
import { VehicleFormData } from '@/types/vehicle'

interface ImagesSectionProps {
  formData: VehicleFormData
  onChange: (field: keyof VehicleFormData, value: any) => void
}

export default function ImagesSection({ formData, onChange }: ImagesSectionProps) {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const imageUrls = Array.from(files).map(file => URL.createObjectURL(file))
      onChange('images', [...(formData.images || []), ...imageUrls])
    }
  }

  const handleRemoveImage = (index: number) => {
    const newImages = [...(formData.images || [])]
    newImages.splice(index, 1)
    onChange('images', newImages)
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Fahrzeugbilder
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500"
              >
                <span>Bilder hochladen</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                />
              </label>
              <p className="pl-1">oder per Drag & Drop</p>
            </div>
            <p className="text-xs text-gray-500">
              PNG, JPG, GIF bis zu 10MB
            </p>
          </div>
        </div>
      </div>

      {formData.images && formData.images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {formData.images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt={`Fahrzeugbild ${index + 1}`}
                className="h-32 w-full object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 