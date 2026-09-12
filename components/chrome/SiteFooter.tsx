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
      <div className="ft-inner">
        <p className="ft-sub reveal is-in">{site.footer.sub}</p>
        <h2 className="ft-head">
          <button className="ft-head-btn" type="button" onClick={() => setOpen(true)}>
            <span className="ft-head-line">{site.footer.headline}</span>
            <span className="ft-head-cue">{site.footer.subtitle}</span>
          </button>
        </h2>
        <a className="ft-email" href={`mailto:${site.email}`}>
          {site.email}
        </a>
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

