"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  GEORGIA_PATH_D,
  impactCaseHealth,
} from "@/content/impact-dashboard-briefing";

type View = "georgia" | "ATL" | "ATH" | "SAV" | "summary";
type CityView = "ATL" | "ATH" | "SAV";
type BreadcrumbSlot = CityView | "SUM";

const VIEW_W = 310;
const VIEW_H = 350;
const VIEW_MIN_X = -10;
const VIEW_MIN_Y = -10;

const CITY_SVG: Record<CityView, string> = {
  ATL: "/maps/cities/atl-grid.svg",
  ATH: "/maps/cities/ath-grid.svg",
  SAV: "/maps/cities/sav-grid.svg",
};

const CITY_MAP: Record<CityView, "atl" | "ath" | "sav"> = {
  ATL: "atl",
  ATH: "ath",
  SAV: "sav",
};

const BREADCRUMB: { slot: BreadcrumbSlot; label: string; view: View; index: number }[] = [
  { slot: "ATL", label: "ATL", view: "ATL", index: 1 },
  { slot: "ATH", label: "ATH", view: "ATH", index: 2 },
  { slot: "SAV", label: "SAV", view: "SAV", index: 3 },
  { slot: "SUM", label: "SUM", view: "summary", index: 4 },
];

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

export function EYFootprint({ tabActive }: { tabActive: boolean }) {
  const [view, setView] = useState<View>("georgia");
  const [inspected, setInspected] = useState<Set<CityView>>(() => new Set());
  const [animating, setAnimating] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [cityHtml, setCityHtml] = useState("");
  const [drawPhase, setDrawPhase] = useState<"idle" | "in" | "out">("idle");
  const [ghostHtml, setGhostHtml] = useState<Partial<Record<CityView, string>>>({});

  const cityMapRef = useRef<HTMLDivElement>(null);
  const svgCache = useRef<Partial<Record<CityView, string>>>({});
  const timers = useRef<number[]>([]);

  const cities = impactCaseHealth.cities;
  const pinPositions = cities.map((c) => {
    const code = c.id === "atlanta" ? "ATL" : c.id === "athens" ? "ATH" : "SAV";
    return { ...c, code: code as CityView, ...toPercent(c.cx, c.cy) };
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

  const goToView = useCallback(
    async (next: View) => {
      if (animating || next === view) return;
      clearTimers();
      setAnimating(true);
      setCardVisible(false);

      const fromCity = isCityView(view);
      const toCity = isCityView(next);
      const leavingDetail = view !== "georgia" && next === "georgia";
      const swappingCity = fromCity && toCity && view !== next;

      if (leavingDetail || swappingCity) {
        if (!reduceMotion && fromCity) {
          await runDrawIn("out");
        }
        schedule(() => {
          if (leavingDetail) {
            setCityHtml("");
            setDrawPhase("idle");
          }
        }, reduceMotion ? 0 : RETURN_MS);
      }

      const applyNext = async () => {
        setView(next);

        if (toCity) {
          setInspected((prev) => new Set(prev).add(next));
          const cached = svgCache.current[next];
          const html: string =
            cached ?? (await fetch(CITY_SVG[next]).then((r) => r.text()));
          svgCache.current[next] = html;
          setCityHtml(html);
        } else if (next === "summary") {
          setCityHtml("");
          const ghosts: Partial<Record<CityView, string>> = {};
          for (const city of ["ATL", "ATH", "SAV"] as CityView[]) {
            ghosts[city] =
              svgCache.current[city] ??
              (await fetch(CITY_SVG[city]).then((r) => r.text()));
            svgCache.current[city] = ghosts[city]!;
          }
          setGhostHtml(ghosts);
        } else {
          setCityHtml("");
          setDrawPhase("idle");
        }

        if (toCity && !reduceMotion) {
          schedule(() => void runDrawIn("in"), 50);
        } else if (toCity && reduceMotion) {
          setDrawPhase("in");
        }

        const cardDelay =
          reduceMotion ? 80 : view === "georgia" || swappingCity ? CARD_DELAY_MS : 120;
        schedule(() => setCardVisible(next !== "georgia"), cardDelay);

        const animMs = reduceMotion
          ? 180
          : leavingDetail
            ? RETURN_MS
            : toCity || next === "summary"
              ? DRAW_MS
              : 200;

        schedule(() => setAnimating(false), animMs);
      };

      if (leavingDetail || swappingCity) {
        schedule(() => void applyNext(), reduceMotion ? 0 : RETURN_MS);
      } else {
        await applyNext();
      }
    },
    [animating, view, reduceMotion, runDrawIn, clearTimers, schedule],
  );

  useEffect(() => {
    if (!tabActive) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && view !== "georgia") {
        void goToView("georgia");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [tabActive, view, goToView]);

  useEffect(() => {
    if (!tabActive) {
      setView("georgia");
      setInspected(new Set());
      setAnimating(false);
      setCardVisible(false);
      setCityHtml("");
      setDrawPhase("idle");
    }
  }, [tabActive]);

  const breadcrumbActive = BREADCRUMB.find((b) => b.view === view);
  const showChrome = view !== "georgia";
  const georgiaDimmed = view !== "georgia";
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
        <svg className="impact-ey-footprint__compass" viewBox="0 0 24 24" aria-hidden>
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1" />
          <path
            d="M12 4 L12 8 M12 16 L12 20 M4 12 L8 12 M16 12 L20 12"
            stroke="currentColor"
            strokeWidth="1"
          />
          <text x="12" y="7" textAnchor="middle" className="impact-ey-footprint__compass-n">
            N
          </text>
        </svg>

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
            className="p3"
          >
            <g className="grid">
              <line x1={VIEW_MIN_X + 70} y1={VIEW_MIN_Y} x2={VIEW_MIN_X + 70} y2={VIEW_MIN_Y + VIEW_H} />
              <line
                x1={VIEW_MIN_X + VIEW_W / 2}
                y1={VIEW_MIN_Y}
                x2={VIEW_MIN_X + VIEW_W / 2}
                y2={VIEW_MIN_Y + VIEW_H}
              />
              <line
                x1={VIEW_MIN_X + VIEW_W - 20}
                y1={VIEW_MIN_Y}
                x2={VIEW_MIN_X + VIEW_W - 20}
                y2={VIEW_MIN_Y + VIEW_H}
              />
              <line x1={VIEW_MIN_X} y1={VIEW_MIN_Y + 60} x2={VIEW_MIN_X + VIEW_W} y2={VIEW_MIN_Y + 60} />
              <line
                x1={VIEW_MIN_X}
                y1={VIEW_MIN_Y + VIEW_H / 2}
                x2={VIEW_MIN_X + VIEW_W}
                y2={VIEW_MIN_Y + VIEW_H / 2}
              />
            </g>
            <path className="outline" d={GEORGIA_PATH_D} />
            <text className="map-label" x={VIEW_MIN_X + 4} y={VIEW_MIN_Y + 22}>
              FIG. 03 · DELIVERY FOOTPRINT
            </text>
          </svg>

          {pinPositions.map((c) => (
            <button
              key={c.code}
              type="button"
              className={`impact-ey-footprint__pin${inspected.has(c.code) ? " is-inspected" : ""}${view === c.code ? " is-active" : ""}`}
              style={{ left: c.left, top: c.top }}
              onClick={() => void goToView(c.code)}
              aria-label={`Inspect ${c.name} hub`}
              aria-pressed={view === c.code}
            >
              <span className="dot" aria-hidden />
              <span className="lbl">
                <b>{c.name.slice(0, 3).toUpperCase()}</b> · Hub-{c.idLabel}
              </span>
            </button>
          ))}
        </div>

        {view === "summary" && (
          <div className="impact-ey-footprint__ghosts" aria-hidden>
            {(["ATL", "ATH", "SAV"] as CityView[]).map((city) => (
              <div
                key={city}
                className={`impact-ey-footprint__ghost impact-ey-footprint__ghost--${CITY_MAP[city]}`}
                dangerouslySetInnerHTML={{ __html: ghostHtml[city] ?? "" }}
              />
            ))}
          </div>
        )}

        {isCityView(view) && (
          <div
            ref={cityMapRef}
            className={`impact-ey-footprint__citymap citymap is-${drawPhase}`}
            dangerouslySetInnerHTML={{ __html: cityHtml }}
            aria-hidden
          />
        )}

        {showChrome && (
          <button
            type="button"
            className="impact-ey-footprint__zoomout zoomout-stamp"
            onClick={() => void goToView("georgia")}
            aria-label="Zoom out to Georgia footprint"
          >
            <span className="ic" aria-hidden>
              ↺
            </span>{" "}
            FIG. 03 · ZOOM OUT
          </button>
        )}

        {showChrome && breadcrumbActive && (
          <nav className="impact-ey-footprint__breadcrumb breadcrumb" aria-label="Footprint views">
            <span className="impact-ey-footprint__breadcrumb-pos">
              <span className="pos">{breadcrumbActive.index}/4</span>
              {" · "}
              <span className="city">{breadcrumbActive.label}</span>
            </span>
            <div className="impact-ey-footprint__breadcrumb-track track" role="tablist">
              {BREADCRUMB.map((b) => {
                const lit =
                  b.slot === "SUM" ? view === "summary" : inspected.has(b.slot as CityView);
                return (
                  <button
                    key={b.slot}
                    type="button"
                    role="tab"
                    aria-selected={view === b.view}
                    aria-label={`View ${b.label}`}
                    className={`impact-ey-footprint__breadcrumb-dot${lit ? " is-lit lit" : ""}${view === b.view ? " is-active" : ""}`}
                    onClick={() => void goToView(b.view)}
                  />
                );
              })}
            </div>
          </nav>
        )}

        <div
          className={`impact-ey-footprint__card citycard${cardVisible ? " is-visible" : ""}`}
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
          {view === "summary" && (
            <>
              <div className="pn">
                <span>PROGRAM TOTAL</span>
              </div>
              <div className="stats stats--summary">
                <div>
                  <div className="v">
                    4.57<span className="u">M</span>
                  </div>
                  <div className="l">Engagements</div>
                </div>
                <div>
                  <div className="v">715</div>
                  <div className="l">Vaccinations</div>
                </div>
                <div>
                  <div className="v">3</div>
                  <div className="l">Hubs</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
