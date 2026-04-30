import type { Metadata } from "next";
import { AboutV3View } from "./AboutV3View";

export const metadata: Metadata = {
  title: "About · Matt Stangl",
  description:
    "Personal posture — beliefs, working approach, career arc, and how I show up as a CX, product, and service design leader.",
};

export default function AboutPage() {
  return <AboutV3View />;
}
