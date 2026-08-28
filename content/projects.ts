export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  client: string;
  role: string;
  accent: string;
  cover: string;
  wide: boolean;
};

export const projects: Project[] = [
  {
    slug: "tinig-turo",
    title: "Tinig-Turo",
    subtitle: "Real-time sound classification for Deaf and Hard-of-Hearing users",
    year: "2026",
    client: "FEU Institute of Technology",
    role: "Software Engineer",
    accent: "#fc9073",
    cover: "/tinig-turo.mp4?v=3",
    wide: true,
  },
  {
    slug: "commutenity",
    title: "CommuteNity",
    subtitle: "Community-driven commute navigation for the Philippines",
    year: "2026",
    client: "Independent",
    role: "Software Engineer",
    accent: "#ff7a00",
    cover: "/work/commutenity-hero.png",
    wide: false,
  },
  {
    slug: "lumen",
    title: "Lumen",
    subtitle: "Glanceable data, AI in reach",
    year: "2025",
    client: "Harbor",
    role: "Product & Motion",
    accent: "#4A9EFF",
    cover:
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb8?auto=format&fit=crop&w=1600&q=80",
    wide: false,
  },
  {
    slug: "stellar4",
    title: "Stellar4",
    subtitle: "Web3 game plus NFT marketplace on Stellar",
    year: "2026",
    client: "Independent",
    role: "Software Engineer",
    accent: "#ffb900",
    cover: "/work/stellar4-hero.png",
    wide: true,
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export const uniqueProjects = projects.filter(
  (p, i, arr) => arr.findIndex((x) => x.slug === p.slug) === i,
);
