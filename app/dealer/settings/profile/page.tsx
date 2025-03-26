'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Upload, ArrowLeft } from 'lucide-react'

interface DealerProfile {
  id: string
  user_id: string
  firm_name: string
  contact_first: string
  contact_last: string
  email: string
  phone: string
  address_street: string
  address_zip: string
  address_city: string
  state: string
  country: string
  website?: string
  description?: string
  logo_url?: string
}

const GERMAN_STATES = [
  'Baden-Württemberg',
  'Bayern',
  'Berlin',
  'Brandenburg',
  'Bremen',
  'Hamburg',
  'Hessen',
  'Mecklenburg-Vorpommern',
  'Niedersachsen',
  'Nordrhein-Westfalen',
  'Rheinland-Pfalz',
  'Saarland',
  'Sachsen',
  'Sachsen-Anhalt',
  'Schleswig-Holstein',
  'Thüringen'
]

export default function DealerProfileSettings() {
  const router = useRouter()
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<DealerProfile>()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (userError || !user) {
          router.push('/login')
          return
        }

        const { data: profile, error: profileError } = await supabase
          .from('dealers')
          .select('*')
          .eq('user_id', user.id)
          .single()

        if (profileError) throw profileError

        if (profile) {
          reset(profile)
          setLogoPreview(profile.logo_url)
        }
      } catch (error) {
        console.error('Error fetching profile:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [supabase, router, reset])

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}-${Math.random()}.${fileExt}`
      const filePath = `dealer-logos/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('public')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('public')
        .getPublicUrl(filePath)

      setLogoPreview(publicUrl)
    } catch (error) {
      console.error('Error uploading logo:', error)
    }
  }

  const onSubmit = async (data: DealerProfile) => {
    try {
      setIsSaving(true)
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Update profile in database
      const { error: updateError } = await supabase
        .from('dealers')
        .update({
          ...data,
          logo_url: logoPreview
        })
        .eq('user_id', user.id)

      if (updateError) throw updateError

      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-purple-500 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={() => router.push('/dealer/dashboard')}
            className="text-gray-600 hover:text-gray-900 mr-4"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-900">Profil-Einstellungen</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Logo Upload */}
          <div className="flex items-start space-x-6">
            <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-gray-100">
              {logoPreview ? (
                <Image
                  src={logoPreview}
                  alt="Händler Logo"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Upload className="h-8 w-8 text-gray-400" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-medium
                  file:bg-purple-50 file:text-purple-700
                  hover:file:bg-purple-100"
              />
              <p className="mt-1 text-sm text-gray-500">
                Idealerweise quadratisches Bild, max. 2MB
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Firmeninformationen */}
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900">Firmeninformationen</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Firmenname *
                </label>
                <input
                  type="text"
                  {...register('firm_name', { required: 'Firmenname ist erforderlich' })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                />
                {errors.firm_name && (
                  <p className="mt-1 text-sm text-red-600">{errors.firm_name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website
                </label>
                <input
                  type="url"
                  {...register('website')}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Beschreibung
                </label>
                <textarea
                  {...register('description')}
                  rows={4}
                  maxLength={500}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Max. 500 Zeichen
                </p>
              </div>
            </div>

            {/* Kontaktinformationen */}
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900">Kontaktinformationen</h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vorname *
                  </label>
                  <input
                    type="text"
                    {...register('contact_first', { required: 'Vorname ist erforderlich' })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  />
                  {errors.contact_first && (
                    <p className="mt-1 text-sm text-red-600">{errors.contact_first.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nachname *
                  </label>
                  <input
                    type="text"
                    {...register('contact_last', { required: 'Nachname ist erforderlich' })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  />
                  {errors.contact_last && (
                    <p className="mt-1 text-sm text-red-600">{errors.contact_last.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  E-Mail
                </label>
                <input
                  type="email"
                  {...register('email')}
                  disabled
                  className="block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                />
                <p className="mt-1 text-sm text-gray-500">
                  E-Mail-Adresse kann nicht geändert werden
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefon *
                </label>
                <input
                  type="tel"
                  {...register('phone', { required: 'Telefonnummer ist erforderlich' })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>
            </div>

            {/* Adresse */}
            <div className="space-y-6 md:col-span-2">
              <h2 className="text-lg font-medium text-gray-900">Adresse</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Straße und Hausnummer *
                </label>
                <input
                  type="text"
                  {...register('address_street', { required: 'Adresse ist erforderlich' })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                />
                {errors.address_street && (
                  <p className="mt-1 text-sm text-red-600">{errors.address_street.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    PLZ *
                  </label>
                  <input
                    type="text"
                    {...register('address_zip', { required: 'PLZ ist erforderlich' })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  />
                  {errors.address_zip && (
                    <p className="mt-1 text-sm text-red-600">{errors.address_zip.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stadt *
                  </label>
                  <input
                    type="text"
                    {...register('address_city', { required: 'Stadt ist erforderlich' })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  />
                  {errors.address_city && (
                    <p className="mt-1 text-sm text-red-600">{errors.address_city.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bundesland *
                  </label>
                  <select
                    {...register('state', { required: 'Bundesland ist erforderlich' })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  >
                    <option value="">Bitte wählen</option>
                    {GERMAN_STATES.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  {errors.state && (
                    <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Land
                </label>
                <input
                  type="text"
                  {...register('country')}
                  defaultValue="Deutschland"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/dealer/dashboard')}
              className="text-gray-600 hover:text-gray-900"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Speichern...' : 'Änderungen speichern'}
            </button>
          </div>
        </form>
      </div>

      {/* Toast Message */}
      {showToast && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="rounded-lg px-4 py-3 shadow-lg bg-green-500 text-white">
            Profil erfolgreich aktualisiert
          </div>
        </div>
      )}
    </div>
  )
} 