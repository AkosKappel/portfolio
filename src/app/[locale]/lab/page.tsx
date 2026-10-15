import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SignalCanvas } from "@/components/lab/signal-canvas";
import { AnchorHeading } from "@/components/ui/anchor-heading";
import { Page, PageHeader } from "@/components/ui/page";
import type { Locale } from "@/i18n/routing";
import { alternates } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/lab">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "lab" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: alternates(locale, "/lab"),
  };
}

export default async function LabPage({ params }: PageProps<"/[locale]/lab">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("lab");
  const tCommon = await getTranslations("common");

  return (
    <Page>
      <PageHeader title={t("title")} lead={t("lead")} />
      <section aria-labelledby="signal-filter">
        <AnchorHeading
          id="signal-filter"
          label={tCommon("anchor")}
          className="text-3xl font-semibold"
        >
          {t("signal.title")}
        </AnchorHeading>
        <figure className="mt-6">
          <div className="relative h-80 overflow-hidden rounded-xl border border-line bg-surface sm:h-96">
            <SignalCanvas
              fallback={
                <p className="grid h-full place-items-center p-6 text-muted">
                  {t("signal.noWebgl")}
                </p>
              }
            />
          </div>
          <figcaption className="mt-3 text-sm text-muted">{t("signal.caption")}</figcaption>
        </figure>
        <div className="mt-8 grid max-w-3xl gap-4 text-lg">
          <p>{t("signal.what")}</p>
          <p>{t("signal.how")}</p>
          <p>{t("signal.cost")}</p>
        </div>
      </section>
    </Page>
  );
}
