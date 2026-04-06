/** About page — modular narrative (Matt Stangl). */

export const aboutPage = {
  hero: {
    headline: "I design systems that turn ambiguity into momentum.",
    subhead:
      "Strategy, service design, and storytelling that connect experience to adoption, retention, and growth.",
  },
  /** Horizontal strip — links to Impact / system language */
  visualStrip: {
    flow: ["Strategy", "Systems", "Adoption", "Growth"],
    pills: ["0→1 models", "Service architecture", "Journey systems", "Revenue impact"],
  },
  howIThink: {
    title: "How I think",
    statements: [
      "I don’t separate design from business outcomes.",
      "I structure ambiguity into something teams can move on.",
      "I translate complexity into systems people can actually use.",
      "I care about adoption as much as I care about ideas.",
    ],
  },
  whatIDo: {
    title: "What I do",
    cards: [
      {
        title: "Service & experience strategy",
        body: "Designing systems that connect experience to measurable business outcomes.",
      },
      {
        title: "Journey & lifecycle design",
        body: "Structuring end-to-end experiences that drive adoption, retention, and expansion.",
      },
      {
        title: "Offer & service model design",
        body: "Turning fragmented capabilities into clear, monetizable service offerings.",
      },
      {
        title: "Adoption & retention systems",
        body: "Designing for real usage, not just intent.",
      },
      {
        title: "Cross-functional alignment",
        body: "Bringing design, product, support, and business into shared direction.",
      },
      {
        title: "Narrative & communication",
        body: "Making complex transformation understandable and actionable.",
      },
    ],
  },
  signals: {
    title: "Select signals",
    tiles: [
      { value: "$50M+", label: "AOV impact through service model redesign" },
      { value: "+27%", label: "Retention lift through premium service tier" },
      { value: "106%", label: "NRR path through lifecycle design" },
      { value: "Oprah narrated campaign", label: "Led creative production and storytelling execution" },
    ],
  },
  career: {
    title: "Career arc",
    paragraphs: [
      "Matt’s work spans creative storytelling, consulting, and enterprise transformation.",
      "He started in creative environments, developing a strong instinct for narrative, craft, and audience. That foundation evolved into work shaping service models, experience systems, and organizational alignment—helping companies turn fragmented experiences into structured, scalable offerings.",
      "What defines his work is not just strategy, but the ability to translate it into systems, teams, and execution.",
    ],
  },
  personal: {
    title: "Personal note",
    sentences: [
      "I care about building a life that’s not just work.",
      "I write, stay close to people who matter, and try to keep perspective.",
      "The work matters to me, but it’s not the only thing—that balance shows up in how I think, how I lead, and what I build.",
    ],
  },
} as const;
