'use client'

import React, { useEffect } from 'react'
import { UseFormRegister, FieldErrors, Control, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { VehicleFormData } from '@/types/vehicle'

interface ImagesSectionProps {
  register: UseFormRegister<VehicleFormData>
  errors: FieldErrors<VehicleFormData>
  control: Control<VehicleFormData>
  setValue: UseFormSetValue<VehicleFormData>
  watch: UseFormWatch<VehicleFormData>
}

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif']

export default function ImagesSection({ register, errors, control, setValue, watch }: ImagesSectionProps) {
  const images = watch('images')
  const [objectUrls, setObjectUrls] = React.useState<string[]>([])

  useEffect(() => {
    return () => {
      // Cleanup object URLs when component unmounts
      objectUrls.forEach(url => URL.revokeObjectURL(url))
    }
  }, [objectUrls])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const validFiles = Array.from(files).filter(file => {
      if (file.size > MAX_FILE_SIZE) {
        alert(`Die Datei ${file.name} ist zu groß. Maximale Größe: 10MB`)
        return false
      }
      if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        alert(`Die Datei ${file.name} hat ein nicht unterstütztes Format. Erlaubte Formate: JPG, PNG, GIF`)
        return false
      }
      return true
    })

    const newUrls = validFiles.map(file => URL.createObjectURL(file))
    setObjectUrls(prev => [...prev, ...newUrls])
    setValue('images', [...images, ...newUrls])
  }

  const handleRemoveImage = (index: number) => {
    URL.revokeObjectURL(objectUrls[index])
    setObjectUrls(prev => prev.filter((_, i) => i !== index))
    setValue('images', images.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Bilder
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
                <span>Dateien hochladen</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  accept="image/jpeg,image/png,image/gif"
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

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`Fahrzeugbild ${index + 1}`}
                className="h-32 w-full object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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