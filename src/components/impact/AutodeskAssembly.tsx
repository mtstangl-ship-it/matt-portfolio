"use client";

import { AutodeskTierLadder } from "./AutodeskTierLadder";

const TIMELINE_ANCHORS = [
  { stage: "0", name: "BUILD", date: "JAN 2025" },
  { stage: "1", name: "LAUNCH", date: "JUL 2025" },
  { stage: "2", name: "SCALE", date: "DEC 2025" },
] as const;

export function AutodeskAssembly() {
  return (
    <div className="impact-tier-ladder" id="assembly">
      <AutodeskTierLadder />

      <div className="impact-customer-scale" aria-label="12-month program timeline">
        <div className="impact-customer-scale__bar">
          <span className="impact-customer-scale__fill" aria-hidden />
        </div>
        <div className="impact-customer-scale__labels">
          {TIMELINE_ANCHORS.map((anchor) => (
            <div key={anchor.stage} className="impact-customer-scale__item">
              <span className="impact-customer-scale__stage">{anchor.stage}</span>
              <span className="impact-customer-scale__name">{anchor.name}</span>
              <span className="impact-customer-scale__date">{anchor.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
