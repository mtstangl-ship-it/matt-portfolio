"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * ImpactShell — ported 1:1 from reference/Impact Dashboard.html.
 *
 * Three tabs (Revenue / Operations / Healthcare) each rendering a distinct
 * artifact: the Autodesk tier ladder, the Wipro before/after + handoff
 * timeline, and the EY Georgia hub map with sonar pings. Copy and numbers
 * match the reference except for the Autodesk metric row, which is reduced
 * to the three brief-mandated headline metrics (27% revenue lift, 106% NRR
 * path, 75% business plan renewal) and the hero metric gets the full
 * $50M+ attribution per brief item #2.
 *
 * Interactive wiring:
 *   - Tabs: proper role=tablist with ArrowLeft/Right + Home/End keyboard nav,
 *     focus management on the active tab, localStorage persistence.
 *   - Ladder: click-to-expand accordion, single open tier at a time.
 *   - Cities: hover or click highlights the map marker and the list row.
 *   - Sonar pings: fire on entering the Healthcare tab.
 */

type TabId = "revenue" | "ops" | "health";
type TierId = "business" | "pro" | "included";
type CityId = "atlanta" | "athens" | "savannah";

const STORAGE_KEY = "stangl-impact-tab";
const TAB_ORDER: TabId[] = ["revenue", "ops", "health"];
const TAB_LABELS: Record<TabId, string> = {
  revenue: "Revenue",
  ops: "Operations",
  health: "Healthcare",
};

function isTab(v: string | null): v is TabId {
  return v === "revenue" || v === "ops" || v === "health";
}

export function ImpactShell() {
  const [activeTab, setActiveTab] = useState<TabId>("revenue");
  // Ladder: which tier's drawer is open. Starts on Business so the page
  // opens with proof state instead of a wall of closed accordions.
  const [openTier, setOpenTier] = useState<TierId>("business");
  // Healthcare: which city is currently highlighted on the map + list.
  const [activeCity, setActiveCity] = useState<CityId | null>("atlanta");

  // Tab button refs keyed by id so ArrowLeft/Right can move focus.
  const tabRefs = useRef<Partial<Record<TabId, HTMLButtonElement | null>>>({});
  // SVG ping refs so we can restart the sonar animation on Healthcare entry.
  const pingRefs = useRef<Partial<Record<CityId, SVGCircleElement | null>>>({});

  // Restore the last visited tab on mount.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (isTab(saved)) setActiveTab(saved);
    } catch {
      /* localStorage unavailable */
    }
  }, []);

  const selectTab = useCallback((id: TabId) => {
    setActiveTab(id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      /* localStorage unavailable */
    }
  }, []);

  // Keyboard nav across the tablist per WAI-ARIA APG:
  //   ArrowLeft/Right cycle, Home/End jump to ends, Enter/Space selects.
  const onTabKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>, idx: number) => {
      let next = idx;
      switch (e.key) {
        case "ArrowRight":
          next = (idx + 1) % TAB_ORDER.length;
          break;
        case "ArrowLeft":
          next = (idx - 1 + TAB_ORDER.length) % TAB_ORDER.length;
          break;
        case "Home":
          next = 0;
          break;
        case "End":
          next = TAB_ORDER.length - 1;
          break;
        default:
          return;
      }
      e.preventDefault();
      const nextId = TAB_ORDER[next];
      selectTab(nextId);
      tabRefs.current[nextId]?.focus();
    },
    [selectTab],
  );

  // Sonar pings fire on entering Healthcare — iterate the four cities with
  // a small delay so the map reads like a radar sweep, not a flash.
  useEffect(() => {
    if (activeTab !== "health") return;
    const order: CityId[] = ["atlanta", "athens", "savannah"];
    const timers: number[] = [];
    order.forEach((id, i) => {
      const t = window.setTimeout(() => {
        const ping = pingRefs.current[id];
        if (!ping) return;
        ping.classList.remove("fire");
        void ping.getBoundingClientRect();
        const r0 = ping.getAttribute("r") || "7";
        ping.style.setProperty("--r0", r0);
        ping.classList.add("fire");
      }, i * 140);
      timers.push(t);
    });
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [activeTab]);

  return (
    <main id="top" className="impact-shell">
      {/* ---------- top bar ---------- */}
      <header className="topbar">
        <div className="crumb">
          <span className="dot" aria-hidden />
          <span className="path">
            <b>CONSOLE</b>
            <span className="sep"> / </span>
            Impact
            <span className="sep"> / </span>
            <span aria-current="true">{TAB_LABELS[activeTab]}</span>
          </span>
        </div>
        <div className="sig">
          <b>Matt Stangl</b>
          <em>Product &amp; Service Design Leader</em>
        </div>
      </header>

      {/* ---------- identity block ---------- */}
      <section className="identity" aria-labelledby="impact-h1">
        <div>
          <div className="mono teal" style={{ marginBottom: "var(--sp-4)" }}>
            IMPACT · 2020–2026
          </div>
          <h1 id="impact-h1">Three enterprise transformations. In numbers.</h1>
          <p className="sub">What shipped, what moved, what carried.</p>
        </div>
        <aside className="id-card" aria-label="operator">
          <div className="row">
            <span className="k">Operator</span>
            <span className="v">
              <b>Matt Stangl</b>
            </span>
          </div>
          <div className="row">
            <span className="k">Role</span>
            <span className="v">Product &amp; Service Design Leader</span>
          </div>
          <div className="row">
            <span className="k">Engagements</span>
            <span className="v teal">Autodesk · Wipro · EY</span>
          </div>
          <div className="row">
            <span className="k">Scope</span>
            <span className="v">Practice building · Service transformation · Ecosystem design</span>
          </div>
        </aside>
      </section>

      {/* ---------- tabs ---------- */}
      <div className="tabs-wrap">
        <div className="tabs" role="tablist" aria-label="Case studies">
          {TAB_ORDER.map((id, i) => {
            const selected = activeTab === id;
            return (
              <button
                key={id}
                ref={(el) => {
                  tabRefs.current[id] = el;
                }}
                className="tab"
                role="tab"
                id={`impact-tab-${id}`}
                aria-selected={selected}
                aria-controls={`impact-panel-${id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => selectTab(id)}
                onKeyDown={(e) => onTabKeyDown(e, i)}
              >
                <span className="idx">
                  {String(i + 1).padStart(2, "0")} / {TAB_LABELS[id]}
                </span>
                <span className="name">
                  {id === "revenue" && "Service as revenue motion"}
                  {id === "ops" && "Six towers, one model"}
                  {id === "health" && "Care pathways, built for adoption"}
                </span>
                <span className="client">
                  {id === "revenue" && "Autodesk"}
                  {id === "ops" && "Wipro"}
                  {id === "health" && "EY"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ============================================================ */}
      {/* CASE 01 — REVENUE (Autodesk) */}
      {/* ============================================================ */}
      <section
        className="case"
        data-active={activeTab === "revenue" ? "true" : "false"}
        role="tabpanel"
        id="impact-panel-revenue"
        aria-labelledby="impact-tab-revenue"
        hidden={activeTab !== "revenue"}
      >
        <div className="case-head">
          <div className="case-meta">
            <div className="tag">
              <span className="bar" />
              <span>01 · Autodesk · Revenue</span>
            </div>
            <h2>I built Autodesk&apos;s global Service Design practice from zero.</h2>
            <p className="role">
              I led the strategy, design, and launch of a{" "}
              <b>tiered post-purchase model, Business, Professional, Included</b>, that turned
              customer success into a revenue engine.
            </p>
            <p className="attribution">
              $50M+ in incremental AOV, year-over-year, 12-month post-launch window. I was the
              design and strategy lead on the service model that drove it. Prior-year AOV was
              flat.
            </p>
          </div>
          <div className="hero-metric">
            <div className="num">
              $<em>50</em>M+
            </div>
            <div className="lbl">Incremental AOV</div>
            <div className="unit">Year-over-year · 12 mo</div>
          </div>
        </div>

        {/* Reduced metrics row per brief #8: 3 headline figures, no output counts. */}
        <div className="metrics metrics-3" role="list">
          <div className="metric" role="listitem">
            <div className="v">
              +27<small>%</small>
            </div>
            <div className="k">Revenue lift</div>
          </div>
          <div className="metric" role="listitem">
            <div className="v">
              106<small>%</small>
            </div>
            <div className="k">NRR path</div>
          </div>
          <div className="metric" role="listitem">
            <div className="v">
              75<small>%</small>
            </div>
            <div className="k">Business plan renewal · Q1</div>
          </div>
        </div>

        <div className="section-head">
          <h3>The three-tier service ladder</h3>
          <span className="hint">Tap a tier to open</span>
        </div>

        <div className="ladder">
          <TierRow
            id="business"
            step="TIER 01"
            stepLabel="Premium"
            name="Business Plan"
            desc="Strategic planning and coaching-heavy delivery. Designed to expand accounts and run post-purchase as a revenue motion."
            lift={18}
            liftSub="6 services · coaching"
            barPct={92}
            services={[
              { label: "Strategic success planning", state: "innovated" },
              { label: "Executive business review", state: "innovated" },
              { label: "Adoption roadmap", state: "innovated" },
              { label: "Named success manager", state: "optimized" },
              { label: "Quarterly health score", state: "optimized" },
              { label: "Priority escalation", state: "refined" },
            ]}
            legend={{ innovated: 3, optimized: 2, refined: 1 }}
            open={openTier === "business"}
            onToggle={() => setOpenTier("business")}
          />
          <TierRow
            id="pro"
            step="TIER 02"
            stepLabel="Targeted"
            name="Professional Plan"
            desc="Targeted engagements that accelerate deployment and close capability gaps, sold as attachable packages."
            lift={7}
            liftSub="4 services · attach"
            barPct={56}
            services={[
              { label: "Deployment accelerators", state: "innovated" },
              { label: "Capability workshops", state: "optimized" },
              { label: "Integration advisory", state: "optimized" },
              { label: "On-demand expert hours", state: "refined" },
            ]}
            legend={{ innovated: 1, optimized: 2, refined: 1 }}
            open={openTier === "pro"}
            onToggle={() => setOpenTier("pro")}
          />
          <TierRow
            id="included"
            step="TIER 03"
            stepLabel="Foundational"
            name="Included Plan"
            desc="Self-service and onboarding paths to first value. Builds retention at the base and feeds customers upsell-ready into higher tiers."
            lift={2}
            liftSub="5 services · retain"
            barPct={34}
            services={[
              { label: "Guided onboarding", state: "innovated" },
              { label: "Self-serve learning paths", state: "innovated" },
              { label: "Community access", state: "optimized" },
              { label: "Knowledge base", state: "refined" },
              { label: "Product telemetry nudges", state: "refined" },
            ]}
            legend={{ innovated: 2, optimized: 1, refined: 2 }}
            open={openTier === "included"}
            onToggle={() => setOpenTier("included")}
          />
        </div>
      </section>

      {/* ============================================================ */}
      {/* CASE 02 — OPERATIONS (Wipro) */}
      {/* ============================================================ */}
      <section
        className="case"
        data-active={activeTab === "ops" ? "true" : "false"}
        role="tabpanel"
        id="impact-panel-ops"
        aria-labelledby="impact-tab-ops"
        hidden={activeTab !== "ops"}
      >
        <div className="case-head">
          <div className="case-meta">
            <div className="tag">
              <span className="bar" />
              <span>02 · Wipro · Operations</span>
            </div>
            <h2>I unified six service towers into one operating model.</h2>
            <p className="role">
              At Wipro, I led transformation across <b>six ITIL service towers</b> for Estée Lauder,
              building the frameworks, metrics, and delivery model that improved NPS past goal.
            </p>
          </div>
          <div className="hero-metric">
            <div className="num">
              <em>13</em>%+
            </div>
            <div className="lbl">NPS goal exceeded</div>
          </div>
        </div>

        <div className="metrics metrics-3" role="list">
          <div className="metric" role="listitem">
            <div className="v">
              30<small>+</small>
            </div>
            <div className="k">Outcomes shipped</div>
          </div>
          <div className="metric" role="listitem">
            <div className="v">3</div>
            <div className="k">Handoff tiers</div>
          </div>
          <div className="metric" role="listitem">
            <div className="v">13K</div>
            <div className="k">Annual lockouts eliminated</div>
          </div>
        </div>

        <div className="section-head">
          <h3>Before vs. after, unified service delivery</h3>
          <span className="hint">Normalized across ticket classes</span>
        </div>

        <div className="compare">
          <div className="col before">
            <div className="ttl">Before, legacy handoff</div>
            <div className="big">
              6.8
              <small style={{ fontSize: 18, color: "var(--muted)" }}> days</small>
            </div>
            <div className="c-bar">
              <span style={{ width: "100%" }} />
            </div>
            <div className="note">
              Cases bounced across tiers. Context was rewritten at each handoff; the customer
              restarted the conversation.
            </div>
          </div>
          <div className="col after">
            <div className="ttl">After, redesigned tiers</div>
            <div className="big">
              4.7
              <small style={{ fontSize: 18, color: "var(--muted)" }}> days</small>
            </div>
            <div className="c-bar">
              <span style={{ width: "69%" }} />
            </div>
            <div className="note">
              Clear ownership per tier, structured handoff payload, and a single escalation path.
              Context moves with the case.
            </div>
          </div>
          <div className="delta">
            <span>Delta across all routed cases</span>
            <span>
              <b>−31% MTTR</b> · ≈ 2.1 days returned per case
            </span>
          </div>
        </div>

        <div className="section-head">
          <h3>The redesigned handoff, tier by tier</h3>
          <span className="hint">Flow → speed</span>
        </div>

        <div className="handoff">
          <div className="tlabel">Case lifecycle · resolve at the lowest possible tier</div>
          <div className="track">
            <div className="arrow a1" aria-hidden />
            <div className="arrow a2" aria-hidden />
            <div className="node" data-tier="1">
              <div className="dot">T1</div>
              <div className="h">Triage &amp; resolve</div>
              <div className="d">
                Structured intake. 72% of cases close here with a named owner from minute one.
              </div>
              <div className="sla">
                <b>Target: &lt; 4h</b>
              </div>
            </div>
            <div className="node" data-tier="2">
              <div className="dot">T2</div>
              <div className="h">Specialist engage</div>
              <div className="d">
                Domain engineer picks up a full context payload, no customer restart.
              </div>
              <div className="sla">
                <b>Target: &lt; 2d</b>
              </div>
            </div>
            <div className="node" data-tier="3">
              <div className="dot">T3</div>
              <div className="h">Product &amp; engineering</div>
              <div className="d">
                Reserved for defects and architectural fixes. Feeds the roadmap directly.
              </div>
              <div className="sla">
                <b>Target: &lt; 5d</b>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CASE 03 — HEALTHCARE (EY) */}
      {/* ============================================================ */}
      <section
        className="case"
        data-active={activeTab === "health" ? "true" : "false"}
        role="tabpanel"
        id="impact-panel-health"
        aria-labelledby="impact-tab-health"
        hidden={activeTab !== "health"}
      >
        <div className="case-head">
          <div className="case-meta">
            <div className="tag">
              <span className="bar" />
              <span>03 · EY · Healthcare</span>
            </div>
            <h2>A national-best-practice COVID engagement program.</h2>
            <p className="role">
              At EY, I led the experience design for Georgia&apos;s{" "}
              <b>COVID-19 engagement operations</b>, mobilizing cross-sector partners, designing
              care pathways for adoption velocity, and building a model recognized by the CDC as
              a national best practice.
            </p>
            <p className="attribution">
              4.57M engagements (awareness layer) · 715 vaccinations (activation layer), two
              stages, one program design.
            </p>
          </div>
          <div className="hero-metric">
            <div className="num">
              <em>4.57</em>M
            </div>
            <div className="lbl">Engagements delivered</div>
            <div className="unit">Across 3 cities · 24+ partners</div>
          </div>
        </div>

        <div className="metrics">
          <div className="metric" role="listitem">
            <div className="v">
              4.57<small>M</small>
            </div>
            <div className="k">Engagements</div>
          </div>
          <div className="metric" role="listitem">
            <div className="v">715</div>
            <div className="k">Vaccinations</div>
          </div>
          <div className="metric" role="listitem">
            <div className="v">
              24<small>+</small>
            </div>
            <div className="k">Delivery partners</div>
          </div>
          <div className="metric" role="listitem">
            <div className="v">3</div>
            <div className="k">City hubs</div>
          </div>
        </div>

        <div className="section-head">
          <h3>Georgia delivery footprint</h3>
          <span className="hint">Hover a city</span>
        </div>

        <div className="geo">
          <div className="map" aria-label="Map of Georgia with three delivery hubs">
            <svg
              viewBox="-10 -10 300 340"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden
            >
              <defs>
                <filter id="impactNodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2.2" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <path
                d="M 131.7,0.0 L 84.5,5.9 L 36.7,11.9 L 0.0,17.8 L 1.4,23.7 L 3.7,29.6 L 4.6,35.6 L 4.6,41.5 L 6.4,47.4 L 8.7,53.3 L 10.6,59.3 L 11.9,65.2 L 11.9,71.1 L 14.2,77.0 L 15.6,83.0 L 17.4,88.9 L 19.3,94.8 L 21.6,100.7 L 23.4,106.7 L 24.8,112.6 L 25.2,118.5 L 26.2,124.4 L 27.5,130.4 L 29.4,136.3 L 31.7,142.2 L 33.0,148.1 L 32.6,154.1 L 34.9,160.0 L 37.2,165.9 L 38.6,171.9 L 40.4,177.8 L 43.6,183.7 L 48.7,189.6 L 49.6,195.6 L 52.8,201.5 L 53.2,207.4 L 46.4,213.3 L 45.9,219.3 L 46.4,225.2 L 45.9,231.1 L 44.1,237.0 L 45.4,243.0 L 49.6,248.9 L 50.0,254.8 L 50.0,260.7 L 48.7,266.7 L 49.6,272.6 L 50.0,278.5 L 54.2,284.4 L 56.0,290.4 L 58.3,296.3 L 62.0,302.2 L 62.9,308.1 L 215.7,314.1 L 218.5,320.0 L 226.3,316.0 L 227.2,310.1 L 225.4,304.2 L 224.5,298.3 L 224.0,292.3 L 254.3,286.4 L 251.5,280.5 L 252.0,274.6 L 255.2,268.6 L 252.0,262.7 L 257.5,256.8 L 260.7,250.9 L 256.6,244.9 L 260.3,239.0 L 264.9,233.1 L 261.6,227.2 L 264.9,221.2 L 267.6,215.3 L 267.6,209.4 L 273.1,203.5 L 274.5,197.5 L 271.3,191.6 L 260.7,185.7 L 259.8,179.8 L 257.5,173.8 L 255.7,167.9 L 254.8,162.0 L 243.7,156.0 L 242.4,150.1 L 240.1,144.2 L 237.3,138.3 L 235.5,132.3 L 232.3,126.4 L 223.1,120.5 L 215.3,114.6 L 212.1,108.6 L 205.2,102.7 L 202.4,96.8 L 192.8,90.9 L 188.7,84.9 L 184.1,79.0 L 172.6,73.1 L 167.1,67.2 L 160.2,61.2 L 158.4,55.3 L 156.1,49.4 L 151.9,43.5 L 149.6,37.5 L 131.3,31.6 L 122.1,25.7 L 120.7,19.8 L 124.4,13.8 L 127.6,7.9 L 132.7,2.0 Z"
                fill="#0d1f1a"
                stroke="#1dcfaa"
                strokeOpacity="0.4"
                strokeWidth="1.5"
              />

              <g
                stroke="#1dcfaa"
                strokeOpacity="0.14"
                strokeWidth="1"
                strokeDasharray="3 4"
                fill="none"
              >
                <line x1="70" y1="96" x2="120" y2="72" />
                <line x1="70" y1="96" x2="246" y2="224" />
                <line x1="120" y1="72" x2="246" y2="224" />
              </g>

              {(
                [
                  { id: "atlanta", cx: 70, cy: 96, r: 10, rInner: 4.5, label: "ATLANTA", labelY: 80 },
                  { id: "athens", cx: 120, cy: 72, r: 7.5, rInner: 3, label: "ATHENS", labelY: 56 },
                  { id: "savannah", cx: 246, cy: 224, r: 6.5, rInner: 2.5, label: "SAVANNAH", labelY: 245 },
                ] as const
              ).map((c) => {
                const isActive = activeCity === c.id;
                const isDim = activeCity !== null && !isActive;
                const classes = ["city-marker"];
                if (isActive) classes.push("active");
                if (isDim) classes.push("dim");
                return (
                  <g
                    key={c.id}
                    className={classes.join(" ")}
                    data-city={c.id}
                    filter="url(#impactNodeGlow)"
                    style={{ cursor: "pointer" }}
                    onMouseEnter={() => setActiveCity(c.id as CityId)}
                    onMouseLeave={() => setActiveCity(null)}
                    onClick={() => setActiveCity(c.id as CityId)}
                  >
                    <circle
                      ref={(el) => {
                        pingRefs.current[c.id as CityId] = el;
                      }}
                      className="ping"
                      cx={c.cx}
                      cy={c.cy}
                      r={c.r}
                      fill="none"
                      stroke="#1dcfaa"
                      strokeWidth="1.5"
                      opacity="0"
                    />
                    <circle
                      className="marker-outer"
                      cx={c.cx}
                      cy={c.cy}
                      r={c.r}
                      fill="#0a0f0e"
                      stroke="#1dcfaa"
                      strokeWidth="1.5"
                    />
                    <circle
                      className="marker-inner"
                      cx={c.cx}
                      cy={c.cy}
                      r={c.rInner}
                      fill="#1dcfaa"
                    />
                    <text
                      className="marker-label"
                      x={c.cx}
                      y={c.labelY}
                      textAnchor="middle"
                    >
                      {c.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="cities" role="list">
            {(
              [
                {
                  id: "atlanta",
                  num: "01",
                  name: "Atlanta",
                  sub: "Metro hub · anchor partner sites",
                  metric: "2.41M",
                  metricSub: "engagements · 452 vaccines",
                },
                {
                  id: "athens",
                  num: "02",
                  name: "Athens",
                  sub: "Twilight Criterium · UGA Athletics partnership",
                  metric: "1.65M",
                  metricSub: "engagements · 175 vaccines",
                },
                {
                  id: "savannah",
                  num: "03",
                  name: "Savannah",
                  sub: "Coastal delivery · mobile teams",
                  metric: "0.51M",
                  metricSub: "engagements · 88 vaccines",
                },
              ] as const
            ).map((c) => (
              <button
                key={c.id}
                type="button"
                className="city"
                role="listitem"
                data-city={c.id}
                data-active={activeCity === c.id ? "true" : "false"}
                onMouseEnter={() => setActiveCity(c.id as CityId)}
                onMouseLeave={() => setActiveCity(null)}
                onFocus={() => setActiveCity(c.id as CityId)}
                onClick={() => setActiveCity(c.id as CityId)}
              >
                <span className="id">{c.num}</span>
                <span className="name">
                  {c.name}
                  <small>{c.sub}</small>
                </span>
                <span className="num">
                  {c.metric}
                  <small>{c.metricSub}</small>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- closing ruler + handoff CTA + footer ---------- */}
      <div className="ruler">
        <span>End of briefing</span>
        <span className="line" />
        <span>↘ Case studies</span>
      </div>

      <section className="handoff-cta">
        <div className="mono teal">Handoff · deeper narrative</div>
        <h3>The work behind the numbers, in case study form.</h3>
        <a href="/case-studies/autodesk">
          Open case studies <span aria-hidden>→</span>
        </a>
      </section>

      <footer className="foot">
        <div>Matt Stangl · Product &amp; Service Design Leader</div>
        <div style={{ textAlign: "center" }}>Impact Console · v2026.04</div>
        <div style={{ textAlign: "right" }}>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </main>
  );
}

/* ================================================================
   Tier row — one stacked button in the ladder accordion.
   Kept here to keep the ladder's visual parity tight; extracting it
   would force an awkward hand-off of the `open` callback through the
   grid.
   ================================================================ */

type TierState = "innovated" | "optimized" | "refined";

function TierRow({
  step,
  stepLabel,
  name,
  desc,
  lift,
  liftSub,
  barPct,
  services,
  legend,
  open,
  onToggle,
}: {
  id: TierId;
  step: string;
  stepLabel: string;
  name: string;
  desc: string;
  lift: number;
  liftSub: string;
  barPct: number;
  services: { label: string; state: TierState }[];
  legend: { innovated: number; optimized: number; refined: number };
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      className="tier"
      aria-expanded={open}
      onClick={onToggle}
    >
      <span className="step">
        <span className="n">{step}</span>
        <span>{stepLabel}</span>
      </span>
      <span className="lead">
        <span className="name">
          {name}
          <span className="caret">›</span>
        </span>
        <span className="desc">{desc}</span>
      </span>
      <span className="right">
        <span className="lift">
          +<em>{lift}</em>%{" "}
          <span style={{ fontSize: 13, color: "var(--muted)", fontWeight: 400 }}>of lift</span>
        </span>
        <span className="sub">{liftSub}</span>
      </span>
      <span className="bar">
        <span style={{ width: `${barPct}%` }} />
      </span>
      <div className="tier-body">
        <div className="svcs">
          {services.map((s) => (
            <span key={s.label} className="svc" data-state={s.state}>
              {s.label}
            </span>
          ))}
        </div>
        <div className="legend">
          <span className="i">Innovated {legend.innovated}</span>
          <span className="o">Optimized {legend.optimized}</span>
          <span className="r">Refined {legend.refined}</span>
        </div>
      </div>
    </button>
  );
}
