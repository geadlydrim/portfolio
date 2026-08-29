"use client";

import { site } from "@/content/site";
import { useContact } from "@/lib/contact";
import { useReveal } from "@/lib/use-reveal";

export function SiteFooter() {
  const { setOpen } = useContact();
  const ref = useReveal<HTMLElement>();

  return (
    <footer className="footer" id="contact" ref={ref} data-nav="light">
      <div className="ft-wavy" aria-hidden="true" />
      <div className="ft-land" aria-hidden="true" />
      <div className="plane-fly" aria-hidden="true">
        <PaperPlane />
      </div>
      <div className="ft-inner">
        <p className="ft-sub reveal is-in">{site.footer.sub}</p>
        <h2 className="ft-head">
          <button className="ft-head-btn" type="button" onClick={() => setOpen(true)}>
            <span className="ft-head-line">{site.footer.headline}</span>
            <span className="ft-head-cue">{site.footer.subtitle}</span>
          </button>
        </h2>
      </div>
      <p className="ft-credit">
        {site.footer.credit} · {site.location}
      </p>
      <nav className="ft-social" aria-label="Social links">
        {site.socials.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
            {s.label}
          </a>
        ))}
      </nav>
    </footer>
  );
}

function PaperPlane() {
  return (
    <svg className="plane-sprite" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M4 32 L60 8 L28 36 L24 56 L36 38 L60 8" fill="var(--trail-stroke)" />
    </svg>
  );
}
