"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { projects } from "@/content/projects";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

function isVideoSrc(src: string) {
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(src);
}

function TileVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;

    const playAtRegularSpeed = () => {
      el.defaultPlaybackRate = 1;
      el.playbackRate = 1;
      void el.play();
    };

    const loopFromStart = () => {
      el.currentTime = 0;
      playAtRegularSpeed();
    };

    el.addEventListener("loadeddata", playAtRegularSpeed);
    el.addEventListener("ended", loopFromStart);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.preload = "auto";
          void el.play();
        } else {
          el.pause();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);

    return () => {
      el.removeEventListener("loadeddata", playAtRegularSpeed);
      el.removeEventListener("ended", loopFromStart);
      observer.disconnect();
    };
  }, [src, reducedMotion]);

  if (reducedMotion) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={poster} alt="" />;
  }

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
    />
  );
}

function TileCover({ src, poster }: { src: string; poster: string }) {
  if (isVideoSrc(src)) {
    return <TileVideo src={src} poster={poster} />;
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" />;
}

export function ProjectTiles() {
  const rows: (typeof projects)[] = [];
  for (let i = 0; i < projects.length; i += 2) {
    rows.push(projects.slice(i, i + 2));
  }

  return (
    <div className="project-tiles">
      {rows.map((row, i) => (
        <div className="tiles-row" data-lead={row[0].wide ? "wide" : "narrow"} key={i}>
          {row.map((p) => (
            <Link
              key={`${p.slug}-${p.cover}`}
              href={`/work/${p.slug}`}
              className={`project-tile ${p.wide ? "tile-wide" : "tile-narrow"}`}
            >
              <span className="tile-media">
                <TileCover src={p.cover} poster={p.poster} />
                <span className="tile-scrim" aria-hidden="true">
                  <span className="tile-cue">View case study</span>
                </span>
              </span>
              <span className="tile-caption">
                <span className="tile-caption-meta">
                  {p.client} · {p.year}
                </span>
                <span className="tile-caption-title">{p.title}</span>
                <span className="tile-caption-sub">{p.subtitle}</span>
              </span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
