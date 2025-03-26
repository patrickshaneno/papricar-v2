export type VehicleType = 'new' | 'stock' | 'dayregistration' | 'yearold'
export type FuelType = 'petrol' | 'diesel' | 'electric' | 'hybrid_petrol' | 'hybrid_diesel'
export type BodyType = 'limousine' | 'kombi' | 'suv' | 'coupe' | 'cabrio' | 'van'
export type Transmission = 'manual' | 'automatic'
export type VehicleStatus = 'draft' | 'active' | 'sold'
export type EmissionClass = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'

export interface Vehicle {
  id: string
  type: VehicleType
  brand: string
  model: string
  title: string
  vin?: string
  year: number
  registration_date?: Date
  mileage: number
  delivery_month: number
  delivery_year: number
  exterior_color: string
  exterior_color_text?: string
  interior_color: string
  interior_color_text?: string
  body_type: BodyType
  transmission: Transmission
  fuel_type: FuelType
  power_ps: number
  power_kw: number
  
  // Consumption values
  fuel_consumption_combined?: number
  electric_consumption_combined?: number
  fuel_consumption_battery_empty?: number
  electric_consumption_battery_empty?: number
  co2_emissions: number
  co2_class: EmissionClass
  co2_class_battery_empty?: EmissionClass
  
  // Pricing
  price: number
  leasing_rate?: number
  cash_discount?: number
  financing_discount?: number
  leasing_discount?: number
  
  // Images
  images: string[]
  preview_image?: string
  
  // Management
  status: VehicleStatus
  created_at: Date
  updated_at: Date
  dealer_id: string
}

export interface VehicleFormData extends Omit<Vehicle, 'id' | 'created_at' | 'updated_at' | 'status'> {
  vat: number;
  negotiable: boolean;
  fuel_consumption: number;
  emission_class: string;
  co2_class: EmissionClass;
  co2_class_battery_empty?: EmissionClass;
  fuel_consumption_combined?: number;
  electric_consumption_combined?: number;
  fuel_consumption_battery_empty?: number;
  electric_consumption_battery_empty?: number;
  leasing_rate?: number;
  cash_discount?: number;
  financing_discount?: number;
  leasing_discount?: number;
} 