import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Request pathname for the root layout’s server-rendered chrome decision.
 * `usePathname()` is null during SSR of Client Components; this header keeps
 * `ConditionalSiteChrome` aligned on Tier-A shells (`/`, `/about`,
 * `/case-studies/ai`, `/case-studies/ey`) so the first paint matches hydration.
 */
export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-matt-pathname", request.nextUrl.pathname);
  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
};
