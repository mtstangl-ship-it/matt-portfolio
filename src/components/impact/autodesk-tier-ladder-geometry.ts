import { autodeskServices, type AutodeskService } from "@/content/impact-autodesk-services";

export type TierId = "01" | "02" | "03";

export const RING_R: Record<TierId, number> = { "01": 210, "02": 140, "03": 70 };
export const RING_START: Record<TierId, number> = { "01": 30, "02": 45, "03": 36 };

export const OWNS: Record<TierId, ReadonlySet<TierId>> = {
  "01": new Set<TierId>(["01", "02", "03"]),
  "02": new Set<TierId>(["02", "03"]),
  "03": new Set<TierId>(["03"]),
};

export type ClsKey = "inn" | "opt" | "rfn";

export interface DotLayout {
  service: AutodeskService;
  tier: TierId;
  x: number;
  y: number;
  labelX: number;
  labelY: number;
  textAnchor: "start" | "middle" | "end";
  cls: ClsKey;
  wedgePath: string;
  centerDeg: number;
}

const CLS_MAP: Record<AutodeskService["classification"], ClsKey> = {
  innovated: "inn",
  optimized: "opt",
  refined: "rfn",
};

function polarToXY(r: number, deg: number): { x: number; y: number } {
  const rad = ((deg - 90) * Math.PI) / 180;
  return {
    x: +(r * Math.cos(rad)).toFixed(2),
    y: +(r * Math.sin(rad)).toFixed(2),
  };
}

/** Annular wedge centered at origin for tap targeting. */
export function annularWedgePath(
  innerR: number,
  outerR: number,
  startDeg: number,
  endDeg: number,
): string {
  const s = ((startDeg - 90) * Math.PI) / 180;
  const e = ((endDeg - 90) * Math.PI) / 180;
  const x1 = innerR * Math.cos(s);
  const y1 = innerR * Math.sin(s);
  const x2 = outerR * Math.cos(s);
  const y2 = outerR * Math.sin(s);
  const x3 = outerR * Math.cos(e);
  const y3 = outerR * Math.sin(e);
  const x4 = innerR * Math.cos(e);
  const y4 = innerR * Math.sin(e);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return [
    `M ${x1} ${y1}`,
    `L ${x2} ${y2}`,
    `A ${outerR} ${outerR} 0 ${large} 1 ${x3} ${y3}`,
    `L ${x4} ${y4}`,
    `A ${innerR} ${innerR} 0 ${large} 0 ${x1} ${y1}`,
    "Z",
  ].join(" ");
}

export function buildDotLayouts(): DotLayout[] {
  const byTier: Record<TierId, AutodeskService[]> = { "01": [], "02": [], "03": [] };
  for (const svc of autodeskServices) {
    byTier[svc.tier].push(svc);
  }

  const layouts: DotLayout[] = [];

  (["03", "02", "01"] as TierId[]).forEach((tier) => {
    const list = byTier[tier];
    const r = RING_R[tier];
    const start = RING_START[tier];
    const step = 360 / list.length;

    list.forEach((service, i) => {
      const centerDeg = start + i * step;
      const { x, y } = polarToXY(r, centerDeg);
      const labelPt = polarToXY(r + 18, centerDeg);
      const wedgePath = annularWedgePath(
        Math.max(r - 32, tier === "03" ? 38 : 48),
        r + 32,
        centerDeg - step / 2,
        centerDeg + step / 2,
      );

      layouts.push({
        service,
        tier,
        x,
        y,
        labelX: labelPt.x,
        labelY: labelPt.y + 3,
        textAnchor: labelPt.x < -2 ? "end" : labelPt.x > 2 ? "start" : "middle",
        cls: CLS_MAP[service.classification],
        wedgePath,
        centerDeg,
      });
    });
  });

  return layouts;
}

export const DOT_LAYOUTS = buildDotLayouts();

export const CLS_LABEL: Record<ClsKey, string> = {
  inn: "INNOVATED",
  opt: "OPTIMIZED",
  rfn: "REFINED",
};

export function classificationGlyph(cls: ClsKey): string {
  if (cls === "inn") return "●";
  if (cls === "opt") return "◐";
  return "○";
}

export function nativeTierFromPartNumber(partNumber: string): TierId {
  const prefix = partNumber.slice(0, 2);
  if (prefix === "01" || prefix === "02" || prefix === "03") return prefix;
  return "03";
}

export function serviceAttribution(activeTier: TierId, serviceTier: TierId): string {
  if (serviceTier === activeTier) return `T${serviceTier} NATIVE`;
  return `INHERITED FROM T${serviceTier}`;
}

export const MATH_CALLOUT: Record<TierId, string> = {
  "01": "T01 · OWNS 15 · ADDS 6 · INHERITS 9 FROM T02 · T03",
  "02": "T02 · OWNS 9 · ADDS 4 · INHERITS 5 FROM T03",
  "03": "T03 · OWNS 5",
};

export const RING_LABELS: Record<TierId, string> = {
  "01": "T01 · BUSINESS · +6 ADDED",
  "02": "T02 · PROFESSIONAL · +4 ADDED",
  "03": "T03 · INCLUDED · 5",
};

export const TIER_STAMPS: {
  tier: TierId;
  pn: string;
  name: string;
  meta: string;
  count: number;
}[] = [
  {
    tier: "01",
    pn: "T01 · BUSINESS",
    name: "Business",
    meta: "LAUNCHED JUL 2025 · 950 ACCTS",
    count: 15,
  },
  {
    tier: "02",
    pn: "T02 · PROFESSIONAL",
    name: "Professional",
    meta: "LAUNCHED DEC 2025 · 25K+ ACCTS",
    count: 9,
  },
  {
    tier: "03",
    pn: "T03 · INCLUDED",
    name: "Included",
    meta: "ALWAYS-ON · 1M+ ACCTS",
    count: 5,
  },
];

export function formatServiceName(name: string): string {
  return name.toUpperCase();
}
