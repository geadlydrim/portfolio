"use client";

import { useCallback, useEffect, useState } from "react";
import { playground } from "@/content/playground";

export function PlaygroundTrack() {
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false);
  const n = playground.length;
  const current = playground[i];

  const prev = useCallback(() => setI((v) => (v - 1 + n) % n), [n]);
  const next = useCallback(() => setI((v) => (v + 1) % n), [n]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Enter") setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  return (
    <section className="pg-flow" aria-label="Playground — motion and 3D experiments" data-nav="light">
      <header className="pgf-head">
        <p className="pgf-eyebrow">Playground</p>
        <h1 className="pgf-title">Design and code experiments</h1>
        <p className="pgf-lead">A coverflow of studies that didn’t need a case study — just a weekend and a question.</p>
      </header>

      <div className="pgf-stage" id="pgf-stage">
        {n > 1 ? (
          <button className="pgf-arrow pgf-arrow--prev" type="button" onClick={prev} aria-label="Previous">
            ‹
          </button>
        ) : null}
        <div className="pgf-track" id="pgf-track">
          {playground.map((item, idx) => {
            let d = idx - i;
            if (d > n / 2) d -= n;
            if (d < -n / 2) d += n;
            const active = d === 0;
            const x = d * 340;
            const rot = d * -18;
            const z = -Math.abs(d) * 180;
            const scale = active ? 1 : 0.78;
            return (
              <article
                key={item.title}
                className={`pgf-card${active ? " is-active" : ""}`}
                style={{
                  transform: `translate(-50%, -50%) translateX(${x}px) translateZ(${z}px) rotateY(${rot}deg) scale(${scale})`,
                  zIndex: 10 - Math.abs(d),
                  opacity: Math.abs(d) > 2 ? 0 : 1,
                }}
                onClick={() => (active ? setOpen(true) : setI(idx))}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.title} />
              </article>
            );
          })}
        </div>
        {n > 1 ? (
          <button className="pgf-arrow pgf-arrow--next" type="button" onClick={next} aria-label="Next">
            ›
          </button>
        ) : null}
      </div>

      <div className="pgf-caption" id="pgf-caption">
        <div className="pgf-cap-title">{current.title}</div>
        <div className="pgf-cap-tags">
          {current.tags.join(" · ")} · {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </div>
        <p className="pgf-lead">{current.desc}</p>
      </div>

      {open ? (
        <div className="pgf-lightbox" role="dialog" aria-modal="true" aria-label={current.title}>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            style={{ position: "absolute", top: 24, right: 24, color: "white", fontSize: 28 }}
          >
            ×
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={current.image} alt={current.title} />
        </div>
      ) : null}
    </section>
  );
}
