import { NextIntlClientProvider, useMessages, useTranslations } from "next-intl";
import { MissingPath } from "@/components/ui/missing-path";
import { Page } from "@/components/ui/page";
import { projects } from "@/content/projects";
import { navigation, secondaryNavigation } from "@/content/site";
import { Link } from "@/i18n/navigation";

// Built here on the server, so the client gets a list of paths and not the project content.
const paths = [
  ...[...navigation, ...secondaryNavigation].map((item) => item.href),
  ...projects.map((project) => `/projects/${project.slug}`),
];

export default function NotFound() {
  const t = useTranslations();
  const { nav, notFound, terminal } = useMessages();
  return (
    <Page className="py-16 sm:py-24">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)]">
        <div>
          <p className="font-display text-8xl leading-none font-semibold tracking-tight text-accent sm:text-9xl">
            <span aria-hidden>404</span>
            <span className="sr-only">{t("notFound.label")}</span>
          </p>
          <h1 className="mt-6 text-4xl font-semibold sm:text-5xl">{t("notFound.title")}</h1>
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
        </div>
        {/* The layout sends the client only a few namespaces; this card needs a few more strings. */}
        <NextIntlClientProvider
          messages={{
            nav,
            notFound,
            terminal: { noSuchFile: terminal.noSuchFile, didYouMean: terminal.didYouMean },
          }}
        >
          <MissingPath paths={paths} />
        </NextIntlClientProvider>
      </div>
    </Page>
  );
}
