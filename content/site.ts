export const site = {
  name: "Alex Rivera",
  firstName: "Alex",
  role: "Product Designer",
  tagline: "Designer who Builds",
  location: "Lisbon, PT",
  locationShort: "LISBON, PT",
  email: "hello@example.com",
  available: true,
  availableLabel: "Available for work",
  heroEyebrow: "UNIT Z-87 · STEREO · SIGNAL",
  heroVertical: "CASSETTE / 2026",
  heroLine: "Cassette system",
  heroRoll: ["Designer", "Builder", "Maker"],
  intro: {
    lead: "I trained as an architect. Now I design products people actually want to use.",
    body: "From early concepts to refined experiences, I help ambitious teams build products that earn trust, move quickly, and drive growth.",
  },
  about: {
    heading: "I design the parts people remember — and the systems that let teams ship them.",
    paragraphs: [
      "I started in architecture, where a line on a page had to become a place someone could live in. That same discipline now sits behind every product I ship: structure first, then the details that make it feel inevitable.",
      "I work across research, interface, motion, and a little code — enough to prototype the thing instead of describing it. The goal is always the same: something people actually want to use.",
    ],
  },
  footer: {
    sub: "From early concepts to refined experiences, I help ambitious teams build products that earn trust, move quickly, and drive growth.",
    headline: "Press play on the next idea",
    credit: "Catalog template · swap copy in /content",
  },
  contact: {
    eyebrow: "AVAILABLE FOR NEW PROJECTS",
    title: "Cue the next track?",
    intro: "Send a brief. I’ll reply within a couple of days.",
    successTitle: "Tape loaded.",
    successBody: "Thanks — I’ll be in touch soon.",
  },
  socials: [
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "GitHub", href: "https://github.com" },
    { label: "Behance", href: "https://behance.net" },
  ],
  featuredOn: ["Northstar", "Lumen", "Harbor", "Kite", "Atelier"],
  audioSrc: "",
  avatar:
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=240&h=240&q=80",
} as const;

export type Site = typeof site;
