"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { getPointillismPoints } from "@/lib/portraitPointillism";

// Hero-scale view, big, immersive pointillism
const VIEW_W = 2200;
const VIEW_H = 780;
const FACE_OFFSET_X = 160; // Portrait left of right edge, keeps full face in frame on desktop
const SRC_W = 1200;
const SRC_H = 420;

// Phase 1: Chaotic signal field
// Phase 2: Map-wave / journey, intentional, legible
// Phase 3: Pointillist portrait, resolved, held
const TOTAL_DURATION = 32;
const CHAOS_END = 3.2;
const FLOW_START = 5.2;     // chaos→flow transition
const FLOW_END = 11.5;      // wave held
const PORTRAIT_START = 13.5; // flow→portrait transition (longer, artful)
const PORTRAIT_END = 27;    // portrait held, then brief settle

const MARGIN = 140;
const PONG_BOUNDS = { x: MARGIN, y: 100, w: VIEW_W - 2 * MARGIN, h: VIEW_H - 2 * 100 };

const allPoints = getPointillismPoints();
const PORTRAIT_DOTS = Math.min(1800, Math.max(1, allPoints.length || 600));
const AMBIENT_DOTS = 880; // Dots from off-screen, build portrait detail and silhouette
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

// Ambient dots: strong face bias for facial detail; outer dots for silhouette
function getAmbientTarget(i: number): [number, number, number] {
  const src = pts[i % pts.length];
  const [sx, sy] = scaleToView(src[0], src[1]);
  const portraitCenterX = (SRC_W * 0.5) * (VIEW_W / SRC_W);
  const portraitCenterY = (SRC_H * 0.5) * (VIEW_H / SRC_H);
  const isFaceBias = i % 4 !== 0; // 3/4 add facial detail
  const jitter = isFaceBias ? 0.8 : 2.2;
  let tx = sx + (Math.sin(i * 1.3) * jitter);
  let ty = sy + (Math.cos(i * 1.7) * jitter);
  if (isFaceBias) {
    const pull = 0.25;
    tx = tx * (1 - pull) + portraitCenterX * pull;
    ty = ty * (1 - pull) + portraitCenterY * pull;
  }
  return [tx, ty, src[2]];
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
function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}
function easeInCubic(t: number) {
  return t * t * t;
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

// Journey path, smooth, intentional, legible
const WAVE_X_START = 180;
const WAVE_X_END = VIEW_W - 180;
const WAVE_CENTER_Y = VIEW_H / 2;
const WAVE_AMPLITUDE = 42;     // Refined, readable
const WAVES_ALONG_PATH = 2;    // Cleaner wave count
const WAVE_SPEED = 0.9;        // Slower, more contemplative

function getPathT(i: number): number {
  return (i + 0.5) / numDots;
}

// Parametric path: smooth sine wave, legible
function getWavePath(t: number, elapsed: number): [number, number] {
  const x = WAVE_X_START + t * (WAVE_X_END - WAVE_X_START);
  const phase = elapsed * WAVE_SPEED;
  const waveY =
    WAVE_AMPLITUDE * Math.sin(t * Math.PI * 2 * WAVES_ALONG_PATH - phase) +
    WAVE_AMPLITUDE * 0.2 * Math.sin(t * Math.PI * 2 * 3.5 - phase * 1.2);
  const y = WAVE_CENTER_Y + waveY;
  return [x, y];
}

function getFlowPos(i: number, elapsed?: number): [number, number] {
  const t = getPathT(i);
  const lane = (i % 3) - 1;
  const spread = 0.6; // Tighter, cleaner line
  const [px, py] = elapsed !== undefined
    ? getWavePath(t, elapsed)
    : getWavePath(t, 0);
  return [px, py + lane * spread];
}

// Portrait center in view coords, used to center face on narrow/mobile
const PORTRAIT_CENTER_X = (SRC_W / 2) * (VIEW_W / SRC_W) + FACE_OFFSET_X;
const PORTRAIT_CENTER_Y = (SRC_H / 2) * (VIEW_H / SRC_H);
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
      offX = w / 2 - PORTRAIT_CENTER_X * scale;
      offY = h / 2 - PORTRAIT_CENTER_Y * scale;
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
      const inFlowHeld = cycle >= FLOW_START && cycle < FLOW_END;
      const inFlowPhase = cycle >= CHAOS_END + 0.3 && cycle <= PORTRAIT_START;

      // Draw journey path, clean, legible
      if (inFlowHeld || (cycle >= CHAOS_END + 0.4 && cycle < FLOW_START)) {
        const fadeIn = cycle < FLOW_START ? (cycle - CHAOS_END - 0.25) / (FLOW_START - CHAOS_END - 0.25) : 1;
        const mapPhaseProgress = Math.min(1, Math.max(0, fadeIn));
        const pathOpacity = mapPhaseProgress * 0.14;
        ctx.strokeStyle = `rgba(34, 211, 199, ${pathOpacity})`;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();
        const samples = 150;
        for (let s = 0; s <= samples; s++) {
          const t = s / samples;
          const [px, py] = getWavePath(t, elapsed);
          if (s === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

      for (let i = 0; i < numDots; i++) {
        const isAmbient = i >= PORTRAIT_DOTS;
        const flowPosI = getFlowPos(i, inFlowPhase ? elapsed : undefined);

        let faceXI: number, faceYI: number, faceRI: number, faceOpacityI: number;

        // Luminance → radius & opacity: resolved, premium portrait
        const lumToRadius = (lum: number) => 1.6 + lum * 2;
        const lumToOpacity = (lum: number) => 0.68 + lum * 0.38;
        let lumI = 0.5;

        if (isAmbient) {
          const tgt = ambientTargets[i - PORTRAIT_DOTS];
          faceXI = (tgt[0] ?? VIEW_W / 2) + FACE_OFFSET_X;
          faceYI = tgt[1] ?? VIEW_H / 2;
          lumI = tgt[2] ?? 0.5;
          faceRI = lumToRadius(lumI) * 0.95;
          faceOpacityI = lumToOpacity(lumI) * 0.98;
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

        const chaosToFlowDur = FLOW_START - CHAOS_END;
        const flowToPortraitDur = PORTRAIT_START - FLOW_END;
        const portraitToChaosDur = TOTAL_DURATION - PORTRAIT_END;

        if (cycle < CHAOS_END) {
          if (isAmbient) {
            const start = ambientStarts[i - PORTRAIT_DOTS];
            const pongPos = getPongPos(i, cycle);
            const blend = easeInOutCubic(cycle / CHAOS_END);
            x = lerp(start[0], pongPos[0], blend * 0.65);
            y = lerp(start[1], pongPos[1], blend * 0.65);
          } else {
            const pongPos = getPongPos(i, cycle);
            x = pongPos[0];
            y = pongPos[1];
          }
          r = isAmbient ? 1.8 : 2.1;
          opacity = 0.7;
        } else if (cycle < FLOW_START) {
          const localT = (cycle - CHAOS_END) / chaosToFlowDur;
          const eased = easeOutCubic(localT);
          let fromX: number, fromY: number;
          if (isAmbient) {
            const start = ambientStarts[i - PORTRAIT_DOTS];
            const pongPos = getPongPos(i, CHAOS_END);
            fromX = lerp(start[0], pongPos[0], 0.65);
            fromY = lerp(start[1], pongPos[1], 0.65);
          } else {
            const pongAt = getPongPos(i, CHAOS_END);
            fromX = pongAt[0];
            fromY = pongAt[1];
          }
          x = lerp(fromX, flowPosI[0], eased);
          y = lerp(fromY, flowPosI[1], eased);
          r = 2.05;
          opacity = lerp(0.74, 0.9, eased);
        } else if (cycle < FLOW_END) {
          x = flowPosI[0];
          y = flowPosI[1];
          r = 2.1;
          opacity = 0.9;
        } else if (cycle < PORTRAIT_START) {
          const localT = (cycle - FLOW_END) / flowToPortraitDur;
          const distFromCenter = Math.hypot(flowPosI[0] - PORTRAIT_CENTER_X, flowPosI[1] - PORTRAIT_CENTER_Y);
          const maxDist = Math.hypot(VIEW_W, VIEW_H) * 0.5;
          const stagger = Math.min(0.35, (distFromCenter / maxDist) * 0.4);
          const effectiveT = Math.max(0, Math.min(1, (localT - stagger) / (1 - stagger)));
          const eased = easeOutCubic(effectiveT);
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
          const localT = (cycle - PORTRAIT_END) / portraitToChaosDur;
          const eased = easeInCubic(localT);
          const pongPos = getPongPos(i, 0);
          x = lerp(faceXI, pongPos[0], eased);
          y = lerp(faceYI, pongPos[1], eased);
          r = lerp(faceRI, 2, eased);
          opacity = lerp(faceOpacityI, 0.7, eased);
        }

        const inPortrait = cycle >= PORTRAIT_START + 0.2 && cycle < PORTRAIT_END;
        ctx.shadowColor = `rgba(34, 211, 199, ${0.22 + lumI * 0.22})`;
        ctx.shadowBlur = inPortrait ? 2.8 + lumI * 3.2 : 2.8;
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
