'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <div className="relative isolate overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <a href="#" className="inline-flex space-x-6">
              <span className="rounded-full bg-purple-600/10 px-3 py-1 text-sm font-semibold leading-6 text-purple-600 ring-1 ring-inset ring-purple-600/10">
                Neu bei PAPRICAR
              </span>
            </a>
          </div>
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Die moderne Plattform für den Fahrzeughandel
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            PAPRICAR verbindet Händler und Käufer auf innovative Weise. Nutzen Sie unsere Plattform, um Ihre Fahrzeuge effizient zu vermarkten oder Ihr Traumauto zu finden.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Link
              href="/register"
              className="rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
            >
              Jetzt registrieren
            </Link>
            <Link href="/vehicles" className="text-sm font-semibold leading-6 text-gray-900">
              Fahrzeuge ansehen <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <Image
              src="/images/hero-car.jpg"
              alt="Modernes Auto auf der PAPRICAR Plattform"
              width={1000}
              height={600}
              className="w-[76rem] rounded-md bg-gray-50 shadow-xl ring-1 ring-gray-400/10"
            />
          </div>
        </div>
      </div>
    </div>
  )
} 