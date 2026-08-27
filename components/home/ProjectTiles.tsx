import Link from "next/link";
import { projects } from "@/content/projects";

export function ProjectTiles() {
  const rows: (typeof projects)[] = [];
  for (let i = 0; i < projects.length; i += 2) {
    rows.push(projects.slice(i, i + 2));
  }

  return (
    <div className="project-tiles">
      {rows.map((row, i) => (
        <div className="tiles-row" key={i}>
          {row.map((p) => (
            <Link
              key={`${p.slug}-${p.cover}`}
              href={`/work/${p.slug}`}
              className={`project-tile ${p.wide ? "tile-wide" : "tile-narrow"}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.cover} alt="" />
              <span className="tile-overlay">
                <span className="tile-overlay-title">{p.title}</span>
                <span className="tile-overlay-subtitle">{p.subtitle}</span>
              </span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
