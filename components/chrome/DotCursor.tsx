"use client";

import { useEffect, useSyncExternalStore } from "react";

function subscribeFinePointer(cb: () => void) {
  const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

export function DotCursor() {
  const ok = useSyncExternalStore(
    subscribeFinePointer,
    () => window.matchMedia("(hover: hover) and (pointer: fine)").matches,
    () => false,
  );

  useEffect(() => {
    if (!ok) return;
    document.documentElement.classList.add("dot-cursor-on");
    const dot = document.querySelector<HTMLElement>(".dot-cursor");
    if (!dot) return;
    const label = dot.querySelector(".dot-label");
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let raf = 0;
    const render = () => {
      raf = 0;
      dot.style.transform = `translate3d(${x}px,${y}px,0)`;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      dot.classList.add("on");
      const target = e.target as HTMLElement | null;
      const overReel = !!target?.closest?.(".recorder");
      const labelled = !overReel ? target?.closest?.("[data-cursor-label]") : null;
      if (label) {
        label.textContent = overReel
          ? "Press play, stranger"
          : labelled?.getAttribute("data-cursor-label") || "";
      }
      dot.classList.toggle("reel", overReel);
      dot.classList.toggle("labelled", !!labelled);
      dot.classList.toggle(
        "hot",
        !overReel &&
          !labelled &&
          !!target?.closest?.("a,button,[role='button'],input,textarea,select,label"),
      );
      if (!raf) raf = requestAnimationFrame(render);
    };
    const down = () => dot.classList.add("down");
    const up = () => dot.classList.remove("down");
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      document.documentElement.classList.remove("dot-cursor-on");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [ok]);

  if (!ok) return null;
  return (
    <div className="dot-cursor" aria-hidden="true">
      <span className="dot-label">Press play, stranger</span>
    </div>
  );
}
