import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Ausblenden auf Login-Seiten
  if (pathname === '/login' || pathname === '/dealer/login') {
    return null
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-gray-900">PAPRICAR</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/vehicles" className="text-gray-700 hover:text-gray-900">
              Marktplatz
            </Link>
            <Link href="/faq" className="text-gray-700 hover:text-gray-900">
              FAQ
            </Link>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md"
            >
              Login
            </Link>
            <Link
              href="/dealer"
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
            >
              Für Händler
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 bg-white">
            <div className="flex flex-col space-y-4">
              <Link
                href="/vehicles"
                className="text-gray-700 hover:text-gray-900 px-3 py-2"
              >
                Marktplatz
              </Link>
              <Link
                href="/faq"
                className="text-gray-700 hover:text-gray-900 px-3 py-2"
              >
                FAQ
              </Link>
              <Link
                href="/login"
                className="text-gray-700 hover:text-gray-900 px-3 py-2"
              >
                Login
              </Link>
              <Link
                href="/dealer"
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
              >
                Für Händler
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 