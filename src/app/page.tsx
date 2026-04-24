import dynamic from "next/dynamic";
import {
  Hero,
  CredibilityRail,
  ClientTicker,
  ProblemLedger,
  ContactCTA,
} from "@/components/home-sections";

/** Code-split heavy client sections so first paint parses less JS. */
const TransformationImpactDashboard = dynamic(
  () =>
    import("@/components/home-sections/TransformationImpactDashboard").then((m) => ({
      default: m.TransformationImpactDashboard,
    })),
  {
    loading: () => <ImpactSectionSkeleton />,
  }
);

const SignalStorySection = dynamic(
  () =>
    import("@/components/home-sections/SignalStorySection").then((m) => ({
      default: m.SignalStorySection,
    })),
  {
    loading: () => <SignalSectionSkeleton />,
  }
);

const FeaturedCaseStudiesPreview = dynamic(
  () =>
    import("@/components/home-sections/FeaturedCaseStudiesPreview").then((m) => ({
      default: m.FeaturedCaseStudiesPreview,
    })),
  {
    loading: () => <CaseStudiesSectionSkeleton />,
  }
);

function ImpactSectionSkeleton() {
  return (
    <section
      className="min-h-[280px] border-t-2 border-accent-signal/40 bg-dashboard-bg py-section"
      aria-hidden
    >
      <div className="mx-auto max-w-6xl animate-pulse px-4 sm:px-6">
        <div className="h-9 max-w-xs rounded bg-dashboard-ink-muted/15" />
        <div className="mt-3 h-4 max-w-md rounded bg-dashboard-ink-muted/10" />
        <div className="mt-10 h-72 rounded-lg border border-dashboard-border/40 bg-dashboard-surface/20" />
      </div>
    </section>
  );
}

function SignalSectionSkeleton() {
  return (
    <section className="min-h-[200px] border-t border-ink-200/40 bg-[#070605] py-section" aria-hidden>
      <div className="mx-auto max-w-6xl animate-pulse px-4 sm:px-6">
        <div className="h-4 max-w-[8rem] rounded bg-accent/20" />
        <div className="mt-4 h-5 max-w-2xl rounded bg-white/10" />
        <div className="mt-10 aspect-video max-w-5xl rounded-lg bg-white/5" />
      </div>
    </section>
  );
}

function CaseStudiesSectionSkeleton() {
  return (
    <section className="min-h-[160px] border-t border-ink-200/55 bg-support py-section" aria-hidden>
      <div className="mx-auto max-w-6xl animate-pulse px-4 sm:px-6">
        <div className="h-8 max-w-[10rem] rounded bg-ink-200/30" />
        <div className="mt-8 h-px w-full bg-ink-200/20" />
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <CredibilityRail />
      <ClientTicker />
      <ProblemLedger />
      <TransformationImpactDashboard />
      <SignalStorySection />
      <FeaturedCaseStudiesPreview />
      <ContactCTA />
    </>
  );
}
