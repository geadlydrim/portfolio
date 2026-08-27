"use client";

import { useState } from "react";
import { testimonials } from "@/content/testimonials";

export function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i];
  const prev = () => setI((n) => (n - 1 + testimonials.length) % testimonials.length);
  const next = () => setI((n) => (n + 1) % testimonials.length);

  return (
    <section className="testimonials" id="testimonials" data-nav="light">
      <div className="t-willow" aria-hidden="true" />
      <div className="t-head">
        <p className="t-eyebrow">In their words</p>
        <h2 className="t-title">Kind notes from collaborators</h2>
      </div>
      <div className="t-stage">
        <article className="t-card" key={t.name}>
          <p className="t-quote">“{t.quote}”</p>
          <div className="t-who">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={t.portrait} alt="" />
            <div className="t-meta">
              <strong>{t.name}</strong>
              <div>
                {t.role}, {t.company}
              </div>
            </div>
          </div>
        </article>
        <div className="t-nav">
          <button className="t-arrow" type="button" onClick={prev} aria-label="Previous testimonial">
            ←
          </button>
          <span>
            {String(i + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </span>
          <button className="t-arrow" type="button" onClick={next} aria-label="Next testimonial">
            →
          </button>
        </div>
      </div>
    </section>
  );
}
