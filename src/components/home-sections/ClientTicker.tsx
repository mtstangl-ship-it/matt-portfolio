"use client";

import Image from "next/image";
import { clientTicker } from "@/content/home";
import { logoPaths } from "@/content/logos";

export function ClientTicker() {
  const items = [...clientTicker, ...clientTicker];

  return (
    <div
      className="group overflow-hidden border-t border-ink-200/80 bg-paper-50/50 py-5"
      aria-label="Selected client experience"
    >
      <div className="animate-ticker flex w-max items-center gap-x-12 md:gap-x-16 motion-reduce:animate-none group-hover:[animation-play-state:paused]">
        {items.map((name, i) => {
          const src = logoPaths[name as keyof typeof logoPaths];
          return (
            <div key={`${name}-${i}`} className="relative h-5 w-24 shrink-0">
              {src ? (
                <Image
                  src={src}
                  alt={name}
                  width={96}
                  height={20}
                  className="h-5 w-24 object-contain object-left opacity-75"
                  style={{ filter: "grayscale(1) contrast(0.9) brightness(0.97)" }}
                />
              ) : (
                <span className="font-body text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ink-500 md:text-metric-sm">
                  {name}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
