import { AboutIntro } from "@/components/about/AboutIntro";
import { Experience } from "@/components/about/Experience";
import { FunFacts } from "@/components/about/FunFacts";
import { StarryCard } from "@/components/about/StarryCard";
import { site } from "@/content/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: site.about.heading,
};

export default function AboutPage() {
  return (
    <main>
      <AboutIntro />
      <Experience />
      <FunFacts />
      <StarryCard />
    </main>
  );
}
