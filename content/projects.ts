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
    slug: "stellar4",
    title: "Stellar4",
    subtitle: "Web3 game plus NFT marketplace on Stellar",
    year: "2026",
    client: "Independent",
    role: "Software Engineer",
    accent: "#ffb900",
    cover: "/stellar4.mp4?v=2",
    wide: false,
  },
  {
    slug: "commutenity",
    title: "CommuteNity",
    subtitle: "Community-driven commute navigation for the Philippines",
    year: "2026",
    client: "Independent",
    role: "Software Engineer",
    accent: "#ff7a00",
    cover: "/commutenity.mp4?v=1",
    wide: false,
  },
  {
    slug: "tiktok-automate",
    title: "TikTok Automate",
    subtitle: "Local tooling for batch TikTok accounts on social schedulers",
    year: "2026",
    client: "TikTok Engagement & Advertising",
    role: "Software Engineer",
    accent: "#4a86ad",
    cover: "/tiktok-automate.mp4?v=2",
    wide: true,
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export const uniqueProjects = projects.filter(
  (p, i, arr) => arr.findIndex((x) => x.slug === p.slug) === i,
);
