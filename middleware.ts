// middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default clerkMiddleware((auth, req: NextRequest) => {
  // Check if user is accessing the homepage
  if (req.nextUrl.pathname === '/') {
    // Get user-agent from request headers
    const userAgent = req.headers.get('user-agent') || '';
    
    // Detect mobile devices using user-agent string
    const isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone/i.test(userAgent);
    
    // Redirect mobile users to explore-services page
    if (isMobile) {
      return NextResponse.redirect(new URL('/explore-services', req.url));
    }
  }
  
  // Allow all other requests to proceed normally
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
