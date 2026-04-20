import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section, SiteGrid } from "@/components/ui";
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
    <div className="relative min-h-screen bg-[#070605]">
      <SiteGrid tone="dark" opacity={0.6} />
      <PageHero
        eyebrow={signalStoryCopy.eyebrow}
        title={signalStoryCopy.title}
        subtitle={signalStoryCopy.intro}
        tone="dark"
        meta={
          <Link
            href="/"
            className="font-mono text-eyebrow font-semibold uppercase tracking-[0.25em] text-accent-signal/80 transition-colors hover:text-accent-signal"
          >
            ← Home
          </Link>
        }
      />

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
