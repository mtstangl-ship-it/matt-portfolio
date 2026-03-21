"use client";

import { useState } from "react";
import { clientTicker } from "@/content/home";
import { logoPaths } from "@/content/logos";

export function ClientTicker() {
  const items = [...clientTicker, ...clientTicker];

  return (
    <div
      className="relative group overflow-hidden border-t border-ink-200/50 bg-support-200 py-5 sm:py-6"
      aria-label="Selected client experience"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 15% 0%, rgba(34,211,199,0.28), transparent 55%), radial-gradient(ellipse at 85% 40%, rgba(13,148,136,0.18), transparent 60%), repeating-linear-gradient(to bottom, rgba(26,24,22,0.20) 1px, transparent 1px)",
          backgroundSize: "cover, cover, 22px 22px",
          backgroundPosition: "center, center, center",
        }}
      />
      <div className="relative z-10 flex w-max animate-ticker items-center gap-x-10 sm:gap-x-14 md:gap-x-20 motion-reduce:animate-none group-hover:[animation-play-state:paused]">
        {items.map((name, i) => {
          const src = logoPaths[name as keyof typeof logoPaths];
          return (
            <TickerLogo key={`${name}-${i}`} name={name} src={src} />
          );
        })}
      </div>
    </div>
  );
}

function TickerLogo({ name, src }: { name: string; src?: string }) {
  const [error, setError] = useState(false);
  if (!src || error) {
    return (
      <span className="shrink-0 font-body text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-ink-600">
        {name}
      </span>
    );
  }
  return (
    <div className="relative h-8 w-[8.75rem] min-w-[7.5rem] shrink-0 sm:h-7 sm:w-32 sm:min-w-0">
      <img
        src={src}
        alt={name}
        width={128}
        height={28}
        className="h-full w-full object-contain object-left"
        onError={() => setError(true)}
      />
    </div>
  );
}
