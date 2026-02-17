import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log('Middleware executed for path:', pathname);

  // If user visits root "/"
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/en/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
