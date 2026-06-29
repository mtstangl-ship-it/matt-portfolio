import "@/styles/home-v2/index.css";
import { HomePagePort } from "@/components/home-v2/HomePagePort";

/** SSR aligns with middleware `x-matt-pathname` (Tier‑A home chrome). */
export const dynamic = "force-dynamic";

export default function Home() {
  return <HomePagePort />;
}
