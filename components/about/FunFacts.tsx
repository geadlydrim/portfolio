import { funFacts } from "@/content/experience";

export function FunFacts() {
  return (
    <section className="about-fun" aria-label="Off the grid" data-nav="light">
      <p className="t-eyebrow" style={{ marginBottom: 24 }}>
        Off the grid
      </p>
      <div className="fun-grid">
        {funFacts.map((f) => (
          <article className="fun-card" key={f.title}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={f.image} alt="" />
            <span>{f.title}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
