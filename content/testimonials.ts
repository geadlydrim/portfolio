export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  portrait: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Alex has a rare ability to hold the whole product in their head — the flow, the type, the motion — and still ship something a team can actually build.",
    name: "Maya Chen",
    role: "Head of Product",
    company: "Northstar",
    portrait:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80",
  },
  {
    quote:
      "We came in with a messy live product. They redesigned the home screen without breaking a single metric we cared about — and the new onboarding just worked.",
    name: "Jonah Hale",
    role: "Founder",
    company: "Kite",
    portrait:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80",
  },
  {
    quote:
      "The case studies don’t just look good. They made the rest of the org understand what good design actually does.",
    name: "Priya Nair",
    role: "Design Director",
    company: "Lumen",
    portrait:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80",
  },
];
