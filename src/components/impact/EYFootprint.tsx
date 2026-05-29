"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  GEORGIA_PATH_D,
  impactCaseHealth,
} from "@/content/impact-dashboard-briefing";

type CityId = "atl" | "ath" | "sav" | "sum";

const VIEW_W = 310;
const VIEW_H = 350;
const VIEW_MIN_X = -10;
const VIEW_MIN_Y = -10;

function toPercent(cx: number, cy: number): { left: string; top: string } {
  const left = ((cx - VIEW_MIN_X) / VIEW_W) * 100;
  const top = ((cy - VIEW_MIN_Y) / VIEW_H) * 100;
  return { left: `${left}%`, top: `${top}%` };
}

const CITY_ORDER: CityId[] = ["atl", "ath", "sav", "sum"];
/** Scroll-sync cities — summary panel excluded from IO until user scrolls to it. */
const SCROLL_CITIES: CityId[] = ["atl", "ath", "sav"];

const PROGRESS_LABELS: Record<CityId, string> = {
  atl: "1 / 3 · Atlanta",
  ath: "2 / 3 · Athens",
  sav: "3 / 3 · Savannah",
  sum: "3 / 3 · Complete",
};

const PANEL_COPY: Record<
  Exclude<CityId, "sum">,
  { hub: string; frame: string; body: string }
> = {
  atl: {
    hub: "HUB-01",
    frame: "Reach & depth",
    body: "Anchor partner sites across metro Atlanta carried the bulk of program awareness. The hub paired large-venue activation with neighborhood-level partner clinics.",
  },
  ath: {
    hub: "HUB-02",
    frame: "Cultural anchor",
    body: "Embedded the program in the city's signature events, with UGA Athletics carrying the activation message into student and family channels.",
  },
  sav: {
    hub: "HUB-03",
    frame: "Last-mile reach",
    body: "Mobile teams across coastal communities, paired with maritime & tourism employers to extend the program past the metro footprint.",
  },
};

const cityIdMap = {
  atlanta: "atl",
  athens: "ath",
  savannah: "sav",
} as const;

export function EYFootprint({ tabActive }: { tabActive: boolean }) {
  const [activeCity, setActiveCity] = useState<CityId>("atl");
  const activeCityRef = useRef<CityId>("atl");
  const ioEnabledRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const panelRefs = useRef<Partial<Record<CityId, HTMLElement | null>>>({});

  const setActiveCityStable = useCallback((city: CityId) => {
    if (activeCityRef.current === city) return;
    activeCityRef.current = city;
    setActiveCity(city);
  }, []);

  useEffect(() => {
    activeCityRef.current = activeCity;
  }, [activeCity]);

  useEffect(() => {
    if (!tabActive) {
      ioEnabledRef.current = false;
      return;
    }
    activeCityRef.current = "atl";
    setActiveCity("atl");
    ioEnabledRef.current = false;
    const t = window.setTimeout(() => {
      ioEnabledRef.current = true;
    }, 200);
    return () => window.clearTimeout(t);
  }, [tabActive]);

  useEffect(() => {
    if (!tabActive) return;

    const evaluate = () => {
      if (!ioEnabledRef.current) return;
      const vh = window.innerHeight || 800;
      const line = vh * 0.25;
      const current = activeCityRef.current;

      const crossed: CityId[] = [];
      SCROLL_CITIES.forEach((id) => {
        const p = panelRefs.current[id];
        if (!p) return;
        const r = p.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const center = r.top + r.height / 2;
        if (center <= line) crossed.push(id);
      });

      let next: CityId | null = null;
      if (crossed.length > 0) {
        next = crossed[crossed.length - 1];
      }

      const sumPanel = panelRefs.current.sum;
      if (sumPanel) {
        const r = sumPanel.getBoundingClientRect();
        const center = r.top + r.height / 2;
        if (center <= line && r.top >= 0 && r.top < vh * 0.55) {
          next = "sum";
        }
      }

      if (next && next !== current) {
        setActiveCityStable(next);
      }
    };

    const io = new IntersectionObserver(
      () => {
        if (rafRef.current != null) return;
        rafRef.current = requestAnimationFrame(() => {
          rafRef.current = null;
          evaluate();
        });
      },
      { rootMargin: "-25% 0px -50% 0px", threshold: [0, 0.2, 0.5, 1] },
    );

    SCROLL_CITIES.forEach((id) => {
      const p = panelRefs.current[id];
      if (p) io.observe(p);
    });

    const sumPanel = panelRefs.current.sum;
    if (sumPanel) io.observe(sumPanel);

    return () => {
      io.disconnect();
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [tabActive, setActiveCityStable]);

  const idx = CITY_ORDER.indexOf(activeCity);
  const lit = new Set<CityId>();
  for (let i = 0; i <= idx; i++) {
    const c = CITY_ORDER[i];
    if (c !== "sum") lit.add(c);
  }

  const cities = impactCaseHealth.cities;
  const pinPositions = cities.map((c) => {
    const id = cityIdMap[c.id];
    const pos = toPercent(c.cx, c.cy);
    return { ...c, mapId: id, ...pos };
  });

  return (
    <div className="impact-footprint">
      <div className="impact-footprint__layout">
        <div className="impact-map-pin">
          <div className="map-stage" id="mapStage">
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
              <line
                id="route-atl-ath"
                className={`route${lit.has("atl") && lit.has("ath") ? " lit" : ""}`}
                x1={cities[0].cx}
                y1={cities[0].cy}
                x2={cities[1].cx}
                y2={cities[1].cy}
              />
              <line
                id="route-atl-sav"
                className={`route${lit.has("atl") && lit.has("sav") ? " lit" : ""}`}
                x1={cities[0].cx}
                y1={cities[0].cy}
                x2={cities[2].cx}
                y2={cities[2].cy}
              />
              <line
                id="route-ath-sav"
                className={`route${lit.has("ath") && lit.has("sav") ? " lit" : ""}`}
                x1={cities[1].cx}
                y1={cities[1].cy}
                x2={cities[2].cx}
                y2={cities[2].cy}
              />
              <text className="map-label" x={VIEW_MIN_X + 4} y={VIEW_MIN_Y + 22}>
                FIG. 03 · DELIVERY FOOTPRINT
              </text>
            </svg>

            {pinPositions.map((c) => (
              <div
                key={c.mapId}
                id={`pin-${c.mapId}`}
                className={`impact-map-pin-marker${lit.has(c.mapId as CityId) ? " is-active" : ""}`}
                style={{ left: c.left, top: c.top }}
              >
                <span className="dot" />
                <span className="lbl">
                  <b>{c.name.slice(0, 3).toUpperCase()}</b> · Hub-
                  {c.idLabel}
                </span>
              </div>
            ))}

            <div className="map-progress" aria-hidden>
              {(["atl", "ath", "sav"] as const).map((id) => (
                <span
                  key={id}
                  id={`pip-${id}`}
                  className={`pip${lit.has(id) ? " is-active" : ""}`}
                />
              ))}
              <span>
                You are here<b>{PROGRESS_LABELS[activeCity]}</b>
              </span>
            </div>

            <div
              className={`map-endstamp${activeCity === "sum" ? " is-on" : ""}`}
              id="mapEndstamp"
            >
              End of program · 3 hubs lit
            </div>
          </div>
        </div>

        <div className="city-stack" id="cityStack">
          {cities.map((city) => {
            const mapId = cityIdMap[city.id];
            const copy = PANEL_COPY[mapId];
            const vaccines = city.numSmall.split(" · ")[1]?.replace(" vaccines", "") ?? "";
            return (
              <article
                key={city.id}
                ref={(el) => {
                  panelRefs.current[mapId] = el;
                }}
                className={`impact-city-panel${activeCity === mapId ? " is-active" : ""}`}
                id={`panel-${mapId}`}
                data-city={mapId}
              >
                <div className="pn">
                  <b>{copy.hub}</b> · {city.name}
                </div>
                <h4>{city.small}</h4>
                <div className="frame">{copy.frame}</div>
                <p>{copy.body}</p>
                <div className="stats">
                  <div>
                    <div className="v">
                      {city.num.replace("M", "")}
                      <span className="u">M</span>
                    </div>
                    <div className="l">Engagements</div>
                  </div>
                  <div>
                    <div className="v">{vaccines.replace(" vaccines", "")}</div>
                    <div className="l">Vaccinations</div>
                  </div>
                </div>
              </article>
            );
          })}

          <article
            ref={(el) => {
              panelRefs.current.sum = el;
            }}
            className={`impact-city-panel impact-city-panel--summary${activeCity === "sum" ? " is-active" : ""}`}
            id="panel-sum"
            data-city="sum"
          >
            <span className="stamp">End of program · footprint complete</span>
            <h4>Three hubs. One program.</h4>
            <p>
              Awareness at scale, activation through partners. Coordinates reconcile across hubs —
              math on the page matches math in the field.
            </p>
            <div className="totals">
              <div>
                <div className="v">
                  4.57<span className="u">M</span>
                </div>
                <div className="l">Aware</div>
              </div>
              <div>
                <div className="v">715</div>
                <div className="l">Vaccines</div>
              </div>
              <div>
                <div className="v">3</div>
                <div className="l">Hubs</div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
