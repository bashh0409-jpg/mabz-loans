import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isMaintenanceRoute =
    pathname === "/maintenance" || pathname.startsWith("/maintenance/");

  if (process.env.MAINTENANCE_MODE !== "true") {
    if (isMaintenanceRoute) {
      return NextResponse.redirect(new URL("/", request.url), 307);
    }

    return NextResponse.next();
  }

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

  if (isAllowedPath || isMaintenanceRoute) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/maintenance", request.url), 307);
}

export const config = {
  matcher: "/:path*",
};
