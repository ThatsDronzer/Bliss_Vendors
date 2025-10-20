import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  try {
    // Mobile redirect logic for homepage only
    if (req.nextUrl.pathname === '/') {
      const userAgent = req.headers.get('user-agent') || '';
      const isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone/i.test(userAgent);
      
      if (isMobile) {
        return NextResponse.redirect(new URL('/explore-services', req.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    // Log error and continue
    console.error('Middleware error:', error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
