import type { Metadata } from "next";
import "@/styles/home-v2/index.css";
import { HomePagePort } from "@/components/home-v2/HomePagePort";
import {
  defaultDescription,
  defaultTitle,
  ogImage,
  siteUrl,
} from "@/lib/site-metadata";

/** SSR aligns with middleware `x-matt-pathname` (Tier‑A home chrome). */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: defaultTitle,
  description: defaultDescription,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: siteUrl,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [ogImage.url],
  },
};

export default function Home() {
  return <HomePagePort />;
}
