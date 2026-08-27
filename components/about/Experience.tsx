import { experience } from "@/content/experience";

export function Experience() {
  return (
    <section className="about-exp" aria-label="Professional experience" data-nav="light">
      {experience.map((job) => (
        <article className="exp-item" key={job.company}>
          <div className="exp-years">{job.years}</div>
          <div>
            <h2 className="exp-title">
              {job.title} <span className="exp-company">· {job.company}</span>
            </h2>
            <p>{job.summary}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
