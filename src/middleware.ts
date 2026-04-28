import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value
  console.log({ url: request.nextUrl, token });



  if (request.nextUrl.pathname.startsWith('/en/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/en/sign-in', request.url))
    }
  }


  if (request.nextUrl.pathname.startsWith('/en/sign-in') || request.nextUrl.pathname.startsWith('/en/sign-up')) {
    if (token) {
      return NextResponse.redirect(new URL('/en/dashboard/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/en/dashboard/:path*', '/en/sign-in', '/en/sign-up'],
}
