"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  impactBriefingIdentity,
  impactBriefingTabs,
  impactBriefingTop,
  IMPACT_TAB_STORAGE_KEY,
  type ImpactBriefingTab,
} from "@/content/impact-dashboard-briefing";
import { AutodeskAssembly } from "./AutodeskAssembly";
import { EYFootprint } from "./EYFootprint";
import {
  CatBadge,
  MetricCell,
  MetricStrip,
  SectionBreak,
} from "./impact-shared";
import { WiproProfile } from "./WiproProfile";

const TAB_ORDER: ImpactBriefingTab[] = ["revenue", "ops", "health"];
const TAB_NUM: Record<ImpactBriefingTab, string> = {
  revenue: "01",
  ops: "02",
  health: "03",
};
const CRUMB_CLIENT: Record<ImpactBriefingTab, string> = {
  revenue: "Autodesk",
  ops: "Wipro",
  health: "EY",
};

function isTab(v: string | null): v is ImpactBriefingTab {
  return v === "revenue" || v === "ops" || v === "health";
}

export function ImpactShell() {
  const [activeTab, setActiveTab] = useState<ImpactBriefingTab>("revenue");
  const tabRefs = useRef<Partial<Record<ImpactBriefingTab, HTMLButtonElement | null>>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem(IMPACT_TAB_STORAGE_KEY);
      if (isTab(saved)) setActiveTab(saved);
    } catch {
      /* localStorage unavailable */
    }
    const hash = (location.hash || "").replace("#tab-", "");
    if (hash === "01") setActiveTab("revenue");
    if (hash === "02") setActiveTab("ops");
    if (hash === "03") setActiveTab("health");
  }, []);

  const selectTab = useCallback((id: ImpactBriefingTab) => {
    setActiveTab(id);
    try {
      localStorage.setItem(IMPACT_TAB_STORAGE_KEY, id);
      const num = TAB_NUM[id];
      history.replaceState(null, "", `#tab-${num}`);
    } catch {
      /* ignore */
    }
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (window.scrollY > 320) {
      const nav = document.querySelector(".impact-tab-nav");
      if (nav) {
        const top = (nav as HTMLElement).offsetTop - 60;
        window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
      }
    }
  }, []);

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

  return (
    <>
      <main className="page" id="top">
        <div className="impact-breadcrumb" aria-label="Breadcrumb">
          <div className="impact-breadcrumb__path">
            <span className="impact-breadcrumb__dot" aria-hidden />
            <span>{impactBriefingTop.crumbLead}</span>
            <span className="sep">/</span>
            <span>{impactBriefingTop.crumbMid}</span>
            <span className="sep">/</span>
            <span className="active">{CRUMB_CLIENT[activeTab]}</span>
          </div>
          <div className="impact-breadcrumb__sig">
            <b>{impactBriefingTop.sigName}</b>
            {impactBriefingTop.sigRole}
          </div>
        </div>

        <section className="impact-title-block" aria-labelledby="impact-h1">
          <div>
            <p className="kicker">{impactBriefingIdentity.kicker}</p>
            <h1 id="impact-h1">{impactBriefingIdentity.headline}</h1>
            <p className="sub">{impactBriefingIdentity.sub}</p>
          </div>
          <dl className="impact-id-strip" aria-label="Identification">
            {impactBriefingIdentity.card.map((row) => (
              <div key={row.k} style={{ display: "contents" }}>
                <dt>{row.k}</dt>
                <dd>
                  {"vBold" in row && row.vBold ? <b>{row.v}</b> : row.v}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <nav className="impact-tab-nav" role="tablist" aria-label="Engagements">
          {impactBriefingTabs.map((tab, i) => {
            const selected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[tab.id] = el;
                }}
                type="button"
                className="impact-tab-btn"
                role="tab"
                id={`impact-tab-${tab.id}`}
                aria-selected={selected}
                aria-controls={`impact-panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => selectTab(tab.id)}
                onKeyDown={(e) => onTabKeyDown(e, i)}
              >
                <span className="num">{tab.idx}</span>
                <span className="ttl">{tab.name}</span>
                <span className="cl">{tab.client}</span>
              </button>
            );
          })}
        </nav>

        {/* TAB 01 — Autodesk */}
        <section
          className="impact-tab-panel"
          id="impact-panel-revenue"
          role="tabpanel"
          aria-labelledby="impact-tab-revenue"
          hidden={activeTab !== "revenue"}
        >
          <CatBadge num="01" category="Assembly" org="Autodesk" />
          <div className="impact-hero">
            <div className="impact-hero__copy">
              <h2>
                My team designed Autodesk&apos;s new <em>Post-Purchase Model</em>.
              </h2>
              <p>
                I led strategy, design direction, and experience reviews on the new
                post-purchase service model.
              </p>
            </div>
            <div className="impact-hero__metric">
              <span className="v">
                <span className="accent">+$</span>50<span className="unit">M</span>
              </span>
              <span className="lbl">Projected incremental revenue · YoY after 2 quarters</span>
            </div>
          </div>

          <MetricStrip>
            <MetricCell value={<>+27<span className="u">%</span></>} label="Revenue lift · Q1 post-launch" />
            <MetricCell value={<>106<span className="u">%</span></>} label="NRR path" />
            <MetricCell
              value={
                <>
                  0 <span className="arr" aria-hidden>→</span> 1{" "}
                  <span className="arr" aria-hidden>→</span> 2
                </>
              }
              label="BUILD · LAUNCH · SCALE"
            />
          </MetricStrip>

          <SectionBreak
            label={
              <>
                <span className="arrow">↓</span> The three-tier service ladder · Tap a tier to open
              </>
            }
            meta={
              <>
                <span>FIG. 01-A · Assembly</span>
                <span>Exploded view</span>
              </>
            }
          />

          <AutodeskAssembly />
        </section>

        {/* TAB 02 — Wipro */}
        <section
          className="impact-tab-panel"
          id="impact-panel-ops"
          role="tabpanel"
          aria-labelledby="impact-tab-ops"
          hidden={activeTab !== "ops"}
        >
          <CatBadge num="02" category="Profile" org="Wipro" />
          <div className="impact-hero">
            <div className="impact-hero__copy">
              <h2>
                I unified six service towers into one <em>operating model</em>.
              </h2>
              <p>
                At Wipro, I led transformation across six ITIL service towers for Estée Lauder,
                building the frameworks, metrics, and delivery model that improved NPS past goal.
              </p>
            </div>
            <div className="impact-hero__metric">
              <span className="v">
                <span className="accent">−</span>31<span className="unit">%</span>
              </span>
              <span className="lbl">MTTR REDUCTION · ACROSS ALL ROUTED CASES</span>
            </div>
          </div>

          <MetricStrip>
            <MetricCell value={<>30<span className="u">+</span></>} label="Outcomes shipped" />
            <MetricCell value={<>+13<span className="u">%</span></>} label="NPS goal exceeded" />
            <MetricCell value={<>13<span className="u">K</span></>} label="Annual reduction in lockout cases" />
          </MetricStrip>

          <SectionBreak
            label={
              <>
                <span className="arrow">↓</span> Before vs. after, unified service delivery ·
                Normalized across ticket classes
              </>
            }
            meta={
              <>
                <span>FIG. 02-A · Test bench</span>
                <span>BEFORE · AFTER · DELTA</span>
              </>
            }
          />

          <WiproProfile tabVisible={activeTab === "ops"} />
        </section>

        {/* TAB 03 — EY */}
        <section
          className="impact-tab-panel"
          id="impact-panel-health"
          role="tabpanel"
          aria-labelledby="impact-tab-health"
          hidden={activeTab !== "health"}
        >
          <CatBadge num="03" category="Footprint" org="EY" />
          <div className="impact-hero">
            <div className="impact-hero__copy">
              <h2>
                A national-best-practice <em>COVID engagement program</em>.
              </h2>
              <p>
                At EY, I led the experience design for Georgia&apos;s two-stage COVID-19 engagement
                program — awareness at scale, activation through partners. CDC-recognized national
                best practice.
              </p>
            </div>
            <div className="impact-hero__metric">
              <span className="v">
                4.57M{" "}
                <span style={{ color: "var(--ink-2)", fontWeight: 400, fontSize: "0.55em" }}>
                  →
                </span>{" "}
                <span className="accent">715</span>
              </span>
              <span className="lbl">Engagements → vaccinations · gap by design</span>
            </div>
          </div>

          <MetricStrip cols={3}>
            <MetricCell
              value={<>4.57<span className="u">M</span></>}
              label="Engagements (program-attributed)"
            />
            <MetricCell value="715" label="Vaccinations (program-attributed)" />
            <MetricCell value={<>8<span className="u">M+</span></>} label="Statewide vaccinations during comms leadership" />
          </MetricStrip>

          <SectionBreak
            label={
              <>
                <span className="arrow">↓</span> Georgia delivery footprint · Scroll the cities
              </>
            }
            meta={
              <>
                <span>FIG. 03-A · Delivery</span>
                <span>3 hubs · sequenced</span>
              </>
            }
          />

          <EYFootprint tabActive={activeTab === "health"} />
        </section>

        <section className="impact-closing" aria-label="Handoff">
          <div className="impact-closing__ruler">↘ Case studies</div>
          <div className="impact-closing__inner">
            <div>
              <p className="impact-closing__eyebrow">Handoff · the larger story</p>
              <h3 className="impact-closing__hl">
                The work behind the numbers, in case study form.
              </h3>
            </div>
            <Link className="impact-closing__cta" href="/case-studies/autodesk">
              <span>Open case studies</span>
              <span className="arrow">→</span>
              <span className="url">/case-studies/autodesk</span>
            </Link>
          </div>
        </section>
      </main>

      <footer className="impact-sheet-footer" role="contentinfo">
        <div>
          <dt>Sheet</dt>
          <dd>IMPACT · 01–03</dd>
        </div>
        <div>
          <dt>Scale</dt>
          <dd>1 : 1</dd>
        </div>
        <div>
          <dt>Drawn</dt>
          <dd>M. Stangl</dd>
        </div>
        <div>
          <dt>Approved</dt>
          <dd>M. Stangl</dd>
        </div>
        <div>
          <dt>Date</dt>
          <dd>2026 · 04</dd>
        </div>
        <div>
          <dt>Rev.</dt>
          <dd>v2026.04</dd>
        </div>
      </footer>
    </>
  );
}
