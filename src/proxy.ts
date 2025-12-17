import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/SignIn" || path === "/SignUp" || path === "/";

  const isProtectedPath = path.startsWith("/dashboard");

  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL("/SignIn", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/SignIn", "/SignUp", "/dashboard/:path*"],
};
