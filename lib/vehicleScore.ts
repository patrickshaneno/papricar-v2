export interface VehicleScore {
  originalPrice: number
  currentPrice: number
  marketPrice: number
  depreciation: {
    amount: number
    percentage: number
    score: number
  }
  priceComparison: {
    difference: number
    percentage: number
    score: number
  }
  extraScore: number
  totalScore: number
  classification: 'Sehr gut' | 'Gut' | 'Fair' | 'Hochpreisig' | 'Nicht empfohlen'
}

export function calculateVehicleScore(
  originalPrice: number,
  currentPrice: number,
  marketPrice: number,
  extraScore: number = 0
): VehicleScore {
  // Berechne Wertverlust (max 40 Punkte)
  const depreciationAmount = originalPrice - currentPrice
  const depreciationPercentage = (depreciationAmount / originalPrice) * 100
  const depreciationScore = Math.min(40, depreciationPercentage * 2) // 2 Punkte pro Prozent

  // Berechne Preisvergleich (max 40 Punkte)
  const priceDifference = marketPrice - currentPrice
  const priceComparisonPercentage = (priceDifference / marketPrice) * 100
  const marketScore = Math.min(40, priceComparisonPercentage * 2) // 2 Punkte pro Prozent

  // Extra-Score (max 20 Punkte)
  const cappedExtraScore = Math.min(20, extraScore)

  // Gesamtscore berechnen
  const totalScore = Math.min(100, depreciationScore + marketScore + cappedExtraScore)

  // Klassifikation basierend auf Gesamtscore
  let classification: 'Sehr gut' | 'Gut' | 'Fair' | 'Hochpreisig' | 'Nicht empfohlen'
  if (totalScore >= 85) {
    classification = 'Sehr gut'
  } else if (totalScore >= 70) {
    classification = 'Gut'
  } else if (totalScore >= 55) {
    classification = 'Fair'
  } else if (totalScore >= 40) {
    classification = 'Hochpreisig'
  } else {
    classification = 'Nicht empfohlen'
  }

  return {
    originalPrice,
    currentPrice,
    marketPrice,
    depreciation: {
      amount: depreciationAmount,
      percentage: depreciationPercentage,
      score: depreciationScore,
    },
    priceComparison: {
      difference: priceDifference,
      percentage: priceComparisonPercentage,
      score: marketScore,
    },
    extraScore: cappedExtraScore,
    totalScore,
    classification,
  }
}

// Mock-Funktion für Marktdaten
export function getMarketPrice(vehicleId: string): number {
  // In der Produktion würde hier eine API-Abfrage erfolgen
  const mockMarketPrices: Record<string, number> = {
    'vehicle-1': 85000, // BMW M3 Competition
    'vehicle-2': 95000, // Mercedes-Benz C63 AMG
    'vehicle-3': 75000, // Audi RS4 Avant
  }
  return mockMarketPrices[vehicleId] || 0
}

// Mock-Funktion für Bruttolistenpreise
export function getOriginalPrice(vehicleId: string): number {
  // In der Produktion würde hier eine API-Abfrage erfolgen
  const mockOriginalPrices: Record<string, number> = {
    'vehicle-1': 120000,
    'vehicle-2': 130000,
    'vehicle-3': 100000,
  }
  return mockOriginalPrices[vehicleId] || 0
} 