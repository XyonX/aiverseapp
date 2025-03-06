// middleware.js
import { NextResponse } from "next/server";
import jwtDecode from "jwt-decode";

export function middleware(request) {
  // Get the token from the cookies
  const token = request.cookies.get("token"); // Replace 'token' with your cookie name

  // If no token exists, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // Decode the token to check expiration
    const decoded = jwtDecode(token.value);
    const currentTime = Date.now() / 1000; // Current time in seconds

    // If token is expired, redirect to login
    if (decoded.exp < currentTime) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } catch (error) {
    // If token is invalid, redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Token is valid, proceed to the requested page
  return NextResponse.next();
}

// Define which routes to protect
export const config = {
  matcher: ["/chat/:path*"], // Protect the /chat route and its subroutes
};
