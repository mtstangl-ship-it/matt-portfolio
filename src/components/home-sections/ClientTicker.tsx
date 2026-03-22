"use client";

import { useState } from "react";
import { clientTicker } from "@/content/home";
import { logoPaths } from "@/content/logos";

export function ClientTicker() {
  const items = [...clientTicker, ...clientTicker];

  return (
    <div
      className="group relative overflow-hidden border-t border-ink-200/50 bg-support-200/95 py-4 sm:py-5"
      aria-label="Selected client experience"
    >
      <div className="relative z-10 flex w-max min-w-full animate-ticker-slow items-center gap-x-8 sm:gap-x-16 md:gap-x-20 motion-reduce:animate-none group-hover:[animation-play-state:paused] [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
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
      <span className="shrink-0 font-body text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-ink-500">
        {name}
      </span>
    );
  }
  return (
    <div className="relative h-5 w-20 shrink-0 opacity-75 sm:h-5 sm:w-28">
      <img
        src={src}
        alt={name}
        width={112}
        height={20}
        className="h-full w-full object-contain object-left"
        onError={() => setError(true)}
      />
    </div>
  );
}
