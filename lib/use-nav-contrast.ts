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

    let id = 0;
    const loop = () => {
      sample();
      id = window.setTimeout(loop, 80);
    };
    loop();
    window.addEventListener("resize", sample);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("resize", sample);
    };
  }, []);

  return onDark;
}
