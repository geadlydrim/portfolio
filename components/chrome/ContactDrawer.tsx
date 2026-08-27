"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { useContact } from "@/lib/contact";

export function ContactDrawer() {
  const { open, setOpen } = useContact();
  const [sent, setSent] = useState(false);
  const first = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => first.current?.focus(), 80);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setSent(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  function close() {
    setOpen(false);
    setSent(false);
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
        <div className={`contact-scrim${open ? " open" : ""}`} onClick={close} />
      <aside
        className={`contact-drawer${open ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cd-title"
        aria-hidden={!open}
      >
        <button className="cd-close" type="button" aria-label="Close contact panel" onClick={close} />
        {sent ? (
          <div className="cd-success">
            <Daisy />
            <h3>{site.contact.successTitle}</h3>
            <p>{site.contact.successBody}</p>
          </div>
        ) : (
          <>
            <div className="cd-body">
              <p className="cd-eyebrow">
                <span className="cd-dot" aria-hidden="true" />
                {site.contact.eyebrow}
              </p>
              <h2 className="cd-title" id="cd-title">
                {site.contact.title}
              </h2>
              <p className="cd-intro">{site.contact.intro}</p>
              <form onSubmit={onSubmit}>
                <div className="cd-field">
                  <label htmlFor="cd-name">Name</label>
                  <input ref={first} id="cd-name" name="name" required autoComplete="name" />
                </div>
                <div className="cd-field">
                  <label htmlFor="cd-email">Email</label>
                  <input id="cd-email" name="email" type="email" required autoComplete="email" />
                </div>
                <div className="cd-field">
                  <label htmlFor="cd-msg">Brief</label>
                  <textarea id="cd-msg" name="message" rows={4} required />
                </div>
                <button className="cd-submit" type="submit">
                  Cue it
                </button>
              </form>
            </div>
            <div className="cd-alt">
              <p className="cd-eyebrow">Or write directly</p>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

function Daisy() {
  const petals = Array.from({ length: 12 }, (_, i) => (
    <g key={i} transform={`translate(48 36) rotate(${i * 30})`}>
      <ellipse cx="0" cy="-19" rx="7.5" ry="15.5" fill="#faf5e6" stroke="#e2d5b0" strokeWidth="1" />
    </g>
  ));
  return (
    <svg className="cd-daisy" viewBox="0 0 96 152" width="76" height="152" aria-hidden="true">
      <path d="M48 150 C 54 112 42 78 48 46" stroke="#b06a4d" strokeWidth="4.2" fill="none" strokeLinecap="round" />
      {petals}
      <circle cx="48" cy="36" r="9.5" fill="#e89a1c" />
    </svg>
  );
}
