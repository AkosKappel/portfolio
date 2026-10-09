import { Briefcase, ExternalLink, MapPin } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
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
      <ol>
        {jobs.map((job) => (
          <li key={job.start} className="grid gap-4 pb-16 md:grid-cols-[11rem_1fr] md:gap-10">
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
              <h2 className="text-2xl font-semibold sm:text-3xl">{job.role}</h2>
              <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="inline-flex items-center gap-1.5 text-lg">
                  <Briefcase aria-hidden size={18} className="text-muted" />
                  {job.company}
                </span>
                <span className="inline-flex items-center gap-1.5 text-muted">
                  <MapPin aria-hidden size={16} />
                  {pick(job.location, locale)}
                </span>
              </p>
              <p className="mt-3 max-w-2xl text-muted">{pick(job.summary, locale)}</p>
              <div className="mt-8 grid gap-10">
                {job.items.map((item) => (
                  <section key={item.name} aria-label={item.name}>
                    <h3 className="text-xl font-semibold">
                      {item.url ? (
                        <a
                          href={item.url}
                          className="inline-flex items-center gap-1.5 hover:text-accent"
                        >
                          {item.name}
                          <ExternalLink aria-hidden size={15} className="text-muted" />
                        </a>
                      ) : (
                        item.name
                      )}
                    </h3>
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
