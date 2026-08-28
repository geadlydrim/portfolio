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
      "Keanu was always the guy you’d want around when you want to study something deep. He asks the right questions and keeps digging into topics that actually matter for the task at hand. He doesn’t just settle for “yes”, he asks why and how. He thinks in steps, breaking down complex problems into what actually needs to happen. And that tells you everything about who he really is. Being a programmer is one thing, but being a friend is another. Outside of school, he’s fun to be around, humorous, knowledgeable, and deeply supportive. He’s the type of person that amplifies the people around them.",
    name: "Lord Xander Dacillo",
    role: "Team Leader",
    company: "Project Kensho - Thesis",
    portrait: "/testimonial-dacillo.jpg",
  },
  {
    quote:
      "I have worked with Keanu for the past two years, up until now, mostly because of our undergraduate thesis project. Throughout that time, I’ve come to see him as someone who is reliable, humble, and approaches the things he works on with a willingness to learn and understand, rather than simply getting them done. Beyond our projects, he really knows how to handle his work and contributes meaningfully to the team. Overall, he is a dependable teammate with a good attitude, a genuine interest in technology, and a mindset that I believe will take him far as a developer.",
    name: "Peach Allyhana Chan",
    role: "Logistics",
    company: "Project Kensho - Thesis",
    portrait: "/testimonial-chan.png",
  },
  // Hidden placeholders — restore when real quotes land.
  // {
  //   quote:
  //     "We came in with a messy live product. They redesigned the home screen without breaking a single metric we cared about — and the new onboarding just worked.",
  //   name: "Jonah Hale",
  //   role: "Founder",
  //   company: "Kite",
  //   portrait:
  //     "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80",
  // },
  // {
  //   quote:
  //     "The case studies don’t just look good. They made the rest of the org understand what good design actually does.",
  //   name: "Priya Nair",
  //   role: "Design Director",
  //   company: "Lumen",
  //   portrait:
  //     "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80",
  // },
];
