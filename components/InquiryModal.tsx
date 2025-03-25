'use client'

import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { useRouter } from 'next/navigation'

interface InquiryModalProps {
  isOpen: boolean
  onClose: () => void
  vehicleId: string
  vehicleType: 'new' | 'used'
}

interface FormData {
  name: string
  email: string
  phone: string
  customerType: 'private' | 'business'
  interest: 'cash' | 'finance' | 'leasing' | 'testDrive'
  hasTradeIn: boolean
  tradeIn?: {
    brand: string
    model: string
    firstRegistration: string
    vin: string
    accidentFree: boolean
    repaintFree: boolean
    vatDeductible: boolean
    ownerCount: number
  }
}

interface FormErrors {
  [key: string]: string
}

export default function InquiryModal({
  isOpen,
  onClose,
  vehicleId,
  vehicleType,
}: InquiryModalProps) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    customerType: 'private',
    interest: 'cash',
    hasTradeIn: false,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Basis-Validierung
    if (!formData.name.trim()) newErrors.name = 'Name ist erforderlich'
    if (!formData.email.trim()) newErrors.email = 'E-Mail ist erforderlich'
    if (!formData.phone.trim()) newErrors.phone = 'Telefonnummer ist erforderlich'

    // Inzahlungnahme-Validierung
    if (formData.hasTradeIn && formData.tradeIn) {
      if (!formData.tradeIn.brand.trim()) newErrors.tradeInBrand = 'Marke ist erforderlich'
      if (!formData.tradeIn.model.trim()) newErrors.tradeInModel = 'Modell ist erforderlich'
      if (!formData.tradeIn.firstRegistration) newErrors.tradeInFirstRegistration = 'Erstzulassung ist erforderlich'
      if (!formData.tradeIn.vin.trim()) newErrors.tradeInVin = 'Fahrgestellnummer ist erforderlich'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    // Simuliere API-Aufruf
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setStep(2)
  }

  const handleTradeInChange = (hasTradeIn: boolean) => {
    setFormData((prev) => ({
      ...prev,
      hasTradeIn,
      tradeIn: hasTradeIn
        ? {
            brand: '',
            model: '',
            firstRegistration: '',
            vin: '',
            accidentFree: false,
            repaintFree: false,
            vatDeductible: false,
            ownerCount: 1,
          }
        : undefined,
    }))
  }

  const handleTradeInFieldChange = (
    field: keyof NonNullable<FormData['tradeIn']>,
    value: string | number | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      tradeIn: prev.tradeIn
        ? { ...prev.tradeIn, [field]: value }
        : undefined,
    }))
  }

  const handleInterested = () => {
    // Speichere Formulardaten und Fahrzeug-ID
    localStorage.setItem('inquiryData', JSON.stringify(formData))
    localStorage.setItem('vehicleId', vehicleId)
    
    // Leite zum Chat weiter
    router.push(`/chat/${vehicleId}`)
    onClose()
  }

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl w-full bg-white rounded-xl shadow-xl">
          <div className="relative">
            {/* Fortschrittsbalken */}
            <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${step === 1 ? 50 : 100}%` }}
              />
            </div>

            {/* Modal-Inhalt mit Fade-Animation */}
            <div
              className={`transition-opacity duration-300 ${
                step === 1 ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {step === 1 && (
                <div className="p-6">
                  <Dialog.Title className="text-2xl font-bold text-gray-900 mb-6">
                    Fahrzeuganfrage
                  </Dialog.Title>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name *
                        </label>
                        <input
                          type="text"
                          required
                          className={`w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary ${
                            errors.name ? 'border-red-500' : 'border-gray-300'
                          }`}
                          value={formData.name}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, name: e.target.value }))
                          }
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          E-Mail *
                        </label>
                        <input
                          type="email"
                          required
                          className={`w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          }`}
                          value={formData.email}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Telefonnummer *
                        </label>
                        <input
                          type="tel"
                          required
                          className={`w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary ${
                            errors.phone ? 'border-red-500' : 'border-gray-300'
                          }`}
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              phone: e.target.value,
                            }))
                          }
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Kundentyp *
                        </label>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              required
                              className="mr-2"
                              checked={formData.customerType === 'private'}
                              onChange={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  customerType: 'private',
                                }))
                              }
                            />
                            Privat
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              required
                              className="mr-2"
                              checked={formData.customerType === 'business'}
                              onChange={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  customerType: 'business',
                                }))
                              }
                            />
                            Gewerblich
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Kaufinteresse *
                        </label>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              required
                              className="mr-2"
                              checked={formData.interest === 'cash'}
                              onChange={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  interest: 'cash',
                                }))
                              }
                            />
                            Barkauf
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              required
                              className="mr-2"
                              checked={formData.interest === 'finance'}
                              onChange={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  interest: 'finance',
                                }))
                              }
                            />
                            Finanzierung
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              required
                              className="mr-2"
                              checked={formData.interest === 'leasing'}
                              onChange={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  interest: 'leasing',
                                }))
                              }
                            />
                            Leasing
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              required
                              className="mr-2"
                              checked={formData.interest === 'testDrive'}
                              onChange={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  interest: 'testDrive',
                                }))
                              }
                            />
                            Probefahrt
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Inzahlungnahme *
                        </label>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              required
                              className="mr-2"
                              checked={formData.hasTradeIn === true}
                              onChange={() => handleTradeInChange(true)}
                            />
                            Ja
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              required
                              className="mr-2"
                              checked={formData.hasTradeIn === false}
                              onChange={() => handleTradeInChange(false)}
                            />
                            Nein
                          </label>
                        </div>
                      </div>
                    </div>

                    {formData.hasTradeIn && (
                      <div className="border-t pt-6 mt-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                          Inzahlungnahme Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Marke *
                            </label>
                            <input
                              type="text"
                              required
                              className={`w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary ${
                                errors.tradeInBrand ? 'border-red-500' : 'border-gray-300'
                              }`}
                              value={formData.tradeIn?.brand || ''}
                              onChange={(e) =>
                                handleTradeInFieldChange('brand', e.target.value)
                              }
                            />
                            {errors.tradeInBrand && (
                              <p className="mt-1 text-sm text-red-500">{errors.tradeInBrand}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Modell *
                            </label>
                            <input
                              type="text"
                              required
                              className={`w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary ${
                                errors.tradeInModel ? 'border-red-500' : 'border-gray-300'
                              }`}
                              value={formData.tradeIn?.model || ''}
                              onChange={(e) =>
                                handleTradeInFieldChange('model', e.target.value)
                              }
                            />
                            {errors.tradeInModel && (
                              <p className="mt-1 text-sm text-red-500">{errors.tradeInModel}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Erstzulassung *
                            </label>
                            <input
                              type="date"
                              required
                              className={`w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary ${
                                errors.tradeInFirstRegistration ? 'border-red-500' : 'border-gray-300'
                              }`}
                              value={formData.tradeIn?.firstRegistration || ''}
                              onChange={(e) =>
                                handleTradeInFieldChange(
                                  'firstRegistration',
                                  e.target.value
                                )
                              }
                            />
                            {errors.tradeInFirstRegistration && (
                              <p className="mt-1 text-sm text-red-500">{errors.tradeInFirstRegistration}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Fahrgestellnummer *
                            </label>
                            <input
                              type="text"
                              required
                              className={`w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary ${
                                errors.tradeInVin ? 'border-red-500' : 'border-gray-300'
                              }`}
                              value={formData.tradeIn?.vin || ''}
                              onChange={(e) =>
                                handleTradeInFieldChange('vin', e.target.value)
                              }
                            />
                            {errors.tradeInVin && (
                              <p className="mt-1 text-sm text-red-500">{errors.tradeInVin}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Unfallfrei *
                            </label>
                            <div className="space-y-2">
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  required
                                  className="mr-2"
                                  checked={formData.tradeIn?.accidentFree === true}
                                  onChange={() =>
                                    handleTradeInFieldChange('accidentFree', true)
                                  }
                                />
                                Ja
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  required
                                  className="mr-2"
                                  checked={formData.tradeIn?.accidentFree === false}
                                  onChange={() =>
                                    handleTradeInFieldChange('accidentFree', false)
                                  }
                                />
                                Nein
                              </label>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Nachlackierungsfrei *
                            </label>
                            <div className="space-y-2">
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  required
                                  className="mr-2"
                                  checked={formData.tradeIn?.repaintFree === true}
                                  onChange={() =>
                                    handleTradeInFieldChange('repaintFree', true)
                                  }
                                />
                                Ja
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  required
                                  className="mr-2"
                                  checked={formData.tradeIn?.repaintFree === false}
                                  onChange={() =>
                                    handleTradeInFieldChange('repaintFree', false)
                                  }
                                />
                                Nein
                              </label>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Mehrwertsteuer ausweisbar *
                            </label>
                            <div className="space-y-2">
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  required
                                  className="mr-2"
                                  checked={formData.tradeIn?.vatDeductible === true}
                                  onChange={() =>
                                    handleTradeInFieldChange('vatDeductible', true)
                                  }
                                />
                                Ja
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  required
                                  className="mr-2"
                                  checked={formData.tradeIn?.vatDeductible === false}
                                  onChange={() =>
                                    handleTradeInFieldChange('vatDeductible', false)
                                  }
                                />
                                Nein
                              </label>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Halteranzahl *
                            </label>
                            <input
                              type="number"
                              required
                              min="1"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                              value={formData.tradeIn?.ownerCount || 1}
                              onChange={(e) =>
                                handleTradeInFieldChange(
                                  'ownerCount',
                                  parseInt(e.target.value)
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end gap-4 mt-6">
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 hover:text-gray-900"
                      >
                        Abbrechen
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Wird verarbeitet...' : 'Jetzt Nachlass / Score anzeigen'}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Ergebnisanzeige mit Fade-Animation */}
            <div
              className={`transition-opacity duration-300 ${
                step === 2 ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {step === 2 && (
                <div className="p-6">
                  <Dialog.Title className="text-2xl font-bold text-gray-900 mb-6">
                    {vehicleType === 'new'
                      ? 'Ihr möglicher Nachlass'
                      : 'Ihr PAPRICAR Score'}
                  </Dialog.Title>

                  {vehicleType === 'new' ? (
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary mb-2">
                        Bis zu 19%
                      </div>
                      <p className="text-gray-600">
                        bei {formData.interest === 'cash' && 'Barkauf'}
                        {formData.interest === 'finance' && 'Finanzierung'}
                        {formData.interest === 'leasing' && 'Leasing'}
                        {formData.interest === 'testDrive' && 'Probefahrt'}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-primary mb-2">
                          Sehr gut
                        </div>
                        <p className="text-gray-600">PAPRICAR Score</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-500">Wertverlust</p>
                          <p className="text-xl font-bold text-gray-900">
                            -2.500 €
                          </p>
                          <p className="text-sm text-gray-500">-8%</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-500">
                            Preisabweichung zu Vergleichsmodellen
                          </p>
                          <p className="text-xl font-bold text-gray-900">
                            -1.200 €
                          </p>
                          <p className="text-sm text-gray-500">-4%</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-center gap-4 mt-8">
                    <button
                      onClick={handleInterested}
                      className="px-6 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors"
                    >
                      Ich bin interessiert
                    </button>
                    <button
                      onClick={onClose}
                      className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Ich bin nicht interessiert
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
} 