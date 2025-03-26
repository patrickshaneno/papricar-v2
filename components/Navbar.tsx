'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import Container from '@/components/ui/Container'
import { supabase } from '@/lib/supabase'
import ProfileMenu from './ProfileMenu'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [user, setUser] = useState<any>(null)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single()
        setUser({ ...user, role: profile?.role })
      }
    }
    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const getUser = async () => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single()
          setUser({ ...session.user, role: profile?.role })
        }
        getUser()
      } else {
        setUser(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  // Ausblenden auf Login-Seiten
  if (pathname === '/login' || pathname === '/dealer/login') {
    return null
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-md shadow-md">
      <Container>
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">PAPRICAR</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/vehicles" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">
              Marktplatz
            </Link>
            <Link href="/faq" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">
              FAQ
            </Link>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <ProfileMenu user={user} />
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-xl font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/dealer"
                  className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium shadow-md"
                >
                  Für Händler
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 p-2 rounded-lg transition-colors duration-200"
              aria-label="Toggle menu"
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
          <div className="md:hidden py-4 bg-white border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <Link
                href="/vehicles"
                className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-xl transition-colors duration-200 font-medium"
              >
                Marktplatz
              </Link>
              <Link
                href="/faq"
                className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-xl transition-colors duration-200 font-medium"
              >
                FAQ
              </Link>
              {user ? (
                <>
                  <button
                    onClick={async () => {
                      await supabase.auth.signOut()
                      window.location.href = '/login'
                    }}
                    className="text-red-600 hover:text-red-700 px-4 py-2 rounded-xl transition-colors duration-200 font-medium text-left"
                  >
                    Abmelden
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-xl transition-colors duration-200 font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    href="/dealer"
                    className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium shadow-md text-center"
                  >
                    Für Händler
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </Container>
    </nav>
  )
} 