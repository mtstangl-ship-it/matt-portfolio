/**
 * Creative narrative — editorial framing. Update externalHref to deep links when ready.
 */
export const signalStoryCopy = {
  title: "Signal → Story",
  intro:
    "From fragmented signals — moments, behavior, culture, emotion — to narratives people can feel and move through.",
} as const;

export type SignalStoryPiece = {
  id: string;
  label: string;
  caption?: string;
  externalHref: string;
};

export const signalStoryPiecesById = {
  oprah: {
    id: "oprah",
    label: "Oprah narrated campaign",
    caption: "Cultural signal → narrative",
    externalHref: "https://mattstangl.com",
  },
  travelWisconsin: {
    id: "travel-wisconsin",
    label: "Travel Wisconsin",
    caption: "Moment → meaning",
    externalHref: "https://mattstangl.com",
  },
  dwb: {
    id: "dwb",
    label: "Doctors Without Borders",
    caption: "Behavior → story",
    externalHref: "https://mattstangl.com",
  },
  caronButler: {
    id: "caron-butler",
    label: "Caron Butler",
    caption: "Moment → meaning",
    externalHref: "https://mattstangl.com",
  },
  discovery: {
    id: "discovery",
    label: "Discovery",
    caption: "Cultural signal → narrative",
    externalHref: "https://mattstangl.com",
  },
} as const satisfies Record<string, SignalStoryPiece>;

/** Visual rhythm: dominant → pair → wide → wide */
export const signalStoryLayout = [
  { kind: "hero" as const, key: "oprah" as const },
  { kind: "pair" as const, keys: ["travelWisconsin", "dwb"] as const },
  { kind: "hero" as const, key: "caronButler" as const },
  { kind: "hero" as const, key: "discovery" as const },
];
