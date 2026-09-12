"use client";

import { FormEvent, useRef, useState } from "react";
import { site } from "@/content/site";
import { useContact } from "@/lib/contact";
import { useFocusTrap } from "@/lib/use-focus-trap";
import { sendContact } from "@/lib/send-contact";

export function ContactDrawer() {
  const { open, setOpen } = useContact();
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const drawerRef = useRef<HTMLElement>(null);

  function close() {
    setOpen(false);
    setSent(false);
    setError(null);
    setPending(false);
  }

  useFocusTrap(open, drawerRef, close);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pending) return;
    setPending(true);
    setError(null);
    const result = await sendContact(new FormData(e.currentTarget));
    setPending(false);
    if (result.ok) setSent(true);
    else setError(result.error);
  }

  return (
    <>
        <div className={`contact-scrim${open ? " open" : ""}`} onClick={close} />
      <aside
        ref={drawerRef}
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
                <input
                  className="cd-honeypot"
                  type="checkbox"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
                <div className="cd-field">
                  <label htmlFor="cd-name">Name</label>
                  <input id="cd-name" name="name" required autoComplete="name" />
                </div>
                <div className="cd-field">
                  <label htmlFor="cd-email">Email</label>
                  <input id="cd-email" name="email" type="email" required autoComplete="email" />
                </div>
                <div className="cd-field">
                  <label htmlFor="cd-msg">Brief</label>
                  <textarea id="cd-msg" name="message" rows={4} required />
                </div>
                <button className="cd-submit" type="submit" disabled={pending}>
                  {pending ? "Cueing…" : "Cue it"}
                </button>
                {error ? (
                  <p className="cd-error" role="alert">
                    {error}
                  </p>
                ) : null}
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
