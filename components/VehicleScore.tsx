'use client'

import { VehicleScore } from '@/lib/vehicleScore'

interface VehicleScoreProps {
  score: VehicleScore
}

export default function VehicleScoreDisplay({ score }: VehicleScoreProps) {
  const getScoreColor = (classification: string) => {
    switch (classification) {
      case 'Sehr gut':
      case 'Gut':
        return 'bg-green-100 text-green-800'
      case 'Fair':
        return 'bg-orange-100 text-orange-800'
      case 'Hochpreisig':
        return 'bg-gray-100 text-gray-800'
      case 'Nicht empfohlen':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          PAPRICAR Score
        </h3>
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">
            {score.totalScore}/100
          </span>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getScoreColor(
              score.classification
            )}`}
          >
            {score.classification}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">
            Wertverlust seit Erstzulassung
          </h4>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-900">
                {score.depreciation.amount.toLocaleString('de-DE')} €
              </span>
              <span className="text-sm font-medium text-green-600">
                ({score.depreciation.percentage.toFixed(1)}%)
              </span>
            </div>
            <span className="text-sm font-medium text-gray-600">
              {score.depreciation.score} Punkte
            </span>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">
            Preisvergleich zum Markt
          </h4>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-900">
                {score.priceComparison.difference.toLocaleString('de-DE')} €
              </span>
              <span className="text-sm font-medium text-green-600">
                ({score.priceComparison.percentage.toFixed(1)}% günstiger)
              </span>
            </div>
            <span className="text-sm font-medium text-gray-600">
              {score.priceComparison.score} Punkte
            </span>
          </div>
        </div>

        {score.extraScore > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">
              Zusätzliche Punkte
            </h4>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-900">
                Ausstattung & Zustand
              </span>
              <span className="text-sm font-medium text-gray-600">
                {score.extraScore} Punkte
              </span>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Bruttolistenpreis</span>
              <p className="font-medium text-gray-900">
                {score.originalPrice.toLocaleString('de-DE')} €
              </p>
            </div>
            <div>
              <span className="text-gray-500">Aktueller Preis</span>
              <p className="font-medium text-gray-900">
                {score.currentPrice.toLocaleString('de-DE')} €
              </p>
            </div>
            <div>
              <span className="text-gray-500">Marktpreis</span>
              <p className="font-medium text-gray-900">
                {score.marketPrice.toLocaleString('de-DE')} €
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 