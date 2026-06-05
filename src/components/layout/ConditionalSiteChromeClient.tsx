"use client";

import { usePathname } from "next/navigation";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

/**
 * Tier-A Home (`/`), About v3, Impact, and Tier-A case studies ship their own chrome.
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
  /** Tier-A routes ship FicheNav / CaseShell chrome — omit global Nav + Footer. */
  const tierACaseRoutes = new Set([
    "/case-studies/ai",
    "/case-studies/ey",
    "/case-studies/wipro",
    "/case-studies/autodesk",
  ]);
  const hideLegacyChrome =
    path === "/" ||
    path === "/about" ||
    path === "/impact" ||
    path === "/signal-story" ||
    tierACaseRoutes.has(path);

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
