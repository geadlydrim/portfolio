import { site } from "@/content/site";

export function FeaturedOn() {
  const logos = [...site.featuredOn, ...site.featuredOn];
  return (
    <div className="logo-marquee-wrap" aria-label="Work featured on">
      <div className="logo-marquee-inner">
        {logos.map((name, i) => (
          <span className="client-logo" key={`${name}-${i}`}>
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
