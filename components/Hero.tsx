import Link from 'next/link'

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-orange-50 to-purple-50">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,transparent)] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,white,transparent)]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
          Neuwagen. Gebrauchtwagen.
          <br />
          <span className="text-primary">Direkt. Transparent.</span>
        </h1>
        <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
          Mit PAPRICAR erhalten Sie sofort Rabatte oder Scores – ganz ohne
          Verhandlungen.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/vehicles"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90"
          >
            Zum Marktplatz
          </Link>
          <Link
            href="/faq"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50 border-primary"
          >
            Mehr erfahren
          </Link>
        </div>
      </div>
    </div>
  )
} 