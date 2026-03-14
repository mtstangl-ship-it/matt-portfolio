"use client";

import { useState } from "react";
import { clientTicker } from "@/content/home";
import { logoPaths } from "@/content/logos";

export function ClientTicker() {
  const items = [...clientTicker, ...clientTicker];

  return (
    <div
      className="group overflow-hidden border-t-2 border-accent/15 bg-ink-150 py-6"
      aria-label="Selected client experience"
    >
      <div className="animate-ticker flex w-max items-center gap-x-14 md:gap-x-20 motion-reduce:animate-none group-hover:[animation-play-state:paused]">
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
    <div className="relative h-7 w-32 shrink-0">
      <img
        src={src}
        alt={name}
        width={128}
        height={28}
        className="h-7 w-32 object-contain object-left"
        onError={() => setError(true)}
      />
    </div>
  );
}
