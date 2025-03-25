import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Wenn kein Session existiert und die Route geschützt ist
  if (!session) {
    const isAuthRoute = req.nextUrl.pathname.startsWith('/login') || 
                       req.nextUrl.pathname.startsWith('/register') ||
                       req.nextUrl.pathname.startsWith('/dealer/login') ||
                       req.nextUrl.pathname.startsWith('/dealer/register')

    if (!isAuthRoute) {
      const redirectUrl = req.nextUrl.pathname.startsWith('/dealer')
        ? '/dealer/login'
        : '/login'
      return NextResponse.redirect(new URL(redirectUrl, req.url))
    }
  }

  // Wenn eine Session existiert und die Route eine Auth-Route ist
  if (session) {
    const isAuthRoute = req.nextUrl.pathname.startsWith('/login') || 
                       req.nextUrl.pathname.startsWith('/register') ||
                       req.nextUrl.pathname.startsWith('/dealer/login') ||
                       req.nextUrl.pathname.startsWith('/dealer/register')

    if (isAuthRoute) {
      const redirectUrl = session.user.user_metadata.role === 'dealer'
        ? '/dealer/dashboard'
        : '/vehicles'
      return NextResponse.redirect(new URL(redirectUrl, req.url))
    }

    // Rollenbasierte Zugriffskontrolle
    const isDealerRoute = req.nextUrl.pathname.startsWith('/dealer')
    const isUserRoute = !isDealerRoute && !req.nextUrl.pathname.startsWith('/login') && 
                       !req.nextUrl.pathname.startsWith('/register')

    if (isDealerRoute && session.user.user_metadata.role !== 'dealer') {
      return NextResponse.redirect(new URL('/vehicles', req.url))
    }

    if (isUserRoute && session.user.user_metadata.role === 'dealer') {
      return NextResponse.redirect(new URL('/dealer/dashboard', req.url))
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