"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";

export type Theme = "day" | "night";

type ThemeContextValue = {
  setTheme: (theme: Theme) => void;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  root.classList.toggle("night", theme === "night");
  document.body.classList.toggle("night", theme === "night");
  window.localStorage.setItem("theme", theme);
}

function currentTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "night" ? "night" : "day";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const setTheme = useCallback((next: Theme) => {
    const apply = () => applyTheme(next);
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => void;
    };
    if (doc.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      doc.startViewTransition(apply);
    } else {
      apply();
    }
  }, []);

  const toggle = useCallback(() => {
    setTheme(currentTheme() === "day" ? "night" : "day");
  }, [setTheme]);

  const value = useMemo(() => ({ setTheme, toggle }), [setTheme, toggle]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
