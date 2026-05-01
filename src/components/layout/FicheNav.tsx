"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/** Dark pill nav — shared by Home v2, About v3, and Tier A case shells. */
export function FicheNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("nav-open", menuOpen);
    return () => document.body.classList.remove("nav-open");
  }, [menuOpen]);

  return (
    <nav className="nav" aria-label="Primary">
      <Link className="nav__brand" href="/" onClick={() => setMenuOpen(false)}>
        <span className="nav__brand-mark" aria-hidden>
          +
        </span>
        <span className="nav__brand-text">M. STANGL</span>
      </Link>
      <ul className="nav__list">
        <li>
          <Link href="/impact" aria-current={pathname === "/impact" ? "page" : undefined} onClick={() => setMenuOpen(false)}>
            Impact
          </Link>
        </li>
        <li>
          <Link
            href="/case-studies"
            aria-current={pathname === "/case-studies" || pathname.startsWith("/case-studies/") ? "page" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            Case Studies
          </Link>
        </li>
        <li>
          <Link href="/signal-story" aria-current={pathname === "/signal-story" ? "page" : undefined} onClick={() => setMenuOpen(false)}>
            Signal → Story
          </Link>
        </li>
        <li>
          <Link href="/about" aria-current={pathname === "/about" ? "page" : undefined} onClick={() => setMenuOpen(false)}>
            About
          </Link>
        </li>
      </ul>
      <a className="nav__cta" href="mailto:mtstangl@gmail.com">
        Contact
      </a>
      <button
        className="nav__menu"
        type="button"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}
