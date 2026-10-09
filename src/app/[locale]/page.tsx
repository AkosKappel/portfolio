import { ArrowRight, FolderOpen, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProjectCard } from "@/components/projects/project-card";
import { CvMenu } from "@/components/ui/cv-menu";
import { Page } from "@/components/ui/page";
import { StackList } from "@/components/ui/tech-badge";
import { jobs } from "@/content/experience";
import { featuredProjects } from "@/content/projects";
import { site } from "@/content/site";
import { pick } from "@/content/types";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { formatMonth } from "@/lib/format";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tCommon = await getTranslations("common");
  const currentJob = jobs[0];

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.headline,
    email: `mailto:${site.email}`,
    url: site.url,
    image: new URL("/images/profile.webp", site.url).toString(),
    address: { "@type": "PostalAddress", addressLocality: "Bratislava", addressCountry: "SK" },
    alumniOf: "Slovak University of Technology in Bratislava",
    sameAs: Object.values(site.links),
  };

  return (
    <Page>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD built from static site data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <section className="grid items-center gap-10 pt-12 pb-20 sm:pt-20 md:grid-cols-[1fr_auto] md:gap-16">
        <div className="order-2 md:order-1">
          <h1 className="text-5xl font-semibold sm:text-7xl">{site.name}</h1>
          <p className="mt-4 font-display text-2xl text-accent sm:text-3xl">{site.headline}</p>
          <p className="mt-6 max-w-xl text-lg text-muted">{pick(site.intro, locale)}</p>
          <p className="mt-4 inline-flex items-center gap-2 text-muted">
            <MapPin aria-hidden size={18} />
            {pick(site.location, locale)}
          </p>
          <div className="mt-8 flex flex-wrap items-start gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-medium text-on-accent transition-opacity hover:opacity-90"
            >
              <FolderOpen aria-hidden size={18} />
              {t("viewProjects")}
            </Link>
            <CvMenu />
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 font-medium text-muted transition-colors hover:text-ink"
            >
              <Mail aria-hidden size={18} />
              {t("contact")}
            </Link>
          </div>
        </div>
        {/* The ring around the photo echoes the circle of the AK logo. */}
        <div className="order-1 mx-auto md:order-2">
          <div className="rounded-full border-[6px] border-ink p-2 sm:border-8">
            <Image
              src="/images/profile.webp"
              alt={pick({ en: `Portrait of ${site.name}`, sk: `Portrét: ${site.name}` }, locale)}
              width={900}
              height={1350}
              sizes="(min-width: 768px) 20rem, 14rem"
              priority
              className="size-56 rounded-full object-cover object-[50%_22%] sm:size-72 lg:size-80"
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="selected-work" className="border-t border-line pt-14">
        <div className="flex items-end justify-between gap-6">
          <h2 id="selected-work" className="text-3xl font-semibold sm:text-4xl">
            {t("selectedProjects")}
          </h2>
          <Link
            href="/projects"
            className="inline-flex shrink-0 items-center gap-1.5 text-muted hover:text-ink"
          >
            {t("allProjects")}
            <ArrowRight aria-hidden size={16} />
          </Link>
        </div>
        <ul className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2">
          {featuredProjects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} sizes="(min-width: 640px) 50vw, 100vw" />
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="current-work"
        className="mt-24 grid gap-8 border-t border-line pt-14 lg:grid-cols-[1fr_2fr]"
      >
        <div>
          <h2 id="current-work" className="text-3xl font-semibold sm:text-4xl">
            {t("currentWork")}
          </h2>
          <p className="mt-3 text-muted">
            {t("currentRole", {
              role: currentJob.role,
              company: currentJob.company,
              start: formatMonth(currentJob.start, locale),
            })}
          </p>
          <Link
            href="/experience"
            className="mt-4 inline-flex items-center gap-1.5 hover:text-accent"
          >
            {t("fullExperience")}
            <ArrowRight aria-hidden size={16} />
          </Link>
        </div>
        <ul className="grid gap-8 sm:grid-cols-2">
          {currentJob.items.map((item) => (
            <li key={item.name}>
              <h3 className="text-xl font-semibold">
                {item.url ? (
                  <a href={item.url} className="hover:text-accent">
                    {item.name}
                  </a>
                ) : (
                  item.name
                )}
              </h3>
              <p className="mt-1 text-muted">{pick(item.context, locale)}</p>
              <StackList items={item.stack} className="mt-3" />
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="contact"
        className="mt-24 rounded-2xl bg-accent px-6 py-12 text-on-accent sm:px-12 dark:border dark:border-line dark:bg-accent-soft dark:text-ink"
      >
        <h2 id="contact" className="text-3xl font-semibold sm:text-4xl">
          {t("letsTalk")}
        </h2>
        <p className="mt-3 max-w-xl opacity-80">{pick(site.availability, locale)}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-on-accent px-5 py-2.5 font-medium text-accent transition-opacity hover:opacity-90 dark:bg-accent dark:text-on-accent"
          >
            <Mail aria-hidden size={18} />
            {tCommon("emailMe")}
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-on-accent/40 px-5 py-2.5 font-medium hover:border-on-accent dark:border-ink/30 dark:hover:border-ink"
          >
            {t("otherWays")}
            <ArrowRight aria-hidden size={16} />
          </Link>
        </div>
      </section>
    </Page>
  );
}
