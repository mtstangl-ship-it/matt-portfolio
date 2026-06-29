import type { Metadata } from "next";
import { ImpactPage } from "@/components/impact/ImpactPage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Impact · Matt Stangl",
  description: "Three enterprise transformations in numbers — Autodesk, Wipro, EY.",
};

export default function Impact() {
  return <ImpactPage />;
}

