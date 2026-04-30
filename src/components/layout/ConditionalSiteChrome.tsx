"use client";

import { usePathname } from "next/navigation";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

/**
 * About v3 is a full-bleed dark “drawing sheet” with its own pill nav.
 * Suppress the global chrome on /about only.
 */
export function ConditionalSiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const aboutFullBleed = pathname === "/about";

  if (aboutFullBleed) {
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
