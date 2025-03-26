'use client'

import { CheckIcon } from '@heroicons/react/24/solid'
import Container from '@/components/ui/Container'

const features = [
  {
    name: 'Einfache Fahrzeugverwaltung',
    description: 'Verwalten Sie Ihre Fahrzeuge mit wenigen Klicks. Fügen Sie neue Fahrzeuge hinzu, aktualisieren Sie Informationen und behalten Sie den Überblick.',
  },
  {
    name: 'Automatische Preisanalyse',
    description: 'Unsere KI-gestützte Preisanalyse hilft Ihnen, den optimalen Preis für Ihr Fahrzeug zu finden.',
  },
  {
    name: 'Direkte Kommunikation',
    description: 'Kommunizieren Sie direkt mit Interessenten über unsere integrierte Chat-Funktion.',
  },
  {
    name: 'Professionelle Präsentation',
    description: 'Präsentieren Sie Ihre Fahrzeuge mit hochwertigen Bildern und detaillierten Beschreibungen.',
  },
  {
    name: 'Statistiken & Analysen',
    description: 'Erhalten Sie detaillierte Einblicke in die Performance Ihrer Anzeigen und das Interesse der Käufer.',
  },
  {
    name: 'Mobile Optimierung',
    description: 'Greifen Sie von überall auf Ihre Fahrzeuge zu - unsere Plattform ist für mobile Geräte optimiert.',
  },
]

export default function Features() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl lg:text-center">
          <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
            Schneller verkaufen
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Alles was Sie für den erfolgreichen Fahrzeughandel brauchen
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            PAPRICAR bietet Ihnen alle Tools und Funktionen, die Sie für den professionellen Fahrzeughandel benötigen.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="card">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <CheckIcon className="h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </div>
  )
} 