"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function RouteCurtain() {
  const pathname = usePathname();
  const first = useRef(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const el = ref.current;
    if (!el) return;
    el.classList.add("closing");
    const t = window.setTimeout(() => el.classList.remove("closing"), 700);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return (
    <div id="route-curtain" ref={ref} aria-hidden="true">
      <div className="rc-scrim" />
      <div className="rc-pane rc-pane--top" />
      <div className="rc-pane rc-pane--bottom" />
    </div>
  );
}
