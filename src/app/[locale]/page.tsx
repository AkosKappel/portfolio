import { ArrowRight, Building2, FolderOpen, Globe, Mail, MapPin, Plane } from "lucide-react";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ActivityCard } from "@/components/activity/activity-card";
import { WorkflowShowcase } from "@/components/home/workflow-showcase";
import { ProjectCard } from "@/components/projects/project-card";
import { CvMenu } from "@/components/ui/cv-menu";
import { EmailLink } from "@/components/ui/email-link";
import { JsonLd } from "@/components/ui/json-ld";
import { Page } from "@/components/ui/page";
import { CardStack, StackList, TechLogo } from "@/components/ui/tech-badge";
import { jobs } from "@/content/experience";
import { featuredProjects } from "@/content/projects";
import { site } from "@/content/site";
import { skillGroups } from "@/content/skills";
import { pick } from "@/content/types";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { formatMonth } from "@/lib/format";
import { person } from "@/lib/structured-data";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const tCommon = await getTranslations("common");
  const tAbout = await getTranslations("about");
  const t = await getTranslations("home");
  const currentJob = jobs[0];
  const mainStack = new Set<string>(site.stack);
  const otherSkills = [...new Set(skillGroups.flatMap((group) => group.skills))].filter(
    (skill) => !mainStack.has(skill),
  );

  return (
    <Page>
      <JsonLd data={person} />
      <section className="grid items-center gap-10 pt-12 pb-20 sm:pt-20 md:grid-cols-[1fr_auto] md:gap-16">
        <div className="order-2 md:order-1">
          <h1 className="text-5xl font-semibold sm:text-7xl">
            <span className="mr-2 text-3xl font-medium text-muted sm:mr-3 sm:text-5xl">
              {site.title}
            </span>
            {site.name}
          </h1>
          <p className="mt-4 font-display text-2xl text-accent sm:text-3xl">{site.headline}</p>
          <p className="mt-6 max-w-xl text-lg text-muted">{pick(site.intro, locale)}</p>
          <p className="mt-5 inline-flex items-center gap-2 text-muted">
            <MapPin aria-hidden size={18} />
            {pick(site.location, locale)}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
            <span id="open-to" className="font-medium text-muted">
              {t("openTo")}:
            </span>
            <ul aria-labelledby="open-to" className="flex flex-wrap gap-2">
              {[
                { icon: Globe, label: t("remoteWork") },
                { icon: Building2, label: t("hybridEu") },
                { icon: Plane, label: t("relocation") },
              ].map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 font-medium text-ink"
                >
                  <Icon aria-hidden size={15} className="text-accent" />
                  {label}
                </li>
              ))}
            </ul>
          </div>
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
              alt={tAbout("portrait")}
              width={900}
              height={1350}
              sizes="(min-width: 768px) 20rem, 14rem"
              preload
              className="size-56 rounded-full object-cover object-[50%_22%] sm:size-72 lg:size-80"
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="stack" className="border-t border-line py-14">
        <div className="flex items-end justify-between gap-6">
          <h2 id="stack" className="text-3xl font-semibold sm:text-4xl">
            {t("stackTitle")}
          </h2>
          <Link
            href="/skills"
            className="inline-flex shrink-0 items-center gap-1.5 text-muted hover:text-ink"
          >
            {t("allSkills")}
            <ArrowRight aria-hidden size={16} />
          </Link>
        </div>
        <p className="mt-3 max-w-2xl text-muted">{t("stackLead")}</p>
        <ul className="mt-6 flex flex-wrap gap-3">
          {site.stack.map((item) => (
            <li
              key={item}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-lg font-medium"
            >
              <TechLogo name={item} className="size-5" />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-2xl text-muted">{t("stackMore")}</p>
        <div className="marquee mt-4">
          <div className="marquee-track">
            {[false, true].map((copy) => (
              <ul key={String(copy)} aria-hidden={copy || undefined} className="marquee-list">
                {otherSkills.map((item) => (
                  <li key={item} className="tech-tag">
                    <TechLogo name={item} />
                    {item}
                  </li>
                ))}
              </ul>
            ))}
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
          {featuredProjects.map((project, index) => (
            <li key={project.slug} className="reveal">
              <ProjectCard
                project={project}
                sizes="(min-width: 640px) 50vw, 100vw"
                loading={index < 2 ? "eager" : undefined}
                stack={<CardStack items={project.stack} />}
              />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="workflow" className="mt-24 border-t border-line pt-14">
        <h2 id="workflow" className="text-3xl font-semibold sm:text-4xl">
          {t("workflow")}
        </h2>
        <p className="mt-3 max-w-2xl text-muted">{t("workflowLead")}</p>
        <WorkflowShowcase
          steps={site.workflow.map((step) => ({
            id: step.id,
            title: pick(step.title, locale),
            text: pick(step.text, locale),
          }))}
          pauseLabel={t("workflowPause")}
          playLabel={t("workflowPlay")}
        />
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
            <li key={item.id} className="reveal">
              <h3 className="text-xl font-semibold">
                <Link
                  href={`/experience#${item.id}`}
                  className="underline-offset-4 hover:text-accent hover:underline"
                >
                  {pick(item.name, locale)}
                </Link>
              </h3>
              <p className="mt-1 text-muted">{pick(item.context, locale)}</p>
              <StackList items={item.stack} className="mt-3" />
            </li>
          ))}
        </ul>
      </section>

      <ActivityCard locale={locale} />

      <section
        aria-labelledby="contact"
        className="mt-24 rounded-2xl bg-accent px-6 py-12 text-on-accent sm:px-12 dark:border dark:border-line dark:bg-accent-soft dark:text-ink"
      >
        <h2 id="contact" className="text-3xl font-semibold sm:text-4xl">
          {t("letsTalk")}
        </h2>
        <p className="mt-3 max-w-xl opacity-80">{pick(site.availability, locale)}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <EmailLink
            label={tCommon("emailMe")}
            className="inline-flex items-center gap-2 rounded-full bg-on-accent px-5 py-2.5 font-medium text-accent transition-opacity hover:opacity-90 dark:bg-accent dark:text-on-accent"
          >
            <Mail aria-hidden size={18} />
          </EmailLink>
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
