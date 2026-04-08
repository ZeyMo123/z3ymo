import { NextResponse, type NextRequest } from 'next/server'

const ADMIN_TOKEN = process.env.NEXT_PUBLIC_ADMIN_TOKEN ?? 'admin-token'

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Only protect /admin routes
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  // Always allow the login page through
  if (pathname === '/admin/login') {
    return NextResponse.next()
  }

  // Check for admin session cookie
  const cookie = req.cookies.get('z3ymo_admin')
  if (!cookie || cookie.value !== ADMIN_TOKEN) {
    const loginUrl = new URL('/admin/login', req.url)
    loginUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
