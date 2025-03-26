'use client'
import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

interface VehicleFormProps {
  vehicle?: {
    id: string
    brand: string
    model: string
    vehicle_type: string
    price: number
    description: string
    status: 'active' | 'inactive'
  }
}

export default function VehicleForm({ vehicle }: VehicleFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    const formData = new FormData(e.currentTarget)
    const vehicleData = {
      brand: formData.get('brand'),
      model: formData.get('model'),
      vehicle_type: formData.get('vehicle_type'),
      price: Number(formData.get('price')),
      description: formData.get('description'),
      status: formData.get('status'),
    }

    try {
      if (vehicle) {
        const { error } = await supabase
          .from('vehicles')
          .update(vehicleData)
          .eq('id', vehicle.id)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('vehicles')
          .insert([vehicleData])

        if (error) throw error
      }

      setMessage({
        type: 'success',
        text: vehicle ? 'Fahrzeug erfolgreich aktualisiert' : 'Fahrzeug erfolgreich erstellt'
      })

      setTimeout(() => {
        router.push('/admin/vehicles')
      }, 1500)
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Fehler beim Speichern des Fahrzeugs'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {message && (
        <div className={`rounded-md p-4 ${
          message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
            Marke
          </label>
          <input
            type="text"
            name="brand"
            id="brand"
            defaultValue={vehicle?.brand}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="model" className="block text-sm font-medium text-gray-700">
            Modell
          </label>
          <input
            type="text"
            name="model"
            id="model"
            defaultValue={vehicle?.model}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="vehicle_type" className="block text-sm font-medium text-gray-700">
            Fahrzeugtyp
          </label>
          <select
            name="vehicle_type"
            id="vehicle_type"
            defaultValue={vehicle?.vehicle_type}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          >
            <option value="">Bitte wählen</option>
            <option value="car">Auto</option>
            <option value="motorcycle">Motorrad</option>
            <option value="truck">LKW</option>
            <option value="van">Transporter</option>
          </select>
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Preis
          </label>
          <input
            type="number"
            name="price"
            id="price"
            defaultValue={vehicle?.price}
            min="0"
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            name="status"
            id="status"
            defaultValue={vehicle?.status || 'active'}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          >
            <option value="active">Aktiv</option>
            <option value="inactive">Inaktiv</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Beschreibung
        </label>
        <textarea
          name="description"
          id="description"
          rows={4}
          defaultValue={vehicle?.description}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.push('/admin/vehicles')}
          className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Abbrechen
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? 'Wird gespeichert...' : vehicle ? 'Aktualisieren' : 'Erstellen'}
        </button>
      </div>
    </form>
  )
} 