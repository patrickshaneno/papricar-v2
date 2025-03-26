'use client'

import Link from 'next/link'
import Container from '@/components/ui/Container'

export default function CTA() {
  return (
    <div className="bg-white">
      <Container className="py-24 sm:py-32">
        <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-50 to-white px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Starten Sie jetzt mit PAPRICAR
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
            Nutzen Sie die Vorteile einer modernen Plattform für den Fahrzeughandel. Registrieren Sie sich noch heute und erreichen Sie mehr potenzielle Käufer.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/register"
              className="btn-secondary"
            >
              Kostenlos registrieren
            </Link>
            <Link 
              href="/vehicles" 
              className="text-sm font-semibold leading-6 text-white hover:text-blue-100 transition-colors duration-200"
            >
              Fahrzeuge ansehen <span aria-hidden="true" className="ml-1">→</span>
            </Link>
          </div>
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
            aria-hidden="true"
          >
            <circle cx={512} cy={512} r={512} fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)" fillOpacity="0.7" />
            <defs>
              <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                <stop stopColor="#3B82F6" />
                <stop offset={1} stopColor="#1E40AF" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </Container>
    </div>
  )
} 