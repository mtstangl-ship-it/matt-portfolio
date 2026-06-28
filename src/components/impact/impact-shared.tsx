"use client";

import type { ReactNode } from "react";

export function CatBadge({
  num,
  category,
  org,
}: {
  num: string;
  category: string;
  org: string;
}) {
  return (
    <div className="impact-cat-badge">
      <span className="num">{num}</span>
      <span className="sep">·</span>
      <span className="cat">{category}</span>
      <span className="sep">·</span>
      <span className="org">{org}</span>
    </div>
  );
}

export function MetricStrip({
  cols = 3,
  children,
}: {
  cols?: 3 | 4;
  children: ReactNode;
}) {
  return (
    <div className={`impact-metric-strip${cols === 4 ? " cols-4" : ""}`}>{children}</div>
  );
}

export function MetricCell({
  value,
  label,
}: {
  value: ReactNode;
  label: string;
}) {
  return (
    <div>
      <div className="v">{value}</div>
      <div className="l">{label}</div>
    </div>
  );
}

export function SectionBreak({
  label,
  meta,
}: {
  label: ReactNode;
  meta: ReactNode;
}) {
  return (
    <div className="impact-section-break">
      <span className="impact-section-break__label">{label}</span>
      <span className="impact-section-break__meta">{meta}</span>
    </div>
  );
}
