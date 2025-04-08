import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const isAdmin = req.cookies.get('is_admin')?.value === 'true'
  const isLoginPage = req.nextUrl.pathname.startsWith('/admin/login')

  if (!isAdmin && !isLoginPage && req.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}
