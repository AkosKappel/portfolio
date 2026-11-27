import {
  ArrowLeft,
  ArrowRight,
  Blocks,
  ExternalLink,
  Gauge,
  Images,
  Info,
  Lightbulb,
  ListChecks,
} from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Architecture, Decisions, DetailList, Fact } from "@/components/projects/detail-sections";
import { Gallery } from "@/components/projects/gallery";
import { AnchorHeading } from "@/components/ui/anchor-heading";
import { ReadingProgress } from "@/components/ui/back-to-top";
import { JsonLd } from "@/components/ui/json-ld";
import { Page } from "@/components/ui/page";
import { StackList } from "@/components/ui/tech-badge";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { type ModulePart, pick } from "@/content/types";
import { Link } from "@/i18n/navigation";
import { type Locale, routing } from "@/i18n/routing";
import { absoluteUrl, alternates } from "@/lib/metadata";
import { breadcrumbs } from "@/lib/structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => caseStudies.map(({ id }) => ({ locale, slug: id })));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/experience/[slug]">): Promise<Metadata> {
  const { locale, slug } = (await params) as { locale: Locale; slug: string };
  const found = getCaseStudy(slug);
  if (!found) return {};
  return {
    title: pick(found.item.name, locale),
    description: pick(found.study.summary, locale),
    alternates: alternates(locale, `/experience/${slug}`),
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/[locale]/experience/[slug]">) {
  const { locale, slug } = (await params) as { locale: Locale; slug: string };
  setRequestLocale(locale);
  const found = getCaseStudy(slug);
  if (!found) notFound();
  const { study, job, item } = found;
  const tCommon = await getTranslations("common");
  const tNav = await getTranslations("nav");
  const tProjects = await getTranslations("projects");
  const t = await getTranslations("experience");
  const name = pick(item.name, locale);
  const number = new Intl.NumberFormat(locale);
  const index = caseStudies.indexOf(study);
  const neighbour = (offset: number) => {
    const other = caseStudies[index + offset];
    const found = other && getCaseStudy(other.id);
    return found ? { id: other.id, name: pick(found.item.name, locale) } : undefined;
  };
  const previous = neighbour(-1);
  const next = neighbour(1);
  const slowest = Math.max(...(study.measurements?.rows.map((row) => row.ms) ?? [0]));

  return (
    <Page>
      <ReadingProgress />
      <JsonLd
        data={breadcrumbs([
          { name: tNav("home"), url: absoluteUrl(locale, "/") },
          { name: tNav("experience"), url: absoluteUrl(locale, "/experience") },
          { name, url: absoluteUrl(locale, `/experience/${slug}`) },
        ])}
      />
      <nav aria-label="Breadcrumb" className="pt-10 print:hidden">
        <Link
          href={`/experience#${slug}`}
          className="inline-flex items-center gap-1.5 text-muted hover:text-ink"
        >
          <ArrowLeft aria-hidden size={16} />
          {t("back")}
        </Link>
      </nav>

      <article>
        <header className="grid gap-6 pt-8 pb-10 lg:grid-cols-[2fr_1fr] lg:items-end">
          <div>
            <h1 className="text-4xl font-semibold sm:text-6xl">{name}</h1>
            <p className="mt-5 max-w-2xl text-lg text-muted sm:text-xl">
              {pick(study.summary, locale)}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2 text-sm">
              {study.facts.map((fact) => (
                <li
                  key={fact.en}
                  className="rounded-full bg-accent-soft px-3 py-1 font-medium text-ink"
                >
                  {pick(fact, locale)}
                </li>
              ))}
            </ul>
          </div>
          {item.url ? (
            <div className="flex flex-wrap gap-3 lg:justify-end print:hidden">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 font-medium transition-colors hover:border-ink"
              >
                <ExternalLink aria-hidden size={18} />
                {tCommon("officialWebsite")}
              </a>
            </div>
          ) : null}
        </header>

        <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
          <div className="grid max-w-2xl gap-12">
            <section aria-labelledby="about">
              <AnchorHeading
                id="about"
                label={tCommon("anchor")}
                className="flex items-center gap-2 text-2xl font-semibold"
              >
                <Info aria-hidden className="size-5 shrink-0 text-accent" />
                {tProjects("about")}
              </AnchorHeading>
              <div className="mt-4 space-y-4 text-lg">
                {study.description.map((paragraph) => (
                  <p key={paragraph.en}>{pick(paragraph, locale)}</p>
                ))}
              </div>
            </section>
            {study.modules?.length ? (
              <section aria-labelledby="modules">
                <AnchorHeading
                  id="modules"
                  label={tCommon("anchor")}
                  className="flex items-center gap-2 text-2xl font-semibold"
                >
                  <Blocks aria-hidden className="size-5 shrink-0 text-accent" />
                  {t("modules")}
                </AnchorHeading>
                <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {study.modules.map((module) => (
                    <li
                      key={module.name.en}
                      className={`rounded-xl border p-3 ${moduleStyle[module.part]}`}
                    >
                      <span className="block font-semibold">{pick(module.name, locale)}</span>
                      <span className="text-sm text-muted">{t(`parts.${module.part}`)}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
            <DetailList
              id="contributions"
              title={t("contributions")}
              items={study.contributions}
              locale={locale}
              Icon={ListChecks}
              anchor={tCommon("anchor")}
            />
            <Architecture
              title={tProjects("architecture")}
              nodes={study.architecture}
              locale={locale}
              anchor={tCommon("anchor")}
            />
            {study.measurements ? (
              <section aria-labelledby="measured">
                <AnchorHeading
                  id="measured"
                  label={tCommon("anchor")}
                  className="flex items-center gap-2 text-2xl font-semibold"
                >
                  <Gauge aria-hidden className="size-5 shrink-0 text-accent" />
                  {t("measured")}
                </AnchorHeading>
                <p className="mt-4 text-lg">{pick(study.measurements.lead, locale)}</p>
                <ul className="mt-5 grid gap-4">
                  {study.measurements.rows.map((row) => (
                    <li key={row.label.en}>
                      <p className="flex flex-wrap justify-between gap-x-4">
                        <span className="font-medium">{pick(row.label, locale)}</span>
                        <span className="text-muted tabular-nums">
                          {number.format(row.ms)} ms · {t("queries", { count: row.queries })}
                        </span>
                      </p>
                      <div aria-hidden className="mt-1.5 h-2.5 rounded-full bg-line">
                        <div
                          className="h-full rounded-full bg-accent"
                          style={{ width: `${(row.ms / slowest) * 100}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-muted">{pick(study.measurements.note, locale)}</p>
              </section>
            ) : null}
            <Decisions
              title={tProjects("decisions")}
              items={study.decisions}
              locale={locale}
              anchor={tCommon("anchor")}
            />
            <DetailList
              id="lessons"
              title={tProjects("lessons")}
              items={study.lessons}
              locale={locale}
              Icon={Lightbulb}
              anchor={tCommon("anchor")}
            />
          </div>
          <dl className="grid content-start gap-5 border-t border-line pt-5 lg:sticky lg:top-24 lg:self-start lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
            <Fact label={t("company")}>{job.company}</Fact>
            <Fact label={t("role")}>{pick(item.role, locale)}</Fact>
            {item.team ? <Fact label={t("teamLabel")}>{item.team}</Fact> : null}
            <Fact label={tProjects("stack")}>
              <StackList items={item.stack} className="mt-1" />
            </Fact>
          </dl>
        </div>
        {study.gallery?.length ? (
          <section aria-labelledby="gallery" className="mt-16">
            <AnchorHeading
              id="gallery"
              label={tCommon("anchor")}
              className="flex items-center gap-2 text-2xl font-semibold"
            >
              <Images aria-hidden className="size-5 shrink-0 text-accent" />
              {tProjects("gallery")}
            </AnchorHeading>
            <Gallery
              figures={study.gallery.map((figure) => ({
                ...figure,
                alt: pick(figure.alt, locale),
                caption: pick(figure.caption, locale),
              }))}
              labels={{
                close: tProjects("lightbox.close"),
                previous: tProjects("lightbox.previous"),
                next: tProjects("lightbox.next"),
                zoomIn: tProjects("lightbox.zoomIn"),
                zoomOut: tProjects("lightbox.zoomOut"),
                counter: tProjects.raw("lightbox.counter"),
              }}
            />
          </section>
        ) : null}
      </article>

      <nav
        aria-label={t("more")}
        className="mt-20 grid gap-4 border-t border-line pt-8 sm:grid-cols-2 print:hidden"
      >
        {previous ? (
          <Link href={`/experience/${previous.id}`} className="group">
            <span className="inline-flex items-center gap-1 text-sm text-muted">
              <ArrowLeft aria-hidden size={14} />
              {t("previous")}
            </span>
            <span className="block font-display text-2xl font-semibold group-hover:text-accent">
              {previous.name}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/experience/${next.id}`} className="group sm:text-right">
            <span className="inline-flex items-center gap-1 text-sm text-muted">
              {t("next")}
              <ArrowRight aria-hidden size={14} />
            </span>
            <span className="block font-display text-2xl font-semibold group-hover:text-accent">
              {next.name}
            </span>
          </Link>
        ) : null}
      </nav>
    </Page>
  );
}

/** The modules I started or work in most stand out; the ones I barely touched fade back. */
const moduleStyle: Record<ModulePart, string> = {
  started: "border-accent bg-accent-soft",
  main: "border-accent bg-accent-soft",
  features: "border-line bg-surface",
  small: "border-dashed border-line",
};
