import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { signalStoryCopy, signalStoryPageVideos } from "@/content/signal-story";
import { YouTubeInline } from "@/components/home-sections/YouTubeInline";

export const metadata: Metadata = {
  title: "Signal → Story",
  description: signalStoryCopy.intro,
};

export default function SignalStoryPage() {
  const [featured, ...rest] = signalStoryPageVideos;
  const rowA = rest.slice(0, 2);
  const rowB = rest.slice(2, 4);
  const finale = rest[4];

  return (
    <div className="min-h-screen bg-[#070605]">
      <div className="border-b border-white/[0.06] px-4 py-10 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.2em] text-accent/90">
            {signalStoryCopy.title}
          </p>
          <p className="font-body mt-4 max-w-3xl text-[1.0625rem] font-semibold leading-relaxed text-[rgba(232,230,226,0.92)] md:text-[1.125rem]">
            {signalStoryCopy.intro}
          </p>
          <p className="mt-6 font-mono text-[0.5rem] font-medium uppercase tracking-[0.14em] text-[rgba(180,176,170,0.45)]">
            <Link href="/" className="text-accent/80 transition-colors hover:text-accent">
              ← Home
            </Link>
          </p>
        </div>
      </div>

      <Section className="relative z-10 py-section">
        <div className="flex flex-col gap-8 md:gap-10 lg:gap-12">
          <YouTubeInline
            youtubeId={featured.youtubeId}
            title={featured.title}
            label={featured.label}
            variant="hero"
            previewStartSeconds={featured.previewStartSeconds}
            previewDurationSeconds={featured.previewDurationSeconds}
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6 lg:gap-8">
            {rowA.map((v) => (
              <YouTubeInline
                key={v.youtubeId}
                youtubeId={v.youtubeId}
                title={v.title}
                label={v.label}
                previewStartSeconds={v.previewStartSeconds}
                previewDurationSeconds={v.previewDurationSeconds}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6 lg:gap-8">
            {rowB.map((v) => (
              <YouTubeInline
                key={v.youtubeId}
                youtubeId={v.youtubeId}
                title={v.title}
                label={v.label}
                previewStartSeconds={v.previewStartSeconds}
                previewDurationSeconds={v.previewDurationSeconds}
              />
            ))}
          </div>

          {finale ? (
            <YouTubeInline
              youtubeId={finale.youtubeId}
              title={finale.title}
              label={finale.label}
              variant="hero"
              previewStartSeconds={finale.previewStartSeconds}
              previewDurationSeconds={finale.previewDurationSeconds}
            />
          ) : null}
        </div>
      </Section>
    </div>
  );
}
