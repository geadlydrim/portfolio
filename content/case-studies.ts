export type BandTone = "cream" | "dark";

export type Band =
  | {
      type: "hero";
      tone: BandTone;
      kicker?: string;
      title: string;
      italic?: string;
      body: string;
      role: string;
      client: string;
      year: string;
      image: string;
    }
  | {
      type: "panel";
      tone: BandTone;
      number?: string;
      eyebrow?: string;
      heading: string;
      italic?: string;
      body: string;
      image?: string;
      note?: { label: string; items: string[] };
    }
  | {
      type: "quote";
      tone: BandTone;
      quote: string;
      attribution?: string;
    }
  | {
      type: "gallery";
      tone: BandTone;
      heading?: string;
      images: string[];
    }
  | {
      type: "logoband";
      tone: BandTone;
      label: string;
      logos: string[];
    }
  | {
      type: "closing";
      tone: BandTone;
      heading: string;
      italic?: string;
      body: string;
    }
  | {
      type: "readnext";
      slug: string;
    };

export type CaseStudy = {
  slug: string;
  title: string;
  accent: string;
  bands: Band[];
};

export const hatcha: CaseStudy = {
  slug: "hatcha",
  title: "Hatcha",
  accent: "#fc9073",
  bands: [
    {
      type: "hero",
      tone: "cream",
      kicker: "CASE STUDY · 2026",
      title: "Hatcha",
      italic: "builds itself around what’s happening",
      body: "An event planner that stopped thinking in user flows and started composing an interface from the event itself.",
      role: "Lead Product Designer",
      client: "Northstar Labs",
      year: "2026",
      image:
        "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1800&q=80",
    },
    {
      type: "panel",
      tone: "cream",
      number: "01",
      eyebrow: "THE PROBLEM",
      heading: "Every new event type meant",
      italic: "new flows and still fell short",
      body: "Wedding, conference, dinner, festival — each one asked for a different information architecture. The product was a graveyard of special cases. Teams shipped a new flow, then another, then another. Guests still got lost.",
      note: {
        label: "What I owned",
        items: ["Research synthesis", "System architecture", "Visual language", "Motion spec"],
      },
    },
    {
      type: "quote",
      tone: "cream",
      quote: "I had to stop thinking in user flows.",
      attribution: "Working note, week three",
    },
    {
      type: "panel",
      tone: "dark",
      number: "02",
      eyebrow: "THE SHIFT",
      heading: "We defined the shell:",
      italic: "what stays fixed, what GenUI composes",
      body: "A handful of invariant regions — identity, time, the next action — and a composition engine that filled the rest from the event type. Design became a set of rules, not a set of screens.",
      image:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80",
    },
    {
      type: "gallery",
      tone: "dark",
      heading: "Building the system GenUI composes from",
      images: [
        "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb8?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&w=900&q=80",
      ],
    },
    {
      type: "panel",
      tone: "cream",
      number: "03",
      eyebrow: "COLOUR & IMAGE",
      heading: "Designing the rules for",
      italic: "colour and image, not the output",
      body: "A palette grammar keyed to event mood. Photography treated as a material, not a decoration. The interface could go coral for a wedding and ink for a conference without a designer in the loop.",
    },
    {
      type: "logoband",
      tone: "cream",
      label: "Shipped alongside",
      logos: ["Northstar", "Lumen", "Harbor"],
    },
    {
      type: "closing",
      tone: "cream",
      heading: "Shipped.",
      italic: "What designing for GenUI taught me",
      body: "When the interface is assembled at runtime, craft moves upstream — into constraints, tokens, and the few things that must never change. That’s the work I want to keep doing.",
    },
    { type: "readnext", slug: "lumen" },
  ],
};

export const lumen: CaseStudy = {
  slug: "lumen",
  title: "Lumen",
  accent: "#4A9EFF",
  bands: [
    {
      type: "hero",
      tone: "cream",
      kicker: "CASE STUDY · 2025",
      title: "Lumen",
      italic: "Dark, high-contrast, AI-first",
      body: "A billing surface rebuilt for operators who glance, act, and move on. AI sits in reach, never in the way.",
      role: "Product & Motion",
      client: "Harbor",
      year: "2025",
      image:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1800&q=80",
    },
    {
      type: "panel",
      tone: "cream",
      number: "01",
      eyebrow: "BEFORE",
      heading: "Functional,",
      italic: "but not showcase-ready",
      body: "The live product worked. It also looked like every other dashboard from 2019: grey, even, forgettable. On a show floor it disappeared. We needed density without noise, and a presence that could hold a 4K display.",
    },
    {
      type: "quote",
      tone: "dark",
      quote: "Convention was the thing we had to break.",
    },
    {
      type: "panel",
      tone: "dark",
      number: "02",
      eyebrow: "DIRECTION",
      heading: "Glanceable data,",
      italic: "AI in reach",
      body: "A near-black ground. One accent. Type that holds at three metres. Prompts live in a tray you can ignore — until you need them. Small motions make the model feel responsive without turning the UI into a screensaver.",
      image:
        "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb8?auto=format&fit=crop&w=1600&q=80",
    },
    {
      type: "gallery",
      tone: "dark",
      images: [
        "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&w=900&q=80",
      ],
    },
    {
      type: "closing",
      tone: "cream",
      heading: "Shipped to the show floor.",
      body: "Operators used it live. The motions were small enough to trust and large enough to feel. Density held. The AI tray stayed closed until someone wanted it — which turned out to be often.",
    },
    { type: "readnext", slug: "hatcha" },
  ],
};

export const caseStudies: Record<string, CaseStudy> = {
  hatcha,
  lumen,
};

export function getCaseStudy(slug: string) {
  return caseStudies[slug];
}

export function allCaseStudySlugs() {
  return Object.keys(caseStudies);
}
