'use client'

import Container from '@/components/ui/Container'

const steps = [
  {
    name: 'Registrieren',
    description: 'Erstellen Sie Ihr kostenloses Konto in wenigen Minuten.',
  },
  {
    name: 'Fahrzeug einstellen',
    description: 'Laden Sie Fotos hoch und fügen Sie alle wichtigen Details hinzu.',
  },
  {
    name: 'Anfragen erhalten',
    description: 'Erhalten Sie qualifizierte Anfragen von interessierten Käufern.',
  },
  {
    name: 'Verkauf abschließen',
    description: 'Kommunizieren Sie direkt und schließen Sie den Verkauf erfolgreich ab.',
  },
]

export default function HowItWorks() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl lg:text-center">
          <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
            Einfacher Prozess
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            So funktioniert PAPRICAR
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            In nur wenigen Schritten zum erfolgreichen Fahrzeugverkauf. PAPRICAR macht den Verkaufsprozess einfach und effizient.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.name} className="card relative">
                <div className="absolute -top-4 left-4">
                  <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-lg shadow-lg">
                    {index + 1}
                  </div>
                </div>
                <dt className="mt-8 font-semibold text-gray-900 text-lg">{step.name}</dt>
                <dd className="mt-2 leading-7 text-gray-600">{step.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </div>
  )
} 