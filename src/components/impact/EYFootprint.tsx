"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  GEORGIA_PATH_D,
  impactCaseHealth,
} from "@/content/impact-dashboard-briefing";

type View = "georgia" | "ATL" | "ATH" | "SAV";
type CityView = "ATL" | "ATH" | "SAV";

const VIEW_W = 310;
const VIEW_H = 350;
const VIEW_MIN_X = -10;
const VIEW_MIN_Y = -10;

/** Single source of truth: pin center (cx, cy) + legacy label anchors in viewBox space. */
const PIN_LAYOUT: Record<
  CityView,
  { cx: number; cy: number; lx: number; ly: number; labelAnchor: "start" | "middle" | "end" }
> = {
  ATL: { cx: 83, cy: 112.5, lx: 24, ly: 82, labelAnchor: "end" },
  ATH: { cx: 120, cy: 95, lx: 120, ly: 44, labelAnchor: "middle" },
  SAV: { cx: 222, cy: 288, lx: 272, ly: 285, labelAnchor: "start" },
};

const SEQ_ORDER: CityView[] = ["ATL", "ATH", "SAV"];

const LABEL_GAP = 8;

function pinLabelPosition(code: CityView, cx: number, cy: number) {
  switch (code) {
    case "ATL":
      return { x: cx - PIN_R - LABEL_GAP, y: cy + 3, anchor: "end" as const };
    case "ATH":
      return { x: cx, y: cy - PIN_R - LABEL_GAP, anchor: "middle" as const };
    case "SAV":
      return { x: cx + PIN_R + LABEL_GAP, y: cy + 3, anchor: "start" as const };
  }
}

function sequenceNumPosition(code: CityView, cx: number, cy: number) {
  switch (code) {
    case "ATL":
      return { x: cx - 2, y: cy + PIN_R + 11, anchor: "middle" as const };
    case "ATH":
      return { x: cx + PIN_R + 10, y: cy + 2, anchor: "start" as const };
    case "SAV":
      return { x: cx - PIN_R - 6, y: cy + 3, anchor: "end" as const };
  }
}

const PIN_R = 7;
const PIN_HIT_R = 22;

const CITY_SVG: Record<CityView, string> = {
  ATL: "/maps/cities/atl-grid.svg",
  ATH: "/maps/cities/ath-grid.svg",
  SAV: "/maps/cities/sav-grid.svg",
};

const GA_HATCH_PATTERN_ID = "impact-ey-ga-hatch";

const DRAW_MS = 600;
const RETURN_MS = 450;
const CARD_DELAY_MS = 500;

type CityCard = {
  hub: string;
  position: string;
  subtitle: string;
  frame: string;
  body: string;
  engagements: string;
  vaccinations: string;
};

const CITY_CARDS: Record<CityView, CityCard> = {
  ATL: {
    hub: "HUB-01 · ATLANTA",
    position: "01 / 03",
    subtitle: "Metro hub · anchor partner sites",
    frame: "REACH & DEPTH",
    body: "Anchor partner sites across metro Atlanta carried the bulk of program awareness. The hub paired large-venue activation with neighborhood-level partner clinics.",
    engagements: "2.41M",
    vaccinations: "452",
  },
  ATH: {
    hub: "HUB-02 · ATHENS",
    position: "02 / 03",
    subtitle: "Twilight Criterium · UGA Athletics partnership",
    frame: "CULTURE & CAMPUS",
    body: "Athens delivered through cultural and campus anchors. UGA Athletics opened the gate; the Twilight Criterium festival put activation in front of 20,000 spectators where they were already gathered.",
    engagements: "1.65M",
    vaccinations: "175",
  },
  SAV: {
    hub: "HUB-03 · SAVANNAH",
    position: "03 / 03",
    subtitle: "Coastal delivery · mobile teams",
    frame: "LAST-MILE EMBED",
    body: "Savannah ran on cultural embed and mobile reach. Forsyth Farmers' Market and Savannah Bananas home games hosted activation alongside Mayor visits — turning vaccination from a government program into a Saturday community moment.",
    engagements: "0.51M",
    vaccinations: "88",
  },
};

function isCityView(view: View): view is CityView {
  return view === "ATL" || view === "ATH" || view === "SAV";
}

async function preparePathsAsync(svg: SVGSVGElement): Promise<void> {
  const paths = Array.from(
    svg.querySelectorAll('g[class*="road-"] path'),
  ) as SVGPathElement[];
  const chunk = 120;
  for (let i = 0; i < paths.length; i += chunk) {
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    paths.slice(i, i + chunk).forEach((path) => {
      const len = path.getTotalLength();
      path.style.setProperty("--path-len", String(len));
      path.style.strokeDasharray = `${len}`;
      path.style.strokeDashoffset = `${len}`;
    });
  }
}

function hidePaths(svg: SVGSVGElement): void {
  svg.querySelectorAll('g[class*="road-"] path').forEach((node) => {
    const path = node as SVGPathElement;
    const len = path.style.getPropertyValue("--path-len") || String(path.getTotalLength());
    path.style.strokeDashoffset = len;
  });
}

function GeorgiaHatchPattern() {
  return (
    <defs>
      <pattern
        id={GA_HATCH_PATTERN_ID}
        patternUnits="userSpaceOnUse"
        width="6"
        height="6"
        patternTransform="rotate(45)"
      >
        <line
          x1="0"
          y1="0"
          x2="0"
          y2="6"
          className="impact-ey-footprint__ga-hatch-line"
        />
      </pattern>
    </defs>
  );
}

function CompassRose() {
  return (
    <svg className="impact-ey-footprint__compass" viewBox="0 0 36 36" aria-hidden>
      <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="1" />
      <line x1="18" y1="6" x2="18" y2="30" stroke="currentColor" strokeWidth="0.75" />
      <line x1="6" y1="18" x2="30" y2="18" stroke="currentColor" strokeWidth="0.75" />
      <polygon points="18,5 16,10 20,10" fill="currentColor" />
      <text x="18" y="8" textAnchor="middle" className="impact-ey-footprint__compass-label">
        N
      </text>
      <text x="31" y="20" textAnchor="middle" className="impact-ey-footprint__compass-label">
        E
      </text>
      <text x="18" y="33" textAnchor="middle" className="impact-ey-footprint__compass-label">
        S
      </text>
      <text x="5" y="20" textAnchor="middle" className="impact-ey-footprint__compass-label">
        W
      </text>
    </svg>
  );
}

export function EYFootprint({ tabActive }: { tabActive: boolean }) {
  const [view, setView] = useState<View>("georgia");
  const [animating, setAnimating] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [cityHtml, setCityHtml] = useState("");
  const [drawPhase, setDrawPhase] = useState<"idle" | "in" | "out">("idle");

  const cityMapRef = useRef<HTMLDivElement>(null);
  const svgCache = useRef<Partial<Record<CityView, string>>>({});
  const timers = useRef<number[]>([]);

  const cityMeta = impactCaseHealth.cities.map((c) => {
    const code = c.id === "atlanta" ? "ATL" : c.id === "athens" ? "ATH" : "SAV";
    const layout = PIN_LAYOUT[code as CityView];
    const label = code;
    const seqIndex = SEQ_ORDER.indexOf(code as CityView);
    return { ...c, code: code as CityView, layout, label, seqIndex };
  });

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  const schedule = useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timers.current.push(id);
  }, []);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  useEffect(() => {
    if (!tabActive) return;
    (["ATL", "ATH", "SAV"] as CityView[]).forEach((city) => {
      if (svgCache.current[city]) return;
      fetch(CITY_SVG[city])
        .then((r) => r.text())
        .then((html) => {
          svgCache.current[city] = html;
        })
        .catch(() => {});
    });
  }, [tabActive]);

  const runDrawIn = useCallback(
    async (mode: "in" | "out") => {
      const host = cityMapRef.current;
      if (!host || reduceMotion) return;
      const svg = host.querySelector("svg");
      if (!svg) return;

      if (mode === "in") {
        await preparePathsAsync(svg);
        setDrawPhase("idle");
        requestAnimationFrame(() => setDrawPhase("in"));
      } else {
        hidePaths(svg);
        setDrawPhase("out");
      }
    },
    [reduceMotion],
  );

  const zoomIn = useCallback(
    async (city: CityView) => {
      if (animating || view !== "georgia") return;
      clearTimers();
      setAnimating(true);
      setCardVisible(false);

      const cached = svgCache.current[city];
      const html: string = cached ?? (await fetch(CITY_SVG[city]).then((r) => r.text()));
      svgCache.current[city] = html;
      setCityHtml(html);
      setView(city);

      if (!reduceMotion) {
        schedule(() => void runDrawIn("in"), 50);
      } else {
        setDrawPhase("in");
      }

      schedule(() => setCardVisible(true), reduceMotion ? 80 : CARD_DELAY_MS);
      schedule(() => setAnimating(false), reduceMotion ? 180 : DRAW_MS);
    },
    [animating, view, reduceMotion, runDrawIn, clearTimers, schedule],
  );

  const zoomOut = useCallback(async () => {
    if (animating || view === "georgia" || !isCityView(view)) return;
    clearTimers();
    setAnimating(true);
    setCardVisible(false);

    if (!reduceMotion) {
      await runDrawIn("out");
    }

    schedule(() => {
      setView("georgia");
      setCityHtml("");
      setDrawPhase("idle");
    }, reduceMotion ? 0 : RETURN_MS);

    schedule(() => setAnimating(false), reduceMotion ? 180 : RETURN_MS);
  }, [animating, view, reduceMotion, runDrawIn, clearTimers, schedule]);

  useEffect(() => {
    if (!tabActive) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && view !== "georgia") {
        void zoomOut();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [tabActive, view, zoomOut]);

  useEffect(() => {
    if (!tabActive) {
      setView("georgia");
      setAnimating(false);
      setCardVisible(false);
      setCityHtml("");
      setDrawPhase("idle");
    }
  }, [tabActive]);

  const georgiaVisible = view === "georgia";
  const georgiaDimmed = !georgiaVisible;
  const figStamp = isCityView(view) ? "FIG. 03-B · 1 : 1" : "FIG. 03-A · 1 : 1";
  const scaleLabel = isCityView(view) ? "10 mi" : "100 mi";

  return (
    <div
      className={`impact-ey-footprint${reduceMotion ? " is-reduced-motion" : ""}${animating ? " is-animating" : ""}`}
      data-view={view}
    >
      <div className="impact-ey-footprint__stage">
        <div className="impact-ey-footprint__fig-stamp">{figStamp}</div>
        <div className="impact-ey-footprint__scale" aria-hidden>
          <span className="impact-ey-footprint__scale-bar" />
          <span className="impact-ey-footprint__scale-label">{scaleLabel}</span>
        </div>
        <CompassRose />

        {animating && isCityView(view) && !reduceMotion && (
          <div className="impact-ey-footprint__draw-hint" aria-hidden>
            ▱ Topology drawing in · stroke-dash
          </div>
        )}

        <div
          className={`impact-ey-footprint__georgia${georgiaDimmed ? " is-dimmed" : ""}${reduceMotion && georgiaDimmed ? " is-crossfade" : ""}`}
        >
          <svg
            viewBox={`${VIEW_MIN_X} ${VIEW_MIN_Y} ${VIEW_W} ${VIEW_H}`}
            preserveAspectRatio="xMidYMid meet"
            aria-hidden={!georgiaVisible}
            className="impact-ey-footprint__georgia-svg"
          >
            <GeorgiaHatchPattern />
            {georgiaVisible && (
              <path
                className="impact-ey-footprint__georgia-hatch"
                d={GEORGIA_PATH_D}
                fill={`url(#${GA_HATCH_PATTERN_ID})`}
                aria-hidden
              />
            )}
            <path className="impact-ey-footprint__georgia-outline" d={GEORGIA_PATH_D} />
            {georgiaVisible &&
              cityMeta.map((c) => {
                const { cx, cy } = c.layout;
                const labelPos = pinLabelPosition(c.code, cx, cy);
                const seqPos = sequenceNumPosition(c.code, cx, cy);
                const seqNum = String(c.seqIndex + 1).padStart(2, "0");

                return (
                  <g key={c.code} className="impact-ey-footprint__pin-group">
                    <text
                      className="impact-ey-footprint__pin-label-text"
                      x={labelPos.x}
                      y={labelPos.y}
                      textAnchor={labelPos.anchor}
                    >
                      {c.label}
                    </text>
                    <text
                      className="impact-ey-footprint__sequence-num"
                      x={seqPos.x}
                      y={seqPos.y}
                      textAnchor={seqPos.anchor}
                      aria-hidden
                    >
                      {seqNum}
                    </text>
                    <circle
                      className="impact-ey-footprint__pin-dot"
                      cx={cx}
                      cy={cy}
                      r={PIN_R}
                    />
                    <circle
                      className="impact-ey-footprint__pin-hit"
                      cx={cx}
                      cy={cy}
                      r={PIN_HIT_R}
                      tabIndex={0}
                      role="button"
                      aria-label={`Inspect ${c.name} hub`}
                      onClick={() => void zoomIn(c.code)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          void zoomIn(c.code);
                        }
                      }}
                    />
                  </g>
                );
              })}
          </svg>
        </div>

        {isCityView(view) && (
          <div
            ref={cityMapRef}
            className={`impact-ey-footprint__citymap citymap is-${drawPhase}`}
            dangerouslySetInnerHTML={{ __html: cityHtml }}
            aria-hidden
          />
        )}

        {!georgiaVisible && (
          <button
            type="button"
            className="impact-ey-footprint__zoomout zoomout-stamp"
            onClick={() => void zoomOut()}
            aria-label="Back to Georgia footprint"
          >
            <span className="ic" aria-hidden>
              ↺
            </span>{" "}
            BACK TO GEORGIA
          </button>
        )}

        <div
          className={`impact-ey-footprint__card citycard${cardVisible && isCityView(view) ? " is-visible" : ""}`}
          aria-live="polite"
        >
          {isCityView(view) && (
            <>
              <div className="pn">
                <span>{CITY_CARDS[view].hub}</span>
                <span className="pos">{CITY_CARDS[view].position}</span>
              </div>
              <h5>{CITY_CARDS[view].subtitle}</h5>
              <div className="frame">{CITY_CARDS[view].frame}</div>
              <p>{CITY_CARDS[view].body}</p>
              <div className="stats">
                <div>
                  <div className="v">{CITY_CARDS[view].engagements}</div>
                  <div className="l">Engagements</div>
                </div>
                <div>
                  <div className="v">{CITY_CARDS[view].vaccinations}</div>
                  <div className="l">Vaccinations</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
