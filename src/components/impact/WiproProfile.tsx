"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { impactCaseOps } from "@/content/impact-dashboard-briefing";
import { SectionBreak } from "./impact-shared";
import {
  buildHorizontalSVG,
  buildVerticalSVG,
  PROFILE_ANNOTATION_LABELS,
} from "./wipro-profile-svg";

type GraphOrient = "horizontal" | "vertical" | "tablet";
type CurveView = "before" | "after" | "delta";

const CURVE_TOGGLE: { id: CurveView; label: string }[] = [
  { id: "before", label: "BEFORE" },
  { id: "after", label: "AFTER" },
  { id: "delta", label: "DELTA" },
];

function getOrient(): GraphOrient {
  if (typeof window === "undefined") return "horizontal";
  const w = window.innerWidth;
  if (w <= 640) return "vertical";
  if (w <= 1100) return "tablet";
  return "horizontal";
}

export function WiproProfile({ tabVisible }: { tabVisible: boolean }) {
  const profileRef = useRef<HTMLDivElement>(null);
  const graphHostRef = useRef<HTMLDivElement>(null);
  const [orient, setOrient] = useState<GraphOrient>("horizontal");
  const [isAnim, setIsAnim] = useState(false);
  const [profileFired, setProfileFired] = useState(false);
  const [popover, setPopover] = useState<string | null>(null);
  const [curveView, setCurveView] = useState<CurveView>("before");
  const [afterEnter, setAfterEnter] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const renderGraph = useCallback(() => {
    const host = graphHostRef.current;
    if (!host) return;
    const o = getOrient();
    setOrient(o);
    const compact = o === "tablet";
    const preserve =
      o === "tablet" ? "xMidYMid meet" : o === "vertical" ? "none" : "none";
    const svg =
      o === "vertical"
        ? buildVerticalSVG(compact)
        : buildHorizontalSVG(compact);
    host.dataset.orient = o === "tablet" ? "horizontal" : o;
    host.innerHTML = svg.replace(
      'preserveAspectRatio="none"',
      `preserveAspectRatio="${preserve}"`,
    );

    if (o === "tablet") {
      host.querySelectorAll("[data-annotation]").forEach((el) => {
        const id = el.getAttribute("data-annotation");
        if (!id) return;
        el.classList.add("impact-profile-annotation-hit");
        (el as SVGTextElement).style.cursor = "pointer";
      });
    }
  }, []);

  const selectCurveView = useCallback(
    (view: CurveView) => {
      setCurveView(view);
      if (view === "after" && !reduceMotion) {
        setAfterEnter(false);
        requestAnimationFrame(() => setAfterEnter(true));
      }
    },
    [reduceMotion],
  );

  const startProfileIfNeeded = useCallback(() => {
    if (profileFired || !tabVisible) return;
    if (reduceMotion) {
      setProfileFired(true);
      return;
    }
    setProfileFired(true);
    setIsAnim(true);
  }, [profileFired, reduceMotion, tabVisible]);

  useEffect(() => {
    renderGraph();
    const onResize = () => {
      window.clearTimeout((window as Window & { __impactProfT?: number }).__impactProfT);
      (window as Window & { __impactProfT?: number }).__impactProfT = window.setTimeout(
        renderGraph,
        140,
      );
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [renderGraph]);

  useEffect(() => {
    if (tabVisible && !profileFired) {
      const t = window.setTimeout(() => startProfileIfNeeded(), 0);
      return () => window.clearTimeout(t);
    }
  }, [tabVisible, profileFired, startProfileIfNeeded]);

  useEffect(() => {
    const profile = profileRef.current;
    if (!profile) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && tabVisible) startProfileIfNeeded();
        });
      },
      { threshold: 0.18 },
    );
    io.observe(profile);
    return () => io.disconnect();
  }, [startProfileIfNeeded, tabVisible]);

  useEffect(() => {
    const host = graphHostRef.current;
    if (!host || orient !== "tablet") return;

    const onClick = (e: MouseEvent) => {
      const target = e.target as Element;
      const ann = target.closest("[data-annotation]");
      if (ann) {
        const id = ann.getAttribute("data-annotation");
        if (id) setPopover((cur) => (cur === id ? null : id));
        return;
      }
      if (!target.closest(".impact-profile-popover")) {
        setPopover(null);
      }
    };

    host.addEventListener("click", onClick);
    return () => host.removeEventListener("click", onClick);
  }, [orient]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPopover(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const { handoffNodes, handoffLabel } = impactCaseOps;
  const isVertical = orient === "vertical";

  return (
    <>
      <div
        ref={profileRef}
        className={[
          "impact-profile impact-p2",
          isAnim && !reduceMotion ? "is-anim" : "",
          afterEnter && curveView === "after" && !reduceMotion ? "is-after-enter" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        id="profile"
        data-curve-view={curveView}
        data-orient-layout={isVertical ? "vertical" : "horizontal"}
      >
        <div className="impact-profile__header">
          <span className="impact-profile__corner">SHEET 02-A · NORMALIZED</span>
          <div
            className="impact-profile-run-toggle"
            role="group"
            aria-label="Stress curve comparison"
          >
            {CURVE_TOGGLE.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                className={`impact-profile-run-toggle__btn${curveView === id ? " is-active" : ""}`}
                data-curve={id}
                aria-pressed={curveView === id}
                onClick={() => selectCurveView(id)}
              >
                {label}
              </button>
            ))}
          </div>
          <p
            className={`impact-profile-stamp impact-profile-stamp--before${curveView === "before" ? " is-visible" : ""}`}
            aria-live="polite"
          >
            BEFORE · LEGACY · 6.8 DAYS
          </p>
          <p
            className={`impact-profile-stamp impact-profile-stamp--after${curveView === "after" ? " is-visible" : ""}`}
            aria-live="polite"
          >
            AFTER · REDESIGN · 4.7 DAYS
          </p>
        </div>

        <div className="impact-profile__graph-wrap">
          <div
            ref={graphHostRef}
            className="impact-profile__graph"
            id="profileGraph"
            data-orient="horizontal"
          />
        </div>

        {popover && orient === "tablet" ? (
          <div className="impact-profile-popover" role="dialog" aria-live="polite">
            {PROFILE_ANNOTATION_LABELS[popover]}
          </div>
        ) : null}
      </div>

      <SectionBreak
        label={
          <>
            <span className="arrow">↓</span> The redesigned handoff, tier by tier · Flow → speed
          </>
        }
        meta={
          <>
            <span>FIG. 02-B · Lifecycle</span>
            <span>Resolve at lowest tier</span>
          </>
        }
      />

      <div className="impact-handoff">
        <span className="impact-handoff__corner">SHEET 02-B</span>
        <div className="impact-handoff__label">{handoffLabel}</div>
        <div className="impact-handoff__flow">
          <div className="impact-handoff__node">
            <div className="tn">
              <span className="num">{handoffNodes[0].dot}</span>
              {handoffNodes[0].h}
            </div>
            <div className="lbl">Structured intake</div>
            <p className="det">{handoffNodes[0].d}</p>
            <div className="sla">
              SLA target<b>&lt; 4h</b>
            </div>
          </div>
          <div className="impact-handoff__conn" aria-hidden />
          <div className="impact-handoff__node">
            <div className="tn">
              <span className="num">{handoffNodes[1].dot}</span>
              {handoffNodes[1].h}
            </div>
            <div className="lbl">Domain engineer picks up</div>
            <p className="det">{handoffNodes[1].d}</p>
            <div className="sla">
              SLA target<b>&lt; 2d</b>
            </div>
          </div>
          <div className="impact-handoff__conn" aria-hidden />
          <div className="impact-handoff__node">
            <div className="tn">
              <span className="num">{handoffNodes[2].dot}</span>
              {handoffNodes[2].h}
            </div>
            <div className="lbl">Defects &amp; architectural fixes</div>
            <p className="det">{handoffNodes[2].d}</p>
            <div className="sla">
              SLA target<b>&lt; 5d</b>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
