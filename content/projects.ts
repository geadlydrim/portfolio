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
    slug: "hatcha",
    title: "Hatcha",
    subtitle: "An event planner that builds itself around what’s happening",
    year: "2026",
    client: "Northstar Labs",
    role: "Lead Product Designer",
    accent: "#fc9073",
    cover:
      "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1600&q=80",
    wide: true,
  },
  {
    slug: "lumen",
    title: "Lumen",
    subtitle: "Dark, high-contrast, AI-first billing for operators",
    year: "2025",
    client: "Harbor",
    role: "Product & Motion",
    accent: "#4A9EFF",
    cover:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
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
    slug: "hatcha",
    title: "Hatcha",
    subtitle: "Shipped as a living, generative interface",
    year: "2026",
    client: "Northstar Labs",
    role: "Lead Product Designer",
    accent: "#fc9073",
    cover:
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1600&q=80",
    wide: true,
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export const uniqueProjects = projects.filter(
  (p, i, arr) => arr.findIndex((x) => x.slug === p.slug) === i,
);
