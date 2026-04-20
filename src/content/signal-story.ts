/**
 * Signal → Story, YouTube-backed narrative work.
 * Homepage: 3 videos max. Subpage: up to 6, curated.
 */
export const signalStoryCopy = {
  eyebrow: "Ongoing archive",
  title: "Signal → Story",
  /** Full intro, used on the dedicated Signal → Story page. */
  intro:
    "A running record of the signals I catch (moments, behavior, culture, emotion) and the short films they turn into.",
  /** Home-section teaser, one beat of craft, so the subpage copy isn't repeated. */
  homeTeaser:
    "Short films built on close observation. The craft side of the practice, in its own language.",
} as const;

export type SignalStoryVideo = {
  youtubeId: string;
  title: string;
  /** Very short optional label */
  label?: string;
  /**
   * Desktop hover preview: loop starts here (seconds). Omit for thumbnail-only until click.
   */
  previewStartSeconds?: number;
  /** Hover preview loop length (default 3.5s) */
  previewDurationSeconds?: number;
};

/** Homepage: 1 lead + 2 supporting, Healthcare Heroes first, No Limits to Discovery (not “Oprah”) */
export const signalStoryHomeVideos: SignalStoryVideo[] = [
  {
    youtubeId: "heAtSMBa5i8",
    title: "Healthcare Heroes",
    previewStartSeconds: 8,
  },
  {
    youtubeId: "t-RAl7g2Olw",
    title: "Travel Wisconsin",
    previewStartSeconds: 6,
  },
  {
    youtubeId: "XPZpVWSPZ2w",
    title: "No Limits to Discovery",
    previewStartSeconds: 10,
  },
];

/** Subpage: 6 entries, “Next Protectors” is separate from “No Limits to Discovery” */
export const signalStoryPageVideos: SignalStoryVideo[] = [
  {
    youtubeId: "heAtSMBa5i8",
    title: "Healthcare Heroes",
    label: "Featured",
    previewStartSeconds: 8,
  },
  {
    youtubeId: "t-RAl7g2Olw",
    title: "Travel Wisconsin",
    previewStartSeconds: 6,
  },
  {
    youtubeId: "XPZpVWSPZ2w",
    title: "No Limits to Discovery",
    previewStartSeconds: 10,
  },
  {
    youtubeId: "LiPIUNutKRw",
    title: "Doctors Without Borders",
    previewStartSeconds: 7,
  },
  {
    youtubeId: "wnFTdF0VWM0",
    title: "Caron Butler",
    previewStartSeconds: 9,
  },
  {
    youtubeId: "V5lIXv8idUU",
    title: "Next Protectors",
    previewStartSeconds: 8,
  },
];
