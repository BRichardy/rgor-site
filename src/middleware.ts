import { type NextRequest, NextResponse } from "next/server";
import {
  isValidAdminToken,
  LOCAL_ADMIN_COOKIE,
} from "@/lib/local-auth";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (!hasSupabaseEnv()) {
    const token = request.cookies.get(LOCAL_ADMIN_COOKIE)?.value;
    const loggedIn = isValidAdminToken(token);
    const isAdminRoute = pathname.startsWith("/admin");
    const isLoginPage = pathname === "/admin";

    if (isAdminRoute && !isLoginPage && !loggedIn) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }

    if (isLoginPage && loggedIn) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/posts";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  return updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
