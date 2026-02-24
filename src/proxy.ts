import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get('accessToken')?.value;


  // 2️⃣ If user is NOT authenticated and tries to access dashboard
  if (!token && pathname.includes('dashboard')) {
    return NextResponse.redirect(new URL('/en/sign-in', request.url));
  }

  // 3️⃣ If user IS authenticated and tries to access login
  if (token && pathname.includes('sign-in')) {
    return NextResponse.redirect(new URL('/en/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',                    // root
    '/en/sign-in',            // login page
    '/en/sign-up',            // register page
    '/en/forgot-password',            // forgot password page
    '/en/reset-password',            // reset password page
    '/en/dashboard/:path*',  // dashboard and subpages
  ],
};