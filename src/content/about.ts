/** About page — modular narrative (Matt Stangl). */

export const aboutPage = {
  hero: {
    headline: "I build design systems for exit velocity.",
    subhead:
      "Strategy, service design, and storytelling that connect experience to adoption, retention, and growth.",
  },
  /** Horizontal strip — links to Impact / system language */
  visualStrip: {
    flow: ["Strategy", "Systems", "Adoption", "Growth"],
    pills: ["0→1 models", "Service architecture", "Journey systems", "Revenue impact"],
  },

  /**
   * Revamped double diamond — full inner stages (diagram fidelity).
   * Omits only the external footnotes at the very bottom of the classic poster.
   */
  operatingModel: {
    title: "From ambiguity to aligned direction",
    intro:
      "The same double diamond you’d see in a serious workshop—discovery and delivery—with every inner move on the table.",
    journey: {
      from: "Don’t know / could be",
      to: "Do know / should be",
    },
    leftDiamondTitle: "Doing the right things",
    rightDiamondTitle: "Doing things right",
    diamond1: {
      discover: {
        label: "Discover",
        phaseNote: "Research phase",
        mode: "Diverging",
        pillar: "Rip the brief",
        branches: [
          "Conduct Primary Research",
          "Define research areas and methods",
          "Conduct Secondary Research",
        ],
      },
      define: {
        label: "Define",
        phaseNote: "Synthesis phase",
        mode: "Converging",
        steps: [
          "Build Themes & Clusters",
          "Find Insights",
          "Deduce Opportunity Areas",
          "Form HMW (How Might We) Questions",
        ],
      },
    },
    bridge: "Final Brief, HMW-Question, Strategy",
    diamond2: {
      develop: {
        label: "Develop",
        phaseNote: "Ideation phase",
        mode: "Diverging",
        pillar: "Ideate",
        branches: ["Set ideas, a Design Vision & Hypotheses", "Evaluate 1st ideas"],
      },
      deliver: {
        label: "Deliver",
        phaseNote: "Implementation phase",
        mode: "Converging",
        steps: [
          "Prototype, Test & Analyse",
          "Learn, Iterate & Repeat",
          "Build, Iterate & Repeat",
          "Release & Out",
        ],
      },
    },
  },

  /** Even over — judgment calls with a concrete example each */
  evenOver: {
    title: "How I choose",
    subtitle: "Even-over statements — what I optimize for when trade-offs show up.",
    items: [
      {
        emphasis: "Clarity",
        rest: "even over comfort",
        example:
          "I’ll surface the awkward trade-off in the room so we can align—rather than letting ambiguity linger to preserve politeness.",
      },
      {
        emphasis: "Progress",
        rest: "even over perfection",
        example:
          "I’d rather ship a testable slice that moves adoption than polish a narrative nobody can execute against.",
      },
      {
        emphasis: "Innovation",
        rest: "even over optimization",
        example:
          "When the model is wrong, tuning the old journey won’t save it—I’ll push for a new hypothesis worth validating.",
      },
      {
        emphasis: "Curiosity",
        rest: "even over certainty",
        example:
          "I hold strong opinions loosely: discovery can overturn my favorite idea if the evidence says so.",
      },
      {
        emphasis: "Empowering others",
        rest: "even over personal recognition",
        example:
          "I care that teams own the system after I leave—shared language, artifacts, and rituals beat hero moments.",
      },
    ],
  },

  /**
   * Red lines — pick/edit freely; shown as compact commitments.
   * (Options you can swap: swap strings in this array.)
   */
  nonNegotiables: {
    title: "Non-negotiables",
    intro: "A few lines I don’t cross when the pressure rises.",
    lines: [
      "No journey theater without an adoption path—artifacts have to live in real workflows.",
      "No strategy story without a next experiment—clarity has to touch reality.",
      "No scaled solution without cross-functional alignment—transformation isn’t a solo act.",
      "No launch-and-leave—there’s a feedback loop or we’re not done.",
    ],
  },

  /** Qualitative “proof of person” — replaces numeric signal tiles */
  presence: {
    title: "What working together feels like",
    intro: "Signals that aren’t on a spreadsheet—how I show up for teams and leaders.",
    items: [
      {
        title: "Calm in ambiguity",
        body: "I make messy situations feel solvable—structure without shutting people down.",
      },
      {
        title: "Translation, not jargon",
        body: "Execs, practitioners, and customers can leave the same room with shared language they’ll actually use.",
      },
      {
        title: "Adoption in the same breath as idea",
        body: "I design for what happens Monday—not just the workshop Friday.",
      },
      {
        title: "Craft with accountability",
        body: "Narrative, service, and system design stay tied to outcomes—beauty that doesn’t ship doesn’t count.",
      },
    ],
  },

  howIThink: {
    title: "How I think",
    statements: [
      "Design and business outcomes share one trajectory.",
      "Ambiguity gets structured into something teams can move on.",
      "Complexity is translated into systems people can actually use.",
      "Adoption carries the same weight as the idea itself.",
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
