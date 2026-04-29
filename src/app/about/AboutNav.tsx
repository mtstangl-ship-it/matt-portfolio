"use client";

import Link from "next/link";
import { useCallback, useState } from "react";

export function AboutNav() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <nav className={`nav${open ? " nav--open" : ""}`} aria-label="Primary">
        <Link className="nav__brand" href="/" onClick={close}>
          <span className="nav__brand-mark" aria-hidden>
            +
          </span>
          <span className="nav__brand-text">M. STANGL</span>
        </Link>
        <ul className="nav__list">
          <li>
            <Link href="/impact">Impact</Link>
          </li>
          <li>
            <Link href="/case-studies">Case Studies</Link>
          </li>
          <li>
            <Link href="/signal-story">Signal → Story</Link>
          </li>
          <li>
            <Link href="/about" aria-current="page">
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
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
        <div className="nav__panel" role="dialog" aria-label="Menu">
          <Link href="/impact" onClick={close}>
            Impact
          </Link>
          <Link href="/case-studies" onClick={close}>
            Case Studies
          </Link>
          <Link href="/signal-story" onClick={close}>
            Signal → Story
          </Link>
          <Link href="/about" aria-current="page" onClick={close}>
            About
          </Link>
          <a className="nav__cta" href="mailto:mtstangl@gmail.com" onClick={close}>
            Contact
          </a>
        </div>
      </nav>
  );
}
