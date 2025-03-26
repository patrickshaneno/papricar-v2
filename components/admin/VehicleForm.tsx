'use client'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select'
import { Card } from '@/components/ui/Card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { toast } from 'sonner'
import { DatePicker } from '@/components/ui/DatePicker'
import { ImageUpload } from '@/components/ui/ImageUpload'

// Fahrzeugarten
const VEHICLE_TYPES = [
  { value: 'new', label: 'Neuwagen' },
  { value: 'stock', label: 'Lagerwagen' },
  { value: 'daily', label: 'Tageszulassung' },
  { value: 'year', label: 'Jahreswagen' },
] as const

// Kraftstoffarten
const FUEL_TYPES = [
  { value: 'petrol', label: 'Benzin' },
  { value: 'diesel', label: 'Diesel' },
  { value: 'electric', label: 'Elektro' },
  { value: 'petrol_hybrid', label: 'Benzin-Hybrid' },
  { value: 'diesel_hybrid', label: 'Diesel-Hybrid' },
] as const

// Validierungsschema
const vehicleSchema = z.object({
  // Fahrzeugdetails
  vehicleType: z.enum(['new', 'stock', 'daily', 'year']),
  brand: z.string().min(1, 'Marke ist erforderlich'),
  model: z.string().min(1, 'Modell ist erforderlich'),
  title: z.string().min(3, 'Titel muss mindestens 3 Zeichen lang sein'),
  vehicleId: z.string().optional(),
  year: z.number().min(1900).max(new Date().getFullYear() + 1),
  firstRegistration: z.date().optional(),
  mileage: z.number().min(0).optional(),
  deliveryDate: z.date().optional(),
  exteriorColor: z.string().optional(),
  interiorColor: z.string().optional(),
  bodyType: z.string().optional(),
  transmission: z.string().optional(),
  fuelType: z.enum(['petrol', 'diesel', 'electric', 'petrol_hybrid', 'diesel_hybrid']),
  powerPS: z.number().min(0).optional(),
  powerKW: z.number().min(0).optional(),

  // Verbrauchswerte
  fuelConsumption: z.number().min(0).optional(),
  co2Emissions: z.number().min(0).optional(),
  co2Class: z.string().optional(),
  electricConsumption: z.number().min(0).optional(),
  hybridFuelConsumption: z.number().min(0).optional(),
  hybridElectricConsumption: z.number().min(0).optional(),
  hybridCo2Emissions: z.number().min(0).optional(),
  hybridCo2Class: z.string().optional(),
  hybridCo2ClassCombined: z.string().optional(),

  // Preis & Rabatte
  price: z.number().min(0),
  leasingRate: z.number().min(0).optional(),
  cashDiscount: z.number().min(0).max(100).optional(),
  financeDiscount: z.number().min(0).max(100).optional(),
  leasingDiscount: z.number().min(0).max(100).optional(),

  // Status
  status: z.enum(['draft', 'published', 'sold']),
})

type VehicleFormData = z.infer<typeof vehicleSchema>

export default function VehicleForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedBrand, setSelectedBrand] = useState('')
  const [models, setModels] = useState<string[]>([])
  const supabase = createClientComponentClient()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      status: 'draft',
      vehicleType: 'new',
    },
  })

  const vehicleType = watch('vehicleType')
  const fuelType = watch('fuelType')

  // Lade Modelle basierend auf ausgewählter Marke
  useEffect(() => {
    if (selectedBrand) {
      // Hier API-Aufruf für Modelle implementieren
      setModels(['Modell 1', 'Modell 2', 'Modell 3'])
    }
  }, [selectedBrand])

  const onSubmit = async (data: VehicleFormData) => {
    try {
      setIsLoading(true)
      // Hier Logik zum Speichern implementieren
      toast.success('Fahrzeug erfolgreich gespeichert')
    } catch (error) {
      console.error('Fehler beim Speichern:', error)
      toast.error('Fehler beim Speichern des Fahrzeugs')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="details">Fahrzeugdetails</TabsTrigger>
          <TabsTrigger value="consumption">Verbrauch</TabsTrigger>
          <TabsTrigger value="price">Preis & Rabatte</TabsTrigger>
          <TabsTrigger value="images">Bilder</TabsTrigger>
          <TabsTrigger value="status">Status</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Fahrzeugart</label>
                <Select
                  onValueChange={(value) => setValue('vehicleType', value as any)}
                  defaultValue={vehicleType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Wählen Sie die Fahrzeugart" />
                  </SelectTrigger>
                  <SelectContent>
                    {VEHICLE_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Marke</label>
                <Select
                  onValueChange={(value) => {
                    setSelectedBrand(value)
                    setValue('brand', value)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Wählen Sie die Marke" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="audi">Audi</SelectItem>
                    <SelectItem value="bmw">BMW</SelectItem>
                    <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                    {/* Weitere Marken hier */}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Modell</label>
                <Select
                  onValueChange={(value) => setValue('model', value)}
                  disabled={!selectedBrand}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Wählen Sie das Modell" />
                  </SelectTrigger>
                  <SelectContent>
                    {models.map((model) => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Fahrzeug-Titel</label>
                <Input {...register('title')} />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Fahrzeugkennung</label>
                <Input {...register('vehicleId')} />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Modelljahr</label>
                <Input
                  type="number"
                  {...register('year', { valueAsNumber: true })}
                />
                {errors.year && (
                  <p className="text-red-500 text-sm mt-1">{errors.year.message}</p>
                )}
              </div>

              {(vehicleType === 'daily' || vehicleType === 'year') && (
                <div>
                  <label className="block text-sm font-medium mb-2">Erstzulassung</label>
                  <DatePicker
                    onChange={(date) => setValue('firstRegistration', date)}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">Kilometerstand</label>
                <Input
                  type="number"
                  {...register('mileage', { valueAsNumber: true })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Lieferdatum</label>
                <DatePicker
                  onChange={(date) => setValue('deliveryDate', date)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Exterieurfarbe</label>
                <Select
                  onValueChange={(value) => setValue('exteriorColor', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Wählen Sie die Farbe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="black">Schwarz</SelectItem>
                    <SelectItem value="white">Weiß</SelectItem>
                    <SelectItem value="red">Rot</SelectItem>
                    {/* Weitere Farben hier */}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Interieurfarbe</label>
                <Select
                  onValueChange={(value) => setValue('interiorColor', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Wählen Sie die Farbe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="black">Schwarz</SelectItem>
                    <SelectItem value="beige">Beige</SelectItem>
                    <SelectItem value="brown">Braun</SelectItem>
                    {/* Weitere Farben hier */}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Karosserie</label>
                <Select
                  onValueChange={(value) => setValue('bodyType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Wählen Sie die Karosserie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedan">Limousine</SelectItem>
                    <SelectItem value="suv">SUV</SelectItem>
                    <SelectItem value="hatchback">Kombi</SelectItem>
                    {/* Weitere Karosserieformen hier */}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Getriebe</label>
                <Select
                  onValueChange={(value) => setValue('transmission', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Wählen Sie das Getriebe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">Schaltgetriebe</SelectItem>
                    <SelectItem value="automatic">Automatik</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Kraftstoffart</label>
                <Select
                  onValueChange={(value) => setValue('fuelType', value as any)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Wählen Sie die Kraftstoffart" />
                  </SelectTrigger>
                  <SelectContent>
                    {FUEL_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Leistung (PS)</label>
                <Input
                  type="number"
                  {...register('powerPS', { valueAsNumber: true })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Leistung (kW)</label>
                <Input
                  type="number"
                  {...register('powerKW', { valueAsNumber: true })}
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="consumption">
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(fuelType === 'petrol' || fuelType === 'diesel') && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Kraftstoffverbrauch kombiniert (l/100 km)
                    </label>
                    <Input
                      type="number"
                      step="0.1"
                      {...register('fuelConsumption', { valueAsNumber: true })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      CO₂-Emissionen (g/km)
                    </label>
                    <Input
                      type="number"
                      {...register('co2Emissions', { valueAsNumber: true })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      CO₂-Klasse
                    </label>
                    <Select
                      onValueChange={(value) => setValue('co2Class', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Wählen Sie die CO₂-Klasse" />
                      </SelectTrigger>
                      <SelectContent>
                        {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((cls) => (
                          <SelectItem key={cls} value={cls}>
                            {cls}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {fuelType === 'electric' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Elektrischer Verbrauch kombiniert (kWh/100 km)
                    </label>
                    <Input
                      type="number"
                      step="0.1"
                      {...register('electricConsumption', { valueAsNumber: true })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      CO₂-Emissionen (g/km)
                    </label>
                    <Input
                      type="number"
                      {...register('co2Emissions', { valueAsNumber: true })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      CO₂-Klasse
                    </label>
                    <Select
                      onValueChange={(value) => setValue('co2Class', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Wählen Sie die CO₂-Klasse" />
                      </SelectTrigger>
                      <SelectContent>
                        {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((cls) => (
                          <SelectItem key={cls} value={cls}>
                            {cls}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {(fuelType === 'petrol_hybrid' || fuelType === 'diesel_hybrid') && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Kraftstoffverbrauch kombiniert (l/100 km)
                    </label>
                    <Input
                      type="number"
                      step="0.1"
                      {...register('hybridFuelConsumption', { valueAsNumber: true })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Verbrauch bei entladener Batterie (l/100 km)
                    </label>
                    <Input
                      type="number"
                      step="0.1"
                      {...register('fuelConsumption', { valueAsNumber: true })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Elektrischer Verbrauch kombiniert (kWh/100 km)
                    </label>
                    <Input
                      type="number"
                      step="0.1"
                      {...register('hybridElectricConsumption', { valueAsNumber: true })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      CO₂-Emissionen kombiniert (g/km)
                    </label>
                    <Input
                      type="number"
                      {...register('hybridCo2Emissions', { valueAsNumber: true })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      CO₂-Klasse entladene Batterie
                    </label>
                    <Select
                      onValueChange={(value) => setValue('hybridCo2Class', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Wählen Sie die CO₂-Klasse" />
                      </SelectTrigger>
                      <SelectContent>
                        {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((cls) => (
                          <SelectItem key={cls} value={cls}>
                            {cls}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      CO₂-Klasse gewichtet kombiniert
                    </label>
                    <Select
                      onValueChange={(value) => setValue('hybridCo2ClassCombined', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Wählen Sie die CO₂-Klasse" />
                      </SelectTrigger>
                      <SelectContent>
                        {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((cls) => (
                          <SelectItem key={cls} value={cls}>
                            {cls}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="price">
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Fahrzeugpreis (brutto, inkl. 19% MwSt.)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  {...register('price', { valueAsNumber: true })}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Leasingrate
                </label>
                <Input
                  type="number"
                  step="0.01"
                  {...register('leasingRate', { valueAsNumber: true })}
                />
              </div>

              {vehicleType === 'new' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Rabatt bei Barkauf (%)
                    </label>
                    <Input
                      type="number"
                      step="0.1"
                      {...register('cashDiscount', { valueAsNumber: true })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Rabatt bei Finanzierung (%)
                    </label>
                    <Input
                      type="number"
                      step="0.1"
                      {...register('financeDiscount', { valueAsNumber: true })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Rabatt bei Leasing (%)
                    </label>
                    <Input
                      type="number"
                      step="0.1"
                      {...register('leasingDiscount', { valueAsNumber: true })}
                    />
                  </div>
                </>
              )}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="images">
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Fahrzeugbilder
                </label>
                <ImageUpload
                  multiple
                  onUpload={(urls) => {
                    // Hier Logik zum Speichern der Bild-URLs implementieren
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Vorschaubild
                </label>
                <ImageUpload
                  onUpload={(url) => {
                    // Hier Logik zum Speichern der Vorschaubild-URL implementieren
                  }}
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="status">
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Status
                </label>
                <Select
                  onValueChange={(value) => setValue('status', value as any)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Wählen Sie den Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Entwurf</SelectItem>
                    <SelectItem value="published">Veröffentlicht</SelectItem>
                    <SelectItem value="sold">Verkauft</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setValue('status', 'draft')
                    handleSubmit(onSubmit)()
                  }}
                  disabled={isLoading}
                >
                  Speichern
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setValue('status', 'published')
                    handleSubmit(onSubmit)()
                  }}
                  disabled={isLoading}
                >
                  Speichern & veröffentlichen
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    // Hier Logik zum Duplizieren implementieren
                  }}
                >
                  Fahrzeug duplizieren
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setValue('status', 'sold')
                    handleSubmit(onSubmit)()
                  }}
                  disabled={isLoading}
                >
                  Als verkauft markieren
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </form>
  )
} 