import {
  Hero,
  CredibilityRail,
  ClientTicker,
  BrandThesis,
  TransformationImpactDashboard,
  SignalStorySection,
  StanfordAICapability,
  FeaturedCaseStudiesPreview,
  HomeAboutTeaser,
  ContactCTA,
} from "@/components/home-sections";

export default function Home() {
  return (
    <>
      <Hero />
      <TransformationImpactDashboard />
      <SignalStorySection />
      <FeaturedCaseStudiesPreview />
      <HomeAboutTeaser />
      <CredibilityRail />
      <ClientTicker />
      <BrandThesis />
      <StanfordAICapability />
      <ContactCTA />
    </>
  );
}
