'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { Upload, AlertCircle, CheckCircle } from 'lucide-react'

interface CSVRow {
  fahrzeugart: string
  marke: string
  modell: string
  titel: string
  modelljahr: string
  preis: string
  erstzulassung: string
  km: string
  leistung_ps: string
  leistung_kw: string
  kraftstoffart: string
  getriebe: string
  farbe_exterieur: string
  farbe_interieur: string
  rabatt_barkauf: string
  rabatt_leasing: string
  rabatt_finanzierung: string
  status: string
}

interface ValidationError {
  row: number
  field: string
  message: string
}

interface ImportSummary {
  successCount: number
  errorCount: number
}

export default function VehicleImport() {
  const router = useRouter()
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [csvData, setCsvData] = useState<CSVRow[]>([])
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([])
  const [showPreview, setShowPreview] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [importSummary, setImportSummary] = useState<ImportSummary | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const validateRow = (row: CSVRow, index: number): ValidationError[] => {
    const errors: ValidationError[] = []

    // Pflichtfelder prüfen
    if (!row.fahrzeugart) errors.push({ row: index, field: 'fahrzeugart', message: 'Fahrzeugart fehlt' })
    if (!row.marke) errors.push({ row: index, field: 'marke', message: 'Marke fehlt' })
    if (!row.modell) errors.push({ row: index, field: 'modell', message: 'Modell fehlt' })
    if (!row.titel) errors.push({ row: index, field: 'titel', message: 'Titel fehlt' })
    if (!row.modelljahr) errors.push({ row: index, field: 'modelljahr', message: 'Modelljahr fehlt' })
    if (!row.preis) errors.push({ row: index, field: 'preis', message: 'Preis fehlt' })

    // Formatierung prüfen
    if (row.preis && isNaN(Number(row.preis))) {
      errors.push({ row: index, field: 'preis', message: 'Ungültiges Preisformat' })
    }
    if (row.modelljahr && isNaN(Number(row.modelljahr))) {
      errors.push({ row: index, field: 'modelljahr', message: 'Ungültiges Jahr' })
    }
    if (row.km && isNaN(Number(row.km))) {
      errors.push({ row: index, field: 'km', message: 'Ungültige Kilometerangabe' })
    }

    return errors
  }

  const parseCSV = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      const rows = text.split('\n')
      const headers = rows[0].split(',').map(h => h.trim())
      
      const data: CSVRow[] = rows.slice(1).map(row => {
        const values = row.split(',').map(v => v.trim())
        return headers.reduce((obj, header, index) => {
          obj[header as keyof CSVRow] = values[index] || ''
          return obj
        }, {} as CSVRow)
      })

      // Validierung
      const errors: ValidationError[] = []
      data.forEach((row, index) => {
        errors.push(...validateRow(row, index + 2)) // +2 wegen Header und 0-basierter Index
      })

      setCsvData(data)
      setValidationErrors(errors)
      setShowPreview(true)
    }
    reader.readAsText(file)
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file && file.type === 'text/csv') {
      parseCSV(file)
    } else {
      setUploadError('Bitte nur CSV-Dateien hochladen')
    }
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === 'text/csv') {
      parseCSV(file)
    } else {
      setUploadError('Bitte nur CSV-Dateien hochladen')
    }
  }, [])

  const handleImport = async () => {
    try {
      setIsUploading(true)
      setUploadError(null)
      setImportSummary(null)

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      // Nur gültige Zeilen importieren
      const validRows = csvData.filter((_, index) => 
        !validationErrors.some(error => error.row === index + 2)
      )

      // Fahrzeuge in Supabase speichern
      const { error: insertError } = await supabase
        .from('vehicles')
        .insert(
          validRows.map(row => ({
            dealer_id: user.id,
            status: 'entwurf',
            vehicle_type: row.fahrzeugart,
            brand: row.marke,
            model: row.modell,
            title: row.titel,
            year: parseInt(row.modelljahr),
            price: parseFloat(row.preis),
            first_registration: row.erstzulassung,
            mileage: parseInt(row.km),
            power_hp: parseInt(row.leistung_ps),
            power_kw: parseInt(row.leistung_kw),
            fuel_type: row.kraftstoffart,
            transmission: row.getriebe,
            exterior_color: row.farbe_exterieur,
            interior_color: row.farbe_interieur,
            cash_discount: parseFloat(row.rabatt_barkauf),
            leasing_discount: parseFloat(row.rabatt_leasing),
            financing_discount: parseFloat(row.rabatt_finanzierung),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }))
        )

      if (insertError) {
        throw insertError
      }

      // Zusammenfassung anzeigen
      setImportSummary({
        successCount: validRows.length,
        errorCount: validationErrors.length
      })

      // Formular zurücksetzen
      setCsvData([])
      setValidationErrors([])
      setShowPreview(false)
    } catch (error) {
      setUploadError('Fehler beim Importieren der Fahrzeuge')
      console.error('Import error:', error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">
          Fahrzeuge importieren
        </h1>

        {/* Upload Area */}
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center ${
            isDragging
              ? 'border-purple-500 bg-purple-50'
              : 'border-gray-300 hover:border-purple-500'
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={(e) => {
            e.preventDefault()
            setIsDragging(false)
          }}
        >
          <input
            type="file"
            accept=".csv"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="space-y-2">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="text-sm text-gray-600">
              <p>
                {isDragging
                  ? 'Datei hier ablegen'
                  : 'CSV-Datei hierher ziehen oder klicken zum Auswählen'}
              </p>
              <p className="mt-1">
                Nur CSV-Dateien, max. 5MB
              </p>
            </div>
          </div>
        </div>

        {uploadError && (
          <div className="mt-4 p-4 bg-red-50 rounded-md">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400 mr-3" />
              <p className="text-sm text-red-700">{uploadError}</p>
            </div>
          </div>
        )}

        {importSummary && (
          <div className="mt-4 p-4 bg-green-50 rounded-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700">
                  {importSummary.successCount} Fahrzeuge erfolgreich importiert
                </p>
                {importSummary.errorCount > 0 && (
                  <p className="text-sm text-green-700 mt-1">
                    {importSummary.errorCount} Zeilen mit Fehlern übersprungen
                  </p>
                )}
              </div>
              <button
                onClick={() => router.push('/dealer/vehicles')}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Zum Fahrzeugbestand
              </button>
            </div>
          </div>
        )}

        {/* Preview Table */}
        {showPreview && (
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Vorschau der Daten
            </h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {Object.keys(csvData[0] || {}).map((header) => (
                      <th
                        key={header}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {csvData.slice(0, 5).map((row, index) => {
                    const rowErrors = validationErrors.filter(error => error.row === index + 2)
                    return (
                      <tr
                        key={index}
                        className={rowErrors.length > 0 ? 'bg-red-50' : 'bg-green-50'}
                      >
                        {Object.values(row).map((value, cellIndex) => (
                          <td
                            key={cellIndex}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                          >
                            {value}
                          </td>
                        ))}
                        <td className="px-6 py-4 whitespace-nowrap">
                          {rowErrors.length > 0 ? (
                            <div className="flex items-center text-red-600">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              <span className="text-xs">{rowErrors.length} Fehler</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-green-600">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              <span className="text-xs">Gültig</span>
                            </div>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Validation Errors */}
            {validationErrors.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Fehler in den Daten:
                </h3>
                <ul className="space-y-2">
                  {validationErrors.map((error, index) => (
                    <li key={index} className="text-sm text-red-600">
                      Zeile {error.row}: {error.message}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Import Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleImport}
                disabled={isUploading || validationErrors.length > 0}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? 'Importiere...' : 'Fahrzeuge importieren'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 