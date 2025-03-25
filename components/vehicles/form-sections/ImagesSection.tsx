'use client'

import { useState, useCallback } from 'react'
import { Control, UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { VehicleFormData } from '@/types/vehicle'
import Image from 'next/image'

interface ImagesSectionProps {
  register: UseFormRegister<VehicleFormData>
  errors: FieldErrors<VehicleFormData>
  control: Control<VehicleFormData>
  setValue: UseFormSetValue<VehicleFormData>
  watch: UseFormWatch<VehicleFormData>
}

const MAX_FILES = 20
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png']

export default function ImagesSection({
  register,
  errors,
  control,
  setValue,
  watch
}: ImagesSectionProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const images = watch('images') || []
  const previewImage = watch('preview_image')

  const validateFile = (file: File) => {
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      throw new Error('Nur JPEG und PNG Dateien sind erlaubt')
    }
    if (file.size > MAX_FILE_SIZE) {
      throw new Error('Datei darf nicht größer als 5MB sein')
    }
    if (images.length >= MAX_FILES) {
      throw new Error(`Maximal ${MAX_FILES} Bilder erlaubt`)
    }
    return true
  }

  const handleFileUpload = async (files: FileList | File[]) => {
    setUploadError(null)
    setIsUploading(true)

    try {
      const newImages: string[] = []
      const fileArray = Array.from(files)
      
      for (const file of fileArray) {
        validateFile(file)
        
        // TODO: Implement actual upload to Supabase Storage
        // For now, we'll use a mock URL
        const mockUrl = URL.createObjectURL(file)
        newImages.push(mockUrl)
      }

      setValue('images', [...images, ...newImages])
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Fehler beim Hochladen')
    } finally {
      setIsUploading(false)
    }
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files) {
      handleFileUpload(e.dataTransfer.files)
    }
  }, [images])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFileUpload(e.target.files)
    }
  }, [images])

  const removeImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setValue('images', newImages)
    
    if (previewImage === images[index]) {
      setValue('preview_image', newImages[0] || '')
    }
  }

  const setPreviewImage = (url: string) => {
    setValue('preview_image', url)
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Bilder & Galerie
        </h3>

        {/* Upload Area */}
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center ${
            isDragging
              ? 'border-purple-500 bg-purple-50'
              : 'border-gray-300 hover:border-purple-500'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            type="file"
            multiple
            accept="image/jpeg,image/jpg,image/png"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="space-y-2">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="text-sm text-gray-600">
              <p>
                {isDragging
                  ? 'Dateien hier ablegen'
                  : 'Dateien hierher ziehen oder klicken zum Auswählen'}
              </p>
              <p className="mt-1">
                Bis zu {MAX_FILES} Bilder, JPEG/PNG, max. 5MB pro Datei
              </p>
            </div>
          </div>
        </div>

        {uploadError && (
          <p className="mt-2 text-sm text-red-600">
            {uploadError}
          </p>
        )}

        {isUploading && (
          <div className="mt-4">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-500 border-t-transparent"></div>
            </div>
          </div>
        )}

        {/* Image Gallery */}
        {images.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-gray-700">
                Hochgeladene Bilder
              </h4>
              {!previewImage && (
                <p className="text-sm text-amber-600">
                  Bitte Hauptbild wählen
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((url, index) => (
                <div
                  key={url}
                  className={`relative group aspect-square rounded-lg overflow-hidden ${
                    previewImage === url ? 'ring-2 ring-purple-500' : ''
                  }`}
                >
                  <Image
                    src={url}
                    alt={`Fahrzeugbild ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  
                  {/* Overlay with actions */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity">
                    <div className="absolute top-2 right-2 space-x-2">
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="p-1 rounded-full bg-red-500 text-white hover:bg-red-600"
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="absolute bottom-2 left-2 right-2">
                      <button
                        type="button"
                        onClick={() => setPreviewImage(url)}
                        className={`w-full py-1 px-2 rounded text-sm font-medium ${
                          previewImage === url
                            ? 'bg-purple-500 text-white'
                            : 'bg-white text-gray-900 hover:bg-gray-100'
                        }`}
                      >
                        {previewImage === url ? 'Hauptbild' : 'Als Hauptbild setzen'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 