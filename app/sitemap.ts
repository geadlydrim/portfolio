import type { MetadataRoute } from "next";
import { allCaseStudySlugs } from "@/content/case-studies";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/about", "/playground"].map((path) => ({
    url: `${SITE_URL}${path}`,
  }));
  const caseStudyRoutes = allCaseStudySlugs().map((slug) => ({
    url: `${SITE_URL}/work/${slug}`,
  }));
  return [...staticRoutes, ...caseStudyRoutes];
}
