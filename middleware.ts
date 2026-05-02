import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = [
  "/",
  "/auth/login",
  "/auth/signup",
  "/auth/forgot-password",
  "/auth/activation",
  "/auth/success",
  "/training",
];

const PUBLIC_PREFIXES = [
  "/auth/reset-password",
  "/auth/verify-email",
  "/team/", // public team join pages
  "/_next",
  "/assets",
  "/api",
];

// Routes that require authentication
const PROTECTED_PREFIXES = ["/dashboard", "/tournaments", "/game", "/creator"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Always allow static / internal Next.js routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/assets") ||
    pathname.includes(".") // static files like favicon.ico
  ) {
    return NextResponse.next();
  }

  // Check if it's a public route
  const isPublicRoute =
    PUBLIC_ROUTES.includes(pathname) ||
    PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  // Check if it's a protected route
  const isProtectedRoute = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix),
  );

  // Read the auth cookie (mirrored from localStorage by tokenManager.set())
  const token = request.cookies.get("gloroq_token")?.value;
  const hasToken = Boolean(token && token.trim().length > 0);

  // Not authenticated + trying to access a protected route → redirect to login
  if (isProtectedRoute && !hasToken) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Authenticated + trying to access auth pages → redirect to dashboard
  if (hasToken && (pathname === "/auth/login" || pathname === "/auth/signup")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT static files
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
