'use client'
import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { TrashIcon } from '@heroicons/react/24/outline'

interface DeleteVehicleButtonProps {
  vehicleId: string
}

export default function DeleteVehicleButton({ vehicleId }: DeleteVehicleButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase
        .from('vehicles')
        .delete()
        .eq('id', vehicleId)

      if (error) throw error

      router.refresh()
    } catch (error) {
      console.error('Fehler beim Löschen des Fahrzeugs:', error)
    } finally {
      setIsLoading(false)
      setShowConfirm(false)
    }
  }

  if (showConfirm) {
    return (
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setShowConfirm(false)}
          className="text-gray-600 hover:text-gray-900"
        >
          Abbrechen
        </button>
        <button
          onClick={handleDelete}
          disabled={isLoading}
          className="text-red-600 hover:text-red-900 disabled:opacity-50"
        >
          {isLoading ? 'Wird gelöscht...' : 'Bestätigen'}
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="text-red-600 hover:text-red-900"
    >
      <TrashIcon className="h-5 w-5" />
    </button>
  )
} 