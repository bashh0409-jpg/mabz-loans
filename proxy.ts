import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  if (process.env.MAINTENANCE_MODE !== "true") {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  if (
    pathname === "/maintenance" ||
    pathname.startsWith("/maintenance/") ||
    pathname.startsWith("/_next/") ||
    /\.[^/]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/maintenance", request.url), 307);
}

export const config = {
  matcher: "/:path*",
};
