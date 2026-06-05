"use client";

import Link from "next/link";
import { FicheNav } from "@/components/layout/FicheNav";
import { signalStoryCopy, signalStoryPageVideos } from "@/content/signal-story";
import { SignalStoryVideoCard } from "./SignalStoryVideoCard";

const ARCHIVE_REV = "05/26";
const SHEET_REV = "v2026.05";

export function SignalStoryView() {
  const [featured, ...grid] = signalStoryPageVideos;

  return (
    <div className="signal-story-page">
      <FicheNav />
      <a href="#signal-story-main" className="skip">
        Skip to content
      </a>

      <main id="signal-story-main" className="signal-story-portfolio">
        <header className="signal-story-hero" data-screen-label="Archive index">
          <span className="margin-note">ARCHIVE · SIGNAL → STORY</span>
          <span className="fig-stamp">IDX. 01 · SIGNAL → STORY</span>

          <dl className="archive-stamp" aria-label="Archive metadata">
            <dt>ARCHIVE NO.</dt>
            <dd>01 / 01</dd>
            <dt>SCOPE</dt>
            <dd>MOMENTS · BEHAVIOR · CULTURE · EMOTION</dd>
            <dt>COUNT</dt>
            <dd>6 FILMS · ONGOING</dd>
            <dt>LAST REV.</dt>
            <dd>{ARCHIVE_REV}</dd>
          </dl>

          <div className="signal-story-hero__inner">
            <p className="kicker">{signalStoryCopy.eyebrow.toUpperCase()}</p>
            <h1 className="signal-story-hero__h1">{signalStoryCopy.title}</h1>
            <p className="signal-story-hero__intro">{signalStoryCopy.intro}</p>
            <Link href="/" className="cta cta--quiet">
              ← Home
            </Link>
          </div>
        </header>

        <section className="signal-story-archive" aria-label="Film archive">
          <div className="signal-story-grid">
            <SignalStoryVideoCard video={featured} featured />
            {grid.map((video) => (
              <SignalStoryVideoCard key={video.youtubeId} video={video} />
            ))}
          </div>
        </section>

        <footer className="sheet" aria-label="Sheet metadata">
          <div className="sheet__cell">
            <span>PAGE</span>
            <b>SIGNAL → STORY</b>
          </div>
          <div className="sheet__cell">
            <span>DRAWN</span>
            <b>M. STANGL</b>
          </div>
          <div className="sheet__cell">
            <span>SCOPE</span>
            <b>ARCHIVE</b>
          </div>
          <div className="sheet__cell">
            <span>COUNT</span>
            <b>6 FILMS</b>
          </div>
          <div className="sheet__cell">
            <span>REV.</span>
            <b>{SHEET_REV}</b>
          </div>
        </footer>
      </main>
    </div>
  );
}
