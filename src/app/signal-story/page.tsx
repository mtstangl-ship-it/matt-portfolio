import type { Metadata } from "next";
import { SignalStoryVisualGrid } from "@/components/home-sections/SignalStoryVisualGrid";
import { signalStoryCopy } from "@/content/signal-story";

export const metadata: Metadata = {
  title: "Signal → Story",
  description: signalStoryCopy.intro,
};

export default function SignalStoryPage() {
  return (
    <div className="min-h-screen bg-[#070605]">
      <div className="border-b border-white/[0.06] px-4 py-12 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.2em] text-accent/90">
            {signalStoryCopy.title}
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-3xl font-bold leading-tight tracking-[-0.02em] text-[rgba(248,246,242,0.98)] sm:text-4xl">
            Narrative and production work
          </h1>
          <p className="font-body mt-4 max-w-2xl text-[1rem] font-semibold leading-relaxed text-[rgba(200,198,192,0.9)]">
            {signalStoryCopy.intro}
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-section sm:px-6">
        <SignalStoryVisualGrid />
      </div>
    </div>
  );
}
