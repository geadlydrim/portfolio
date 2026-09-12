import { CaseStudyView } from "@/components/case-study/CaseStudyView";
import { allCaseStudySlugs, getCaseStudy } from "@/content/case-studies";
import { site } from "@/content/site";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return allCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Work" };
  return {
    title: study.title,
    description: `${study.title} — case study by ${site.name}`,
    openGraph: { title: study.title, description: `${study.title} — case study by ${site.name}` },
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  return (
    <main id="main" tabIndex={-1}>
      <CaseStudyView study={study} />
    </main>
  );
}
