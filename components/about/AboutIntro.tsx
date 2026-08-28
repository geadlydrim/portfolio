import { site } from "@/content/site";

const polaroids = [
  "/about-polaroid-1.jpg",
  "/about-polaroid-2.jpg",
  "/about-polaroid-3.jpg",
];

export function AboutIntro() {
  return (
    <section className="about-intro" aria-label={`About ${site.name}`} data-nav="light">
      <div className="ai-content">
        <div className="ai-copy">
          <h1 className="ai-heading">{site.about.heading}</h1>
          <div className="ai-body">
            {site.about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <div className="ai-photos" aria-hidden="true">
          {polaroids.map((src) => (
            <div className="ai-polaroid" key={src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
