"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { useMusic } from "@/lib/music";
import { useScramble } from "@/lib/use-scramble";

export function Hero() {
  const [roll, setRoll] = useState(0);
  const scrambled = useScramble(site.heroLine, true, 1100);

  useEffect(() => {
    const id = window.setInterval(() => setRoll((n) => (n + 1) % site.heroRoll.length), 2600);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="hero" data-nav="light">
      <div className="hero-shader" aria-hidden="true" />
      <div className="hero-sky" aria-hidden="true" />
      <div className="hero-burst" aria-hidden="true" />
      <div className="hero-noise" aria-hidden="true" />
      <div className="hero-content" id="hero-content">
        <Knob className="sun-group" tone="day" />
        <Knob className="moon-group" tone="night" />
        <Reel className="hero-cloud cloud-a" />
        <Reel className="hero-cloud cloud-b" />
        <div className="hero-copy">
          <p className="hero-eyebrow">
            <span className="hero-dot" aria-hidden="true" />
            {site.heroEyebrow}
          </p>
          <span className="hero-vertical" aria-hidden="true">
            {site.heroVertical}
          </span>
          <h1>
            <span className="sr-only">
              {site.name}, {site.role} — {site.heroLine} {site.heroRoll[0]}
            </span>
            <span className="h-line multidisciplinary" aria-hidden="true">
              <Letters text={scrambled} />
            </span>
            <span className="h-line designer" aria-hidden="true">
              <span className="roll" style={{ transform: `translateY(calc(${roll} * var(--roll-h) * -1))` }}>
                {site.heroRoll.map((word) => (
                  <span className="roll-word" key={word}>
                    <Letters text={word} />
                  </span>
                ))}
              </span>
            </span>
          </h1>
        </div>
        <Recorder />
      </div>
    </section>
  );
}

function Letters({ text }: { text: string }) {
  return (
    <>
      {text.split("").map((ch, i) => (
        <span className="h-letter" key={`${ch}-${i}`}>
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </>
  );
}

function Recorder() {
  const { playing, progress, duration, toggle, seek } = useMusic();
  const slider = useRef<HTMLDivElement>(null);
  const pct = duration ? (progress / duration) * 100 : 0;

  function onPointer(e: React.PointerEvent) {
    const el = slider.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    seek((e.clientX - rect.left) / rect.width);
  }

  return (
    <div className="recorder" role="region" aria-label="Audio player">
      <div className={`disk${playing ? " spinning" : ""}`} aria-hidden="true">
        <span className="disk-label">A</span>
      </div>
      <div className="recorder-body">
        <div className="recorder-title">Side A · design journey</div>
        <div className="play-row">
          <button className="play-btn" type="button" onClick={toggle} aria-label={playing ? "Pause" : "Play"}>
            {playing ? (
              <svg width="10" height="12" viewBox="0 0 10 12">
                <rect width="3" height="12" fill="currentColor" />
                <rect x="7" width="3" height="12" fill="currentColor" />
              </svg>
            ) : (
              <svg width="10" height="12" viewBox="0 0 10 12">
                <path d="M0 0 L10 6 L0 12 Z" fill="currentColor" />
              </svg>
            )}
          </button>
          <div
            className="play-slider"
            ref={slider}
            role="slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pct)}
            tabIndex={0}
            onPointerDown={onPointer}
          >
            <div className="slider-fill" style={{ width: `${pct}%` }} />
            <div className="slider-knob" style={{ left: `${pct}%` }} />
          </div>
        </div>
      </div>
      <div className={`disk${playing ? " spinning" : ""}`} aria-hidden="true">
        <span className="disk-label">B</span>
      </div>
    </div>
  );
}

function Knob({ className, tone }: { className: string; tone: "day" | "night" }) {
  const fill = tone === "day" ? "#ffb900" : "#4a86ad";
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
      <rect x="28" y="28" width="144" height="144" rx="8" fill={fill} stroke="#2b2b2b" strokeWidth="6" />
      <circle cx="100" cy="100" r="48" fill="#fcfaf0" stroke="#2b2b2b" strokeWidth="5" />
      <circle cx="100" cy="100" r="10" fill="#2b2b2b" />
      <line x1="100" y1="58" x2="100" y2="78" stroke="#2b2b2b" strokeWidth="6" strokeLinecap="square" />
      <text x="100" y="178" textAnchor="middle" fill="#2b2b2b" fontSize="14" fontFamily="monospace">
        {tone === "day" ? "DAY" : "NITE"}
      </text>
    </svg>
  );
}

function Reel({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 160 160" aria-hidden="true">
      <circle cx="80" cy="80" r="72" fill="#fcfaf0" stroke="#2b2b2b" strokeWidth="5" />
      <circle cx="80" cy="80" r="58" fill="none" stroke="#2b2b2b" strokeWidth="2" strokeDasharray="4 6" />
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (i / 6) * Math.PI * 2;
        return <circle key={i} cx={80 + Math.cos(a) * 28} cy={80 + Math.sin(a) * 28} r="7" fill="#2b2b2b" />;
      })}
      <circle cx="80" cy="80" r="12" fill="#ff7a00" stroke="#2b2b2b" strokeWidth="3" />
    </svg>
  );
}
