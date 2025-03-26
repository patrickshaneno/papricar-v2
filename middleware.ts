import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Liste der geschützten Routen
const protectedRoutes = [
  '/dealer',
  '/admin',
  '/chat',
  '/vehicles/saved'
]

// Liste der öffentlichen Routen
const publicRoutes = [
  '/',
  '/faq',
  '/vehicles',
  '/register',
  '/login',
  '/impressum',
  '/datenschutz'
]

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Prüfe, ob die aktuelle Route geschützt ist
  const isProtectedRoute = protectedRoutes.some(route => 
    req.nextUrl.pathname.startsWith(route)
  )

  // Prüfe, ob die aktuelle Route öffentlich ist
  const isPublicRoute = publicRoutes.some(route => 
    req.nextUrl.pathname.startsWith(route)
  )

  // Wenn keine Session und geschützte Route, zur Login-Seite weiterleiten
  if (!session && isProtectedRoute) {
    const redirectUrl = new URL('/login', req.url)
    redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Wenn Session vorhanden ist
  if (session) {
    // Hole die Benutzerrolle aus der profiles-Tabelle
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    const role = profile?.role || 'user'

    // Weiterleitung basierend auf der Rolle
    if (req.nextUrl.pathname === '/login') {
      return NextResponse.redirect(new URL(role === 'dealer' ? '/dealer' : '/vehicles', req.url))
    }

    // Schutz der Dealer-Route
    if (req.nextUrl.pathname.startsWith('/dealer') && role !== 'dealer') {
      return NextResponse.redirect(new URL('/vehicles', req.url))
    }

    // Schutz der User-Route
    if (req.nextUrl.pathname.startsWith('/vehicles') && role === 'dealer') {
      return NextResponse.redirect(new URL('/dealer', req.url))
    }

    // Wenn Admin-Route, prüfe ob User Admin ist
    if (req.nextUrl.pathname.startsWith('/admin')) {
      if (role !== 'admin') {
        return NextResponse.redirect(new URL('/', req.url))
      }
    }
  }

  return res
}

export const config = {
  matcher: [
    '/login',
    '/vehicles/:path*',
    '/dealer/:path*',
    '/chat/:path*',
  ],
} 