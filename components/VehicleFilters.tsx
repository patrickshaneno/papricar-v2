import { useState } from 'react'

interface FilterProps {
  onFilterChange: (filters: any) => void
}

export default function VehicleFilters({ onFilterChange }: FilterProps) {
  const [selectedBrand, setSelectedBrand] = useState('')

  const brands = [
    'Audi',
    'BMW',
    'Mercedes-Benz',
    'Volkswagen',
    'Porsche',
    'Opel',
    'Ford',
    'Toyota',
    'Hyundai',
    'Kia',
  ]

  const models = {
    'Volkswagen': ['Golf', 'Passat', 'Tiguan', 'Polo', 'Arteon'],
    'BMW': ['3er', '5er', 'X3', 'X5', 'M3'],
    'Mercedes-Benz': ['C-Klasse', 'E-Klasse', 'GLC', 'GLE', 'A-Klasse'],
    // ... weitere Modelle
  }

  const vehicleTypes = [
    'Neuwagen',
    'Lagerwagen',
    'Tageszulassung',
    'Jahreswagen',
  ]

  const bodyTypes = [
    'Limousine',
    'SUV',
    'Kombi',
    'Coupé',
    'Cabriolet',
    'Van',
  ]

  const fuelTypes = [
    'Benzin',
    'Diesel',
    'Elektro',
    'Hybrid',
    'Plug-in Hybrid',
    'CNG',
  ]

  const transmissionTypes = ['Automatik', 'Schaltgetriebe']

  const colors = [
    'Schwarz',
    'Weiß',
    'Grau',
    'Silber',
    'Blau',
    'Rot',
    'Grün',
    'Gelb',
    'Braun',
    'Beige',
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="space-y-4">
        {/* Fahrzeugart */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fahrzeugart
          </label>
          <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary">
            <option value="">Alle</option>
            {vehicleTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Marke & Modell */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Marke
            </label>
            <select
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              <option value="">Alle</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Modell
            </label>
            <select
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              disabled={!selectedBrand}
            >
              <option value="">Alle</option>
              {selectedBrand &&
                models[selectedBrand as keyof typeof models]?.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Baujahr Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Baujahr
          </label>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Von"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
            <input
              type="number"
              placeholder="Bis"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>
        </div>

        {/* Kilometerstand Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Kilometerstand
          </label>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Von"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
            <input
              type="number"
              placeholder="Bis"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>
        </div>

        {/* Preis Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preis
          </label>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Von"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
            <input
              type="number"
              placeholder="Bis"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>
        </div>

        {/* Leasingrate Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Leasingrate
          </label>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Von"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
            <input
              type="number"
              placeholder="Bis"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>
        </div>

        {/* Karosserie */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Karosserie
          </label>
          <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary">
            <option value="">Alle</option>
            {bodyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Kraftstoffart */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Kraftstoffart
          </label>
          <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary">
            <option value="">Alle</option>
            {fuelTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Getriebe */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Getriebe
          </label>
          <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary">
            <option value="">Alle</option>
            {transmissionTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Exterieurfarbe */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Exterieurfarbe
          </label>
          <div className="grid grid-cols-2 gap-4">
            <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary">
              <option value="">Auswählen</option>
              {colors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Andere Farbe"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>
        </div>

        {/* Interieurfarbe */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Interieurfarbe
          </label>
          <div className="grid grid-cols-2 gap-4">
            <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary">
              <option value="">Auswählen</option>
              {colors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Andere Farbe"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>
        </div>

        {/* Lieferdatum */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lieferdatum
          </label>
          <div className="grid grid-cols-2 gap-4">
            <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary">
              <option value="">Monat</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(2000, i).toLocaleString('de-DE', { month: 'long' })}
                </option>
              ))}
            </select>
            <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary">
              <option value="">Jahr</option>
              {Array.from({ length: 5 }, (_, i) => (
                <option key={i} value={new Date().getFullYear() + i}>
                  {new Date().getFullYear() + i}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Unfallstatus */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Unfallstatus
          </label>
          <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary">
            <option value="">Alle</option>
            <option value="unfallfrei">Unfallfrei</option>
            <option value="unfallfrei">Unfallfrei</option>
          </select>
        </div>

        {/* Inzahlungnahme */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Inzahlungnahme
          </label>
          <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary">
            <option value="">Alle</option>
            <option value="true">Ja</option>
            <option value="false">Nein</option>
          </select>
        </div>
      </div>
    </div>
  )
} 