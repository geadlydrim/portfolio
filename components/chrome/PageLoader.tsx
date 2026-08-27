"use client";

import { useEffect, useState } from "react";

const LINES = ["spooling the tape", "calibrating heads", "cueing side A"];

export function PageLoader() {
  const [done, setDone] = useState(false);
  const [line, setLine] = useState(0);

  useEffect(() => {
    const rotate = window.setInterval(() => setLine((n) => (n + 1) % LINES.length), 700);
    const hide = window.setTimeout(() => setDone(true), 1400);
    return () => {
      window.clearInterval(rotate);
      window.clearTimeout(hide);
    };
  }, []);

  return (
    <div id="page-loader" className={done ? "done" : undefined} role="status" aria-live="polite" aria-label="Loading">
      <div className="pl-stage">
        <span className="pl-dots" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <i key={i} />
          ))}
        </span>
        <span className="pl-pac" aria-hidden="true">
          <span className="pl-lip pl-top" />
          <span className="pl-lip pl-bottom" />
        </span>
        <p className="pl-line">{LINES[line]}</p>
      </div>
    </div>
  );
}
