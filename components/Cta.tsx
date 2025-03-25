import Link from 'next/link'

export default function Cta() {
  return (
    <section className="py-24 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
          Bereit, Ihr Traumauto zu finden?
        </h2>
        <Link
          href="/vehicles"
          className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50"
        >
          Marktplatz ansehen
        </Link>
      </div>
    </section>
  )
} 