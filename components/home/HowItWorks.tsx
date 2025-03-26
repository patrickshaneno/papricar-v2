'use client'

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
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-purple-600">Einfacher Prozess</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            So funktioniert PAPRICAR
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            In nur wenigen Schritten zum erfolgreichen Fahrzeugverkauf. PAPRICAR macht den Verkaufsprozess einfach und effizient.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.name} className="flex flex-col items-start">
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-purple-600 text-white font-bold">
                    {index + 1}
                  </div>
                </div>
                <dt className="mt-4 font-semibold text-gray-900">{step.name}</dt>
                <dd className="mt-2 leading-7 text-gray-600">{step.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
} 