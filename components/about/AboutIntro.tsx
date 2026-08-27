import { site } from "@/content/site";

const polaroids = [
  "https://images.unsplash.com/photo-1500530855697-b971d8d7b82c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80",
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
