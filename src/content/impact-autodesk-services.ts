export interface AutodeskService {
  partNumber: string;
  name: string;
  tier: "01" | "02" | "03";
  side: "L" | "R";
  classification: "innovated" | "optimized" | "refined";
  description: string;
}

export const autodeskServices: AutodeskService[] = [
  // T01 Business Plan · Premium (6 services)
  {
    partNumber: "01-A",
    name: "Strategic success planning",
    tier: "01",
    side: "L",
    classification: "innovated",
    description: "[PLACEHOLDER · Matt fills in]",
  },
  {
    partNumber: "01-B",
    name: "Executive business review",
    tier: "01",
    side: "L",
    classification: "innovated",
    description: "[PLACEHOLDER]",
  },
  {
    partNumber: "01-C",
    name: "Adoption roadmap",
    tier: "01",
    side: "L",
    classification: "innovated",
    description: "[PLACEHOLDER]",
  },
  {
    partNumber: "01-D",
    name: "Named success manager",
    tier: "01",
    side: "R",
    classification: "optimized",
    description: "[PLACEHOLDER]",
  },
  {
    partNumber: "01-E",
    name: "Quarterly health score",
    tier: "01",
    side: "R",
    classification: "optimized",
    description: "[PLACEHOLDER]",
  },
  {
    partNumber: "01-F",
    name: "Priority escalation",
    tier: "01",
    side: "R",
    classification: "refined",
    description: "[PLACEHOLDER]",
  },
  // T02 Professional Plan · Targeted (4 services)
  {
    partNumber: "02-A",
    name: "Deployment accelerators",
    tier: "02",
    side: "L",
    classification: "innovated",
    description: "[PLACEHOLDER]",
  },
  {
    partNumber: "02-B",
    name: "Capability workshops",
    tier: "02",
    side: "L",
    classification: "optimized",
    description: "[PLACEHOLDER]",
  },
  {
    partNumber: "02-C",
    name: "Integration advisory",
    tier: "02",
    side: "R",
    classification: "optimized",
    description: "[PLACEHOLDER]",
  },
  {
    partNumber: "02-D",
    name: "On-demand expert hours",
    tier: "02",
    side: "R",
    classification: "refined",
    description: "[PLACEHOLDER]",
  },
  // T03 Included Plan · Foundational (5 services)
  {
    partNumber: "03-A",
    name: "Guided onboarding",
    tier: "03",
    side: "L",
    classification: "innovated",
    description: "[PLACEHOLDER]",
  },
  {
    partNumber: "03-B",
    name: "Self-serve learning paths",
    tier: "03",
    side: "L",
    classification: "innovated",
    description: "[PLACEHOLDER]",
  },
  {
    partNumber: "03-C",
    name: "Community access",
    tier: "03",
    side: "L",
    classification: "optimized",
    description: "[PLACEHOLDER]",
  },
  {
    partNumber: "03-D",
    name: "Knowledge base",
    tier: "03",
    side: "R",
    classification: "refined",
    description: "[PLACEHOLDER]",
  },
  {
    partNumber: "03-E",
    name: "Product telemetry nudges",
    tier: "03",
    side: "R",
    classification: "refined",
    description: "[PLACEHOLDER]",
  },
];

export function getServiceByPartNumber(partNumber: string): AutodeskService | undefined {
  return autodeskServices.find((s) => s.partNumber === partNumber);
}
