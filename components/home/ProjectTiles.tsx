"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { projects } from "@/content/projects";

function isVideoSrc(src: string) {
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(src);
}

function TileVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
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
    playAtRegularSpeed();

    return () => {
      el.removeEventListener("loadeddata", playAtRegularSpeed);
      el.removeEventListener("ended", loopFromStart);
    };
  }, [src]);

  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      autoPlay
      preload="auto"
      aria-hidden
    />
  );
}

function TileCover({ src }: { src: string }) {
  if (isVideoSrc(src)) {
    return <TileVideo src={src} />;
  }
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
        <div className="tiles-row" key={i}>
          {row.map((p) => (
            <Link
              key={`${p.slug}-${p.cover}`}
              href={`/work/${p.slug}`}
              className={`project-tile ${p.wide ? "tile-wide" : "tile-narrow"}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <TileCover src={p.cover} />
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
