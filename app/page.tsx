import { FeaturedOn } from "@/components/home/FeaturedOn";
import { Hero } from "@/components/home/Hero";
import { IntroStatement } from "@/components/home/IntroStatement";
import { ProjectTiles } from "@/components/home/ProjectTiles";
import { SlabBand } from "@/components/home/SlabBand";
import { Testimonials } from "@/components/home/Testimonials";

export default function HomePage() {
  return (
    <main id="main" tabIndex={-1}>
      <Hero />
      <section className="projects" id="story" data-nav="light">
        <SlabBand />
        <IntroStatement />
      </section>
      <section className="toolbox" aria-labelledby="toolbox-h" data-nav="light">
        <h2 id="toolbox-h" className="t-eyebrow">Toolbox</h2>
        <FeaturedOn />
      </section>
      <section className="featured-work" id="work" data-nav="light">
        <h2 className="featured-heading">Some of my work.</h2>
        <ProjectTiles />
      </section>
      <Testimonials />
    </main>
  );
}
