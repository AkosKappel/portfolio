import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { ActivityDashboard } from "@/components/activity/activity-dashboard";
import { Page, PageHeader } from "@/components/ui/page";
import activity from "@/content/activity.json";
import type { Locale } from "@/i18n/routing";
import type { ActivityData } from "@/lib/activity";
import { alternates } from "@/lib/metadata";
import { techIcon } from "@/lib/tech-icons";

const data = activity as ActivityData;

/** Language bars use the brand colour of the logo the site already has for the language. */
const languageColors = Object.fromEntries(
  [
    ...new Set(
      Object.values(data.languages).flatMap((years) =>
        Object.values(years).flatMap((shares) => Object.keys(shares)),
      ),
    ),
  ].flatMap((language) => {
    const icon = techIcon(language);
    return icon?.kind === "path" && icon.color ? [[language, icon.color]] : [];
  }),
);

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/activity">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "activity" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: alternates(locale, "/activity"),
  };
}

export default async function ActivityPage({ params }: PageProps<"/[locale]/activity">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("activity");
  const messages = await getMessages();

  return (
    <Page>
      <PageHeader title={t("title")} lead={t("lead")} />
      {/* Only this page needs these messages on the client. */}
      <NextIntlClientProvider messages={{ activity: messages.activity }}>
        <ActivityDashboard data={data} languageColors={languageColors} />
      </NextIntlClientProvider>
    </Page>
  );
}
