import type { Metadata } from "next";
import { Page, PageHeader, StackList } from "@/components/ui/page";
import { jobs } from "@/content/experience";
import { formatDuration, formatPeriod, monthsBetween } from "@/lib/format";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Full-stack work at IGT Systems, Švarba and SoftPoint: web, mobile and backend products, performance work and data pipelines.",
  alternates: { canonical: "/experience" },
};

function currentMonth() {
  return new Date().toISOString().slice(0, 7);
}

export default function ExperiencePage() {
  return (
    <Page>
      <PageHeader
        title="Experience"
        lead="Three companies since 2023, from data pipelines to mobile apps. Most of my work today is React, Kotlin and Elixir."
      />
      <ol className="relative">
        {jobs.map((job) => (
          <li
            key={`${job.company}-${job.start}`}
            className="relative grid gap-4 pb-16 md:grid-cols-[11rem_1fr] md:gap-10"
          >
            <div className="md:pt-1 md:text-right">
              <p className="font-medium">{formatPeriod(job.start, job.end)}</p>
              <p className="text-sm text-muted">
                {formatDuration(monthsBetween(job.start, job.end ?? currentMonth()))}
              </p>
            </div>
            {/* The time axis: a line through every job with a marker at its start. */}
            <div className="relative border-l border-line pl-6 md:pl-10">
              <span
                aria-hidden
                className={`absolute top-2 -left-[5px] size-[9px] rounded-full ring-4 ring-paper ${job.end ? "bg-muted" : "bg-clean"}`}
              />
              <h2 className="text-2xl font-semibold sm:text-3xl">{job.role}</h2>
              <p className="mt-1 text-lg">
                {job.company} <span className="text-muted">in {job.location}</span>
              </p>
              <p className="mt-3 max-w-2xl text-muted">{job.summary}</p>
              <div className="mt-8 grid gap-10">
                {job.items.map((item) => (
                  <section key={item.name} aria-label={item.name}>
                    <h3 className="text-xl font-semibold">
                      {item.url ? (
                        <a href={item.url} className="link">
                          {item.name}
                        </a>
                      ) : (
                        item.name
                      )}
                    </h3>
                    <p className="text-sm text-muted">{item.context}</p>
                    <p className="mt-2 max-w-2xl">{item.summary}</p>
                    {item.highlights.length ? (
                      <ul className="mt-3 max-w-2xl list-disc space-y-1.5 pl-5 text-muted marker:text-clean">
                        {item.highlights.map((highlight) => (
                          <li key={highlight}>{highlight}</li>
                        ))}
                      </ul>
                    ) : null}
                    <StackList items={item.stack} className="mt-4" />
                  </section>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Page>
  );
}
