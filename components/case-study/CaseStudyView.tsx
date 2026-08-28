import Link from "next/link";
import type { Band, CaseStudy } from "@/content/case-studies";
import { caseStudies } from "@/content/case-studies";

export function CaseStudyView({ study }: { study: CaseStudy }) {
  return (
    <article className="cs-page" style={{ ["--cs-accent" as string]: study.accent }}>
      {study.bands.map((band, i) => (
        <BandBlock key={i} band={band} repo={study.repo} />
      ))}
    </article>
  );
}

function BandBlock({ band, repo }: { band: Band; repo?: string }) {
  if (band.type === "hero") {
    return (
      <section className={`cs-band ${band.tone} cs-hero`} data-nav={band.tone === "dark" ? "dark" : "light"}>
        <div className="cs-wrap cs-hero-grid">
          <div>
            {band.kicker ? <p className="cs-kicker">{band.kicker}</p> : null}
            <h1 className="cs-title">
              {band.title}
              {band.italic ? (
                <>
                  {" "}
                  <em>{band.italic}</em>
                </>
              ) : null}
            </h1>
            <p className="cs-hero-body">{band.body}</p>
            <div className="cs-meta">
              <span>Role · {band.role}</span>
              <span>Client · {band.client}</span>
              <span>{band.year}</span>
              {repo ? (
                <a href={repo} target="_blank" rel="noopener noreferrer">
                  Repo · GitHub
                </a>
              ) : null}
            </div>
          </div>
          <div className="cs-hero-mock">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={band.image} alt="" />
          </div>
        </div>
      </section>
    );
  }

  if (band.type === "panel") {
    return (
      <section className={`cs-band ${band.tone} cs-panel`} data-nav={band.tone === "dark" ? "dark" : "light"}>
        <div className="cs-wrap cs-numbered">
          <div className="cs-rail">
            {band.number ? <div className="cs-num">{band.number}</div> : null}
            {band.eyebrow ? <div className="cs-eyebrow">{band.eyebrow}</div> : null}
          </div>
          <div>
            <h2 className="cs-h">
              {band.heading} {band.italic ? <em>{band.italic}</em> : null}
            </h2>
            <p className="cs-body">{band.body}</p>
            {band.image ? (
              <div className="cs-hero-mock" style={{ marginTop: 32 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={band.image} alt="" />
              </div>
            ) : null}
            {band.note ? (
              <div className="cs-note">
                <strong>{band.note.label}</strong>
                <ul>
                  {band.note.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    );
  }

  if (band.type === "quote") {
    return (
      <section className={`cs-band ${band.tone} cs-quote`} data-nav={band.tone === "dark" ? "dark" : "light"}>
        <div className="cs-wrap">
          <p>“{band.quote}”</p>
          {band.attribution ? <p className="cs-eyebrow">{band.attribution}</p> : null}
        </div>
      </section>
    );
  }

  if (band.type === "gallery") {
    return (
      <section className={`cs-band ${band.tone}`} data-nav={band.tone === "dark" ? "dark" : "light"}>
        <div className="cs-wrap">
          {band.heading ? <h2 className="cs-h">{band.heading}</h2> : null}
          <div className="cs-gallery">
            {band.images.map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={src} src={src} alt="" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (band.type === "logoband") {
    return (
      <section className={`cs-band ${band.tone}`} data-nav={band.tone === "dark" ? "dark" : "light"}>
        <div className="cs-wrap">
          <p className="cs-eyebrow" style={{ textAlign: "center" }}>
            {band.label}
          </p>
          <div className="cs-logoband">
            {band.logos.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (band.type === "closing") {
    return (
      <section className={`cs-band ${band.tone} cs-closing`} data-nav={band.tone === "dark" ? "dark" : "light"}>
        <div className="cs-wrap">
          <h2 className="cs-h">
            {band.heading} {band.italic ? <em>{band.italic}</em> : null}
          </h2>
          <p className="cs-body">{band.body}</p>
        </div>
      </section>
    );
  }

  const next = caseStudies[band.slug];
  return (
    <section className="cs-band dark cs-readnext" data-nav="dark">
      <div className="cs-wrap">
        <p className="cs-eyebrow">Read next</p>
        <Link href={`/work/${band.slug}`}>
          {next?.title ?? band.slug} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
