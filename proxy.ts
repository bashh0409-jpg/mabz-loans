import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  if (process.env.MAINTENANCE_MODE !== "true") {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  const allowedInMaintenance = [
    "/maintenance",
    "/terms",
    "/cookies",
    "/privacy",
  ];

  const isAllowedPath =
    allowedInMaintenance.some((route) => pathname === route || pathname.startsWith(`${route}/`)) ||
    pathname.startsWith("/_next/") ||
    /\.[^/]+$/.test(pathname);

  if (isAllowedPath || pathname.startsWith("/maintenance/")) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/maintenance", request.url), 307);
}

export const config = {
  matcher: "/:path*",
};
