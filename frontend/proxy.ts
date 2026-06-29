import { NextResponse, NextRequest } from "next/server";

// Routes anyone can visit without a token
const publicRoutes = ["/login", "/register"];

// Dashboard route groups, keyed by the "role" cookie value that should access them
const roleRoutes: Record<string, string> = {
  donor: "/donor",
  ngo: "/ngo",
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Cookies are read straight off the request here — proxy.ts can't use
  // the client-side getCookie()/document.cookie helpers from lib/cookies.ts.
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // No token, trying to hit a protected page -> bounce to /login
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Logged in -> keep donors out of /ngo and ngos out of /donor
  if (token && role) {
    const ownRoute = roleRoutes[role];
    const isOnSomeoneElsesDashboard = Object.values(roleRoutes).some(
      (route) => pathname.startsWith(route) && route !== ownRoute,
    );

    if (isOnSomeoneElsesDashboard && ownRoute) {
      return NextResponse.redirect(new URL(ownRoute, request.url));
    }
  }

  // Already logged in -> no reason to see /login or /register again
  if (token && isPublicRoute) {
    const ownRoute = (role && roleRoutes[role]) || "/donor";
    return NextResponse.redirect(new URL(ownRoute, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register/:path*",
    "/donor/:path*",
    "/ngo/:path*",
  ],
};
