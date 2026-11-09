import { BookOpen, Briefcase, ExternalLink, GraduationCap, MapPin, School } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AnchorHeading } from "@/components/ui/anchor-heading";
import { Page, PageHeader } from "@/components/ui/page";
import { StackList } from "@/components/ui/tech-badge";
import { degrees, secondarySchool, university } from "@/content/education";
import { jobs } from "@/content/experience";
import { pick } from "@/content/types";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { formatDuration, formatMonth } from "@/lib/format";
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
  const tCommon = await getTranslations("common");
  const t = await getTranslations("experience");
  const tEducation = await getTranslations("education");
  const duration = (start: string, end?: string) => formatDuration(start, end, tCommon);

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
        <a
          href="#education"
          className="hover-lift inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 text-sm"
        >
          <GraduationCap aria-hidden size={15} className="text-muted" />
          {tEducation("title")}
        </a>
      </nav>
      <ol>
        {jobs.map((job) => (
          <li key={job.id} className="reveal grid gap-4 pb-16 md:grid-cols-[11rem_1fr] md:gap-10">
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

      <section aria-labelledby="education" className="border-t border-line pt-12">
        <AnchorHeading id="education" label={tCommon("anchor")} className="text-3xl font-semibold">
          {tEducation("title")}
        </AnchorHeading>
        <p className="mt-2 max-w-2xl text-muted">{tEducation("lead")}</p>
        <ol className="mt-8 grid gap-10">
          {degrees.map((degree) => (
            <li
              key={degree.id}
              className="grid gap-3 border-t border-line pt-6 md:grid-cols-[11rem_1fr] md:gap-10"
            >
              <p className="font-medium md:text-right">
                {degree.start} – {degree.end}
              </p>
              <div>
                <AnchorHeading
                  id={degree.id}
                  as="h3"
                  label={tCommon("anchor")}
                  className="flex items-center gap-2 text-2xl font-semibold"
                >
                  <GraduationCap aria-hidden className="size-6 shrink-0 text-accent" />
                  {pick(degree.field, locale)}
                </AnchorHeading>
                <p className="mt-1 text-lg">{pick(degree.degree, locale)}</p>
                <p className="text-muted">
                  <a href={university.url} className="link">
                    {pick(university.name, locale)}
                  </a>
                  , {pick(university.faculty, locale)}
                </p>
                <p className="mt-3 max-w-2xl text-muted">{pick(degree.description, locale)}</p>
                <p className="mt-4 flex max-w-2xl gap-2">
                  <BookOpen aria-hidden className="mt-1 size-4 shrink-0 text-muted" />
                  <span>
                    <span className="text-muted">{tEducation("thesis")}: </span>
                    {degree.thesis.url ? (
                      <Link href={degree.thesis.url} className="link">
                        {pick(degree.thesis.title, locale)}
                      </Link>
                    ) : (
                      pick(degree.thesis.title, locale)
                    )}
                    {degree.thesis.recordUrl ? (
                      <a
                        href={degree.thesis.recordUrl}
                        className="mt-1 flex w-fit items-center gap-1.5 text-sm text-muted hover:text-accent"
                      >
                        <ExternalLink aria-hidden size={14} />
                        <span className="link">{tCommon("thesisRecord")}</span>
                      </a>
                    ) : null}
                  </span>
                </p>
              </div>
            </li>
          ))}
          <li className="grid gap-3 border-t border-line pt-6 md:grid-cols-[11rem_1fr] md:gap-10">
            <p className="font-medium md:text-right">
              {secondarySchool.start} – {secondarySchool.end}
            </p>
            <div>
              <AnchorHeading
                id="secondary-school"
                as="h3"
                label={tCommon("anchor")}
                className="flex items-center gap-2 text-2xl font-semibold"
              >
                <School aria-hidden className="size-6 shrink-0 text-accent" />
                {pick(secondarySchool.name, locale)}
              </AnchorHeading>
              <p className="mt-1 text-lg">
                {pick(secondarySchool.type, locale)}, {secondarySchool.place}
              </p>
            </div>
          </li>
        </ol>
      </section>
    </Page>
  );
}
