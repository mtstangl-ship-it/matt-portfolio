"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { getPointillismPoints } from "@/lib/portraitPointillism";

const VIEW_W = 1200;
const VIEW_H = 420;
const TOTAL_DURATION = 14;
const FACE_OFFSET_X = 280;

const MARGIN = 80;
const PONG_BOUNDS = { x: MARGIN, y: 60, w: VIEW_W - 2 * MARGIN, h: VIEW_H - 2 * 60 };

const allPoints = getPointillismPoints();
const numDots = Math.min(200, Math.max(1, allPoints.length || 200));
const pts: [number, number, number][] =
  allPoints.length >= numDots
    ? allPoints.slice(0, numDots)
    : [...allPoints, ...Array.from({ length: numDots - allPoints.length }, (): [number, number, number] => [600, 210, 0.5])];

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
  const sx = PONG_BOUNDS.x + ((i * 97) % 1000) / 1000 * PONG_BOUNDS.w * 0.9;
  const sy = PONG_BOUNDS.y + ((i * 137) % 1000) / 1000 * PONG_BOUNDS.h * 0.9;
  const vx = 180 + ((i * 61) % 120) - 60;
  const vy = 140 + ((i * 89) % 100) - 50;
  const px = PONG_BOUNDS.x + bounce1D(sx - PONG_BOUNDS.x, vx, t, PONG_BOUNDS.w);
  const py = PONG_BOUNDS.y + bounce1D(sy - PONG_BOUNDS.y, vy, t, PONG_BOUNDS.h);
  return [px, py];
}

function getFlowPos(i: number): [number, number] {
  const rt = (i + 0.5) / numDots;
  const roadX = 80 + rt * 1100;
  const wave = Math.sin(rt * Math.PI * 3.5) * 42;
  const wave2 = Math.sin(rt * Math.PI * 6) * 12;
  const wave3 = Math.sin(rt * Math.PI * 1.8) * 18;
  const row = i % 3;
  const roadY = 200 + wave + wave2 + wave3 + (row - 1) * 6;
  return [roadX, roadY];
}

// When stacked (narrow), use fixed canvas size so it never overflows; face center in view
const FACE_CENTER_X = 600 + FACE_OFFSET_X;
const STACKED_CANVAS_W = 500;
const STACKED_CANVAS_H = 320;

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
      // Fixed canvas size when stacked: prevents overflow, ensures centering, zoomed on face
      w = Math.round(STACKED_CANVAS_W * dpr);
      h = Math.round(STACKED_CANVAS_H * dpr);
      const scaleX = w / VIEW_W;
      const scaleY = h / VIEW_H;
      scale = Math.max(scaleX, scaleY) * 1.25;
      // Center the crop on the face (right side of composition) so it's not cut off
      offX = w / 2 - FACE_CENTER_X * scale;
      offY = (h - VIEW_H * scale) / 2;
    } else {
      w = Math.round(rect.width * dpr);
      h = Math.round(rect.height * dpr);
      const scaleX = w / VIEW_W;
      const scaleY = h / VIEW_H;
      scale = Math.min(scaleX, scaleY);
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

      for (let i = 0; i < numDots; i++) {
        let x: number, y: number, r: number, opacity: number;
        const flowPosI = getFlowPos(i);
        const ptI = pts[i];
        const faceXI = (ptI?.[0] ?? 600) + FACE_OFFSET_X;
        const faceYI = ptI?.[1] ?? 210;
        const lumI = ptI?.[2] ?? 0.5;
        const faceRI = lumI > 0.7 ? 2 : lumI > 0.4 ? 1.5 : 1;
        const faceOpacityI = 0.35 + lumI * 0.65;
        if (cycle < 3) {
          const pongPos = getPongPos(i, cycle);
          x = pongPos[0];
          y = pongPos[1];
          r = 1.5;
          opacity = 0.55;
        } else if (cycle < 4.5) {
          const localT = (cycle - 3) / 1.5;
          const eased = easeInOutCubic(localT);
          const pongAt3 = getPongPos(i, 3);
          x = lerp(pongAt3[0], flowPosI[0], eased);
          y = lerp(pongAt3[1], flowPosI[1], eased);
          r = 1.5;
          opacity = lerp(0.55, 0.88, eased);
        } else if (cycle < 7) {
          const localT = (cycle - 4.5) / 2.5;
          const eased = easeInOutCubic(localT);
          x = lerp(flowPosI[0], faceXI, eased);
          y = lerp(flowPosI[1], faceYI, eased);
          r = lerp(1.5, faceRI, eased);
          opacity = lerp(0.88, faceOpacityI, eased);
        } else if (cycle < 11) {
          x = faceXI;
          y = faceYI;
          r = faceRI;
          opacity = faceOpacityI;
        } else {
          const localT = (cycle - 11) / 3;
          const eased = easeInOutCubic(localT);
          const pongPos = getPongPos(i, 0);
          x = lerp(faceXI, pongPos[0], eased);
          y = lerp(faceYI, pongPos[1], eased);
          r = lerp(faceRI, 1.5, eased);
          opacity = lerp(faceOpacityI, 0.55, eased);
        }

        ctx.shadowColor = "rgba(34, 211, 199, 0.35)";
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 199, ${opacity * 0.9})`;
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
