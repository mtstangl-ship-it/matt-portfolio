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

/** Pin positions in Georgia SVG viewBox space (brief QA corrections). */
const PIN_LAYOUT: Record<
  CityView,
  { cx: number; cy: number; lx: number; ly: number }
> = {
  ATL: { cx: 83, cy: 112.5, lx: 28, ly: 82 },
  ATH: { cx: 120, cy: 95, lx: 120, ly: 48 },
  SAV: { cx: 232, cy: 235, lx: 282, ly: 232 },
};

const CITY_SVG: Record<CityView, string> = {
  ATL: "/maps/cities/atl-grid.svg",
  ATH: "/maps/cities/ath-grid.svg",
  SAV: "/maps/cities/sav-grid.svg",
};

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

function toPercent(cx: number, cy: number): { left: string; top: string } {
  const left = ((cx - VIEW_MIN_X) / VIEW_W) * 100;
  const top = ((cy - VIEW_MIN_Y) / VIEW_H) * 100;
  return { left: `${left}%`, top: `${top}%` };
}

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

function CompassRose() {
  return (
    <svg className="impact-ey-footprint__compass" viewBox="0 0 40 40" aria-hidden>
      <circle cx="20" cy="20" r="17" fill="none" stroke="currentColor" strokeWidth="1" />
      <line x1="20" y1="4" x2="20" y2="36" stroke="currentColor" strokeWidth="0.75" />
      <line x1="4" y1="20" x2="36" y2="20" stroke="currentColor" strokeWidth="0.75" />
      <line x1="8" y1="8" x2="32" y2="32" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
      <line x1="32" y1="8" x2="8" y2="32" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
      <text x="20" y="11" textAnchor="middle" className="impact-ey-footprint__compass-label">
        N
      </text>
      <text x="33" y="22" textAnchor="middle" className="impact-ey-footprint__compass-label">
        E
      </text>
      <text x="20" y="35" textAnchor="middle" className="impact-ey-footprint__compass-label">
        S
      </text>
      <text x="7" y="22" textAnchor="middle" className="impact-ey-footprint__compass-label">
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
  const [activeCity, setActiveCity] = useState<CityView | null>(null);

  const cityMapRef = useRef<HTMLDivElement>(null);
  const svgCache = useRef<Partial<Record<CityView, string>>>({});
  const timers = useRef<number[]>([]);

  const cityMeta = impactCaseHealth.cities.map((c) => {
    const code = c.id === "atlanta" ? "ATL" : c.id === "athens" ? "ATH" : "SAV";
    const layout = PIN_LAYOUT[code as CityView];
    const dot = toPercent(layout.cx, layout.cy);
    const label = toPercent(layout.lx, layout.ly);
    return { ...c, code: code as CityView, layout, dot, label };
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
      setActiveCity(city);

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
      setActiveCity(null);
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
      setActiveCity(null);
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
      <div className="impact-ey-footprint__stage overlay-stage">
        <div className="impact-ey-footprint__fig-stamp">{figStamp}</div>
        <div className="impact-ey-footprint__scale" aria-hidden>
          <span className="impact-ey-footprint__scale-bar" />
          <span className="impact-ey-footprint__scale-label">{scaleLabel}</span>
        </div>
        <CompassRose />

        {georgiaVisible && (
          <div className="impact-ey-footprint__program-total" aria-label="Program totals">
            <div className="impact-ey-footprint__program-total-title">Program total</div>
            <div className="impact-ey-footprint__program-total-row">
              <span className="v">4.57M</span>
              <span className="l">Engagements</span>
            </div>
            <div className="impact-ey-footprint__program-total-row">
              <span className="v">715</span>
              <span className="l">Vaccinations</span>
            </div>
            <div className="impact-ey-footprint__program-total-row">
              <span className="v">3</span>
              <span className="l">Hubs</span>
            </div>
          </div>
        )}

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
            aria-hidden
            className="p3 impact-ey-footprint__georgia-svg"
          >
            <path className="outline" d={GEORGIA_PATH_D} />
            <g className="impact-ey-footprint__pin-leaders">
              {cityMeta.map((c) => (
                <g key={c.code}>
                  <line
                    className="impact-ey-footprint__leader"
                    x1={c.layout.cx}
                    y1={c.layout.cy}
                    x2={c.layout.lx}
                    y2={c.layout.ly}
                  />
                  <g className="impact-ey-footprint__pin-tick" transform={`translate(${c.layout.cx} ${c.layout.cy})`}>
                    <line x1="-5" y1="0" x2="5" y2="0" />
                    <line x1="0" y1="-5" x2="0" y2="5" />
                  </g>
                </g>
              ))}
            </g>
          </svg>

          {georgiaVisible &&
            cityMeta.map((c) => (
              <div key={c.code} className="impact-ey-footprint__pin-wrap">
                <button
                  type="button"
                  className={`impact-ey-footprint__pin${activeCity === c.code ? " is-active" : ""}`}
                  style={c.dot}
                  onClick={() => void zoomIn(c.code)}
                  aria-label={`Inspect ${c.name} hub`}
                >
                  <span className="dot" aria-hidden />
                </button>
                <span
                  className="impact-ey-footprint__pin-label"
                  style={c.label}
                  aria-hidden
                >
                  <b>{c.name.slice(0, 3).toUpperCase()}</b> · Hub-{c.idLabel}
                </span>
              </div>
            ))}
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
            aria-label="Zoom out to Georgia footprint"
          >
            <span className="ic" aria-hidden>
              ↺
            </span>{" "}
            FIG. 03 · ZOOM OUT
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
