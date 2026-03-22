"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { getPointillismPoints } from "@/lib/portraitPointillism";

// Hero-scale view — big, immersive pointillism
const VIEW_W = 2200;
const VIEW_H = 780;
const FACE_OFFSET_X = 520;
const SRC_W = 1200;
const SRC_H = 420;

// Phases: chaos (0-4) → journey map (4-12.5) → portrait (12.5-20) → loop
// Journey map holds ~8.5s for clear perception; portrait ~7.5s
const TOTAL_DURATION = 24;
const CHAOS_END = 4;
const FLOW_END = 12.5;
const PORTRAIT_END = 20;

const MARGIN = 140;
const PONG_BOUNDS = { x: MARGIN, y: 100, w: VIEW_W - 2 * MARGIN, h: VIEW_H - 2 * 100 };

const allPoints = getPointillismPoints();
const PORTRAIT_DOTS = Math.min(1400, Math.max(1, allPoints.length || 600));
const AMBIENT_DOTS = 480; // Dots from off-screen — portrait built from massive signal field
const numDots = PORTRAIT_DOTS + AMBIENT_DOTS;

// Use all points; tile with deterministic jitter if we need more for denser portrait
function buildPortraitPoints(): [number, number, number][] {
  if (allPoints.length >= PORTRAIT_DOTS) return allPoints.slice(0, PORTRAIT_DOTS);
  const out: [number, number, number][] = [];
  for (let i = 0; i < PORTRAIT_DOTS; i++) {
    const src = allPoints[i % allPoints.length];
    const jitter = (i * 7) % 11 - 5; // deterministic offset
    out.push([src[0] + jitter * 0.8, src[1] + ((i * 13) % 7 - 3) * 0.8, src[2]]);
  }
  return out;
}
const pts: [number, number, number][] = buildPortraitPoints();

function scaleToView(x: number, y: number): [number, number] {
  return [x * (VIEW_W / SRC_W), y * (VIEW_H / SRC_H)];
}

// Ambient dots: start off-screen, converge into flow, then into portrait
function getAmbientTarget(i: number): [number, number, number] {
  const src = pts[i % pts.length];
  const [sx, sy] = scaleToView(src[0], src[1]);
  const jitter = 1.5; // Tight — ambient dots add detail, not blur
  return [
    sx + (Math.sin(i * 1.3) * jitter),
    sy + (Math.cos(i * 1.7) * jitter),
    src[2],
  ];
}

function getAmbientStartPos(i: number): [number, number] {
  const side = i % 4;
  const t = (i * 0.17) % 1;
  if (side === 0) return [-120 - (i % 6) * 50, 100 + t * (VIEW_H - 200)];
  if (side === 1) return [VIEW_W + 120 + (i % 6) * 45, 100 + t * (VIEW_H - 200)];
  if (side === 2) return [MARGIN + t * (VIEW_W - 2 * MARGIN), -80 - (i % 5) * 35];
  return [MARGIN + t * (VIEW_W - 2 * MARGIN), VIEW_H + 80 + (i % 5) * 30];
}

const ambientTargets: [number, number, number][] = Array.from({ length: AMBIENT_DOTS }, (_, i) =>
  getAmbientTarget(i)
);
const ambientStarts: [number, number][] = Array.from({ length: AMBIENT_DOTS }, (_, i) =>
  getAmbientStartPos(i)
);

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function bounce1D(p0: number, v: number, t: number, L: number): number {
  let x = p0 + v * t;
  const period = 2 * L;
  x = ((x % period) + period) % period;
  return x > L ? 2 * L - x : x;
}

function getPongPos(i: number, t: number): [number, number] {
  const idx = i < PORTRAIT_DOTS ? i : (i - PORTRAIT_DOTS) % PORTRAIT_DOTS;
  const sx = PONG_BOUNDS.x + ((idx * 97) % 1000) / 1000 * PONG_BOUNDS.w * 0.9;
  const sy = PONG_BOUNDS.y + ((idx * 137) % 1000) / 1000 * PONG_BOUNDS.h * 0.9;
  const vx = 180 + ((idx * 61) % 120) - 60;
  const vy = 140 + ((idx * 89) % 100) - 50;
  const px = PONG_BOUNDS.x + bounce1D(sx - PONG_BOUNDS.x, vx, t, PONG_BOUNDS.w);
  const py = PONG_BOUNDS.y + bounce1D(sy - PONG_BOUNDS.y, vy, t, PONG_BOUNDS.h);
  return [px, py];
}

// Journey map: waypoint nodes — undulating wave path across the view
const NODES: [number, number][] = [
  [180, VIEW_H / 2],
  [480, VIEW_H / 2 - 70],
  [820, VIEW_H / 2 + 55],
  [1160, VIEW_H / 2 - 50],
  [1500, VIEW_H / 2 + 25],
  [1880, VIEW_H / 2 - 20],
];

function getPathT(i: number): number {
  // Bias distribution so dots cluster at waypoint nodes
  const raw = (i + 0.5) / numDots;
  const k = NODES.length - 1;
  const nearestNode = Math.round(raw * k) / k;
  return raw * 0.55 + nearestNode * 0.45;
}

function lerpPath(t: number): [number, number] {
  if (t <= 0) return NODES[0];
  if (t >= 1) return NODES[NODES.length - 1];
  const seg = t * (NODES.length - 1);
  const i = Math.floor(seg);
  const local = seg - i;
  const eased = local * local * (3 - 2 * local); // smoothstep
  return [
    lerp(NODES[i][0], NODES[i + 1][0], eased),
    lerp(NODES[i][1], NODES[i + 1][1], eased),
  ];
}

// Wave undulation for journey phase — pronounced undulating wave
const WAVE_AMPLITUDE = 42;
const WAVE_FREQ = 1.8;

function getFlowPos(i: number, elapsed?: number): [number, number] {
  const t = getPathT(i);
  const [px, py] = lerpPath(t);
  const lane = (i % 3) - 1;
  const spread = 6;
  let waveY = lane * spread;
  if (elapsed !== undefined) {
    waveY += WAVE_AMPLITUDE * Math.sin(elapsed * WAVE_FREQ + t * Math.PI * 2.5);
  }
  return [px, py + waveY];
}

const FACE_CENTER_X = VIEW_W / 2 + FACE_OFFSET_X * 0.5;
const STACKED_CANVAS_W = 680;
const STACKED_CANVAS_H = 500;

export function HeroAtmosphereBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();
  const startRef = useRef<number>(0);
  const [isStacked, setIsStacked] = useState(false);

  useEffect(() => {
    const check = () => setIsStacked(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas?.getContext("2d", { alpha: true });

    if (!canvas || !ctx) {
      rafRef.current = requestAnimationFrame(draw);
      return;
    }

    const rect = container?.getBoundingClientRect() ?? canvas.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) {
      rafRef.current = requestAnimationFrame(draw);
      return;
    }

    const isNarrow = rect.width < 768;
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    let w: number, h: number, scale: number, offX: number, offY: number;

    if (isNarrow) {
      w = Math.round(STACKED_CANVAS_W * dpr);
      h = Math.round(STACKED_CANVAS_H * dpr);
      const scaleX = w / VIEW_W;
      const scaleY = h / VIEW_H;
      scale = Math.max(scaleX, scaleY) * 1.35;
      offX = w / 2 - FACE_CENTER_X * scale;
      offY = (h - VIEW_H * scale) / 2;
    } else {
      w = Math.round(rect.width * dpr);
      h = Math.round(rect.height * dpr);
      const scaleX = w / VIEW_W;
      const scaleY = h / VIEW_H;
      scale = Math.max(scaleX, scaleY) * 1.22;
      offX = (w - VIEW_W * scale) / 2;
      offY = (h - VIEW_H * scale) / 2;
    }

    try {
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.translate(offX, offY);
      ctx.scale(scale, scale);

      const elapsed = (performance.now() - startRef.current) / 1000;
      const cycle = elapsed % TOTAL_DURATION;
      const inMapPhase = cycle >= CHAOS_END + 0.5 && cycle < FLOW_END;
      const inFlowPhase = cycle >= CHAOS_END + 0.8 && cycle < FLOW_END + 0.5;

      // Draw undulating journey path during map phase
      if (inMapPhase) {
        const mapPhaseProgress = Math.min(1, (cycle - CHAOS_END - 0.5) / 0.6);
        const pathOpacity = mapPhaseProgress * 0.12;
        const waveOffset = WAVE_AMPLITUDE * Math.sin(elapsed * WAVE_FREQ) * 0.6;
        ctx.strokeStyle = `rgba(34, 211, 199, ${pathOpacity})`;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();
        const samples = 60;
        for (let s = 0; s <= samples; s++) {
          const t = s / samples;
          const [px, py] = lerpPath(t);
          const waveY = waveOffset * Math.sin(t * Math.PI * 2.5);
          if (s === 0) ctx.moveTo(px, py + waveY);
          else ctx.lineTo(px, py + waveY);
        }
        ctx.stroke();
      }

      for (let i = 0; i < numDots; i++) {
        const isAmbient = i >= PORTRAIT_DOTS;
        const flowPosI = getFlowPos(i, inFlowPhase ? elapsed : undefined);

        let faceXI: number, faceYI: number, faceRI: number, faceOpacityI: number;

        // Luminance → radius & opacity: bigger dots for hero presence
        const lumToRadius = (lum: number) => 1.6 + lum * 1.6;
        const lumToOpacity = (lum: number) => 0.52 + lum * 0.48;
        let lumI = 0.5;

        if (isAmbient) {
          const tgt = ambientTargets[i - PORTRAIT_DOTS];
          faceXI = (tgt[0] ?? VIEW_W / 2) + FACE_OFFSET_X;
          faceYI = tgt[1] ?? VIEW_H / 2;
          lumI = tgt[2] ?? 0.5;
          faceRI = lumToRadius(lumI) * 0.85;
          faceOpacityI = lumToOpacity(lumI) * 0.9;
        } else {
          const ptI = pts[i];
          const [sx, sy] = scaleToView(ptI[0], ptI[1]);
          faceXI = sx + FACE_OFFSET_X;
          faceYI = sy;
          lumI = ptI[2] ?? 0.5;
          faceRI = lumToRadius(lumI);
          faceOpacityI = lumToOpacity(lumI);
        }

        let x: number, y: number, r: number, opacity: number;

        if (cycle < CHAOS_END) {
          if (isAmbient) {
            const start = ambientStarts[i - PORTRAIT_DOTS];
            const pongPos = getPongPos(i, cycle);
            const blend = easeInOutCubic(cycle / CHAOS_END);
            x = lerp(start[0], pongPos[0], blend * 0.6);
            y = lerp(start[1], pongPos[1], blend * 0.6);
          } else {
            const pongPos = getPongPos(i, cycle);
            x = pongPos[0];
            y = pongPos[1];
          }
          r = isAmbient ? 1.7 : 2;
          opacity = 0.68;
        } else if (cycle < CHAOS_END + 0.8) {
          const localT = (cycle - CHAOS_END) / 0.8;
          const eased = easeInOutCubic(localT);
          let fromX: number, fromY: number;
          if (isAmbient) {
            const start = ambientStarts[i - PORTRAIT_DOTS];
            const pongPos = getPongPos(i, CHAOS_END);
            fromX = lerp(start[0], pongPos[0], 0.6);
            fromY = lerp(start[1], pongPos[1], 0.6);
          } else {
            const pongAt = getPongPos(i, CHAOS_END);
            fromX = pongAt[0];
            fromY = pongAt[1];
          }
          x = lerp(fromX, flowPosI[0], eased);
          y = lerp(fromY, flowPosI[1], eased);
          r = 2;
          opacity = lerp(0.7, 0.92, eased);
        } else if (cycle < FLOW_END) {
          x = flowPosI[0];
          y = flowPosI[1];
          const pathT = getPathT(i);
          const nodeCount = NODES.length - 1;
          const distToNode = Math.min(
            ...Array.from({ length: NODES.length }, (_, n) =>
              Math.abs(pathT - n / nodeCount)
            )
          );
          const atNode = distToNode < 0.08;
          r = atNode ? 2.4 : 2;
          opacity = atNode ? 0.95 : 0.86;
        } else if (cycle < FLOW_END + 0.7) {
          const localT = (cycle - FLOW_END) / 0.7;
          const eased = easeInOutCubic(localT);
          x = lerp(flowPosI[0], faceXI, eased);
          y = lerp(flowPosI[1], faceYI, eased);
          r = lerp(2.1, faceRI, eased);
          opacity = lerp(0.88, faceOpacityI, eased);
        } else if (cycle < PORTRAIT_END) {
          x = faceXI;
          y = faceYI;
          r = faceRI;
          opacity = faceOpacityI;
        } else {
          const localT = (cycle - PORTRAIT_END) / (TOTAL_DURATION - PORTRAIT_END);
          const eased = easeInOutCubic(localT);
          const pongPos = getPongPos(i, 0);
          x = lerp(faceXI, pongPos[0], eased);
          y = lerp(faceYI, pongPos[1], eased);
          r = lerp(faceRI, 2, eased);
          opacity = lerp(faceOpacityI, 0.72, eased);
        }

        const inPortrait = cycle >= FLOW_END + 0.5 && cycle < PORTRAIT_END;
        ctx.shadowColor = `rgba(34, 211, 199, ${0.2 + lumI * 0.15})`;
        ctx.shadowBlur = inPortrait ? 2.5 + lumI * 2.5 : 3.5;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 199, ${opacity})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      ctx.restore();
    } catch {
      /* ignore frame */
    }

    rafRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    startRef.current = performance.now();
    rafRef.current = requestAnimationFrame(draw);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [draw]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none relative z-0 flex h-full min-w-0 max-w-full flex-1 items-center justify-center self-stretch overflow-hidden"
    >
      <div className="flex h-full w-full min-w-0 max-w-full items-center justify-center overflow-hidden">
        <canvas
          ref={canvasRef}
          className={isStacked ? "max-h-full max-w-full" : "h-full w-full"}
          style={{
            display: "block",
            maxWidth: "100%",
            maxHeight: "100%",
            ...(isStacked ? { width: "auto", height: "auto" } : { width: "100%", height: "100%" }),
          }}
          aria-hidden
        />
      </div>
    </div>
  );
}
