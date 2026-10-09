import { Briefcase, ExternalLink, MapPin } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AnchorHeading } from "@/components/ui/anchor-heading";
import { Page, PageHeader } from "@/components/ui/page";
import { StackList } from "@/components/ui/tech-badge";
import { jobs } from "@/content/experience";
import { pick } from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { formatMonth, monthsBetween } from "@/lib/format";
import { alternates } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/experience">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "experience" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: alternates(locale, "/experience"),
  };
}

export default async function ExperiencePage({ params }: PageProps<"/[locale]/experience">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("experience");
  const tCommon = await getTranslations("common");
  const currentMonth = new Date().toISOString().slice(0, 7);

  const duration = (start: string, end?: string) => {
    const months = monthsBetween(start, end ?? currentMonth);
    const years = Math.floor(months / 12);
    const rest = months % 12;
    return [
      years ? tCommon("years", { count: years }) : "",
      rest ? tCommon("months", { count: rest }) : "",
    ]
      .filter(Boolean)
      .join(" ");
  };

  return (
    <Page>
      <PageHeader title={t("title")} lead={t("lead")} />
      <nav aria-label={t("title")} className="-mt-4 mb-12 flex flex-wrap gap-2">
        {jobs.map((job) => (
          <a
            key={job.id}
            href={`#${job.id}`}
            className="hover-lift inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 text-sm"
          >
            <Briefcase aria-hidden size={15} className="text-muted" />
            {job.company}
          </a>
        ))}
      </nav>
      <ol>
        {jobs.map((job) => (
          <li key={job.id} className="grid gap-4 pb-16 md:grid-cols-[11rem_1fr] md:gap-10">
            <div className="md:pt-1 md:text-right">
              <p className="font-medium">
                {tCommon("period", {
                  start: formatMonth(job.start, locale),
                  end: job.end ? formatMonth(job.end, locale) : tCommon("present"),
                })}
              </p>
              <p className="text-sm text-muted">{duration(job.start, job.end)}</p>
            </div>
            {/* The time axis: a line through every job with a marker at its start. */}
            <div className="relative border-l border-line pl-6 md:pl-10">
              <span
                aria-hidden
                className={`absolute top-2 -left-[5px] size-[9px] rounded-full ring-4 ring-paper ${job.end ? "bg-muted" : "bg-accent"}`}
              />
              <AnchorHeading
                id={job.id}
                label={tCommon("anchor")}
                className="text-2xl font-semibold sm:text-3xl"
              >
                {job.company}
              </AnchorHeading>
              <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="text-lg font-medium">{job.role}</span>
                <span className="inline-flex items-center gap-1.5 text-muted">
                  <MapPin aria-hidden size={16} />
                  {pick(job.location, locale)}
                </span>
                {job.companyNote ? (
                  <span className="text-sm text-muted">({pick(job.companyNote, locale)})</span>
                ) : null}
              </p>
              <p className="mt-3 max-w-2xl text-muted">{pick(job.summary, locale)}</p>
              <div className="mt-8 grid gap-10">
                {job.items.map((item) => (
                  <section key={item.id} aria-labelledby={item.id}>
                    <AnchorHeading
                      id={item.id}
                      as="h3"
                      label={tCommon("anchor")}
                      className="text-xl font-semibold"
                    >
                      {item.url ? (
                        <a
                          href={item.url}
                          className="inline-flex items-center gap-1.5 underline-offset-4 hover:text-accent hover:underline"
                        >
                          {pick(item.name, locale)}
                          <ExternalLink aria-hidden size={15} className="text-muted" />
                        </a>
                      ) : (
                        pick(item.name, locale)
                      )}
                    </AnchorHeading>
                    <p className="text-sm text-muted">{pick(item.context, locale)}</p>
                    <ul className="mt-3 max-w-2xl list-disc space-y-1.5 pl-5 marker:text-accent">
                      {item.highlights.map((highlight) => (
                        <li key={highlight.en}>{pick(highlight, locale)}</li>
                      ))}
                    </ul>
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
