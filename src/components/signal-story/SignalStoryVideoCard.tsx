"use client";

import { useState } from "react";
import type { SignalStoryVideo } from "@/content/signal-story";

type Props = {
  video: SignalStoryVideo;
  featured?: boolean;
};

function youtubeWatchUrl(youtubeId: string) {
  return `https://www.youtube.com/watch?v=${youtubeId}`;
}

function thumbUrl(youtubeId: string, tier: "max" | "hq") {
  return tier === "max"
    ? `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`
    : `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
}

export function SignalStoryVideoCard({ video, featured = false }: Props) {
  const [thumbTier, setThumbTier] = useState<"max" | "hq">("max");
  const kicker = featured
    ? `FEATURED · ${video.figCode} · ${video.figSlug}`
    : `${video.figCode} · ${video.figSlug}`;

  return (
    <article
      className={`signal-story-card${featured ? " signal-story-card--featured" : ""}`}
    >
      <p className="signal-story-card__kicker">{kicker}</p>
      <a
        className="signal-story-card__link"
        href={youtubeWatchUrl(video.youtubeId)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Watch ${video.title} on YouTube`}
      >
        <span className="signal-story-card__thumb-wrap">
          <span className="signal-story-card__ref" aria-hidden>
            {video.figCode}
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element -- YouTube poster CDN */}
          <img
            className="signal-story-card__thumb"
            src={thumbUrl(video.youtubeId, thumbTier)}
            alt=""
            loading={featured ? "eager" : "lazy"}
            decoding="async"
            onError={() => setThumbTier("hq")}
          />
        </span>
        <span className="signal-story-card__copy">
          <span className="signal-story-card__title">{video.title}</span>
          {video.label ? (
            <span className="signal-story-card__label">{video.label}</span>
          ) : null}
        </span>
      </a>
    </article>
  );
}
