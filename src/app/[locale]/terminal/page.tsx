import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Terminal, type TerminalData } from "@/components/terminal/terminal";
import { Page, PageHeader } from "@/components/ui/page";
import { jobs } from "@/content/experience";
import { projects } from "@/content/projects";
import { navigation, secondaryNavigation, site } from "@/content/site";
import { skillGroups } from "@/content/skills";
import { pick } from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { formatMonth, yearRange } from "@/lib/format";
import { alternates } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/terminal">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "terminal" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: alternates(locale, "/terminal"),
  };
}

const pickMessages = ({ terminal, languages }: Awaited<ReturnType<typeof getMessages>>) => ({
  terminal,
  languages,
});

export default async function TerminalPage({ params }: PageProps<"/[locale]/terminal">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("terminal");
  const tNav = await getTranslations("nav");
  const tCommon = await getTranslations("common");

  const data: TerminalData = {
    whoami: [
      `${site.title} ${site.name}`,
      site.headline,
      pick(site.location, locale),
      pick(site.availability, locale),
    ],
    about: pick(site.intro, locale),
    projects: projects.map((project) => ({
      slug: project.slug,
      title: project.title,
      years: yearRange(project.year, project.until),
      summary: pick(project.summary, locale),
    })),
    skills: skillGroups.map((group) => ({
      id: group.id,
      name: pick(group.name, locale),
      skills: group.skills,
    })),
    jobs: jobs.map((job) => ({
      id: job.id,
      role: job.role,
      company: job.company,
      period: tCommon("period", {
        start: formatMonth(job.start, locale),
        end: job.end ? formatMonth(job.end, locale) : tCommon("present"),
      }),
    })),
    pages: [{ href: "/", key: "home" } as const, ...navigation, ...secondaryNavigation].map(
      (item) => ({ name: item.key, href: item.href, label: tNav(item.key) }),
    ),
    links: [
      { name: "github", url: site.links.github },
      { name: "linkedin", url: site.links.linkedin },
    ],
  };

  return (
    <Page>
      <PageHeader title={t("title")} lead={t("lead")} />
      {/* Only this page needs the terminal strings in the browser. */}
      <NextIntlClientProvider messages={pickMessages(await getMessages())}>
        <Terminal data={data} />
      </NextIntlClientProvider>
    </Page>
  );
}
