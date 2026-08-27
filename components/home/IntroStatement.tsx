"use client";

import { site } from "@/content/site";
import { useReveal } from "@/lib/use-reveal";

export function IntroStatement() {
  const ref = useReveal<HTMLParagraphElement>();
  return (
    <p className="intro-copy reveal" ref={ref}>
      {site.intro.lead}
      <span className="bold">{site.intro.body}</span>
    </p>
  );
}
