import type { Metadata } from "next";
import Link from "next/link";
import { Page, PageHeader } from "@/components/ui/page";
import { degrees } from "@/content/education";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Education",
  description:
    "Master's degree in Intelligent Software Systems and bachelor's degree in Computer Science from the Slovak University of Technology in Bratislava.",
  alternates: { canonical: "/education" },
};

export default function EducationPage() {
  return (
    <Page>
      <PageHeader
        title="Education"
        lead="Computer science and intelligent software systems at the Faculty of Informatics and Information Technologies in Bratislava."
      />
      <ol className="grid gap-12">
        {degrees.map((degree) => (
          <li
            key={degree.field}
            className="grid gap-3 border-t border-line pt-6 md:grid-cols-[11rem_1fr] md:gap-10"
          >
            <p className="font-medium">
              {degree.start} to {degree.end}
            </p>
            <div>
              <h2 className="text-2xl font-semibold">{degree.field}</h2>
              <p className="mt-1 text-lg">{degree.degree}</p>
              <p className="mt-1 text-muted">
                {degree.url ? (
                  <a href={degree.url} className="link">
                    {degree.school}
                  </a>
                ) : (
                  degree.school
                )}
              </p>
              {degree.thesis ? (
                <p className="mt-4 max-w-2xl">
                  <span className="text-muted">Thesis: </span>
                  {degree.thesis.url ? (
                    <Link href={degree.thesis.url} className="link">
                      {degree.thesis.title}
                    </Link>
                  ) : (
                    degree.thesis.title
                  )}
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>

      <section aria-labelledby="languages" className="mt-20">
        <h2 id="languages" className="text-3xl font-semibold">
          Languages
        </h2>
        <dl className="mt-6 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
          {site.languages.map((language) => (
            <div key={language.name}>
              <dt className="font-display text-xl font-semibold">{language.name}</dt>
              <dd className="text-muted">{language.level}</dd>
            </div>
          ))}
        </dl>
      </section>
    </Page>
  );
}
