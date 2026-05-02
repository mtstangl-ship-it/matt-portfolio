import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Request pathname for the root layout’s server-rendered chrome decision.
 * `usePathname()` is null during SSR of Client Components; without this, Tier-A
 * routes (/about, /case-studies/ai) get legacy Nav/main/footer on the server
 * and bare children after hydration — visible hero layout shift.
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
