"use client";

import { useState } from "react";

type Props = {
  youtubeId: string;
  title: string;
  label?: string;
  /** Larger dominant frame (homepage lead, subpage hero) */
  variant?: "hero" | "default";
  className?: string;
};

/**
 * Thumbnail until click; then inline youtube-nocookie embed with autoplay.
 * No autoplay on load; no hover-autoplay (touch-safe, lightweight).
 */
export function YouTubeInline({ youtubeId, title, label, variant = "default", className = "" }: Props) {
  const [play, setPlay] = useState(false);
  const thumb = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
  const embedSrc = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`;

  const frame =
    variant === "hero"
      ? "aspect-video w-full max-w-5xl md:mx-auto md:max-w-6xl"
      : "aspect-video w-full min-h-[13rem] sm:min-h-0";

  if (play) {
    return (
      <div
        className={`relative w-full overflow-hidden rounded-lg border border-white/[0.1] bg-black shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] ${frame} ${className}`}
      >
        <iframe
          src={embedSrc}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlay(true)}
      className={`group relative block w-full overflow-hidden rounded-lg border border-white/[0.1] bg-[#0a0908] text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ${frame} ${className}`}
      aria-label={`Play video: ${title}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- YouTube CDN thumbnails */}
      <img
        src={thumb}
        alt=""
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        className="h-full w-full object-cover opacity-95 transition duration-300 group-hover:opacity-100"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-black/15 transition group-hover:bg-black/5" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/92 text-ink-950 shadow-lg ring-1 ring-white/30 transition duration-300 group-hover:scale-[1.06] md:h-16 md:w-16">
          <svg className="ml-1 h-7 w-7 md:h-8 md:w-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
        {label ? (
          <p className="font-mono text-[0.45rem] font-bold uppercase tracking-[0.16em] text-accent/90">{label}</p>
        ) : null}
        <p className="font-display text-base font-bold leading-tight text-white [text-wrap:balance] md:text-lg">
          {title}
        </p>
      </div>
    </button>
  );
}
