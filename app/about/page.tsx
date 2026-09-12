import { AboutIntro } from "@/components/about/AboutIntro";
import { Experience } from "@/components/about/Experience";
import { FunFacts } from "@/components/about/FunFacts";
import { CurrentlyCard } from "@/components/about/CurrentlyCard";
import { site } from "@/content/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: site.about.heading,
  openGraph: { title: "About", description: site.about.heading },
};

export default function AboutPage() {
  return (
    <main id="main" tabIndex={-1}>
      <AboutIntro />
      <Experience />
      <FunFacts />
      <CurrentlyCard />
    </main>
  );
}
