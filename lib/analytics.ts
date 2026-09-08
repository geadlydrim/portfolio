export const GA_MEASUREMENT_ID = "G-LCFE000RDX";

// Runs inline in <head> so window.gtag exists before hydration effects fire.
// Page views are sent manually by RouteAnalytics, hence send_page_view:false.
export const GA_SCRIPT = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}',{send_page_view:false});`;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

type Params = Record<string, string | number | boolean | undefined>;

export function trackEvent(name: string, params?: Params) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, params);
}

export type ContentGroup = "home" | "about" | "playground" | "case-study" | "other";

export function contentGroupFor(pathname: string): ContentGroup {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/work/")) return "case-study";
  if (pathname.startsWith("/playground")) return "playground";
  if (pathname.startsWith("/about")) return "about";
  return "other";
}

// Pause the clock once a visitor has been inactive this long, so a tab left
// open on a case study doesn't read as an hour of attention.
const IDLE_MS = 90_000;
const REARM_MS = 5_000;

export type ActiveTimer = {
  /** Active milliseconds so far. */
  elapsed: () => number;
  /** Detach listeners and return the final total. */
  stop: () => number;
};

/**
 * Accumulates time the visitor is plausibly paying attention: the tab is
 * visible and they have interacted within IDLE_MS.
 */
export function startActiveTimer(): ActiveTimer {
  let accumulated = 0;
  let startedAt: number | null = null;
  let idleTimer = 0;
  let armedAt = 0;

  const pause = () => {
    if (startedAt === null) return;
    accumulated += Date.now() - startedAt;
    startedAt = null;
  };

  const resume = () => {
    if (startedAt !== null || document.visibilityState !== "visible") return;
    startedAt = Date.now();
  };

  const armIdle = () => {
    const now = Date.now();
    if (now - armedAt < REARM_MS) return;
    armedAt = now;
    window.clearTimeout(idleTimer);
    idleTimer = window.setTimeout(pause, IDLE_MS);
  };

  const onInteract = () => {
    resume();
    armIdle();
  };

  const onVisibility = () => {
    if (document.visibilityState === "visible") {
      armedAt = 0;
      onInteract();
    } else {
      pause();
    }
  };

  resume();
  armedAt = Date.now();
  idleTimer = window.setTimeout(pause, IDLE_MS);

  window.addEventListener("scroll", onInteract, { passive: true });
  window.addEventListener("pointermove", onInteract, { passive: true });
  window.addEventListener("pointerdown", onInteract);
  window.addEventListener("keydown", onInteract);
  document.addEventListener("visibilitychange", onVisibility);

  return {
    elapsed: () => accumulated + (startedAt === null ? 0 : Date.now() - startedAt),
    stop() {
      pause();
      window.clearTimeout(idleTimer);
      window.removeEventListener("scroll", onInteract);
      window.removeEventListener("pointermove", onInteract);
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("keydown", onInteract);
      document.removeEventListener("visibilitychange", onVisibility);
      return accumulated;
    },
  };
}
