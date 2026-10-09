import { useTranslations } from "next-intl";
import { Page } from "@/components/ui/page";
import { navigation } from "@/content/site";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations();
  return (
    <Page className="py-24">
      <p className="font-display text-xl text-muted">{t("notFound.label")}</p>
      <h1 className="mt-2 text-4xl font-semibold sm:text-6xl">{t("notFound.title")}</h1>
      <p className="mt-5 max-w-xl text-lg text-muted">{t("notFound.text")}</p>
      <ul className="mt-6 flex flex-wrap gap-2">
        <li>
          <Link
            href="/"
            className="inline-block rounded-full bg-accent px-4 py-2 text-on-accent hover:opacity-90"
          >
            {t("nav.home")}
          </Link>
        </li>
        {navigation.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="inline-block rounded-full border border-line px-4 py-2 hover:border-ink"
            >
              {t(`nav.${item.key}`)}
            </Link>
          </li>
        ))}
      </ul>
    </Page>
  );
}
