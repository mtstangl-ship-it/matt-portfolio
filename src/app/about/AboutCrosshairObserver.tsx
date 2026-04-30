"use client";

import { useEffect } from "react";

/** Mirrors prototype nav.js: fade corner crosshairs when sections enter view. */
export function AboutCrosshairObserver() {
  useEffect(() => {
    const roots = document.querySelectorAll<HTMLElement>(
      "section[data-screen-label], header[data-screen-label]",
    );
    if (!("IntersectionObserver" in window)) {
      roots.forEach((el) => el.classList.add("xhair-on"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("xhair-on");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );
    roots.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
