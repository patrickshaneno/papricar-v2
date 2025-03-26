'use client'

import Link from 'next/link'
import Container from '@/components/ui/Container'

export default function Hero() {
  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      <Container className="py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
              Neu bei PAPRICAR
            </span>
          </div>
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Die moderne Plattform für den Fahrzeughandel
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            PAPRICAR verbindet Händler und Käufer auf innovative Weise. Nutzen Sie unsere Plattform, um Ihre Fahrzeuge effizient zu vermarkten oder Ihr Traumauto zu finden.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/register"
              className="btn-primary"
            >
              Jetzt registrieren
            </Link>
            <Link 
              href="/vehicles" 
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors duration-200"
            >
              Fahrzeuge ansehen <span aria-hidden="true" className="ml-1">→</span>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
} 