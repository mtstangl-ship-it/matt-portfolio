import type { ReactNode } from "react";
import "@/styles/signal-story/index.css";

export const dynamic = "force-dynamic";

export default function SignalStoryLayout({ children }: { children: ReactNode }) {
  return children;
}
