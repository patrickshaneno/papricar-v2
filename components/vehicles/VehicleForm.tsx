'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Tab } from '@headlessui/react'
import { VehicleFormData } from '@/types/vehicle'
import VehicleDetailsSection from '@/components/vehicles/form-sections/VehicleDetailsSection'
import ConsumptionSection from '@/components/vehicles/form-sections/ConsumptionSection'
import PricingSection from '@/components/vehicles/form-sections/PricingSection'
import ImagesSection from '@/components/vehicles/form-sections/ImagesSection'
import ManagementSection from '@/components/vehicles/form-sections/ManagementSection'

interface VehicleFormProps {
  initialData?: VehicleFormData
  onSubmit: (data: VehicleFormData) => Promise<void>
  isLoading?: boolean
}

const schema = z.object({
  // Section 1: Vehicle Details
  type: z.enum(['new', 'stock', 'dayregistration', 'yearold']),
  brand: z.string().min(1, 'Marke ist erforderlich'),
  model: z.string().min(1, 'Modell ist erforderlich'),
  title: z.string().min(1, 'Titel ist erforderlich'),
  vin: z.string().optional(),
  year: z.number().min(1900).max(new Date().getFullYear() + 1),
  registration_date: z.string().optional().transform((val) => val ? new Date(val) : undefined),
  mileage: z.number().min(0),
  delivery_month: z.number().min(1).max(12),
  delivery_year: z.number().min(new Date().getFullYear()),
  exterior_color: z.string().min(1, 'Außenfarbe ist erforderlich'),
  exterior_color_text: z.string().optional(),
  interior_color: z.string().min(1, 'Innenfarbe ist erforderlich'),
  interior_color_text: z.string().optional(),
  body_type: z.enum(['limousine', 'kombi', 'suv', 'coupe', 'cabrio', 'van']),
  transmission: z.enum(['manual', 'automatic']),
  fuel_type: z.enum(['petrol', 'diesel', 'electric', 'hybrid_petrol', 'hybrid_diesel']),
  power_ps: z.number().min(1),
  power_kw: z.number().min(1),

  // Section 2: Consumption
  fuel_consumption: z.number(),
  co2_emissions: z.number(),
  emission_class: z.string(),
  co2_class: z.enum(['A', 'B', 'C', 'D', 'E', 'F', 'G']),
  co2_class_battery_empty: z.enum(['A', 'B', 'C', 'D', 'E', 'F', 'G']).optional(),

  // Section 3: Pricing
  price: z.number().min(0),
  vat: z.number(),
  negotiable: z.boolean(),
  leasing_rate: z.number().optional(),
  cash_discount: z.number().optional(),
  financing_discount: z.number().optional(),
  leasing_discount: z.number().optional(),

  // Section 4: Images
  images: z.array(z.string()),
  preview_image: z.string().optional(),

  // Section 5: Management
  dealer_id: z.string()
})

export default function VehicleForm({ initialData, onSubmit, isLoading }: VehicleFormProps) {
  const [selectedTab, setSelectedTab] = useState(0)
  const [isDirty, setIsDirty] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control
  } = useForm<VehicleFormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData || {
      type: 'new',
      images: [],
      mileage: 0,
      vat: 19,
      negotiable: false,
      fuel_consumption: 0,
      co2_emissions: 0,
      emission_class: 'euro6',
      co2_class: 'A',
      registration_date: undefined
    }
  })

  const watchFuelType = watch('fuel_type')
  const watchType = watch('type')

  const handleFormSubmit = async (data: VehicleFormData) => {
    try {
      await onSubmit(data)
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  const tabClassNames = {
    list: 'flex space-x-1 rounded-xl bg-purple-900/20 p-1',
    tab: ({ selected }: { selected: boolean }) =>
      `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-purple-700
        ring-white ring-opacity-60 ring-offset-2 ring-offset-purple-400 focus:outline-none focus:ring-2
        ${selected
          ? 'bg-white shadow'
          : 'text-purple-100 hover:bg-white/[0.12] hover:text-white'
      }`
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <Tab.List className={tabClassNames.list}>
          <Tab className={tabClassNames.tab}>Fahrzeugdetails</Tab>
          <Tab className={tabClassNames.tab}>Verbrauchswerte</Tab>
          <Tab className={tabClassNames.tab}>Preis & Rabatte</Tab>
          <Tab className={tabClassNames.tab}>Bilder</Tab>
          <Tab className={tabClassNames.tab}>Management</Tab>
        </Tab.List>

        <Tab.Panels className="mt-8">
          <Tab.Panel>
            <VehicleDetailsSection
              register={register}
              errors={errors}
              control={control}
              watch={watch}
              setValue={setValue}
            />
          </Tab.Panel>

          <Tab.Panel>
            <ConsumptionSection
              register={register}
              errors={errors}
              control={control}
              fuelType={watchFuelType}
            />
          </Tab.Panel>

          <Tab.Panel>
            <PricingSection
              register={register}
              errors={errors}
              control={control}
              vehicleType={watchType}
            />
          </Tab.Panel>

          <Tab.Panel>
            <ImagesSection
              register={register}
              errors={errors}
              control={control}
              setValue={setValue}
              watch={watch}
            />
          </Tab.Panel>

          <Tab.Panel>
            <ManagementSection
              register={register}
              errors={errors}
              control={control}
              isDirty={isDirty}
              isLoading={isLoading}
              onDuplicate={() => {}}
              onMarkAsSold={() => {}}
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:static md:bg-transparent md:border-0">
        <div className="flex justify-end space-x-4 max-w-7xl mx-auto">
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            {isLoading ? 'Wird gespeichert...' : 'Speichern'}
          </button>
        </div>
      </div>
    </form>
  )
} 