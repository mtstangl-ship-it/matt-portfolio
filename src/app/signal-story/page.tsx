import type { Metadata } from "next";
import { signalStoryCopy } from "@/content/signal-story";
import { SignalStoryView } from "@/components/signal-story/SignalStoryView";

export const metadata: Metadata = {
  title: "Signal → Story",
  description: signalStoryCopy.intro,
};

export default function SignalStoryPage() {
  return <SignalStoryView />;
}
