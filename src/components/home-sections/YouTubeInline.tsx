"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  youtubeId: string;
  title: string;
  label?: string;
  /** Larger dominant frame (homepage lead, subpage hero) */
  variant?: "hero" | "default";
  className?: string;
  /** Desktop hover preview loop start (seconds). Omit = thumbnail until click only. */
  previewStartSeconds?: number;
  /** Hover loop length (default 3.5s) */
  previewDurationSeconds?: number;
};

const DEFAULT_PREVIEW_DURATION = 3.5;

function useDesktopHoverPreviewEnabled() {
  const [ready, setReady] = useState(false);
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (hover: hover) and (pointer: fine)");
    const apply = () => {
      setMatches(mq.matches);
      setReady(true);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return ready && matches;
}

function buildPreviewEmbedSrc(youtubeId: string, start: number, duration: number) {
  const end = Math.ceil(start + duration);
  const p = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    start: String(start),
    end: String(end),
    loop: "1",
    playlist: youtubeId,
    controls: "0",
    modestbranding: "1",
    playsinline: "1",
    rel: "0",
    iv_load_policy: "3",
    disablekb: "1",
    fs: "0",
  });
  return `https://www.youtube-nocookie.com/embed/${youtubeId}?${p.toString()}`;
}

function buildFullEmbedSrc(youtubeId: string) {
  const p = new URLSearchParams({
    autoplay: "1",
    mute: "0",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    iv_load_policy: "3",
  });
  return `https://www.youtube-nocookie.com/embed/${youtubeId}?${p.toString()}`;
}

/**
 * Max-res poster; desktop hover = muted segment loop (no controls). Click = full player.
 */
export function YouTubeInline({
  youtubeId,
  title,
  label,
  variant = "default",
  className = "",
  previewStartSeconds,
  previewDurationSeconds = DEFAULT_PREVIEW_DURATION,
}: Props) {
  const [play, setPlay] = useState(false);
  const [hoverPreview, setHoverPreview] = useState(false);
  const [thumbTier, setThumbTier] = useState<"max" | "hq">("max");
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const desktopHover = useDesktopHoverPreviewEnabled();
  const duration = previewDurationSeconds ?? DEFAULT_PREVIEW_DURATION;
  const canHoverPreview =
    desktopHover && previewStartSeconds != null && previewStartSeconds >= 0;

  const thumb =
    thumbTier === "max"
      ? `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`
      : `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;

  const fullSrc = buildFullEmbedSrc(youtubeId);

  const clearLeaveTimer = useCallback(() => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
  }, []);

  const onEnter = useCallback(() => {
    clearLeaveTimer();
    if (canHoverPreview) setHoverPreview(true);
  }, [canHoverPreview, clearLeaveTimer]);

  const onLeave = useCallback(() => {
    clearLeaveTimer();
    leaveTimer.current = setTimeout(() => setHoverPreview(false), 140);
  }, [clearLeaveTimer]);

  useEffect(() => () => clearLeaveTimer(), [clearLeaveTimer]);

  const frame =
    variant === "hero"
      ? "aspect-video w-full max-w-5xl md:mx-auto md:max-w-6xl"
      : "aspect-video w-full min-h-[13rem] sm:min-h-0";

  if (play) {
    return (
      <div
        className={`relative w-full overflow-hidden rounded-lg border border-white/[0.08] bg-black shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] ${frame} ${className}`}
      >
        <iframe
          key="full"
          src={fullSrc}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  const showPreviewIframe =
    hoverPreview && canHoverPreview && previewStartSeconds != null;

  return (
    <div
      className={`group relative w-full ${frame} ${className}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <button
        type="button"
        onClick={() => setPlay(true)}
        className="relative block h-full min-h-0 w-full overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0908] text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
        aria-label={`Play video: ${title}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- YouTube CDN thumbnails */}
        <img
          src={thumb}
          alt=""
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          onError={() => setThumbTier("hq")}
          className="relative z-0 h-full w-full object-cover opacity-[0.97] transition-opacity duration-300 group-hover:opacity-100"
        />

        {showPreviewIframe ? (
          <iframe
            key={`preview-${youtubeId}-${previewStartSeconds}`}
            src={buildPreviewEmbedSrc(youtubeId, previewStartSeconds, duration)}
            title=""
            aria-hidden
            tabIndex={-1}
            loading="eager"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="pointer-events-none absolute inset-0 z-[1] h-full w-full border-0"
          />
        ) : null}

        <div
          className={`pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/75 via-black/15 to-transparent transition-opacity duration-300 ${
            showPreviewIframe ? "from-black/45 via-black/5" : ""
          }`}
        />
        <div
          className={`pointer-events-none absolute inset-0 z-[2] transition-colors duration-300 ${
            showPreviewIframe ? "bg-black/0" : "bg-black/15 group-hover:bg-black/5"
          }`}
        />

        <div
          className={`pointer-events-none absolute inset-0 z-[3] flex items-center justify-center transition-opacity duration-300 ${
            showPreviewIframe ? "opacity-0" : "opacity-100"
          }`}
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/92 text-ink-950 shadow-lg ring-1 ring-white/30 md:h-16 md:w-16">
            <svg className="ml-1 h-7 w-7 md:h-8 md:w-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[3] p-4 md:p-5">
          {label ? (
            <p className="font-mono text-[0.45rem] font-bold uppercase tracking-[0.16em] text-accent/90">{label}</p>
          ) : null}
          <p className="text-base font-bold leading-tight text-white [text-wrap:balance] md:text-lg">
            {title}
          </p>
        </div>
      </button>
    </div>
  );
}
