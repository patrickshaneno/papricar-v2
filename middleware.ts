import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Liste der geschützten Routen
const protectedRoutes = [
  '/admin',
  '/dealer',
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

  // Wenn Session existiert und User versucht auf Login-Seite zuzugreifen
  if (session && (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/dealer/login')) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // Spezielle Prüfung für Admin-Routen
  if (session && req.nextUrl.pathname.startsWith('/admin')) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (profile?.role !== 'dealer') {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  return res
}

export const config = {
  matcher: [
    '/',
    '/vehicles/:path*',
    '/profile/:path*',
    '/dealer/:path*',
    '/login',
    '/register',
    '/faq',
    '/impressum',
    '/agb'
  ]
} 