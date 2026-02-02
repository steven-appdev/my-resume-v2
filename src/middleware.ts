import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { Session } from "next-auth";

export default auth((req: NextRequest & { auth: Session | null }) => {
  const isLoggedIn = !!req.auth;
  const isOnAdminPage = req.nextUrl.pathname.startsWith("/admin");
  const isOnLoginPage = req.nextUrl.pathname === "/admin/login";

  // Redirect to login if accessing admin page without authentication
  if (isOnAdminPage && !isLoggedIn && !isOnLoginPage) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  // Redirect to dashboard if already logged in and trying to access login
  if (isOnLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
