'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth'
import { supabase } from '@/lib/auth'

interface SaveButtonProps {
  vehicleId: string
  className?: string
}

export default function SaveButton({ vehicleId, className = '' }: SaveButtonProps) {
  const { user } = useAuth()
  const [isSaved, setIsSaved] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (user) {
      checkSavedStatus()
    }
  }, [user, vehicleId])

  const checkSavedStatus = async () => {
    if (!user) return

    const { data, error } = await supabase
      .from('saved_vehicles')
      .select('id')
      .eq('user_id', user.id)
      .eq('vehicle_id', vehicleId)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error checking saved status:', error)
      return
    }

    setIsSaved(!!data)
  }

  const handleSave = async () => {
    if (!user) return

    setIsLoading(true)
    try {
      if (isSaved) {
        const { error } = await supabase
          .from('saved_vehicles')
          .delete()
          .eq('user_id', user.id)
          .eq('vehicle_id', vehicleId)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('saved_vehicles')
          .insert([
            {
              user_id: user.id,
              vehicle_id: vehicleId,
              role: user.role,
            },
          ])

        if (error) throw error
      }

      setIsSaved(!isSaved)
    } catch (error) {
      console.error('Error saving vehicle:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return (
      <button
        onClick={() => window.location.href = '/login'}
        className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${className}`}
        title="Bitte anmelden, um Fahrzeuge zu speichern"
      >
        <svg
          className="w-6 h-6 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>
    )
  }

  return (
    <button
      onClick={handleSave}
      disabled={isLoading}
      className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${className}`}
      title={isSaved ? 'Aus Merkliste entfernen' : 'In Merkliste speichern'}
    >
      {isLoading ? (
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      ) : (
        <svg
          className={`w-6 h-6 ${isSaved ? 'text-red-500 fill-current' : 'text-gray-400'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      )}
    </button>
  )
} 