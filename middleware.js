import { NextResponse } from "next/server";

// Define public routes that don't require authentication
const publicRoutes = ["/login", "/register"];

// Define protected routes that require authentication
const protectedRoutes = ["/chat", "/discover", "/profile", "/settings"];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Get the token from cookies
  const token = request.cookies.get("auth-token")?.value;
  const isAuthenticated = !!token;

  // If user is authenticated and on root path, redirect to chat
  if (isAuthenticated && pathname === "/") {
    return NextResponse.redirect(new URL("/chat", request.url));
  }

  // If user is authenticated and tries to access auth pages (login/register)
  if (isAuthenticated && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/chat", request.url));
  }

  // If user is not authenticated and tries to access protected routes
  if (!isAuthenticated && protectedRoutes.some(route => pathname.startsWith(route))) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
}; 