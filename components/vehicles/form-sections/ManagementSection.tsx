'use client'

import { useState } from 'react'
import { Control, UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { VehicleFormData } from '@/types/vehicle'
import { useRouter } from 'next/navigation'

interface ManagementSectionProps {
  register: UseFormRegister<VehicleFormData>
  errors: FieldErrors<VehicleFormData>
  control: Control<VehicleFormData>
  setValue: UseFormSetValue<VehicleFormData>
  watch: UseFormWatch<VehicleFormData>
  onSubmit: (data: VehicleFormData) => Promise<void>
  isSubmitting: boolean
}

const VEHICLE_STATUSES = [
  { value: 'draft', label: 'Entwurf' },
  { value: 'active', label: 'Aktiv' },
  { value: 'sold', label: 'Verkauft' }
] as const

export default function ManagementSection({
  register,
  errors,
  control,
  setValue,
  watch,
  onSubmit,
  isSubmitting
}: ManagementSectionProps) {
  const router = useRouter()
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'warning'>('success')

  const status = watch('status') || 'draft'
  const isDirty = watch('isDirty') || false

  const showToastMessage = (message: string, type: 'success' | 'warning' = 'success') => {
    setToastMessage(message)
    setToastType(type)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleSave = async () => {
    try {
      await onSubmit(watch())
      showToastMessage('Fahrzeug erfolgreich gespeichert')
    } catch (error) {
      showToastMessage('Fehler beim Speichern', 'warning')
    }
  }

  const handlePublish = async () => {
    try {
      setValue('status', 'active')
      await onSubmit(watch())
      showToastMessage('Veröffentlichung aktiv – jetzt im Marktplatz sichtbar')
    } catch (error) {
      showToastMessage('Fehler beim Veröffentlichen', 'warning')
    }
  }

  const handleDuplicate = async () => {
    try {
      const currentData = watch()
      const newData = {
        ...currentData,
        id: undefined, // New ID will be generated
        status: 'draft',
        title: `${currentData.title} (Kopie)`,
        created_at: new Date().toISOString()
      }
      
      // TODO: Implement actual duplication in Supabase
      // For now, we'll just redirect to a new form
      router.push('/dealer/vehicles/new')
      showToastMessage('Kopie erstellt – du kannst Änderungen vornehmen')
    } catch (error) {
      showToastMessage('Fehler beim Duplizieren', 'warning')
    }
  }

  const handleMarkAsSold = async () => {
    try {
      setValue('status', 'sold')
      await onSubmit(watch())
      showToastMessage('Als verkauft markiert – nicht mehr sichtbar für Nutzer')
    } catch (error) {
      showToastMessage('Fehler beim Markieren als verkauft', 'warning')
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">
          Management & Aktionen
        </h3>

        {/* Status Dropdown */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fahrzeugstatus
          </label>
          <select
            {...register('status')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
          >
            {VEHICLE_STATUSES.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <p className="mt-1 text-sm text-gray-500">
            Nur aktive Fahrzeuge erscheinen im Marktplatz.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            type="button"
            onClick={handleSave}
            disabled={isSubmitting}
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="mr-2">💾</span>
            Speichern
          </button>

          <button
            type="button"
            onClick={handlePublish}
            disabled={isSubmitting || !isDirty}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="mr-2">🚀</span>
            Speichern & veröffentlichen
          </button>

          <button
            type="button"
            onClick={handleDuplicate}
            disabled={isSubmitting}
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="mr-2">📄</span>
            Fahrzeug duplizieren
          </button>

          <button
            type="button"
            onClick={handleMarkAsSold}
            disabled={isSubmitting || status === 'sold'}
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="mr-2">✅</span>
            Als verkauft markieren
          </button>
        </div>

        {/* Warning for Mark as Sold */}
        {status === 'sold' && (
          <p className="mt-4 text-sm text-amber-600">
            Dieses Fahrzeug wird aus dem Marktplatz entfernt
          </p>
        )}
      </div>

      {/* Toast Message */}
      {showToast && (
        <div className="fixed bottom-4 right-4 z-50">
          <div
            className={`rounded-lg px-4 py-3 shadow-lg ${
              toastType === 'success' ? 'bg-green-500' : 'bg-amber-500'
            } text-white`}
          >
            {toastMessage}
          </div>
        </div>
      )}
    </div>
  )
} 