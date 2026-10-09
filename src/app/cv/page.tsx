import type { Metadata } from "next";
import Link from "next/link";
import { CvMenu } from "@/components/ui/cv-menu";
import { Page } from "@/components/ui/page";
import { degrees } from "@/content/education";
import { jobs } from "@/content/experience";
import { getProject } from "@/content/projects";
import { site } from "@/content/site";
import { skillGroups } from "@/content/skills";
import { formatPeriod } from "@/lib/format";

export const metadata: Metadata = {
  title: "CV",
  description: `CV of ${site.name}, ${site.headline}, with downloadable PDFs in English and Slovak.`,
  alternates: { canonical: "/cv" },
};

const cvProjects = ["modern-fashion-store", "glaucoma-segmentation", "smarttech-e-shop"]
  .map(getProject)
  .filter((project) => project !== undefined);

export default function CvPage() {
  return (
    <Page className="print:max-w-none print:px-0">
      <div className="flex flex-wrap items-center justify-between gap-4 pt-10 print:hidden">
        <p className="text-muted">The same content as the PDF, readable in the browser.</p>
        <CvMenu />
      </div>

      <article className="mt-8 rounded-2xl border border-line bg-surface p-6 sm:p-12 print:border-0 print:p-0">
        <header className="border-b border-line pb-8">
          <h1 className="text-4xl font-semibold sm:text-5xl">
            {site.title} {site.name}
          </h1>
          <p className="mt-2 font-display text-2xl text-clean">{site.headline}</p>
          <p className="mt-4 text-muted">
            {site.location},{" "}
            <a href={`mailto:${site.email}`} className="link">
              {site.email}
            </a>
          </p>
          <div className="mt-6 max-w-3xl space-y-3">
            <p>{site.intro}</p>
            {site.summary.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </header>

        <CvSection title="Experience">
          {jobs.map((job) => (
            <div key={job.company} className="break-inside-avoid-page">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6">
                <h3 className="text-xl font-semibold">
                  {job.role}, {job.company}
                </h3>
                <p className="text-sm text-muted">
                  {formatPeriod(job.start, job.end)}, {job.location}
                </p>
              </div>
              <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-clean">
                {job.items.map((item) => (
                  <li key={item.name}>
                    <strong className="font-semibold">{item.name}</strong> ({item.context}):{" "}
                    {item.summary}
                    {item.highlights.length ? (
                      <ul className="mt-1 list-[circle] space-y-1 pl-5 text-muted">
                        {item.highlights.map((highlight) => (
                          <li key={highlight}>{highlight}</li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CvSection>

        <CvSection title="Skills">
          <dl className="grid gap-3">
            {skillGroups.map((group) => (
              <div key={group.name} className="grid gap-1 sm:grid-cols-[10rem_1fr]">
                <dt className="font-semibold">{group.name}</dt>
                <dd className="text-muted">{group.skills.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </CvSection>

        <CvSection title="Selected projects">
          {cvProjects.map((project) => (
            <div key={project.slug}>
              <h3 className="text-lg font-semibold">
                <Link href={`/projects/${project.slug}`} className="link">
                  {project.title}
                </Link>
              </h3>
              <p className="text-muted">{project.summary}</p>
            </div>
          ))}
        </CvSection>

        <CvSection title="Education">
          {degrees
            .filter((degree) => degree.thesis)
            .map((degree) => (
              <div key={degree.field}>
                <h3 className="text-lg font-semibold">
                  {degree.degree}, {degree.field}
                </h3>
                <p className="text-sm text-muted">
                  {degree.start} to {degree.end}, {degree.school}
                </p>
                <p className="mt-1">Thesis: {degree.thesis?.title}</p>
              </div>
            ))}
        </CvSection>

        <CvSection title="Languages and interests">
          <p>
            {site.languages.map((language) => `${language.name} (${language.level})`).join(", ")}
          </p>
          <p className="text-muted">{site.interests.join(", ")}</p>
        </CvSection>
      </article>
    </Page>
  );
}

function CvSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 grid gap-6 lg:grid-cols-[12rem_1fr]">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="grid gap-6">{children}</div>
    </section>
  );
}
