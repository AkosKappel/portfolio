import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, IBM_Plex_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { themeScript } from "@/components/layout/theme-script";
import { site } from "@/content/site";
import { pick } from "@/content/types";
import { routing } from "@/i18n/routing";
import { alternates } from "@/lib/metadata";
import "../globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  variable: "--font-bricolage",
  display: "swap",
});

const plex = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-plex",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name}, ${site.headline}`,
      template: `%s | ${site.name}`,
    },
    description: pick(site.intro, locale),
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: locale === "sk" ? "sk_SK" : "en_GB",
    },
    twitter: { card: "summary_large_image" },
    alternates: alternates(locale, "/"),
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e9edf2" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1622" },
  ],
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "common" });
  // Client components only need these namespaces; the rest stays on the server.
  const { nav, common, languages, projects } = await getMessages();

  return (
    <html
      lang={locale}
      className={`${bricolage.variable} ${plex.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Sets the theme before the first paint so the page never flashes the wrong colours. */}
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: static script defined in this repository */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col antialiased">
        <NextIntlClientProvider messages={{ nav, common, languages, projects }}>
          <a
            href="#main"
            className="sr-only z-50 rounded bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            {t("skipToContent")}
          </a>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </NextIntlClientProvider>
        {/* The analytics script only exists on Vercel deployments. */}
        {process.env.VERCEL ? <Analytics /> : null}
      </body>
    </html>
  );
}
