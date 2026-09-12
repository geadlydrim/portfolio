import { site } from "@/content/site";

export function FeaturedOn() {
  const logos = [...site.featuredOn, ...site.featuredOn];
  return (
    <div className="logo-marquee-wrap">
      <ul className="logo-marquee-inner">
        {logos.map((name, i) => (
          <li className="client-logo" key={`${name}-${i}`}>
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
