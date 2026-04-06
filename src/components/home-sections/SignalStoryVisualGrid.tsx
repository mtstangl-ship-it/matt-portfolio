"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  signalStoryLayout,
  signalStoryPiecesById,
} from "@/content/signal-story";
import type { SignalStoryPiece } from "@/content/signal-story";

function PieceFrame({ piece, className = "" }: { piece: SignalStoryPiece; className?: string }) {
  return (
    <a
      href={piece.externalHref}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative block overflow-hidden rounded-lg border border-white/[0.08] bg-gradient-to-br from-[#161413] via-[#100f0e] to-[#0a0908] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-transform duration-300 ease-out hover:scale-[1.01] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 motion-reduce:transition-none motion-reduce:hover:scale-100 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 25% 15%, rgba(34,211,199,0.14), transparent 55%), radial-gradient(ellipse 50% 45% at 85% 80%, rgba(13,148,136,0.08), transparent 50%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(34,211,199,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,211,199,0.25) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="relative flex min-h-[220px] flex-col justify-end p-6 sm:min-h-[260px] sm:p-8 md:min-h-[300px]">
        {piece.caption ? (
          <p className="font-mono text-[0.5rem] font-bold uppercase tracking-[0.18em] text-accent/85">
            {piece.caption}
          </p>
        ) : null}
        <p className="mt-2 font-display text-xl font-bold leading-tight tracking-[-0.02em] text-[rgba(248,246,242,0.98)] md:text-2xl">
          {piece.label}
        </p>
        <span className="mt-4 inline-flex items-center gap-2 font-mono text-[0.52rem] font-medium uppercase tracking-[0.12em] text-[rgba(200,198,192,0.55)] transition-colors group-hover:text-accent/90">
          mattstangl.com
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </div>
    </a>
  );
}

export function SignalStoryVisualGrid() {
  const reduce = useReducedMotion();

  const reveal = (node: React.ReactNode, key: string) => (
    <motion.div
      key={key}
      initial={reduce ? false : { opacity: 0, y: 14 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {node}
    </motion.div>
  );

  return (
    <div className="flex flex-col gap-5 md:gap-6 lg:gap-8">
      {signalStoryLayout.map((row, i) => {
        if (row.kind === "hero") {
          const piece = signalStoryPiecesById[row.key];
          return reveal(<PieceFrame piece={piece} className="w-full" />, `hero-${row.key}-${i}`);
        }
        const a = signalStoryPiecesById[row.keys[0]];
        const b = signalStoryPiecesById[row.keys[1]];
        return reveal(
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
            <PieceFrame piece={a} className="min-h-0" />
            <PieceFrame piece={b} className="min-h-0" />
          </div>,
          `pair-${i}`
        );
      })}
    </div>
  );
}
