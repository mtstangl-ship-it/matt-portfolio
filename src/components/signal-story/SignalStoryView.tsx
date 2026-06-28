"use client";

import Link from "next/link";
import { FicheNav } from "@/components/layout/FicheNav";
import { signalStoryCopy, signalStoryPageVideos } from "@/content/signal-story";
import { SignalStoryVideoCard } from "./SignalStoryVideoCard";

const ARCHIVE_REV = "05/26";
const SHEET_REV = "v2026.05";

const DIM_TICKS = [0, 80, 160, 240, 320, 400, 480, 560, 640, 720, 800];

function DimRibbon({ label }: { label: string }) {
  return (
    <div className="dim-with-scale" aria-hidden="true">
      <p className="dim">{label}</p>
      <svg
        className="dim-scale"
        viewBox="0 0 800 20"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="0" y1="4" x2="800" y2="4" stroke="var(--ink-line)" strokeWidth="1" />
        <g stroke="var(--ink-3)" strokeWidth="1">
          {DIM_TICKS.map((x) => (
            <line key={x} x1={x} y1="4" x2={x} y2="14" />
          ))}
        </g>
      </svg>
    </div>
  );
}

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
          <span className="signal-story-hero__xhair signal-story-hero__xhair--tl" aria-hidden />
          <span className="signal-story-hero__xhair signal-story-hero__xhair--br" aria-hidden />
        </header>

        <DimRibbon label="↘ FILM INDEX · SIX ENTRIES" />

        <section className="signal-story-archive" aria-label="Film archive" data-screen-label="Film index">
          <span className="margin-note">DRAWING 02 · FILM INDEX</span>
          <span className="fig-stamp">FIG. 02 · FILM INDEX</span>

          <div className="signal-story-grid-plate">
            <p className="signal-story-grid-plate__label">INDEX · YOUTUBE ARCHIVE · 6 ENTRIES</p>
            <div className="signal-story-grid">
            <SignalStoryVideoCard video={featured} featured />
            {grid.map((video) => (
              <SignalStoryVideoCard key={video.youtubeId} video={video} />
            ))}
            </div>
            <span className="signal-story-grid-plate__xhair signal-story-grid-plate__xhair--tl" aria-hidden />
            <span className="signal-story-grid-plate__xhair signal-story-grid-plate__xhair--tr" aria-hidden />
            <span className="signal-story-grid-plate__xhair signal-story-grid-plate__xhair--bl" aria-hidden />
            <span className="signal-story-grid-plate__xhair signal-story-grid-plate__xhair--br" aria-hidden />
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
