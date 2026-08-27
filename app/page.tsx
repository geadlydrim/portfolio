import { FeaturedOn } from "@/components/home/FeaturedOn";
import { Hero } from "@/components/home/Hero";
import { IntroStatement } from "@/components/home/IntroStatement";
import { ProjectTiles } from "@/components/home/ProjectTiles";
import { SkyBand } from "@/components/home/SkyBand";
import { Testimonials } from "@/components/home/Testimonials";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <section className="projects" id="story" data-nav="light">
        <SkyBand />
        <IntroStatement />
      </section>
      <section className="featured-work" id="work" data-nav="light">
        <h2 className="featured-heading">Selected work.</h2>
        <FeaturedOn />
        <ProjectTiles />
      </section>
      <Testimonials />
    </main>
  );
}
