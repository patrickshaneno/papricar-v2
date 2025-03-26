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
  '/datenschutz',
  '/agb'
]

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { pathname } = req.nextUrl

  // Prüfe, ob die aktuelle Route geschützt ist
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route))
  const isPublic = publicRoutes.some(route => pathname.startsWith(route))
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register')

  // Wenn keine Session existiert und die Route geschützt ist
  if (!session) {
    if (isProtected) {
      const redirectUrl = pathname.startsWith('/dealer')
        ? '/dealer/login'
        : '/login'
      return NextResponse.redirect(new URL(redirectUrl, req.url))
    }
  }

  // Wenn eine Session existiert
  if (session) {
    // Wenn auf einer Auth-Route, zur entsprechenden Dashboard-Route weiterleiten
    if (isAuthRoute) {
      const redirectUrl = session.user.user_metadata.role === 'dealer'
        ? '/dealer/dashboard'
        : '/vehicles'
      return NextResponse.redirect(new URL(redirectUrl, req.url))
    }

    // Rollenbasierte Zugriffskontrolle für geschützte Routen
    const isDealerRoute = pathname.startsWith('/dealer')
    const isAdminRoute = pathname.startsWith('/admin')

    if (isDealerRoute && session.user.user_metadata.role !== 'dealer') {
      return NextResponse.redirect(new URL('/vehicles', req.url))
    }

    if (isAdminRoute && session.user.user_metadata.role !== 'admin') {
      return NextResponse.redirect(new URL('/vehicles', req.url))
    }
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
} 