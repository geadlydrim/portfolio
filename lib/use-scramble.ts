"use client";

import { useEffect, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&";

export function useScramble(text: string, active: boolean, duration = 900) {
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const locked = Math.floor(t * text.length);
      const next = text
        .split("")
        .map((ch, i) => {
          if (ch === " ") return " ";
          if (i < locked) return text[i];
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");
      setOut(next);
      if (t < 1) frame = requestAnimationFrame(tick);
      else setOut(text);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [text, active, duration]);

  return active ? out : text;
}
