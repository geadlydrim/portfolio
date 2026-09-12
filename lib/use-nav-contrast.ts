"use client";

import { useEffect, useState } from "react";

export function useNavContrast() {
  const [onDark, setOnDark] = useState(false);

  useEffect(() => {
    const sample = () => {
      const y = 28;
      const x = window.innerWidth / 2;
      const stack = document.elementsFromPoint(x, y);
      for (const node of stack) {
        if (!(node instanceof HTMLElement)) continue;
        if (node.closest("#nav") || node.closest(".menu-overlay") || node.closest(".dot-cursor")) {
          continue;
        }
        if (node.closest(".hero") || node.classList.contains("hero")) {
          setOnDark(document.documentElement.getAttribute("data-theme") === "night");
          return;
        }
        const nav = node.getAttribute("data-nav") ?? node.closest("[data-nav]")?.getAttribute("data-nav");
        if (nav === "dark" || nav === "light") {
          setOnDark(nav === "dark");
          return;
        }
      }
      setOnDark(true);
    };

    sample();
    const rafRef = { current: 0 };
    const scheduleSample = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = 0;
        sample();
      });
    };
    window.addEventListener("scroll", scheduleSample, { passive: true });
    window.addEventListener("resize", scheduleSample, { passive: true });
    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", scheduleSample);
      window.removeEventListener("resize", scheduleSample);
    };
  }, []);

  return onDark;
}
