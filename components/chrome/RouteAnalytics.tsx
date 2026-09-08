"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { contentGroupFor, startActiveTimer, trackEvent } from "@/lib/analytics";

const MIN_ENGAGED_MS = 1_000;

function scrollDepth() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  if (scrollable <= 0) return 1;
  return Math.min(1, Math.max(0, window.scrollY / scrollable));
}

export function RouteAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    const contentGroup = contentGroupFor(pathname);
    // Captured now: by the time we report engagement, the browser URL has
    // already moved on to the next route.
    const pageLocation = window.location.href;
    const pageTitle = document.title;

    trackEvent("page_view", {
      page_location: pageLocation,
      page_title: pageTitle,
      content_group: contentGroup,
    });

    const timer = startActiveTimer();
    let depth = scrollDepth();
    const onScroll = () => {
      depth = Math.max(depth, scrollDepth());
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let reported = 0;
    const flush = () => {
      const total = timer.elapsed();
      const unreported = total - reported;
      if (unreported < MIN_ENGAGED_MS) return;
      reported = total;
      trackEvent("page_engagement", {
        page_location: pageLocation,
        page_title: pageTitle,
        content_group: contentGroup,
        engaged_seconds: Math.round(unreported / 1000),
        scroll_depth: Math.round(depth * 100),
      });
    };

    // Leaving the tab or closing it never runs React cleanup, so report there too.
    const onVisibility = () => {
      if (document.visibilityState === "hidden") flush();
    };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", flush);

    return () => {
      flush();
      timer.stop();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", flush);
    };
  }, [pathname]);

  return null;
}
