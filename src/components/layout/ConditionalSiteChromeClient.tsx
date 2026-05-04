"use client";

import { usePathname } from "next/navigation";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

/**
 * Tier-A Home (`/`), About v3, and Centaur (`/case-studies/ai`) ship their own chrome.
 * `usePathname()` is null during SSR — parent passes `serverPathname` from
 * `middleware` + `headers()` so the first HTML matches the hydrated tree.
 */
export function ConditionalSiteChromeClient({
  children,
  serverPathname,
}: {
  children: React.ReactNode;
  serverPathname: string;
}) {
  const pathname = usePathname();
  const path = pathname ?? serverPathname;
  const hideLegacyChrome =
    path === "/" || path === "/about" || path === "/case-studies/ai" || path === "/case-studies/ey";

  if (hideLegacyChrome) {
    return <>{children}</>;
  }

  return (
    <>
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
