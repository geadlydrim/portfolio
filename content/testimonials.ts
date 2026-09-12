export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  portrait?: string;
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
  {
    quote:
      "I remember Keanu as the guy who always found the idea nobody else on the team thought of. He handled our frontend, optimizations, and maintenance for Tinig-Turo. He has that creative streak where he looks at a problem everyone else already accepted and finds a better way through it. He’s very easy to work with and always willing to help out. What really got me was watching him present at FEU Tech Colloquium 2026 with barely any prep time and still pull it off like he’d rehearsed it for weeks. Hardworking, creative, and someone I’d genuinely want on any team again.",
    name: "John Rainier Valencia",
    role: "Developer",
    company: "Project Kensho - Thesis",
    portrait: "/testimonial-valencia.jpg",
  },
];
